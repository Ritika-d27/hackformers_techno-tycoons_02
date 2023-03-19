<?php
include('header.php');
include('../conn.php');
?>

<section class="main-content">
    <div class="container pt-4">
        <div class="card card-outline card-green">
            <div class="card-header">
                <h1 class="card-title text-lg font-weight-bold">All Products</h1>
            </div>
            <div class="card-body">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $sql = "SELECT * FROM `products`;";
                        $result = mysqli_query($conn, $sql);
                        if (mysqli_num_rows($result) > 0) {
                            while ($row =  mysqli_fetch_assoc($result)) {
                        ?>
                                <tr>
                                    <td class="w-50"><img src="../images/<?php echo $row['pimage'] ?>" class="w-25" alt=""></td>
                                    <td><?php echo $row['category'] ?></td>
                                    <td><?php echo $row['pname'] ?></td>
                                    <td><?php echo $row['pdesc'] ?></td>
                                    <td><?php echo $row['pquan'] . "  " . $row['pquantype']; ?></td>
                                    <td><?php echo $row['pprice'] ?></td>
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>