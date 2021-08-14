const { Pool } = require('pg');

class SongsInPlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsInPlaylist({ playlistId }) {
    const query = {
      text: `
      SELECT songs.id, songs.title, songs.performer FROM songs LEFT JOIN songs_in_playlist 
      ON songs_in_playlist.song_id = songs.id WHERE songs_in_playlist.playlist_id = $1
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = SongsInPlaylistService;
