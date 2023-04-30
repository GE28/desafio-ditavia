import { SmartphoneModel as Smartphone } from '../models/Smartphone.mjs';

export async function getAllSmartphones (req, res) {
  try {
    const smartphones = await Smartphone.find();
    res.status(200).json(smartphones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export async function getSmartphone (req, res) {
  const id = req.params.id;

  try {
    const smartphone = await Smartphone.findById(id);
    res.json(smartphone);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export async function createSmartphone (req, res) {
  const smartphone = {
    brand: req.body.brand,
    model: req.body.model,
    memoryCapacity: req.body.memoryCapacity,
    releaseDate: req.body.releaseDate
  };

  try {
    const newSmartphone = await Smartphone.create(smartphone); 
    res.status(201).json(newSmartphone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export async function updateSmartphone (req, res) {
  const id = req.params.id;

  const smartphone = {
    brand: req.body.brand,
    model: req.body.model,
    memoryCapacity: req.body.memoryCapacity,
    releaseDate: req.body.releaseDate
  };

  try {
    const updatedSmartphone = await Smartphone.findByIdAndUpdate(id, smartphone, { new: true });
    res.json(updatedSmartphone);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export async function deleteSmartphone (req, res) {
  const id = req.params.id;

  try {
    await Smartphone.findByIdAndDelete(id);
    res.json({ message: 'Smartphone deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
