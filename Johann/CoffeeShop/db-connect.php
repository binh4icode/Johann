<?php 
//connect to database
$conn = mysqli_connect('localhost', 'Binh','icode1234','testing');

//check connection
if(!$conn){
  echo "Connection error: " . mysqli_connect_error();
}
?>