## Content Management System for College Team
This is used to manage the content of the college team. This provides salted encryption for all passwords. Have a separate admin portal. This is buit on nodejs, mongodb and express,

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

### Collections :
In the first run the server will create 4 collections in CMS database
1.announcements
2.forms
3.pages
4.users
