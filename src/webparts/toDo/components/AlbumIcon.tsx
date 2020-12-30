import * as React from 'react';
import { PlusCircle, ArrowRight, CalendarMinus, StopCircle } from 'react-bootstrap-icons';
import Album from '../models/Album';


interface IAlbumIconProps {
    album: Album;
    onAlbumClick: any; 
}

const AlbumIcon = (props: IAlbumIconProps) => {

    return (
        <div style={{display: "inline-block"}}onClick={() => props.onAlbumClick(props.album.Id)}>
             {props.album.IsDisplayed ? 
                <StopCircle color={"white"} style={{backgroundColor: "red", fontWeight: 1000}}  /> : 
                <PlusCircle color={"white"} style={{backgroundColor: "green"}} /> }
        </div>
    ) 
}

export default AlbumIcon;