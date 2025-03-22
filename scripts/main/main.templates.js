// Loads the common HTML templates
window.onload = () => {

    Account.addListener("mainPageAppBar", (userData) => {

        function loadUserProfileIcon(userData) {
            if (userData.profileUrl.length > 2) {
                return `<div  class="rounded-circle  d-flex align-items-center justify-content-center"
                                                     style="background:green;width: 50px; overflow:clip;height: 50px;">
                    <img alt='user profile icon' src='${userData.profileUrl}' style="width: 80px"> 
                </div> `;
            } else {
                return `<div class="rounded-circle  d-flex align-items-center justify-content-center"
                     style="background:green;width: 50px; height: 50px;">
                    <div style="color:white; font-weight:bold;padding:10px">${getInitials(userData.name)}</div>
                </div>`;
            }

        }

        loadTemplate("appBarPlaceholder", `<nav class="navbar navbar-expand-lg" style="background-color: #D0DDD7; height: 10vh; min-width: 100%;">
            <div class="container-fluid d-flex justify-content-between align-items-center px-3" style="height: 100%;">
                <a href="./account.html" style="text-decoration:none; cursor:pointer;" class="d-flex flex-column align-items-center"  >
                   ${loadUserProfileIcon(userData)}
                </a>
               
                <div >
                    <i class="fas fa-envelope" style="font-size: 50px; cursor: pointer;"></i>
                </div>
            </div>
        </nav>`, () => {
        });
    });

    loadTemplate("bottomNavPlaceholder", `
            <br><br><br><br><br>
           <footer class="footer"
        style="background-color: #D0DDD7; height: 80px; position: fixed; bottom: 0; width: 100%; left: 0;">
        <div class="container d-flex justify-content-between align-items-center" style="height: 100%;">
            <div class="footer-icons d-flex justify-content-between" style="width: 100%; padding-top:15px; text-align: center;">
                <a href="main.html" class="text-dark routeItem" >
                <i class="fas fa-home" ></i>
                <p>  Home</p>
                </a>
                <a href="teams.html" class="text-dark routeItem" >
                <i class="fas fa-users" ></i>
                <p>Teams</p>
                </a>             
                <a href="league.html" class="text-dark routeItem" >
                <i class="fas fa-trophy" ></i>
               
                <p>Leagues</p>
                </a>
               <a href="games.html" class="text-dark routeItem">
                <i class="fas fa-flag-checkered" ></i>
                <p>Games</p>
                </a>
                <a href="./account.html" class="text-dark routeItem" >
                <i class="fas fa-user" ></i>
                 <p >Account</p>
                </a>
            </div>
        </div>
    </footer>
        `, () => {
    });

    loadTemplate("carouselPlaceholder", `
<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
            aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="./images/oval.jpg" class="d-block w-100" style="height: 300px; object-fit: cover;" alt="oval">
            <div class="carousel-caption text-start" style="padding: 5px; border-radius: 5px; position: absolute; top: 0; left: 0;">
                <h5 style="color: white;">Richmond Oval</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img src="./images/hastings.jpg" class="d-block w-100" style="height: 300px; object-fit: cover;" alt="hastings">
            <div class="carousel-caption text-start" style="padding: 5px; border-radius: 5px; position: absolute; top: 0; left: 0;">
                <h5 style="color: white;">Hastings Community Centre</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img src="./images/cambie.jpg" class="d-block w-100" style="height: 300px; object-fit: cover;" alt="cambie">
            <div class="carousel-caption text-start" style="padding: 5px; border-radius: 5px; position: absolute; top: 0; left: 0;">
                <h5 style="color: white;">Cambie Community Centre</h5>
            </div>
        </div>
        <div class="carousel-item">
            <img src="./images/moscrop.jpg" class="d-block w-100" style="height: 300px; object-fit: cover;" alt="moscrop">
            <div class="carousel-caption text-start" style="padding: 5px; border-radius: 5px; position: absolute; top: 0; left: 0;">
                <h5 style="color: white;">Moscrop Secondary School</h5>
            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
`, () => {

        // Start running the carousel
        const carousel = $(".carousel");

        setInterval(function () {
            carousel.carousel("next");
        }, 2200);
    });
}




