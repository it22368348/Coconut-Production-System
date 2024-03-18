const mongoose = require('mongoose');

const qualityControlSchema = new mongoose.Schema({

    Product:{
        type:String,
        required:true
    },
    TestDate:{
        type:String,
        required:true
    },
    TestResult:{
        type:String,
        required:true
    },

});

module.exports = mongoose.model('qualityControl',qualityControlSchema);