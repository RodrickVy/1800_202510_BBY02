document.getElementById('signUpBtn').addEventListener("click", () => {

    const userName = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const roleSelect = document.getElementById("roleSelect").value;

    console.log(email)
    Account.signUp(userName, email, password, {
        role: roleSelect
    }, () => {
        navigateToRoute('./main.html');

    }, (error) => {
        alert(error)
    });
})
