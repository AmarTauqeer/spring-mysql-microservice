## Spring Boot 3 Plus Microservices Demonstration

## Tools and Technology

1. Spring Boot 3.1.2
2. Spring Boot Initializer
3. Maven
4. ReactJS
5. Bootstrap
6. MySQL
7. NextJS

## UI
UI has the following features:

1. Employee management (Create, Read, Update, Delete)
2. Department management (Create, Read, Update, Delete)
3. User management (Create, Read, Update, Delete)
4. Authentication with JWT (using Spring Boot Web Security)
5. Role-based authorization
6. Interaction between microservices using FeignClient 



## Demo
UI demonstraction can be found from the link: https://www.youtube.com/watch?v=IkOLIhW-puI&ab_channel=AmarTauqeer

## Backend

1. Microservices:
	- Department-service for department management (Create, Read, Update, Delete)
	- Employee-service for employee management (Create, Read, Update, Delete)
	- Authentication-service for user management (Create, Read, Update, Delete), authentication and authorization
	- Service-registry for registering services
	- API-gateway service for enabling a common url for all services
	
2. Configserver for enabling Eureka server
3. Enabling Eureka discovery client
4. MySQL database for storing information regarding user, department and employee

## Frontend run
1. Download repository
2. cd frontend folder
3. run npm install
4. npm run dev
Open [http://localhost:5009](http://localhost:5009) with your browser to see the result.

## backend run
1. Download repository
2. Pick db.sql file and install in MySQL
3. Change each sevice properties based on your requirements
4. Install docker for zipkin
5. Run `docker run -d -p 9411:9411 openzipkin/zipkin`
4. Run all service
5. Check Eureka from : [http:/localhost:8761](http:/localhost:8761)






