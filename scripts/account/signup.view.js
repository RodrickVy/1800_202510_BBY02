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
