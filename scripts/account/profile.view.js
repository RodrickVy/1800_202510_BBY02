Account.addListener("profileView", (user) => {
    loadText("accountCircle",getInitials(user.name));
    loadText("userName",user.name);
    loadText("userEmail",user.email);
    loadValue("bioEditor", user.bio);
    loadValue('userNameInput', user.name)
    loadValue('userPhone', user.phoneNumber);
    loadValue('genderSelect', user.gender);
    loadValue('roleSelect', user.role);
    loadValue('citySelect', user.city);
    loadValue('userRating', user.skillLevel);
    loadText('ratingValue', user.skillLevel);
    loadValue('lastLoginText', user.lastLogin);
    loadValue('createdOnText', user.createdOn);
    loadValue('userEmailViewOnly', user.email);

});


const logoutBtn = document.getElementById("logoutBtn");
const userNameInput = document.getElementById("userNameInput");
const userPhoneInput = document.getElementById("userPhone");
const userGender = document.getElementById("genderSelect");
const roleInput = document.getElementById("roleSelect");
const cityInput = document.getElementById("citySelect");
const bioInput = document.getElementById("bioEditor");
const userRating = document.getElementById("userRating");
const saveButton = document.getElementById("saveButton");
const imageInput = document.getElementById("imageInput");
const passwordResetBtn = document.getElementById("resetPasswordBtn");
const deleteButton = document.getElementById("deleteAccountBtn");
logoutBtn.addEventListener("click", () => {
    Account.logout();
})


passwordResetBtn.addEventListener("click", () => {
    Account.sendPasswordResetEmail(Account.userAccount.email,(email)=>{
        alert(' A password reset email has been sent to email : '+email);
    },(error)=>{
        alert(error);
    })
})


deleteButton.addEventListener("click", () => {
   const accountPass = prompt("Are you sure you want to delete your account? This action cannot be undone. Enter your password to confirm.");
   Account.signIn(Account.userAccount.email,accountPass,()=>{
       Account.deleteUser(Account.userAccount.id);
   }, (e)=>{
       alert("The password you entered is incorrect, pls try again:  "+e);
   })

})

function enableSaveOnInputChange() {
    const inputs = [
        userNameInput,
        userPhoneInput,
        userGender,
        roleInput,
        cityInput,
        bioInput,
        userRating
    ];


    inputs.forEach(input => {
        input.addEventListener('input', () => {
            saveButton.setAttribute('class', "btn btn-warning w-100 m-2");
        });
    });
}

// Initialize event listeners
enableSaveOnInputChange();


// When the save button is clicked, log the content and reset the background.
saveButton.addEventListener('click', () => {
    Account.updateUser(Account.userAccount.id, (user) => {
        return {
            name: userNameInput.value,
            phoneNumber: userPhoneInput.value,
            gender: userGender.value,
            role: roleInput.value,
            city: cityInput.value,
            bio: bioInput.value,
            skillLevel: userRating.value

        }
    }).then(() => {
        saveButton.setAttribute('class', "btn btn-disabled w-100 m-2");
    })

});

imageInput.addEventListener('change', () => {
    StorageService.uploadFile(imageInput.value,imageInput.value, (data) => {
        Account.updateUser(Account.userAccount.id, (user) => {
            return {
                profileUrl: user.profileUrl,
            }
        }).then(() => {
            saveButton.setAttribute('class', "btn btn-success w-100 m-2");
        });
    })
})
const ratingSlider = document.getElementById('userRating');
const ratingValue = document.getElementById('ratingValue');

ratingSlider.addEventListener('input', function () {
    ratingValue.textContent = ratingSlider.value;
});