<?php
include('conn.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Agricultural Ecommerce</title>

    <style>
        <?php
        include('styles/index.css');
        ?>
    </style>

    <!-- Data AOS -->
    <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/6ccdd39db5.js" crossorigin="anonymous"></script>
</head>

<body>

    <div class="home-wrapper">

        <!-- Front Wrapper -->
        <div class="front-wrapper" data-aos="fade" data-aos-duration="2000">
            <?php include('header.php'); ?>

            <!-- Content Section -->
            <div class="container">
                <div class="main-content">
                    <h2 class="head-title">
                        Agriculture With a new skill.
                    </h2>
                    <p class="text">
                        Agriculture is one of the major sectors of the Indian economy, and the country. It has been present in the country for thousands of years.
                    </p>
                </div>
            </div>
        </div>

        <!-- About Us section -->
        <!-- About Us Section -->
        <section id="about">
            <div class="container">
                <div class="about-content" data-aos="fade-up" data-aos-duration="2000">
                    <div class="about-header">
                        <h2 class="title">About <span>Us</span></h2>
                    </div>
                    <div class="about-content-mid">
                        <div class="float">
                            <div class="content-in-box">
                                <p class="content-in">The Organica Organic Shopify Theme is a beautifully designed template that is perfect for businesses that specialize in selling organic products such as cosmetics, food, and nutritional drinks.</p>
                            </div>
                        </div>
                        <div class="text">
                            The theme is fully responsive and optimized for all devices, ensuring that your store looks great on desktop, tablet, and mobile.
                            One of the standout features of the theme is its use of green as the main color, with a white background and black text. This color scheme gives the theme a fresh and clean look that is perfect for an organic brand. The theme also includes a Daily Deal module that allows you to highlight discounted products with a countdown timer, making it easy for customers to quickly find the best deals.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Importance -->
        <section id="importance">
            <div class="container">
                <div class="importance-card" data-aos="fade-up" data-aos-duration="2500">
                    <div class="content">
                        <div class="head">
                            <h2 class="title">
                                Importance of Agriculture
                            </h2>
                        </div>
                        <p>Agriculture is the practice of cultivating natural resources to sustain human life and provide economic gain. It combines the creativity, imagination, and skill involved in planting crops and raising animals with modern production methods and new technologies.</p>

                        <p>Agriculture is also a business that provides the global economy with commodities: basic goods used in commerce, such as grain, livestock, dairy, fiber, and raw materials for fuel. For example, fiber is a top crop in U.S. agricultural production, according to The Balance Small Business, and a necessary commodity for the clothing sector.</p>

                        <p>Agriculture offers an opportunity to improve the lives of millions of food-insecure people and help countries develop economies that create jobs and raise incomes. Today’s agriculture also impacts future generations. To ensure the long-term success of the global agricultural sector, building a more sustainable economic system aligned with the U.N.’s Sustainable Development Goals is a crucial imperative to help create a more equitable society.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="copyright">Copyright &copy; Hackathon</div>
        </footer>
    </div>

    <!-- Scripts -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
    <script>
        AOS.init();
    </script>
</body>

</html>