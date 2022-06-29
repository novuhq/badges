import schedule from 'node-schedule';

import 'dotenv/config';
import imagesController from './controllers/images';

imagesController();

schedule.scheduleJob('0 * * * *', imagesController);
