import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  caption: String,
  price: Number,
  category: String,
  Sub_Category: String,
  stock_availability: {
    type: Boolean,
    default: true
  },
  image: String,
}, {timestamps: true})

const Menu = mongoose.models.Category || mongoose.model("NewMenu", menuSchema)

export default Menu