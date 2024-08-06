FROM maven:3.9.8-amazoncorretto-21 AS build

WORKDIR /post-service
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:21-jdk-slim

WORKDIR /post-service
COPY --from=build /post-service/target/*.jar application.jar
EXPOSE 8094

ENTRYPOINT ["java", "-jar", "application.jar"]