<?php
include('../conn.php');
session_start();
if (!isset($_SESSION['user_info']))
  header('location: user_login.php');

$user_id = $_SESSION['user_info']['id'];

$message = "";

if (isset($_POST['post'])) {
  $title = $_POST['title'];
  $heading = $_POST['heading'];
  $content = $_POST['content'];
  $date = $_POST['date'];
  $filename = $_FILES['bimage']['name'];
  $tempname = $_FILES['bimage']['tmp_name'];
  $folder = "../images/" . $filename;
  move_uploaded_file($tempname, $folder);

  $sql = "INSERT INTO `blogs` (`farmer_id`, `title`, `heading`, `content`, `date`, `image`) VALUES ('$user_id', '$title', '$heading', '$content', '$date', '$filename');";

  $result = mysqli_query($conn, $sql);

  if ($result) $message = "Blog created successfully.";
  else $message = "Failed to create the blog.";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Create Blog</title>

  <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>

  <style>
    <?php include('../styles/blog.css');
    include('../styles/bootstrap.css'); ?>
  </style>

  <!-- Data AOS -->
  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

</head>

<body>
  <div class="blog-wrapper">
    <div class="header">
      <div class="links">
        <span class="name"><i class="fa fa-user"></i><?php echo $_SESSION['user_info']['name']; ?></span>
        <a href="add_products.php" class="btn btn-warning">Add Products</a>
        <a href="view_products.php" class="btn btn-warning">View Added Products</a>
        <a href="logout.php" class="btn btn-warning">Logout</a>
      </div>
      <div class="create-blog">
        <a href="view_blog.php" class="btn btn-success" type="button">View Blog</a>
      </div>
    </div>

    <div class="container" data-aos="fade-up" data-aos-duration="2000">
      <div class="heading">
        <h2>Create Blog for Post</h2>
      </div>
      <?php if (!empty($message)) ?> <div class="msg" style="text-align:center; font-weight:500; font-size: 1.1vw"><?php echo $message; ?></div> <?php ?>
      <form method="post" enctype="multipart/form-data">
        <div class="input-group">
          <input type="text" id="title" class="input" name="title" required />
          <label for="title" class="yes">Title</label>
        </div>
        <div class="input-group">
          <input type="text" id="heading" class="input" name="heading" required />
          <label for="heading" class="yes">Heading</label>
        </div>
        <div class="input-group">
          <input type="text" id="content" class="input content" name="content" required />
          <label for="content" class="yes">Content</label>
        </div>
        <div class="input-group date">
          <label for="date">Post Date</label>
          <input type="date" name="date" id="date" />
        </div>
        <div class="input-group date">
          <label for="bimage">Image:</label>
          <input type="file" name="bimage" id="bimage" />
        </div>
        <div class="buttons">
          <button type="submit" class="btn btn-submit" name="post">Post</button>
          <button type="reset" class="btn btn-reset">Reset</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Scripts -->
  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>