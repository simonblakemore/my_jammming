const clientID = '1f0b3de4d6624e018cc234385e6f1798';
const redirectURI = 'http://localhost:3000/';

let accessToken;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const hrefAccessToken = window.location.href.match(/access_token=([^&]*)/);

    const hrefexpiresIn = window.location.href.match(/expires_in=([^&]*)/);

    if (hrefAccessToken && hrefexpiresIn) {
      accessToken = hrefAccessToken[1];
      const expiresIn = Number(hrefexpiresIn[1]);
      window.setTimeout(() => accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => response.json()).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return[];
      } else {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {Authorization: `Bearer ${accessToken}`};
    let userID;

    return fetch(`https://api.spotify.com/v1/me`, {headers: headers}).then(response => response.json()).then(jsonResponse => {
      userID = jsonResponse.id;
      console.log(userID);
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => response.json()).then(jsonResponse => {
      const playlistID = jsonResponse.id;
      console.log(playlistID);
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      });
    });
  });
},

};

export default Spotify;
