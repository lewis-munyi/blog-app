<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/lewis-munyi#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/lewis-munyi/blog-app">
    <img src="https://github.com/othneildrew/Best-README-Template/raw/master/images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Blog App</h3>

  <p align="center">
    This is a simple blog that lets users sign up, post and manage their posts.
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/lewis-munyi/blog-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/lewis-munyi/blog-app/issues">Request Feature</a>
    ·
    <a href="https://github.com/lewis-munyi/blog-app/graphs/contributors">Contributors</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<!-- ## Table of Contents -->
<!--
- [About The Project](#about-the-project)
    - [Built With](#built-with)
- [Project Overview](#project-overview)
  - [Front-end](#front-end)
  - [Backend](#backend)
- [Contributing](#contributing)
- [License](#license)



<!-- ABOUT THE PROJECT -->
## About The Project

This project is a simple JS based blog application to built to hone our programming skills, and in partial fulfilment of the requirements of the Web Development track of [KamiLimu](https://kamilimu.org) Cohort 5.

This is an open source application, therefore contributions, pull requests are currently being accepted.

#### Built With
This project incorporates these amazing frameworks, libraries, and technologies.
* [Vue JS](https://vuejs.org/)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [Express](https://expressjs.com/)
* [Mongo DB - Atlas](https://www.mongodb.com/cloud/atlas)
* [OKTA](https://www.okta.com/)

## Project Overview
The project if grouped into two parts; front-end, and backend applications that communicate over RESTful APIs to **C**reate, **R**ead, **U**pdate, and **D**elete blog posts.

### Front-end
The frontend will have the following pages/activities
1. Home Page:
   1. Show most recently posted posts in chronological order
   2. Add sort by popularity
2. Register:
   1. User can register with email/password.
   2. User can lofin via social login
3. Login:
   1. User can login with email/password
   2. User can login with social
4. Compose:
   1. User can create a new blog post
5. Edit:
   1. User can edit and update a blog post
6. Blog:
   1. User can see all of their blog posts in one page
   2. Shortcuts to create/read/update/delete posts will be available here

### Backend
1. Database:
   1. The app will use a non-relational Mongo DB cloud database to store data
2. Middleware:
   1. The app will incorporate authentication middleware to authenticate some requests
3. Methods:
   1. Post -> CRUD post(s)
   2. User -> Login/sign up

<!-- GETTING STARTED --
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
```sh
npm install npm@latest -g
```

### Installation

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
3. Install NPM packages
```sh
npm install
```
4. Enter your API in `config.js`
```JS
const API_KEY = 'ENTER YOUR API';
```



<!-- USAGE EXAMPLES --
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_



<!-- ROADMAP --
## Roadmap

See the [open issues](https://github.com/lewis-munyi/blog-app/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<br>
<p align="center">
<img src="https://static.wixstatic.com/media/395902_78de817d298e4ee0afdc1f50dc04d6c4~mv2.png/v1/crop/x_0,y_238,w_1366,h_292/fill/w_454,h_93,al_c,q_85,usm_0.66_1.00_0.01/KamiLimu%20logo2.webp" alt="Logo" >
</>/



<!-- CONTACT --
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)



<!-- ACKNOWLEDGEMENTS --
## Acknowledgements
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Animate.css](https://daneden.github.io/animate.css)
* [Loaders.css](https://connoratherton.com/loaders)
* [Slick Carousel](https://kenwheeler.github.io/slick)
* [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
* [Sticky Kit](http://leafo.net/sticky-kit)
* [JVectorMap](http://jvectormap.com)
* [Font Awesome](https://fontawesome.com)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lewis-munyi/blog-app.svg?style=flat-square
[contributors-url]: https://github.com/lewis-munyi/blog-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lewis-munyi/blog-app.svg?style=flat-square
[forks-url]: https://github.com/lewis-munyi/blog-app/network/members
[stars-shield]: https://img.shields.io/github/stars/lewis-munyi/blog-app.svg?style=flat-square
[stars-url]: https://github.com/lewis-munyi/blog-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/lewis-munyi/blog-app.svg?style=flat-square
[issues-url]: https://github.com/lewis-munyi/blog-app/issues
[license-shield]: https://img.shields.io/github/license/lewis-munyi/blog-app.svg?style=flat-square
[license-url]: https://github.com/lewis-munyi/blog-app/blob/master/LICENSE.txt
