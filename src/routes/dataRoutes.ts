import express from 'express';
import { getAllEntities, createEntity, deleteEntities, editEntity, getAllReuqest } from '../controllers/dataController';

const router = express.Router();

router.get('/api/entities', getAllEntities);
router.get('/api/request', getAllReuqest);
router.post('/api/createEntity', createEntity)
router.delete('/api/deleteEntities', deleteEntities)
router.put('/api/editEntity/:id', editEntity); 

export default router;