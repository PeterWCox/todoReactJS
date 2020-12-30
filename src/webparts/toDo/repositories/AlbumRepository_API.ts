import Album from "../models/Album";
import AlbumCollection from "../models/AlbumCollection";
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
                        album.Songs.push(jsonSong);
                    });

                    albums.push(album);
                })
            })
            .catch(err => {
                console.log(err);
            });

         //Sort by concatenated album name ("The Beatles - Yellow Brick Road")
         albums.sort((a, b) => a.getConcatenatedName().localeCompare(b.getConcatenatedName()))
        
        let albumCollection = new AlbumCollection();
        albumCollection.Albums = albums;

       

        return albumCollection;
    }
}