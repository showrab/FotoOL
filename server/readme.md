# Foto-OL Server
Auf diesem Server laufen die REST-Endpunkte für die Foto-OL Webapp

| REST   | URL                | Beschreibung                                                                                     |
|--------|--------------------|--------------------------------------------------------------------------------------------------|
| GET    | /photos            | Alle gespeicherten Fotos                                                                         |
| GET    | /photos/{tour}     | Fotos einer bestimmten Tour                                                                      |
| POST   | /photo             | Neues/Bestehendes Foto speichern                                                                 |
| DELETE | /photo/delete/{id} | Foto mit id löschen                                                                              |
| GET    | /tour              | Liste aller Touren                                                                               |
| POST   | /tour              | Neue/Bestehende Tour speichern                                                                   |
| DELETE | /tour/delete/{id}  | Tour mit id löschen                                                                              |
| GET    | /highScore         | List der High Scores                                                                             |
| POST   | /highScore         | neuen Score speichern                                                                            |
| GET    | /team/{teamName}   | gibt Anzahl Posten zurück die das Team gefunden hat. Falls Team nich existiert gibt es 0 zurück  |  
# Selbst signiertes Zertifikat 
```
keytool -genkeypair -alias fotool -keyalg RSA -keysize 4096 \
-validity 3650 -dname "CN=localhost" -keypass changeit -keystore fotool.p12 \
-storeType PKCS12 -storepass changeit
```

Erstelltes File nach `src/main/resources/keystore` kopieren.

How to configure Let's Encrypt SSL for spring boot in Ubuntu
openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out springboot_letsencrypt.p12 -name bootalias -CAfile chain.pem -cname root

How can I set up a letsencrypt SSL certificate and use it in a Spring Boot application?
https://stackoverflow.com/questions/36991562/how-can-i-set-up-a-letsencrypt-ssl-certificate-and-use-it-in-a-spring-boot-appli

Secure Spring boot with lets' encrypt
https://wstutorial.com/rest/spring-boot-with-lets-encrypt.html

Two-way TLS Angular + Spring Boot
https://stackoverflow.com/questions/73142063/two-way-tls-angular-spring-boot

https://pimylifeup.com/raspberry-pi-ssl-lets-encrypt/

Raspberry Pi SSL Zertifikat kostenlos mit Let’s Encrypt erstellen
https://tutorials-raspberrypi.de/raspberry-pi-ssl-zertifikat-kostenlos-mit-lets-encrypt-erstellen/