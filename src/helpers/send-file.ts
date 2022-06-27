import fs from 'fs';

import { Response } from 'express';

export const sendFile = async (url: string, res: Response) => {
  res.header('Content-Type', 'image/jpg');

  fs.createReadStream(url)
    .pipe(res)
    .on('close', () => {
      res.end();
    });
};
