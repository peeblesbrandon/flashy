# flashy 
> _create, study, and share your flashcards_  

Intuitive and social fullstack **flashcard application** built using a responsive **React/Redux** frontend (featuring a **Materal UI** design) connected to a **NodeJS/ExpressJS/MongoDB** backend. The ExpressJS server is designed as **REST API** which features **jsonwebtoken authentication via PassportJS**.  

## Demo  
Test out the live demo [here](https://limitless-beach-55214.herokuapp.com/) (deployed on Heroku).  
_**Note:** this app is still in development as of 9/17/2020_  

## Getting Started
In order to deploy on localhost, you will need to first clone the app and install the required npm packaged dependencies.  

**Clone the repo:**  
`git clone https://github.com/peeblesbrandon/flashy.git`  

**Install server dependencies:**  
```
cd flashy
npm install
```  

**Install client dependencies:**  
```
cd client
npm install
```  

**Configuration:**  
The server will expect to connect a MongoDB instance referenced in a `.env.` file. You can create a remote one at [https://account.mongodb.com/](https://account.mongodb.com/) to get your own URI. Once you have that, navigate to the main directory and create a `.env.` file.
```
cd ..
touch .env
```  

Add your enviornment variables in the following YAML format:
```
DATABASE="YOUR_MONGO_URI_WITH_USERNAME_PASSWORD_AND_DATABASE_NAME"
NODE_ENV=development
secretOrKey="YOUR_SECRET_OR_KEY_HERE"
```
Alternatively, you could use `mongodb://127.0.0.1:27017/FLASHY`as your URI above if you would rather use a local MongoDB instance. This requires that you have MongoDB installed on your local machine (which you should if you followed the above steps). For more info on setting up a local database, see this [blog](https://zellwk.com/blog/local-mongodb/).  

**Execute the startup script:**
This will simultaenously start the client and server using nodemon.  
`npm run dev`  

That's all folks!

## Test API locally using Postman
If you'd like to test the various endpoints of the REST API used in the Express server, you can reference the documentation published [here](https://documenter.getpostman.com/view/12210427/TVKA5KFJ).  

To summarize, it supports the following endpoints:
**Authentication**
|REQUEST TYPE|ROUTE|DESCRIPTION|  
|---|---|---|  
|POST|api/users/register|Register new user|  
|POST|api/users/login|Log user in|  

**Decks (requires Bearer Token in Authorization header to perform below actions on documents associated with that user)**  
|REQUEST TYPE|ROUTE|DESCRIPTION|  
|---|---|---|  
|GET|api/decks|Get all decks for a given user based on auth token|  
|POST|api/decks|Create new deck (blank unless body provided)|  
|GET|api/decks/:id|Get specific deck by id|  
|DEL|api/decks/:id|Delete specific deck by id|  
|POST|api/decks/:id|Create new deck (blank unless body provided)|  
|PATCH|api/decks/:id/cards|Update cards array of deck by deck id|
|PATCH|api/decks/:id/cards/:cardId|Update specific card by card and deck ids|  
|DEL|api/decks/:id/cards/:cardId|Delete specific card by card and deck ids|  


## Deploy to Heroku  
_Instructions coming soon_

## Built with
* ReactJS
* Redux
* ExpressJS
* NodeJS
* MongoDB
* Mongoose
* Materialize CSS & Material-UI
* Axios
* PassportJS
* jsonwebtoken
* bcryptjs  

## Authors
Brandon Peebles

