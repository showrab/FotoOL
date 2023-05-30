FROM eclipse-temurin:17-jdk-alpine
VOLUME /fotool/db
ARG JAR_FILE=target/server*.jar
COPY ${JAR_FILE} /fotool/app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/fotool/app.jar"]
