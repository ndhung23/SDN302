const mongoose = require('mongoose');
const {Schema} = mongoose;

const EmployeeSchema = new Schema({
    name: {
        fistName: { type: String},
        lastName: { type: String},
        middleName: { type: String}
    },
    dateOfBirth: { type: Date},
    gender: { type: String, enum: ['male','female','other']},
    manager: { type: String},
    department: { type: Schema.Types.ObjectId, ref: 'Department'},
    account: {
        email: { type: String },
        password: { type: String },
    },
    dependents: [{
        _id: { type: Schema.Types.ObjectId},
        fullname: {type:String},
        relation: {type:String},
    }],
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job'}],
}, {timestamps: false})

module.exports = mongoose.model('Employee',EmployeeSchema,'employees')
