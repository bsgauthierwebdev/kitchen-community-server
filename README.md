README.md

Kitchen Community API

# Kitchen Community
https://kitchen-community.vercel.app/

This API allowes users to view and post folders and recipes, as well as delete recipes.

## Endpoints

### Folders Endpoints
POST/api/folders
Name        Type        In      Description
id          string      body    REQUIRED
name        string      body    REQUIRED

<li>Status: 400 `Missing '${key}' in request body`</li>
<li>Status: 201</li>

GET/api/folders/:folderId
<li>Status: 404 `Folder doesn't exist`</li>

PATCH/api/folders/:folderId
<li>Status: 400 `Request body must contain a name`</li>
<li>Status: 204</li>

DELETE/api/folders/:folderId
<li>Status: 204

### Recipes Endpoints
POST/api/recipes
Name            Type        In      Description
id              string      body    REQUIRED
modified        string      body    REQUIRED
description     string      body    REQUIRED
prepTime        string      body
cookTime        string      body
servings        number      body
ingredients     string      body    REQUIRED
directions      string      body    REQUIRED
folderId        number      body    REQUIRED

<li>Status: 400 `Missing '${key} in request body'</li>
<li>Status: 201</li>

GET/api/recipes/:recipeId
<li>Status: 404 `Recipe doesn't exist'</li>

PATCH/api/recipes/:recipeId
<li>Status: 400 `Request body must contain a 'name', 'description', 'directions' or 'folderId' field`</li>
<li>Status: 204</li>

DELETE/api/recipes/:recipeId
<li>Status: 204

## What is Kitchen Community?
<hr />
<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20home-page-1.jpg'>

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20home-page-2.jpg'>

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20home-page-3.jpg'>

Kitchen Community is a crowd-sourced application for home cooks to share their ideas, inspirations and passions.

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20about-us.jpg'>

With Kitchen Community, people can find new and exciting meals to make for their families without the pressures of matching the talents of a celebrity chef, or creating Instagram and Pintrest worthy meals. Good food and new ideas for regular people.

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20recipe.jpg'>

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20recipe.jpg'>

With Kitchen Community, the users help to create the content and help organize their submissions.

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20add-recipe.jpg'>

<img src = 'https://github.com/BsgauthierWebDev/kitchen-community/blob/master/images/screenshot%20-%20add-folder.jpg'>

<hr>

## API Documentation
<a href = 'https://github.com/BsgauthierWebDev/kitchen-community-server'>Kitchen Community API source code</a>

<hr>

## Technology Used
<ul>
    <li>Javascript</li>
    <li>React</li>
    <li>JSX</li>
    <li>HTML</li>
    <li>Express</li>
    <li>Node</li>
    <li>SQL</li>
    <li>Heroku</li>
    <li>Vercel</li>

# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's main branch.