import path from 'path';

import { Request, Response } from 'express';
import hash from 'object-hash';

import { getFormattedPulls } from '@/helpers/get-formatted-pulls';
import { renderImage } from '@/helpers/render-image';
import { getUser, getUsers } from '@/services/api';

interface IImage {
  type: 'og:image' | 'embed:image';
  url: string;
}

interface ISchema {
  userName: string;
  images: IImage[];
}

const imagesController = async (req: Request, res: Response) => {
  try {
    const { list } = await getUsers();
    const users = list.filter(({ totalPulls, teammate }) => totalPulls > 0 && !teammate);

    const imageFullUrl = req.protocol + '://' + req.get('host') + '/images';

    await Promise.all(
      users.map(async ({ github, totalPulls }): Promise<ISchema> => {
        // we need to get the full information on pulls, which is missing from the /contributors/ endpoint,
        // so we have to make an additional request to extract this data
        const { pulls } = await getUser(github);

        const formattedPulls = getFormattedPulls(pulls);

        const hashedImageName = hash({ github, totalPulls: totalPulls });
        const hashedEmbedImageName = hash({ github, totalPulls: totalPulls, compact: true });

        const imageOutput = path.resolve('public', `images/${github}/${hashedImageName}.jpg`);
        const embedImageOutput = path.resolve(
          'public',
          `images/${github}/${hashedEmbedImageName}.jpg`
        );

        const imageProps = {
          userName: github,
          pulls: formattedPulls,
          totalPulls,
        };

        await renderImage(imageProps, imageOutput);
        await renderImage({ compact: 'true', ...imageProps }, embedImageOutput);

        return {
          userName: github,
          images: [
            {
              type: 'og:image',
              url: `${imageFullUrl}/${github}/${hashedImageName}.jpg`,
            },
            {
              type: 'embed:image',
              url: `${imageFullUrl}/${github}/${hashedEmbedImageName}.jpg`,
            },
          ],
        };
      })
    ).then((schema) => res.status(200).json(schema));
  } catch (err) {
    console.log(err);
  }
};

export default imagesController;
