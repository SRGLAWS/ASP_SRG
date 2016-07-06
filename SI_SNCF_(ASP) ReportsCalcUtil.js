//Description: Client script utilisé pour le calcul du rapport pourccentage Steria. Il est appelé par le scheduled job ''
//Client callable: true

//Script:
var ReportsCalcUtil = Class.create();
ReportsCalcUtil.prototype = {
	initialize: function() {
	},
	
	beginOfDay: function () {
		var st = gs.beginningOfYesterday();
		var start = new GlideDateTime(st.toString());
		var gtime1 = new GlideTime();
		gtime1.setValue("01:00:00");
		start.add(gtime1);
		//gs.log('START: ' + start);
		return start;
	},
	
	endOfDay: function () {
		var ed = gs.endOfYesterday();
		var end = new GlideDateTime(ed.toString());
		var gtime1 = new GlideTime();
		gtime1.setValue("01:00:00");
		end.add(gtime1);
		//gs.log('END: ' + end);
		return end;
	},
	
	beginOfMonth: function () {
		var st = gs.beginningOfThisMonth();
		var start = new GlideDateTime(st.toString());
		return start;
	},
	
	endOfMonth: function () {
		var ed = gs.endOfThisMonth();
		var end = new GlideDateTime(ed.toString());
		return end;
	},
	
	countCall: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideAggregate('new_call');
		count1.addQuery('opened_at', '>=', start);
		count1.addQuery('opened_at', '<=', end);
		count1.addAggregate('COUNT');
		count1.query();
		var total_call = 0;
		if (count1.next()) {
			total_call = count1.getAggregate('COUNT');
		}
		return total_call;
	},
	
	count_UC_pec_SD: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.query();
		var total_UC_pec_SD = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', '5d23bc126fdf860025d4df971e3ee48a');
			count2.query();
			total_UC_pec_SD = total_UC_pec_SD + count2.getRowCount();
		}
		return total_UC_pec_SD;
	},
	
	countInc: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideAggregate('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addAggregate('COUNT');
		count1.query();
		var total_inc = 0;
		if (count1.next()) {
			total_inc = count1.getAggregate('COUNT');
		}
		return total_inc;
	},
	
	countIncMonth: function (app) {
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		
		var count1 = new GlideAggregate('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', app);
		count1.addAggregate('COUNT');
		count1.query();
		var total_inc = 0;
		if (count1.next()) {
			total_inc = count1.getAggregate('COUNT');
		}
		return total_inc;
	},
	
	count_UC_pec_ERP_GEST_CAPA_exRN2: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.query();
		var total_UC_pec_ERP_GEST_CAPA = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addEncodedQuery('slaINca50b6976fd01600d6dec8892e3ee4a1,7c76f6d76fd01600d6dec8892e3ee457,1a073e976fd01600d6dec8892e3ee4f0');
			count2.query();
			total_UC_pec_ERP_GEST_CAPA = total_UC_pec_ERP_GEST_CAPA + count2.getRowCount();
		}
		return total_UC_pec_ERP_GEST_CAPA;
	},
	
	count_UC_pec_ERP_GEST_CAPA_exEGS: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.query();
		var total_UC_pec_ERP_GEST_CAPA = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addEncodedQuery('slaIN3d003dfb6f08920025d4df971e3ee47d,cf2472d76fd01600d6dec8892e3ee487,1cd436d76fd01600d6dec8892e3ee4a9');
			count2.query();
			total_UC_pec_ERP_GEST_CAPA = total_UC_pec_ERP_GEST_CAPA + count2.getRowCount();
		}
		return total_UC_pec_ERP_GEST_CAPA;
	},
	
	count_UC_trait_ERP: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_ERP = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'b281be976fd01600d6dec8892e3ee4e0');
			count2.query();
			total_UC_trait_ERP = total_UC_trait_ERP + count2.getRowCount();
		}
		return total_UC_trait_ERP;
	},
	
	count_UC_trait_GEST: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_GEST = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'a548bad76fd01600d6dec8892e3ee43a');
			count2.query();
			total_UC_trait_GEST = total_UC_trait_GEST + count2.getRowCount();
		}
		return total_UC_trait_GEST;
	},
	
	count_UC_trait_CAPA: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_CAPA = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'bc09fad76fd01600d6dec8892e3ee4e5');
			count2.query();
			total_UC_trait_CAPA = total_UC_trait_CAPA + count2.getRowCount();
		}
		return total_UC_trait_CAPA;
	},
	
	count_UC_trait_NOMAD: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_NOMAD = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', '15ba721b6fd01600d6dec8892e3ee431');
			count2.query();
			total_UC_trait_NOMAD = total_UC_trait_NOMAD + count2.getRowCount();
		}
		return total_UC_trait_NOMAD;
	},
	
	count_UC_trait_ERP_ic10: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_ERP = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'b281be976fd01600d6dec8892e3ee4e0');
			count2.query();
			total_UC_trait_ERP = total_UC_trait_ERP + count2.getRowCount();
		}
		return total_UC_trait_ERP;
	},
	
	count_UC_trait_GEST_ic10: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_GEST = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'a548bad76fd01600d6dec8892e3ee43a');
			count2.query();
			total_UC_trait_GEST = total_UC_trait_GEST + count2.getRowCount();
		}
		return total_UC_trait_GEST;
	},
	
	count_UC_trait_CAPA_ic10: function () {
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_n2_reassignment_count', '<=', 0);
		count1.query();
		var total_UC_trait_CAPA = 0;
		while (count1.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count1.sys_id);
			count2.addQuery('sla', 'bc09fad76fd01600d6dec8892e3ee4e5');
			count2.query();
			total_UC_trait_CAPA = total_UC_trait_CAPA + count2.getRowCount();
		}
		return total_UC_trait_CAPA;
	},
	
	
	
	
	// Taux de décroché
	ic1: function () {
		var total_call = this.countCall();
		//gs.log('TOTAL CALL DU JOUR: ' + total_call);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic1Res;
		
		var count2 = new GlideAggregate('new_call');
		count2.addQuery('opened_at', '>=', start);
		count2.addQuery('opened_at', '<=', end);
		count2.addQuery('u_status', 'answered');
		count2.addAggregate('COUNT');
		count2.query();
		var call_answered = 0;
		if (count2.next()) {
			call_answered = count2.getAggregate('COUNT');
			//gs.log('CALL DECROCHE: ' + call_answered);
		}
		
		if (call_answered == 0 || total_call == 0) {
			ic1Res = 0;
		} else {
			var pcnt = (call_answered/total_call) * 100;
			ic1Res = pcnt.toFixed(2);
		}
		return ic1Res;
	},
	
	// Taux de dissuadé
	ic2: function () {
		var total_call = this.countCall();
		//gs.log('TOTAL CALL DU JOUR: ' + total_call);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic2Res;
		
		var count2 = new GlideAggregate('new_call');
		count2.addQuery('opened_at', '>=', start);
		count2.addQuery('opened_at', '<=', end);
		count2.addQuery('u_status', 'dissuasion');
		count2.addAggregate('COUNT');
		count2.query();
		var call_answered = 0;
		if (count2.next()) {
			call_answered = count2.getAggregate('COUNT');
			//gs.log('CALL DISSUADE: ' + call_answered);
		}
		
		if (call_answered == 0 || total_call == 0) {
			ic2Res = 0;
		} else {
			var pcnt = (call_answered/total_call) * 100;
			ic2Res = pcnt.toFixed(2);
		}
		return ic2Res;
	},
	
	// Taux de relance des Sollicitations Non Traités
	ic3: function () {
		var total_uc_pec_sd = this.count_UC_pec_SD();
		//gs.log('TOTAL UC PRISE EN COMPTE SD DU JOUR: ' + total_uc_pec_sd);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic3Res;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.query();
		var uc_pec_sd_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('sla', '5d23bc126fdf860025d4df971e3ee48a');
			count1.addQuery('stage', '!=', 'breached');
			count1.query();
			uc_pec_sd_nonrompu = uc_pec_sd_nonrompu + count1.getRowCount();
		}
		//gs.log('UC PRISE EN COMPTE SD NON ROMPUS : ' + uc_pec_sd_nonrompu);
		
		if (uc_pec_sd_nonrompu == 0 || total_uc_pec_sd == 0) {
			ic3Res = 0;
		} else {
			var pcnt = (uc_pec_sd_nonrompu/total_uc_pec_sd) * 100;
			ic3Res = pcnt.toFixed(2);
		}
		return ic3Res;
	},
	
	// Taux d'incidents clôturés par le HelpDesk sans escalade
	ic5: function () {
		var total_inc = this.countInc();
		//gs.log('TOTAL INC RESOLUS DU JOUR: ' + total_inc);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic5Res;
		
		var count2 = new GlideAggregate('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		//count2.addQuery('assignment_group', '2d556c306fcb3100d6dec8892e3ee4fe');
		count2.addQuery('reassignment_count', '<', '2');
		count2.addAggregate('COUNT');
		count2.query();
		var inc_resolved = 0;
		if (count2.next()) {
			inc_resolved = count2.getAggregate('COUNT');
			//gs.log('INC RESOLUS SANS ESC PAR SD: ' + inc_resolved);
		}
		
		if (inc_resolved == 0 || total_inc == 0) {
			ic5Res = 0;
		} else {
			var pcnt = (inc_resolved/total_inc) * 100;
			ic5Res = pcnt.toFixed(2);
		}
		return ic5Res;
	},
	
	// Taux de respect des délais de prise en compte des dossiers en retours N2 dans les 2h (HO)
	ic6: function () {
		var total_uc_pec_erp_gest_capa = this.count_UC_pec_ERP_GEST_CAPA_exRN2();
		//gs.log('TOTAL UC PRISE EN COMPTE ERP, GESTION ET CAPA DU JOUR (NON SD) : ' + total_uc_pec_erp_gest_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic6Res;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.query();
		var uc_pec_erp_gest_capa_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('stage', '!=', 'breached');
			count1.addEncodedQuery('slaINca50b6976fd01600d6dec8892e3ee4a1,7c76f6d76fd01600d6dec8892e3ee457,1a073e976fd01600d6dec8892e3ee4f0');
			count1.query();
			uc_pec_erp_gest_capa_nonrompu = uc_pec_erp_gest_capa_nonrompu + count1.getRowCount();
		}
		//gs.log('UC PRISE EN COMPTE ERP, GESTION ET CAPA, NON ROMPUS (NON SD) : ' + uc_pec_erp_gest_capa_nonrompu);
		
		if (uc_pec_erp_gest_capa_nonrompu == 0 || total_uc_pec_erp_gest_capa == 0) {
			ic6Res = 0;
		} else {
			var pcnt = (uc_pec_erp_gest_capa_nonrompu/total_uc_pec_erp_gest_capa) * 100;
			ic6Res = pcnt.toFixed(2);
		}
		return ic6Res;
	},
	
	// Taux de respect des délais de prise en compte des dossiers escaladés par le SD dans les 1h (HO)
	ic7: function () {
		var total_uc_pec_erp_gest_capa = this.count_UC_pec_ERP_GEST_CAPA_exEGS();
		//gs.log('TOTAL UC PRISE EN COMPTE ERP, GESTION ET CAPA DU JOUR (SD) : ' + total_uc_pec_erp_gest_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic7Res;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.query();
		var uc_pec_erp_gest_capa_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('stage', '!=', 'breached');
			count1.addEncodedQuery('slaIN3d003dfb6f08920025d4df971e3ee47d,cf2472d76fd01600d6dec8892e3ee487,1cd436d76fd01600d6dec8892e3ee4a9');
			count1.query();
			uc_pec_erp_gest_capa_nonrompu = uc_pec_erp_gest_capa_nonrompu + count1.getRowCount();
		}
		//gs.log('UC PRISE EN COMPTE ERP, GESTION ET CAPA, NON ROMPUS (SD) : ' + uc_pec_erp_gest_capa_nonrompu);
		
		if (uc_pec_erp_gest_capa_nonrompu == 0 || total_uc_pec_erp_gest_capa == 0) {
			ic7Res = 0;
		} else {
			var pcnt = (uc_pec_erp_gest_capa_nonrompu/total_uc_pec_erp_gest_capa) * 100;
			ic7Res = pcnt.toFixed(2);
		}
		return ic7Res;
	},
	
	// Taux de respect des délais de traitement des dossiers ERP sans escalade en N2
	ic9a: function () {
		var total_uc_trait_erp = this.count_UC_trait_ERP();
		//gs.log('TOTAL UC TRAITEMENT ERP DU JOUR: ' + total_uc_trait_erp);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic9aRes;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.query();
		var uc_trait_erp_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('sla', 'b281be976fd01600d6dec8892e3ee4e0');
			count1.addQuery('stage', '!=', 'breached');
			count1.query();
			uc_trait_erp_nonrompu = uc_trait_erp_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT ERP NON ROMPUS : ' + uc_trait_erp_nonrompu);
		
		if (uc_trait_erp_nonrompu == 0 || total_uc_trait_erp == 0) {
			ic9aRes = 0;
		} else {
			var pcnt = (uc_trait_erp_nonrompu/total_uc_trait_erp) * 100;
			ic9aRes = pcnt.toFixed(2);
		}
		return ic9aRes;
	},
	
	// Taux de repsect des délais de traitement des dossiers Gestion sans escalade en N2
	ic9b: function () {
		var total_uc_trait_gest = this.count_UC_trait_GEST();
		//gs.log('TOTAL UC TRAITEMENT GESTION DU JOUR: ' + total_uc_trait_gest);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic9bRes;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.query();
		var uc_trait_gest_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('sla', 'a548bad76fd01600d6dec8892e3ee43a');
			count1.addQuery('stage', '!=', 'breached');
			count1.query();
			uc_trait_gest_nonrompu = uc_trait_gest_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT GESTION NON ROMPUS : ' + uc_trait_gest_nonrompu);
		
		if (uc_trait_gest_nonrompu == 0 || total_uc_trait_gest == 0) {
			ic9bRes = 0;
		} else {
			var pcnt = (uc_trait_gest_nonrompu/total_uc_trait_gest) * 100;
			ic9bRes = pcnt.toFixed(2);
		}
		return ic9bRes;
	},
	
	// Taux de respect des délais de traitement des dossiers Capa sans escalade en N2
	ic9c: function () {
		var total_uc_trait_capa = this.count_UC_trait_CAPA();
		//gs.log('TOTAL UC TRAITEMENT CAPA DU JOUR: ' + total_uc_trait_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic9cRes;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.query();
		var uc_trait_capa_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('sla', 'bc09fad76fd01600d6dec8892e3ee4e5');
			count1.addQuery('stage', '!=', 'breached');
			count1.query();
			uc_trait_capa_nonrompu = uc_trait_capa_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT CAPA NON ROMPUS : ' + uc_trait_capa_nonrompu);
		
		if (uc_trait_capa_nonrompu == 0 || total_uc_trait_capa == 0) {
			ic9cRes = 0;
		} else {
			var pcnt = (uc_trait_capa_nonrompu/total_uc_trait_capa) * 100;
			ic9cRes = pcnt.toFixed(2);
		}
		return ic9cRes;
	},
	
	// Taux de respect des délais de traitement des dossiers Nomade sans escalade en N2
	ic9d: function () {
		var total_uc_trait_nomad = this.count_UC_trait_NOMAD();
		//gs.log('TOTAL UC TRAINTEMENT NOMADE DU JOUR: ' + total_uc_trait_nomad);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic9dRes;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.query();
		var uc_trait_nomad_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('sla', '15ba721b6fd01600d6dec8892e3ee431');
			count1.addQuery('stage', '!=', 'breached');
			count1.query();
			uc_trait_nomad_nonrompu = uc_trait_nomad_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT NOMADE NON ROMPUS : ' + uc_trait_nomad_nonrompu);
		
		if (uc_trait_nomad_nonrompu == 0 || total_uc_trait_nomad == 0) {
			ic9dRes = 0;
		} else {
			var pcnt = (uc_trait_nomad_nonrompu/total_uc_trait_nomad) * 100;
			ic9dRes = pcnt.toFixed(2);
		}
		return ic9dRes;
	},
	
	// Taux de respect des délais de traitement des dossiers Steria sans escalade en N2
	ic9e: function () {
		var total_uc_trait_steria = this.count_UC_trait_ERP() + this.count_UC_trait_GEST() + this.count_UC_trait_CAPA() ;
		//gs.log('TOTAL UC TRAINTEMENT STERIA DU JOUR, SANS ESC N2 : ' + total_uc_trait_steria);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic9eRes;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.query();
		var uc_trait_steria_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('stage', '!=', 'breached');
			count1.addEncodedQuery('slaINb281be976fd01600d6dec8892e3ee4e0,a548bad76fd01600d6dec8892e3ee43a,bc09fad76fd01600d6dec8892e3ee4e5');
			count1.query();
			uc_trait_steria_nonrompu = uc_trait_steria_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT STERIA NON ROMPUS, SANS ESC N2 : ' + uc_trait_steria_nonrompu);
		
		if (uc_trait_steria_nonrompu == 0 || total_uc_trait_steria == 0) {
			ic9eRes = 0;
		} else {
			var pcnt = (uc_trait_steria_nonrompu/total_uc_trait_steria) * 100;
			ic9eRes = pcnt.toFixed(2);
		}
		return ic9eRes;
	},
	
	// Taux de respect des délais de traitement des dossiers Steria
	ic10: function () {
		var total_uc_trait_steria = this.count_UC_trait_ERP_ic10() + this.count_UC_trait_GEST_ic10() + this.count_UC_trait_CAPA_ic10() ;
		//gs.log('TOTAL UC TRAINTEMENT STERIA DU JOUR: ' + total_uc_trait_steria);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic10Res;
		
		var count2 = new GlideRecord('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.query();
		var uc_trait_steria_nonrompu = 0;
		while (count2.next()) {
			var count1 = new GlideRecord('task_sla');
			count1.addQuery('task', count2.sys_id);
			count1.addQuery('stage', '!=', 'breached');
			count1.addEncodedQuery('slaINb281be976fd01600d6dec8892e3ee4e0,a548bad76fd01600d6dec8892e3ee43a,bc09fad76fd01600d6dec8892e3ee4e5');
			count1.query();
			uc_trait_steria_nonrompu = uc_trait_steria_nonrompu + count1.getRowCount();
		}
		//gs.log('UC TRAITEMENT STERIA NON ROMPUS : ' + uc_trait_steria_nonrompu);
		
		if (uc_trait_steria_nonrompu == 0 || total_uc_trait_steria == 0) {
			ic10Res = 0;
		} else {
			var pcnt = (uc_trait_steria_nonrompu/total_uc_trait_steria) * 100;
			ic10Res = pcnt.toFixed(2);
		}
		return ic10Res;
	},
	
	// Taux d'escalade N2 (Projet N2 et +)
	ic11: function () {
		var total_inc = this.countInc();
		//gs.log('TOTAL INC RESOLUS DU JOUR: ' + total_inc);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		var ic11Res;
		
		var count2 = new GlideAggregate('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('reassignment_count', '>=', '2');
		count2.addAggregate('COUNT');
		count2.query();
		var inc_resolved = 0;
		if (count2.next()) {
			inc_resolved = count2.getAggregate('COUNT');
			//gs.log('INC RESOLUS ESC N2: ' + inc_resolved);
		}
		
		if (inc_resolved == 0 || total_inc == 0) {
			ic11Res = 0;
		} else {
			var pcnt = (inc_resolved/total_inc) * 100;
			ic11Res = pcnt.toFixed(2);
		}
		return ic11Res;
	},
	
	// Autonomie : 80% de résolutions ASU
	s02i01_id11 : function (service) {
		var app = service;
		var b = this.countIncMonth(app);
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s02i01_id11Res;
		
		var count2 = new GlideAggregate('incident');
		count2.addQuery('resolved_at', '>=', start);
		count2.addQuery('resolved_at', '<=', end);
		count2.addQuery('u_business_service', service);
		count2.addQuery('u_n2_reassignment_count', '<=', 0);
		count2.addAggregate('COUNT');
		count2.query();
		var a = 0;
		if (count2.next()) {
			a = count2.getAggregate('COUNT');
		}
		
		if (a == 0 || b == 0) {
			s02i01_id11Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s02i01_id11Res = pcnt.toFixed(2);
		}
		return s02i01_id11Res;
	},
	
	// Prises en compte par ASU : 90% des demandes < 8H
	s02i02_id4 : function (service) {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s02i02_id4Res;
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', service);
		count1.query();
		var a = 0;
		while (count1.next()) {
			var count = new GlideRecord('task_sla');
			count.addQuery('task', count1.sys_id);
			count.addEncodedQuery('sla=8f1b2fee0fb21600a1bcc98b03050e04^stage!=breached');
			count.query();
			a = count.getRowCount();
		}
		
		var count3 = new GlideRecord('incident');
		count3.addQuery('resolved_at', '>=', start);
		count3.addQuery('resolved_at', '<=', end);
		count3.query();
		var b = 0;
		while (count3.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count3.sys_id);
			count2.addEncodedQuery('sla=8f1b2fee0fb21600a1bcc98b03050e04');
			count2.query();
			b = count2.getRowCount();
		}
		
		if (a == 0 || b == 0) {
			s02i02_id4Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s02i02_id4Res = pcnt.toFixed(2);
		}
		return s02i02_id4Res;
	},
	
	// Résolutions par ASU : 90% des résolutions < 8H
	s02i03_id5 : function (service) {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s02i03_id5Res;
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', service);
		count1.query();
		var a = 0;
		while (count1.next()) {
			var count = new GlideRecord('task_sla');
			count.addQuery('task', count1.sys_id);
			count.addEncodedQuery('sla=47a8c16d0f4b16002c5ff77ce1050e04^stage!=breached');
			count.query();
			a = count.getRowCount();
		}
		
		var count3 = new GlideRecord('incident');
		count3.addQuery('resolved_at', '>=', start);
		count3.addQuery('resolved_at', '<=', end);
		count3.query();
		var b = 0;
		while (count3.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count3.sys_id);
			count2.addEncodedQuery('sla=47a8c16d0f4b16002c5ff77ce1050e04');
			count2.query();
			b = count2.getRowCount();
		}
		
		if (a == 0 || b == 0) {
			s02i03_id5Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s02i03_id5Res = pcnt.toFixed(2);
		}
		return s02i03_id5Res;
	},
	
	// Transferts ASU vers N2 : 90% des transferts < 4H
	s02i04_id6 : function (service) {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s02i04_id6Res;
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', service);
		count1.query();
		var a = 0;
		while (count1.next()) {
			var count = new GlideRecord('task_sla');
			count.addQuery('task', count1.sys_id);
			count.addEncodedQuery('sla=ca198dad0f4b16002c5ff77ce1050ec4^stage!=breached^ORstage=NULL');
			count.query();
			a = count.getRowCount();
		}
		
		var count3 = new GlideRecord('incident');
		count3.addQuery('resolved_at', '>=', start);
		count3.addQuery('resolved_at', '<=', end);
		count3.query();
		var b = 0;
		while (count3.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count3.sys_id);
			count2.addEncodedQuery('sla=ca198dad0f4b16002c5ff77ce1050ec4');
			count2.query();
			b = count2.getRowCount();
		}
		
		if (a == 0 || b == 0) {
			s02i04_id6Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s02i04_id6Res = pcnt.toFixed(2);
		}
		return s02i04_id6Res;
	},
	
	// Transfert par ASU de la réponse du N2 à l'utilisateur : 90% des actions < 2H
	s02i05_id7 : function (service) {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s02i05_id7Res;
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', service);
		count1.query();
		var a = 0;
		while (count1.next()) {
			var count = new GlideRecord('task_sla');
			count.addQuery('task', count1.sys_id);
			count.addEncodedQuery('sla=e0866f2a0fb21600a1bcc98b03050e93^ORsla=49e827ee0fb21600a1bcc98b03050ee5^ORsla=7797e3ee0fb21600a1bcc98b03050e2f^ORsla=8f1b2fee0fb21600a1bcc98b03050e04^stage!=breached');
			count.query();
			a = count.getRowCount();
		}
		
		var count3 = new GlideRecord('incident');
		count3.addQuery('resolved_at', '>=', start);
		count3.addQuery('resolved_at', '<=', end);
		count3.query();
		var b = 0;
		while (count3.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count3.sys_id);
			count2.addEncodedQuery('sla=e0866f2a0fb21600a1bcc98b03050e93^ORsla=49e827ee0fb21600a1bcc98b03050ee5^ORsla=7797e3ee0fb21600a1bcc98b03050e2f^ORsla=8f1b2fee0fb21600a1bcc98b03050e04');
			count2.query();
			b = count2.getRowCount();
		}
		
		if (a == 0 || b == 0) {
			s02i05_id7Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s02i05_id7Res = pcnt.toFixed(2);
		}
		return s02i05_id7Res;
	},
	
	// Rappel des appels perdus : 95% des rappels < 2H
	s03i03_id10 : function (service) {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var s03i03_id10Res;
		
		var count1 = new GlideRecord('incident');
		count1.addQuery('resolved_at', '>=', start);
		count1.addQuery('resolved_at', '<=', end);
		count1.addQuery('u_business_service', service);
		count1.query();
		var a = 0;
		while (count1.next()) {
			var count = new GlideRecord('task_sla');
			count.addQuery('task', count1.sys_id);
			count.addEncodedQuery('sla=5d23bc126fdf860025d4df971e3ee48a^stage!=breached');
			count.query();
			a = count.getRowCount();
		}
		
		var count3 = new GlideRecord('incident');
		count3.addQuery('resolved_at', '>=', start);
		count3.addQuery('resolved_at', '<=', end);
		count3.query();
		var b = 0;
		while (count3.next()) {
			var count2 = new GlideRecord('task_sla');
			count2.addQuery('task', count3.sys_id);
			count2.addEncodedQuery('sla=5d23bc126fdf860025d4df971e3ee48a');
			count2.query();
			b = count2.getRowCount();
		}
		
		if (a == 0 || b == 0) {
			s03i03_id10Res = 0;
		} else {
			var pcnt = (a/b) * 100;
			s03i03_id10Res = pcnt.toFixed(2);
		}
		return s03i03_id10Res;
	},
	
	ftm : function (service) {
		
		var app = service;
		var a = this.countIncMonth(app);
		var ftm;
		
		if (a == 0) {
			ftm = 0;
		} else {
			ftm = a;
		}
		return a;
	},
	
	// Insertion dans la table
	insert_in_table: function() {
		var gr = new GlideRecord('u_asp_reports_calc');
		gr.initialize();
		gr.u_ic1_taux_de_decroche = this.ic1();
		gr.u_ic2_taux_de_dissuade = this.ic2();
		gr.u_ic3 = this.ic3();
		gr.u_ic5_taux_inc_clos_sd_sans_es = this.ic5();
		gr.u_ic6 = this.ic6();
		gr.u_ic7 = this.ic7();
		gr.u_ic9a = this.ic9a();
		gr.u_ic9b = this.ic9b();
		gr.u_ic9c = this.ic9c();
		gr.u_ic9d = this.ic9d();
		gr.u_ic9e = this.ic9e();
		gr.u_ic10 = this.ic10();
		gr.u_ic11_taux_esc_n2 = this.ic11();
		gr.insert();
	},
	
	insert_in_table_month: function() {
		
		var start = this.beginOfMonth();
		var end = this.endOfMonth();
		var gdt = new GlideDateTime(); //December
		var month = gdt.getMonthLocalTime() + '-' + gdt.getYearLocalTime() ;
		
		var incserv = new GlideAggregate('incident');
		incserv.addQuery('resolved_at', '>=', start);
		incserv.addQuery('resolved_at', '<=', end);
		incserv.groupBy('u_business_service');
		incserv.query();
		while (incserv.next()) {
			
			var grm = new GlideRecord('u_reports_monthly');
			grm.initialize();
			grm.u_service = incserv.u_business_service;
			grm.u_month = month;
			grm.u_s02i01_id11 = this.s02i01_id11(incserv.u_business_service.toString());
			grm.u_s02i02_id4 = this.s02i02_id4(incserv.u_business_service.toString());
			grm.u_s02i03_id5 = this.s02i03_id5(incserv.u_business_service.toString());
			grm.u_s02i04_id6 = this.s02i04_id6(incserv.u_business_service.toString());
			grm.u_s02i05_id7 = this.s02i05_id7(incserv.u_business_service.toString());
			grm.u_s03i03_id10 = this.s03i03_id10(incserv.u_business_service.toString());
			grm.u_ftm = this.ftm(incserv.u_business_service.toString());
			grm.insert();
		}
	}
	
};