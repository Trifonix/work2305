const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/api', userRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Порт сервера: ${PORT}`);
});
