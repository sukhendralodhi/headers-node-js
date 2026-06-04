const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.linsten(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});