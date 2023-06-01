# Foto-Orientierungslauf

Für die Angular WebApp FotoOL müssen folgende Schritte durchgeführt werden

## Projekt aufsetzen

```
git clone https://github.com/showrab/FotoOL.git

cd FotoOL/client
```
## Installieren von Angular
https://angular.io/guide/setup-local

```
sudo npm install -g @angular/cli
npm install
```


### Bei Problemen
If you install the package but you still get the error, then follow the steps below:

`rm -rf node_modules` delete the node modules folder by running

`rm -f package-lock.json` delete package.lock.json file by running

`npm cache clean --force` clean up the NPM cache by running

`npm install` install all packages again by running 

`sudo chown -R 501:20 "~/.npm"` Berechtigungen der Angular Module zurücksetzen.


`npm audit fix` Sicherheits problem automatisch fixen.

`npm update` Neuste Angular Packete verwenden.

## Letsencrypt

Installieren von certbot:
https://pimylifeup.com/raspberry-pi-ssl-lets-encrypt/

Mit certbot Zertifikat erstellen.
`sudo certbot certonly --standalone -d example.com`

Zertifikat erneuern:
`sudo certbot renew`
### Zertifikat in Client und Server kopieren
Hier wurden die Zertifikate zu example.com gespeichert:
`/etc/letsencrypt/live/example.com/`

kopieren zwei Zertifikate für Client nach `client/ssl` (nicht im Repo.)
* `client/ssl/cert.pem`
* `client/ssl/privkey.pem`

Für den Server müssen die Zertifikate zuerst in einen  p12-Keystore gepackt werden:

```
openssl pkcs12 -export -in cert.pem -inkey privkey.pem -out fotool.p12 -name fotool -CAfile chain.pem
```
Um den Keystore zu sichern muss ein eigenes Passwort eingegeben werden.
Kopiere den erstellte fotool.p12 Keystore nach `server/src/main/resources/keystore`
im `application-prod.yaml` (nicht im Repo.) muss folgendes eingefügt werden:
```
server:
  ssl:
    enabled: true
    # keystore format
    key-store-type: PKCS12
    # keystore location
    key-store: classpath:keystore/fotool.p12
    # keystore password
    key-store-password: eigenesPasswort
    # SSL protocol to use
    protocol: TLS
    # Enabled SSL protocols
    enabled-protocols: TLSv1.2

spring:
  datasource:
    # Datenbank in File Persistiern
    url: jdbc:h2:file:./fotool/db/ProdDataBase
  h2:
    console:
      # H2 Konsole in Produktion ausschalten
      enabled: false
  jpa:
    defer-datasource-initialization: false
    hibernate:
      ddl-auto: update
  sql:
    init:
      mode: never
      platform: prod    
```
Value von key-store-password mit eigenem Passwort abändern.

### Links zu letsencrypt die mir geholfen haben.
How to configure Let's Encrypt SSL for spring boot in Ubuntu openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out springboot_letsencrypt.p12 -name bootalias -CAfile chain.pem -cname root

How can I set up a letsencrypt SSL certificate and use it in a Spring Boot application? https://stackoverflow.com/questions/36991562/how-can-i-set-up-a-letsencrypt-ssl-certificate-and-use-it-in-a-spring-boot-appli

Secure Spring boot with lets' encrypt https://wstutorial.com/rest/spring-boot-with-lets-encrypt.html

Two-way TLS Angular + Spring Boot https://stackoverflow.com/questions/73142063/two-way-tls-angular-spring-boot

https://pimylifeup.com/raspberry-pi-ssl-lets-encrypt/

Raspberry Pi SSL Zertifikat kostenlos mit Let’s Encrypt erstellen https://tutorials-raspberrypi.de/raspberry-pi-ssl-zertifikat-kostenlos-mit-lets-encrypt-erstellen/

## Starten der Foto-OL App 
Ohnen Zertifikat:
`java -Dspring.profiles.active=dev -jar server/target/server*.jar`

Testen http://localhost:8080/ 

Mit Zertifikat (https)
`java -Dspring.profiles.active=prod -jar server/target/server*.jar`

Testen https://localhost:8080/ warnung wegen falschem Zertifikat is richtig. Kann aber übergangen werden.


## Docker Image erstellen
https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/

Docker Images auf dem Server erstellen

```
docker rm foto-ol
docker build -t showrab/foto-ol:latest .
```

Prüfen ob Image gebuildet wurde.

`docker images |grep foto-ol`

## Docker Image starten
Auf Server der das Docker Image erstellt hat

```
docker run -d -it -p 8080:8080 --restart unless-stopped --name foto-ol showrab/foto-ol 
```

Testen ob Image foto-ol funktioniert

[http://server:8080](http://hpe:8080)


##Links
https://github.com/Napster2210/ngx-spinner
https://napster2210.github.io/ngx-spinner/