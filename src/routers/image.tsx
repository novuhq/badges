import { Router } from 'express';

import imageController from '@/controllers/image';
import imagesController from '@/controllers/images';

const router = Router();

router.get('/image', imageController);
router.get('/images', imagesController);

export default router;
