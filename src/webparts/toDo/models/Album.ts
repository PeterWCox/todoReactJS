import { Guid } from '@microsoft/sp-core-library';
import Song from './Song';

export default class Album {

    //Properties

    public Id: string;
    public ArtistName : string;
    public AlbumName : string;
    public Songs : Song[];
    public IsDisplayed: boolean = true;

    //Methods

    public toggleDisplay(): void {
        this.IsDisplayed = !this.IsDisplayed;
    }

    public getConcatenatedName() : string {
        return `${this.ArtistName} - ${this.AlbumName}`;
    }
}