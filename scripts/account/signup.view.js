document.getElementById('signUpBtn').addEventListener("click", () => {

    const userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roleSelect = document.getElementById("roleSelect").value;


    Account.signUp(userName, email, password, () => {
        navigateToRoute('./main.html');

    }, (error) => {
        alert(error)
    });
})

loadTemplate("shadowPhotoSignUpPlaceholder", `
    <div id="photoContainer" class="photo-container" style="width: 50%; max-width: 200px; height: 300px; overflow: hidden; position: relative; padding-top: 10px; display: block; margin: 0 auto;">
        <div class="photo-item active">
            <img src="./images/shadow1.jpg" class="d-block w-100" alt="shadow1" style="width: 180px; height: 275px; object-fit: cover;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow2.jpg" class="d-block w-100" alt="shadow2" style="width: 180px; height: 275px; object-fit: contain;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow3.jpg" class="d-block w-100" alt="shadow3" style="width: 200px; height: 275px; object-fit: cover;">
        </div>
        <div class="photo-item">
            <img src="./images/shadow4.jpg" class="d-block w-100" alt="shadow4" style="width: 180px; height: 300px; object-fit: cover;">
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
