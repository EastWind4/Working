const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volExcelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sheetData: [
    {
      type: Object,
    },
  ],
  fileName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VolExcel = mongoose.model('VolExcel', volExcelSchema);

module.exports = VolExcel;
