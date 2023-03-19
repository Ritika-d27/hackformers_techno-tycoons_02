<head>
    <style>
        <?php include('../styles/index.css'); ?>
    </style>
</head>

<body>
    <header class="header" id="navbar">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <img src="https://media.istockphoto.com/id/1254633533/vector/agriculture-logo-icon-sign-or-symbol-leaf-farm-nature-ecology.jpg?s=612x612&w=0&k=20&c=zBBvYEnW3LmqX5C-QcvYtNr9z9WuE5p8y5K63ERspfE=" alt="logo">
                </div>
                <ul class="lists">
                    <li class="nav-list-item"><a href="/">Home</a></li>
                    <li class="nav-list-item"><a href="#about">About</a></li>
                    <li class="nav-list-item"><a href="users/user_login.php">User</a></li>
                    <li class="nav-list-item"><a href="admin/index.php">Admin</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <script>
        var navbar = document.getElementById('navbar')
        window.onscroll = () => {
            if (window.scrollY >= 10)
                navbar.classList.add('sticky');
            else
                navbar.classList.remove('sticky');
        }
    </script>
</body>