function Solution(array) {
	var name = array.name;
	if(!name) {
		var products = array.products; 
		var red_ecs = 1;
		var red_cha = 1;
		var label = ''; 
		var price = 0;
		_.each(products, function(p) {
			_.each(solutions, function(s) {
				if(String(s.name) && String(p) == String(s.name)) {
					label += String(s.label)+', '; 
					red_ecs *= Number(s.red_ecs) || 1;
					red_cha *= Number(s.red_cha) || 1;
					price += Number(s.max) || 0 ;
				}
			});
		});
		this.img = array.img;
		this.label = label.slice(0, -2);; 
		this.red_cha = 1 - red_cha;
		this.red_ecs = 1 - red_ecs;
		this.price = price; 
		this.products = array.products;
		this.category = "pack"; 
	} else {
		this.name = name; 
		this.label = array.label; 
		this.red_cha = Number(array.red_cha) ? 1 - Number(array.red_cha) : 0;
		this.red_ecs = Number(array.red_ecs) ? 1 - Number(array.red_ecs) : 0;
		this.category = array.category; 
		this.img = array.img; 
		this.video = "video/"+array.video+".mp4";
		this.popup = array.popup;
		this.items = [];
		this.visible = false;
		this.confirm = false; 
		this.min = array.min; 
		this.max = array.max; 
		this.price = this.max; 
		this.catalog = array.catalog; 
		this.discount = 0;
		this.surface = array.surface || false; 
	}
	return this;
}

