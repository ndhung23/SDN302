const mongoose = require('mongoose');
const {Schema} = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, required: true },
    description:{ type: String},
},{ timestamps: false });

module.exports = mongoose.model('Department', DepartmentSchema, 'departments');