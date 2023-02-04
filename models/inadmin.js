const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volExcelSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  sheetData: [
    {
      type: Object,
    },
  ],
  fileName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VolExcel = mongoose.model('VolInExcel', volExcelSchema);

module.exports = VolExcel;