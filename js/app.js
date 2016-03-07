
var color_scale = ['#F00','#F30','#F60','#F90','#FC0','#FF0','#CF0','#9F0','#6F0','#3F0','#0F0'];

var default_surface = 1;

var catalog_poeles = [
	{name:"DIAMAND", max:7592, min:5500}, 
	{name:"mini smart", max:5961, min:3877}, 
	{name:"smart", max:6717, min:4634},
	{name:"smart mirror", max:6822, min:4738},
	{name:"fusion mini", max:6022, min:3958},
	{name:"fusion glass mini", max:6476, min:5137},
	{name:"fusion classic", max:6868, min:4784},
	{name:"fusion glass", max:7115, min:4392}, 
	{name:"fusion glass mirror", max:7220, min:4392}, 
	{name:"fusion Hi", max:7562, min:5479}, 
	{name:"Plasma", max:6504, min:4420},
];

var solutions = [
	{name: "volets", label:"Volets roulant", red_cha:0.92, popup:"volet", catalog:true, energy:"elec", category:"isolation", img:"volet_roulant"},	
	{name: "renovation_fenetre", label:"Rénovation fenêtres",popup:"fenetre", catalog:true, red_cha:0.88, category:"isolation", img:"renovation_fenetre", video:true},
	{name: "renovation_toiture", label:"Rénovation toiture",popup:"toiture", price:{area:411}, surface:true, red_cha:0.7, category:"isolation", img:"renovation_toiture", video:true},
	{name: "hydrofuge_toiture", label:"Hydrofuge toiture", price:{unit:9706}, red_cha:1, category:"isolation", img:"hydrofuge_toiture", video:true},
	{name: "porte_entree", label:"Porte d'entrée",popup:"porte", price:{unit:6541} , reduction:0.9, category:"isolation", img:"porte_entree", video:true},
	{name: "iso_comble", label:"Isolation des combles", price:{unit:5581}, red_cha:0.7, category:"isolation", img:"isolation_combles", video:true},
	{name: "iso_mur_int", label:"Isolation mur intérieur", price:{area:183}, surface:true, popup:"mur_int", red_cha:0.75, category:"isolation", img:"isolation_interieur"},
	{name: "iso_mur_ext", label:"Isolation mur extérieur", price:{area:450}, surface:true, popup:"mur_ext", red_cha:0.75, category:"isolation", img:"isolation_exterieur", video:true},
	
	{name: "double_flux", label:"Ventillation positive", price:{unit:5987}, red_cha:0.7, category:"chauffage", img:"ventillation_positive"},
	{name: "assechement", label:"Ventillation positive & assèchement", price:{unit:9706}, red_cha:0.7, category:"isolation", img:"assechement", video:true},
	
	{name: "poele_granules", label:"Poêle à granulés", catalog:true, popup:"poele", red_cha:0.6, category:"chauffage", img:"poele_granules", video:true},
	{name: "insert_granules", label:"Insert à granulés",price:{unit:7592}, red_cha:0.6, category:"chauffage", img:"insert_granules", video:true},

	{name: "radiateur_inertie", label:"Radiateur à inertie", price:{unit:1963}, red_cha:0.75, popup:"radiateur_inertie", category:"chauffage", img:"radiateur_inertie", video:true},
	{name: "domotique", label:"Domotique", price:{unit:4410}, red_cha:0.77, category:"chauffage", img:"domotique", video:true},
	{name: "chaudiere_granule", label:"Chaudière à granulés", price:{unit:19391}, red_cha:0.5, category:"chauffage", img:"chaudiere_granules", video:true},
	{name: "chaudiere_hybride", label:"Chaudière hybride", price:{unit:14800}, red_ecs:0.5, red_cha:0.5, category:"chauffage", img:"chaudiere_hybride", video:true},
	{name: "chaudiere_pulsatoire", label:"Chaudière pulsatoire", price:{unit:7807}, red_cha:0.6, category:"chauffage", img:"chaudiere_pulsatoire", video:true},
	{name: "chaudiere_condensation", label:"Chaudière à condensation",price:{unit:6990}, red_cha:0.7,  red_ecs:0.7, category:"chauffage", img:"chaudiere_condensation", video:true},

	{name: "pac_air_eau", label:"Pompe à chaleur air/eau", price:{unit:19729}, red_cha:0.45, category:"chauffage", img:"pac_air_eau", video:true},
	{name: "pac_air_air", label:"Pompe à chaleur air/air", price:{unit:8535}, red_cha:0.63, category:"chauffage", img:"pac_air_air", video:true},
	{name: "ballon_thermodynamique", label:"Ballon thermodynamique", price:{unit:6436}, red_ecs:0.1, category:"ecs", img:"ballon_thermodynamique", video:true},
	{name: "cumulus", label:"Cumulus", price:{unit:2705}, red_ecs:0.8, category:"ecs", img:"cumulus", video:true},
	{name: "adoucisseur", label:"Adoucisseur", price:{unit:2943}, red_ecs:1, category:"ecs", img:"adoucisseur"}, 

	{name: "chaudiere_classique", label:"Chaudière"},
	{name: "convecteur_gaz", label:"Convecteur gaz"},
	{name: "convecteur_fioul", label:"Convecteur fioul"},
	{name: "grille_pain", label:"Radiateur type grille pain"},
	{name: "centrale_eau", label:"Centrale d'eau", red_ecs:0.7, price:{unit:4721}, category:"ecs", img:"centrale_eau", video:true},
];

