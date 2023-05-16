# Start with a base image - in this case JDK 17
FROM openjdk:17
# Run as a non-root user to mitigate security risks
# https://security.stackexchange.com/questions/106860/can-a-root-user-inside-a-docker-lxc-break-the-security-of-the-whole-system
#RUN addgroup -S spring && adduser -S spring -G spring
RUN groupadd -r myuser && useradd -r -g myuser myuser
USER myuser
# Specify JAR location
ARG JAR_FILE=build/libs/*.jar
# Copy the JAR
COPY ${JAR_FILE} app.jar
# Set ENTRYPOINT in exec form to run the container as an executable
ENTRYPOINT ["java","-jar","/app.jar"]