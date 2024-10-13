function toggleMenu() {
    var dropdown = document.getElementById("dropdown-menu");
    var profileIcon = document.getElementById("profile-icon");

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
        profileIcon.src = "/Assets/svg s/Profile.svg";
        profileIcon.style.width = "40px";  
        profileIcon.style.height = "40px"; 
    } else {
        dropdown.style.display = "block";
        profileIcon.src = "/Assets/svg s/ActiveProfile.svg";
        profileIcon.style.width = "50px";  
        profileIcon.style.height = "50px"; 
    }
}
window.onclick = function(event) {
    var dropdown = document.getElementById("dropdown-menu");
    var profileIcon = document.getElementById("profile-icon");

    if (!event.target.matches('.profile-icon') && !dropdown.contains(event.target)) {
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
            profileIcon.src = "/Assets/svg s/Profile.svg";
            profileIcon.style.width = "40px";  
            profileIcon.style.height = "40px"; 
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginButton');
    const loginCard = document.getElementById('loginCard');

    loginButton.addEventListener('click', function () {
        if (loginCard.style.display === 'none' || loginCard.style.display === '') {
            loginCard.style.display = 'block';
        } else {
            loginCard.style.display = 'none';
        }
    });
});

function toggleCard() {
    const formContainer = document.getElementById('formContainer');
    const overlay = document.getElementById('overlay');

    if (formContainer.style.display === 'none' || formContainer.style.display === '') {
        formContainer.style.display = 'flex';
        overlay.style.display = 'block'; 

        formContainer.style.position = 'fixed';
        formContainer.style.top = '50%';
        formContainer.style.left = '50%';
        formContainer.style.transform = 'translate(-50%, -50%)';
        formContainer.style.zIndex = '999';
    } else {
        formContainer.style.display = 'none';
        overlay.style.display = 'none'; 
    }
}


document.addEventListener('click', function(event) {
    const formContainer = document.getElementById('formContainer');
    const overlay = document.getElementById('overlay');
    const loginButton = document.querySelector('.login-btn');

    if (formContainer.style.display === 'flex' && 
        !formContainer.contains(event.target) && 
        !loginButton.contains(event.target) && 
        !overlay.contains(event.target)) {
        toggleCard(); 
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const overlay = document.getElementById('overlay');
    
    formContainer.style.display = 'none'; 
    overlay.style.display = 'none';
});



