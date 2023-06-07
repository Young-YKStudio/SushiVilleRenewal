import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ]
    },
    password: {
      type: String,
      minlength: 5,
    },
    image: String,
    role: {
      type: String,
      default: 'user',
    },
    contact: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    id: String,
    address: String,
    Orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NewOrder'
      }
    ],
    Reservations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
      }
    ],
    FavoriteItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      }
    ],
    Coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon'
      }
    ]
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User