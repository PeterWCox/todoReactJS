import Song from './Song';
import Album from './Album';

export default class AlbumCollection {

    //Properties

    public Albums : Album[] = [];

    //Methods

    public ToggleAlbumShown(albumId: string) : void {

        //Get index of album matching Id 
        let matchingIndex: number = null;

        this.Albums.map((album, index) => {
            if (album.Id == albumId){
                matchingIndex = index;
            } 
        })

        //Toggle display
        if (matchingIndex !== null) {
            this.Albums[matchingIndex].toggleDisplay();
        }
    }

    public ToggleAlbumShown_All() : void {

        //Get number of albums showing songs
        let displayedAlbums: Album[] = this.Albums.filter(album => 
            album.IsDisplayed == true
        );

        //If no albums showing songs...
        if (displayedAlbums == null || displayedAlbums.length == 0) {

            //Expand all albums
            this.Albums.map(album => {
                album.IsDisplayed = true;
            })
        }
        else {

            //Minimise all albums
            this.Albums.map(album => {
                album.IsDisplayed = false;
            });
        }
    }


  
}