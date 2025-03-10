const ___PAGES = {
  signin: 'signin',
  signup: 'signup',
  profile: 'profile',
  settings: 'settings',
  leagues: 'leagues',
  main: 'main'
};


// If we are on these pages and the user is authenticated go to the main page 

const __NOAUTHADVANCEROUTES = [
 ___PAGES.signin,
 ___PAGES.signup
]
// If we are on any of these pages and the user is not authenticated go to sign in. 
const _AUTHGOURDEDROUTES = [
 ___PAGES.settings,
   ___PAGES.leagues,
 ___PAGES.main,
 ___PAGES.profile
];



/**
 * Checks if an element with the given ID exists in the DOM.
 *
 * @param {string} id - The ID of the element to look for.
 * @returns {boolean} - Returns true if the element exists, false otherwise.
 */
const elementExists = (id)=> {
    // document.getElementById(id) returns null if not found
    return document.getElementById(id) !== null;
}


/**
 * Places the given HTML into the element with the specified ID. 
 * First checks to see if the element exists, and if it does not exist, 
 * the function does nothing and returns. 
 * 
 * This allows centralized logic for loading templates dynamically 
 * without triggering the "Uncaught TypeError: Cannot read properties of null".
 *
 * @param {string} placeholderId - The ID of the DOM element to update.
 * @param {string} html - The HTML string to place inside the identified element.
 * @param {Function} onload - is run once the template has been loaded to the DOM.
 * @returns {void}
 */
const loadTemplate = (placeholderId, html, onload = (()=>{})) => {
    if (elementExists(placeholderId)) {
      const placeholderElement = document.getElementById(placeholderId);
      placeholderElement.innerHTML = html;
      onload();
    } else {
      // Element does not exist in the DOM, so nothing happens.
    }
  };
  


  

/**
 * Places the given text into the element as innerText
 * First checks to see if the element exists, and if it does not exist, 
 * the function does nothing and returns. 
 * 
 * Checkout [loadTemplate] as they are similar
 *
 * @param {string} placeholderId - The ID of the DOM element to update.
 * @param {string} text - The text string to place inside the identified element.
 * @param {Function} onload - is run once the template has been loaded to the DOM.
 * @returns {void}
 */
const loadText = (placeholderId, text, onload = (()=>{})) => {
  if (elementExists(placeholderId)) {
    const placeholderElement = document.getElementById(placeholderId);
    placeholderElement.innerText = text;
    onload();
  } else {
    // Element does not exist in the DOM, so nothing happens.
  }
};


/**
 * Places the given text into the element as value, should ONLY be used for input elements with value attribute
 * First checks to see if the element exists, and if it does not exist, 
 * the function does nothing and returns. 
 * 
 * Checkout [loadTemplate] and [loadText] as they are similar
 *
 * @param {string} placeholderId - The ID of the DOM element to update.
 * @param {string} value - The text string to place inside the identified element.
 * @param {Function} onload - is run once the template has been loaded to the DOM.
 * @returns {void}
 */
const loadValue = (placeholderId, value, onload = (()=>{})) => {
  if (elementExists(placeholderId)) {
    const placeholderElement = document.getElementById(placeholderId);
    placeholderElement.value = value;
    onload();
  } else {
    // Element does not exist in the DOM, so nothing happens.
  }
};
/**
 * Navigates programmatically to a given relative route
 * by simulating a hidden anchor click.
 *
 * @param {string} routePath - The relative URL or route to navigate to (e.g., './signin.html').
 */
function navigateToRoute(routePath) {
  if(getCurrentPage() !== sanitizeRoute(routePath)){
    // Create an invisible <a> element
    const link = document.createElement('a');
    link.href = routePath.includes(".html") ==true ? routePath : routePath +".html";
    link.style.display = 'none';
    link.id = 'autoClickLink';
  
    // Append it to the document body
    document.body.appendChild(link);
  
    // Programmatically "click" the link
    link.click();
  
    // Clean up: remove the <a> from the DOM
    document.body.removeChild(link);
  }
}
  


  /**
 * Returns the initials for a given full name.
 * If the full name consists of exactly two words (first and last), it returns both initials.
 * Otherwise, it returns only the first letter of the first name.
 *
 * @param {string} fullName - The full name from which to extract initials.
 * @returns {string} - The initials in uppercase.
 */
function getInitials(fullName) {
    if (typeof fullName !== 'string' || !fullName.trim()) {
      return '';
    }
    
    // Split the name by one or more whitespace characters.
    const nameParts = fullName.trim().split(/\s+/);
    
    if (nameParts.length === 2) {
      // If exactly two parts, return both initials.
      return nameParts[0].charAt(0).toUpperCase() + nameParts[1].charAt(0).toUpperCase();
    } else {
      // Otherwise, return the first letter of the first part.
      return nameParts[0].charAt(0).toUpperCase();
    }
  }
  
 

  /**
 * Generates a Universal Unique Identifier (UUID) for user identification.
 * Uses crypto.randomUUID if available, otherwise falls back to a custom generator.
 *
 * @returns {string} A unique identifier.
 */
function generateUniqueId() {
      // Fallback implementation (note: not as robust as crypto.randomUUID)
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    
  }
  

  /**
 * Returns the current page name by extracting the last part of the URL path.
 *
 * For example, if the URL is:
 *   https://example.com/path/to/page.html?query=123#section
 * This function returns "page.html".
 *
 * @returns {string} The last segment of the path, or an empty string if not found.
 */
function getCurrentPage() {
  // Create a URL object from the current location
  const url = new URL(window.location.href);
  // Get the pathname, e.g., "/path/to/page.html"
  const pathname = url.pathname;
  // Return the last segment (if available)
  return sanitizeRoute(pathname);
}



function sanitizeRoute (url){
 
  const segments = url.replace(/\/$/, '').replace(".html",'').split('/');
  return segments.length ? segments[segments.length - 1] : '';
}


/**
 * Checks if the current route is guarded and if the user is not authenticated,
 * then redirects to the signin page.
 *
 
 * @param {boolean} isAuthenticated - Whether the user is currently authenticated.
 * @param {string} [needAuthRoute ] - user sent to this page if they need authentication.
 * @param {string} [authenticatedRoute ] - user sent here if they are aready authenticated.
 */
function checkGuardedRoutes( isAuthenticated, needAuthRoute = ___PAGES.signin, authenticatedRoute = ___PAGES.main) {
  // Assumes a getCurrentPage() function exists that returns the current page (e.g., "profile", "settings", etc.)
  const currentPage = getCurrentPage();
  console.log(`Current page: ${currentPage} | Authenticated: ${isAuthenticated}`);
 
  if (!isAuthenticated && _AUTHGOURDEDROUTES.includes(currentPage)) {
    console.log(`Access to ${currentPage} is restricted. Redirecting to signin page.`);
    navigateToRoute('./'+needAuthRoute+".html")
  }else if (isAuthenticated && __NOAUTHADVANCEROUTES.includes(currentPage)){
    navigateToRoute('./'+authenticatedRoute+".html")
  }
}

 