# manage-equipments-for-fun
A simplistic app to manage equipments (authed) for a scheduled discussion

## Product Context
This project portrays a really simple workflow, where multiple users (a.k.a Contractors) can book from a given list of equipments.
A super-user (a.k.a Admin Contractor) can see all the booked equipments on a separate screen.

Since there are mainly 2 types of users in this project, I've implemented both Authentication & Authorization using JWT mechanism.
This means, once the users log in, they have to store the JWT on their end, that is given to them by the server upon successful login.

HLD (high level design) of Login Flow is given below:
![Screenshot 2022-04-12 at 12 50 34 AM](https://user-images.githubusercontent.com/26059018/162813911-835382cd-9009-4a53-83ca-fe4cd77e5d5b.png)

HLD of Booking & Admin Screens flow is given below:
![Screenshot 2022-04-12 at 12 57 57 AM](https://user-images.githubusercontent.com/26059018/162815016-505af0a3-7d8d-440f-bcac-7965414c2443.png)

_When users clicks `Sign Out`, we just clear their browser Cookies, thereby disabling them to execute authed APIs_

## Project Structure

    .
    ├── client-react                   # The frontend of project (built in React v17.x)
        ├── public                     # Contains assets (e.g: images, favicons, & other cacheable CDN stuff)
        ├── src/api/fetchApis.ts       # An abstract utility that contains `GET, POST` request implementations using `fetch`
        ├── src/base-components        # Contains all the static `design` React components, like `Heading`, `Button`
        ├── src/routes                 # Contains the React component screens, that are accessible via `React Router Links` (v4.x)
        ├── src/tests/                 # I've added some simple integration tests with mocked backend APIs
        ├── index.tsx                  # The starting point of React Component Hierarchy
        ├── index.css                  # A common CSS file, containing omnipresent styling
        ├── setupProxy.js              # Enabled CORS requests, for sending cross-origin APIs from React to Nodejs server
        ├── setupTests.ts              # Declared common Adapters, initializers for `enzyme`, `jest` used for FE testing
    
    ├── server                         # The backend of project (built in Node, Express, PG ORM)
        ├── routes                     # Contains API definitions for `Login, Booking equipments, Showing all equipments)
        ├── secrets/constants.js       # Contains the JWT secret, that is used by `jwt library` to encode/decode tokens
        ├── app.js                     # All the interceptor & server configuration logic is written in this file
        ├── db.js                      # Contains the database credentials (should be put in Github secrets/1Password)
        ├── middleware.js              # Abstract logic like JWT creation, Handling API errors is written here
    ├── README.md                      
        
    
    
## Project Setup

As described above, this project is built using React, Node, Express & Postgres.

Before getting started, please install Postgres using `brew install postgresql` ([details](https://www.sqlshack.com/setting-up-a-postgresql-database-on-mac/))

* To run frontend react application on port 3000, please type:
```
cd client-react && npm install && npm start
```
* To run backend application on port 8080, please type:
```
cd server && npm install && npm run start
```

I was able to add only FE tests, hence to run tests, please type: `cd client-react && npm test`

## My immediate thoughts on what I can improve
- Should have added `CI` using `Github Actions`, so that each commit to this project's `main` branch automatically tests the project
- Should have added more tests using Cypress, so that end-to-end testing could test both frontend & backend in action.
- Should have been more abstract in making some React components common (e.g: Table)
- Should have thought to adopt top-down approach in React (props passed from parent down to its child components)
- Can make this project more styled

## Miscellaneous
1. Screenshot of Login Screen
<img width="1051" alt="Screenshot 2022-04-12 at 1 23 43 AM" src="https://user-images.githubusercontent.com/26059018/162818884-ab7e9a98-1139-41de-802a-dc963c7f2a23.png">

2. Booking Equipments (shown to all non-admin Contractors)
<img width="1665" alt="Screenshot 2022-04-12 at 1 28 46 AM" src="https://user-images.githubusercontent.com/26059018/162819742-e24907c3-d5eb-4b3c-91a0-6c8a7fe693ae.png">

3. Show all booked equipments (shown to only Admin Contractors)
<img width="1427" alt="Screenshot 2022-04-12 at 1 29 37 AM" src="https://user-images.githubusercontent.com/26059018/162819839-7a269d13-914c-43db-9bac-364264108364.png"> 
