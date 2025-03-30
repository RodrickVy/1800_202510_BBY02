// All the dom elements are variables and placed in this constant object for more readability.
const DOMElements = {
    SplashScreen: document.getElementById("splash_screen"),
    SplashLogo: document.getElementById("splash_logo"),
    IntroNextBtn: document.getElementById("next_btn"),
    IntroPrevBtn: document.getElementById("prev_btn"),
    IntroCarouselSlide: document.getElementById("startIntro"),
}
//  Global css values changed by JS
const Brand = {
    primary: "black",
    accentColor: '#D0DDD7',
}
// Shows the splash screen and hides it again after it's animation
function startSplashScreen() {
    DOMElements.SplashScreen.style.display = "flex";
    DOMElements.SplashLogo.addEventListener("animationend", () => {
        DOMElements.SplashScreen.style.display = 'none';
        startSlideShow();
    })
}

// Selects one slot and unselects the other ones
const ___selectSlot = (slot) => {
    const _id = (index) => {
        return document.getElementById(`intro_slide_slot_${index}`)
    }
    _id(0).style.background = Brand.accentColor;
    _id(1).style.background = Brand.accentColor;
    _id(2).style.background = Brand.accentColor;
    _id(slot).style.background = Brand.primary;
}

function startSlideShow() {
    let currentPage = 0;
    ___selectSlot(currentPage);

    DOMElements.IntroNextBtn.addEventListener("click", () => {
        if (currentPage < 2) {
            DOMElements.IntroNextBtn.innerText = "Next";
            DOMElements.IntroPrevBtn.style.display = "inline-block";
            currentPage++;
            $("#startIntro").carousel('next');
            ___selectSlot(currentPage);
        }

        if (currentPage === 2) {
            DOMElements.IntroNextBtn.innerHTML = `<a href='/${___PAGES.signin}.html' style='text-decoration:none;color:inherit;'>Get Started →</a>`;
        }

    });
    DOMElements.IntroPrevBtn.addEventListener("click", () => {
        if (currentPage > 0) {
            DOMElements.IntroNextBtn.innerText = "Next";
            DOMElements.IntroPrevBtn.innerText = "Previous";
            currentPage--;
            $("#startIntro").carousel('prev');
            ___selectSlot(currentPage);
        }

        if (currentPage === 0) {
            DOMElements.IntroPrevBtn.style.display = "none";
        }
    });
}

// showing splash screen
startSplashScreen();
