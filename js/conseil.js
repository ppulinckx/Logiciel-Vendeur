var solutions = [];
var coef_annuel = {
	electricite:1.05,
	gaz:1.06,
	fioul:1.12,
};

function Solutions() {
    
    this.name = "ConseilHabitation";
    this.data = {};
    
    this.save = function() {
        sessionStorage.setItem(this.name, JSON.stringify(this.data));
    }
    
    this.load = function() {
        this.data = JSON.parse(sessionStorage.getItem(this.name));
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- UPDATE SOLUTIONS -----------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function update_Solutions() {

	var h_eau_adoucisseur = get('h_eau_adoucisseur') || 'Non';
	var h_eau_calcaire = get('h_eau_calcaire') || 'Non';
	var h_air_porte_entree = get('h_air_porte_entree');
	var h_isolation_fenetre = get('h_isolation_fenetre');
	var h_facade_nord = get('h_facade_nord');
	var h_facade_nord_isolation = get('h_facade_nord_isolation');
	var h_sol_isolation = get('h_sol_isolation');
	var h_combles = get('h_combles');
	var h_combles_amenagement = get('h_combles_amenagement');

	var nWindows = get('h_isolation_fenetre_nombre');

	var comble_height = parseFloat(get('h_comble_height'));
	var comble_width = parseFloat(get("h_comble_width"));
	var sol_length = parseFloat(get('h_sol_length'));
	var sol_width = parseFloat(get("h_sol_width"));
	var mur_height = parseFloat(get('h_mur_height'));
	var mur_width = parseFloat(get("h_mur_width"));
	var porte_height = parseFloat(get('h_porte_height'));
	var porte_width = parseFloat(get('h_porte_width'));

	
	var check_adoucisseur = (h_eau_calcaire=="Oui" && h_eau_adoucisseur=="Non") ? 1:0;
	var check_combles = (h_combles=="Oui" && h_combles_amenagement==2 && comble_width && comble_height) ? 1:0;
	var check_mur = (h_facade_nord=="Oui" && h_facade_nord_isolation=="Non" && mur_height && mur_width) ? 1:0;
	var check_sol = (h_sol_isolation=="Non" && sol_length && sol_width) ? 1:0;
	var check_porte = (porte_height && porte_width) ? 1:0;
	var check_fenetre = (h_isolation_fenetre==2 && nWindows>0) ? 1:0;

	solutions.push({title:"Confort"});
	if(check_adoucisseur) solutions.push({name:"Adoucisseur", prix:2750, reduction:1});		
	solutions.push({name:"Double Flux", prix:2850, reduction:0.8, energy:"gaz", action:"chauffage"});	
	solutions.push({name:"Domotique", prix:2500, reduction:0.77, energy:"hybride", action:"chauffage"});	
	solutions.push({title:"Chauffage"});
	solutions.push({name:"Radiateur à inertie", prix:3300, reduction:0.75, energy:"ecs", action:"chauffage"});
	solutions.push({name:"Chaudière à granulés", prix:12600, reduction:0.5, energy:"hybride", action:"chauffage"});
	solutions.push({name:"Chaudière à condensation CHAPPE", prix:3850, reduction:1, energy:"gaz", action:"chauffage"});
	solutions.push({name:"Chaudière à condensation WOLF", prix:4990, reduction:1, energy:"gaz", action:"chauffage"});
	solutions.push({name:"Chaudière à condensation FRISQUET", prix:6900, reduction:1, energy:"gaz", action:"chauffage"});
	solutions.push({name:"Chaudière pulsatoire", prix:7680, reduction:0.5, energy:"gaz", action:"chauffage" });
	solutions.push({name:"Chaudière à granulés", prix:12600, reduction:0.5, energy:"hybride", action:"chauffage" });
	solutions.push({name:"Chaudière hybride", prix:18990, reduction:0.55, action:"chauffage"});
	solutions.push({name:"Pompe à chaleur air/eau", prix:13990, reduction:0.45, energy:"gaz", action:"chauffage"});
	solutions.push({name:"Pompe à chaleur air/air", prix:7600, reduction:0.63, energy:"elec", action:"chauffage"});
	solutions.push({name:"Poêle à granulés", prix:0, reduction:0.6, energy:"hybride", action:"chauffage"});
	solutions.push({title:"Eau chaude sanitaire"});
	solutions.push({name:"Ballon vinzengo", prix:1580, reduction:0.8, energy:"elec", action:"ecs"});
	solutions.push({name:"Ballon thermodynamique AUER", prix:4880, reduction:0.2, energy:"elec", action:"ecs"});
	solutions.push({name:"Ballon thermodynamique Altech", prix:4050, reduction:0.25, energy:"elec", action:"ecs"});
	solutions.push({name:"Ballon Thermo solaire", prix:5750, reduction:0.15, energy:"elec", action:"ecs"});
	solutions.push({name:"Solar Box", prix:3200, reduction:0.25, energy:"elec", action:"ecs"});
	solutions.push({title:"Isolation"});
	if(check_fenetre) {
		for(var id=1; id<=nWindows; id++) {
			var h = parseInt(get('h_fenetre_height_'+id)) || 500;
			var w = parseInt(get('h_fenetre_width_'+id)) || 500;
			var type = parseInt(get('h_fenetre_type_'+id)) || 0;
			var catalog = catalog_windows[type];
			var name = catalog.name;
			var price = catalog.catalog[w] ? catalog.catalog[w][h] : undefined;
			var area = h*w/1e4;
			solutions.push({name:id+" : "+name+" <br>["+w+"cm x "+h+"cm]", prix:price, reduction:0.85, action:"chauffage"});
			var volet = get('h_fenetre_volet_'+id) || 'Non';
			if(volet=='Non') {
				$.each(catalog_volets, function(id, volet){
					var price = volet.catalog[w] ? volet.catalog[w][h] : undefined;
					if (price) solutions.push({name:volet.name+" <br>["+w+"cm x "+h+"cm]", prix:price, reduction:1, action:"chauffage"});
				});
			}
		}
	}
	if(check_combles) {
		var area = comble_height*comble_width/10000;
		var prix = 550 + area*48; //550€ + 48€/m²
		solutions.push({name:"Isolation des combles", area:area, prix:prix, reduction:0.7, action:"chauffage"});
	}
	if(check_mur) {
		var area = mur_height*mur_width/10000;
		solutions.push({name:"Isolation mur par l'exterieur", area:area, prix:0, reduction:0.75, action:"chauffage"}); //FIXME 

		var prix = area*153; //550€ + 48€/m²
		solutions.push({name:"Isolation mur par l'interieur", area:area, prix:prix, reduction:0.75, action:"chauffage"});
	}
	if(check_sol) {
		var area = sol_length*sol_width/10000;
		var prix = area*153; //153€/m²
		solutions.push({name:"Isolation du sol", area:area, prix:prix, reduction:0.92, action:"chauffage"});
	}
	//TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
	if(check_porte) { 
		var area = porte_height*porte_width/10000;
		var prix = area*153; //550€ + 48€/m²
		solutions.push({name:"Nouvelle porte", area:area, prix:prix, reduction:0.92, action:"chauffage"});
	}
	//TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO

	var html = '<div>';
	$.each(solutions, function(id, v) {
		var title = v.title; 
		var area = v.area!=undefined ? parseFloat(v.area).toFixed(2)+" m²" : '';
		if(title) {
			html +='</div><div data-role="collapsible">';
			html +='<h4>'+title+'<span style="float:right;"></span></h4>';
		} else {
			html +='<p><label id="solution" title="'+id+'"><input type="checkbox" name="solution_'+id+'">';
			html +='<span>'+v.name+'</span>';
			html +='<span style="float:right; width:100px; text-align:right;">'+(v.reduction)+'</span>';
			html +='<span style="float:right; width:120px; text-align:right;">'+fprice(v.prix)+'€</span>';
			html +='<span style="float:right; width:100px; text-align:right;">'+area+'</span>';
			html +='</label>';
			html +='</p>';
		}
	});
	html += '</div>';
	$('#propositions_solutions').append(html);

//	var table = $('table#propositions_solutions');
//	table.html('');
//	$.each(solutions, function(id, v) {
//		var title = v.title; 
//		var area = v.area!=undefined ? parseFloat(v.area).toFixed(2)+" m²" : '';
//		var html = '<tr>';
//		if(title) {
//			html +='<td colspan="4" align="left"><h3>'+title+'</h3></td>';
//		} else {
//			html +='<td width="60%"><label id="solution" title="'+id+'"><input type="checkbox" name="solution_'+id+'">'+v.name+'</label></td>';
//			html +='<td width="15%" align="right">'+area+'</td>';
//			html +='<td width="15%" align="right">'+fprice(v.prix)+'€</td>';
//			html +='<td width="10%" align="right">'+v.reduction+'</td>';
//		}
//		html +='</tr>';
//		table.append(html);
//	});

//	$('input[name^=solution_]').click(function(){
//		var name = $(this).attr('name');
//		var checked = $(this).is(':checked');
//		sessionStorage.setItem(name, checked);
//		//console.logname, checked);
//	});

	var selected = JSON.parse(get('selected_solutions')) || {};
	//console.logselected);

	$.each(selected, function(id,value) {
		var checked = value===1 ? true : false;
		var input = $('input[name="solution_'+id+'"]');
		if(checked) input.prop('checked', true);
	});

	function updateTotal() {
		$('td#sous_total').html(fprice(0)+' €');
		$('td#deduction').html(fprice(0)+' €');
		var n_adultes = parseInt(get('h_nombre_adultes'));
		var n_enfants = parseInt(get('h_nombre_enfants'));
		var deduction_plafond = n_adultes*8000 + n_enfants*400;
		var sous_total = 0;
		$.each(selected, function(id,value){
			var prix = value===1 ? solutions[id].prix : 0;
			prix = parseFloat(prix) || 0;
			sous_total += prix;
		});
		var deduction = Math.min(sous_total, deduction_plafond)*0.3;

		$('td#title_deduction').html(n_adultes+" adultes / "+n_enfants+" enfants.");
		$('td#sous_total').html(fprice(sous_total)+' €');
		$('td#deduction').html(fprice(-deduction)+' €');

		sessionStorage.setItem('prix_solutions', sous_total);
		sessionStorage.setItem('prix_deductions', deduction);
	}

	$('label[id="solution"]').click(function(){
		var id = $(this).attr('title');
		var check = $(this).attr('class');
		var s = check.match(/-on/i)? 0:1;
		selected[id]=s;
//		//console.logselected);
		sessionStorage.setItem('selected_solutions', JSON.stringify(selected));
		updateTotal();
	});

	updateTotal();


}

//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- COMPUTE CONSOMMATIONS ------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function compute_consommation() {

	var a = parseFloat(get('h_area')) || 0;
	var h = parseFloat(get('h_height')) || 0;
	var vol = h*a;
	var G = parseFloat(get('h_isolation'));
	var Tmin = parseFloat(get('h_temperature_min'));
	var deltaT = 20 - Tmin;
	var Mw = vol*G*deltaT;
	var Mwh = Mw/1000;
	//console.log'deltaT'+deltaT);
	//console.log'volume'+vol);

	$('#h_volume').val(vol);
	$('#h_Mw').val(Mw.toFixed(2));
	$('#h_Mwh').val(Mwh.toFixed(2));

	var lettre;
	var color;
	if(Mwh<=50) { lettre="A"; color="#090"; }
	else if(Mwh<=90) { lettre="B"; color="#6AB76A"; }
	else if(Mwh<=150) { lettre="C"; color="#E0FFC2"; }
	else if(Mwh<=230) { lettre="D"; color="#FFFF00"; }
	else if(Mwh<=330) { lettre="E"; color="#FFCC00"; }
	else if(Mwh<=450) { lettre="F"; color="#FF9933"; }
	else  { lettre="G"; color="#FF3300"; }

	$('#consommation_letter').css('background', color);
	$('#consommation_letter').html("<center>"+lettre+"</center>");
	
}


//--------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- DETAIL FACTURE ------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function compute_detail_facture() {

	var tenergy = $('table#detail_energies');
	var tabo = $('table#detail_abonnements');
	var trep = $('table#detail_repartition');

	tenergy.html('');
	tabo.html('');
	trep.html('');

	var prix_elec_annuel = parseFloat(get('prix_elec_annuel')) || 0;
	var prix_gaz_annuel = parseFloat(get('prix_gaz_annuel')) || 0;
	var fioul_litres = parseFloat(get('fioul_litres')) || 0;
	var fioul_price = parseFloat(get('fioul_price')) || 0;
	var prix_fioul_annuel = fioul_litres*fioul_price;
	var n_adultes = parseInt(get('h_nombre_adultes'));
	var n_enfants = parseInt(get('h_nombre_enfants'));
	var n_personnes = n_adultes + n_enfants;
	var prix_abo_elec = parseFloat(get('prix_abo_elec')) || 0;
	var prix_abo_gaz = parseFloat(get('prix_abo_gaz')) || 0;
	var h_eau_type = get('h_eau_type');

	var csource = get('h_chauffage_source');

	var check; 
	var prix_abo;
	var prix_ecs;
	var prix_cc;
	var prix_ch;
	if(csource=="electricite") {
		check=1;
		prix_abo = prix_abo_elec;
		prix_ecs = 108*n_personnes;
		prix_cc = (prix_elec_annuel - prix_ecs - prix_abo)*0.17;
		prix_ch = prix_elec_annuel - prix_abo - prix_ecs - prix_cc;
	}
	if(csource=="gaz") {
		check=2;
		if(h_eau_type==2 || h_eau_type==3) { //avec cumulus (c'est l'élec qui fait l'eau chaude sanitaire)
			prix_abo = prix_abo_elec + prix_abo_gaz;
			prix_ecs = 108*n_personnes;
			prix_cc = prix_elec_annuel - prix_abo_elec - prix_ecs;
			prix_ch = prix_gaz_annuel - prix_abo_gaz;
		} else { // sans cumulus 
			prix_abo = prix_abo_elec + prix_abo_gaz;
			prix_ecs = 106*n_personnes;
			prix_cc = prix_elec_annuel - prix_abo_elec;
			prix_ch = prix_gaz_annuel - prix_abo_gaz - prix_ecs;
		}
	}
	if(csource=="fioul") {
		check=3;
		prix_abo = prix_abo_elec + prix_abo_gaz;
		prix_ecs = 98*n_personnes;
		prix_cc = prix_elec_annuel - prix_abo_elec;
		prix_ch = prix_fioul_annuel - prix_ecs;
	}

	var coef_ecs = 1;
	var coef_ch = 1;
	var s_solutions = JSON.parse(get('selected_solutions'));
	
//	if(typeof(s_solutions)=='table' && s_solutions.length>0) {
		$.each(s_solutions, function(id, value) {
			if(value==1) {
			
				var sol = solutions[id];
				var action = sol.action; 
				var coef = sol.reduction || 0; 
				if(action=='ecs') coef_ecs *= coef;
				else if(action=="chauffage") coef_ch *= coef; 

				//console.logsol);
			}
		});

		var prix_ecs_after = prix_ecs * coef_ecs;
		var prix_ch_after = prix_ch * coef_ch;

		if(check>=1) {
			tenergy.append('<tr>'+'<td width="50%">Electricité</td>'+'<td width="50%"><input disabled value="'+fprice(prix_elec_annuel)+' €"></td>'+'</tr>');
			if(prix_elec_annuel>0) tabo.append('<tr>'+'<td width="50%">Electricité</td>'+'<td width="50%"><input name="prix_abo_elec" placeholder="prix en euros" type="text"></td>'+'</tr>');
			if(check>=2) {
				tenergy.append('<tr>'+'<td width="50%">Gaz</td>'+'<td width="50%"><input disabled value="'+fprice(prix_gaz_annuel)+' €"></td>'+'</tr>');
				if(prix_gaz_annuel>0) tabo.append('<tr>'+'<td width="50%">Gaz</td>'+'<td width="50%"><input name="prix_abo_gaz" ></td>'+'</tr>');
				if(check>=3) {
					tenergy.append('<tr>'+'<td width="50%">Fioul</td>'+'<td width="50%"><input disabled value="'+fprice(prix_fioul_annuel)+' €"></td>'+'</tr>');
				}
			}
		}

		var prix_total = prix_abo + prix_ecs + prix_cc + prix_ch;
		var prix_total_after = prix_abo + prix_ecs_after + prix_cc + prix_ch_after;

		trep.append('<tr>'+'<td width="33%"></td>'+'<td width="33%" align="center">Sans les solutions</td>'+'<td width="33%" align="center">Avec les solutions</td>'+'</tr>');
		trep.append('<tr>'+'<td width="33%">Abonnements</td>'+'<td width="33%"><input disabled value="'+fprice(prix_abo)+' €"></td>'+'<td width="33%"><input disabled value="'+fprice(prix_abo)+' €"></td>'+'</tr>');
		trep.append('<tr>'+'<td width="33%">Consommations courrantes</td>'+'<td width="33%"><input disabled value="'+fprice(prix_cc)+' €"></td>'+'<td width="33%"><input disabled value="'+fprice(prix_cc)+' €"></td>'+'</tr>');
		trep.append('<tr>'+'<td width="33%">Eau chaude sanitaire</td>'+'<td width="33%"><input disabled value="'+fprice(prix_ecs)+' €"></td>'+'<td width="33%"><input disabled value="'+fprice(prix_ecs_after)+' €"></td>'+'</tr>');
		trep.append('<tr>'+'<td width="33%">Chauffage</td>'+'<td width="33%"><input disabled value="'+fprice(prix_ch)+' €"></td>'+'<td width="33%"><input disabled value="'+fprice(prix_ch_after)+' €"></td>'+'</tr>');
		trep.append('<tr>'+'<td width="33%">Total</td>'+'<td width="33%"><input disabled value="'+fprice(prix_total)+' €"></td>'+'<td width="33%"><input disabled value="'+fprice(prix_total_after)+' €"></td>'+'</tr>');

		sessionStorage.setItem('prix_abo', prix_abo);
		sessionStorage.setItem('prix_ecs', prix_ecs);
		sessionStorage.setItem('prix_ecs_after', prix_ecs_after);
		sessionStorage.setItem('prix_cc', prix_cc);
		sessionStorage.setItem('prix_ch', prix_ch);
		sessionStorage.setItem('prix_ch_after', prix_ch_after);
		sessionStorage.setItem('prix_total', prix_total);
		sessionStorage.setItem('prix_total_after', prix_total_after);
		sessionStorage.setItem('source_id', check);

		$('input').each(function() {
			$(this).css('text-align', 'right');
		});

		$("input[name^='prix_abo_']").each(function(){
			var name = $(this).attr('name');
			var value = get(name);
			$(this).val(value);
		}).change(function() {
			var value = $(this).val();
			var name = $(this).attr('name');
			sessionStorage.setItem(name, value);
			window.location.reload();
		});
//	}
	
}

