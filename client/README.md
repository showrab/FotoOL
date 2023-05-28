# FotoOl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.
### Beschreibung 
Mit FotoOl (Foto OL) 
Zur 100 Jahr Feier der Viva Kirche wollen wir einen Foto OL durchführen. Ein Foto OL ist ein Orientierungslauf wo die Punkte zum anlaufen nicht auf der Karte eingezeichnet sind, sondern man bekommt Fotos und muss so die Punkte finden. Je genauer man an der Position ist desto weniger Strafpunkte [m] kriegt man. Wer zuletzt am wenigsten Strafpunkte [m] hat, gewinnt.

Technisch wird das gelöst indem man am gefundenen Foto-Punkt die Koordinaten aufzeichnet.
Das zurückliefern der Koordinaten vom Browser ist nur in sicheren Webseiten erlaubt (https://).

Karte OpenSteetMap
Kamera https://stackblitz.com/edit/ngx-webcam-demo?file=src%2Findex.html,src%2Fapp%2Fcamera%2Fcamera.component.html

## Install Angular
https://angular.io/guide/setup-local

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Docker Image erstellen
https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/

Docker Images auf dem Server erstellen

`docker build -t showrab/foto-ol:latest .`

Prüfen ob Image gebuildet wurde.

`docker images |grep foto-ol`

## Docker Image starten
Auf Server der das Docker Image erstellt hat

`docker run -d -p 8080:80 showrab/foto-ol`

Testen ob Image foto-ol funktioniert

[http://server:8080](http://hpe:8080)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
