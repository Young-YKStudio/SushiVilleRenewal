import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: String,
  caption: String,
  description: String,
  price: Number,
  category: String,
  Sub_Category: String,
  stock_availability: {
    type: Boolean,
    default: true
  },
  image: String,
  ordered: {
    type: Number,
    default: 0,
  },
}, {timestamps: true})

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema)

export default Menu