//--------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- COMPUTE BILAN -------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function compute_detail_bilan() {

	function addLine(nrj,source, firstval) {
		var coef = coef_annuel[source];
		h='<tr>';
		h+='<td>'+nrj+'</td>';
		var sum = 0;
		for(var i=1;i<=10;i++) {
			sum += firstval;
			h+='<td>'+firstval.toFixed(0)+'€</td>';
			firstval *= coef;
		}
		h+='</tr>';
		h+='<td>'+sum.toFixed(0)+'€</td>';
		return {html:h,sum:sum};
	}

	var db = $('table#detail_bilan');
	var da = $('table#detail_dixans');
	var sid = parseInt(get('source_id'));

	var prix_abo = parseFloat(get('prix_abo'));
	var prix_ecs = parseFloat(get('prix_ecs'));
	var prix_ecs_after = parseFloat(get('prix_ecs_after'));
	var prix_cc = parseFloat(get('prix_cc'));
	var prix_ch = parseFloat(get('prix_ch'));
	var prix_ch_after = parseFloat(get('prix_ch_after'));
	var prix_total = parseFloat(get('prix_total'));
	var prix_total_after = parseFloat(get('prix_total_after'));

	var prix_solutions = parseFloat(get('prix_solutions'));
	var prix_deductions = parseFloat(get('prix_deductions'));

	var prix_elec_annuel = parseFloat(get('prix_elec_annuel')) || 0;
	var prix_gaz_annuel = parseFloat(get('prix_gaz_annuel')) || 0;
	var fioul_litres = parseFloat(get('fioul_litres')) || 0;
	var fioul_price = parseFloat(get('fioul_price')) || 0;
	var prix_fioul_annuel = fioul_litres*fioul_price;

	var total=0;
	var html='';
	if(sid>0) {
		var line = addLine('Electricité', 'electricite', prix_elec_annuel);
		html += line.html;
		total += line.sum;
		if(sid>1) {
			var line = addLine('Gaz', 'gaz', prix_gaz_annuel);
			html += line.html;
			total += line.sum;
			if(sid>2) {
				var line = addLine('Fioul', 'fioul', prix_fioul_annuel);
				html += line.html;
				total += line.sum;
			}
		}
	}

	function cumudixans(val, coef) {
		var sum = 0;
		for(var i=1;i<=10;i++) {
			sum += val;
			val *= coef;
		}
		return sum;
	}

	var prix_10ch = cumudixans(prix_ch, 1.1);
	var prix_10ecs = cumudixans(prix_ecs, 1.1);
	var prix_10ch_after = cumudixans(prix_ch_after, 1.1);
	var prix_10ecs_after = cumudixans(prix_ecs_after, 1.1);
	var prix_10abo = cumudixans(prix_abo, 1);

	da.append('<tr><td width="40%"></td><td align="center" width="30%">Système actuel</td><td align="center" width="30%">Nouvelle solution</td></tr>');
	///// PRIX CHAUFFAGE
	da.append('<tr><td width="40%">Chauffage</td><td align="right" width="30%">'+fprice(prix_ch)+'€</td><td align="right" width="30%">'+fprice(prix_ch_after)+'€</td></tr>');
	da.append('<tr><td width="40%">Chauffage sur 10 ans</td><td align="right" width="30%">'+fprice(prix_10ch)+'€</td><td align="right" width="30%">'+fprice(prix_10ch_after)+'€</td></tr>');

	var eco_10ch = prix_10ch-prix_10ch_after;
	da.append('<tr><td width="40%">Economie</td><td colspan="2" align="right" width="60%">'+fprice(eco_10ch)+'€</td></tr>');
	///// PRIX EAU CHAUDE SANITAIRE
	da.append('<tr><td width="40%">Eau chaude sanitaire</td><td align="right" width="30%">'+fprice(prix_ecs)+'€</td><td align="right" width="30%">'+fprice(prix_ecs_after)+'€</td></tr>');
	da.append('<tr><td width="40%">Eau chaude sanitaire sur 10 ans</td><td align="right" width="30%">'+fprice(prix_10ecs)+'€</td><td align="right" width="30%">'+fprice(prix_10ecs_after)+'€</td></tr>');

	var eco_10ecs = prix_10ecs-prix_10ecs_after;
	da.append('<tr><td width="40%">Economie</td><td colspan="2" align="right" width="60%">'+fprice(eco_10ecs)+'€</td></tr>');
	///// PRIX ADONNEMENT

	var eco_total = eco_10ch + eco_10ecs;
	da.append('<tr><td width="40%">Prochaine facture annuelle</td><td align="right" width="30%">'+fprice(prix_total)+' €</td><td align="right" width="30%">'+fprice(prix_total_after)+' €</td></tr>');

	var total_after = total-eco_total
	da.append('<tr><td width="40%">Factures cumulées sur 10 ans</td><td align="right" width="30%">'+fprice(total)+' €</td><td align="right" width="30%">'+fprice(total_after)+' €</td></tr>');

	da.append('<tr><td width="40%">Cout d\'acquisition du nouveau système</td><td width="30%"></td><td align="right" width="30%">+'+fprice(prix_solutions)+' €</td></tr>');
	da.append('<tr><td width="40%">Aide de l\'était</td><td width="30%"></td><td align="right" width="30%">'+fprice(-prix_deductions)+' €</td></tr>');

	da.append('<tr><td width="40%">Total sur 10 ans</td><td align="right" width="30%">'+fprice(total)+' €</td><td align="right" width="30%">'+fprice(total_after+prix_solutions-prix_deductions)+' €</td></tr>');
	var economie = total-(total_after+prix_solutions-prix_deductions);
	da.append('<tr><td width="40%">Economie</td><td colspan="2" align="right" width="60%">'+fprice(economie)+'€</td></tr>');
	db.html(html);

	

}

