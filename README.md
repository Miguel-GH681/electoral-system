
# API REST

Esta API REST permite la manipulación de usuarios a través de distintos endpoints. Esta es la base para la creación de un sistema electoral en el cual los usuarios serán ingenieros que pertenecen al Colegio de Ingenieros de Guatemala los cuales podrán votar en las distintas campañas existentes.

## Ejecución
- Ubicarse en la carpeta raíz
- Ejecutar el comando: `npm install`
- Levantar el proyecto con el comando: `npm start`

#### URL base
https://electoral-system-backend.onrender.com
## Endpoints

**GET** `/users`

#### Response (200)

```json
{
    "ok": true,
    "msg": [
        {
            "membership_number": 2,
            "full_name": "Carlos González",
            "email": "carlosg@gmail.com",
            "dpi": "2998365850101",
            "birthdate": "2004-02-20",
            "password": "$2b$10$ylAP7Y9OBALy6oglxnRp1ukVVQuKEnUXQB.ZDuq1k65oTw8fmmBwe",
            "role_id": 1
        }
    ]
}
```

**POST** `/users`
#### Request
```json
{
    "membership_number": "2",
    "full_name": "Carlos González",
    "email": "carlosg@gmail.com",
    "dpi": "2998365850101",
    "birthdate": "04/02/2002",
    "password":"umg123",
    "role_id": "1"
}
```

#### Response (200)
```json
{
    "ok": true,
    "msg": {
        "membership_number": 6,
        "full_name": "Andrea Perez",
        "email": "andrea.perez@gmail.com",
        "dpi": "299836580101",
        "birthdate": "2004-02-20",
        "password": "$2b$10$NTKEb46dj/Uo1LC2jV2UkO6VF7g/oArMCDgDp16l2iAhGpib3do3u",
        "role_id": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJzaGlwX251bWJlciI6Niwicm9sZV9pZCI6MiwiaWF0IjoxNzYwMjQ0OTE3LCJleHAiOjE3NjAyNjY1MTd9.OdqDyq_8QTnCwHSzqZJtCvWDsz8l-XUt4VGd5gUO-D0"
}
```

**PUT** `/users/:membership_number`
#### Request
```json
{
    "full_name": "Alvaro Miguel González Hic",
    "email": "miguelgh681@gmail.com",
    "dpi": "2998365840101",
    "birthdate": "04/02/2002",
    "password": "umg123",
    "role_id": "1"
}
```

#### Response (200)
```json
{
    "ok": true,
    "msg": "Usuario actualizado correctamente"
}
```

**DELETE** `/users/:membership_number`
#### Response (200)
```json
{
    "ok": true,
    "msg": "Usuario eliminado correctamente"
}
```
### URL 

https://electoral-system-backend.onrender.com