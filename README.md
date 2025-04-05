<h1 style="display: flex;flex-direction: row;align-items: center;margin:0; text-align: start"><img src="/images/logo_transparent.png" width="100px" alt="Recreate Logo" style="position:relative;top:0;left:0;display: inline-block"> RECREA-8</h1>

## Overview
For recreational volleyball players who want to play more games to enhance their skills but struggle to find teams to play with or teams that often need substitutes on short notice. RECREA-8 streamlines team formation and substitute onboarding. Unlike traditional methods of messaging or manually coordinating players, RECREA-8 provides an intuitive notification system, a centralized team management interface, and a dynamic games schedule, ensuring players can quickly join games, request substitutes.

### Persona
<img src="/images/cole_persona.png" width="200px">

**Name**: Cole Anderson

**Description**: 23 year old male, living in Richmond BC. Strong athletic background and plays volleyball consistently in the community while working full-time as a software developer.

**Behaviours**: 
- Enjoys playing volleyball as a semi-competitive hobby. 
- Plays in multiple leagues during free time, while going to the gym and exercising. 
- Loves to try and meet new people during drop-ins. 
- Usually playing volleyball with friends in community centres. 
- Plays on weekday nights and weekends at open gyms.

**Needs and Goals**: 
- Needs committed players on his team that do not bail on games last minute. 
- Needs to be able to build his skills to develop as a player, and win more rec league games as he is quite competitive. 
- Lacking player development, wishes to go from beginner to intermediate skill level leagues but lacks consistent teammates. 
- Wants to improve his overall community in volleyball.

**How Our App Help**: 
- Providing a simple interface to substitute for other teams to play more volleyball and enhance skills. 
- A create a team function allows Cole to create his team but request for substitutes and meet new players if his teammates bail on his games.



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

- **Frontend**: 
  - HTML 5
  - CSS  v4.15
  - JavaScript vES6
