# cs465-fullstack
cs-465 full stack development with MEAN stack

This project is a full-stack application for a hypothetical Travlr Getaways, with a customer-facing website built with Express and a single-page application (SPA) admin interface developed with Angular.
--------------------------------
Architecture
Frontend

Client-facing website: Built with Express, using server-side rendering 
Admin SPA: Developed with Angular, with dynamic data loading as an SPA

Backend

Express.js server: Handles API requests for the customer-facing website
MongoDB: NoSQL database for its scalability and varied data structure.
------------------------------------
Refactoring

JSON is a data format between the frontend and backend, while Javascript is a programming language.
it ties the front end and backend allowing for a seamless exchange of data between the two, it also works greatly with MongoDB

refactored the UI to allow for modular design ( trip-card), which improves maintainability. 
Created services for data fetching, and improving codebase structure. In both cases, these two refactors make the code reusable

--------------------------------------
Testing

We tested API Endpoints to ensure they are working

GET /api/trips: Retrieve all trips, Post / Add a new trip etc
I also used Postman for API endpoint testing. Security addition made the process a bit more tricky
since a valid JWT token is needed to make API calls. So first an account should created, login, then you can call the API.

------------------------------------------
Reflections

I've developed a comprehensive understanding of both frontend and backend technologies in this course. I have watched a lot of online tutorials,
regarding full stack, but the tutorials never explained why we do this or why we do that, this was especially made clear in the security assignment 7_1, the last assignment was a great introduction to security, albeit a bit tricky, But that is due to the nature of authentication being tricky. This course most definitely did make understanding better than the online tutorials. I now, can use my newfound and most importantly, solid foundations to improve my full-stack abilities further and improve my career outcomes.
