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

    phoneNumber: {
        type: String,
        maxLength: [20, 'phone number cannot be longer than 20 characters']
    },
    username: {
        type: String,
        required: [true, '']
    }

});

module.exports = mongoose.model('UserData', UserDataSchema)