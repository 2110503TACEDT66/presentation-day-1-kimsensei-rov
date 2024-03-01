const mongose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    telephone: {
        type: String,
        required: [true, 'Please add a telephone number'],
        match: [
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
            'Please add a valid telephone number'
        ]
    }
});

// Cascade delete appointments when a hospital is deleted
HotelSchema.pre('remove', async function(next) {
    console.log(`Appointments being removed from hotel ${this._id}`);
    await this.model('Appointment').deleteMany({ hotel: this._id });
    next();
});

// Reverse populate with virtuals
HotelSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hotel',
    justOne: false
});

module.exports = mongoose.model('Hotel', HotelSchema);