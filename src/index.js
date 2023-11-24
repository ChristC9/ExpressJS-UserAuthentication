const express = require('express');
const app = express();
const port = 3000;

const authRoutes = require('./routes/auth');

require('./database');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(authRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})