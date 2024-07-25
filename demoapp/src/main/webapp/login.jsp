<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="description"
        content="Log into an account">
    <meta name="keywords" content="HTML,CSS,JavaScript,Java,MySQL,Apache Tomcat,Servlets">
    <meta name="author" content="Corey Collins">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookstore Inventory Management System</title>
    <script src="./script.js"></script>
    <link href="./stylesheets/style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Cardo:400,700|Oswald" rel="stylesheet">
</head>

<body>
    <header>
        <nav class="main-navbar">
            <a href="index.jsp">Home</a>
            <a href="inventory.jsp">Inventory</a>
            <a href="about.jsp">Contact</a>
            <a id="authButton"></a>
        </nav>
    </header>
    <div id="main-homepage">
        <h1>Bookstore Inventory Management System</h1>
        <br>
        <h3>Log in!</h3>
        <input type="text" id="usernameInput" placeholder="Username:">
        <input type="password" id="passwordInput" placeholder="Password:">
        <button onclick="login()">Login</button>
        <div id="loginResult"></div>


        <h3>Don't have an account? <a href="register.jsp">Register today!</a></h3>
    </div>

</body>

</html>