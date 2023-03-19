<?php
include('header.php');
include('../conn.php');
?>

<head>
    <title>Admin Dashboard</title>

    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>

<div class="container-fluid pt-3">
    <div class="row w-75 mx-auto">
        <div class="col-md-6">
            <div class="small-box bg-success">
                <div class="inner">
                    <h2 class="font-weight-bold">
                        <?php
                        $sql = "SELECT * FROM `users` WHERE type = 'farmer';";
                        $res = mysqli_query($conn, $sql);
                        echo mysqli_num_rows($res);
                        ?>
                    </h2>
                    <p class="text-lg">Total Farmers</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-users"></i>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="small-box bg-warning">
                <div class="inner">
                    <h2 class="font-weight-bold">
                        <?php
                        $sql = "SELECT * FROM `users` WHERE type = 'customer';";
                        $res = mysqli_query($conn, $sql);
                        echo mysqli_num_rows($res);
                        ?>
                    </h2>
                    <p class="text-lg">Total Customers</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-users"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row w-75 mt-4 mx-auto">
        <div class="col-md-6">
            <div class="small-box bg-primary">
                <div class="inner">
                    <h2 class="font-weight-bold">
                        <?php
                        $sql = "SELECT * FROM `products`;";
                        $res = mysqli_query($conn, $sql);
                        echo mysqli_num_rows($res);
                        ?>
                    </h2>
                    <p class="text-lg">Total Products</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-hand-holding"></i>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="small-box bg-info">
                <div class="inner">
                    <h2 class="font-weight-bold">
                        <?php
                        $sql = "SELECT COUNT(id) FROM `payment`";
                        $res = mysqli_query($conn, $sql);
                        $row = mysqli_fetch_assoc($res);
                        echo $row['COUNT(id)']
                        ?>
                    </h2>
                    <p class="text-lg">Total Payments</p>
                </div>
                <div class="icon">
                    <i class="fa-solid fa-hand-holding-medical"></i>
                </div>
            </div>
        </div>
    </div>

</div>