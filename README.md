## Content Management System for College Team
This is the free and open source content management system for college team to get their team online . This CMS is made in MEN (MongoDB,Express and Node js) stack.

### Dependencies 

    "body-parser": "^1.19.0",
    "ejs": "^3.0.2",
    "express": "^4.17.1",
    "express-sanitizer": "^1.0.5",
    "express-session": "^1.17.1",
    "mongoose": "^5.9.10",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^6.0.1"
### To Run the code
```node app.js```-To run the CMS in local. The data will store in CMS in mongoDB.
There are some sample data attached with the project in public folder.

### Important to note:
First user is considered as admin and only admin can visit admin portal.
To visit admin portal go to the route ```localhost:3000/admin```
