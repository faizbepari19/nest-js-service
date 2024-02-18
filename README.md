## NEST JS CRUD PROJECT


## ENDPOINTS
BASE_URL= https://kind-gray-grasshopper-cap.cyclic.app

```
POST: /auth/sign_up
{
    "email": "marnus@gmail.com",
    "password": "marnus",
    "user_name": "marnus"
}

Response
Status Code: 201

{
    "status_code": 200,
    "message": "Sign up successful!",
    "data": {
        "user_name": "marnus",
        "email": "marnus@gmail.com",
        "id": 4
    }
}
```

```
POST: /auth/login
{
    "email": "marnus@gmail.com",
    "password": "marnus",
}

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Login successful!",
    "data": {
        "id": 4,
        "user_name": "marnus",
        "token": "generate a JWT token"
    }
}
```

```
POST: /auth/forgot-password
{
    "email": "marnus@gmail.com"
}

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Reset link",
    "data": {
        "id": 4,
        "user_name": "marnus",
        "token": "889f5d3e-236d-4648-8425-1998a0f56f7a"
    }
}
```


```
POST: /auth/reset-password
{
    "token": "889f5d3e-236d-4648-8425-1998a0f56f7a",
    "new_password": "marnus@619"
}

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Password reset successful"
}
```


```
POST: /tasks
{
    "title": "learn graphQl",
    "description": "get what is needed"
}

Response
Status Code: 201
{
    "status_code": 200,
    "message": "Task created",
    "data": {
        "title": "learn graphQl",
        "description": "get what is needed",
        "id": 8,
        "status": false,
        "created_at": "2024-02-18T08:00:41.085Z"
    }
}
```


```
GET: /tasks?sort_by=id&sort_order=DESC&filter_by=earn
[Currently filtering is done by task's title ]

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Task lists",
    "data": [
        {
            "id": 7,
            "title": "learn react js",
            "description": "hooks",
            "status": false,
            "created_at": "2024-02-18T07:57:13.648Z"
        },
        {
            "id": 8,
            "title": "learn graphQl",
            "description": "get what is needed",
            "status": false,
            "created_at": "2024-02-18T08:00:41.085Z"
        }
    ]
}
```


```
PUT: /complete/:id
Response
Status Code: 200
{
    "status_code": 200,
    "message": "Task completed",
    "data": {
        "id": 7,
        "title": "learn react js",
        "description": "hooks",
        "status": true,
        "created_at": "2024-02-18T07:57:13.648Z"
    }
}
```


```
PUT: /:id
{
    "title": "learn graphQl",
    "description": "get what is needed, reduce reponse size"
}

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Task updated",
    "data": {
        "id": 8,
        "title": "learn graphQl",
        "description": "get what is needed, reduce reponse size",
        "status": false,
        "created_at": "2024-02-18T08:00:41.085Z"
    }
}
```


```
PATCH: /:id

Response
Status Code: 200
{
    "status_code": 200,
    "message": "Task deleted"
}
```