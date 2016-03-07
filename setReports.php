<?php

function db_connect() {
	// définition des variables de connexion à la base de données	
	try {
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

$json = array();

$post = isset($_POST) ? $_POST : NULL;
if(is_array($post)) {
	foreach($post as $key=>$value) {
		$$key = is_string($value) ? mysql_escape_string($value) : NULL;
		$json[$key] = $value; 
	}
}

$db = db_connect();

$json['len'] = strlen($uuid);

if($action) {

	switch($action) {
		case "save" : 
			if($data && $uuid && strlen($data)>0 && strlen($uuid)>10) {
				$query = $db->prepare('SELECT * FROM reports WHERE uuid = :uuid');
				$query->execute(array(
					'uuid' => $uuid,
				));
				$count = $query->rowCount();
				$json['count'] = $count;
				$query->closeCursor();

				if ($count == 0) {
					// Ajouter 
					$query = $db->prepare('INSERT INTO reports (uuid, data) VALUES (:uuid, :data)');
					$test = $query->execute(array(
						'uuid' => $uuid,
						'data' => $data,
					));
					$json['save'] = $test;
					$query->closeCursor();
				}
				elseif ($count == 1) {
					// Mettre à jour 
					$query = $db->prepare('UPDATE reports SET data = :data WHERE uuid = :uuid');
					$test = $query->execute(array(
						'uuid' => $uuid,
						'data' => $data,
					));
					$json['update'] = $test;
					$query->closeCursor();
				}
				else {
					$json['error'] = 'Une erreure est survenue lors de la connexion.';
				}
			} else {
				$json['error'] = 'Lack information';
			}
		break;
		case "load" : 
			$query = $db->query('SELECT * FROM reports');
			$tab = $query->fetchAll( PDO::FETCH_ASSOC );
			$query->closeCursor();
			$json['reports'] = $tab;
		break; 
	}
}

echo json_encode($json);
?>
