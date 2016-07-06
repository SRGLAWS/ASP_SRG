var ReportsCalcUtil = Class.create();
ReportsCalcUtil.prototype = {
	initialize: function() {
	},
	
	beginOfDay: function () {
		var start = gs.beginningOfYesterday();
		//start.addSecondsLocalTime(3600);
		var gtime1 = new GlideTime();
gtime1.setValue("01:00:00");
start.add(gtime1);
		//gs.log('START: ' + start);
		return start;
	},
	
	endOfDay: function () {
		var end = gs.endOfYesterday();
		//end.addSecondsLocalTime(3600);
		var gtime1 = new GlideTime();
gtime1.setValue("01:00:00");
end.add(gtime1);
		//gs.log('END: ' + end);
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
		
		/*var start = gs.beginningOfToday();
		var end = gs.endOfToday();
		start.addSecondsLocalTime(3600);
		end.addSecondsLocalTime(3600);*/
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic1 = new GlideRecord('u_asp_reports_calc');
		ic1.query();
		if (ic1.next()) {
			if (call_answered == 0 || total_call == 0) {
				ic1.u_ic1_taux_de_decroche = 0;
			} else {
				var pcnt = (call_answered/total_call) * 100;
				ic1.u_ic1_taux_de_decroche = pcnt.toFixed(2);
			}
			ic1.update();
		}
	},
	
	// Taux de dissuadé
	ic2: function () {
		var total_call = this.countCall();
		//gs.log('TOTAL CALL DU JOUR: ' + total_call);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic2 = new GlideRecord('u_asp_reports_calc');
		ic2.query();
		if (ic2.next()) {
			if (call_answered == 0 || total_call == 0) {
				ic2.u_ic2_taux_de_dissuade = 0;
			} else {
				var pcnt = (call_answered/total_call) * 100;
				ic2.u_ic2_taux_de_dissuade = pcnt.toFixed(2);
			}
			ic2.update();
		}
	},
	
	// Taux de relance des Sollicitations Non Traités
	ic3: function () {
		var total_uc_pec_sd = this.count_UC_pec_SD();
		//gs.log('TOTAL UC PRISE EN COMPTE SD DU JOUR: ' + total_uc_pec_sd);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic3 = new GlideRecord('u_asp_reports_calc');
		ic3.query();
		if (ic3.next()) {
			if (uc_pec_sd_nonrompu == 0 || total_uc_pec_sd == 0) {
				ic3.u_ic3 = 0;
			} else {
				var pcnt = (uc_pec_sd_nonrompu/total_uc_pec_sd) * 100;
				ic3.u_ic3 = pcnt.toFixed(2);
			}
			ic3.update();
		}
	},
	
	// Taux d'incidents clôturés par le HelpDesk sans escalade
	ic5: function () {
		var total_inc = this.countInc();
		//gs.log('TOTAL INC RESOLUS DU JOUR: ' + total_inc);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic5 = new GlideRecord('u_asp_reports_calc');
		ic5.query();
		if (ic5.next()) {
			if (inc_resolved == 0 || total_inc == 0) {
				ic5.u_ic5_taux_inc_clos_sd_sans_es = 0;
			} else {
				var pcnt = (inc_resolved/total_inc) * 100;
				ic5.u_ic5_taux_inc_clos_sd_sans_es = pcnt.toFixed(2);
			}
			ic5.update();
		}
	},
	
	// Taux de respect des délais de prise en compte des dossiers en retours N2 dans les 2h (HO)
	ic6: function () {
		var total_uc_pec_erp_gest_capa = this.count_UC_pec_ERP_GEST_CAPA_exRN2();
		//gs.log('TOTAL UC PRISE EN COMPTE ERP, GESTION ET CAPA DU JOUR (NON SD) : ' + total_uc_pec_erp_gest_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic6 = new GlideRecord('u_asp_reports_calc');
		ic6.query();
		if (ic6.next()) {
			if (uc_pec_erp_gest_capa_nonrompu == 0 || total_uc_pec_erp_gest_capa == 0) {
				ic6.u_ic6 = 0;
			} else {
				var pcnt = (uc_pec_erp_gest_capa_nonrompu/total_uc_pec_erp_gest_capa) * 100;
				ic6.u_ic6 = pcnt.toFixed(2);
			}
			ic6.update();
		}
	},
	
	// Taux de respect des délais de prise en compte des dossiers escaladés par le SD dans les 1h (HO)
	ic7: function () {
		var total_uc_pec_erp_gest_capa = this.count_UC_pec_ERP_GEST_CAPA_exEGS();
		//gs.log('TOTAL UC PRISE EN COMPTE ERP, GESTION ET CAPA DU JOUR (SD) : ' + total_uc_pec_erp_gest_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic7 = new GlideRecord('u_asp_reports_calc');
		ic7.query();
		if (ic7.next()) {
			if (uc_pec_erp_gest_capa_nonrompu == 0 || total_uc_pec_erp_gest_capa == 0) {
				ic7.u_ic7 = 0;
			} else {
				var pcnt = (uc_pec_erp_gest_capa_nonrompu/total_uc_pec_erp_gest_capa) * 100;
			  	ic7.u_ic7 = pcnt.toFixed(2);
			}
			ic7.update();
		}
	},
	
	// Taux de respect des délais de traitement des dossiers ERP sans escalade en N2
	ic9a: function () {
		var total_uc_trait_erp = this.count_UC_trait_ERP();
		//gs.log('TOTAL UC TRAITEMENT ERP DU JOUR: ' + total_uc_trait_erp);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic9a = new GlideRecord('u_asp_reports_calc');
		ic9a.query();
		if (ic9a.next()) {
			if (uc_trait_erp_nonrompu == 0 || total_uc_trait_erp == 0) {
				ic9a.u_ic9a = 0;
			} else {
				var pcnt = (uc_trait_erp_nonrompu/total_uc_trait_erp) * 100;
				ic9a.u_ic9a = pcnt.toFixed(2);
			}
			ic9a.update();
		}
	},
	
	// Taux de repsect des délais de traitement des dossiers Gestion sans escalade en N2
	ic9b: function () {
		var total_uc_trait_gest = this.count_UC_trait_GEST();
		//gs.log('TOTAL UC TRAITEMENT GESTION DU JOUR: ' + total_uc_trait_gest);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic9b = new GlideRecord('u_asp_reports_calc');
		ic9b.query();
		if (ic9b.next()) {
			if (uc_trait_gest_nonrompu == 0 || total_uc_trait_gest == 0) {
				ic9b.u_ic9b = 0;
			} else {
				var pcnt = (uc_trait_gest_nonrompu/total_uc_trait_gest) * 100;
				ic9b.u_ic9b = pcnt.toFixed(2);
			}
			ic9b.update();
		}
	},
	
	// Taux de respect des délais de traitement des dossiers Capa sans escalade en N2
	ic9c: function () {
		var total_uc_trait_capa = this.count_UC_trait_CAPA();
		//gs.log('TOTAL UC TRAITEMENT CAPA DU JOUR: ' + total_uc_trait_capa);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic9c = new GlideRecord('u_asp_reports_calc');
		ic9c.query();
		if (ic9c.next()) {
			if (uc_trait_capa_nonrompu == 0 || total_uc_trait_capa == 0) {
				ic9c.u_ic9c = 0;
			} else {
				var pcnt = (uc_trait_capa_nonrompu/total_uc_trait_capa) * 100;
				ic9c.u_ic9c = pcnt.toFixed(2);
			}
			ic9c.update();
		}
	},
	
	// Taux de respect des délais de traitement des dossiers Nomade sans escalade en N2
	ic9d: function () {
		var total_uc_trait_nomad = this.count_UC_trait_NOMAD();
		//gs.log('TOTAL UC TRAINTEMENT NOMADE DU JOUR: ' + total_uc_trait_nomad);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic9d = new GlideRecord('u_asp_reports_calc');
		ic9d.query();
		if (ic9d.next()) {
			if (uc_trait_nomad_nonrompu == 0 || total_uc_trait_nomad == 0) {
				ic9d.u_ic9d = 0;
			} else {
				var pcnt = (uc_trait_nomad_nonrompu/total_uc_trait_nomad) * 100;
				ic9d.u_ic9d = pcnt.toFixed(2);
			}
			ic9d.update();
		}
	},
	
	// Taux de respect des délais de traitement des dossiers Steria sans escalade en N2
	ic9e: function () {
		var total_uc_trait_steria = this.count_UC_trait_ERP() + this.count_UC_trait_GEST() + this.count_UC_trait_CAPA() ;
		//gs.log('TOTAL UC TRAINTEMENT STERIA DU JOUR, SANS ESC N2 : ' + total_uc_trait_steria);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic9e = new GlideRecord('u_asp_reports_calc');
		ic9e.query();
		if (ic9e.next()) {
			if (uc_trait_steria_nonrompu == 0 || total_uc_trait_steria == 0) {
				ic9e.u_ic9e = 0;
			} else {
				var pcnt = (uc_trait_steria_nonrompu/total_uc_trait_steria) * 100;
				ic9e.u_ic9e = pcnt.toFixed(2);
			}
			ic9e.update();
		}
	},
	
	// Taux de respect des délais de traitement des dossiers Steria
	ic10: function () {
		var total_uc_trait_steria = this.count_UC_trait_ERP_ic10() + this.count_UC_trait_GEST_ic10() + this.count_UC_trait_CAPA_ic10() ;
		//gs.log('TOTAL UC TRAINTEMENT STERIA DU JOUR: ' + total_uc_trait_steria);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic10 = new GlideRecord('u_asp_reports_calc');
		ic10.query();
		if (ic10.next()) {
			if (uc_trait_steria_nonrompu == 0 || total_uc_trait_steria == 0) {
				ic10.u_ic10 = 0;
			} else {
				var pcnt = (uc_trait_steria_nonrompu/total_uc_trait_steria) * 100;
				ic10.u_ic10 = pcnt.toFixed(2);
			}
			ic10.update();
		}
	},
	
	// Taux d'escalade N2 (Projet N2 et +)
	ic11: function () {
		var total_inc = this.countInc();
		//gs.log('TOTAL INC RESOLUS DU JOUR: ' + total_inc);
		
		var start = this.beginOfDay();
		var end = this.endOfDay();
		
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
		
		var ic11 = new GlideRecord('u_asp_reports_calc');
		ic11.query();
		if (ic11.next()) {
			if (inc_resolved == 0 || total_inc == 0) {
				ic11.u_ic11_taux_esc_n2 = 0;
			} else {
				var pcnt = (inc_resolved/total_inc) * 100;
				ic11.u_ic11_taux_esc_n2 = pcnt.toFixed(2);
			}
			ic11.update();
		}
	}
	
};







var reportCalc = new ReportsCalcUtil();
reportCalc.ic1();
reportCalc.ic2();
reportCalc.ic3();
reportCalc.ic5();
reportCalc.ic6();
reportCalc.ic7();
reportCalc.ic9a();
reportCalc.ic9b();
reportCalc.ic9c();
reportCalc.ic9d();
reportCalc.ic9e();
reportCalc.ic10();
reportCalc.ic11();