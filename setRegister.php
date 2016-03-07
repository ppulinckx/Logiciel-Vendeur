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

$db = db_connect();
$json = array();

// REGISTRATION

$regex_mail='#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$#'; 
$regex_username='/^[a-zA-Z0-9_-]{5,16}$/';
$regex_pass='/[0-9a-zA-Z_=+.#@&]{4,}/';

$insert = $db->prepare('INSERT INTO users (username, password, email, name, time) VALUES (:username, :password, :email, :name, :time)');

if(!$name) $json['error'] = 'no fullname'; 
elseif(strlen($name)<5) $json['error'] = 'fullname too small'; 
elseif(!$username) $json['error'] = 'no username'; 
elseif(strlen($username)<5) $json['error'] = 'username too small'; 
elseif(strlen($username)>16) $json['error'] = 'username too big'; 
elseif(!preg_match($regex_username, $username)) $json['error'] = 'username not valid'; 
elseif($email !== $confirm_email) $json['error'] = 'email not match'; 
elseif(!preg_match($regex_mail, $email)) $json['error'] = 'email not valid'; 
elseif($password !== $confirm_password) $json['error'] = 'password not match'; 
elseif(!preg_match($regex_pass, $password)) $json['error'] = 'password not valid'; 
else {

	$query = $db->prepare('SELECT * FROM users WHERE email = :email');
	$query->execute(array(
		'email' => $email,
	));
	$count_email = $query->rowCount();
	$query->closeCursor();

	$query = $db->prepare('SELECT * FROM users WHERE username = :username');
	$query->execute(array(
		'username' => $username,
	));
	$count_username = $query->rowCount();
	$query->closeCursor();

	if($count_email>0) $json['error'] = 'email already used'; 
	elseif($count_username>0) $json['error'] = 'username already used'; 
	else {
		$test = $insert->execute(array(
			'username' => $username, 
			'password' => hash('sha1', $password),
			'email' => $email,
			'name' => $name, 
			'time' => time(), 
		));
		$json['success'] = $test;
		$insert->closeCursor();
	}

}
echo json_encode($json);
?>
