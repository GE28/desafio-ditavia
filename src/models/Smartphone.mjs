import mongoose from 'mongoose';

const SmartphoneSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  memoryCapacity: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
});

const SmartphoneModel = mongoose.model('Smartphone', SmartphoneSchema);

export { SmartphoneModel };
