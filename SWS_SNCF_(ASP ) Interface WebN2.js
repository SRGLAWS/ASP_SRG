/*
 * Interface ServiceNow-WebN2
 * @author: Simon Pelluet for ASPEDIENS || 14-10-2015
 * @updatedBy: Laetitia Dano for ASPEDIENS || 03-12-2015
 * @updatedBy: Serge LAWSON-DRACKEY for ASPEDIENS || 03-02-2016
 * @version: 0.5
 */

launchScript();

function launchScript() {
	try {
		// For controls on request received
		var utils = new AspWebN2InterfaceUtils(); // Call a script include to execute usefull functions for controls below
		var categ = utils.getValue('sys_choice','category',request.category, 'incident');
		var subCateg = utils.getValue('sys_choice','subcategory',request.subcategory, 'incident');
		var source = utils.getValue('sys_choice','u_source',request.u_source, 'incident');
		var businessServiceId = utils.getValue('cmdb_ci','name',request.u_business_service,'');
		var assignmentGroupSysId = utils.getValue('sys_user_group','name',request.assignment_group,'');
		var impact = utils.getValue('sys_choice','impact',request.impact, 'task');
		var urgency = utils.getValue('sys_choice','urgency',request.urgency, 'task');
		
		// Check users existence
		var userSysId = utils.getUserSysId(request.user_id);
		var callerSysId = utils.getUserSysId(request.caller_id);
		var resolvedBySysId = utils.getUserSysId(request.resolved_by);
		
		// Check subcategories
		var boolsubCateg = utils.checkIncidentSubcategory(categ,subCateg);
		
		// Check date format
		var regex = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
		var boolDateFormat = regex.test(request.resolved_at);
		var boolDateFormatStart = regex.test(request.resolved_at_start);
		var boolDateFormatEnd = regex.test(request.resolved_at_end);
		
		// For error messages
		var msgMandatory = 'is mandatory';
		var msgNotFound = 'not found in this instance';
		
		// userID is mandatory to continue
		if (request.user_id == '') {
			response.error_message = ' user_id is mandatory';
		}
		else {
			// userID must exists in the instance to continue
			if (userSysId == '') {
				response.error_message = ' user_id "' + request.user_id + ' " '+ msgNotFound;
			}
			else
				{
				// type_transaction parameter must contain a value to continue
				if (request.type_transaction == '') {
					response.error_message = 'type_transaction ' + msgMandatory;
				}
				else {
					// each type_transaction corresponds to an action/function and require mandatory parameters
					switch (request.type_transaction) {
						case 'getAll': // to get all incident
						if (request.active == '' ) {
							response.error_message = 'active ' + msgMandatory;
						}
						else if ((request.resolved_at != '' && !boolDateFormat) || (request.resolved_at_start != '' && !boolDateFormatStart) || (request.resolved_at_end != '' && !boolDateFormatEnd)) {
							response.error_message = 'format for resolved_at, resolved_at_start and resolved_at_end parameter must be: DD-MM-YYYY';
						}
						else {
							getAll(); // execute get all incidents when all mandatory parameters are OK
						}
						break;
						case 'getIncident': // to get one incident
						if (request.number == '') { // number parameter must contain a value to continue
							response.error_message = 'number ' + msgMandatory;
					}
					else {
						getIncident(); // get incident when all mandatory parameters are OK
					}
					break;
					case 'create': // to create one incident
					if (request.caller_id == '') {
						response.error_message = ' caller_id ' + msgMandatory;
					}
					else {
						if (callerSysId == '') {
							response.caller_id = ' caller_id " ' + request.caller_id + ' " ' + msgNotFound;
						}
						else
							{
							if (categ == '') {
								response.error_message = 'category " ' + request.category + ' " ' + msgNotFound;
							}
							else if (source == '') {
								response.error_message = 'u_source " ' + request.u_source + ' " ' + msgNotFound;
							}
							else if (businessServiceId == '') {
								response.error_message = 'u_business_service " ' + response.u_business_service + ' " ' + msgNotFound;
							}
							else if (request.subcategory != '' && !boolsubCateg) {
								response.error_message = 'no matching subcategory " ' + response.subCateg + ' " for category " ' + request.category + ' " in this instance';
							}
							else {
								if (request.caller_id == '') {
									response.error_message = 'caller_id ' + msgMandatory;
								}
								else if (request.short_description == '') {
									response.error_message = 'short_description ' + msgMandatory;
								}
								else {
									create(categ,source,businessServiceId,assignmentGroupSysId); // create incident when all mandatory parameters are OK
								}
							}
						}
					}
					break;
					case 'update': // to update an incident's assignment group and/or add worknote info
					if (request.number == '') {
						response.error_message = 'number ' + msgMandatory;
					}
					else if (request.assignment_group == '') {
						response.error_message = 'assignment_group' + msgMandatory;
					}
					else {
						if (assignmentGroupSysId == '') {
							response.error_message = 'assignment_group " ' + request.assignment_group + ' " ' + msgNotFound;
						}
						else {
							update(request.work_notes, assignmentGroupSysId); // update incident when all mandatory parameters are OK
						}
					}
					break;
					case 'inform': // to add worknote info on one incident
					if (request.number == '') {
						response.error_message = 'number ' + msgMandatory;
					}
					else if (request.work_notes == '') {
						response.error_message = 'work_notes ' + msgMandatory;
					}
					else {
						inform(); // get incident info when all mandatory parameters are OK
					}
					break;
					case 'resolve': // to resolve one incident
					if (request.number == '') {
						response.error_message = 'number ' + msgMandatory;
					}
					else if (request.resolved_by == '') {
						response.error_message = 'resolved_by ' + msgMandatory;
					}
					else if (request.solution_tiers == '') {
						response.error_message = 'solution_tiers ' + msgMandatory;
					}
					else {
						if (resolvedBySysId == '')  {
							response.error_message = 'resolved_by " ' + request.resolved_by + ' " ' + msgNotFound;
						}
						else {
							resolve(); // resolve incident when all mandatory parameters are OK
						}
					}
					break;
					default:
					response.error_message = 'type_transaction unknown';
					break;
				}
			}
		}
	}
}
catch (err) {
	response.error_message = 'error on webservice ServiceIncidentWebN2 - please copy and send the following error to your administrator - error :' + err;
}
}

