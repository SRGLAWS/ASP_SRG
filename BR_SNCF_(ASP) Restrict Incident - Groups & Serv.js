//Table: Incident
//When: before - query

//Script:
restrictIncidentsPerGroupsServices();

function restrictIncidentsPerGroupsServices() {
	if (!gs.hasRole("admin")) {
		var userlist = '';
		var grouplist = '';
		var BSlist = '';
		
		// We look far all groups to which the current user belongs to
		var GroupsysUserGrmember = new GlideRecord('sys_user_grmember');
		GroupsysUserGrmember.addQuery('user',gs.getUserID());
		GroupsysUserGrmember.query();
		
		while (GroupsysUserGrmember.next()) {
			
			// We look far all groups to which the current user belongs to and which have visibility "Per Groups"
			var group = new GlideRecord('sys_user_group');
			group.addQuery('sys_id',GroupsysUserGrmember.group.sys_id.toString());
			group.addQuery('u_incident_list_view','1');
			group.query();
			
			// Compose a groups list with the results of the queries
			while (group.next()) {
				if (group == '') {
					grouplist = group.sys_id;
				} else {
					grouplist = grouplist + ',' + group.sys_id;
				}
				
				// For each of these groups we need to look for all associated users
				var UsersysUserGrmember = new GlideRecord('sys_user_grmember');
				UsersysUserGrmember.addQuery('group',group.sys_id.toString());
				UsersysUserGrmember.query();
				
				// Compose a users list with the results of the queries
				while (UsersysUserGrmember.next()) {
					if (UsersysUserGrmember == '') {
						userlist = UsersysUserGrmember.user;
					} else {
						userlist = userlist + ',' + UsersysUserGrmember.user;
					}
				}
			}
			
			
			
			// We look far all groups to which the current user belongs to and which have visibility "Per Services"
			var group1 = new GlideRecord('sys_user_group');
			group1.addQuery('sys_id',GroupsysUserGrmember.group.sys_id.toString());
			group1.addQuery('u_incident_list_view','0');
			group1.query();
			
			// Compose a groups list with the results of the queries
			while (group1.next()) {
				
				// For each of these groups we need to look for all associated users
				var groupServices = new GlideRecord('u_m2m_services_groups');
				groupServices.addQuery('u_group',group1.sys_id.toString());
				groupServices.query();
				
				// Compose a users list with the results of the queries
				while (groupServices.next()) {
					if (groupServices == '') {
						BSlist = groupServices.u_business_service;
					} else {
						BSlist = BSlist + ',' + groupServices.u_business_service;
					}
				}
			}
			
		}
		//gs.log("GROUP LIST : "+grouplist);
		//gs.log("USER LIST: "+userlist);
		//gs.log("BS LIST: "+BSlist);
		var q = current.addQuery('opened_by', 'IN', userlist).addOrCondition('assignment_group', 'IN', grouplist);
		q.addOrCondition('u_business_service.sys_id', 'IN', BSlist);
	}
}