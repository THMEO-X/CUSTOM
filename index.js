require('dotenv').config();
const keepAlive = require('./keep_alive');

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

keepAlive(); // ⚠️ phải gọi trước login

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Unicode số đậm
const boldMap = {
  '0':'𝟬','1':'𝟭','2':'𝟮','3':'𝟯','4':'𝟰',
  '5':'𝟱','6':'𝟲','7':'𝟳','8':'𝟴','9':'𝟵',
  ':':':',' ':' '
};

const toBold = (str) =>
  str.split('').map(c => boldMap[c] ?? c).join('');

let startTime;

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    startTime = Date.now();

    const updateStatus = () => {
        const diff = Date.now() - startTime;
        const totalSeconds = Math.floor(diff / 1000);

        let days = Math.floor(totalSeconds / 86400) % 365;
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor((totalSeconds % 60) / 5) * 5;

        const f2 = n => n.toString().padStart(2, '0');
        const f3 = n => n.toString().padStart(3, '0');

        let text;
        if (days === 0) {
            text = `${f2(hours)}:${f2(minutes)}:${f2(seconds)}`;
        } else if (days < 100) {
            text = `${f2(days)} ${f2(hours)}:${f2(minutes)}:${f2(seconds)}`;
        } else {
            text = `${f3(days)} ${f2(hours)}:${f2(minutes)}:${f2(seconds)}`;
        }

        client.user.setActivity({
            name: toBold(text),
            type: ActivityType.Streaming
        });
    };

    updateStatus();
    setInterval(updateStatus, 5000);
});

client.login(process.env.TOKEN);