var solutions_by_name = {};
angular.forEach(solutions, function(solution) {
	solutions_by_name[solution.name] = solution; 
});

var packs = [
	{products : ['chaudiere_condensation', 'hydrofuge_toiture'], label:"Chaudière à condensation & Hydrofuge toiture", price:{unit:14585}, img:"condensation_hydrofuge", video:false}, 
	{products : ['hydrofuge_toiture', 'iso_comble'], label:"Hydrofuge toiture & Isolation des combles", price:{unit:14585}, img:"iso_comble_hydrofuge", video:false}, 
	{products : ['ballon_thermodynamique', 'hydrofuge_toiture'], label:"Ballon thermodynamique & Hydrofuge toiture", img:"ballon_thermo_hydrofuge", price:{unit:14585}, video:false}, 
	{products : ['chaudiere_condensation', 'iso_comble'], label:"Chaudière à condensation & Isolation des combles", img:"condensation_iso_comble", price:{unit:13600}, video:false}, 
	{products : ['chaudiere_condensation', 'ballon_thermodynamique'], label:"Chaudière à condensation & Ballon thermodynamique", img:"condensation_ballon_thermo", price:{unit:13800},video:false}, 
	{products : ['chaudiere_condensation', 'double_flux'], label:"Chaudière à condensation & Ventillation positive", img:"condensation_ventillation", price:{unit:13200},video:false}, 
	{products : ['chaudiere_pulsatoire', 'ballon_thermodynamique'], label:"Chaudière pulsatoire & Ballon thermodynamique", img:"pulsatoire_ballon_thermo", price:{unit:15900}, video:false},  
];

var rooms = [
	'Buanderie',
	'Bureau',
	'Chambre',
	'Cuisine',
	'Salle de bains',
	'Salle à manger',
	'Salon',
	'Toilette',
];

var sides = [
	'Avant',
	'Arrière',
	'Nord',
	'Sud',
	'Ouest',
	'Est',
];

