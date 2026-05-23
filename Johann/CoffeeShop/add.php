<?php
    
//connect to database
include("./db-connect.php");

//create variables
    $name = null;
    $phone = null;
    $email = null;
    $order = null;

//check if data is sent to us
    if(isset($_POST['submit'])){
        $name =  mysqli_real_escape_string($conn,$_POST['name']);   
        $email = mysqli_real_escape_string($conn,$_POST['email']);
        $phone = mysqli_real_escape_string($conn,$_POST['number']);
        $order = mysqli_real_escape_string($conn,$_POST['order']);
    }

//create SQL insert query
$sql = "INSERT INTO customer_info(name, email, phone, items) VALUES('$name', '$email', '$phone', '$order')";

//checking for null values and sending data
if($name != null && $email != null && $phone != null && $order != null){
   mysqli_query($conn,$sql);
   header('Location: index.php');
}

?>


<!DOCTYPE html>
<html lang="en">

    <?php include('templates/header.php');?>

    <section class="container grey-text">
        <h4 class="center">Coffee Order Form</h4>
        <form action="add.php" class="white" method="POST">
            <label>Name:</label>
            <input type="text" name="name">
            <label>Email:</label>
            <input type="text" name="email">
            <label>Phone Number:</label>
            <input type="text" name="number">
            <label>Order:</label>
            <input type="text" name="order">
            <div class="center">
                <input type="submit" name="submit" value="submit" class="btn brand z-depth-0">
            </div>
        </form>
    </section>

    <?php include('templates/footer.php');?>
    
</body>
</html>