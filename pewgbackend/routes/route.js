import express from 'express';
import { NewUserData } from '../controller/NewUserdata.js';
import upload from '../utils/multerConfig.js';

const router = express.Router();

router.post('/register_pewg_member', upload.single('image'), NewUserData);

export default router;
