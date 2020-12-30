import * as React from 'react';
import Album from '../models/Album';
import AlbumIcon from './AlbumIcon';

interface IAlbumEntryProps {
    album: Album;
    onAlbumClick: any; 
}

const AlbumEntry = (props: IAlbumEntryProps) => {

    return (
        <>
            <li >
                {props.album.getConcatenatedName()}&nbsp;      
                <span>
                    <AlbumIcon 
                        album={props.album} 
                        onAlbumClick={props.onAlbumClick} 
                    />
                </span>
                
            </li>
           
       
            <ul>
                {
                    props.album.IsDisplayed ? 
                        props.album.Songs.map(song => {
                            return (
                                <li>{song}</li>
                            )
                        }) : null                     
                }
            </ul>
        </>
    )
}

export default AlbumEntry;