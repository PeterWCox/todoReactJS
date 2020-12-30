import Album from "../models/Album";
import AlbumCollection from "../models/AlbumCollection";
import Song from "../models/Song";
import IAlbumRepository from './IAlbumRepository';


export default class AlbumRepository_Stub implements IAlbumRepository {

    public async getAlbumCollection(): Promise<AlbumCollection> {

        return null;
    }
}