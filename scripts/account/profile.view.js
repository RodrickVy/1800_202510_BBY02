/* Handles the "profileView" event by updating the UI with the user's profile data.
 * - Displays the user's profile picture if the URL is valid; otherwise, shows initials.
 * - Populates user details such as name, email, bio, phone number, gender, role, and city
 *   into the respective display elements and input fields. */
Account.addListener("profileView", (user) => {
    const accountCircle = document.getElementById('accountCircle');
    const accountImageCircle = document.getElementById('imageCircle');
    const imgCircleImg = document.getElementById('imgCircleImg');

    if (user.profileUrl.length > __MINPROFILEPICURLLENGTH) {
        imgCircleImg.src = user.profileUrl;
        accountImageCircle.style.display = 'block';
        accountCircle.style.display = 'none';
    } else {
        accountCircle.style.display = 'flex';
        accountImageCircle.style.display = 'none';
        loadText("accountCircle", getInitials(user.name));
    }

    loadText("userName", user.name);
    loadText("userEmail", user.email);
    loadValue("bioEditor", user.bio);
    loadValue('userNameInput', user.name)
    loadValue('userPhone', user.phoneNumber);
    loadValue('genderSelect', user.gender);
    loadValue('roleSelect', user.role);
    loadValue('citySelect', user.city);
    loadValue('userEmailViewOnly', user.email);
});

const logoutBtn = document.getElementById("logoutBtn");
const userNameInput = document.getElementById("userNameInput");
const userPhoneInput = document.getElementById("userPhone");
const userGender = document.getElementById("genderSelect");
const cityInput = document.getElementById("citySelect");
const bioInput = document.getElementById("bioEditor");
const saveButton = document.getElementById("saveButton");
const imageInput = document.getElementById("imageInput");
const passwordResetBtn = document.getElementById("resetPasswordBtn");
const deleteButton = document.getElementById("deleteAccountBtn");

/* Adding some on click event listener functions for log out button, password reset button,
and delete account button. */
logoutBtn.addEventListener("click", () => {
    Account.logout();
})

passwordResetBtn.addEventListener("click", () => {
    Account.sendPasswordResetEmail(Account.userAccount.email, (email) => {
        alert(' A password reset email has been sent to email : ' + email);
    }, (error) => {
        alert(error);
    })
})

deleteButton.addEventListener("click", () => {
    const accountPass = prompt("Are you sure you want to delete your account? This action cannot be undone. Enter your password to confirm.");
    Account.signIn(Account.userAccount.email, accountPass, () => {
        Account.deleteUser(Account.userAccount.id);
    }, (e) => {
        alert("The password you entered is incorrect, pls try again:  " + e);
    })
})

function enableSaveOnInputChange() {
    const inputs = [
        userNameInput,
        userPhoneInput,
        userGender,
        cityInput,
        bioInput,

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
            city: cityInput.value,
            bio: bioInput.value,
        }
    }).then(() => {
        saveButton.setAttribute('class', "btn btn-disabled w-100 m-2");
    })
});

imageInput.addEventListener('change', async (event) => {

    const file = event.target.files[0];
    
    const data = await StorageService.uploadMedia(file, Account.userAccount.id + "profile", 'media');
    saveButton.setAttribute('class', "btn btn-success w-100 m-2");
    await Account.updateUser(Account.userAccount.id, (user) => {
        return {
            profileUrl: data.downloadUrl,
        }
    }).then(() => {
        window.location.reload();
    })
})
