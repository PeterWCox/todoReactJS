import AlbumCollection from "../models/AlbumCollection";

export default interface IAlbumCollectionRepository {

    getAlbumCollection: () => Promise<AlbumCollection>;
    
}