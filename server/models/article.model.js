const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
    id: {
        type: Number,
        index: true,
        unique: true
    },
    title: {
        type: String,
        required: 'Article title can\'t be empty'
    },
    description: {
        type: String,
    },
    image: {
        type: String
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
