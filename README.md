
# API REST
Esta API REST permite la manipulación de usuarios (Creación, Lectura, Actualización y Eliminación) a través de endpoints que implementan JWT como método de autenticación. El token generado a traves del endpoint de login tendrá una duración de 30s y le dará permiso al consumidor de poder acceder a ciertos recursos validando en primer lugar que sí este autenticado y en segundo lugar que tenga un rol válido.

## Ejecución
- Ubicarse en la carpeta raíz
- Ejecutar el comando: `npm install`
- Levantar el proyecto con el comando: `npm start`

#### URL base
https://electoral-system.onrender.com

## Endpoints

**LOGIN** `/users/login`
```json
{
    "membership_number": "",
    "dpi": "",
    "birthdate": "",
    "password": ""
}
```

**USUARIO ADMINISTRADOR**
```json
{
    "membership_number": "2",
    "dpi": "2998365850101",
    "birthdate": "2004-02-20",
    "password": "umg123"
}
```

##### HEADERS
Para que los endpoinds respondan adecuadamente se debe colocar el siguiente valor en el encabezado:
`x-token: <TOKEN>`

**GET** `/users`
#### Response (200)
```json
{
    "ok": true,
    "msg": [
        {
            "membership_number": 39,
            "full_name": "Marcos Alonzo",
            "email": "marcoss@gmail.com",
            "dpi": "3998365840101",
            "birthdate": "2002-02-28",
            "password": "$2b$10$83C1FmdMERyYEsVYOmOnQeiRwUp1.c/guV5fkGme.2jeigVQeKoTi",
            "role_id": 2
        }
    ]
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
https://electoral-system.onrender.com