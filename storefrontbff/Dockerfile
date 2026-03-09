FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache bash
COPY wait-for-it.sh wait-for-it.sh
RUN sed -i 's/\r$//' /wait-for-it.sh
RUN chmod +x wait-for-it.sh
COPY target/storefrontbff*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]