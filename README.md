
# RECREA-8

## Overview
For recreational volleyball players who want to play more games to enhance their skills but struggle to find teams or substitutes on short notice, RECREA-8, streamlines team formation and substitute onboarding. Unlike traditional methods of messaging or manually coordinating players, RECREA-8 provides an intuitive notification system, a centralized team management interface, and a dynamic games schedule, ensuring players can quickly join teams, request substitutes, or find opportunities to play at any moment.

### Persona
<img src="/images/user_persona.png" width="700px">


## Features
 Apps features are split into 5:

- Teams - Display and allow user to create and interact with teams on the app.
- Leagues - Display the current leagues 
- Games - Show upcoming games for user to 
- Account - Allow the user to manage their account , set preferances to personalize their experience. 

### Value Proposition

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend Authentication**: Firebase Authentication
- **Backend Database**: Firebase Firestore 
- **Backend Storage (media, files hosting)**: Firebase Storage
- **APIs USED**: 
  - **Geoapify**: Used for location auto suggestions when user is specifies location of a game  [API Homepage](https://www.geoapify.com/).
- **Libraries & Packages**
  - **Bootstrap** - Used for simplified css styling. [Bootstrap homepage](https://getbootstrap.com/)
  - **JQuery** - Only imported as a dependency of bootstrap not used extensively in the code. [JQuery homepage](https://jquery.com/)
  - **Font Awesome Icons** - Main and only icon library for the entire app, using the free solid (fas fa-) version. [Font Awesome homepage](https://fontawesome.com/v6/icons?o=r&s=solid)
  - **Google Fonts** - Fonts loaded over network [Google Fonts](https://fonts.googleapis.com/).
---

## Usage

Example:
1. Open your browser and visit `http://localhost:3000`.
2. Enter the name of the city in the search bar and press enter.
3. View the weather information displayed on the screen.

---

## Project Structure

Example:
```
project-name/
├── src/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── components/
├── package.json
├── README.md
└── .gitignore
```

---

## Contributors
- **Your Name** - BCIT CST Student with a passion for creating user-friendly applications. Fun fact: Loves solving Rubik's Cubes in under a minute.
- **Teammate Name** - BCIT CST Student, Frontend enthusiast with a knack for creative design. Fun fact: Has a collection of over 50 houseplants.

---

## Acknowledgments
- Code snippets for ___ algoirthm were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/) and images from [Unsplash](https://unsplash.com/).
- Image of Richmond Oval obtained from URL: https://www.centaurproducts.com/project/richmond-olympic-oval/
- Image of Moscrop Secondary Gym obtained from URL: https://www.studyinburnaby.ca/school/moscrop-secondary-school/
- Image of Cambie Community Centre obtained from URL: https://www.mapquest.com/ca/british-columbia/cambie-community-centre-456541330
- Image of Hastings Community Centre obtained from URL: https://hastingscc.ca/?p=27
- Images from Stock Photos obtained from URL: https://www.istockphoto.com/search/2/image-film?family=creative&phrase=volleyball
- Images from Stock Volleyball Silouhette photos obtained from URL: https://stock.adobe.com/ca/search/images?k=volleyball+silhouette

---

## Limitations and Future Work
### Limitations

Example:
- Currently, the app only supports city-based weather searches.
- Limited to basic weather parameters like temperature, humidity, and conditions.
- The user interface can be further enhanced for accessibility.

### Future Work

Example: 
- Add support for location-based weather detection using GPS.
- Implement additional weather parameters like wind speed and UV index.
- Create a dark mode for better usability in low-light conditions.
- Integrate user accounts for saving favorite locations.

---

## License

Example:
This project is licensed under the MIT License. See the LICENSE file for details.
