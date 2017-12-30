# Simple Forum App

A small forum app built with Django Rest and Angular.

## Demonstration

* [Angular Application](http://brunoliveira-forumapp.s3-website-us-east-1.amazonaws.com)
* [API Documentation](http://ec2-52-201-245-26.compute-1.amazonaws.com/api-docs/)
* [API](http://ec2-52-201-245-26.compute-1.amazonaws.com/api/)

Credentials:

```
username: demo
password: vanhacker
```

## Getting Started

You must have Docker and Docker compose installed.

### Prerequisites

- Docker
- Docker Compose


### Installing and Running

Create the database volume

```
docker create volume --name forumapp-pgdata
```

Initialize the Docker Compose services

```
docker-compose up
```

Navigate to localhost:4200 (Angular App) and localhost:8000 (API).


## Built With

* [Django](https://www.djangoproject.com/)
* [Django Rest Framework](http://www.django-rest-framework.org/)
* [Angular](https://angular.io/)



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
