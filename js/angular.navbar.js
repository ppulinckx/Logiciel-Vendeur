angular.module('myApp', ['html']);

angular.module('myApp').run(function($window, $rootScope) {
  
	$rootScope.online = navigator.onLine;
	$window.addEventListener("offline", function () {
	$rootScope.$apply(function() {
	 	 $rootScope.online = false;
	});
	}, false);
	$window.addEventListener("online", function () {
	$rootScope.$apply(function() {
	  	$rootScope.online = true;
	});
	}, false);

});

angular.module('myApp').controller('navbar', function ($scope, $http) {

	$scope.$watch('online', function(newStatus) {
		
	});

	$scope.$watch('offline', function(newStatus) { 
	});

	$scope.authentification = function () {
		$scope.connected = false; 

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
				$("#login").html("Connexion accepted.");
				localStorage.setItem('token', html.token); 
				localStorage.setItem('time', html.time); 
				localStorage.setItem('user_id', html.user_id); 
				localStorage.setItem('username', html.username); 
				localStorage.setItem('group', html.token); 

				$scope.username = html.username;
				$scope.token = html.token; 
				$scope.connected = true; 

				loadURL('_index.html');
			}
			else{
				$("#login").html(html.error);
				setTimeout(function(){ $("#login").html("Log in."); },3000);
			}
        }).error(function(error){
            $("#login").html("Request aborted.");
        });

	}

	$scope.disconnect = function() {
		localStorage.setItem('username', undefined);
		localStorage.setItem('time', undefined);
		localStorage.setItem('token', undefined);
		$scope.connected = false; 
		loadURL('_login.html');
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
				}
			} else {
				console.log("Votre token est expiré."); 
			}
		} else {	
			if($scope.online) { // Si on a accès à internet
				loadURL('_login.html');
			} else { // Si on a pas internet
				console.log("Vous devez être connecté à internet pour renouveller votre accès au logiciel"); 
			}
		}

		console.log($scope.connected); 
		console.log($scope.username); 

	}

});
