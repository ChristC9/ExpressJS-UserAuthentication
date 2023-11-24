const mongoose = require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/express_user_auth").then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err)
})