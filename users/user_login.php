<?php
include('../conn.php');

$statusmsg = "";
if (isset($_POST['submit_login'])) {
    $email = $_POST['email'];
    $pass = $_POST['pass'];
    $user_type = $_POST['type'];
    echo $user_type, $email;

    if (!empty($email) and !empty($pass) and !empty($user_type)) {

        $sql = "SELECT * FROM `users` WHERE type = '$user_type' AND email = '$email';";
        $result = mysqli_query($conn, $sql);

        if (mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            if (password_verify($pass, $row['password'])) {
                $statusmsg = "Successfully LoggedIn";

                if (isset($_SESSION['user-info'])) session_destroy();

                session_start();
                $_SESSION['user_info'] = $row;

                if ($row['type'] == "customer") header('location: customer_dash.php');
                else if ($row['type'] == "farmer") header('location: add_products.php');
            } else
                $statusmsg = "Incorrect Password";
        } else $statusmsg = "User do not exists with the entered type.";
    } else $statusmsg = "Please fill all the fields";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>

    <title>Login - Agriculture Ecommerce</title>

    <style>
        <?php include('../styles/user_styles.css'); ?>
    </style>

    <!-- Data AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</head>

<body>
    <div class="wrapper">
        <section class="container">
            <div class="card" data-aos="fade-up" data-aos-duration="2000">
                <div class="top">
                    <div class="icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                </div>
                <div class="auth-form">
                    <h2 class="title">User Login</h2>
                    <?php
                    if (!empty($statusmsg))
                    ?>
                    <div class="message" id="message"><?php echo $statusmsg; ?></div>
                    <?php
                    ?>

                    <form method="post" action="user_login.php">
                        <div class="input-group-select">
                            <select name="type" id="type">
                                <option value="0">--User Type--</option>
                                <option value="farmer">Farmer</option>
                                <option value="customer">Customer</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="email" class="label"><i class="fa-solid fa-envelope"></i></label>
                            <input type="text" name="email" id="email" class="input" placeholder="Email Address" required>
                        </div>
                        <div class="input-group">
                            <label for="pass" class="label"><i class="fa-solid fa-lock"></i></label>
                            <input type="password" name="pass" id="pass" class="input" placeholder="Password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}" title="Password should contain atleast one lowercase letter, one uppercase letter, one digit, one special character with minimum length is 8" required>
                        </div>
                        <div class="rem">
                            <div>
                                <input type="checkbox" id="rem" class="check"><label for="rem" class="check-label">Remember Me</label>
                            </div>
                            <button type="button" id="forgot-btn" class="forget-btn">Forgot Password?</button>
                        </div>
                        <div class="button">
                            <button type="submit" name="submit_login" class="submit-btn">Login</button>
                            <a href="user_register.php">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- <div class="forgot-modal">
            <div class="forgot-modal-card">
                <div class="modal-header">
                    <h2 class="modal-title">Reset Link</h2>
                    <i class="fa-solid fa-xmark" id="closeModal"></i>
                </div>
                <div class="modal-body">
                    <form action="forgetPassword.php" method="post">
                        <input type="email" name="r_email" id="r_email" placeholder="Enter Email Address" required>
                        <button type="submit" class="resetBtn" name="resetPassword">Send Link</button>
                    </form>
                </div>
            </div>
        </div> -->
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>