//--------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------- CHECK STEP 3 --------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function check_step_three() {

	var div_error = $('#errors');
	var div_step3 = $('#step3');

	///// CHECK STEP 3 ///////
	var annee = parseInt(get('annee'));
	var h_isolation_fenetre = get('h_isolation_fenetre');
	var h_isolation_fenetre_nombre = parseInt(get('h_isolation_fenetre_nombre')) || 0;
	var h_chauffage_source = get('h_chauffage_source');
	var h_chauffage_type = get('h_chauffage_type');
	var h_eau_type = get('h_eau_type');
	var n_adultes = parseInt(get('h_nombre_adultes'));
	var n_enfants = parseInt(get('h_nombre_enfants'));

	var errors = 0;

	div_error.html('');
	div_error.append('<h3>Attention, pour continuer...</h3>');
	if(!annee) { div_error.append("<li>Vous devez entrer l'année de construction de votre maison</li>"); errors++; }
	if(!h_chauffage_source) {  div_error.append("<li>Veuillez choisir une source d'énergie pour votre chauffage</li>"); errors++; }
	if(!h_chauffage_type) {  div_error.append("<li>Vous devez choisir un type de chauffage</li>"); errors++; }
	if(!h_eau_type) {  div_error.append("<li>Vous devez choisir un type d'installation pour votre eau sanitaire</li>"); errors++; }
	if(!h_isolation_fenetre) {  div_error.append("<li>Vous devez choisir un type de vitrage pour votre habitation</li>"); errors++; }
	if(h_isolation_fenetre==2 && !h_isolation_fenetre_nombre) {  div_error.append("<li>Vous devez définir un nombre de fenêtre</li>"); errors++; }
	if(!n_adultes) { div_error.append("<li>Vous devez chosir un nombre d'adultes</li>"); errors++; }
	if(!n_enfants) { div_error.append("<li>Vous devez chosir un nombre d'enfants</li>"); errors++; }

	//console.log"il y a " + errors + " erreurs");

	if(errors>0) {
		div_error.show();
		div_step3.hide();
	} else {
		div_error.hide();
		div_step3.show();
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- UPDATE -----------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function update() {

	var h_chauffage_source = get('h_chauffage_source');

	//console.log'update', h_chauffage_source);

	////////////// PRIX ENERGIES //////////////////
	var prix_elec_annuel = parseFloat(get('prix_elec_annuel')) || 0;
	var prix_gaz_annuel = parseFloat(get('prix_gaz_annuel')) || 0;
	var fioul_litres = parseFloat(get('fioul_litres')) || 0;
	var fioul_price = parseFloat(get('fioul_price')) || 0;
	var prix_fioul_annuel = fioul_litres*fioul_price;

	if(h_chauffage_source=='electricite') {
		prix_gaz_annuel = 0;
		prix_fioul_annuel = 0;
		
	} else if(h_chauffage_source=='gaz') {
		prix_fioul_annuel = 0;
	}
	
	var prix_elec_next = prix_elec_annuel*coef_annuel['electricite'];
	var prix_gaz_next = prix_gaz_annuel*coef_annuel['gaz'];
	var prix_fioul_next = prix_fioul_annuel*coef_annuel['fioul'];

	$('input#prix_elec_next').val(fprice(prix_elec_next)+'€');
	$('input#prix_gaz_next').val(fprice(prix_gaz_next)+'€');
	$('input#prix_elec_annuel').val(fprice(prix_elec_annuel)+'€');
	$('input#prix_gaz_annuel').val(fprice(prix_gaz_annuel)+'€');
	$('input#prix_fioul_annuel').val(fprice(prix_fioul_annuel)+'€');
	$('input#prix_fioul_next').val(fprice(prix_fioul_next)+'€');

	////////////// TAXE CO2 //////////////////
	var consommation = parseFloat(get('consommation')) || 0; //kWh
	var surface = parseFloat(get('surface')) || 1; //m²
	var CO2m2 = parseFloat(consommation/surface) || 0; //kWh/m²
	var taxeCO2 = CO2m2>0 ? CO2m2 / 10 : 0;
	var prix_co2_annuel = parseFloat(taxeCO2*7) || 0;
	var prix_co2_next = prix_co2_annuel*1.02;
	var prix_co2_mensuel = prix_co2_annuel/12;
	$('input#CO2m2').val(taxeCO2.toFixed(2));
	$('input#prix_co2_annuel').val(fprice(prix_co2_annuel)+"€");
	$('input#prix_co2_mensuel').val(fprice(prix_co2_mensuel)+"€");
	$('input#prix_co2_next').val(fprice(prix_co2_next)+"€");
	
	////////////// PRIX TOTAL //////////////////
	var prix_total_annuel = prix_elec_annuel + prix_fioul_annuel + prix_gaz_annuel + prix_co2_annuel;
	var prix_total_next = prix_elec_next + prix_fioul_next + prix_gaz_next + prix_co2_next;

	$('input#prix_total_annuel').val(fprice(prix_total_annuel)+'€');
	$('input#prix_total_next').val(fprice(prix_total_next)+'€');
	
	///////// RECAPITULATIF //////////////

	$('#chauffage_elec').hide();
	$('#chauffage_gaz').hide();
	$('#chauffage_fioul').hide();

	$("#chauffage").html(h_chauffage_source);
	$('#infos_fioul').show();
	$('div#prix_fioul').show();
	$('div#prix_gaz').show();
	if(h_chauffage_source=='electricite') {
		$('#infos_fioul').hide();
		$('div#prix_fioul').hide();
		$('div#prix_gaz').hide();
		$('#chauffage_elec').show();
	} 
	else if(h_chauffage_source=='gaz') {
		$('#infos_fioul').hide();
		$('div#prix_fioul').hide();
		$('#chauffage_gaz').show();
	}
	else if(h_chauffage_source=='fioul') {
		$('#chauffage_fioul').show();
	}

	//////////////// FACADE //////////////
	$('#h_facade_nord_isolation').hide();
	$('#h_facade_nord_isolation_age').hide();
	
	if(h_chauffage_source) $('#chauffage_'+h_chauffage_source).show();

	var h_facade_nord = get('h_facade_nord');
	if(h_facade_nord=="Oui") {
		$('#h_facade_nord_isolation').show();
		var h_facade_nord_isolation = get('h_facade_nord_isolation');
		if(h_facade_nord_isolation=="Oui") $('#h_facade_nord_isolation_age').show();
	}

	/////// COMBLES ///////////
	var h_combles = get('h_combles');
	var h_combles_amenagement = get('h_combles_amenagement');
	var h_combles_isolation = get('h_combles_isolation');
	$('tr#combles_amengagement').hide();
	$('tr#combles_isolation').hide();
	if(h_combles=="Oui") {
		$('tr#combles_amengagement').show();
		if(h_combles_amenagement=="2") $('tr#combles_isolation').show(); 
	}

	/////// ADOUCISSEUR /////////
	$('#adoucisseur').hide();
	var h_eau_calcaire = get('h_eau_calcaire');
	if(h_eau_calcaire=="Oui") {
		$('#adoucisseur').show();
	}

	$('#isolation_fenetre_nombre').hide();
	var h_isolation_fenetre = get('h_isolation_fenetre');
	if(h_isolation_fenetre=="2") {
		$('#isolation_fenetre_nombre').show();
	}

	check_step_three();
	
	/////////// CALCUL DES ETAPES SUIVANTES ///////////
	var h_air_porte_entree = get('h_air_porte_entree');
	var h_isolation_fenetre = get('h_isolation_fenetre');
	var h_isolation_fenetre_nombre = get('h_isolation_fenetre_nombre');
	var h_facade_nord_isolation = get('h_facade_nord_isolation') || 'Non';
	var h_sol_isolation = get('h_sol_isolation') || 'Non';

	////////////////// Fenetres //////////////////////
	var gotos = ['two'];
	if(h_isolation_fenetre=="2") {
		gotos.push('fenetre');
	}
	if(h_air_porte_entree=='Oui') {
		gotos.push('porte');
	}
	if(h_combles=="Oui" && h_combles_isolation=="2" && h_combles_amenagement=="2") {
		gotos.push('combles');
	}
	if(h_facade_nord_isolation=="Non") {
		gotos.push('mur');
	}
	if(h_sol_isolation=="Non") {
		gotos.push('sol');
	}
	gotos.push('three');

	//console.loggotos);

	$('div[data-role="page"]').each(function(){
		var page = $(this);
		var id = page.attr('id');
		var index = gotos.indexOf(id);
		if(parseInt(index)>=0) {
			var next = page.find('#gonext');
			var previous = page.find('#goprevious');
			var gonext = '#'+gotos[index+1];
			var goprevious = '#'+gotos[index-1];
			next.attr('href', gonext);
			next.attr('onclick', "window.location.reload();");
			previous.attr('href', goprevious);
		}

	});

	update_Solutions();
	compute_consommation();
	//compute_detail_facture();
	compute_detail_bilan();
	

}

//--------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- WINDOWS ----------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

function addfenetre(div, num) {

	div.append('<h2>Fenetre '+num+'</h2>');
	div.append('<select class="'+num+'" name="h_fenetre_type_'+num+'" id="h_fenetre_type_'+num+'"></select>');
	var table = div.append('<table style="width:100%;"></table>');
	var tr = table.append('<tr></tr>');
	tr.append('<td width="33%" valign="middle"><label>Hauteur cm] ? <select name="h_fenetre_height_'+num+'"></select></label></td>');
	tr.append('<td width="33%"><img style="width:100%;" src="img/fenetre.png"></td>');
	tr.append('<td width="33%" align="right">&nbsp;</td>');
	var tr = table.append('<tr></tr>');
	tr.append('<td>&nbsp;</td>');
	tr.append('<td><label for="h_vitrage_width"><label>Largeur [cm] ?<select name="h_fenetre_width_'+num+'"></select></label></td>');
	tr.append('<td align="right">&nbsp;</td>');
	table.append('<tr><td colspan="2">Avez-vous un volet roulant pour cette fenêtre?</td><td align="right"><select id="h_fenetre_volet_'+num+'" name="h_fenetre_volet_'+num+'" data-role="slider"><option>Non</option><option>Oui</option></select></td></tr>');
	
}

function update_dimensions_windows(num,id) {

	var s_h = $('select[name="h_fenetre_height_'+num+'"]');
	var s_w = $('select[name="h_fenetre_width_'+num+'"]');

//	var width = get('h_fenetre_width_'+num);
//	var height = get('h_fenetre_height_'+num);

//	//console.logwidth, height);

	var object = catalog_windows[id];
	var widths = object.widths;
	var heights = object.heights;
	s_h.html('');
	$.each(heights, function(id, val){
		var option = $('<option></option>').val(val).html(val);
		s_h.append(option);
	});
	s_h.val(heights[0]).change();
//	sessionStorage.setItem('h_fenetre_height_'+num,heights[0]);
	s_w.html('');
	$.each(widths, function(id, val){
		var option = $('<option></option>').val(val).html(val);
		s_w.append(option);
	});
	s_w.val(widths[0]).change();
//	sessionStorage.setItem('h_fenetre_width_'+num,widths[0]);

}

//--------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------------- HTML EVENTS ------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//

$(function() {

	$('#reset').click(function(){
		sessionStorage.clear();
		window.location.reload();
	});

	$('#electricite, #fioul, #gaz').click(function() {
		var value = $(this).attr('id');
		sessionStorage.setItem('h_chauffage_source',value);
		update();
	});

	$( "[data-role='header'], [data-role='footer']" ).toolbar();
	$( "[data-role='header']" ).toolbar({ theme: "a" });

	////////////////////////// WINDOWS ////////////////////////////

	$('#addfenetre').empty();
	var h_isolation_fenetre = parseFloat(get('h_isolation_fenetre'));
	if(h_isolation_fenetre==2) {
		var num = parseFloat(get('h_isolation_fenetre_nombre'));
		for(var i=1; i<=num; i++) {
			addfenetre($('#addfenetre'), i);
		}
	}

	var mySelect = $("select[id^='h_fenetre_type']");

	mySelect.each(function(){
		var num = $(this).attr('class');
		var name = $(this).attr('name');
		var id_selected = get(name) || 0;
		var select = $(this);
		$.each(catalog_windows, function(id, type) {
			var option = $('<option></option>').val(id).html(type.name);
			if(id==id_selected) option.attr('selected', 'selected');
			select.append(option);
		});
		
		update_dimensions_windows(num,id_selected);
	});

	mySelect.change(function(){
		var num = $(this).attr('class');
		var id = $(this).val();
		update_dimensions_windows(num,id);
	});

	///////////////////////////////////////////////////////////////

	$('input, select').each(function(){
		var field = $(this);
		var key = field.attr('name');
		var value = get(key);
		if(key && value) {
			field.val(value);
		}

		field.change(function(){
			var value = field.val();
			var key = field.attr('name');
			sessionStorage.setItem(key,value);
			//console.logkey, value);
			update();
		});

	});

	update();

//	//console.logsessionStorage)


});
