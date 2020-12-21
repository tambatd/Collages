export const authEndpoint = "https://accounts.spotify.com/authorize";

export const redirectUri = "http://localhost:3000/";
//Type in redirect URL 

export const scopes = [
    "user-top-read",
    //"user-read-currently-playing",
    //"user-read-playback-state",
    //"user-library-read",
    "playlist-modify-private"
];
