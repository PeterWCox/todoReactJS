import * as React from 'react';
import styles from './ToDo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import AlbumRepository from '../repositories/IAlbumRepository';
import Album from '../models/Album';
import {IToDoProps} from './IToDoProps';


//Bootstrap 
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

//Components
import AlbumEntry from '../components/AlbumEntry';
import AlbumCollection from '../models/AlbumCollection';
import IAlbumCollectionRepository from '../repositories/IAlbumRepository';
import AlbumRepository_Stub from '../repositories/AlbumRepository_Stub';
import AlbumRepository_API from '../repositories/AlbumRepository_API';
import Header from './Header';

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

    let repo: IAlbumCollectionRepository = new AlbumRepository_API();

    let albumCollection: AlbumCollection = await repo.getAlbumCollection();

    this.setState({
      albumCollection: albumCollection
    });

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
      <div className={styles.toDo}>
        <Container style={{border: "1px solid blue", margin: "30 30 30 30"}}>

          <Header text="Albums" onAlbumCollectionClick={this.onAlbumCollectionClick} albums={this.state.albumCollection.Albums}/>

          
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
      </div>


      
    );
  }







}
