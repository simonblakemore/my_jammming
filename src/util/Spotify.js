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
};

export default Spotify;
