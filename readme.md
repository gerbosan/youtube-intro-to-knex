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

**v0.0.1B:** Comenzaré a crear una versión alternativa, ordenando el código, usando mysql y Typescript. Sin embargo aún (2018-05-11), no dispongo conocimiento si Knex puede trabajar adecuadamente con Typescript. 

**v0.0.2:** Configurando para una adecuada salida de datos, añadiendo estados. La información está basada en un proyecto anterior: [Github: API REST usando NodeJS y Typescript](https://github.com/gerbosan/node-restful-api-tutorial). También se normaliza para que todos los procedimientos retornen los mismos datos, lista completa de TODOS, excepto las opciones de filtrado por *todos.id* y *users.id*. 

**Bug:** Procedimiento para listar TODOS filtrados por user_id, resultado aparece con todo_id mostrando el user_id. El problema parece pertener a los datos que devuelve Knex. Se solucionó controlando los campos que devuelve Knex.
*2018-05-17:* Cambio en tipo de datos que se ingresan para controlar **sql injection**. Uso de middleware [HelmetJS](https://github.com/helmetjs/helmet) para controlar ataques.

*2018-5-22:* Se usó [sqlmap](https://github.com/sqlmapproject/sqlmap) para comprobar impermeabilidad del sistema.