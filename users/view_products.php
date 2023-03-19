<?php
session_start();
include('../conn.php');

if (!isset($_SESSION['user_info']))
  header('location: user_login.php');

$user_id = $_SESSION['user_info']['id'];
?>

<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD" crossorigin="anonymous"></script>

  <style>
    <?php
    include('../styles/blog.css');
    include('../styles/bootstrap.css');
    ?>
  </style>

  <!-- Data AOS -->
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

  <title>View Added Products</title>

  <!-- Font Awesome -->
  <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>

<body>
  <div class="header">
    <div class="links">
      <span class="name"><i class="fa fa-user"></i><?php echo $_SESSION['user_info']['name']; ?></span>
      <a href="add_products.php" class="btn btn-warning">Add Products</a>
      <a href="view_products.php" class="btn btn-warning">View Added Products</a>
      <a href="logout.php" class="btn btn-warning">Logout</a>
    </div>
    <div class="create-blog">
      <a href="create_blog.php" class="btn btn-success" type="button">Create Blog</a>
    </div>
  </div>

  <div class="container text-center" data-aos="fade-up" data-aos-duration="2000">
    <div class="row">
      <?php

      $sql = "SELECT * FROM products WHERE farmer_id = $user_id";
      $result = mysqli_query($conn, $sql);

      if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while ($row = mysqli_fetch_assoc($result)) {
      ?>
          <div class="col-md-4">
            <div class="blogs">
              <div class="crdcont">
                <div class="card" style="width: 18rem">
                  <img src="../images/<?php echo $row['pimage']; ?>" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <div class="info">
                      <span>Category:</span>
                      <p class="card-title"><?php echo strtoupper(substr($row['category'], 0)); ?></p>
                    </div>

                    <div class="info">
                      <span>Name:</span>
                      <p class="heading"><?php echo $row['pname'] ?></p>
                    </div>

                    <div class="info">
                      <span>Description:</span>
                      <p class="description"><?php echo $row['pdesc'] ?></p>
                    </div>

                    <div class="info">
                      <span>Quantity:</span>
                      <p class="heading"><?php echo $row['pquan'] . " " . $row['pquantype'] ?></p>
                    </div>

                    <div class="info">
                      <span>Price:</span>
                      <p class="heading"><?php echo $row['pprice'] ?></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      <?php
        }
      } else {
        echo "0 results";
      }
      ?>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
  <script>
    AOS.init();
  </script>
</body>

</html>