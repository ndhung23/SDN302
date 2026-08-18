const mongoose = require('mongoose');
const {Schema} = mongoose;

const JobSchema = new Schema({
    name:{ type: String, require: true},
    issues:[{
        title: { type: String},
        date: { type: Date, default: Date.now },
        isCompleted: { type: Boolean, default: false}
    }],
    startDate: { type: Date},
    endDate: { type: Date}
}, { timestamps: false })

module.exports = mongoose.model('Job', JobSchema, 'jobs');