require('dotenv').config();
const amqp = require('amqplib');
const SongsInPlaylistService = require('./SongsInPlaylistService');
const MailSender = require('./MailSender');
const Listener = require('./Listener');

const init = async () => {
  const songsInPlaylistService = new SongsInPlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(songsInPlaylistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlists', {
    durable: true,
  });

  channel.consume('export:SongsInPlaylist', listener.listen, { noAck: true });
};

init();
