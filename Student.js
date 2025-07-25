const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
  rollNumber: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  fullName: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  registeredAt: { 
    type: Date, 
    default: Date.now 
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Hash password before saving
StudentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('Student', StudentSchema);
