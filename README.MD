# Blog Project backend part !
## Supported functionality:
### "/posts" HTTP API: 
* get request "/posts" -> retrieve all posts
* get request "/posts/:#" -> retrieve post with id #
* post request "/posts" -> add new post, request body should contain both title and content {title, content}
* put request "/posts/:#" -> update post with id #, request body should contain either title, content or both {title?, content?}
* delete request "/posts/:#" -> delete post with id #