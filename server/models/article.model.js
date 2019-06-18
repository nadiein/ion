const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true,
        unique: true
    },
    title: {
        type: String
    },
    description: {
        type: String,
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

mongoose.model('Article', ArticleSchema);
