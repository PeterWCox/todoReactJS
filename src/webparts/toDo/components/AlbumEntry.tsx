import * as React from 'react';
import Album from '../models/Album';

interface IAlbumEntryProps {
    album: Album;
    onAlbumClick: any; 
}

const AlbumEntry = (props: IAlbumEntryProps) => {

    let color: string = (props.album.IsDisplayed) ? "#00ff00" : "#ff0000";

    return (
        <>
            <li onClick={(e) => props.onAlbumClick(props.album.Id)}>
                {props.album.getConcatenatedName()}
                <span><i style={{color: `${color}`}}>X</i></span>
            </li> 
       
            <ul>
                {
                    props.album.IsDisplayed ? 
                        props.album.Songs.map(song => {
                            return (
                                <li>{song.SongName}</li>
                            )
                        }) : null                     
                }
            </ul>
        </>
    )
}

export default AlbumEntry;