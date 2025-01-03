# EVERSPACE™ Builder (ESBuilder)

**Shoot. Loot. Share.**  
https://esbuilder.onrender.com/  
Created by WildCharger  
\-\-\-\[|| [Twitter/X](https://x.com/wildchargergame) || [YouTube](https://www.youtube.com/@WildCharger) || [LinkedIn](https://www.linkedin.com/in/ethan-guan-ba453a2a0/) ||\]\-\-\-

EVERSPACE™ Builder (shorthand ESBuilder) is an online platform that allows users to create, manage, & share customized loadouts for the game EVERSPACE™, a deep space combat simulation with roguelike & story-based elements released in 2017 by ROCKFISH Games GmbH. This application serves as a tool for players to assemble their own ship, enhancement, & equipment configurations, using a GUI that reflects the menus in the game itself as closely as possible. This makes it possible for players to do things such as record in-game loadouts they have created in the past, plan for loadouts they may seek to build in the future, or create loadouts to help other players, among other possibilities.

Learn more about EVERSPACE™ on its [official website](https://classic.everspace-game.com/game/), or purchase it on [Steam](https://store.steampowered.com/app/396750/EVERSPACE/) or [GOG](https://www.gog.com/en/game/everspace).

This web application is currently in _**early beta**_. Functionality is present, but significant bugs are likely to be present, and many edge case scenarios have likely not yet been caught. Testers are encouraged to use the Issues board to submit problems with the application as needed.

The loadout builder has been built to be compatible with the widescreen (16:9) aspect ratio, tested at the minimum resolution of HD 720p up to a resolution of 2K 1440p. Screen resolutions above or below this are not guaranteed to display properly.

## Installation
Due to ESBuilder's reliance on image asset delivery, it is not currently possible to fully install with complete functionality. Local installation is still possible for the technically inclined; however, most images & icons will not display properly, and as a result may cause issues with style layout. At present, a local application version of ESBuilder is not planned; however, anyone is welcome to clone this repository and use it for reference in your own project(s).

## Roadmap
The current goal is to make ESBuilder proficient at its core functionalities, as well as their accuracy to the original game. Features that require completion in order to achieve this currently take top priority, including:
* Stat numbers that have been properly formatted & appear with their respective units of measurement
* Ship stats visually appearing influenced by installed Enhancements & Equipment (e.g. installing the Splitter enhancement reduces the ship's Secondary Weapons slot number to 1)
* Equipment stats visually appearing influenced by installed Enhancements & Mods (e.g. outfitting a Teleporter with Energy Consumption Mods causes the displayed Energy Consumption stat to decrease accordingly)
* Comprehensive Primary Weapon & Device Enhancement, allowing players to define the differences of _applicable_ Equipment from their basic versions within reasonable restrictions

Additionally, in order to ensure that Loadouts remain accessible as more are added: 
* The Recent Loadouts page will be completed, properly ordering loadouts by newest first, and allowing users to see more than just ten.
* A basic profile system will be implemented, allowing users to see all of the loadouts they specifically have created.

Once this goal has been achieved, further development will only continue if there is sufficient interest in the project from EVERSPACE™ players. Long-term goals include, but are not limited to:
* Additional loadout details, including the option to input the player's run number/name.
* A more comprehensive profile system that allows users to share unique elements such as their favorite Ship, Weapon, or Enhancement. 
* A completed user system that allows for the modification of user details as well as account deletion.
* A search feature that finds loadouts by name.
* The ability to save existing loadouts locally as images, thereby allowing them to be shared offline.
* Some way, somehow, maybe allow users to upload a save file of their current run, and decipher the loadout data from it. This one's a massive reach.
* Implementation of player progression. This allows players to change what perks, preset loadouts, etc. they have unlocked, and having the loadout builder optionally reflect the applicable differences as a profile setting. This would be the last stretch goal to complete ESBuilder, and mark the end of its extended development cycle; any other major features would be implemented before this.

## Credits
As with many applications, ESBuilder was built on a foundation of many other packages & modules that make it possible.
### Backend
* Application powered by [Express](https://expressjs.com/), [Morgan](https://github.com/expressjs/morgan), & [Sequelize](https://sequelize.org/), with assistance from [dotenv](https://www.dotenv.org/), [Helmet](https://helmetjs.github.io/), & [bcryptjs](https://github.com/dcodeIO/bcrypt.js), among others.  
* Database developed in [SQLite](https://www.sqlite.org/) and deployed using [PostgreSQL](https://www.postgresql.org/).  
* Image asset delivery provided by Amazon Web Services S3 using [AWS SDK](https://github.com/aws/aws-sdk-js). Note that the AWS SDK v2 will reach end-of-support on September 8, 2025, and use of [AWS SDK v3](https://github.com/aws/aws-sdk-js-v3) is recommended for new projects.  
* Special thanks to [Chalk](https://github.com/chalk/chalk) for letting me assemble a development logging system that stands out and is easily recognizable & findable in a sea of other messages.

### Frontend
* Application is powered by [ReactJS](https://react.dev/), [React Redux](https://react-redux.js.org/), and [React Router](https://reactrouter.com/), with assistance from [JavaScript Cookie](https://github.com/js-cookie/js-cookie), [Redux Thunk](https://github.com/reduxjs/redux-thunk), and [Reselect](https://github.com/reduxjs/reselect).
* Website icon SVGs provided by [React Icons](https://react-icons.github.io/react-icons/). High-resolution background images provided by various wallpaper sites.
* Special thanks to [use-fit-text](https://github.com/saltycrane/use-fit-text) for allowing text all around the site to dynamically scale based on current screen size.

### And, of course...
Credit belongs to ROCKFISH Games for creating EVERSPACE™. I've been playing their games ever since the original Galaxy on Fire on iOS - and it was Galaxy on Fire 2 that led me to being a big part of one of the greatest internet communities I could have ever asked to join. 

Almost all of the website's image assets are sourced from EVERSPACE™ itself, and its UX was the basis for the design of the loadout builder.