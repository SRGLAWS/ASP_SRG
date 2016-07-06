//Table: Incident
//When: after - Insert & Update

//Script:
/*
 * Interface ServiceNow-WebN2
 * @author: Serge LAWSON-DRACKEY for ASPEDIENS || 03-02-2016
 * @version: 0.1
 */

try {
	
	if (previous.assignment_group != current.assignment_group) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'assignment_group', 'Groupe d\'affectation', previous.assignment_group.name, current.assignment_group.name);
	}
	
	if (previous.assigned_to != current.assigned_to) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'assigned_to', 'Affecté à', previous.assigned_to.name, current.assigned_to.name);
	}
	
	if (previous.impact != current.impact) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'impact', 'Impact', getLabels('task', 'impact', previous.impact), getLabels('task', 'impact', current.impact));
	}
	
	if (previous.urgency != current.urgency) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'urgency', 'Urgence', getLabels('task', 'urgency', previous.urgency), getLabels('task', 'urgency', current.urgency));
	}
	
	if (previous.priority != current.priority) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'priority', 'Priorité', getLabels('task', 'priority', previous.priority), getLabels('task', 'priority', current.priority));
	}
	
	if (current.work_notes.changes()) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'work_notes', 'Notes de travail (vue interne)', previous.work_notes, current.work_notes.getJournalEntry(1));
	}
	
	if (previous.state != current.state) {
		this.insertWebN2Inc(current.sys_id, current.number, current.sys_updated_on, current.sys_updated_by, 'state', 'Statut', getLabels('incident', 'state', previous.state), getLabels('incident', 'state', current.state));
	}
	
} catch(e) {
	gs.logError("Erros in Business Rule : (ASP) WebN2 - Incident History Insert" + e, 'Script');
}


// fonction de récupération des libéllés d'Impact, d'Urgence et de Priorité
function getLabels(table, element, value) {
	var gp = new GlideRecord('sys_choice');
	gp.addQuery('name', table);
	gp.addQuery('element', element);
	gp.addQuery('language', 'fr');
	gp.addQuery('value', value);
	gp.query();
	if (gp.next()) {
		return gp.label;
	}
}


// fonction d'injection des données dans la table d'historisation
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