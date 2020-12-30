import * as React from 'react';
import styles from './ToDo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import AlbumRepository from '../repositories/IAlbumRepository';
import Album from '../models/Album';
import {IToDoProps} from './IToDoProps';

//Components
import AlbumEntry from '../components/AlbumEntry';
import AlbumCollection from '../models/AlbumCollection';
import IAlbumCollectionRepository from '../repositories/IAlbumRepository';
import AlbumRepository_Stub from '../repositories/AlbumRepository_Stub';
import AlbumRepository_API from '../repositories/AlbumRepository_API';

export interface IToDoState {
  albumCollection: AlbumCollection;
}



export default class ToDo extends React.Component<IToDoProps, IToDoState> {

  constructor(props: IToDoProps) {

    super(props);

    //Instantiate empty album collection
    let albumCollection: AlbumCollection = new AlbumCollection();
    let albums: Album[] = [];
    albumCollection.Albums = albums;

    this.state = {
      albumCollection: albumCollection
    };
  }

  public async componentDidMount() {

    console.log("Init ComponentDidMount");

    let repo: IAlbumCollectionRepository = new AlbumRepository_API();

    let albumCollection: AlbumCollection = await repo.getAlbumCollection();

    this.setState({
      albumCollection: albumCollection
    });

    console.log("Finish ComponentDidMount");

  }
  
  
  private onAlbumClick = (id: string) => {

    let newAlbumCollection: AlbumCollection = this.state.albumCollection;

    newAlbumCollection.ToggleAlbumShown(id);

    this.setState({
      albumCollection: newAlbumCollection
    });
  }

  private onAlbumCollectionClick = () => {

    let newAlbumCollection: AlbumCollection = this.state.albumCollection;

    newAlbumCollection.ToggleAlbumShown_All();

    this.setState({
      albumCollection: newAlbumCollection
    });
  }
  
  
  public render(): React.ReactElement<IToDoProps> {

    console.log("Render init");

    // return (
    //   <h1>Hi</h1>
    // )

    return (
      <div className={ styles.toDo }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>

              <u onClick={() => this.onAlbumCollectionClick()}>
                <h1>Albums</h1>
              </u>

              <ul>
                {
                  this.state.albumCollection.Albums.map((album, index) => {
                    return (
                      <AlbumEntry 
                          key={index} 
                          album={album} 
                          onAlbumClick={this.onAlbumClick}
                      />
                    );                  
                  })
                }
              </ul>
             
            </div>
          </div>
        </div>
      </div>
    );
  }







}
