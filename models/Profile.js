const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ProfileSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "users"},
    handle: {
        type: String,
        required: true,
        max: 40
    },
    status: {type: String, required: true},
    skills: {type: [String], required: true},
    company: {type: String},
    location: {type: String},
    bio: {type: String},
    website: {type: String},
    social: {
        github: {type: String},
        twitter: {type: String},
        facebook: {type: String},
        linkedin: {type: String},
        instagram: {type: String},
        youtube: {type: String}
    },
    experience: [
        {
            title: {type: String, required: true},
            company: {type: String, required: true},
            location: {type: String},
            from: {type: Date, required: true},
            to: {type: Date},
            current: {type: Boolean, default: false},
            description: {type: String}
        }
    ],
    education: [
        {
            school: {type: String, required: true},
            degree: {type: String, required: true},
            fieldofstudy: {type: String, required: true},
            from: {type: Date, required: true},
            to: {type: Date},
            current: {type: Boolean, default: false},
            description: {type: String}
        }
    ],
    date: {type: Date, default: Date.now}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
