/**
 * For variables go to: http://wiki.service-now.com/index.php?title=Import_Sets_portal
 **/
var log = '';
var user = '';

var inc;
var grIncident = new GlideRecord('incident');
grIncident.addQuery('u_ref_infra_isi', source.u_num_intervention.toString());
grIncident.query();
if (grIncident.next() && !source.u_observation.nil()) {
	//gs.log('TEST DE RECUP DU DETAIL DE LA WK NOTE: ' + source.u_num_intervention.toString() + ' - ' + source.u_observation.toString(), 'SLA');
	
	inc = grIncident.sys_id;
	
	var gr = new GlideRecord('u_agent_base_intervention');
	gr.addQuery('u_agent_bi', source.u_intervenant.toString());
	gr.query();
	if (gr.next()) {
		user = gr.u_user_servicenow.user_name;
	} else {
		//Nothing
		user = 'intervenant_asu';
	}
	
	/*var gp = new GlideRecord('u_utilisateurs_base_interventi');
	gp.addQuery('u_utilisateur_base_interventio', source.u_intervenant.toString());
	gp.query();
	if (gp.next()) {
		user = gp.u_utilisateur_servicenow.user_name;
	} else {
		//Nothing
		user = 'intervenant_asu';
	}
	gs.log('TEST DE RECUP DU DETAIL DE LA WK NOTE - USER: ' + source.u_intervenant.toString() + ' - ' + user, 'SLA');*/
	
	//Insert Journal
	var grNewJournal = new GlideRecord('sys_journal_field');
	grNewJournal.initialize();
	grNewJournal.name = 'task';
	grNewJournal.u_import = true;
	grNewJournal.element_id = inc;
	grNewJournal.element = 'work_notes';
	grNewJournal.value = source.u_observation.toString();
	grNewJournal.sys_created_on = source.u_date_heure.toString().slice(0,19);
	grNewJournal.sys_created_by = user;
	grNewJournal.u_synced = true; //So we don't sync back later
	grNewJournal.setWorkflow(false);
	grNewJournal.autoSysFields(false);  //So Created On and By don't auto populate
	grNewJournal.insert();
	
} else {
	log += 'Aucun incident retrouvé pour : ' + source.u_num_intervention + '\n';
	log += 'Intervention ignorée car champ observation vide : ' + source.u_num_intervention + '\n';
}

//gs.log(log,'Projet reprise de données BI');