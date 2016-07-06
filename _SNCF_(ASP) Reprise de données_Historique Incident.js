	
repriseDonneesHistoInc();

	function repriseDonneesHistoInc() {
var historyLine = new GlideRecord('sys_history_line');
		//historyLine.addQuery('set.id', grIncident.sys_id);
		historyLine.addQuery('field', 'IN', 'assignment_group,assigned_to,impact,urgency,priority,work_notes,state');
		historyLine.addQuery('set.language', 'fr');
		//historyLine.orderByDesc('update_time');
		historyLine.query();
		
		while (historyLine.next()) {
			this.insertWebN2Inc(historyLine.set.id, historyLine.set.id.number, historyLine.update_time, historyLine.user_id, historyLine.field, historyLine.label, historyLine.getValue('old'), historyLine.getValue('new'));
		}
	}




	function insertWebN2Inc(sys_id, number, updateTime, updatedBy, fieldUpdated, type, oldValue, newValue) {
	var gr = new GlideRecord('u_webn2_incident_history');
	gr.initialize();
	gr.u_incident_sys_id = sys_id;
	gr.u_number = number;
	gr.u_update_time = updateTime;
	gr.u_user_id = updatedBy;
	gr.u_field_update = fieldUpdated;
	gr.u_type = type;
	gr.u_old_value = oldValue;
	gr.u_new_value = newValue;
	gr.insert();
}