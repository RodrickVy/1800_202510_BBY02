/* Sign-up button handler: collects input, signs up user, navigates to home on success. */
document.getElementById('signUpBtn').addEventListener("click", () => {
    const userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Account.signUp(userName, email, password, () => {
        navigateToRoute('./home.html');

    }, (error) => {

    });
})
