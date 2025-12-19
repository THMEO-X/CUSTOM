const express = require('express');
const app = express();

// ⚠️ Render bắt buộc dùng PORT này
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

function keepAlive() {
    app.listen(PORT, () => {
        console.log(`🌐 Keep-alive running on port ${PORT}`);
    });
}

module.exports = keepAlive;