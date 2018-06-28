# youtube-intro-to-knex
El código original se puede encontrar en [Github: johnazre - Youtube intro to knex](https://github.com/johnazre/youtube-intro-to-knex), código para los videos en [Youtube: KnexJS with Express and Node Tutorial](https://www.youtube.com/playlist?list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw). Se encontrarán con algunos problemas con el archivo knexfile.js que no se corrigió adecuadamente, pero los datos están aquí: [Github - Knex migrate and seed CLI commands throwing error - Issue#2000: tgriesser/knex](https://github.com/tgriesser/knex/issues/2000)

## Tabla USERS
|id|name|email|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|

## Tabla TODOS
|id|title|completed|user_id|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|:-:|

## Uso

### Listar TODOS

**Método: ** GET

```/todos ```

### Mostrar TODO específico

**Método: ** GET

```/todos/:id ```
donde *id* es un número.

### Mostrar TODOS específicos por usuario

**Método: ** GET

```/todos-of-user/:user_id```
donde *user_id* se refiere al número de usuario.

### Ingresar nuevo TODO

**Método: ** POST

```/todos ```
Se ingresa los datos: *title* y *user_id*

### Editar datos de TODO específico

**Método: ** PUT

```/todos/:id```
donde *id* es un número que identfica al TODO

### Borrar TODO específico

**Método: ** DELETE

```/todos/:id```
donde *id* es un número que identifica al TODO

## Ramas

**v0.0.1B:** Crear una versión alternativa, ordenando el código, usando mysql y Typescript. Sin embargo aún (2018-05-11), no dispongo conocimiento si Knex puede trabajar adecuadamente con Typescript. 

**v0.0.2:** Configurando para una adecuada salida de datos, añadiendo estados http. La información está basada en un proyecto anterior: [Github: API REST usando NodeJS y Typescript](https://github.com/gerbosan/node-restful-api-tutorial). También se normaliza para que todos los procedimientos retornen los mismos datos, lista completa de TODOS, excepto las opciones de filtrado por *todos.id* y *users.id*. 

**Bug:** Procedimiento para listar TODOS filtrados por user_id, resultado aparece con todo_id mostrando el user_id. El problema parece pertener a los datos que devuelve Knex. Se solucionó controlando los campos que devuelve Knex.
*2018-05-17:* Cambio en tipo de datos que se ingresan para controlar **sql injection**. Uso de middleware [HelmetJS](https://github.com/helmetjs/helmet) para controlar ataques.

*2018-5-22:* Se usó [sqlmap](https://github.com/sqlmapproject/sqlmap) para comprobar el sistema. OK.

**v0.0.3:** Establecer procedimientos para CRUD de *users*, establecer nuevo esquema para las tablas *users* y *todos*, incluir nueva tabla *login*. 

*2018-05-24:* Tuve la intención de crear **Modelos** para acumular lo ingresado por el usuario y los resultados de la BBDD, sin embargo parece que añadiría más complejidad. Además, ahora los resultados son una combinación de la tabla *Todos* y *Users*. [StackOverflow - How to convert req.body to model in ES6 to match the database columns when using knex js?](https://stackoverflow.com/questions/44824339/how-to-convert-req-body-to-model-in-es6-to-match-the-database-columns-when-using), pero esto parece ser un requerimiento en algunos ORM(TypeORM, Objective, etc). ¿Cómo manejaran datos que pertenecen a varias tablas?

## Nuevas Tablas
### Tabla LOGIN
|id|email|password|role|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|:-:|


### Tabla USERS
|id|name|resume|login_id|alive|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|


### Tabla TODOS
|id|title|completed|user_id|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|:-:|

*2018-06-07:* Se añade campo **alive** en la tabla *USERS* para indicar usuarios borrados. Tal que si un usuario se vuelve a integrar, se creará un nuevo registro en la tabla *USERS* y no se mostrarán los *TODOS* que el usuario creo con anterioridad.

*2018-06-15:* Se añade función para verificar email en *userController.ts*. Se usa función de [Stack Overflow - How to validate an email address in Javascript?](https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript) y el regex de la respuesta dada el [Setiembre 21-2015 a 01:52](https://stackoverflow.com/a/32686261/7799373)

*2018-06-20:* Se añade el uso de JsonWebToken, [npm: jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) para controlar el acceso a los procedimientos para los usuarios y según roles. Limitado solo para usersRoute.

*2018-06-28:* Sistema entra en standby. Complicaciones respecto al uso de código para procesar el token y usar su contenido para tener permisos.