angular.module('myApp').controller('Store', function ($scope) {

	$scope.makeCumulus = function makeCumulus(val, coef, times) {
		var times = Number(times) || 10
		var sum = 0;
		for(var i=1;i<=times;i++) {
			sum += val;
			val *= coef;
		}
		return sum;
	};

	$scope.color_scale = ['#F00','#F30','#F60','#F90','#FC0','#FF0','#CF0','#9F0','#6F0','#3F0','#0F0'];

	var $scope = this;

	// -------------------------------------------------------------------------------- //
	// ------------------------------ I N I T    V A R -------------------------------- //
	// -------------------------------------------------------------------------------- //

	function initHrefs() {
		var path = './logiciel/';
		var tab = [
			'source', //0 //Choisir la source 
			'consommation', //1 //introduire la consommation du client
		//			'directeconomie', //2 //calcul des économies grâce au bloquage 
			'compteur', //3 //introduire le fake compteur
		//			'habitation', //4 //Note de l'habitation et probleme
			'questionnaire', //5 //questionnaire avancé
			'class_energy', //6 //calcul de la classe énergétique actuelle
			'taxeco2', //7 //CO2
			'solutions', //12 // choisir les solutions
			'why_gdf', //8 
			'because_gdf', //9
			'avantages', //10
			'simulation', //11 //le truc avec les voitures
		//			'classement', //13
			'investment',
			'synthese', //14
		];
		var type = ".html";
		var group = [];
		angular.forEach(tab, function(t) {
			var url = path+t+type;
			group.push(url);
		});
		return group; 	
	}

	// Organisation des pages		
	this.hrefs = initHrefs(); 

	this.posHref = function(name, pos) {
		var pos = Number(pos); 
		if(pos) {
			var hrefs = this.hrefs;
			for(var i=0; i<=hrefs.length; i++) {
				if(name==hrefs[i] && i>0 && i<hrefs.length) return hrefs[i+pos];
			}; 
		};
	}

	this.previousHref = function (name) {
		var hrefs = this.hrefs;
		var selected_href;
		for(var i=0; i<=hrefs.length; i++) {
			if(name==hrefs[i] && i>0 && i<hrefs.length) selected_href = hrefs[i-1];
		};
		loadURL(selected_href);
	}

	this.nextHref = function (name) {
		var hrefs = this.hrefs;
		var selected_href;
		for(var i=0; i<=hrefs.length; i++) {
			var href = hrefs[i];
			console.log(String(name), String(href)); 
			if(String(name) == String(href) && i>=0 && i<hrefs.length) {
				selected_href = String(hrefs[i+1]);
				break;
			}
		};
		loadURL(selected_href);
	}

	this.data = {};
	this.default = {
		option : "Veuillez choisir...",
		surface : 100,
		nfixed : 0,
	}


	this.catalog_by_name = {};
	angular.forEach(this.catalog, function(catalog, name){
		$scope.catalog_by_name[name] = {};
		angular.forEach(catalog, function(values, id){
			$scope.catalog_by_name[name][values.name] = values;
		});
	});

	this.coefCumulus = {
		electricite:1.06,
		gaz:1.1,
		fioul:1.162,
		co2:1.02,
	};

	this.coefInvestissement = {
		electricite:1.06,
		gaz:1.08,
		fioul:1.1,
	};

	this.rooms = [
		'Buanderie',
		'Bureau',
		'Chambre',
		'Cuisine',
		'Salle de bains',
		'Salle à manger',
		'Salon',
		'Toilette',
	];

	this.sides = [
		'Avant',
		'Arrière',
		'Nord',
		'Sud',
		'Ouest',
		'Est',
	];

	var solutions = [
		{name: "volets", label:"Volets roulant", red_cha:0.92, popup:"volet", catalog:true, energy:"elec", category:"isolation", img:"volet_roulant"},	
		{name: "renovation_fenetre", label:"Rénovation fenêtres",popup:"fenetre", catalog:true, red_cha:0.88, category:"isolation", img:"renovation_fenetre", video:"isolation_fenetres"},
		{name: "renovation_toiture", label:"Rénovation toiture",popup:"toiture", min:210, max:255, surface:true, red_cha:0.7, category:"isolation", img:"renovation_toiture"},
		{name: "hydrofuge_toiture", label:"Hydrofuge toiture", min:210, max:9706, red_cha:1, category:"isolation", img:"hydrofuge_toiture"},
		{name: "porte_entree", label:"Porte d'entrée",popup:"porte", min:5346, max:6541, reduction:0.9, category:"isolation", img:"porte_entree"},
		{name: "iso_comble", label:"Isolation des combles",popup:"comble", min:9, max:9, forfait:5581, red_cha:0.70, category:"isolation", img:"isolation_combles", video:"isolation_combles"},
	//	{name: "iso_sous_sol", label:"Isolation sous-sol", min:138, max:138, surface:true, popup:"sol", red_cha:0.92, category:"isolation", img:"isolation_sous_sol"},
		{name: "iso_mur_int", label:"Isolation mur intérieur", min:138, max:183, surface:true, popup:"mur_int", red_cha:0.75, category:"isolation", img:"isolation_interieur"},
		{name: "iso_mur_ext", label:"Isolation mur extérieur", min:250, max:450, forfait:0, surface:true, popup:"mur_ext", red_cha:0.75, category:"isolation", img:"isolation_exterieur", video:"isolation_exterieur"},

		{name: "double_flux", label:"Ventillation positive", min:2492, max:5987, red_cha:0.7, category:"chauffage", img:"vmc_double_flux", video:"vmc_double_flux"},
		{name: "assechement", label:"Ventillation positive & assèchement", min:2492, max:9706, red_cha:0.7, category:"isolation", img:"assechement", video:"assechement"},

	//	{label:"Cache moineaux", price:800},
	//	{label:"Changement goutière", price:800},

		{name: "poele_granules", label:"Poêle à granulés", catalog:true, popup:"poele", red_cha:0.6, category:"chauffage", img:"poele_granules", video:"poele_granules"},
		{name: "insert_granules", label:"Insert à granulés", max:7592, red_cha:0.6, category:"chauffage", img:"insert_granules", video:"insert_granules"},

		{name: "radiateur_inertie", label:"Radiateur à inertie", min:1346, max:1636, red_cha:0.75, category:"chauffage", img:"radiateur_inertie", video:"radiateur_inertie"},
		{name: "domotique", label:"Domotique", min:1857, max:4410, red_cha:0.77, category:"chauffage", img:"domotique_chauffage", video:"domotique"},
		{name: "chaudiere_granule", label:"Chaudière à granulés", min:12099, max:16279, red_cha:0.5, category:"chauffage", img:"chaudiere_granule"},
		{name: "chaudiere_hybride", label:"Chaudière hybride", min:8943, max:14295, red_ecs:0.5, red_cha:0.5, category:"chauffage", img:"chaudiere_hybride"},
		{name: "chaudiere_pulsatoire", label:"Chaudière pulsatoire", min:5587, max:7807, red_cha:0.6, category:"chauffage", img:"chaudiere_pulsatoire"},
		{name: "chaudiere_condensation", label:"Chaudière à condensation", min:3893, max:6436, red_cha:0.7,  red_ecs:0.7, category:"chauffage", img:"chaudiere_condensation", video:"chaudiere_condensation"},

		{name: "pac_air_eau", label:"Pompe à chaleur air/eau", min:12473, max:17144, red_cha:0.45, category:"chauffage", img:"pac_air_eau"},
		{name: "pac_air_air", label:"Pompe à chaleur air/air", min:4415, max:8535, red_cha:0.63, category:"chauffage", img:"pac_air_air"},
		{name: "ballon_thermodynamique", label:"Ballon thermodynamique", min:3639, max:6436, red_ecs:0.1, category:"ecs", img:"ballon_thermodynamique", video:"ballon_termodynamique"},
		{name: "cumulus", label:"Cumulus", min:1912, max:2705, red_ecs:0.8, category:"ecs", img:"cumulus_vizengo", video:'cumulus_vizengo'},
		{name: "adoucisseur", label:"Adoucisseur", min:2428, max:2943, red_ecs:1, category:"ecs", img:"adoucisseur", video:""}, //TODO prix 

		{name: "chaudiere_classique", label:"Chaudière"},
		{name: "convecteur_gaz", label:"Convecteur gaz"},
		{name: "convecteur_fioul", label:"Convecteur fioul"},
		{name: "grille_pain", label:"Radiateur type grille pain"},
		{name: "centrale_eau", label:"Centrale d'eau", red_ecs:0.7, max:4721, category:"ecs", img:"centrale_eau"},

	];

	var group = [];
	var labels = {};
	angular.forEach(solutions, function(sol,id) {
		var solution = new Solution(sol);
		solution.id = id;
		if(solution.name) labels[solution.name] = solution.label;  
		group[id] = solution;
	});
	this.products = group;
	this.labels = labels; 

	this.energies = [
		{id:1, name:"Electricité", label:"electricite", icon:'ico-ELEC.png'},
		{id:2, name:"Gaz naturel", label:"gaz",	icon:'ico-GAZ.png'},
		{id:3, name:"Fioul", label:"fioul", icon:'ico-FUEL.png'},
	];

	// -------------------------------------------------------------------------------- //
	// -------------------------- S A V E  &&  L O A D -------------------------------- //
	// -------------------------------------------------------------------------------- //

	this.updateConso = function(what) {
		var data = this.data;
		var annual = data.annual || {};
		var monthly = data.monthly || {};
		var fioul = data.fioul || {};
		switch(what) {
			case "monthly" : 
				annual.electricite = Math.floor(monthly.electricite * 10);
				annual.gaz = Math.floor(monthly.gaz * 10);
				annual.fioul = Math.floor(monthly.fioul * 10);
				fioul.quantity = undefined; 
				annual.electricite = Number(annual.electricite)<=0 ? undefined : annual.electricite;
				annual.gaz = Number(annual.gaz)<=0 ? undefined : annual.gaz;
				annual.fioul = Number(annual.fioul)<=0 ? undefined : annual.fioul;
			break;
			case "annual" : 
				monthly.electricite = Math.floor(annual.electricite / 10);
				monthly.gaz = Math.floor(annual.gaz / 10);
				monthly.fioul = Math.floor(annual.fioul / 10);
				fioul.quantity = undefined; 
			break;
		}	
		this.updateBill();
	}

	this.load = function () {
		var data = JSON.parse(sessionStorage.getItem('data'));
		if(data) {
			this.data = data;
		} else {
			this.reset();
		}
		console.log('Chargement des données', data);
	}

	this.save = function () {
		console.log('Sauvegarde session des données', this.data);
		sessionStorage.setItem('data', JSON.stringify(this.data) );
	}

	this.saveData = function () {
		console.log('Save Data'); 
		var uuid = this.data.uuid; 
		var data = JSON.stringify(this.data); 
		localStorage.setItem(uuid, data ); 
		console.log('localStorage', uuid ,data);

		$.ajax({
			type: "POST",
			url: "setReports.php",
			data: { data: data, uuid: uuid, action:"save" },
			success: function(html){
				var html = JSON.parse(html); 
				console.log('>> connexion réussie', html);
			},
			complete : function() {	
				$.mobile.changePage("#source");
			},
			error:function(txt) {
			},
			beforeSend:function() {
			},
		});

	}

	this.loadData = function (name) {

		var loadcase = 'case_0';
		var data = JSON.parse(localStorage.getItem(loadcase));
		if(data) {
			this.data = data;
			this.source = this.data.energy.label;
		} 
		this.save();
		console.log('Chargement du dossier', loadcase);
		window.location.href="#consommation";

	}

	this.setValue = function (arg, val) {
		this.data[arg] = val;
		this.save();
	}

	this.reset = function () {
		var time = Date.now();
		var uuid = sha1('e5D6x'+time+'P2xDs'); 
		this.data = {
			uuid : uuid, 
			customer : {},
			setId : 0,
			steps : {},
			monthly : {},
			annual : {},
			decennial : {},
			family : {},
			home: {},
			products : [],
		};
		this.save();
	}

	this.compute = function() {
		this.updateBill();
		this.setSolutionsVisible(); 
		this.updateCart(); 
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////// UPDATE SOLUTIONS /////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.isProduct = function(name) {
		var products = this.data.products;
		for(var i=0; i<products.length; i++) {
			var product = products[i];
			if(product.name == name) return product;
//				for(var j=0; j<product.products.length; j++) {
//					var p = product.products[j];
//					if(p == name) return product; 
//				}
		}
	}

	this.resetSolutions = function() {
		var products = this.data.products;
		angular.forEach(products, function(product) {
			product.checked = false; 
			product.visible = false; 
		});
		this.save(); 
		$("input[type='checkbox']").checkboxradio("refresh");
	}

	this.updateConso = function(what) {
		var data = this.data;
		var annual = data.annual || {};
		var monthly = data.monthly || {};
		switch(what) {
			case "monthly" : 
				annual.electricite = monthly.electricite * 10;
				annual.gaz = monthly.gaz * 10;
			break;
			case "annual" : 
				monthly.electricite = Math.floor(annual.electricite / 10);
				monthly.gaz = Math.floor(annual.gaz / 10);
			break;
		}	
		this.updateBill();
	}

	this.setSolutionsVisible = function () {

		console.log(">> Update Solutions");

		var s = []; //On construit un tableau ou sera packé les solutions en fonction des choix de l'utilisateur

		var products = this.data.products;
		var data = this.data; 
		var ecs = data.ecs || {}; 
		var chauffage = data.chauffage || {}; 
		var isolation = data.isolation || {};

		angular.forEach(products, function(product) {
			product.visible = false; 
			product.price = product.max - product.discount; 	
		});

		/// ISOLATION
	   	if(Number(isolation.vitrage)==1) this.isProduct('renovation_fenetre').visible=true; 
	   	if(Number(isolation.vitrage)==1) this.isProduct('volets').visible=true;
//		   	if(Number(isolation.facade)==1) this.isProduct('iso_mur_int').visible=true;
	   	if(Number(isolation.facade)==1 && Number(isolation.facade_nord)==1) {
	   	   this.isProduct('iso_mur_ext').visible=true; 
	   	   this.isProduct('iso_mur_int').visible=true; 
	   	}
	   	if(Number(isolation.porte)==1) this.isProduct('porte_entree').visible=true; 
	   	if(Number(isolation.combles)==1) this.isProduct('renovation_toiture').visible=true;  
	   	if(Number(isolation.combles)==2) this.isProduct('iso_comble').visible=true;  
	   	if(Number(isolation.toiture)==1) this.isProduct('hydrofuge_toiture').visible=true; 

		if(Number(isolation.humidite)==1) {
			this.isProduct('double_flux').visible=true; 
			if(Number(isolation.cappilarite)==1) {
				this.isProduct('assechement').visible=true; 
				this.isProduct('double_flux').visible=false; 
			}
		}

		if( Number(chauffage.appoint)==1 ) {
			if( Number(chauffage.cheminee)==1 ) this.isProduct('insert_granules').visible=true; 
			else this.isProduct('poele_granules').visible=true; 
		}
		if(Number(ecs.probleme_calcaire)) this.isProduct('centrale_eau').visible=true; 

		var pack = [];
		if( Number(chauffage.installateur) ) { // Si le client ne connait personne
			if(Number(chauffage.domotique)) this.isProduct('domotique').visible=true; 
			// POELE A GRANULES
		   	switch(this.source) {
			   	case 'gaz' : 
				   	//chauffage
				   switch(chauffage.installation) {
					   case $scope.labels['chaudiere_classique'] : 
							this.isProduct('chaudiere_condensation').visible=true;
							if(Number(chauffage.hybride_possible)==1) this.isProduct('chaudiere_hybride').visible=true; 
							if(Number(chauffage.pulsatoire_possible)==1) this.isProduct('chaudiere_pulsatoire').visible=true; 
					   break;
					   case $scope.labels['chaudiere_condensation'] :
							if(Number(chauffage.satisfaction)==0) {
								this.isProduct('chaudiere_condensation').visible=true;
								if(Number(chauffage.hybride_possible)==1) this.isProduct('chaudiere_hybride').visible=true; 
								if(Number(chauffage.pulsatoire_possible)==1) this.isProduct('chaudiere_pulsatoire').visible=true; 
							}
							if(Number(ecs.thermodynamique_possible)==1) this.isProduct('ballon_thermodynamique').visible=true; 
							else if( ecs.installation == this.isProduct('cumulus').label || ecs.installation == this.isProduct('ballon_thermodynamique').label ) {
							}
							else this.isProduct('chaudiere_pulsatoire').visible=false; 
					   break;
					   case $scope.labels['convecteur_gaz'] : 
							this.isProduct('pac_air_air').visible=true; 
							this.isProduct('radiateur_inertie').visible=true; 
							if(Number(ecs.thermodynamique_possible)) {
								this.isProduct('ballon_thermodynamique').visible=true; 
							}
					   break;
				   } 
			   break;
			   case 'electricite' : 
				   //chauffage
				   if(Number(ecs.thermodynamique_possible)) {
				      this.isProduct('ballon_thermodynamique').visible=true;
				   }
				   
				   switch(chauffage.installation) {
					   case $scope.labels['radiateur_inertie'] :
						   this.isProduct('pac_air_air').visible=true; 
					   break;
					   case $scope.labels['grille_pain'] :
						   this.isProduct('radiateur_inertie').visible=true; 
						   this.isProduct('pac_air_air').visible=true; 
					   break;
					   case $scope.labels['poele_bois'] : 
						   this.isProduct('radiateur_inertie').visible=true; 
						   this.isProduct('pac_air_air').visible=true; 
					   break;
					   case $scope.labels['pac_air_air'] : 
					   case $scope.labels['pac_air_eau'] : 
					   break;
				   } 
			   break;
			   case 'fioul' :
				   //chauffage
					if(Number(ecs.thermodynamique_possible)) {
						this.isProduct('ballon_thermodynamique').visible=true; 
					}
				   switch(chauffage.installation) {
					   case $scope.labels['chaudiere_classique'] :
						   this.isProduct('pac_air_eau').visible=true; 
						   this.isProduct('chaudiere_granule').visible=true; 
							this.isProduct('chaudiere_condensation').visible=true; 
					   break;
					   case $scope.labels['chaudiere_condensation'] :
						   this.isProduct('pac_air_eau').visible=true; 
						   this.isProduct('chaudiere_granule').visible=true; 
					   break;
					   case $scope.labels['convecteur_fioul'] : 
						   	this.isProduct('pac_air_air').visible=true; 
							this.isProduct('radiateur_inertie').visible=true; 
					   break;
				   } 
				break;
		   }
			if( ecs.installation == this.isProduct('ballon_thermodynamique').label ) this.isProduct('ballon_thermodynamique').visible=false; 
		}

		// On compte le nombre de produits qui sont visibles
		var total_products_visible = 0;
		angular.forEach(products, function(product) {
			if(product.visible) total_products_visible++; 
		});
		data.total_products_visible = total_products_visible;

		// On cherche les packs ou les produits adéquats
//			var packages = {};
//			var products = this.data.products;
//			_.each(products, function(p, id) {
//				if(p.products && pack.length >= p.products.length) {
//					// On compare les deux tableaux. On fait la différence dans les deux sens
//					p.diff_1 = _.difference(p.products, pack).length;
//					p.diff_2 = _.difference(pack, p.products).length;
//					if( p.diff_1==0 ) {
//						packages[p.diff_2] = packages[p.diff_2] || [];
//						packages[p.diff_2].push(id); 
//					}
//				}
//			});

//			var tol = 0;
//			var group;
//			var check = false; 
//			// On ne prend QUE les résultats ou il y a la plus petite différence 
//			while(!check) {
//				if(packages[tol] && packages[tol].length>0) {
//					group = packages[tol];
//					check = true; 
//				}
//				if(tol>5) check = true; 
//				tol++;
//			}
//			_.each(group, function(id) {
//				var product = products[id];
//				product.visible = true; 
//			});

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////// UPDATE BILL ///////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.updateBill = function () {

		var data = this.data; 
		this.source = data.energy.label;

		console.log(">> Update Bill", this.source);
		
		/// Si l'utilisateur a entré les données en Litres
		var fioul = data.fioul; 
		var litres = fioul ? parseFloat(fioul.quantity) : null; 
		if(litres) {
			var price = parseFloat(fioul.price) || 0.98;
			data.annual.fioul = (litres * price);
		}
		
		/// Taxe CO2
		var consommation = parseFloat(data.home.consommation) || 0; //kWh
		var surface = parseFloat(data.home.surface) || 1; //m²
		var CO2m2 = parseFloat(consommation/surface) || 0; //kWh/m²
		var taxe_co2 = CO2m2>0 ? CO2m2 / 10 : 0;
		var taxe_co2_annual = parseFloat(taxe_co2*7) || 0;
		var taxe_co2_decennial = makeCumulus(taxe_co2_annual, 1.02);

		data.annual = data.annual || {};
		data.decennial = data.decennial || {};

		this.data.annual.co2 = taxe_co2_annual;
		this.data.decennial.co2 = taxe_co2_decennial;

		/// La famille
		var family = this.data.family; 
		var children = family ? parseInt(family.children) : 0;
		var adults = family ? parseInt(family.adults) : 0;
		var people = children + adults;
		this.data.people = people;

		/// Cumulus
		var ecs = this.data.ecs;
		var cumulus = ecs ? parseInt(ecs.installation)===2 : false;

		/// On comptabilise le tout 

		var be = _.isNumber(data.annual.electricite) ? data.annual.electricite : 0;
		var bg = _.isNumber(data.annual.gaz) ? data.annual.gaz : 0;
		var bf = _.isNumber(data.annual.fioul) ? data.annual.fioul : 0;

		var annual, decennial, ecs, consommation, chauffage;
		switch(this.source) {
			case 'electricite' : 
				bg = 0;
				bf = 0;
//					decennial = de;
				ecs = 108 * people;
				consommation = (be - ecs) * 0.17;
				chauffage = be - ecs - consommation;
			break;
			case 'gaz' : 
				bf = 0;
				if(cumulus) { //avec cumulus (c'est l'élec qui fait l'eau chaude sanitaire)
					ecs = 106 * people;
					consommation = be - ecs;
					chauffage = bg;
				} else { // sans cumulus donc ecs produite par le gaz
					ecs = 96 * people;
					consommation = be;
					chauffage = bg - ecs;
				}
			break;
			case 'fioul' : 
				bg = 0;
				if(cumulus) { //avec cumulus (c'est l'élec qui fait l'eau chaude sanitaire)
					ecs = 108 * people;
					consommation = be - ecs;
					chauffage = bf;
				} else { // sans cumulus donc ecs produite par le fioul
					ecs = 98 * people;
					consommation = be;
					chauffage = bf - ecs;
				}
			break;
			case 'pompe' : 
				bf = 0;
				bg = 0;
				ecs = 108 * people;
				consommation = (be - ecs) * 0.17;
				chauffage = be - ecs - consommation;
			break;
			case 'bois' : 
				bf = 0;
				bg = 0;
				ecs = 108 * people;
				consommation = be - ecs;
				chauffage = bb;
			break;
		}

		annual += this.data.annual.co2;
//			decennial += this.data.decennial.co2;

		var a = this.data.annual; 
		a.gaz = bg; 
		a.electricite = be; 
		a.fioul = bf; 
		a.total = bg + be + bf;
		a.consommation = parseFloat(consommation); 
		a.heater = parseFloat(chauffage); 
		a.hotwater = parseFloat(ecs);
		
		var pc_consommation = a.consommation / a.total;
		var pc_heater = a.heater / a.total;
		var pc_hotwater = a.hotwater / a.total;

		var d = this.data.decennial; 
		d.electricite = makeCumulus(a.electricite, this.coefCumulus.electricite);
		d.gaz = makeCumulus(a.gaz, this.coefCumulus.gaz);
		d.fioul = makeCumulus(a.fioul, this.coefCumulus.fioul);
		d.co2 = makeCumulus(a.co2, this.coefCumulus.co2);
		d.total = d.electricite + d.gaz + d.fioul;
		d.heater = d.total * pc_heater;
		d.hotwater = d.total * pc_hotwater
		d.consommation = d.total * pc_consommation;

		//// COMPUTE earnings 
		this.data.cumulus = {};
		this.data.statik = {};
		this.data.gains = {};
		if(this.data.energy.id===1) { // if main energy is electricity
			this.data.cumulus.electricite = be*(1.06+1.06*1.06);
			this.data.cumulus.gaz = 0;
			this.data.cumulus.total = this.data.cumulus.electricite;
			this.data.statik.electricite = be*2;
			this.data.statik.gaz = 0;
			this.data.statik.total = this.data.statik.electricite;
		}
		else {
			this.data.cumulus.electricite = be*(1.06+1.06*1.06+1.06*1.06*1.06);
			this.data.cumulus.gaz = bg*(1.1+1.1*1.1+1.1*1.1*1.1);
			this.data.cumulus.total = this.data.cumulus.electricite + this.data.cumulus.gaz;
			this.data.statik.electricite = be*3;
			this.data.statik.gaz = bg*3;
			this.data.statik.total = this.data.statik.electricite + this.data.statik.gaz;
		}
		
		this.data.gains.electricite = this.data.cumulus.electricite - this.data.statik.electricite;
		this.data.gains.gaz = this.data.cumulus.gaz - this.data.statik.gaz;
		this.data.gains.total = this.data.cumulus.total - this.data.statik.total;

		//// COMPUTE earnings 
		if(Number(a.heater) && Number(a.hotwater)) {
			angular.forEach(data.products, function(p){
				p.gains = a.heater * p.red_cha + a.hotwater * p.red_ecs;
			});
		}

		this.save();
		
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////// CHECK FILL ////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.checkIssues = function(type) {
		var type = _.isString(type) ? type : undefined; 
		var data = this.data;
		var check_chauffage = data.issues_chauffage || data.issues_ecs || data.issues_regulation; 
		var check_isolation = data.issues_fenetre || data.issues_comble || data.issues_volet || data.issues_porte || data.issues_sol || data.issues_mur || data.issues_toiture;
		var check_others = data.issues_humidite || data.issues_calcaire; 
		switch(type) {
			case 'chauffage' : return check_chauffage; break; 
			case 'isolation' : return check_isolation; break; 
			case 'ecs' : return data.issues_ecs; break; 
			case 'others' : return check_others; break; 
			default : return (check_isolation || check_chauffage || check_others); break; 
		}
	}

	this.checkFill = function (view) {
		
		var error = ''; 
		var _this = this; 
		var view = (view && view.length>0) ? String(view) : undefined; 
		var data = this.data;
		var check = data.check; 
		var step = data.step || {}; 

		var ecs = data.ecs || {}; 
		var isolation = data.isolation || {};
		var family = data.family || {};
		var chauffage = data.chauffage || {};
		data.home = data.home || {};

		if(view) {

			if(view=="consommation") {
				step.consommation = false; 
				if(!Number(data.home.surface)) {
					error = "Indiquer la surface de l'habitation";
				} else if(!Number(data.home.consommation)) {
					error = "Indiquez la consommation énergétique de l'habitation";			
				} else if(this.source=="gaz" && !Number(this.data.annual.gaz)) {
					error = "Veuillez entrer un montant pour le gaz";			
				} else if(this.source=="elec" && !Number(this.data.annual.electricite)) {
					error = "Veuillez entrer un montant pour l'électricité";			
				}	else {
					step.consommation = true; 
				}
			}

			if(view=="habitation") {
				step.habitation = false; 
				if(step.consommation) {
				   if (!data.note) error= "Veuillez choisir une note";
			       else if (data.note==10) {
					   if(!chauffage.appoint) error="Répondez aux questions (appoint)";
					   else if(chauffage.appoint==1) error="Merci, au revoir !"; 
					   else return "";
				   }
				   else {
					   if (!_this.checkIssues()) error="Sélectionnez une source de problème"; 
					   else if (!chauffage.appoint) error="Répondez aux questions (appoint) ";
					   else if (_this.checkIssues('chauffage') && !chauffage.installateur) error="Répondez aux questions (chauffage)";
					   else if (_this.checkIssues('isolation') && !isolation.installateur) error="Répondez aux questions (isolation)";
					   else if ( Number(chauffage.appoint)==1 && _this.checkIssues('chauffage') && _this.checkIssues('isolation') 
									&& Number(chauffage.installateur)==1 && Number(isolation.installateur)==1 ) error="Merci, au revoir !"; 
						 else if ( Number(chauffage.appoint)==1 && _this.checkIssues('chauffage') && Number(chauffage.installateur)==1 
									&& !_this.checkIssues('isolation')) error="Merci, au revoir !";  
						 else if ( Number(chauffage.appoint)==1 && _this.checkIssues('isolation') && Number(isolation.installateur)==1 
									&& !_this.checkIssues('chauffage')) error="Merci, au revoir !";  
		         else step.habitation = true;
				   }
				}
			}

			if(view=="questionnaire") {

				   step.questionnaire = true;
			}

			if(view=="solutions") {
			
				step.solutions = false; 
				step.dimensions = false;
				step.products = false; 
			
			   if(step.questionnaire) {
				   var nchecked = 0;
				   var ncatalog = 0;

				   angular.forEach(data.products, function(product) {
					   if(product.checked) {
						   nchecked++;
						   if(!product.catalog) ncatalog++;
					   }
				   });

				   if(nchecked==0) {
					   error = "Choisissez au moins une solution";	
				   } else {
					   step.solutions = true; 
					   if(ncatalog>0) step.products = true; 
 //						if(summary && summary.isIsolation) step.dimensions = true;
				   }
				}
			}

			if(error.length>0) {
				error = '<span class="ui-btn ui-corner-all ui-icon-alert ui-btn-icon-right" style="background:#FC0;">'+error+'</span>';
				return error;
			}

		}
	

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////// UPDATE CLASS ENERGY ///////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.energyClass = function(coef) {
		var coef = (Number(coef) && coef<1) ? (coef) : 1; 

		var consommation = this.data.home.consommation;
		var surface = this.data.home.surface; 
		var cs = consommation/surface * coef;

		var txt = '';
		if(cs<=50) {
			txt = '<span style="background:#27a22d; font-weight:bold; font-size:35px;" class="number">A</span>';
		} else if (cs>50 && cs<=90) {
			txt = '<span style="background:#76b861; font-weight:bold; font-size:35px;" class="number">B</span>';
		} else if (cs>90 && cs<=150) {
			txt = '<span style="background:#d0df9a; font-weight:bold; font-size:35px;" class="number">C</span>';
		} else if (cs>150 && cs<=230) {
			txt = '<span style="background:#feed01; font-weight:bold; font-size:35px;" class="number">D</span>';
		} else if (cs>230 && cs<=330) {
			txt = '<span style="background:#fdc300; font-weight:bold; font-size:35px;" class="number">E</span>';
		} else if (cs>330 && cs<=450) {
			txt = '<span style="background:#f29400; font-weight:bold; font-size:35px;" class="number">F</span>';
		} else if (cs>450) {
			txt = '<span style="background:#e3001b; font-weight:bold; font-size:35px;" class="number">G</span>';
		}

		return txt;		

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////// I T E M S ////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	// Item for dimensions //
	this.addItem = function(array) {
		console.log(">> Add Item");
		var index = this.data.setId++;
		array.push({index:index});
		this.save();
	}

	this.deleteItem = function(array, id) {
		console.log(">> Delete Item");
		console.log(id);
		array.splice(id, 1);
		this.save();
	}

	this.countItem = function(type) {
		// On compte le nombre d'item qui ont été validés via this.checkItem();
		var num = 0;
		var product = this.isProduct(type);
		if(product) {
			var items = product.items; 
			angular.forEach(items, function(item, id) {
				if(item.check) num++;
			});
		} else console.log('Countkitem failed, no product'); 
		return num;
	}

	this.checkItem = function(type) {
		// On check les items des products en fonction de leurs dimensions/catalogue etc.
		// On calcule déjà ici le prix de chaque item 
		var product = this.isProduct(type);
		if(product) {
			product.surface = 0;
			product.options = 0; // Prix des options
			angular.forEach(product.items, function(item, id) {
				item.check = false;
				var room = item.room;
				var width = Number(item.width);
				var length = Number(item.length);
				var height = Number(item.height);
				var floor = isNumeric(item.floor);
				switch(type) {
					case 'renovation_fenetre' :
						var name = item.window;
						if(name) {
							var catalog = $scope.catalog_by_name.window[name].catalog;
							var cw = catalog[width] ? catalog[width] : undefined; 
							var price = (cw && cw[height]);
							if(price && room && floor && height && width) {
								item.check = true; 
								item.surface = Number(height)*Number(width)/10000;
								item.price = price; 
							}
							if(height && width && !price) {
								item.width = ''; 
								item.height = ''; 
							}
						}
					break;
					case 'volets' :
						var name = item.volet;
						if(name) {
							var catalog = $scope.catalog_by_name.volet[name].catalog;
							var cw = catalog[width] ? catalog[width] : undefined; 
							var price = (cw && cw[height]);
							if(price && room && floor && height && width) {
								item.check = true; 
								item.surface = Number(width)*Number(height)/10000;
								item.price = price; 
							}
						}
					break;
					case 'poele_granules' :
						var name = item.type;
						if(name) {
							var catalog = $scope.catalog_by_name.poele[name];
							var max = catalog.max;
							var min = catalog.min;
							if(max && min) {
								item.check = true; 
								item.price = max;
								item.name = name;
								item.max = max; 
								item.min = min;
								product.max = item.max; 
								product.min = item.min;
							}
						}
					break;
					case 'iso_comble' :
					case 'renovation_toiture' :
					case 'iso_sous_sol' :
						if(width && length) {
							item.check = true; 
							item.surface = Number(width)*Number(length)/10000; 
							item.max = product.max; 
							item.min = product.min; 
							product.surface += item.surface; 
						}
					break;
					case 'porte_entree' :
						if(item.imposte && item.tierce) {
							if(item.imposte=="oui") product.options += 1000;
							if(item.tierce=="oui") product.options += 1000;
							item.check = true; 
						}
					break; 
					case 'iso_mur_int':
					case 'iso_mur_ext' :
						if(width && height && room && floor) {
							item.check = true; 
							item.surface = Number(width)*Number(height)/10000;
							item.max = product.max; 
							item.min = product.min; 
							product.surface += item.surface; 
						}
					break;
				}
			});

			var nItems = 0;
			angular.forEach(product.items, function(item, id) {
				if(item.check) nItems++;
			});
			product.number = nItems; 				

			this.save();
		} 
		else console.log('Checkitem failed, no product'); 
	
	}
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////// UPDATE CART ///////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.makeTabCumulus = function (coef, time) {
		var group = [];
		for(var i=0; i<time; i++) {
			group[i] = Math.pow(coef,i);	
		}
		return group; 
	};

	this.computeDeduction = function(price) {
		var number_adults = parseInt(this.data.family.adults) || 0;
		var number_children = parseInt(this.data.family.children) || 0;
		var deduction_plafond = number_adults*8000 + number_children*400;
		var deduction = Math.min(price-500, deduction_plafond)*0.3;
		deduction = deduction<0 ? 0 : deduction;
		return deduction;
	}

	this.updateCart = function(solutions) {

		var _this = this; 
		_this.hrefs = this.initHrefs(); 

		var data = this.data; 
		console.log(">> Update Cart");
		
		var total_products_checked = 0;
		var total_products_price = 0; // total du prix de tous les produits
		var total_products_number = 0; // total du nombre de tous les produits
		var total_products_confirm = 0; // total du nombre de produits qui ont été confirmé par le vendeur

		var heater_checked = data.annual.heater; 
		var hotwater_checked = data.annual.hotwater; 	

		var heater_confirm = data.annual.heater; 
		var hotwater_confirm = data.annual.hotwater; 	

		var investment = data.investment || {price : 0, time:120};

		angular.forEach(data.products, function(product, id) {

			// On calcule le prix du produit
			product.max = Number(product.max) || 0;
			product.discount = Number(product.discount) || 0;
			product.price = product.max - product.discount; 
			product.price = product.price < product.min ? product.min : product.price;

			if(Number(product.surface)) product.price *= product.surface; // Pour les solutions de rénovation isolation 
			else if(product.catalog && product.items.length>0 ) {
				angular.forEach(product.items, function(item, id) {
					product.price += Number(item.price);
				});	
			}
			else if(Number(product.number)) product.price *= product.number; //Si on achete plusieurs items (porte ou poele) 
			
			if(Number(product.options)) product.price += product.options; //Si on a ajouté des options 
						
			if(product.checked) {
		
				// On ajoute les pages pour dimensionner les produits qui doivent l'être
				if(product.popup) {
					_this.hrefs.splice(11, 0, 'popup_'+product.popup);
				}

				// On calcul les gains pour l'eau chaude et le chauffage pour les solutions qui ont été checked
				heater_checked *= 1-product.red_cha; 
				hotwater_checked *= 1-product.red_ecs; 
				
				total_products_checked++;	

				if(product.confirm) {
		
					// On calcul les gains pour l'eau chaude et le chauffage pour les solutions qui ont été confirmées
					heater_confirm *= 1-product.red_cha; 
					hotwater_confirm *= 1-product.red_ecs; 

					total_products_price += product.price;
					total_products_number += product.number;
					total_products_confirm++;
				}
			} //end if product.checked


		});

		data.total_products_checked = total_products_checked;
		data.total_products_confirm = total_products_confirm;
	
		var deduction = this.computeDeduction(total_products_price);

		// ANNUAL 
		var a = data.annual; 
		a.reduction_heater_checked = heater_checked / a.heater; 
		a.reduction_hotwater_checked = hotwater_checked / a.hotwater; 
		a.reduction_heater_confirm = heater_confirm / a.heater; 
		a.reduction_hotwater_confirm = hotwater_confirm / a.hotwater; 

		a.earnings_checked = (_this.data.annual.heater + _this.data.annual.hotwater) - (heater_checked + hotwater_checked);
		a.earnings_confirm = (_this.data.annual.heater + _this.data.annual.hotwater) - (heater_confirm + hotwater_confirm);

		a.reduction_co2 = total_products_checked > 0 ? a.co2 : 0;

		a.current_solution = a.total + a.reduction_co2; // Avec son installation actuelle, le client paye sa consommation totale 

		a.future_solution_checked = total_products_checked > 0 ? a.total - a.earnings_checked : a.current_solution; 
		a.future_solution_confirm = total_products_confirm > 0 ? a.total - a.earnings_confirm : a.current_solution; 

//			a.reduction_total = (a.reduction_hotwater * a.hotwater/a.total + a.reduction_heater * a.heater/a.total + a.consommation/a.total);

		// DECENIAL 
		var d = data.decennial; 
		d.current_solution = d.total + d.co2;
		d.future_solution_checked = total_products_checked > 0 ? makeCumulus(a.future_solution_checked, 1.08) : d.current_solution;
		d.future_solution_confirm = total_products_confirm > 0 ? makeCumulus(a.future_solution_confirm, 1.08) : d.current_solution;

		// INVESTISSEMENT
		investment.time = Number(investment.time); 
		investment.nproducts = total_products_confirm;
		investment.nitems = total_products_number;
		investment.deduction = deduction; //déduction de l'état
		investment.price = total_products_price;
		investment.total = total_products_price - deduction - a.earnings_confirm * 0.6;

		data.investment = investment; 

		this.updatePreference();
		this.save();

	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////// CLASSEMENT  ///////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	this.updatePreference = function() { // Permet de créer le tableau de préférence 

		var preference = this.data.preference || [];
		// Init preference 
		var group = [];
		angular.forEach(this.data.products, function(product, i) {
			if(!isNaN(product.id) && product.checked) group.push(i);
		});

		var temp1 = []; // On met les nouveaux produits
		var temp2 = []; // On met les produits qui sont déjà classés
		for(var i=0; i<group.length; i++) {
			var prod1 = group[i]; // On a un des produits qui a été choisis. 
			var check = true; 
			for(var j=0; j<preference.length; j++) { // On check si le produit choisis était déjà dans les préférences
				var prod2 = preference[j];
				if(prod1==prod2) { // si oui, alors on récupère sa position dans le classement 
					var index = preference.indexOf(prod2);
					temp2[index] = prod2;
					check = false; 
					break;
				}
			}
			if(check) temp1.push(prod1);
		}

		var group = [];
		angular.forEach(temp2, function(val, id) {
			if(!isNaN(val)) group.push(val);
		});
		temp2 = group;

		preference = temp2.concat(temp1);
		this.data.preference = preference; 
	
	}

	this.classPreference = function(event, ui) {
		var start = ui.item.data('start');
	    var stop = ui.item.index();
	    
		ui.item.css('background', '#ccc');
		ui.item.animate({
    		opacity: 1,
    	}, 300, function() {});
	    
	    $scope.data.preference.splice(stop, 0, 
        $scope.data.preference.splice(start, 1)[0]);
		$scope.save();
	    $scope.$apply();
	}

	this.computePayment = function(solutions) {
		// on calcul la nouvelle mensualité en fonction des solutions choisies 
		// solutions == solution choisies
		// (payment mensuel actuel - les gains par les nouvelles solutions - taxe C02) * coef
		// coef = 0.78 car le client s'engage à respecter l'écohabitant
		var coef = 0.78;
		var payment = this.data.annual.current_solution;
		var taxe_co2 = this.data.annual.co2;
		angular.forEach(solutions, function(product, id) {
			payment -= product.gains;
		});
		payment -= taxe_co2;
		payment = (payment/12)*coef;
		return payment;
	}

	this.choosePreference = function(options) {

		console.log(">> choosePreference");
		var options = options!==undefined ? options : {};
		console.log(options);
		var group = {products:[]};
		var preference = this.data.preference;
		var solutions = this.data.products; 

		var current_payment = this.data.annual.total / 12;
		var investment = 0;
		var deduction;
		var future_payment; 
		var monthly_payment;
		
		group.current_payment = current_payment;
		group.type = options.optimal;
				
		if(preference.length>0) {
			angular.forEach(preference, function(val, id) {
				var solution = solutions[val];
				console.log(solution);
				if(solution.number>0) {
					investment += solution.price;
					deduction = $scope.computeDeduction(investment);
					future_payment = $scope.computePayment(group.products);
					monthly_payment = (investment - deduction)/120;
					if((options.optimal && monthly_payment + future_payment < current_payment) || !options.optimal) {
						solution.current_payment = current_payment;
						solution.future_payment = future_payment;
						solution.investment = investment;
						solution.deduction = deduction; 
						solution.monthly_payment = monthly_payment;
						group.products.push(solution);
						group.future_payment = future_payment;
						group.investment = investment;
						group.deduction = deduction;
						group.monthly_payment = monthly_payment;
					}
				}
			});	
		}

		this.data.choosePreference = group; 
		this.save();
	}

});

