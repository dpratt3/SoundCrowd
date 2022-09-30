Table users {
  id int [pk, increment]
  firstName varchar
  lastName varchar
  email varchar [not null, unique]
  username varchar [not null, unique]
  password varchar [not null]
}

Table artists {
  id int [pk, increment]
  previewImage varchar
  totalAlbums int 
  totalSongs int
}

Table songs {
  id int [pk, increment]
  userId int [ref: > users.id, not null]
  albumId int  [ref: > albums.id, null]
  title varchar [not null]
  description varchar
  url varchar [not null]
  createdAt datetime
  updatedAt datetime
  previewImage varchar
}

Table playlists {
  id int [pk, increment]
  userId int  [ref: > users.id]
  name varchar
  createdAt datetime
  updatedAt datetime
  previewImage varchar
}

// joins table
table playlistSongs {
  id int [pk, increment]
  playlistId int [ref: > playlists.id]
  songId int [ref: > songs.id]
}

table comments {
  id int [pk, increment]
  userId int [ref: > users.id]
  songId int [ref: > songs.id]
  body varchar 
  createdAt datetime
  updatedAt datetime
}

table albums {
  id int [pk, increment]
  userId int [ref: > users.id]
  title varchar
  description varchar
  createdAt datetime
  updatedAt datetime
  previewImage varchar
  artistId int [ref: > artists.id, not null]
}
