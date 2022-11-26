import clientID from './ClientID'

let accessToken;
// const clientID = '224f5c514c6c488f80603d7b4a41e566';
const redirectUrl = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            console.log(accessToken)
            return accessToken;
        }

        //check for access Token Match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/expires_in=([^&]*)/)

        if(accessTokenMatch&&expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            console.log("access Url")
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = accessUrl;
        }
    },

    search(term){
        const accessToken = Spotify.getAccessToken();
        console.log("je rentre dans la fonction");
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
                    {headers: {Authorization : `Bearer ${accessToken}`}}
                    ).then(response => {
                        console.log("response" + response);
                        return response.json();}
                    ).then(jsonResponse => {
                        if (!jsonResponse.tracks){
                            console.log("no jsonResponse.track");
                            return [];
                        }
                        console.log("retourne un résultat")
                        return jsonResponse.tracks.items.map(track =>({
                            id : track.id,
                            name : track.name,
                            artist: track.artists[0].name,
                            album : track.album.name,
                            uri : track.uri
                        }))
                    })
    },
    savePlaylist(name, UriArray){
        if(!name||!UriArray.length){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization : `Bearer  ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers:headers})
            .then(response => response.json())
            .then(jsonResponse => 
                {
                    console.log(jsonResponse);
                    userId = jsonResponse.id;
                    return fetch(
                        `https://api.spotify.com/v1/users/${userId}/playlists`,
                        {
                            headers: headers,
                            method : 'POST',
                            body: JSON.stringify({name:name})
                        }
                    )
                }
            )
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse)
                const playlistId = jsonResponse.id;
                return fetch(
                    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris : UriArray})
                    }
                )
            })
    }
}

export default Spotify;