/*
 * Retreive incidents by the creator and send back an XML doc with results
 */
function getAll() {
	var utils = new AspWebN2InterfaceUtils(); // Call a script include to execute usefull functions for controls below
	var resolutionDtStart = utils.convertDateFr(request.resolved_at_start);
	var resolutionDtEnd = utils.convertDateFr(request.resolved_at_end);
	var isAdmin = utils.isUserAdmin(request.user_id);
	var gDate1 = resolutionDtStart + ' 00:00:01';
	var gDate2 = resolutionDtEnd + ' 23:59:59';
	
	// Build query
	var grIncident = new GlideRecord('incident');
	var query = 'active=' + request.active;
	
	if ((request.resolved_at_start != '') && (request.resolved_at_end != '')) {
		query = query + '^resolved_at>=' + gDate1;
		query = query + '^resolved_at<=' + gDate2;
		
	}
	
	// Add RFF funcionnal restriction on incident visibility for users excepts admins
	if (!isAdmin)
		{
		var callRestriction = new AspGroupServicesRestrictionOnIncident(); // Call a script include to add specific RFF filter to the
		var restriction = callRestriction.restrictIncidentsPerGroupsServices(request.user_id);
		query = query + '^' + restriction;
	}
	
	//gs.log('query => ' + query,'ASP');
	grIncident.addEncodedQuery(query);
	grIncident.orderByDesc('number');
	grIncident.query();
	
	var xmldoc = new XMLDocument('<getAllResponse></getAllResponse>'); // Create xml doc
	var elemNumber = 1;
	
	// Case no results
	if (!grIncident.hasNext()) {
		response.error_message = 'Incidents with request: active="' + request.active + '" AND resolved_at>="' + request.resolved_at_start + '" AND resolved_at<="' + request.resolved_at_end + '" not found in this instance for user ' + request.user_id;
	}
	
	// In case there are results
	while (grIncident.next()) {
		// Build the XML content with the query's results
		var elem = xmldoc.createElement('incident');
		elem.appendChild(xmldoc.createElement('number', grIncident.number));
		elem.appendChild(xmldoc.createElement('state', grIncident.state.getDisplayValue()));
		elem.appendChild(xmldoc.createElement('u_business_service', grIncident.u_business_service.getDisplayValue()));
		elem.appendChild(xmldoc.createElement('short_description', grIncident.short_description));
		
		/*** Mis en commentaites le 03-02-2016 par SLA (Aspediens) ***/
		// Query to retreive the last incident update
		/*var historyLine = new GlideRecord('sys_history_line');
		historyLine.addQuery('set.id', grIncident.sys_id);
		historyLine.addQuery('field', 'IN', 'assignment_group,assigned_to,impact,urgency,priority,work_notes,state');
		historyLine.addQuery('set.language', 'fr');
		historyLine.orderByDesc('update_time');
		historyLine.setLimit(1);
		historyLine.query();
		
		if(historyLine.next()) {
			var lastUpdate = xmldoc.createElement('lastUpdate');
			lastUpdate.appendChild(xmldoc.createElement('update_time', historyLine.update_time));
			lastUpdate.appendChild(xmldoc.createElement('user_id', historyLine.user_id));
			lastUpdate.appendChild(xmldoc.createElement('type', historyLine.label));
			lastUpdate.appendChild(xmldoc.createElement('old_value', historyLine.getValue('old')));
			lastUpdate.appendChild(xmldoc.createElement('new_value', historyLine.getValue('new')));
			elem.appendChild(lastUpdate);
		}*/
		
		// Query to retreive the last incident update
		var historyLine = new GlideRecord('u_webn2_incident_history');
		historyLine.addQuery('u_incident_sys_id', grIncident.sys_id);
		historyLine.addQuery('u_field_update', 'IN', 'assignment_group,assigned_to,impact,urgency,priority,work_notes,state');
		historyLine.orderByDesc('u_update_time');
		historyLine.setLimit(1);
		historyLine.query();
		
		if(historyLine.next()) {
			var lastUpdate = xmldoc.createElement('lastUpdate');
			lastUpdate.appendChild(xmldoc.createElement('update_time', historyLine.u_update_time));
			lastUpdate.appendChild(xmldoc.createElement('user_id', historyLine.u_user_id));
			lastUpdate.appendChild(xmldoc.createElement('type', historyLine.u_type));
			lastUpdate.appendChild(xmldoc.createElement('old_value', historyLine.getValue('u_old_value')));
			lastUpdate.appendChild(xmldoc.createElement('new_value', historyLine.getValue('u_new_value')));
			elem.appendChild(lastUpdate);
		}
		
		response.answer = xmldoc.getDocumentElement();
		elemNumber ++;
	}
}

