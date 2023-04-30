import mongoose from "mongoose";

const newStoreStatusSchema = new mongoose.Schema({
  isStoreOpen: {
    type: Boolean,
    default: false
  },
  isOpenStoreAuto: Boolean,
  storeHours: {
    monOpen: String,
    monClose: String,
    tueOpen: String,
    tueClose: String,
    wedOpen: String,
    wedClose: String,
    thuOpen: String,
    thuClose: String,
    friOpen: String,
    friClose: String,
    satOpen: String,
    satClose: String,
    sunOpen: String,
    sunClose: String,
  },
  offDays: [
    String,
  ]

})

const NewStoreStatus = mongoose.models.NewStoreStatus || mongoose.model('NewStoreStatus', newStoreStatusSchema)

export default NewStoreStatus