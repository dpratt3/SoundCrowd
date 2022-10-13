// generate Album table
npx sequelize-cli model:generate --name Album --attributes userId:integer,title:string,description:string,imageUrl:string,createdAt:date,updatedAt:date

// generate Song table
npx sequelize-cli model:generate --name Song --attributes albumId:integer,userId:integer,title:string,description:string,url:string,imageUrl:string,createdAt:date,updatedAt:date

// generate Playlists table
npx sequelize-cli model:generate --name Playlist --attributes userId:integer,name:string,imageUrl:string,createdAt:date,updatedAt:date

// generate PlaylistSongs table
npx sequelize-cli model:generate --name PlaylistSong --attributes songId:integer,playlistId:integer,order:integer,createdAt:date,updatedAt:date

// generate Comments table
npx sequelize-cli model:generate --name Comments --attributes songId:integer,userId:integer,body:string,createdAt:date,updatedAt:date

//generate seed files in corresponding order
npx sequelize seed:generate --name demo-album
npx sequelize seed:generate --name demo-song
npx sequelize seed:generate --name demo-playlists
npx sequelize seed:generate --name demo-playlist-songs
npx sequelize seed:generate --name demo-comments
