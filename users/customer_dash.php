<?php
include('../conn.php');
session_start();
if (!isset($_SESSION['user_info']))
    header('location: user_login.php');

$name = $_SESSION['user_info']['name'];
$uid = $_SESSION['user_info']['id'];

$message = "";
if (isset($_POST['add'])) {
    $pid = $_POST['pid'];
    $quantity = $_POST['quantity'];
    $quantype = $_POST['quantype'];

    $sql = "SELECT pprice, pquan FROM `products` WHERE id = '$pid';";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    $total_price = $row['pprice'];
    $total_quan = $row['pquan'];

    $price = ($total_price * $quantity) / $total_quan;
    $sql1 = "INSERT INTO `cart` (`pid`, `uid`, `quantity`, `quantype`, `price`) VALUES ('$pid', '$uid', '$quantity', '$quantype', '$price');";
    $result1 = mysqli_query($conn, $sql1);
    if ($result1) $message = "Product added to cart.";
    else $message = "Failed to add product.";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customer Dashboard</title>

    <!-- Styles -->
    <style>
        <?php include('../styles/customer_dash.css'); ?>
    </style>

    <!-- Data AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>

<body>

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
                    <li class="nav-list-item"><a href="logout.php">Logout</a></li>
                </ul>
                <div class="cart">
                    <span>Welcome,</span>
                    <h2><?php echo $name; ?></h2>
                </div>
            </nav>
        </div>

        <div class="container">
            <div class="products" data-aos="fade-up" data-aos-duration="2000">
                <div class="heading">
                    <h2 class="title">All <span>Products</span></h2>
                    <select name="order" id="oder">
                        <option value="0">--Select--</option>
                        <option value="price">Sort By Price</option>
                        <option value="quantity">Sort By Quantity</option>
                    </select>
                </div>
                <?php
                if (!empty($message)) {
                ?>
                    <div class="message"><?php echo $message; ?></div>
                <?php
                }
                ?>
                <div class="products-cont">
                    <div class="row">
                        <?php
                        $sql = "SELECT * FROM products ORDER BY ID ASC;";
                        $result = mysqli_query($conn, $sql);

                        if (mysqli_num_rows($result) > 0) {
                            while ($row = mysqli_fetch_assoc($result)) {
                        ?>
                                <div class="col-md-3">
                                    <div class="image">
                                        <img src="../images/<?php echo $row['pimage']; ?>" alt="">
                                    </div>
                                    <div class="content">
                                        <div class="pname">
                                            <?php echo $row['pname']; ?>
                                        </div>
                                        <div class="group">
                                            <p>Category: </p>
                                            <span><?php echo strtoupper(substr($row['category'], 0)) ?></span>
                                        </div>
                                        <div class="group">
                                            <p>Description: </p>
                                            <span><?php echo $row['pdesc']; ?></span>
                                        </div>
                                        <div class="group">
                                            <p>Quantity: </p>
                                            <span><?php echo $row['pquan'] . "  " . $row['pquantype']; ?></span>
                                        </div>
                                        <div class="group">
                                            <p>Available Price: </p>
                                            <span>Rs. <?php echo number_format($row['pprice']); ?></span>
                                        </div>
                                    </div>
                                    <div class="buttons">
                                        <button type="button" class="buyBtn">Buy Now</button>
                                        <a href="customer_dash.php?card_id=<?php echo $row['id']; ?>" type="button" class="cartBtn">Add to Cart</a>
                                    </div>
                                </div>
                        <?php
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="modal">
            <?php
            if (isset($_GET['card_id'])) {
                $card_id = $_GET['card_id'];
            ?>
                <script>
                    document.getElementById('modal').style.display = "block";
                </script>
            <?php
            }
            ?>
            <div class="modal-card">
                <div class="modal-header">
                    <h2>Cart Details</h2>
                    <i class="fa fa-xmark" onclick="closeModal()"></i>
                </div>
                <div class="modal-body">
                    <form action="customer_dash.php" method="post">
                        <?php
                        $sql = "SELECT * FROM `products` WHERE id = '$card_id';";
                        $result = mysqli_query($conn, $sql);
                        $row = mysqli_fetch_assoc($result);
                        ?>
                        <input type="hidden" name="pid" value="<?php echo $row['id']; ?>">
                        <div class="input-group">
                            <label for="quantity">Quantity</label>
                            <input type="number" name="quantity" class="input" value="<?php echo $quan = $row['pquan']; ?>" min="1" max="<?php echo $row['pquan']; ?>" required>
                        </div>
                        <div class="input-group">
                            <label for="quan-type">Quantity Type</label>
                            <input type="text" name="quantype" class="input" value="<?php echo $row['pquantype']; ?>" readonly>
                        </div>
                        <button type="submit" name="add">Add</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        var nav = document.getElementById('navbar');
        window.onscroll = () => {
            if (window.scrollY >= 10)
                nav.classList.add('sticky');
            else
                nav.classList.remove('sticky');
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }
    </script>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>

</body>

</html>