/*
 * Retreive an incident by his number and send back an XML doc with result
 */
function getIncident() {
	// Build query
	var grIncident = new GlideRecord('incident');
	grIncident.addQuery('number', request.number);
	grIncident.query();
	
	var xmldoc = new XMLDocument('<getAllResponse></getAllResponse>'); // Create xml doc
	
	// Case no results
	if (!grIncident.hasNext()) {
		response.error_message = 'incident "' + request.number + '" created by "' + request.user_id + '" not found in this instance';
	}
	
	// If there is one result
	if (grIncident.next()) {
		// Build the XML content with the query's results
		var elem = xmldoc.createElement('incident');
		elem.appendChild(xmldoc.createElement('number', grIncident.number));
		elem.appendChild(xmldoc.createElement('state', grIncident.state.getDisplayValue()));
		elem.appendChild(xmldoc.createElement('u_business_service', grIncident.u_business_service.getDisplayValue()));
		
		var activities = xmldoc.createElement('activities');
		
		/*** Mis en commentaites le 03-02-2016 par SLA (Aspediens) ***/
		// Query to retreive the all update
		/*var historyLine = new GlideRecord('sys_history_line');
		historyLine.addQuery('set.id', grIncident.sys_id);
		historyLine.addQuery('field', 'IN', 'assignment_group,assigned_to,impact,urgency,priority,work_notes,state');
		historyLine.addQuery('set.language', 'fr');
		historyLine.orderByDesc('update_time');
		historyLine.query();
		
		while (historyLine.next()) {
			var update = xmldoc.createElement('update');
			update.appendChild(xmldoc.createElement('update_time', historyLine.update_time));
			update.appendChild(xmldoc.createElement('user_id', historyLine.user_id));
			update.appendChild(xmldoc.createElement('type', historyLine.label));
			update.appendChild(xmldoc.createElement('old_value', historyLine.getValue('old')));
			update.appendChild(xmldoc.createElement('new_value', historyLine.getValue('new')));
			activities.appendChild(update);
		}*/
		
		// Query to retreive the all update
		var historyLine = new GlideRecord('u_webn2_incident_history');
		historyLine.addQuery('u_incident_sys_id', grIncident.sys_id);
		historyLine.addQuery('u_field_update', 'IN', 'assignment_group,assigned_to,impact,urgency,priority,work_notes,state');
		historyLine.orderByDesc('u_update_time');
		historyLine.query();
		
		while (historyLine.next()) {
			var update = xmldoc.createElement('update');
			update.appendChild(xmldoc.createElement('update_time', historyLine.u_update_time));
			update.appendChild(xmldoc.createElement('user_id', historyLine.u_user_id));
			update.appendChild(xmldoc.createElement('type', historyLine.u_type));
			update.appendChild(xmldoc.createElement('old_value', historyLine.getValue('u_old_value')));
			update.appendChild(xmldoc.createElement('new_value', historyLine.getValue('u_new_value')));
			activities.appendChild(update);
		}
		
		elem.appendChild(activities);
		
		response.answer = xmldoc.getDocumentElement();
	}
}

