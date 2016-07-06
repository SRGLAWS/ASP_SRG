/**
 * For variables go to: http://wiki.service-now.com/index.php?title=Import_Sets_portal
 **/

//Insert SLA Task
var inc;
var grIncident = new GlideRecord('incident');
grIncident.addQuery('u_ref_infra_isi', source.u_ref_infra_isi.toString());
grIncident.query();
if (grIncident.next()){
	inc = grIncident.sys_id;
}

/*var sla;
var grSla = new GlideRecord('contract_sla');
grSla.addQuery('sys_id', source.u_sys_id.toString());
grSla.query();
if (grSla.next()){
	sla = grSla.sys_id;
	gs.log('TEST SRG - SLA: ' + grSla.sys_id, 'SLA');
}*/

var gTaskSLA =  new GlideRecord("task_sla");
gTaskSLA.initialize();

gTaskSLA.sla = source.u_sys_id.toString();

gTaskSLA.duration.setDateNumericValue(source.u_duration*1000);

if (source.u_seuil_condition == 0) {
	gTaskSLA.has_breached = true;
} else {
	gTaskSLA.has_breached = false;
}

gTaskSLA.task = inc;

gTaskSLA.start_time = source.u_start_time.toString().slice(0,10);

if (source.u_stage.toString() == 'In progress') {gTaskSLA.stage = 'in_progress';}
	if (source.u_stage.toString() == 'Achieved') {gTaskSLA.stage = 'achieved';}
	if (source.u_stage.toString() == 'Breached') {gTaskSLA.stage = 'breached';}
	if (source.u_stage.toString() == 'Cancelled') {gTaskSLA.stage = 'cancelled';}
	if (source.u_stage.toString() == 'Paused') {gTaskSLA.stage = 'paused';}
	if (source.u_stage.toString() == 'Completed') {gTaskSLA.stage = 'completed';}
	
gTaskSLA.u_synced = true; //So we don't sync back later
gTaskSLA.setWorkflow(false);
gTaskSLA.autoSysFields(false);  //So Created On and By don't auto populate
gTaskSLA.insert();