- **Backend Authentication**: Firebase Authentication 8.10.0
- **Backend Database**: Firebase Firestore 8.10.0
- **Backend Storage (media, files hosting)**: Firebase Storage 8.10.0
- **APIs USED**: 
  - **Geoapify**: Used for location auto suggestions when user is specifies location of a game [API Homepage](https://www.geoapify.com/).
- **Libraries & Packages**
  - **Bootstrap** - Used for simplified CSS styling [Bootstrap homepage](https://getbootstrap.com/) 5.3.2
  - **JQuery** - Only imported as a dependency of bootstrap not used extensively in the code [JQuery homepage](https://jquery.com/) v3.5.1
  - **Font Awesome Icons** - Main and only icon library for the entire app, using the free solid (fas fa-) version v6.0.0 [Font Awesome homepage](https://fontawesome.com/v6/icons?o=r&s=solid).
  - **Google Fonts** - Fonts loaded over network [Google Fonts](https://fonts.googleapis.com/).
---

## Usage
1. Open your browser and visit `http://localhost:3000`.
2. Sign up if an account hasn't been created, sign in if an account already exists.
3. Click on "Teams" in the navbar and click the "Add Team" button to create a team in the data base with appropriate skill level, league and team banner.
4. Click on "Games" in the navbar and "Add Game" button to add the next game for your team with time, location and details.
5. Upon another user requesting to sub for your game, contact them with email or phone if required and accept or reject to notify them.
6. Click on "Games" in the navbar and click on a game that interests to sub for. Click "Substitute" button and wait to hear back for approval from the captain (game creator).
Call or email the captain if necessary to contact them. Once approval accepted, receive a notification in the top right bell icon.

---

## Project Structure
The project was structured to resemble a screaming architecture where possible. The app was divided into scripts, html files and styling. 
- All html files where at the top levels. 
- Scripts are in the `./scripts` folder. 
- And there is only one source of truth for css and that in `./styles/style.css`

### Structure Of Scripts
- Every feature has its own folder e.g. account,games, teams etc.
- Every feature folder contains a [feature].service.js class e.g. `./scripts/account/account.service.js`, this class hold static variables and methods that abstract that feature's business logic.
- Every feature has [page].view.js scripts for handling DOM manipulation for each given html page in that feature. E.g. `./scripts/account/signin.view.js` for the `./signin.html`
- In cases where HTML is dynamically loaded over more than 1 page a [feature].template.js file is created. For instance the app bar is dynamically loaded instead of rewriting the html in every-file we use `./scripts/home/main.template.js` to handle this and all the files that need to use the appbar just need to reference the script.

### Example
Below is an example of how the teams feature was implemented, all the other features where implemented following this same pattern.

1800_202510_BBY02/\
├── scripts/\
│   ├── teams/ *All logic relating to fetching, creating, updating, deleting teams is encapsulated here*\
│       ├── teams.service.js - *business logic functions like loadAllTeams(), getTeamById() and static variables like userOwnedTeams*\
│       ├── teams.view.js -  *DOM manipulation for `teams.html` only reference there*\
│       ├── teams_details.view.js - *DOM manipulation for  `teamDetails.html` only referenced there*\
│       ├── edit_team.view.js - *DOM manipulation for  `edit-team.html` only referenced there*\
│       ├── add_team.view.js - *DOM manipulation for  `add-team.html` only referenced there*\
│   ├── utility/\
│       ├── *general helper functions used across all services*\
├── add-team.html\
├── edit-team.html\
├── teamDetails.html\
├── teams.html\


### Entire folder structure
1800_202510_BBY02/\
├── .idea/\
│   ├── xml files\
├── .vscode/\
│   ├── settings.json\
├── images/\
│   ├── all images and test images used for our app in png, jpg, and ico\
├── scripts/\
│   ├── account/\
│       ├── javascript files for account and sign in/up services\
│   ├── games/\
│       ├── javascript files for game page services\
│   ├── home/\
│       ├── javascript files for main page services\
│   ├── league/\
│       ├── javascript files for leagues page services\
│   ├── notifications/\
│       ├── javascript files for notification page services\
│   ├── teams/\
│       ├── javascript files for team page services\
│   ├── utility/\
│       ├── javascript files for database page services\
├── account.html\
├── addGame.html\
├── add-team.html\
├── contactus.html\
├── eachLeague.html\
├── editGameDetails.html\
├── edit-team.html\
├── gameDetails.html\
├── games.html\
├── index.html\
├── league.html\
├── main.html\
├── notifications.html\
├── privacypolicy.html\
├── signin.html\
├── signup.html\
├── teamDetails.html\
├── teams.html\
├── package-lock.json\
├── README.md\
└── .gitignore\

## Contributors
- **Ken Lee** - BCIT CST Student in Term 1 with a passion for sports, exercise, and bringing people together. First year learning how to code!
- **Rodrick Vy** - A Term 1 CST student at BCIT, passionate about briging 💻 software, 🏢 business and 🎨 design together to solve problems.

---

## Acknowledgments
- Code snippets for ___ algoirthm were adapted from resources such as [Stack Overflow](https://stackoverflow.com/) and [MDN Web Docs](https://developer.mozilla.org/).
- Icons sourced from [FontAwesome](https://fontawesome.com/) and images from [Unsplash](https://unsplash.com/).
Used icons during the front-end process and the navbar
- Image of Richmond Oval obtained from URL: https://www.centaurproducts.com/project/richmond-olympic-oval/
Used for the slideshow on the main page as front end UI.
- Image of Moscrop Secondary Gym obtained from URL: https://www.studyinburnaby.ca/school/moscrop-secondary-school/
Used for the slideshow on the main page as front end UI.
- Image of Cambie Community Centre obtained from URL: https://www.mapquest.com/ca/british-columbia/cambie-community-centre-456541330
Used for the slideshow on the main page as front end UI.
- Image of Hastings Community Centre obtained from URL: https://hastingscc.ca/?p=27
Used for the slideshow on the main page as front end UI.
- Images from Stock Photos obtained from URL: https://www.istockphoto.com/search/2/image-film?family=creative&phrase=volleyball
Used during the initial loading interface for descriptions of the app
- Images from Stock Volleyball Silouhette photos obtained from URL: https://stock.adobe.com/ca/search/images?k=volleyball+silhouette
Used during the sign in and sign up portion as appearance for a transition effect to the app

---

## Limitations and Future Work
### Limitations
- Currently, RECREA-8 has a simple email and phone call function between users but no messaging system.
- RECREA-8 only supports recreational volleyball leagues specifically in the Lower Mainland of BC.
- No search function as there isn't too much data involved in any of the features at the moment.
- The user interface can be further enhanced for accessibility.

### Future Work
- Adding a full-on messaging system and friend function to add different users after subbing or requesting for subs.
- Implementing the goal and idea onto other sports within BC, such as basketball, soccer, and more.
- Implementing the goal and idea to have a community centre drop in function to expand beyond recreational leagues.
- Integrate more game and team filtering options to time and location, leagues, and favorites.
- Create a dark mode for better visibility options, possible color background changes, as well as language selectors.
---

## License
This project is licensed under the BSD License. See the [LICENSE](/LICENCE.txt) file for details.


## Link
- [Web application](https://bby02-1800.web.app/)
- [Figma prototypes](https://www.figma.com/design/ojJg6ApruygbLukPiNpe4a/COMP-1800-Projects?node-id=0-1&t=xvhUKlzqClVW5RUP-1)
- [Figma brainstorm board](https://www.figma.com/board/lrPwQbswbuhzpH9HJvbkiF/Brainstorm?node-id=145-724&t=38zcqa8GLpx5VcRy-1)
