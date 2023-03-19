<?php
session_start();

if (!isset($_SESSION['user_info']))
    header('location: user_login.php');

$user_id = $_SESSION['user_info']['id'];
include('../conn.php');

$message = "";
if (isset($_POST['addProduct'])) {
    $category = $_POST['category'];
    $product_name = $_POST['pname'];
    $description = $_POST['pdesc'];
    $Quantity_type = $_POST['pquantity_type'];
    $quantity = $_POST['pquantity'];
    $price = $_POST['pprice'];
    $filename = $_FILES['pimage']['name'];
    $tempname = $_FILES['pimage']['tmp_name'];
    $folder = "../images/" . $filename;
    move_uploaded_file($tempname, $folder);


    $sql = "INSERT INTO `products` (`farmer_id`, `category`, `pname`, `pdesc`, `pquantype`, `pquan`, `pprice`, `pimage`) VALUES ('$user_id', '$category', '$product_name', '$description', '$Quantity_type', '$quantity', '$price', '$filename');";

    $result = mysqli_query($conn, $sql);

    if ($result) $message = "Product added successfully.";
    else $message = "Failed to add product.";
}
?>

<head>
    <title>Add Products</title>

    <style>
        <?php
        include('../styles/user_styles.css');
        ?>
    </style>

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>

<body>
    <div class="add-products-wrapper">
        <div class="container">
            <div class="dropdown-logo">
                <div class="logo">
                    <i class="fa fa-user"></i>
                </div>
                <div class="dropdown-content">
                    <div class="dropdown">
                        <a href="view_products.php">View Added Products</a>
                        <a href="view_blog.php">View Blogs</a>
                        <a href="logout.php">Logout</a>
                    </div>
                </div>
            </div>
            <div class="products-card" >
                <div class="heading">
                    <h2 class="title">Add Product</h2>
                </div>
                <?php if (!empty($message)) ?> <div class="msg"><?php echo $message; ?></div> <?php ?>
                <div class="form">
                    <form method="post" enctype="multipart/form-data">
                        <div class="input-group">
                            <label for="category">Select Category</label>
                            <select name="category" id="category">
                                <option value="0"> --Select-- </option>
                                <option value="grains">Crops</option>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="milk">Dairy Products</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="pname">Product Name</label>
                            <input type="text" name="pname" id="pname" class="input-group" required>
                        </div>
                        <div class="input-group">
                            <label for="pdesc">Description</label>
                            <input type="text" name="pdesc" id="pdesc" class="input-group" required>
                        </div>
                        <div class="input-group">
                            <label for="pquantity_type">Quantity Type</label>
                            <select type="number" name="pquantity_type" id="pquantity_type" class="input-group" required>
                                <option value="0"> --Select--</option>
                                <option value="dozen">Dozen</option>
                                <option value="kgs">Kilogram</option>
                                <option value="ltr">Litres</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="pquantity">Quantity</label>
                            <input type="number" name="pquantity" id="pquantity" class="input-group" required>
                        </div>
                        <div class="input-group">
                            <label for="pprice">Price</label>
                            <input type="number" name="pprice" id="pprice" class="input-group" required>
                        </div>
                        <div class="input-group">
                            <label for="pimage">Image</label>
                            <input type="file" class="nobg" name="pimage" id="pimage" required>
                        </div>
                        <div class="button">
                            <button type="submit" name="addProduct" class="add">Add Product</button>
                            <button type="reset" name="reset" class="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</body>