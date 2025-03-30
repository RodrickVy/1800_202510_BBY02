const signInBtn = document.getElementById('signInBtn').addEventListener("click", () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    Account.signIn(email, password, () => {
        navigateToRoute('./home.html');
    }, (error) => {
        alert(error)
    });

})
