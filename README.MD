# Blog Project Express.js Server

### Render Cloud URL: 
https://react-client-d2vl.onrender.com \
It might take a minute for the server to wake up. \
I added ilia's grunitech email as a test email in my google oauth configurations so that he can sign in and test the application. \
Supported image formats: png/jpeg/gif 

### .env file :
DB_USER=postgres \
DB_HOST=localhost \
DB_NAME=blog_db \
DB_PASSWORD=12345 \
DB_PORT=5432 \
CLIENT_ID= \
CLIENT_SECRET= \
GOOOLE_AUTH_REDIRECT_URL= \
JWT_SECRET= \
PROJECT_ID= \
IMAGE_BUCKET= \
KEY_FILEPATH=

### Utilized Libraries:
* cookie-parser
* cors
* dotenv
* express
* google-auth-library
* jsonwebtoken
* morgan
* multer
* pg
* uuid

### Notes:
I implemented a file upload system using the multer library
to parse the user's images. This functionality would not work
without my (or your) google keys.
Same goes with the Google authentication system. Setting yourself
as an admin can only be done by manually querying the database.


