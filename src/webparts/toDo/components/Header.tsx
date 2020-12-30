import * as React from 'react';
import { PlusCircle, ArrowRight, CalendarMinus, StopCircle } from 'react-bootstrap-icons';
import Album from '../models/Album';


interface IHeaderProps {
    text: string;
    albums: Album[];
    onAlbumCollectionClick: any; 
}

const Header = (props: IHeaderProps) => {

    //Check if more than 1 album displays its songs
    let isOneAlbumOpen: boolean = props.albums.some((album: Album) => {
        return album.IsDisplayed == true
    });

    return (
        <h4>{props.text}&nbsp;
            <div style={{display: "inline-block"}} onClick={() => props.onAlbumCollectionClick()}>

            {
                 (isOneAlbumOpen ? 
                    <StopCircle color={"white"} style={{backgroundColor: "red", fontWeight: 1000}}  /> : 
                    <PlusCircle color={"white"} style={{backgroundColor: "green"}} /> 
                 )
            }

            </div>                    
        
        </h4>
    )
}

export default Header;