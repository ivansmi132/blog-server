# Blog Project Express.js Server

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
without my (or your) google keys. I will shortly host the project
on the cloud, and attach the link so that the complete blog functionality
can be tested. For now, do not try to upload images on post creation.
Same goes with the Google authentication system. Setting yourself
as an admin can only be done by manually querying the database.


