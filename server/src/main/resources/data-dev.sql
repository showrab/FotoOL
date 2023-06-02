-- Tabelle Photo mit Defaultwerten füllen
insert into photo (tour_name, hidden, sort_order, photo_url, lat, lng, hint)
values ('test', false, 1, '../../assets/images/Bild.1.jpg', 46.773503, 7.635052, 'Bushaltestelle Ziegeieistrasse');

insert into photo (tour_name, hidden, sort_order, photo_url, lat, lng, hint)
values ('test', false, 2, '../../assets/images/Bild.2.jpg', 46.774693, 7.636625, 'Obere Ecke Bösbachstrasse');

insert into photo (tour_name, hidden, sort_order, photo_url, lat, lng, hint)
values ('test', false, 3, '../../assets/images/Bild.3.jpg', 46.775042, 7.634388, 'Bösbach-Finkenweg');

insert into photo (tour_name, hidden, sort_order, photo_url, lat, lng, hint)
values ('test', false, 4, '../../assets/images/Bild.4.jpg', 46.773958, 7.633619, 'Lin Den Weg');

insert into photo (tour_name, hidden, sort_order, photo_url, lat, lng, hint)
values ('andre', false, 1, '../../assets/images/lucas.jpeg', 46.773958, 7.633619, 'Schallenberg');

-- Tabelle High Score
insert into high_score (tour_name, index, score, team_name, history)
values ('test', 0, 100, 'TestTeam', '30m, 70m');
insert into high_score (tour_name, index, score, team_name, history)
values ('test', 0, 110, 'TestTeam2', '30m, 80m');
insert into high_score (tour_name, index, score, team_name, history)
values ('test', 0, 90, 'TestTeam3', '30m, 60m');

insert into high_score (tour_name, index, score, team_name, history)
values ('bla', 0, 100, 'TestTeam4', '20m, 80m');
insert into high_score (tour_name, index, score, team_name, history)
values ('bla', 0, 80, 'TestTeam5', '20m, 60m');

insert into high_score (tour_name, index, score, team_name, history)
values ('test', 2, 70, 'TestTeam', '30m, 70m');

insert into high_score (tour_name, index, score, team_name, history)
values ('test', 1, 100, 'Test', '25m');

-- Tabelle Team
-- insert into team (id, team_name) values (0, 'TestTeam');

-- Tabelle Tour
insert into tour (tour_name, hidden)
values ('test', false);

insert into tour (tour_name, hidden)
values ('andre', false);
