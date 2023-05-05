import mongoose from "mongoose";

const Schema = mongoose.Schema

const couponSchema = new Schema(
  {
    couponNumber: {
      type: Number,
    }, // to be created at backend
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    couponCode: {
      type: String,
      required: true,
      unique: true,
    }, // to be entered from client
    amount: {
      type: Number,
      required: true,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    couponUsedAccts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
  },{timestamps: true}
)

const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema)
export default Coupon