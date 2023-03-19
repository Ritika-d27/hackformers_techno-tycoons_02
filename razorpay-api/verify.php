<?php
include('../conn.php');
require('config.php');

session_start();
$uid = $_SESSION['user_info']['id'];

require('razorpay-php/Razorpay.php');

use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

$success = true;

$error = "Payment Failed";

if (empty($_POST['razorpay_payment_id']) === false) {
    $api = new Api($keyId, $keySecret);

    try {
        // Please note that the razorpay order ID must
        // come from a trusted source (session here, but
        // could be database or something else)
        $attributes = array(
            'razorpay_order_id' => $_SESSION['razorpay_order_id'],
            'razorpay_payment_id' => $_POST['razorpay_payment_id'],
            'razorpay_signature' => $_POST['razorpay_signature']
        );
        $_SESSION['pay'] = $_POST['razorpay_payment_id'];

        $api->utility->verifyPaymentSignature($attributes);
    } catch (SignatureVerificationError $e) {
        $success = false;
        $error = 'Razorpay Error : ' . $e->getMessage();
    }
}

if ($success) {
    $sql1 = "SELECT SUM(price) FROM `cart` WHERE uid = '$uid';";

    $res = mysqli_query($conn, $sql1);
    $row1 = mysqli_fetch_assoc($res);
    $price = $row1['SUM(price)'];
    $payment_id = $_SESSION['pay'];

    $sql = "INSERT INTO `payment` (`paid_user`, `price`, `payment_id`) VALUES ('$uid', '$price', '$payment_id');";

    $result = mysqli_query($conn, $sql);
    if ($result) {

        $sql3 = "DELETE FROM `cart` WHERE uid = '$uid';";
        mysqli_query($conn, $sql3);
?>
        <script>
            alert("Paid Successfully. ");
            window.open('../users/customer_dash.php', '_self');
        </script>
    <?php
    }
} else {
    ?>
    <h1>Payment Failed</h1>
<?php
}
