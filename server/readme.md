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

