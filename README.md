<!-- Credit to: https://github.com/othneildrew/Best-README-Template -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Bookstore Inventory Management System</h3>

  <p align="center">
    A software implementation of an Inventory Management Solution
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#features">Features</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project consists of an interactive and dynamic full-stack application, allowing for the management of a local Bookstores Inventory. Members can search, checkout, and view books within the system. Employees have access to all these features alongside an Administrator panel allowing for direct modification of the system. 

All logins are handled by the application itself, and utilizes full Encryption and Salting on all passwords to ensure maximum security. All user input boxes utilize sanitization and MySQL Prepared Statements to ensure that system protects against bad actors interacting with the front-end. The Administrator panel utilizes checks and specific cookies to ensure that only those logged in with an Admin account have access to admin functionality.  

Maven is used as the build manager for our project, and it can be deployed on any web server. During development we used an Apache Tomcat 8.5.50 server for processing and deployment. 

This Inventory Mangement Software features an interactive front-end using vanilla HTML/CSS and utilizes JavaScript for embedded functionality and making API calls. The back-end utilizes a custom API using Java Servlets to handle API calls and communicate with a MySQL Database.

The database employs a relational database schema to efficiently store and retrieve any information needed about the Inventory. As a result we are employing MySQL to operate the database.

By utilizing the Java Database Connectivity (JDBC) API, we are able to handle and execute SQL queries using the information provided in the API calls to provide all sorts of functionality. 


![Landing Page](https://github.com/user-attachments/assets/9a649879-18e9-4643-a5da-133bf1db003c)





<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Maven
* SQL
* Java
* JavaScript
* HTML
* CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these example steps.

* Clone the GitHub repo to a local folder
* Connect to your database by entering the database URL, username, and password in the JDBC_Authentication.java file.
* Use maven to build the project, by typing the following commands in order.
   ```sh
  mvn clean
  ```
    ```sh
  mvn compile
  ```
     ```sh
  mvn package
  ```

     This will use Maven to build the .war file, which can be deployed as a deployment on any HTTP web server.

### Prerequisites

* In order to compile and build the project, Apache Maven is used. The instructions for downloading and installing Maven can be found here: https://maven.apache.org/install.html

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- FEATURES EXAMPLES -->
## Features

- Uses a modern relational Database schema to track various information about Books currently in the catalog, account information, and maintain a checkout history for the whole store.
- Search for books on the main page, or view the entire inventory on the inventory page.
![Screenshot 2024-08-19 140647](https://github.com/user-attachments/assets/8a7949dd-bdcf-498c-975d-5f883f89e2ac)

- A full login and registration system, which allows for creating new accounts. It is required for someone to be logged in to checkout a book and update the checkout record.
*   Each account password is encrypted and then salted with a custom Salt before storing in the database.
- Member accounts can checkout books, view their checkout history, and update information about their account from the Members panel. 
![Screenshot 2024-08-19 140904](https://github.com/user-attachments/assets/9c058a5f-a7ac-411c-a311-6afe0c166a71)
- Administrator accounts have full control over the database, such as: Searching for individual members, Updating members account information (and type), Deleting a member, Adding books, Deleting books, Viewing members total checkout history, Marking books as returned after checkout, Viewing books total checkout history.
  ![Screenshot 2024-08-19 141457](https://github.com/user-attachments/assets/b0734c36-08c5-4b7e-878a-0641f690a5b9)



<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - Corey Collins - corey.dc@outlook.com

Project Link: [https://github.com/coreydc7/Bookstore-IMS](https://github.com/coreydc7/Bookstore-IMS)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/coreydc7/Bookstore-IMS.svg?style=for-the-badge
[contributors-url]: https://github.com/coreydc7/Bookstore-IMS/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/coreydc7/Bookstore-IMS.svg?style=for-the-badge
[forks-url]: https://github.com/coreydc7/Bookstore-IMS/network/members
[stars-shield]: https://img.shields.io/github/stars/coreydc7/Bookstore-IMS.svg?style=for-the-badge
[stars-url]: https://github.com/coreydc7/Bookstore-IMS/stargazers
[issues-shield]: https://img.shields.io/github/issues/coreydc7/Bookstore-IMS.svg?style=for-the-badge
[issues-url]: https://github.com/coreydc7/Bookstore-IMS/issues
[license-shield]: https://img.shields.io/github/license/coreydc7/Bookstore-IMS.svg?style=for-the-badge
[license-url]: https://github.com/coreydc7/Bookstore-IMS/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
