# RECREA-8

## Overview
For recreational volleyball players who want to play more games to enhance their skills but struggle to find teams or substitutes on short notice. RECREA-8 streamlines team formation and substitute onboarding. Unlike traditional methods of messaging or manually coordinating players, RECREA-8 provides an intuitive notification system, a centralized team management interface, and a dynamic games schedule, ensuring players can quickly join teams, request substitutes, or find opportunities to play at any moment.

### Persona
Name: Cole Anderson
Description: 23 year old male, living in Richmond BC. Strong athletic background and plays volleyball consistently in the community while working full-time as a software developer.
Behaviours: Enjoys playing volleyball as a semi-competitive hobby. Plays in multiple leagues during free time, while going to the gym and exercising. Loves to try and meet
new people during drop-ins. usually playing volleyball with friends in community centres. Plays on weekday nights and weekends at open gyms.
Needs and Goals: Needs committed players on his team that do not bail on games last minute. Needs to be able to build his skills to develop as a player, and win more rec league
games as he is quite competitive. Lacking player development, wishes to go from beginner to intermediate skill level leagues but lacks consistent teammates. Wants to improve
his overall community in volleyball.
How Our App Helps: Providing a simple interface to substitute for other teams to play more volleyball and enhance skills. A create a team function allows Cole to create his team
but request for substitutes and meet new players if his teammates bail on his games.

<img src="/images/user_persona.png" width="700px">

## Features
 Apps features are split into 4:

- Teams - Display and allow the user to create their own team and view other available teams on the app.
- Leagues - Display the current recreational leagues and to filter games specific to that league.
- Games - Show upcoming games for user to request to sub, as well as adding their own game if in need for subs.
- Account - Allow the user to manage their account and set preferances to personalize their experience. 

### Value Proposition
RECREA-8 solves two problems going on in the world today. The first problem is a last minute scramble to find people for an event after someone bails, which we often
deal with in our daily lives. The second problem is not having enough friends or people to do events with. Specifically, RECREA-8 has targetted these problems when
it applies to recreational volleyball, which is growing as one of the most popular sports in BC today.

Our app is needed because so many people often find themselves in a state of panic when a teammate is sick or cannot make it to a game and do not want their team
record to be affected. Likewise, more often than not, many players find themselves dropping in to random community centres and not being able to find enough friends
or teammates to form a team with. Our app aims to solve these two issues while bringing the volleyball community together as a whole.

RECREA-8 is unique in the sense that it is specific to recreational volleyball and specifically targets the objective of finding subsitutions. Most other meet-up sports
apps allows you to drop-in to an already existing game, but isn't catered towards subs in a recreational league. Our simple yet modern look with the app will target the
large demographic of young adult volleyball players with an easy to learn and easy to use interface.
---

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend Authentication**: Firebase Authentication
- **Backend Database**: Firebase Firestore 
- **Backend Storage (media, files hosting)**: Firebase Storage
- **APIs USED**: 
  - **Geoapify**: Used for location auto suggestions when user is specifies location of a game [API Homepage](https://www.geoapify.com/).
- **Libraries & Packages**
  - **Bootstrap** - Used for simplified CSS styling [Bootstrap homepage](https://getbootstrap.com/).
  - **JQuery** - Only imported as a dependency of bootstrap not used extensively in the code [JQuery homepage](https://jquery.com/).
  - **Font Awesome Icons** - Main and only icon library for the entire app, using the free solid (fas fa-) version [Font Awesome homepage](https://fontawesome.com/v6/icons?o=r&s=solid).
  - **Google Fonts** - Fonts loaded over network [Google Fonts](https://fonts.googleapis.com/).
---

## Usage
1. Open your browser and visit `http://localhost:3000`.
2. Sign up if an account hasn't been created, sign in if an account already exists.
3. Click on "Teams" in the navbar and click the "Add Team" button to create a team in the data base with appropriate skill level, league and team banner.
4. Click on "Games" in the navbar and "Add Game" button to add the next game for your team with time, location and details.
5. Upon another user requesting to sub for your game, contact them with email or phone if required and accept or reject to notify them.
6. Click on "Games" in the navbar and click on a game that interests to sub for. Click "Substitute" and wait to hear back for approval from the captain (game creator).
Call or email the captain if necessary to contact them. Once approval accepted, receive a notification in the top right bell icon.

---

## Project Structure
1800_202510_BBY02/
├── .idea/
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── components/
├── aboutus.html
├── account.html
├── addGame.html
├── add-team.html
├── contactus.html
├── eachLeague.html
├── editGameDetails.html
├── edit-team.html
├── gameDetails.html
├── games.html
├── index.html
├── league.html
├── main.html
├── notifications.html
├── privacypolicy.html
├── signin.html
├── signup.html
├── teamDetails.html
├── teams.html
├── package-lock.json
├── README.md
└── .gitignore
```

---

## Contributors
- **Ken Lee** - BCIT CST Student in Term 1 with a passion for sports, exercise, and bringing people together. First year learning how to code!
- **Rodrick Vy** - BCIT CST Student, 

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
- Currently, RECREA-8 has a simple email and phone call function between users but no messaging system.
- RECREA-8 only supports recreational volleyball leagues specifically in the Lower Mainland of BC.
- No search function as there isn't too much data involved in the collection at the moment.
- The user interface can be further enhanced for accessibility.

### Future Work
- Adding a full-on messaging system and friend function to add different users after subbing or requesting for subs.
- Implementing the goal and idea onto other sports within BC, such as basketball, soccer, and more.
- Implementing the goal and idea to have a community centre drop in functin to expand beyond recreational leagues.
- Integrate more game and team filtering options to time and location, leagues, and favorites.
- Create a dark mode for better visibility options, possible color background changes, as well as language selectors.
---

## License

Example:
This project is licensed under the MIT License. See the LICENSE file for details.
