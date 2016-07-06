//Table: Task SLA
//When: after - Insert & Update
//Condition: !current.sla.nil() && !current.task.nil() && current.sla.type == "SLA"

//Script:
// ASP - 16.03.2011
// Updates the 'SLA due' and 'Escalation' fields at the task level
// in accordance with the Planned end date and the duration.

var tsk = current.task.getRefRecord();
updateSlaDue(tsk);
updateEscalation(tsk);

/**
 * Update the SLA due field (sla_due) with the planned end date of the
 * most restrictive task sla running on the record. It will always pick up 
 * the closest due date among the running task slas of a particular task.
 */
function updateSlaDue(/*Task GlideRecord*/ tsk){
      var value = 0;
      var tskSla = _getMostRestTaskSla(tsk.sys_id);
      if (tskSla == false) {
            _resetTaskSlaInfo(tsk);
            return;
      }
      value = tskSla.planned_end_time; 
      if(value != tsk.sla_due && current.sla.type == "SLA"){
            tsk.setWorkflow(false);
            tsk.sla_due = value;
            gs.log("ASP - SLA due updated for task " + tsk.number + " to " + value);
            tsk.update();
      }
}

/**
 * Update the escalation in accordance with the elapsed time of the most
 * restrictive task sla running on the record. It will always pick up the shortest
 * task sla duration among the running task slas of a particular task.
 * - 50% = Moderate
 * - 75% = High
 * - 100% = Overdue
 */
function updateEscalation(/*Task GlideRecord*/ tsk){
      var value = 0;
      var tskSla = _getMostRestTaskSla(tsk.sys_id);
      if (tskSla == false) {
            _resetTaskSlaInfo(tsk);
            return;
      }
      var percStr = tskSla.business_percentage.toString();
      if(percStr == ""){
            percStr = tskSla.percentage.toString();
            if(percStr == ""){
                  return;
            }
      }
      var perc = parseInt(percStr);
      if(perc < 50){
            value = 0;
      }else if(perc >= 50 && perc < 75){
            value = 1;
      }else if(perc >= 75 && perc < 100){
            value = 2;
      }else if(perc > 100){
            value = 3;
      }else{
            value = 0;
      }
      if(value != tsk.escalation && current.sla.type == "SLA"){
            tsk.setWorkflow(false);
            tsk.escalation = value;
            gs.log("ASP - Escalation updated for task " + tsk.number + " to " + value);
            tsk.update();
      }
}

// Reset the sla due and escalation field in the task record if no valid slas are running.
function _resetTaskSlaInfo(/*Task GlideRecord*/ tsk){
      var doUpdate = false;
      if(tsk.sla_due != "") {
            doUpdate = true;
            tsk.sla_due = "";
      }
      if(tsk.escalation != 0){
            doUpdate = true;
            tsk.escalation = 0;
      }
      if(doUpdate)
            tsk.update();
}

// Get the gliderecords set of all task slas running for a task.
function _getMostRestTaskSla(/*sys_id*/ sysId){
      var tskSla = new GlideRecord("task_sla");
      tskSla.addActiveQuery();
      tskSla.addQuery("task", sysId);
      tskSla.addQuery("sla.type", "SLA");
      // Order by ASC to get the smallest duration
      tskSla.orderBy("planned_end_date");
      // Order by DESC to get the longest duration
      // tskSla.orderByDesc("planned_end_date");
      tskSla.setLimit(1);
      tskSla.query();
      var isAvailable = tskSla.next();
      return  (isAvailable) ? tskSla : false;
}