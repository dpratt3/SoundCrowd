Table currentUsers {
  id int [pk, increment]
  firstName varchar
  lastName varchar
  email varchar
  username varchar
  playlistId int [ref: < playlists.id]
}

Table artists {
  id int [pk, increment]
  username varchar
  previewImage varchar
  //albumId int [ref: < albums.id]
  totalAlbums int 
  totalSongs int
}

Table songs {
  id int [pk, increment]
  userId int
  //albumId int  [ref: < albums.id]
  title varchar
  description varchar
  url varchar
  createdAt varchar
  updatedAt varchar 
  previewImage varchar
}

Table playlists {
  id int [pk, increment]
  userId int
  name varchar
  createdAt varchar
  updatedAt varchar
  previewImage varchar
  // albumId int [ref: > songs.id]
  // songId int [ref: < songs.id]
}

// joins table
table playlistSongs {
  id int [pk, increment]
  playlistId int [ref: > playlists.id]
  songId int [ref: > songs.id]
}

table comments {
  id int [pk, increment]
  userId int [ref: > currentUsers.id]
  songId int [ref: > songs.id]
  body varchar 
  createdAt varchar
  updatedAt varchar
}

table albums {
  id int [pk, increment]
  userId int
  title varchar
  description varchar
  createdAt varchar
  updatedAt varchar
  previewImage varchar
  //songId int [ref: < songs.id]
}

// joins table
table albumsSongs {
  id int [pk, increment]
  songId int [ref: > songs.id]
  albumId int [ref: > albums.id]
}

// joins table
table artistAlbums {
  id int [pk, increment]
  artistId int [ref: > artists.id]
  albumId int [ref: > albums.id]
}
