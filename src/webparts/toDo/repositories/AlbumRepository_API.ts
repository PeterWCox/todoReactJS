import Album from "../models/Album";
import AlbumCollection from "../models/AlbumCollection";
import Song from "../models/Song";
import IAlbumRepository from './IAlbumRepository';
import Axios from 'axios';
import { plainToClass } from "class-transformer"; 


export default class AlbumRepository_API implements IAlbumRepository {

    public async getAlbumCollection(): Promise<AlbumCollection>  {

        let albums: Album[] = [];

        await Axios.get('http://localhost:5000/api/albums')
            .then(res => {
                
                const json = res.data; 

                json.map(jsonAlbum => {

                    let album = new Album();
                    
                    //Set the properties
                    album.Id = jsonAlbum.id;
                    album.ArtistName = jsonAlbum.artistName;
                    album.AlbumName = jsonAlbum.albumName;
                    album.Songs = [];

                    //Set the song list
                    jsonAlbum.songs.map(jsonSong => {

                        let song = new Song();
                        song.SongName = jsonSong.songName
                        album.Songs.push(song);
                    });

                    albums.push(album);
                })
            })
            .catch(err => {
                console.log(err);
            });
        
        let albumCollection = new AlbumCollection();
        albumCollection.Albums = albums;

        return albumCollection;
    }
}