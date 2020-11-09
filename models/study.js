// models/study.js

const mongoose = require('mongoose');

const pointSchema = mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});



// schema
const studySchema = mongoose.Schema({ // 1
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  title:{type:String, required:true},
  field:{type:String, required:true},
  num:{type:Number,required:true},
  location:{type: pointSchema,required:true},
  time:{type:String,required:true},
  period:{type:String,required:true},
  createdAt:{type:Date, default:Date.now}, // 2
  updatedAt:{type:Date},
});

// model & export
const Study = mongoose.model("study", studySchema);

module.exports = Study;

//생성한사람,신청한사람 모두 들어가도록 