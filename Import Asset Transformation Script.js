/** CATEGORIE DE MODELE **/
if (source.u_niveau_2 == 'Accessoires' && source.u_niveau_3 == 'Sacoche') {
	var mod1 = new GlideRecord('cmdb_model_category');
	mod1.addQuery('name', 'Accessory');
	mod1.query();
	if (mod1.next()) {
		target.model_category = mod1.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Accessoires' && (source.u_niveau_3 == 'Casque Audio' || source.u_niveau_3 == 'Accessoires Téléphonique')) {
	var mod2 = new GlideRecord('cmdb_model_category');
	mod2.addQuery('name', 'Consumable');
	mod2.query();
	if (mod2.next()) {
		target.model_category = mod2.sys_id;
	}
	target.sys_class_name = 'alm_consumable';
}

if (source.u_niveau_2 == 'Ordinateur Portable' || source.u_niveau_2 == 'Ordinateur Fixe') {
	var mod3 = new GlideRecord('cmdb_model_category');
	mod3.addQuery('name', 'Workstation');
	mod3.query();
	if (mod3.next()) {
		target.model_category = mod3.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Appliance' || source.u_niveau_2 == 'Divers' || source.u_niveau_2 == 'Firewall' || source.u_niveau_2 == 'Hub' || source.u_niveau_2 == 'Infrastructure Serveurs & Stockage' || source.u_niveau_2 == 'Proxy' || source.u_niveau_2 == 'Switch') {
	var mod4 = new GlideRecord('cmdb_model_category');
	mod4.addQuery('name', 'Network Gear');
	mod4.query();
	if (mod4.next()) {
		target.model_category = mod4.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Ecran LCD') {
	var mod5 = new GlideRecord('cmdb_model_category');
	mod5.addQuery('name', 'Monitor');
	mod5.query();
	if (mod5.next()) {
		target.model_category = mod5.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'KVM' || source.u_niveau_2 == 'Local') {
	var mod6 = new GlideRecord('cmdb_model_category');
	mod6.addQuery('name', 'Computer Peripheral');
	mod6.query();
	if (mod6.next()) {
		target.model_category = mod6.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Logiciel métier') {
	var mod7 = new GlideRecord('cmdb_model_category');
	mod7.addQuery('name', 'Application');
	mod7.query();
	if (mod7.next()) {
		target.model_category = mod7.sys_id;
	}
	target.sys_class_name = 'alm_license';
}

if (source.u_niveau_2 == 'Portable' || source.u_niveau_2 == 'Réseau') {
	var mod8 = new GlideRecord('cmdb_model_category');
	mod8.addQuery('name', 'Printer');
	mod8.query();
	if (mod8.next()) {
		target.model_category = mod8.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Stockage') {
	var mod9 = new GlideRecord('cmdb_model_category');
	mod9.addQuery('name', 'Storage Device');
	mod9.query();
	if (mod9.next()) {
		target.model_category = mod9.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

if (source.u_niveau_2 == 'Téléphone') {
	var mod10 = new GlideRecord('cmdb_model_category');
	mod10.addQuery('name', 'Communication Device');
	mod10.query();
	if (mod10.next()) {
		target.model_category = mod10.sys_id;
	}
	target.sys_class_name = 'alm_hardware';
}

/** TYPE **/
if (source.u_niveau_2 == 'Ordinateur Portable') {
	target.u_type = setWorkstationType('Laptop');
}

if (source.u_niveau_2 == 'Ordinateur Fixe') {
	target.u_type = setWorkstationType('Desktop');
}

if (source.u_niveau_2 == 'Divers' || source.u_niveau_2 == 'Proxy') {
	target.u_type = setNetGearType('Other');
}

if (source.u_niveau_2 == 'Switch') {
	target.u_type = setNetGearType('Switch');
}

if (source.u_niveau_2 == 'Hub') {
	target.u_type = setNetGearType('Router');
}

if (source.u_niveau_2 == 'Firewall') {
	target.u_type = setNetGearType('Firewall');
}

if (source.u_niveau_2 == 'Ecran LCD') {
	target.u_type = setMonitorType('PC Screen');
}

if (source.u_niveau_2 == 'Portable') {
	target.u_type = setPrinterType('standalone');
}

if (source.u_niveau_2 == 'Réseau') {
	target.u_type = setPrinterType('multifunction');
}


/** MODELE **/
var prod = source.u_nom_du_produit.toString();
var model = new GlideRecord('cmdb_model');
model.addQuery('name', prod);
model.query();
if (model.next()) {
	target.model = model.sys_id;
}

/** DESCRIPTION **/
target.u_description = source.u_description_ec;

/** COMMENTAIRES **/
target.comments = source.u_informations_supplementaires;

/** SOCIETE **/
if (source.u_societe == 'KPMG France'){
	//target.company = '5c2be72d0fcd9a00a53b176703050e12';
	// Comment gérer la société??
}

/** ETAT & SOUS-ETAT **/
if (source.u_etat == 'Déployé' && source.u_motif_de_l_etat == 'Litige') {
	target.install_status = '8';
	target.substatus = 'in contention';
	target.assigned_to = '2671580d0fb15200a53b176703050ed1';
}

if (source.u_etat == 'Déployé' && source.u_motif_de_l_etat == 'Affecté') {
	if (source.u_person_role == 'Géré par' || source.u_person_role.nil()) {
		target.install_status = '6';
		target.substatus = 'available';
		if (!source.u_site.nil()) {
			target.stockroom = setStockroom(source.u_site.toString());
		}
	}
	if ((source.u_person_role == 'Détenu par') || (source.u_person_role == 'Utilisé par') || (source.u_person_role == 'Approved BY') || (source.u_person_role == 'Créé par')) {
		target.install_status = '1';
		if (!source.u_nom_complet.nil()) {
			target.assigned_to = setAssignedTo(source.u_nom_complet.toString());
		}
	}
	if (source.u_person_role == 'Pris en charge par') {
		target.install_status = '12';
	}
}

if ((source.u_etat == 'Déployé' && (source.u_motif_de_l_etat == 'Déployé' || source.u_motif_de_l_etat.nil())) || (source.u_etat == 'En réparation' && source.u_motif_de_l_etat == 'Affecté')) {
	target.install_status = '6';
	target.substatus = 'available';
	if (!source.u_site.nil()) {
		target.stockroom = setStockroom(source.u_site.toString());
	}
}

if ((source.u_etat == 'Déployé' && source.u_motif_de_l_etat == 'En panne') || (source.u_etat == 'En panne' && source.u_motif_de_l_etat == '')) {
	target.install_status = '6';
	target.substatus = 'defective';
	if (!source.u_site.nil()) {
		target.stockroom = setStockroom(source.u_site.toString());
	}
}

if (source.u_etat == 'Déployé' && ((source.u_motif_de_l_etat == 'Sortie volé') || (source.u_motif_de_l_etat == 'Préparation GAM'))) {
	if (source.u_motif_de_l_etat == 'Sortie volé'){
		target.install_status = '8';
		target.substatus = 'stolen';
	}
	if (source.u_motif_de_l_etat == 'Préparation GAM') {
		target.install_status = '11';
	}
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

if ((source.u_motif_de_l_etat == 'Sortie rebut' && (source.u_etat == 'Déployé' || source.u_etat == 'En panne' || source.u_etat == 'En prêt')) || (source.u_motif_de_l_etat == 'Affecté' && (source.u_etat == 'En panne' || source.u_etat == 'En prêt')) || (source.u_etat == 'En panne' && source.u_motif_de_l_etat == 'En panne') || (source.u_etat == 'En prêt' && (source.u_motif_de_l_etat == 'Attente Broker' || source.u_motif_de_l_etat == 'Sortie volé')) || (source.u_etat == 'Fin de vie' && source.u_motif_de_l_etat.nil())) {
	target.install_status = '12';
}

if (source.u_etat == 'En prêt' && source.u_motif_de_l_etat.nil()) {
	target.install_status = '1';
	target.substatus = 'on loan';
	if (!source.u_nom_complet.nil()) {
		target.assigned_to = setAssignedTo(source.u_nom_complet.toString());
	}
}

if (source.u_etat == 'En réparation' && source.u_motif_de_l_etat.nil()) {
	target.install_status = '3';
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

if (source.u_etat == 'Fin de vie' && (source.u_motif_de_l_etat == 'Affecté' || source.u_motif_de_l_etat == 'Attente Broker')) {
	target.install_status = '6';
	target.substatus = 'waiting_broker';
	if (!source.u_site.nil()) {
		target.stockroom = setStockroom(source.u_site.toString());
	}
}

if (source.u_etat == 'Fin de vie' && source.u_motif_de_l_etat == 'Vendu Société ou Broker') {
	target.install_status = '7';
	target.substatus = 'sold_broker';
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

if (source.u_etat == 'Mis au rebut' && (source.u_motif_de_l_etat == 'Sortie vendu bureau' || source.u_motif_de_l_etat == 'Sortie rebut' || source.u_motif_de_l_etat == 'Sortie cédé collaborateur' || source.u_motif_de_l_etat.nil())) {
	target.install_status = '7';
	if (source.u_motif_de_l_etat == 'Sortie vendu bureau'){
		target.substatus = 'sold_office';
	}
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

if (source.u_etat == 'Mis au rebut' && source.u_motif_de_l_etat == 'Sortie volé') {
	target.install_status = '8';
	target.substatus = 'stolen';
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

if (source.u_etat == 'Retour au distributeur' && source.u_motif_de_l_etat.nil()) {
	target.install_status = '10';
	target.substatus = 'other';
	if (!source.u_site.nil()) {
		target.location = setLocation(source.u_site.toString());
	}
}

/** DATE D'INSTALLATION **/
if (!source.u_date_d_installation.nil()) {
	target.install_date = source.u_date_d_installation;
}

/** LIGNE DE BON DE COMMANDE **/
// Impossible pour l'heure de lier les Asset aux lignes de bon de commande. Pas de clé de reconciliation.

/** BON DE COMMANDE **/
/*if (!source.u_id_de_la_commande.nil()) {
	var po = new GlideRecord('proc_po');
	po.addQuery('u_id_commande_kpmg', source.u_id_de_la_commande.toString());
	po.query();
	if (po.next()) {
		target.u_po_number = po.sys_id;
	}
}*/


function setStockroom(site) {
	var stockroom;
	var stock = new GlideRecord('alm_stockroom');
	stock.addQuery('name', site);
	stock.query();
	if (stock.next()) {
		stockroom = stock.sys_id;
	}
	return stockroom;
}

function setAssignedTo(nom_complet) {
	var assigned_to;
	var user = new GlideRecord('sys_user');
	user.addQuery('name', nom_complet);
	user.query();
	if (user.next()) {
		assigned_to = user.sys_id;
	}
	return assigned_to;
}

function setLocation(site) {
	var location;
	var loc = new GlideRecord('cmn_location');
	loc.addQuery('name', site);
	loc.query();
	if (loc.next()) {
		location = loc.sys_id;
	}
	return location;
}

function setWorkstationType(type) {
	var val1;
	var t1 = new GlideRecord('sys_choice');
	t1.addQuery('name', 'u_cmdb_ci_workstation');
	t1.addQuery('element', 'u_type');
	t1.addQuery('value', type);
	t1.addQuery('language', 'fr');
	t1.query();
	if (t1.next()) {
		val1 = t1.sys_id;
	}
	return val1;
}

function setNetGearType(type) {
	var val2;
	var t2 = new GlideRecord('sys_choice');
	t2.addQuery('name', 'cmdb_ci_netgear');
	t2.addQuery('element', 'u_type');
	t2.addQuery('value', type);
	t2.addQuery('language', 'fr');
	t2.query();
	if (t2.next()) {
		val2 = t2.sys_id;
	}
	return val2;
}

function setMonitorType(type) {
	var val3;
	var t3 = new GlideRecord('sys_choice');
	t3.addQuery('name', 'u_cmdb_ci_monitor');
	t3.addQuery('element', 'u_type');
	t3.addQuery('value', type);
	t3.addQuery('language', 'fr');
	t3.query();
	if (t3.next()) {
		val3 = t3.sys_id;
	}
	return val3;
}

function setPrinterType(type) {
	var val4;
	var t4 = new GlideRecord('sys_choice');
	t4.addQuery('name', 'cmdb_ci_printer');
	t4.addQuery('element', 'u_type');
	t4.addQuery('value', type);
	t4.addQuery('language', 'fr');
	t4.query();
	if (t4.next()) {
		val4 = t4.sys_id;
	}
	return val4;
}
