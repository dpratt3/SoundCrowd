// Updated 2022-10-12

Table Albums {
id int [pk, increment, ref: < Songs.albumId]
userId int [ref: > Users.id]
title varchar
description varchar
imageUrl varchar
createdAt timestamp
updatedAt timestamp
}

// If schema name is omitted, it will default to "public" schema.
Table Users {
id int [pk, increment, ref: < Playlists.userId]
username varchar
firstName varchar
lastName varchar
hashedPassword varchar
email varchar
imageUrl varchar
createdAt timestamp
updatedAt timestamp
}

Table Songs {
id int [pk, increment]
albumId int
userId int [ref: > Users.id]
title varchar
description varchar
url varchar
imageUrl varchar
createdAt timestamp
updatedAt timestamp
}

Table PlaylistSongs {
id int [pk, increment]
songId int [ref: > Songs.id]
playlistId int
order int
createdAt timestamp
updatedAt timestamp
}

Table Playlists {
id int [pk, increment, ref: < PlaylistSongs.playlistId]
userId int
name varchar
imageUrl varchar
createdAt timestamp
updatedAt timestamp
}

Table Comments {
id int [pk, increment]
songId int [ref: > Songs.id]
userId int [ref: > Users.id]
body varchar
createdAt timestamp
updatedAt timestamp
}
