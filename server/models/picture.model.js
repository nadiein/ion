const mongoose = require('mongoose');

let PictureSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true,
        unique: true
    },
    image: {
        binData: Buffer,
        contentType: String
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Picture', PictureSchema);
