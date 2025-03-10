Account.addListener("profileView", (user) => {
    loadValue("bioEditor", user.bio);

    console.log(user.id)
    loadText("accountCircle",getInitials(user.name));
    loadText("userName",user.name);
    loadText("userEmail",user.email);


});


const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
    Account.logout();
})


const saveButton = document.getElementById('saveBioButton');
const bioEditor = document.getElementById("bioEditor");


// When the user types in the text area, change the background to yellow.
bioEditor.addEventListener('input', () => {
    saveButton.setAttribute('class', "btn btn-warning w-100 m-2");
});

// When the save button is clicked, log the content and reset the background.
saveButton.addEventListener('click', () => {
    Account.updateUser(Account.userAccount.id, (user) => {
        return {bio: bioEditor.value}
    }).then(() => {
        saveButton.setAttribute('class', "btn btn-success w-100 m-2");
    })

});