<?php
include('../conn.php');

$statusmsg = "";

if (isset($_POST['submit'])) {
    $type = $_POST['type'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    $pass = $_POST['pass'];
    $cpass = $_POST['cpass'];

    $sql = "SELECT email FROM `users` WHERE email = '$email';";
    $resullt = mysqli_query($conn, $sql);

    if (mysqli_num_rows($resullt) == 0) {
        if ($pass == $cpass) {

            $hash = password_hash($pass, PASSWORD_DEFAULT);

            $sql = "INSERT INTO `users` (`type`, `name`, `email`, `phone`, `address`, `password`, `created_on`) VALUES ('$type', '$name', '$email', '$phone', '$address', '$hash', current_timestamp());";

            $resullt = mysqli_query($conn, $sql);
            if ($resullt) $statusmsg = "Registered Successfully.";
            else $statusmsg = "Failed to register.";
        } else $statusmsg = "Mismatched Password. Enter correctly.";
    } else $statusmsg = "User already exists. Please try with some other email";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="./style/user_style.css">
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>

    <title>Register - Agriculture Ecommerce</title>

    <style>
        <?php include('../styles/user_styles.css'); ?>
    </style>

    <!-- Data AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
</head>

<body>
    <div class="wrapper" data-aos="fade" data-aos-duration="2000">
        <section class="container">
            <div class="card reg-card" data-aos="fade-up" data-aos-duration="2000">
                <div class="top">
                    <div class="icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                </div>
                <div class="auth-form">
                    <h2 class="title">User Register</h2>
                    <?php
                    if (!empty($statusmsg)) {
                    ?>
                        <div class="message"><?php echo $statusmsg; ?></div>
                    <?php
                    }
                    ?>
                    <form method="post" action="user_register.php">
                        <div class="input-group-select">
                            <select name="type" id="type" required>
                                <option value="0">--User Type--</option>
                                <option value="customer">Customer</option>
                                <option value="farmer">Farmer</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label for="name" class="label"><i class="fa-solid fa-signature"></i></label>
                            <input type="text" name="name" id="name" class="input" placeholder="Name" required>
                        </div>
                        <div class="input-group">
                            <label for="email" class="label"><i class="fa-solid fa-envelope"></i></label>
                            <input type="text" name="email" id="email" class="input" placeholder="Email Address" required>
                        </div>
                        <div class="input-group">
                            <label for="phone" class="label"><i class="fa-solid fa-phone"></i></label>
                            <input type="phone" name="phone" id="phone" class="input" placeholder="Phone No" required>
                        </div>
                        <div class="input-group">
                            <label for="address" class="label"><i class="fa-sharp fa-solid fa-location-dot"></i></label>
                            <input type="address" name="address" id="address" class="input" placeholder="Address" required>
                        </div>
                        <div class="input-group">
                            <label for="pass" class="label"><i class="fa-solid fa-lock"></i></label>
                            <input type="password" name="pass" id="pass" class="input" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}" title="Password should contain atleast one lowercase letter, one uppercase letter, one digit, one special character with minimum length is 8" placeholder="Password" required>
                        </div>
                        <div class="input-group">
                            <label for="cpass" class="label"><i class="fa-solid fa-lock"></i></label>
                            <input type="password" name="cpass" id="cpass" class="input" placeholder="Confirm Password" required>
                        </div>
                        <div class="button">
                            <button type="submit" name="submit" class="submit-btn">Register</button>
                            <a href="user_login.php">Log In</a>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>

    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();

        var msg = document.getElementById('message');
        const func = (m) => msg.innerHTML = m;

        <?php
        if (isset($_POST['submit'])) {
            $user_type = $_POST['type'];
            $name = $_POST['name'];
            $phone = $_POST['phone'];
            $email = $_POST['email'];
            $addr = $_POST['address'];
            $password = $_POST['cpass'];

            if (!empty($user_type) and !empty($email) and !empty($password) and !empty($name)) {
                $sql = "SELECT * FROM `users2` WHERE email = '$email' AND type = '$user_type'";
                $result = mysqli_query($conn, $sql);

                if (mysqli_num_rows($result) > 0) {
        ?>
                    func('User already exists! Register with another user');
                    <?php
                } else {
                    if ($password != $confirm) {
                    ?>
                        func('Password and Confirm Password do not match');
                        <?php
                    } else {
                        $hash = password_hash($password, PASSWORD_DEFAULT);
                        $sql = "INSERT INTO `users2` (`type`, `name`, `phone`, `email`, `address`,`password`, `create_on`) VALUES ('$user_type', '$name', '$phone', '$email', '$addr,'$hash', current_timestamp());";
                        $resullt = mysqli_query($conn, $sql);
                        if ($resullt) {
                        ?>
                            func('Successfully Registered!');
                        <?php
                        } else {
                        ?>
                            func('Error in registering!');
                <?php
                        }
                    }
                }
            } else {
                ?>
                func("Please fill all the fields");
        <?php
            }
        }

        ?>
    </script>
</body>

</html>