const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//tạo các thuộc tính user
name: {
    type: String,
    required: true
},
age: {
    type: Number,
    required: true
},
// tạo thêm giới tính, điểm toán ,lý hóa
gender: {
    type: String,
    required: true
},
mathScore: {
    type: Number,
    required: true
},
physicsScore: {
    type: Number,
    required: true
},
chemistryScore: {
    type: Number,
    required: true
},
});

const userModel = mongoose.model('student', userSchema, 'student');
module.exports = userModel;
