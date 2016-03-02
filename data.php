<?php
// header('Access-Control-Allow-Origin:*');
try
{
  $bdd = new PDO('mysql:host=localhost;dbname=CV;charset=utf8', 'root', 'root');

} catch ( Exception $e ){
  die('Erreur : '.$e->getMessage() );
}

$data=[];
$projects=[];
$studies=[];
$experiences=[];
$profil = [];

$req="SELECT * FROM  `profil`";
$res = $bdd->query($req);
$description = $res->fetch();
$desc=[
  "description"=>$description["description"]
];
array_push($profil,$desc);
array_push($data,$profil);
$res->closeCursor();


$req="SELECT * FROM  `projects`";
$res = $bdd->query($req);
while( $pr = $res->fetch()){
  $project=[
    "id"=>$pr["ID"],
    "date"=>$pr["Date"],
    "title"=>$pr["Title"],
    "type"=>$pr["Type"]
  ];
  array_push($projects,$project);
};

array_push($data,$projects);
$res->closeCursor();

$req="SELECT * FROM  `study`";
$res = $bdd->query($req);
while( $study = $res->fetch()){
  $study=[
    "id"=>$study["ID"],
    "date"=>$study["Date"],
    "title"=>$study["Title"],
    "place"=>$study["Place"]
  ];
  array_push($studies,$study);
};
array_push($data,$studies);

$res->closeCursor();

$req="SELECT * FROM  `experiences`";
$res = $bdd->query($req);
while( $exp = $res->fetch()){
  $exp=[
    "id"=>$exp["ID"],
    "date"=>$exp["Date"],
    "job"=>$exp["Job"],
    "place"=>$exp["Place"],
    "city"=>$exp["City"]
  ];
  array_push($experiences,$exp);
};
array_push($data,$experiences);

$res->closeCursor();

echo json_encode($data);
?>
