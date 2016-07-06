//Table: Global

//Script:
function ctiSNCF() {
	var url = null;
	
	//Business Phone
	var phone = sysparm_caller_phone.replace("+","%2B"); // replace "+" by its enconding
	
	//Application code
	//var app = sysparm_app_code;
	var app = sysparm_app_code.split(".")[1]; // Solution de contournement - mise en place le 14/01/2016 par SLA
	
	//AVAYA ID
	var avaya_id = sysparm_avaya_id;
	
	//Event : ringing, answered, released and missed
	var event = sysparm_event;
	
	//Caller
	var userID = '';
	if(phone!=''){
		userID1 = UserGetSysId("u_internal_phone", phone);
		userID2 = UserGetSysId("u_external_phone", phone);
		userID3 = UserGetSysId("u_mobile_phone", phone);
		
		if (userID1 !=''){
			userID = userID1;
		} else if (userID1 =='' && userID2 !=''){
			userID = userID2;
		} else if (userID2 =='' && userID3 !=''){
			userID = userID3;
		} else{//Unkonwn phone number then 'Guest'
		var userID = new GlideRecord('sys_user');
		userID.get(gs.getProperty('asp.cti.guest.user'));
		
	}
} else { // Anonymous call then '
var userID = new GlideRecord('sys_user');
userID.get(gs.getProperty('asp.cti.secret.indentite.user'));
}


switch(event) {
	
	case 'ringing':

	//Service (e.g application)
	var service = new GlideRecord('cmdb_ci_service');
	service.addQuery('u_code_avaya',app);
	service.query();
	service.next();
	
	url = "sys_user.do?sys_id=-1" + "&sysparm_view=cti&sysparm_query=phone="+phone.toString()+"^u_name="+userID.name+"^company="+userID.company+"^u_e_sumatra="+userID.u_e_sumatra+"^u_business_service ="+service.sys_id+"^u_status=incoming";
	
	break;
	

	case 'answered':

	var service = new GlideRecord('cmdb_ci_service');
	service.addQuery('u_code_avaya',app);
	service.query();
	service.next();
	
	var newCall = new GlideRecord('new_call');
	newCall.caller = userID.sys_id;
	newCall.u_phone = phone;
	newCall.u_status = 'answered';
	newCall.u_application_code = app;
	newCall.u_business_service = service.sys_id;
	newCall.u_avaya_id = avaya_id;
	newCall.insert();
	
	//url = "new_call.do?sys_id=" + newCall.sys_id  + "&sysparm_view=cti";
	url = "new_call.do?sys_id=" + newCall.sys_id  + "&sysparm_view=cti&sysparm_view=cti&sysparm_nostack=yes";
		
	break;

	
	case 'released':
	
	var newCall = new GlideRecord('new_call');
	//newCall.addQuery('caller',userID.sys_id);
	newCall.addQuery('u_avaya_id',avaya_id);
	newCall.addQuery('u_released_at','');
	newCall.orderByDesc('sys_created_on');
	newCall.query();
	
	if(newCall.next()){
		
		var currentDate = new GlideDateTime();
		newCall.time_spent = gs.dateDiff(newCall.opened_at.getDisplayValue(), currentDate);
		newCall.u_released_at = currentDate;
		newCall.u_status = 'released';
		newCall.update();
		url = "new_call.do?sys_id=" + newCall.sys_id + "&sysparm_view=cti";
	} else {
		//url = 'navpage.do';
	}
	
	//answer = 'navpage.do';
	//return false;
	
	break;
	

	case 'missed':
	
	var service = new GlideRecord('cmdb_ci_service');
	service.addQuery('u_code_avaya',app);
	service.query();
	service.next();
	
	/*var newCall = new GlideRecord('new_call');
	newCall.caller = userID.sys_id;
	newCall.u_status = 'Call Missed';
	newCall.u_application_code = app;
	newCall.u_business_service = service.sys_id;
	newCall.u_avaya_id = avaya_id;
	newCall.insert();*/
	
	url = "new_call.do?sys_id=-1" ;
	url += "&sysparm_view=cti&sysparm_query=u_phone="+phone.toString();
	url += "^caller="+userID.sys_id;
	//url += "^company="+userID.company;
	url += "^u_e_sumatra="+userID.u_e_sumatra;
	url += "^u_business_service="+service.sys_id;
	url += "^u_status=missed";
	//url += "^u_application_code="+app;
	url += "^u_avaya_id="+avaya_id;
	
	//url = "new_call.do?sys_id=" + newCall.sys_id + "&sysparm_view=cti";

	break;
}
answer = url;
return url;
}

function UserGetSysId(field, value) {
	var user = new GlideRecord("sys_user");
	user.addQuery(field, value);
	user.query();
	if (user.next()) {
		return user;
	} else {
		return '';
	}
}