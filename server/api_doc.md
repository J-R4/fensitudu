ENDPOINT:

1. `POST /login`
2. `POST /register`
3. `GET /todos`
4. `POST /todos`
5. `GET /todos/:id`
6. `PUT /todos/:id`
7. `PATCH /todos/:id`
8. `DELETE /todos/:id`
9. `POST /oAuth/`
10. `GET /weather`
11. `GET /quotes`

## 1. `POST /login`

Description =
User login with email and password

Request =

-   headers =

not needed

-   body =

        ```json
        {
          "email": "<email>",
          "password": "<password>"
        }
        ```

    Response (200 - OK) =

```json
{
    "access_token": "<access token>"
}
```

Response (500 - Internal Server Error)

```json
{
    "message": "<internal server Error message>"
}
```

## 2. `POST /register`

Description =
new User can register with unique email and their password

Request =

-   headers =
    not needed

-   body =

    ```json
    {
        "email": "<email>",
        "password": "<password>"
    }
    ```

Response (201 - CREATED) =

```json
{
    "email": "<email by user>"
}
```

Response (400 - BAD REQUEST) =

```json
{
    "message": "<bad request message>"
}
```

## 3. `GET /todos`

Description =

User can get list of all the todos

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    not needed

Response (200 - OK) =

```json
{
    "id": "<given id by system>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "UserId": "<todos association>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<Not Found message>"
}
```

## 4. POST /todos`

Description =

User can create their own todo

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    {
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    }

Response (201 - CREATED) =

{
"obj": {
"title": "<todos title>",
"description": "<todos description>",
"status": "<todos status>",
"due_date": "<todos due_date>"
}
}

Response (400 - BAD REQUEST) =

```json
{
    "message": "<bad request message>"
}
```

Response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server message>"
}
```

## 5. `GET /todos/:id`

Description =

User can get todos by the id

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    not needed

Response (200 - OK ) =

```json
{
    "id": "<given id by system>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "UserId": "<todos association>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<not found message>"
}
```

## 6. `PUT /todos/:id`

Description =

User can update the todos according to its id

Request =

-   headers =

    {
    "access_token": "<access token>"
    }

-   body =

    {
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>"
    }

Response (200 - OK ) =

```json
{
    "id": "<given id by system>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status>",
    "due_date": "<todos due_date>",
    "UserId": "<todos association>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (400 - BAD REQUEST) =

```json
{
    "message": "bad request message"
}
```

Response (500 - INTERNAL ERROR) =

```json
{
    "message": "<internal error message>"
}
```

## 7. `PATCH /todos/:id`

Description =

User can update the status of todos to become finished / work in progress / unfinished

Request =

-   header =

{
"access_token": "<access token>"
}

-   body =

(radio button)

{
"status": "<value of the selection between finished or work in progress or unfinished>"
}

Response (200 - OK) =

```json
{
    "id": "<given id by system>",
    "title": "<todos title>",
    "description": "<todos description>",
    "status": "<todos status depends of the chosen value of the selection>",
    "due_date": "<todos due_date>",
    "UserId": "<todos association>",
    "createdAt": "<date by system>",
    "updatedAt": "<date by system>"
}
```

Response (400 - BAD REQUEST) =

```json
{
    "message": "<bad request message>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<not found message>"
}
```

Response (500 - INTERNAL ERROR) =

```json
{
    "message": "<internal error message>"
}
```

## 8. `DELETE /todos/:id`

Description =

User can delete the todos by their selection according to its id

Request =

-   header =
    {
    "access_token": "<access token>"
    }

-   body =
    not needed

Response (200 - OK) =

```json
{
    "message": "<delete message>"
}
```

Response (404 - NOT FOUND) =

```json
{
    "message": "<not found message>"
}
```

response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server error message>"
}
```

## 9. `POST /oAuth`

Description =

User can login with their own Google Account

Request =

-   header =
    {
    "access_token": "<access token>"
    }

-   body =

```json
{
    "google_token": "<google_token provided by google - string>"
}
```

Response (200 - OK) =

```json
{
    "id": "<id by system>",
    "email": "<email by user>",
    "access_token": "<access_token>"
}
```

response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server error message>"
}
```

## 10. `GET /weather`
Description =

Fetch weather api from open weather

Request =

-   body =

not needed

Response (200 - OK) =

```json
{
  "coord": {
    "lon": 106.8451,
    "lat": -6.2146
  },
  "weather": [
    {
      "id": 721,
      "main": "Haze",
      "description": "haze",
      "icon": "50d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 32.93,
    "feels_like": 34.75,
    "temp_min": 32.78,
    "temp_max": 33,
    "pressure": 1006,
    "humidity": 55
  },
  "visibility": 5000,
  "wind": {
    "speed": 4.63,
    "deg": 10
  },
  "clouds": {
    "all": 40
  },
  "dt": 1616741669,
  "sys": {
    "type": 1,
    "id": 9383,
    "country": "ID",
    "sunrise": 1616712952,
    "sunset": 1616756439
  },
  "timezone": 25200,
  "id": 1642911,
  "name": "Jakarta",
  "cod": 200
}
```

response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server error message>"
}
```

## 11. `GET /quotes`

Description =

Fetch quotes from quotes on design

Request =

-   body =

not needed

Response (200 - OK) =

```json
[
  {
    "id": 94,
    "date": "2008-12-03T08:23:51",
    "date_gmt": "2008-12-03T16:23:51",
    "guid": {
      "rendered": "http:\/\/quotesondesign.com\/?p=94"
    },
    "modified": "2008-12-29T10:05:55",
    "modified_gmt": "2008-12-29T18:05:55",
    "slug": "jonathan-ive",
    "status": "publish",
    "type": "post",
    "link": "https:\/\/quotesondesign.com\/jonathan-ive\/",
    "title": {
      "rendered": "Jonathan Ive"
    },
    "content": {
      "rendered": "<p>It&#8217;s very easy to be different, but very difficult to be better.  <\/p>\n",
      "protected": false
    },
    "excerpt": {
      "rendered": "<p>It&#8217;s very easy to be different, but very difficult to be better.<\/p>\n",
      "protected": false
    }
  }
]
```

response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server error message>"
}
```

## 12. `GET /`

Description =

Fetch yesnoAPI

Request =

-   body =

not needed

Response (200 - OK) =

```json
{
  "answer": "no",
  "forced": false,
  "image": "https://yesno.wtf/assets/no/5-73e4adfe4da265a646fe517128bb5bf2.gif"
}
```

response (500 - INTERNAL SERVER ERROR) =

```json
{
    "message": "<internal server error message>"
}
```

`(ini punya kak fiqi)`

My Assets App Server
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
