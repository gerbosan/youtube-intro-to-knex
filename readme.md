# youtube-intro-to-knex
El código original se puede encontrar en [Github: johnazre - Youtube intro to knex](https://github.com/johnazre/youtube-intro-to-knex), código para los videos en [Youtube: KnexJS with Express and Node Tutorial](https://www.youtube.com/playlist?list=PL7sCSgsRZ-smPRSrim4bX5TQfRue1jKfw). Se encontrarán con algunos problemas con el archivo knexfile.js que no se corrigió adecuadamente, pero los datos están aquí: [Github - Knex migrate and seed CLI commands throwing error - Issue#2000: tgriesser/knex](https://github.com/tgriesser/knex/issues/2000)

## Tabla USERS
|id|name|email|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|

## Tabla TODOS
|id|title|completed|user_id|created_at|updated_at|
|:-:|:-:|:-:|:-:|:-:|:-:|

## Ramas

**v0.0.1B:** Comenzaré a crear una versión alternativa, ordenando el código, usando mysql y Typescript. Sin embargo aún (2018-05-11), no dispongo conocimiento si Knex puede trabajar adecuadamente con Typescript. 

**v0.0.2:** Configurando para una adecuada salida de datos, añadiendo estados. La información está basada en un proyecto anterior: [Github: API REST usando NodeJS y Typescript](https://github.com/gerbosan/node-restful-api-tutorial). También se normaliza para que todos los procedimientos retornen los mismos datos, lista completa de TODOS, excepto las opciones de filtrado por *todos.id* y *users.id*. 

**Bug:** Procedimiento para listar TODOS filtrados por user_id, resultado aparece con todo_id mostrando el user_id. El problema parece pertener a los datos que devuelve Knex. Se solucionó controlando los campos que devuelve Knex.