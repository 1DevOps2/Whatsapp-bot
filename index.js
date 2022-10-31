const qrcode = require('qrcode-terminal');
const axios = require('axios');

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth()
}
);

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Greeting Message
client.on('message', message => {
	if(message.body === 'Hello') {
		message.reply('Hey, How are you?');
	}
});

// Morning Message
client.on('message', message => {
	if(message.body === 'Morning') {
		client.sendMessage(message.from, 'Good Morning Sir!');
	}
});

// Send random meme
client.on('message', async message => {
    const content = message.body
    
    if (content === "Meme") {
        const meme = await axios("https://meme-api.herokuapp.com/gimme")
        .then(res => res.data)

        client.sendMessage(message.from, await MessageMedia.fromUrl(meme.url))
            
        }
});
 

client.initialize();
