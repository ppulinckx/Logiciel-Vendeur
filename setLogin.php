<?php

function db_connect() {
	// définition des variables de connexion à la base de données	
	try {
		$pdo_options = array();
		$pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
		// INFORMATIONS DE CONNEXION
		$host = 	'wappyberbilink.mysql.db';
		$dbname = 	'wappyberbilink';
		$user = 	'wappyberbilink';
		$password = 	'w4p1T1L0L';

#		$host = 	'conseilh222.mysql.db';
#		$dbname = 	'conseilh222';
#		$user = 	'conseilh222';
#		$password = 	'r4Vu4jDaCm';
		// FIN DES DONNEES
		
		$db = new PDO('mysql:host='.$host.';dbname='.$dbname.'', $user, $password, $pdo_options);
		return $db;
	} catch (Exception $e) {
		die('Erreur de connexion : ' . $e->getMessage());
	}
}

$post = isset($_POST) ? $_POST : NULL;
if(is_array($post)) {
	foreach($post as $key=>$value) {
		$$key = is_string($value) ? mysql_escape_string($value) : NULL;
	}
}

$email = $_POST['email'];
$password = $_POST['password'];

$db = db_connect();
$json = array();

$json['pass'] = $password;
$password = hash('sha1',mysql_escape_string($password));
$json['password'] = $password;
$json['email'] = $email;
// LOGIN
if(is_object($db)) {
	if($email && $password && strlen($email)>0 && strlen($password)>6) {

		$query = $db->prepare('SELECT * FROM users WHERE email = :email');
		$query->execute(array(
			'email' => $email,
		));
		$data = $query->fetch();
		$checkuser = $query->rowCount();
		$query->closeCursor();
	
		$json['checkuser'] = $checkuser;

		$query = $db->prepare('SELECT * FROM users WHERE email = :email AND password = :password');
		$query->execute(array(
			'email' => $email,
			'password' => $password,
		));
		$data = $query->fetch();
		$count = $query->rowCount();
		$query->closeCursor();
	
		$json['count'] = $count;

		if($checkuser == 1) {
			if ($count == 0) {
				$json['error'] = "Mauvais mot de passe.";
			}
			elseif ($count == 1) {
				$json['success'] = "Connexion reussie.";
				$json['user_id'] = $data['id'];
				$json['username'] = $data['username'];
				$json['group'] = $data['group'];
				$json['time'] = time() + 60*60*48*1;
				$json['token'] = hash('sha1', 'iPx5m'.$json['username'].'F2_dRx'.$json['time'].'Okoi32x');
			}
			else {
				$json['error'] = 'Une erreure est survenue lors de la connexion.';
			}
		} else {
			$json['error'] = "Pas de compte pour ce username.";
		}
	}
	else {
		$json['error'] = 'Lack information';
	}
} else {
	$json['error'] = 'Connexion to MYSQL database failed';
}
echo json_encode($json);
?>
