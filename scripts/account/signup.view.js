document.getElementById('signUpBtn').addEventListener("click", () => {
    const userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Account.signUp(userName, email, password, () => {
        navigateToRoute('./home.html');

    }, (error) => {
        console.log(error)
    });
})

loadTemplate("shadowPhotoSignUpPlaceholder", `
<div id="photoContainer" class="photo-container"
     style="width: 100%; max-width: 300px; height: auto; min-height: 300px; 
            overflow: hidden; position: relative; margin: auto; margin-top: 20px; 
            display: flex; align-items: center; justify-content: center;">
        
        <div class="photo-item active" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%;">
            <img src="./images/shadow1.jpg" class="d-block" alt="shadow1" 
                 style="max-width: 100%; max-height: 100%; object-fit: cover;">
        </div>
        
        <div class="photo-item" style="position: absolute; top: 50%; left: 50%; transform: translate(-30%, -50%); width: 100%; height: 100%;">
            <img src="./images/shadow2.jpg" class="d-block" alt="shadow2" 
                 style="max-width: 100%; max-height: 100%; object-fit: contain;">
        </div>
        
        <div class="photo-item" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%;">
            <img src="./images/shadow3.jpg" class="d-block" alt="shadow3" 
                 style="max-width: 90%; max-height: 90%; object-fit: cover;">
        </div>
        
        <div class="photo-item" style="position: absolute; top: 50%; left: 50%; transform: translate(-40%, -50%); width: 100%; height: 100%;">
            <img src="./images/shadow4.jpg" class="d-block" alt="shadow4" 
                 style="max-width: 90%; max-height: 90%; object-fit: cover;">
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
