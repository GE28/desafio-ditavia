import express from 'express';
import { getAllSmartphones, getSmartphone, createSmartphone, updateSmartphone, deleteSmartphone } from '../controllers/smartphoneController.mjs';

const router = express.Router();

router.get('/', getAllSmartphones);
router.get('/:id', getSmartphone);
router.post('/', createSmartphone);
router.put('/:id', updateSmartphone);
router.delete('/:id', deleteSmartphone);

export default router;