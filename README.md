# BLOG App
This is an api for a Blog App. The API has a general endpoint that shows a list of articles that have been created by different people.

---
## Installation

 
---
## Requirements

1. Users should have a `first_name`, `last_name`, `email`, `password`
1. User should be able to `signup` and `sign in` into the Blog App.
1. A blog can only be in two state; `draft and published`
2. User should be able to login with Passport using `JWT` as authentication strategy and expire the `token` after `1 hour` 
3. Implement basic auth.
4. Users should be able to get the Blogs - `logged in and not logged in users`
4. when a Blog is created, it is in `draft` state
5. `Login Users` should be able to create a Blog.
6. The owner of the Blog should be able to update and edit the Blog.
6. The owner of the Blog should be able to get a list of their blogs
   - The endpoint is paginated to 20 blogs per page
   - It should be filterable by state   
7. Blogs created should have `title`, `description`, `tags`, `author`, `timestamp`, `state`, `read_count`, `reading_time` and `body`
8. Test application
---

## Setup / Installation
- Install NodeJS, Mongodb
- pull / clone this repo
 - install npm packages `npm install`
 - update env variables in  `.env`

---
## Base URL
- somehostsite.com


## Models
- Blog
- User
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  email |  string |  required |
|  first_name | string  |  required|
|  last_name  |  string |  required  |
|  password |   string |  required  |



### Blog
| field  |  data_type | constraints  |
|---|---|---|
|  title |  string |  required |
|  description |  string |  required |
|  author | string  | not-required |
|  state  |  string | default: draft  |
|  read_count     | number  |  not-required |
|  reading_time |   string |  not-required  |
|  tags |  string |  required |
|  body |  string |  required |
| timestamp |  date | not-required |


 
## APIs
---

### Homepage Endpoint
- All the published blogs will be rendered when you visit the home route `http://0.0.0.0:5000/blog `
- Default pagination is 20 blogs per page
- Both logged in and not logged in users can access this endpoint
- You can search for blogs author, title, and tags by adding `author`, `title`, or `tags` to your query params
- To search by author: Both first name and last name are required. `e.g. kyle xy`
- You can order your search results by read count, reading time, or timestamp in `asc or desc order`
- Add read_count, reading_time, or timestamp to your query with value of either `asc or desc`
- `You can request for a single blog by specifying the id of the blog. When you do, the read count of the blog will be increased by 1. [e.g. http://localhost:5000/blog/6360711fd485dae577d39afa]`

### Signup User Endpoint

- Route: /signup
- Method: POST
- Body: 
```
{
  "email": "risingOdegwa@example.com",
  "first_name": "Rising",
  "last_name": "Odugwa",
  "password": "password",
}
```

- Responses

Success
```
{
  "message": "Signup Successful",
  "user": {
    "email": "risingOdegwa@example.com",
    "first_name": "rising",
    "last_name": "odugwa",
    "password": "$2b$10$jA1KzF/hy33tNflx88uj5.EuoHELnQBhjXYtZa2.NBLGs0Uw3d/8C",
    "_id": "6364601bec777a93fce322ce",
    "__v": 0
  }
}
```
---
### Login User Endpoint

- Route: /login
- Method: POST
- Body: 
```
{
  "email": 'risingOdegwa@example.com",
  "password": "Password",
}

```
- On a success login, the user will be assigned a token toaccess the protected endpoints.
- The token is set to expire after 1 hour
---

- Responses

Success
```
{
    message: 'Login successful',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNjQ2MDFiZWM3NzdhOTNmY2UzMjJjZSIsImVtYWlsIjoicmlzaW5nT2RlZ3dhQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6InJpc2luZy4iLCJsYXN0X25hbWUiOiJvZHVnd2EuIn0sImlhdCI6MTY2NzU0ODMwMSwiZXhwIjoxNjY3NTUxOTAxfQ.dt-dDd8l4psgzMNM63UwkQnqERxDQbbTc_Yz3WNaL4s'
}
```

---
### Create Blog

- Route: /blogs
- Method: POST
- Header
    - Authorization: Bearer `{token}`
- Body: 
```

  {
    "title": "A man of Knowledge",
    "description": "Learning",
    "body":" Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. mentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metuskmsaksaksakjsjsjsjsj sjsjsjsjsjsjsjsjsjsjs sjsjsjsjsjssssssssssss sjsjhsbssbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbhsghssjsjsjsjsjsjsj djjjjjjjjjjjjjjdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjli",
    "tags": "God, knowledge, Divine"
  }
```

- Responses

Success
```
{
  "message": "Blog created Successfully",
  "blog": {
    "title": "A man of Knowledge",
    "description": "Learning",
    "author": "rising. odugwa.",
    "state": "draft",
    "read_count": 0,
    "reading_time": "2.768 minutes",
    "tags": [
      "God, knowledge, Divine"
    ],
    "body": " Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. mentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felisis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metuskmsaksaksakjsjsjsjsj sjsjsjsjsjsjsjsjsjsjs sjsjsjsjsjssssssssssss sjsjhsbssbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbhsghssjsjsjsjsjsjsj djjjjjjjjjjjjjjdjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjli",
    "author_id": "6364601bec777a93fce322ce",
    "_id": "6364c529735f57e9f417675d",
    "createdAt": "2022-11-04T07:54:17.866Z",
    "updatedAt": "2022-11-04T07:54:17.866Z",
    "__v": 0
  }
}
```
---
### Get All Blogs created by Users

- Route: /blogs
- Method: GET
- Header
    - Authorization: Bearer `{token}`

  
- you can filter blogs by state


---

### Update Blog Endpoint

- Route: /blogs
- Method: PATCH
- Header:
    - Authorization: Bearer {token}
- Blog in  `draft` can be published by setting the value of the state to `published`
- #####  A user can not update another user's blog 
- Responses

Success
```
{
  "message": "Unauthorized! You cannot update another user's blog"
}
```
---

### Delete Blog Endpoint

- Route: /blogs
- Method: DELETE
- Header:
    - Authorization: Bearer {token}
    ```
    http://0.0.0.0:5000/blogs/63606e3ad485dae577d39af3
     ```



- You can delete the state of blogs in draft to published from this endpoint
- HOW TO USE:
Make a DELETE request to `/blogs/{blog_id}` endpoint. `{blog_id}` is the id of the blog that you want to update.
- #####  A user can not delete another user's blog 
- Responses

Success
```
{
  "message": "Unauthorized! You cannot delete another user's blog"
}
```
---

## License

[MIT](LICENSE)