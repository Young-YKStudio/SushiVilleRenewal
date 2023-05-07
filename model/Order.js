import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderedItems: [
    {
      addOns: {
        brownRice: {
          type: Boolean,
          default: false
        },
        crunch: {
          type: Boolean,
          default: false
        },
        eelSauce: {
          type: Boolean,
          default: false,
        },
        lunchPicks: {
          roll1: String,
          roll2: String,
          roll3: String,
        },
        message: String,
        porkOrVeg: {
          type: String,
          default: null
        },
        salGoneWildRainbow: {
          type: String,
          default: null
        },
        soyPaper: {
          type: Boolean,
          default: false
        },
        spicyMayo: {
          type:Boolean,
          default: false
        },
        spicyOrSweet: {
          type: String,
          default: null
        },
        spicyTunaOrCali: {
          type: String,
          default: null
        },
        tunaOrSalmon: {
          type: String,
          default: null
        }
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
      },
      qty: {
        type: Number,
        require: true,
      }
    }
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: String,
  isAgreed: {
    type: Boolean,
    default: false,
    require: true
  },
  isScheduled: {
    type: Date,
  },
  isPaidAtRestaurant: {
    type: Boolean,
    default: false
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  orderNum: Number,
  grandTotal: Number,
  addOnTotal: Number,
  orderTotal: Number,
  supplementTotal: Number,
  taxRate: Number,
  orderCount: Number,
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  isPlaced: {
    type: Boolean,
    default: false,
  },
  isConfirmed: {
    type: Boolean,
    default: false,
  },
  isReady: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
}, {timestamps: true})

orderSchema.index({ updatedAt: 1 })

const NewOrder = mongoose.models.NewOrder || mongoose.model('NewOrder', orderSchema)

export default NewOrder
