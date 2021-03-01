My Assets App Server (ini punya kak fiqi)
My Assets App is an application to manage your assets. It performs standard CRUD actions based on RESTful concept.

This app has :

RESTful endpoint for asset's CRUD operation
JSON formatted response
 

Tech Stack used to build this app :

Node JS
Express JS framework
PostgreSQL
 

Global Responses
These responses are applied globally on all endpoints

Response (400 - Bad Request)

{
  "message": "<your message for 400>"
}
Response (401 - Unauthorized)

{
  "message": "<your message for 401>"
}
 

RESTful endpoints
GET /assets
Get all assets

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200)

[
  {
    "id": 1,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "description": "<asset description>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
GET /assets/:id
Get single asset as defined by the id provided

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200)

{
  "id": 1,
  "name": "<asset name>",
  "description": "<asset description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
POST /assets
Create new asset

Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
Response (201 - Created)

{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
PUT /assets/:id
Update an asset defined by the id provided

Request Header

{
  "access_token": "<your access token>"
}
Request Body

{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
Response (200 - OK)

{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
DELETE /assets/:id
Delete an asset defined by the id provided

Request Header

{
  "access_token": "<your access token>"
}
Request Body

not needed
Response (200 - OK) - Alternative 1

{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response (200 - OK) - Alternative 2

{
  "message": "asset successfully deleted"
}