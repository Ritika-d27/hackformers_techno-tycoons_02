<?php
include('../conn.php');
session_start();
if (!isset($_SESSION['user_info']))
    header('location: user_login.php');

$name = $_SESSION['user_info']['name'];
$uid = $_SESSION['user_info']['id'];
?>

<head>
    <style>
        <?php include('../styles/customer_dash.css'); ?>
    </style>

    <!-- Data AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>


<div class="wrapper">

    <div class="header" id="navbar">
        <nav class="navbar">
            <div class="logo">
                <img src="https://media.istockphoto.com/id/1254633533/vector/agriculture-logo-icon-sign-or-symbol-leaf-farm-nature-ecology.jpg?s=612x612&w=0&k=20&c=zBBvYEnW3LmqX5C-QcvYtNr9z9WuE5p8y5K63ERspfE=" alt="logo">
            </div>
            <ul class="lists">
                <li class="nav-list-item"><a href="../index.php">Home</a></li>
                <li class="nav-list-item">
                    <?php
                    $sql = "SELECT COUNT(id) FROM `cart` WHERE uid = '$uid';";
                    $result = mysqli_query($conn, $sql);
                    $row = mysqli_fetch_assoc($result);
                    $count = $row['COUNT(id)'];
                    ?>
                    <span><?php echo $count; ?></span>
                    <a href="mycart.php">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                </li>
                <li class="nav-list-item"><a href="users/user_login.php">Logout</a></li>
            </ul>
            <div class="cart">
                <span>Welcome,</span>
                <h2><?php echo $name; ?></h2>
            </div>
        </nav>
    </div>
    <!-- Title -->
    <div class="cart-container" data-aos="fade-up" data-aos-duration="2000">
        <div class="title">
            Shopping Cart
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Sr.No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <?php
                $sql = "SELECT c.quantity, c.quantype, c.price, p.pname, p.pdesc, p.pimage FROM `cart` AS c JOIN `products` AS p ON c.pid = p.id WHERE c.uid = '$uid';";

                $result = mysqli_query($conn, $sql);
                if (mysqli_num_rows($result) > 0) {
                    $i = 0;
                    while ($row = mysqli_fetch_assoc($result)) {
                ?>
                        <tr>

                            <td><?php echo ++$i . '.'; ?></td>
                            <td class="img"><img src="../images/<?php echo $row['pimage']; ?>" alt="image"></td>
                            <td><?php echo $row['pname']; ?></td>
                            <td><?php echo $row['pdesc']; ?></td>
                            <td><?php echo $row['quantity'] . " " . $row['quantype']; ?></td>
                            <td>Rs. <?php echo number_format($row['price']); ?></td>
                        </tr>
                    <?php
                    }
                } else {
                    ?>
                    <tr>
                        <td colspan="6">No products added to your cart.</td>
                    </tr>
                <?php
                }

                ?>

                <tr class="total">
                    <?php
                    $sql = "SELECT SUM(price) FROM `cart` WHERE uid = '$uid';";

                    $result = mysqli_query($conn, $sql);
                    $row = mysqli_fetch_assoc($result);
                    ?>
                    <td colspan="5">Total Price</td>
                    <td>Rs. <?php echo $total_price = $row['SUM(price)']; ?></td>
                </tr>
            </tbody>
        </table>

        <form action="" method="post">
            <div class="button">
                <button type="submit" name="pay" class="checkoutBtn">Checkout</button>
            </div>
        </form>

        <?php
        if (isset($_POST['pay'])) {
            echo "<script type='text/javascript'> document.location = '../razorpay-api/pay.php'; </script>";
        }
        ?>
    </div>
</div>

<!-- Scripts -->
<script src="https://unpkg.com/aos@next/dist/aos.js"></script>
<script>
    AOS.init();
</script>