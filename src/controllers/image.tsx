import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';
import hash from 'object-hash';

import { getFormattedPulls } from '@/helpers/get-formatted-pulls';
import { renderImage } from '@/helpers/render-image';
import { sendFile } from '@/helpers/send-file';
import { getUser } from '@/services/api';

interface IImageRequest extends Request {
  query: {
    userName: string;
    compact?: string;
  };
}

const imageController = async (req: IImageRequest, res: Response) => {
  try {
    const { userName, compact } = req.query;

    if (!userName) {
      return res.status(400).json({
        error: 'Missing userName query parameter',
      });
    }

    const user = await getUser(userName);
    const pulls = getFormattedPulls(user.pulls);

    const hashedImageName = hash({ userName, totalPulls: user.totalPulls });

    // Image generation
    const imageProps = {
      userName,
      pulls,
      totalPulls: user.totalPulls,
      compact,
    };
    const imageOutput = path.resolve('public', `images/${userName}/${hashedImageName}.jpg`);

    await renderImage(imageProps, imageOutput);

    await sendFile(imageOutput, res);

    // fs.rm(`static/${userName}`, { recursive: true }, (err) => {
    //   if (err) throw err;
    // });
  } catch (err) {
    console.log(err);
  }
};

export default imageController;
