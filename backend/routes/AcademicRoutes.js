import express from 'express';
import { getAllAssessments, updateAssessment } from '../controllers/academicController.js';

const router = express.Router();

router.get('/', getAllAssessments);
router.put('/:id', updateAssessment);

export default router;
