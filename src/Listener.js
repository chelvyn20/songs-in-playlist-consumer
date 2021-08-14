class Listener {
  constructor(songsInPlaylistService, mailSender) {
    this._songsInPlaylistService = songsInPlaylistService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());
      const songsInPlaylist = await this._songsInPlaylistService.getSongsInPlaylist(playlistId);

      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(songsInPlaylist));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
