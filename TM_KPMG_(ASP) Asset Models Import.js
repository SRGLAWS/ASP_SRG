//Description: Transform map de chargement des Modèles d'Asset

//Script:
/**
 * For variables go to: http://wiki.service-now.com/index.php?title=Import_Sets_portal
 **/
if (source.u_niveau_2 == 'Accessoires' && source.u_niveau_3 == 'Sacoche')
	target.cmdb_model_category = 'Accessory';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Accessoires' && (source.u_niveau_3 == 'Casque Audio' || source.u_niveau_3 == 'Accessoires Téléphonique'))
	target.cmdb_model_category = 'Consumable';
    target.sys_class_name = 'cmdb_consumable_product_model';

if (source.u_niveau_2 == 'Ordinateur portable' || source.u_niveau_2 == 'Ordinateur fixe')
	target.cmdb_model_category = 'Workstation';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Appliance' || source.u_niveau_2 == 'Divers' || source.u_niveau_2 == 'Firewall' || source.u_niveau_2 == 'Hub' || source.u_niveau_2 == 'Infrastructure Serveurs & Stockage' || source.u_niveau_2 == 'Proxy' || source.u_niveau_2 == 'Switch')
	target.cmdb_model_category = 'Network Gear';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Ecran LCD')
	target.cmdb_model_category = 'Monitor';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'KVM' || source.u_niveau_2 == 'Local')
	target.cmdb_model_category = 'Computer Peripheral';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Logiciel métier')
	target.cmdb_model_category = 'Application';
    target.sys_class_name = 'cmdb_application_product_model';

if (source.u_niveau_2 == 'Portable' || source.u_niveau_2 == 'Réseau')
	target.cmdb_model_category = 'Printer';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Stockage')
	target.cmdb_model_category = 'Storage Device';
    target.sys_class_name = 'cmdb_hardware_product_model';

if (source.u_niveau_2 == 'Téléphone')
	target.cmdb_model_category = 'Communication Device';
    target.sys_class_name = 'cmdb_hardware_product_model';