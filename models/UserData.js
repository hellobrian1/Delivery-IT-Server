const mongoose =  require('mongoose')
const Schema = mongoose.Schema

const UserDataSchema = new mongoose.Schema({
    id: {
        type: int,
    },
    name: {
        type: String,
        required: [true, 'please add a name'],
        trim: true,
    },

});

module.exports = mongoose.model('UserData', UserDataSchema)