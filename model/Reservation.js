import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  name: String,
  totalParty: Number,
  comments: String,
  email: String,
  contact: String,
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  isShowedUp: {
    type: Boolean,
    default: false,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  isDenied: {
    type: Boolean,
    default: false,
  },
  reserveDate: Date,
}, {timestamps: true})

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema)

export default Reservation