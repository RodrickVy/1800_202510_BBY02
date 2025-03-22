// Loads the common HTML in the sign in, signup and forgot-password pages. 
window.onload = () => {

    loadTemplate("navPlaceholder", ` <nav class="navbar navbar-expand-lg shadow-sm" style="background-color: #ffffff;">
        <div class="container-fluid">
            <a class="navbar-brand" href="./index.html" style="font-size: 32px;">
                <img src="./images/logo.jpg" height="75">RECREA-8</a>
            <button style="margin: 5px;" class="navbar-toggler " type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span  class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0"  style="padding: 10px;">
                
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                    <li class="nav-item dropdown ">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            View More
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Privacy Policy</a></li>
                            <li><a class="dropdown-item" href="#">Language Selector</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#">Forgot Password?</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>`, () => { });
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
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"
                aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="./images/volleyball.jpg" class="d-block w-100" alt="volleyball">
            </div>
            <div class="carousel-item">
                <img src="./images/basketball.jpg" class="d-block w-100" alt="basketball">
            </div>
            <div class="carousel-item">
                <img src="./images/soccer.jpg" class="d-block w-100" alt="soccer">
            </div>
            <div class="carousel-item">
                <img src="./images/gym.jpg" class="d-block w-100" alt="gym">
            </div>
            <div class="carousel-item">
                <img src="./images/team.jpg" class="d-block w-100" alt="team">
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
    </div>`, () => {

        // Start running the carousel
        const carousel = $(".carousel");

        setInterval(function () {
            carousel.carousel("next");
        }, 2200);
    });
}

loadTemplate("shadowPhotoPlaceholder", `
    <div id="photoContainer" class="photo-container" style="width: 50%; max-width: 300px; height: 450px; overflow: hidden; position: relative; padding-top: 20px; margin: 0 auto;">
        <div class="photo-item active">
            <img src="./images/shadow1.jpg" class="d-block w-100" alt="shadow1" style="width: 300px; height: 400px; object-fit: cover;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow2.jpg" class="d-block w-100" alt="shadow2" style="width: 300px; height: 400px; object-fit: contain;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow3.jpg" class="d-block w-100" alt="shadow3" style="width: 150px; height: 325px; object-fit: cover;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow4.jpg" class="d-block w-100" alt="shadow4" style="width: 240px; height: 350px; object-fit: cover;">
        </div>
    </div>
`, () => {

    // Custom fading transition setup
    const photos = $(".photo-item");
    let currentIndex = 0;

    // Initially hide all images except the first one
    $(".photo-item").hide();
    $(photos[currentIndex]).show();  // Show the first image

    // Set the interval for the fading transition
    setInterval(() => {
        // Fade out the current image
        $(photos[currentIndex]).fadeOut(1000, () => {
            // Move to the next image in the array
            currentIndex = (currentIndex + 1) % photos.length;
            // Fade in the next image
            $(photos[currentIndex]).fadeIn(1000);
        });
    }, 2200);
});
