var userlist = '';
var inclist ='begin';
var inclist2 = 'begin';
var myGroups = getMyGroupsNames();
var myIncidentMetrics = getMyIncidentMetrics();



if ((gs.hasRole("itil") || gs.hasRole("itil_admin")) && gs.getSession().isInteractive() && !gs.hasRole("admin") && !gs.hasRole("business_service_admin")) {
	
	// We look far all group where the current user is a member
	var GroupsysUserGrmember = new GlideRecord('sys_user_grmember');
	GroupsysUserGrmember.addQuery('user',gs.getUserID());
	GroupsysUserGrmember.query();
	
	while (GroupsysUserGrmember.next()) {
		
		// For each of these groups we need to look for all associated users
		var UsersysUserGrmember = new GlideRecord('sys_user_grmember');
		UsersysUserGrmember.addQuery('group',GroupsysUserGrmember.group.sys_id.toString());
		UsersysUserGrmember.query();
		
		// Compose a list usres with the results of the queries
		while (UsersysUserGrmember.next()) {

			if (UsersysUserGrmember == '') {
				userlist = UsersysUserGrmember.user.user_name;
			} else {
				userlist = userlist + ',' + UsersysUserGrmember.user.user_name;
			}

		}
	}
	

    var gp = new GlideRecord('incident');
    gp.addQuery('number', 'IN', myIncidentMetrics);
    gp.addQuery('active', true);
    gp.query();

    while (gp.next()) {
   	if (inclist2.indexOf(gp.sys_id) < 0) {
		inclist2 = inclist2 + ',' + gp.sys_id;
		}
	}

	//gs.log("SLA Count 4 -->" +inclist2);
	//var q = current.addQuery('sys_created_by', 'IN', userlist);
    var q = current.addQuery('sys_created_by', 'IN', userlist).addOrCondition('sys_id', 'IN', inclist2);
    //var q = current.addQuery('sys_id', 'IN', inclist2);
    //var q = current.addQuery('sys_created_by', 'IN', userlist).addOrCondition('assignment_group', getMyGroups());
}




function getMyIncidentMetrics() {
	var gr = new GlideRecord('incident_metric');
	gr.addQuery("mi_value", 'IN', myGroups);
	gr.addQuery("mi_definition",'39d43745c0a808ae0062603b77018b90');
	gr.query();
	
	//gs.log("SLA Count --> " + gr.getRowCount());
	//gs.log("SLA Mygroups --> " + myGroups);

	while (gr.next()) {
		var incNumber = gr.getValue("inc_number");
		incNumber = incNumber.toString();
	 if (inclist.indexOf(incNumber) < 0) {	
		inclist = inclist + ',' + incNumber;
	}
	}

	//gs.log("SLA Count 2 -->" +inclist.length);
    //gs.log("SLA Count 3 -->" +inclist);

    return inclist;
}




function getMyGroupsNames() {
	var gr = new GlideRecord('sys_user_grmember');
	gr.addQuery('user', gs.getUserID());
	gr.query();
	var groupNameList = [];

	while(gr.next()) {
		groupNameList.push(gr.getDisplayValue('group'));
	}

	return groupNameList.join();
}