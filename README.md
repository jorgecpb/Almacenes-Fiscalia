<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
z

# Sistema de Almacenes Ministerio Público

1. Clonar el proyecto

2. Instalar paquetes de node
```yarn install```

3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env```

4. Cambiar las variables de entorno a las correctas

5. Levantar la base de datos
```
docker-compose up -d
```


6. Hacer correr el proyecto
```yarn start:dev```


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).




## Imagen docker con Postgres
version: '3'

services:
  db:
    image: postgres:14.3
    restart: always
    ports:
      - "5432:5432"
    environment: 
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    container_name: sistemaalmacenes
    volumes: 
      - ./postgres:/var/lib/postgresql/data


## Imagen doccker con MySql
version: '3'

services:
  mysql:
    image: mysql:8.0.33
    restart: always
    ports:
      - 3307:3307
    environment: 
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_NAME}
    container_name: sistemaalmacenes
    volumes: 
      - ./mysql:/var/lib/mysql/data
