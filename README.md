# GitHub Profile Search

The goals of this challenge is to see whether you can:

- Do excellent front end development. You don’t have to know angular2 or material design or typescript--but it sure helps.
- Demonstrate some more advanced knowledge of Angular. If you don't have this knowledge, demonstrate that you can learn it well and quickly enough to make use of it here.
- Demonstrate advanced knowledge of modern Javascript.

## Getting started
1. Make sure you have node (>= v6.10.0) and npm (>= v5.3.0) installed. 
1. Fork this repository.
1. Check out the branch with your name on it (obviously, there are other candidates for this job, so there will be other branches, possibly with commits added to them for this same challenge. Don't cheat, because we'll know.
1. If you do not have latest angular cli installed, run `npm install -g @angular/cli`
1. Run `npm install`
1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## General Guidelines
- Feel free to use the internet, except see the note about cheating, above.
- We recommend that you spend a maximum of one workday, but it's really up to you. This is your big chance to show what you can do. So don't kill yourself, endanger your current job or your marriage, just do the best you can to highlight your abilities. We'd prefer to see some of the items completed from the task list below, as opposed to all of the items being halfway done or looking shoddy. Frankly, the task list is long on purpose, we don't expect you to complete everything.
- The project has [Angular Material](https://material.angular.io/) incorporated. Feel free to use it. Feel free to use something else too.
- Before you start coding, create a branch off of the one with your name on it.
- When you're done, send a pull request, proposing to merge your branch into the one with your name on it.
- Be prepared to explain your design and your code. Better yet, document it!
- Organize the code however you like.
- Pretend this is a real app that other people will look at and use. In other words, it should look good, and work well and easily.
- If you get stuck, you can ask for help.

## Task List

### Get the Darn Thing to Build and Run

As checked out, this thing may not build or run. Your first task is to get it to do so. Good luck. 

### Fetch User Data and Display User Profile

For this, you'll be using the GitHub API. Use: `https://api.github.com/search/users?q=eric` to search for users. It takes a search string passed as parameter 'q'.

1.	Create a text box in the main component under src\app\main to take a search string by using the above mentioned API call.
2.	From the search result display the total number of github users found in the search.
3.	Display first 10 users in the search result.
4.	Allow sorting by the "id" field and the "login" field.
5.	Allow the user to filter the list by the "site_admin" field. E.g., a checkbox that says "Show Only Site Admins" or some such.
4.	For each of the ten users, show:
    - Their avatar (the actual picture), unless they have a gravatar, in which case, show that instead.
    - Their username, which is a hyperlink to their GitHub page.

Extra points: Implement unit tests for the sorting & filtering functions.

### Add Some Action Buttons

For this, you'll have to do some research on the GitHub API.

For each user in the list of ten, enable the following actions:

1. A button that, when clicked, will open a panel immediately below the user entry, listing links to any Gists they've authored.
2. A button that, when clicked, will open a panel immediately below the user entry, listing links to any repositories they've contributed to.
2. For extra points, disable any button whose click would lead to a panel with no results, and change the text of that button to say "No Gists" or "No Repos".

When any button is clicked, it should close any panel that's already open.

### Styling

Use SASS, LESS or your favorite way of coding style rules to style this app.

We're not hiring you for your design skills, we just want to see if you can:

- Write styles in a sane manner.
- Make things look halfway decent.
- Get your style rules pre-processed as part of the build process.

### Add a Favorites List

1. For each user in the list, enable some way to mark them as a "favorite", and show a list of favorites in a separate panel, either to the right or at the bottom. 
2. Make sure that you can remove them from this list.
3. Make sure that if the page is refreshed, this list persists. No server-side code.
4. Extra points: Make the favorites list reorderable through drag and drop.

### Angular Stuff

For each of the users in the list of ten, create a link or button to separate view, just for that user. On this page, show some basic info from their GitHub profile, but also make a call to the following web service:

```
https://randomuser.me/api/
```

Build a nice profile page. It's up to you what "nice profile page" means, but some suggestions:

- Include a picture.
- Any dates should be formatted for human people.
- From their birthdate, calculate and display their age, down to the second. Extra points: Consider what time zone the user is in.
- Make sure any "international" characters display properly.
- Show some information about the country they're from.

You should be using the Angular Router here.

### Javascript Stuff

Implement *your own* client-side caching mechanism that can be used for any API call that retrieves data. Any cached data should be purged after two minutes, and this timer should reset any time the cached entry is hit. Then, for any API call you make in this app, use cached data whenever possible.

Extra points: Implement this as an Angular service.

### Extra, Extra Points

Come up with a cool feature to add to this app and implement it. Show off your Javascript-fu, your Angular-fu or whatever Fu you got going on.









