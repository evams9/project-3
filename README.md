# Recipe Collector

​

## Description
​
This repository is the REST API for the [frontend repository XXX](link). It allows users to create and organize their recipes.

## User can
- Sign up: The user can create an account.
- Log in: The user can log in in the website.
- Log out: The user can log in in the website.
- Homepage: The user can see their recipes and add more.
- Add recipe: The user can complete the characteristics of the recipe that is adding.
- See recipe: The user can consult the information added to the recipe.
- Edit and delete recipe: The user is going to be able to edit and delete the recipes owned.
- 404: Visualice an error message when the page is not found.
- 500: Visualice an error message when there is a server error.

## Backlog
- Edit profile: The user can edit his profile.

## Models


### setup .env

you need to setup the `.env` like `.env.sample`
​

### Install the app

```
npm install
```

​

### Run the app

```
npm run start
```

​

## REST API endpoints

​
| Name | Method | Endpoint | Auth | Req.body | Redirects |
|-------|--------|-------------|------|---------------------|-----------|
| Home | GET | / | Yes | | |
| Log in | POST | /auth/login  | No | { email, password } | / |
| Log in form | GET | /auth/login  | No | | / |
| Log out | POST | /auth/logout | No | | / |
| Sign up | POST | /auth/signup | No | { email, password } | / |
| Sign up form | POST | /auth/signup | No | | / |

## Links

- [Slides]()
- [Frontend repository]()
- [Deployed version]()
