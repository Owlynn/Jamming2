let accessToken;
const clientID = '224f5c514c6c488f80603d7b4a41e566';
const redirectUrl = 'http://localhost:3000/';

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }

                //check for access Token Match
        const accessTokenMatch = window.href.match(/access_token=([^&]*)/);
        const expiresInMatch= window.location.href.match(/exipres_in=([^&]*)/)

        if(accessTokenMatch&&expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
            window.location = accessUrl;
        }
    },
    search(term){
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
                    {headers: 
                        {Authorization : `Bearer ${accessToken}`}
                    }).then(response => {
                        return response.json();
                    }).then(jsonResponse => {
                            if (!jsonResponse){
                                return [];
                            }
                            return jsonResponse.tracks.item.map(track =>({
                                id : track.id,
                                name : track.name,
                                artist: track.artists[0].name,
                                album : track.album.name,
                                uri : track.uri
                            }))
                    })
    }

}

export default Spotify;