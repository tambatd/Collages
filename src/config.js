export const authEndpoint = "https://accounts.spotify.com/authorize";

export const redirectUri = "https://spotify-collage-creator.herokuapp.com/";
//Type in redirect URL 
//export const redirectUri = "http://localhost:3000/";


export const scopes = [
    "user-top-read",
    //"user-read-currently-playing",
    //"user-read-playback-state",
    //"user-library-read",
    "playlist-modify-private"
];