/*
 * Create an incident
 * @param string - category
 * @param string - source
 * @param string - businessService
 * @param string - group (assignment group ID)
 */
function create(category,source,businessService,group) {
	var grIncident = new GlideRecord('incident');
	grIncident.initialize();
	
	// Mandatory
	grIncident.caller_id = request.caller_id;
	grIncident.category = category;
	grIncident.short_description = request.short_description;
	grIncident.u_business_service = businessService;
	grIncident.u_source = source;
	grIncident.assignment_group = group;
	
	// Optional
	if (request.description != '') {
		grIncident.description = request.description;
	}
	if (request.impact != '') {
		grIncident.impact = request.impact;
	}
	if (request.subcategory != '') {
		grIncident.subcategory = request.subcategory;
	}
	if (request.urgency != '') {
		grIncident.urgency = request.urgency;
	}
	if (request.work_notes != '') {
		grIncident.work_notes = request.work_notes;
	}
	
	grIncident.insert();
	response.answer = ' incident ' + grIncident.number + ' created ';
}

/*
 * Update incident's assignment_group and/or add work_notes
 * @param string - workNote (comment)
 * @param string - group (assignment group ID)
 */
function update(workNote,group) {
	// Build query
	var grIncident = new GlideRecord('incident');
	grIncident.addQuery('number', request.number);
	grIncident.query();
	
	if (grIncident.next()) {
		grIncident.assignment_group = group;
		
		if (request.work_notes != '') {
			grIncident.work_notes = workNote;
		}
		
		grIncident.update();
		response.answer = ' incident "' + grIncident.number + '" affected to "' +  grIncident.assignment_group.getDisplayValue() + '" has been updated ';
	}
	else {
		response.error_message = 'incident "' + request.number + '" not found in this instance';
	}
}

/*
 * Add work note to an incident (update)
 */
function inform() {
	// Build query
	var grIncident = new GlideRecord('incident');
	grIncident.addQuery('number', request.number);
	grIncident.query();
	
	if (grIncident.next()) {
		grIncident.work_notes = request.work_notes;
		grIncident.update();
		response.answer = ' work notes added on incident "' + grIncident.number + '"';
	}
	else {
		response.error_message = 'incident "' + request.number + '" not found in this instance';
	}
}

/*
 * Resolve an incident (update)
 */
function resolve() {
	// Build query
	var grIncident = new GlideRecord('incident');
	grIncident.addQuery('number', request.number);
	grIncident.query();
	
	if (grIncident.next()) {
		// Mandatory to resolve the incident
		grIncident.state = 150;
		grIncident.close_notes = request.solution_tiers;
		grIncident.resolved_by = request.resolved_by;
		//grIncident.work_notes = request.work_notes;
		
		// Optional
		if (request.resolved_at != '') {
			grIncident.resolved_at = request.resolved_at;
		}
		if (request.work_notes != '') {
			grIncident.work_notes = request.work_notes;
		}
		
		grIncident.update();
		response.answer = 'incident "' + grIncident.number + '" resolved';
	}
	else {
		response.error_message = 'incident "' + request.number + '" not found in this instance';
	}
}