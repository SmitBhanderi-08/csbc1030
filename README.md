# csbc1030

## Final Project

1. Clone the Project
 
2. Navigate to the Project Directory
- cd CSBC1030

3. Install Dependencies
- npm install

4. Database Setup
- CREATE DATABASE final_project;

5. Configuration
- Open the config.js file in a text editor.
- Update the database connection details (host, user, password, database) to match your local MySQL setup.

6. Start the ExpressJS Server
- node app.js

7. Testing Endpoints
- Use a GET request to http://localhost:3000/users to fetch all users.
- Use a POST request to http://localhost:3000/login to obtain an authentication token.
    {   
        "username": "your-username",
        "password": "your-password"
    }

- Use a GET request to http://localhost:3000/posts to fetch all users.
- Use a POST request to http://localhost:3000/posts/1 to fetch a single post made by the authenticated users.
- Use a POST request to http://localhost:3000/posts/1/comments to fetch all comments about a post.
- Use a POST request to http://localhost:3000/posts to create a new post.
    {
        "title": "New Post",
        "body": "This is the content of the new post."
    }

- Use a POST request to http://localhost:3000/posts/1/comments to add a new comment to a post.
    {
       "text": "This is a new comment on the post."
    }

- Use a PATCH request to http://localhost:3000/posts/1 to update a post.
    {
        "title": "Updated Post Title",
        "body": "Updated post content."
    }

- Use a PATCH request to http://localhost:3000/posts/1/comments/1 to update comment.
    {
    "text": "Updated comment text."
    }

- Use a DELETE request to http://localhost:3000/posts/1/comments/1 to delete a comment.

8. Reviewed Terminal Output
- In the terminal where your ExpressJS application is running, reviewed the logs and output for any errors or successful requests.