(function () {

	'use strict';

	var app = angular.module('store', ['html']);

	app.filter("rounded",function(){    
		return function(val,to){
			var val = parseFloat(val) || eval(val);
			if(parseFloat(val)) {
				return val.toFixed(to || 0);
		    } else return 0;
		}
	});

	app.filter("price",function(){    
		return function(val,to){
			var value = parseFloat(val) || 0;
		    value = value.formatMoney(to);
		    return value;
		    
		}
	});

	app.filter("positive",function(){    
		return function(val,to){
			var value = parseFloat(val) || 0;
		    value = value < 0 ? 0 : value;
		    return value;
		    
		}
	});

	app.controller('StoreController', function ($scope, $http) {

		$scope.connected = false; 

		this.posHref = function(name, pos) {
			console.log('posHref');
//			$scope.connect(); 
			var pos = Number(pos); 
			var selected_href;
			if(pos) {
				var hrefs = this.hrefs;
				for(var i=0; i<=hrefs.length; i++) {
					if(name==hrefs[i] && i>=0 && i<hrefs.length) selected_href = '#'+hrefs[i+pos];
				}; 
			};
			if(selected_href) $.mobile.changePage(selected_href);
		}

		this.previousHref = function (name) {
			console.log('previousHref');
//			$scope.connect(); 
			var hrefs = this.hrefs;
			var selected_href;
			for(var i=0; i<=hrefs.length; i++) {
				if(name==hrefs[i] && i>0 && i<hrefs.length) selected_href = '#'+hrefs[i-1];
			};
			if(selected_href) $.mobile.changePage(selected_href);

		}
		this.nextHref = function (name) {
			console.log('nextHref');
//			$scope.connect(); 
			var hrefs = this.hrefs;
//			console.log(hrefs); 
			var selected_href;
			for(var i=0; i<=hrefs.length; i++) {
				if(name==hrefs[i] && i>0 && i<hrefs.length) selected_href = '#'+hrefs[i+1];
			};
//			console.log(name, selected_href);
			if(selected_href) $.mobile.changePage(selected_href);
		}

		this.initHrefs = function() {
			var tab = [
				'source', //0 //Choisir la source 
				'consommation', //1 //introduire la consommation du client
				'compteur', //3 //introduire le fake compteur
				'questionnaire', //5 //questionnaire avancé
				'class_energy', //6 //calcul de la classe énergétique actuelle
				'taxeco2', //7 //CO2
				'solutions', //12 // choisir les solutions
				'why_gdf', //8 
				'because_gdf', //9
				'avantages', //10
				'simulation', //11 //le truc avec les voitures
				'investment',
				'synthese', //14
			];	
			return tab; 	
		}

		$scope.registration = function () {

			console.log('>> connexion');
			var name = $('input[name="name"]').val();
			var username = $('input[name="username"]').val();
			var email = $('input[name="remail"]').val();
			var confirm_email = $('input[name="confirm_email"]').val();
			var password = $('input[name="rpassword"]').val();
			var confirm_password = $('input[name="confirm_password"]').val();
			var data = {name:name, email:email, password:password, confirm_email:confirm_email, confirm_password:confirm_password, username:username};
			console.log(data); 

			$http({
				method: 'POST',
				url: 'setRegister.php',
				data: $.param(data),
				headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			}).success(function(html){
		        var html; 
				console.log('>> connexion réussie', html);
				if(html.success) {
					$("#error_registration").html("Connexion réussie.");
					localStorage.setItem('token', html.token); 
					localStorage.setItem('time', html.time); 
					localStorage.setItem('user_id', html.user_id); 
					localStorage.setItem('username', html.username); 
					localStorage.setItem('group', html.token); 

					$scope.username = html.username;
					$scope.token = html.token; 
					$scope.connected = true; 

					$.mobile.changePage("#source");
				}
				else{
					$("#error_registration").html(html.error);
				}
		    }).error(function(error){
		        $("#error_registration").html("Request aborted.");
		    });

		}

		$scope.authentification = function () {

			console.log('>> connexion');
			var email = $('input[name="email"]').val();
			var password = $('input[name="password"]').val();
			var data = {email:email, password:password};
			console.log(data); 

			$http({
				method: 'POST',
				url: 'setLogin.php',
				data: $.param(data),
				headers : {'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'},
			}).success(function(html){
		        var html; 
				console.log('>> connexion réussie', html);
				if(html.success) {
					$("#error_login").html("Connexion réussie.");
					localStorage.setItem('token', html.token); 
					localStorage.setItem('time', html.time); 
					localStorage.setItem('user_id', html.user_id); 
					localStorage.setItem('username', html.username); 
					localStorage.setItem('group', html.token); 

					$scope.username = html.username;
					$scope.token = html.token; 
					$scope.connected = true; 

					$.mobile.changePage("#source");
				}
				else{
					$("#error_login").html(html.error);
				}
		    }).error(function(error){
		        $("#error_login").html("Request aborted.");
		    });

		}

		$scope.disconnect = function() {
			localStorage.setItem('username', undefined);
			localStorage.setItem('time', undefined);
			localStorage.setItem('token', undefined);
			$scope.connected = false; 
			$.mobile.changePage("#login");
		}

		$scope.connect = function() {
			$scope.connected = false; 
			$scope.username = undefined; 
			console.log($scope.connected); 

			var time = Math.floor(new Date().getTime() / 1000);
			var session_username = localStorage.getItem('username'); 
			var session_time = Number(localStorage.getItem('time')); 
			var session_token = localStorage.getItem('token'); 
			console.log('>> Connexion');
			if(session_token && session_username && session_time) {
				console.log('>> sessionStorage existant');	
				var token = sha1('iPx5m'+session_username+'F2_dRx'+session_time+'Okoi32x');
				console.log(time, session_time); 
				if(time < session_time) {
					if(String(token) == String(session_token)) {
						console.log("Votre token est toujours bon."); 
						$scope.username = session_username;
						$scope.time = session_time - time; 
						$scope.connected = true; 
					} else {
						console.log("Ne jouer pas avec les données locales. Reconnectez vous via internet"); 
						$.mobile.changePage("#login");
					}
				} else {
					console.log("Votre token est expiré."); 
					$.mobile.changePage("#login");
				}
			} else {	
				if($scope.online) { // Si on a accès à internet
					$.mobile.changePage("#login");
				} else { // Si on a pas internet
					console.log("Vous devez être connecté à internet pour renouveller votre accès au logiciel"); 
				}
			}

		}

		$scope.$watch('online', function(newStatus) { 
			setInterval(function(){ 
//				$scope.connect();
			}, 60000*5);
		});

		$scope.$watch('offline', function(newStatus) { 
			setInterval(function(){ 
//				$scope.connect();
			}, 60000*5);
		});

		$scope.makeCumulus = makeCumulus;
		$scope.color_scale = color_scale;
		// Organisation des pages		
		this.hrefs = this.initHrefs(); 

		var store = this;

		// -------------------------------------------------------------------------------- //
		// ------------------------------ I N I T    V A R -------------------------------- //
		// -------------------------------------------------------------------------------- //

		this.logo_elec = "edf-bleu-ciel.png";
		this.logo_gaz = "Engie_Logo.png";

		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();

		this.dd = dd;
		this.mm = mm;
		this.yyyy = yyyy;

		this.default = {
			option : "Veuillez choisir...",
			surface : 100,
			nfixed : 0,
		}

		this.data = {};
		this.catalog = {
			window : catalog_windows, 
			volet : catalog_volets,
			poele : catalog_poeles,
		};

		this.catalog_by_name = {};
		angular.forEach(this.catalog, function(catalog, name){
			store.catalog_by_name[name] = {};
			angular.forEach(catalog, function(values, id){
				store.catalog_by_name[name][values.name] = values;
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

		this.rooms = rooms; 
		this.sides = sides; 

		var labels = {};
		angular.forEach(solutions, function(solution,id) {
//			var solution = new Solution(sol);
			if(solution.name) labels[solution.name] = solution.label;  
		});
//		console.log(labels); 
		this.labels = labels; 

		this.energies = [
			{id:1, name:"Electricité", label:"electricite", icon:'ico-ELEC.png'},
			{id:2, name:"Gaz naturel", label:"gaz",	icon:'ico-GAZ.png'},
			{id:3, name:"Fioul", label:"fioul", icon:'ico-FUEL.png'},
//			{id:4, name:"Pompe à chaleur", label:"pompe", icon:'ico-PaC.png'},
//			{id:5, name:"Bois", label:"bois", icon:'ico-BOIS.png'},
		];

		// -------------------------------------------------------------------------------- //
		// -------------------------- S A V E  &&  L O A D -------------------------------- //
		// -------------------------------------------------------------------------------- //

		this.load = function () {
			var data = JSON.parse(sessionStorage.getItem('data'));
			if(data) {
				this.data = data;
				this.source = this.data.energy.label;
				//console.log(this);
			} else {
				this.reset();
			}
//			console.log('Chargement des données', data);
		}

		this.save = function () {
//			console.log('Sauvegarde session des données', this.data);
			sessionStorage.setItem('data', JSON.stringify(this.data) );
		}

		function loadReports() {
			var tab;
			$.ajax({
				type: "POST",
				url: "setReports.php",
				data: { action:"load" },
				success: function(html){
					var html = JSON.parse(html); 
//					console.log('>> connexion réussie', html.reports);
					tab = html.reports;
				},
				complete : function() {	
					console.log(tab);
					return tab; 

				},
				error:function(txt) {
				},
				beforeSend:function() {
				},
			});
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
//			console.log('setValue : ', arg, '=', val);
			this.save();
		}

		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////////////////////////////////////    RESET DATA    /////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		this.reset = function () {
			var time = Date.now();
			var uuid = sha1('e5D6x'+time+'P2xDs'); 
			this.data = {
				uuid : uuid, 
				showItems : "grid",
				customer : {},
				setId : 0,
				step : {}, //permet de check si les etapes sont bien remplies
				monthly : {},
				annual : {},
				decennial : {},
				family : {},
				home:{},
				products : [],
				energy : this.energies[0],
				cart : {},
			};

			var group = [];
			var id = 0;
			angular.forEach(solutions, function(solution) {
				solution.items = [];
				solution.red_cha = _.isNumber(solution.red_cha) ? 1 - solution.red_cha : 0;
				solution.red_ecs = _.isNumber(solution.red_ecs) ? 1 - solution.red_ecs : 0;
				solution.id = id; 
				group.push(solution);
				id++;
			});
			angular.forEach(packs, function(solution) {
				solution.items = [];
				solution.red_cha = 1;
				solution.red_ecs = 1;
				solution.id = id; 
				angular.forEach(solution.products, function(product) {
					var sol = solutions_by_name[product];
					if(sol) {
						var red_cha = _.isNumber(sol.red_cha) ? 1 - sol.red_cha : 0;
						var red_ecs = _.isNumber(sol.red_ecs) ? 1 - sol.red_ecs : 0;
						solution.red_cha *= red_cha;
						solution.red_ecs *= red_ecs;
					}
				});
				solution.red_cha = 1 - solution.red_cha;
				solution.red_ecs = 1 - solution.red_ecs;
				solution.name = solution.img; 
				group.push(solution);
				id++;
			});

			console.log(group);

			this.data.products = group;

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
				if(Number(isolation.toiture)==1) this.isProduct('renovation_toiture').visible=true; 

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
			if( chauffage.installateur != '0' || !chauffage.installateur ) { // Si le client ne connait personne
				if(Number(chauffage.domotique)) this.isProduct('domotique').visible=true;
				// POELE A GRANULES
			   	switch(this.source) {
				   	case 'gaz' : 
					   	//chauffage
					 	if(Number(ecs.thermodynamique_possible)) {
					      this.isProduct('ballon_thermodynamique').visible=true;
					   }
					   switch(chauffage.installation) {
						   case store.labels['chaudiere_classique'] : 
								this.isProduct('chaudiere_condensation').visible=true;
								if(Number(chauffage.hybride_possible)==1) this.isProduct('chaudiere_hybride').visible=true; 
								if(Number(chauffage.pulsatoire_possible)==1) this.isProduct('chaudiere_pulsatoire').visible=true; 
//								if(Number(ecs.thermodynamique_possible)==1) this.isProduct('ballon_thermodynamique').visible=true; 
						   break;
						   case store.labels['chaudiere_condensation'] :
								if(Number(chauffage.satisfaction)==0) {
									this.isProduct('chaudiere_condensation').visible=true;
									if(Number(chauffage.hybride_possible)==1) this.isProduct('chaudiere_hybride').visible=true; 
									if(Number(chauffage.pulsatoire_possible)==1) this.isProduct('chaudiere_pulsatoire').visible=true; 
								}
//								if(Number(ecs.thermodynamique_possible)==1) this.isProduct('ballon_thermodynamique').visible=true; 
								else if( ecs.installation == this.isProduct('cumulus').label || ecs.installation == this.isProduct('ballon_thermodynamique').label ) {
								}
								else this.isProduct('chaudiere_pulsatoire').visible=false; 
						   break;
						   case store.labels['convecteur_gaz'] : 
								this.isProduct('pac_air_air').visible=true; 
								this.isProduct('radiateur_inertie').visible=true; 
//								if(Number(ecs.thermodynamique_possible)==1) this.isProduct('ballon_thermodynamique').visible=true; 
						   break;
					   } 
				   break;
				   case 'electricite' : 
					   //chauffage
					   if(Number(ecs.thermodynamique_possible)) {
					      this.isProduct('ballon_thermodynamique').visible=true;
					   }
					   
					   switch(chauffage.installation) {
						   case store.labels['radiateur_inertie'] :
							   this.isProduct('pac_air_air').visible=true; 
						   break;
						   case store.labels['grille_pain'] :
							   this.isProduct('radiateur_inertie').visible=true; 
							   this.isProduct('pac_air_air').visible=true; 
						   break;
						   case store.labels['poele_bois'] : 
							   this.isProduct('radiateur_inertie').visible=true; 
							   this.isProduct('pac_air_air').visible=true; 
						   break;
						   case store.labels['pac_air_air'] : 
						   case store.labels['pac_air_eau'] : 
						   break;
					   } 
				   break;
				   case 'fioul' :
					   //chauffage
						if(Number(ecs.thermodynamique_possible)) {
							this.isProduct('ballon_thermodynamique').visible=true; 
						}
					   switch(chauffage.installation) {
						   case store.labels['chaudiere_classique'] :
							   this.isProduct('pac_air_eau').visible=true; 
							   this.isProduct('chaudiere_granule').visible=true; 
								this.isProduct('chaudiere_condensation').visible=true; 
						   break;product.price.total = 0;
						   case store.labels['chaudiere_condensation'] :
							   this.isProduct('pac_air_eau').visible=true; 
							   this.isProduct('chaudiere_granule').visible=true; 
						   break;
						   case store.labels['convecteur_fioul'] : 
							   	this.isProduct('pac_air_air').visible=true; 
								this.isProduct('radiateur_inertie').visible=true; 
						   break;
					   } 
					break;
			   }
				if( ecs.installation == this.isProduct('ballon_thermodynamique').label ) this.isProduct('ballon_thermodynamique').visible=false; 
			}

			// Package
			var _this = this; 
			angular.forEach(_this.data.products, function(solution) {
				var products = solution.products; 
				if(products && products.length>0) {
					var count = 0;
					angular.forEach(products, function(product) {
						var visible = _this.isProduct(product).visible;
						if(visible) count++;
					});
					if(count == products.length) _this.isProduct(solution.name).visible=true; 
				}
			}); 

			
			// ne pas afficher ceux qu'on veut pas afficher seul 
			this.isProduct('chaudiere_condensation').visible = false;
			this.isProduct('chaudiere_pulsatoire').visible = false;


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

		this.updateFioul = function() {
			var data = this.data; 
			/// Si l'utilisateur a entré les données en Litres
			var fioul = data.fioul; 
			var litres = fioul ? parseFloat(fioul.quantity) : null; 
			if(litres) {
				var price = parseFloat(fioul.price) || 0.98;
				console.log(price); 
				data.annual.fioul = Math.floor(litres * price);
				data.monthly.fioul = Math.floor(litres * price / 10);
			}
			this.updateBill();
		}

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

		this.updateBill = function () {

			var data = this.data; 
			this.source = data.energy.label;

			console.log(">> Update Bill", this.source);
			
			/// Taxe CO2
			var consommation = parseFloat(data.home.consommation) || 0; //kWh
			var surface = parseFloat(data.home.surface) || 1; //m²
			var CO2m2 = parseFloat(consommation/surface) || 0; //kWh/m²
			var taxe_co2 = CO2m2>0 ? CO2m2 / 10 : 0;
			taxe_co2 = this.source=="electricite" ? 0 : taxe_co2;
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
			var cumulus = ecs ? ecs.installation=="Cumulus" : false;

			/// On comptabilise le tout 

			var a = this.data.annual; 
			var d = this.data.decennial; 

			var ae = Number(a.electricite);
			var ag = Number(a.gaz);
			var af = Number(a.fioul);

			var ecs, consommation, chauffage;
			switch(this.source) {
				case 'electricite' : 
					ag = 0;
					af = 0;
					ecs = 108 * people;
					consommation = (ae - ecs) * 0.17;
					chauffage = ae - ecs - consommation;
				break;
				case 'gaz' : 
					af = 0;
					if(cumulus) { //avec cumulus (c'est l'élec qui fait l'eau chaude sanitaire)
						ecs = 106 * people;
						consommation = ae - ecs;
						chauffage = ag;
					} else { // sans cumulus donc ecs produite par le gaz
						ecs = 96 * people;
						consommation = ae;
						chauffage = ag - ecs;
					}
				break;
				case 'fioul' : 
					ag = 0;
					if(cumulus) { //avec cumulus (c'est l'élec qui fait l'eau chaude sanitaire)
						ecs = 108 * people;
						consommation = ae - ecs;
						chauffage = af;
					} else { // sans cumulus donc ecs produite par le fioul
						ecs = 98 * people;
						consommation = ae;
						chauffage = af - ecs;
					}
				break;
			}

			a.gaz = ag<=0 ? undefined : ag; 
			a.electricite = ae<=0 ? undefined : ae;
			a.fioul = af<=0 ? undefined : af;
			a.total = ag + ae + af;
			a.consommation = parseFloat(consommation); 
			a.heater = parseFloat(chauffage); 
			a.hotwater = parseFloat(ecs);

			var pc_consommation = a.consommation / a.total;
			var pc_heater = a.heater / a.total;
			var pc_hotwater = a.hotwater / a.total;

			d.electricite = makeCumulus(ae, this.coefCumulus.electricite,11) - ae;
			d.gaz = makeCumulus(ag, this.coefCumulus.gaz,11) - ag;
			d.fioul = makeCumulus(af, this.coefCumulus.fioul,11) - af;
			d.co2 = makeCumulus(a.co2, this.coefCumulus.co2,11)- a.co2;
			d.total = d.electricite + d.gaz + d.fioul;
			d.heater = d.total * pc_heater;
			d.hotwater = d.total * pc_hotwater
			d.consommation = d.total * pc_consommation;

			//// COMPUTE earnings 
			this.data.cumulus = {};
			this.data.statik = {};
			this.data.gains = {};
			if(this.data.energy.id===1) { // if main energy is electricity
				this.data.cumulus.electricite = ae*(1.06+1.06*1.06);
				this.data.cumulus.gaz = 0;
				this.data.cumulus.total = this.data.cumulus.electricite;
				this.data.statik.electricite = ae*2;
				this.data.statik.gaz = 0;
				this.data.statik.total = this.data.statik.electricite;
			}
			else {
				this.data.cumulus.electricite = ae*(1.06+1.06*1.06+1.06*1.06*1.06);
				this.data.cumulus.gaz = ag*(1.1+1.1*1.1+1.1*1.1*1.1);
				this.data.cumulus.total = this.data.cumulus.electricite + this.data.cumulus.gaz;
				this.data.statik.electricite = ae*3;
				this.data.statik.gaz = ag*3;
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
				   	step.questionnaire = false;
					var children = Number(family.children);
					var adults = Number(family.adults);
					if((!_.isNumber(adults) || isNaN(adults)) || (!_.isNumber(children) || isNaN(children)) ) error="Quelle est la composition de la famille ?";
					else {
						step.questionnaire = true;
					}
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

		this.deleteItem = function(type, id) {
			var product = this.isProduct(type);
			var array = product.items; 
			console.log(">> Delete Item");
			console.log(id);
			array.splice(id, 1);
			this.countItem(type); 
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
				product.number = num; 
			}
			return num;
		}

		this.checkItem = function(type) {
			// On check les items des products en fonction de leurs dimensions/catalogue etc.
			// On calcule déjà ici le prix de chaque item 
			var product = this.isProduct(type);
			var scope = $scope;
			if(product) {
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
								var catalog = store.catalog_by_name.window[name].catalog;
								var cw = catalog[width] ? catalog[width] : undefined; 
								var price = (cw && cw[height]);
								if(price && height && width) {
									item.check = true; 
									item.surface = Number(height)*Number(width)/10000;
									item.volets_disp = [];
									item.price_volet = 0; 
									angular.forEach(catalog_volets, function(cat) {
										var catalog = cat.catalog;
										if(catalog[width]) {
											var cw = catalog[width]; 
											if(cw[height] && _.isNumber(cw[height])) item.volets_disp.push({name:cat.name, price:cw[height]});
										}
									});
									if(item.volets_disp.length==0) {
										item.volet = undefined; 
										item.price_volet = 0; 
									}
									else if(item.volet) {
										for(var i=0; i<item.volets_disp.length; i++) {
											var name = item.volets_disp[i].name;
											if( name == item.volet ) {
												item.price_volet = item.volets_disp[i].price; 
												break; 
											}
										}
									}
									else {
										item.price_volet = 0; 
										item.volet = undefined; 
									}
									item.price = price + item.price_volet; 
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
								var catalog = store.catalog_by_name.volet[name].catalog;
								var cw = catalog[width] ? catalog[width] : undefined; 
								var price = (cw && cw[height]);
								if(price && height && width) {
									item.check = true; 
									item.surface = Number(width)*Number(height)/10000;
									item.price = price; 
								}
							}
						break;
						case 'poele_granules' :
							var name = item.type;
							if(name) {
								var catalog = store.catalog_by_name.poele[name];
								var max = catalog.max;
								var min = catalog.min;
								if(max && min) {
									item.check = true; 
									item.price = max;
									item.name = name;
								}
							}
						break;
						case 'iso_comble' :
						case 'renovation_toiture' :
						case 'iso_sous_sol' :
							if(width && length) {
								item.check = true; 
								item.surface = Number(width)*Number(length); 
							}
						break;
						case 'porte_entree' :
							if(item.imposte && item.tierce) {
								item.options = 0;
								if(item.imposte=="oui") item.options += 1000;
								if(item.tierce=="oui") item.options += 1000;
								item.check = true; 
							}
						break; 
						case 'iso_mur_int':
							if(width && height) {
								item.check = true; 
								item.surface = Number(width)*Number(height);
							}
						break;
						case 'iso_mur_ext' :
							if(width && height && String(item.option)) {
								item.check = true; 
								if(item.option=="enduit") item.area_price = 308;
								if(item.option=="bardage") item.area_price = 358;
								item.surface = Number(width)*Number(height);
							}
						break;
						case 'radiateur_inertie' : 
							item.check = true; 
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

		this.makeTabCumulus = makeTabCumulus;

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
			
			var total_products_price_checked = 0; // total du prix de tous les produits
			var total_products_price_confirm = 0; // total du prix de tous les produits
			var total_price_for_deduction = 0; //total du prix pour calculer les déductions
			var total_products_number = 0; // total du nombre de tous les produits
			var total_products_confirm = 0; // total du nombre de produits qui ont été confirmé par le vendeur
			var total_products_checked = 0;

			var heater_checked = data.annual.heater; 
			var hotwater_checked = data.annual.hotwater; 	

			var heater_confirm = data.annual.heater; 
			var hotwater_confirm = data.annual.hotwater; 	

			var investment = data.investment || {price : 0, time:120};
	
			angular.forEach(data.products, function(product, id) {

				product.price = product.price || {};

				// On calcule le prix du produit
				switch(product.name) {
					case 'renovation_fenetre' :
					case 'volets' :
					case 'poele_granules' :
						product.price.total = 0;
						angular.forEach(product.items, function(item, id) {
							product.price.total += item.check ? Number(item.price) : 0;
						});	
					break;

					case 'porte_entree' :
						product.price.total = 0;
						angular.forEach(product.items, function(item, id) {
							item.price = item.check ? (product.price.unit + item.options) : 0;
							product.price.total += item.price;
						});	
					break;
					
					case 'iso_mur_int':
					case 'renovation_toiture' :
						product.price.total = 0;
						product.surface = 0;
						angular.forEach(product.items, function(item, id) {
							item.price = item.check ? Number(item.surface)*product.price.area : 0;
							product.price.total += item.price;
							product.surface += item.surface; 
						});	
					break;
					case 'iso_mur_ext' :
						product.price.total = 0;
						product.surface = 0;
						angular.forEach(product.items, function(item, id) {
							item.price = item.check ? 2000 + Number(item.surface)*item.area_price : 0;
							product.price.total += item.price;
							product.surface += item.surface; 
						});	
					break;
					case 'radiateur_inertie' : 
						product.price.total = product.price.unit * product.items.length;
						product.number = product.items.length;
					break;
					default : 
						product.price.total = product.price.unit;
					break; 
				}

							
				if(product.checked) {
			
					// On ajoute les pages pour dimensionner les produits qui doivent l'être
					if(product.popup) {
						_this.hrefs.splice(11, 0, 'popup_'+product.popup);
					}

					// On calcul les gains pour l'eau chaude et le chauffage pour les solutions qui ont été checked
					heater_checked *= 1-product.red_cha; 
					hotwater_checked *= 1-product.red_ecs; 
					
					total_products_checked++;	
					total_products_price_checked += product.price.total;

					if(product.confirm) {
			
						// On calcul les gains pour l'eau chaude et le chauffage pour les solutions qui ont été confirmées
						heater_confirm *= 1-product.red_cha; 
						hotwater_confirm *= 1-product.red_ecs; 

						total_products_price_confirm += product.price.total;
						total_products_number += product.number;
						total_products_confirm++;

						switch(product.name) {
							case 'radiateur_inertie':
							case 'pac_air_air':
							case 'assechement':
							case 'hydrofuge_toiture':
							case 'centrale_eau':
							case 'volets':
							break;
							case 'condensation_hydrofuge' : 
							case 'iso_comble_hydrofuge':
							case 'ballon_thermo_hydrofuge':
								total_price_for_deduction += 2400;
							break;
							case 'iso_mur_ext':
								total_price_for_deduction += product.surface * 150;
							break;
							case 'iso_mur_int':
								total_price_for_deduction += product.surface * 100;
							break;
							default : 
								total_price_for_deduction += product.price.total;
							break; 
						}
					}
				} //end if product.checked


			});

			data.total_products_checked = total_products_checked;
			data.total_products_confirm = total_products_confirm;
		
			// ANNUAL 
			var a = data.annual; 
			a.reduction_heater_checked = heater_checked / a.heater; 
			a.reduction_heater_confirm = heater_confirm / a.heater; 

			a.reduction_hotwater_checked = hotwater_checked / a.hotwater; 
			a.reduction_hotwater_confirm = hotwater_confirm / a.hotwater; 

			a.reduction_peb_checked = (a.hotwater * (1-a.reduction_hotwater_checked) + a.heater * (1-a.reduction_heater_checked)) / (a.hotwater + a.heater)*100;
			a.reduction_peb_confirm = (a.hotwater * (1-a.reduction_hotwater_confirm) + a.heater * (1-a.reduction_heater_confirm)) / (a.hotwater + a.heater)*100;

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

			var deduction = this.computeDeduction(total_price_for_deduction);
			investment.time = Number(investment.time); 
			investment.nproducts = total_products_confirm;
			investment.nitems = total_products_number;
			investment.deduction = deduction; //déduction de l'état
			investment.price = total_products_price_confirm;
			investment.total = total_products_price_confirm - deduction - a.earnings_confirm * 0.6;

			data.investment = investment; 

			this.drawChart();

			this.updatePreference();
			this.save();

		}

		this.drawChart = function() {

			var inv_act = [];
			var inv_fut = [];
			var annual = this.data.annual; 
			var investment = this.data.investment;
			var categories = []
			var values = this.makeTabCumulus(this.coefInvestissement[this.data.energy.label],20);
	
			var domofinance2 = _.isNumber(investment.domofinance2) ? Number(investment.domofinance2) : 0;

			for (var i=0; i<values.length; i++) {
				var coef = values[i];
				inv_act.push(annual.current_solution/10 * coef);
				var val = annual.future_solution_confirm / 10 * coef + domofinance2; 
				if(i>10) val -= domofinance2;
				inv_fut.push(val);
				categories.push(2016+i);
			}

			var container = $('#container');	
			var chart = container.highcharts({
				    chart: {
				        type: 'spline',
								backgroundColor:'rgba(255, 255, 255, 0.1)',
				    },
				    title: {
				        text: '',
				    },
				    xAxis: {
				        allowDecimals: false,
								title: {
				            text: 'Années'
				        },
								categories: categories, 
				    },
				    yAxis: {
				        title: {
				            text: 'Investissement'
				        },
				    },
						tooltip: {
				        pointFormat: '{series.name} : <b>{point.y:,.0f}</b>'
				    },
				    series: [{
				        name: 'Investissement actuel',
								color : "#800",
				        data: inv_act,
								dashStyle : "Dash", 
				    }, {
				        name: 'Investissement futur',
								color : "#080",
				        data: inv_fut,
								lineWidth : 2,
				    }]
				});

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
		    
		    store.data.preference.splice(stop, 0, 
	        store.data.preference.splice(start, 1)[0]);
			store.save();
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
						deduction = store.computeDeduction(investment);
						future_payment = store.computePayment(group.products);
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

//		$('#sortable').sortable({
//		    start: function(event, ui) {
//		    	ui.item.css('background','#FC0');
//		    	ui.item.animate({
//		    		opacity: 0.25,
//		    	}, 300, function() {});
//				ui.item.data('start', ui.item.index());
//			},
//		    stop: this.classPreference,
//		});
	
	});

})();

function refresh(event) {
//   console.log('refresh'); 
   $('body').trigger("create");
//		$('#listview').listview("refresh");
	// On met le style des checkbox à jour (pcq sinon ca bug);
   $('#listview').listview().listview('refresh');
	
	// On met pause aux vidéos en cours
//	$("div[id^='popup_video_'][id$='screen'] ").each(function() {
//		var id = $(this).attr('id');
//		var outside = id===event.target.id;
//		var display = $(this).css('display');
//		if(display=='block' && outside) {
//			var myPlayer = videojs(id);
//			myPlayer.pause();
//			console.log(id, display, outside);
//		}
//	});
}

$(function() {

	$( "[data-role='header'], [data-role='footer']" ).toolbar();

	$('body').on('mouseup', function(event){
//		console.log('refresh');
	   setTimeout(function(){ refresh(event);  }, 10);
	});

   var duree = 1000;
	setInterval(function() {
		$("#clignote").animate({backgroundColor: "#F00"}, duree/2 );
		setTimeout(function() { $("#clignote").animate({backgroundColor: "#000"}, duree/2 ); },duree/2);
	},duree); 

//    $( "#sortable" ).disableSelection();

//	var container = document.querySelector('#container');
//	new Packery( container, {
//	  // options
//	  itemSelector: '.energy',
//	  gutter: 10
//	});

});
