<?php
include('header.php');
include('../conn.php');
?>

<section class="main-content">
    <div class="container pt-4">
        <div class="card card-outline card-green">
            <div class="card-header">
                <h1 class="card-title text-lg font-weight-bold">Payments</h1>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Amount Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql = "SELECT u.name, u.email, u.phone, p.price FROM `payment` AS p JOIN `users` AS u ON p.paid_user = u.id;";
                        $result = mysqli_query($conn, $sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row =  mysqli_fetch_assoc($result)) {
                        ?>
                                <tr>
                                    <td><?php echo $row['name'] ?></td>
                                    <td><?php echo $row['email'] ?></td>
                                    <td><?php echo $row['phone'] ?></td>
                                    <td>Rs. <?php echo number_format($row['price']); ?></td>
                                </tr>
                            <?php
                            }
                        } else {
                            ?>
                            <tr>
                                <td colspan="5">No Registered User uptill now</td>
                            </tr>
                        <?php
                        }
                        ?>

                        <tr>
                            <td colspan="3" class="font-weight-bold text-md">Total Amount Collected</td>
                            <td class="font-weight-bold text-md">
                                <?php
                                $sql = "SELECT SUM(price) FROM `payment`;";
                                $result = mysqli_query($conn, $sql);
                                $row = mysqli_fetch_assoc($result);
                                echo "Rs. " . number_format($row['SUM(price)']);
                                ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>