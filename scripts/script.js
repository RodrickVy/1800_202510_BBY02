/* function sayHello() {
    
}
//sayHello();

function toggleStar(star, skillLevel) {
    if (star.classList.contains('far')) {
        // Empty star clicked, fill it with gold
        star.classList.remove('far');
        star.classList.add('fas');
        star.style.color = 'black';

        // Store the star's state in localStorage
        localStorage.setItem(skillLevel, 'filled');
        
    } else {
        // Filled star clicked, make it empty again
        star.classList.remove('fas');
        star.classList.add('far');
        star.style.color = 'inherit';

        // Clear the star's state in localStorage
        localStorage.removeItem(skillLevel);
    }

}

// Function to load the star states from localStorage when the page loads
window.onload = function() {
    // Check the saved states for each skill level and update the stars accordingly
    const skillLevels = ['Recreational', 'Intermediate', 'Intermediate Plus'];
    
    skillLevels.forEach(skillLevel => {
        const star = document.getElementById('star' + skillLevel.replace(/ /g, ''));

        if (localStorage.getItem(skillLevel) === 'filled') {
            star.classList.remove('far');
            star.classList.add('fas');
            star.style.color = 'black';
        }
    });

    // Ensure the header remains as "Skill Level" on load
    document.getElementById('skillLevelHeader').innerText = 'Skill Level';
}
 */
