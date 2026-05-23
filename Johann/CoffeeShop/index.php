<?php
    //connect to database
    include('./db-connect.php');

    //write query for coffee orders
    $sql = 'SELECT name, phone, email, items FROM coffeeshop';

    //make query and get results
    $result = mysqli_query($conn,$sql);

    //fetch the result as an associative array
    $orders = mysqli_fetch_all($result,MYSQLI_ASSOC);

    //free result from memory
    mysqli_free_result($result);

    //close connection
    mysqli_close($conn);

?>

<!DOCTYPE html>
<html lang="en">

    <?php include('templates/header.php');?>

    <h4 class="center grey-text">Coffee Orders!</h4>
    <div class="container">
        <div class="row">

            <?php foreach($orders as $order){ ?>

            <div class="col s6 md3">
                <div class="card z-depth-0">
                    <div class="card-content center">
                        <h6><?php echo htmlspecialchars($order['name']); ?></h6>
                        <ul>
                            <?php foreach(explode(',',$order['items']) as $item){ ?>
                                <li><?php echo htmlspecialchars($item); ?></li>
                            <?php } ?>
                        </ul>
                    </div>
                </div>
            </div>

            <?php  } ?>

        </div>
    </div>

    <?php include('templates/footer.php');?>

</body>
</html>