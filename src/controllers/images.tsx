import path from 'path';

import { getFormattedPulls } from '../helpers/get-formatted-pulls';
import { renderImage } from '../helpers/render-image';
import { getUser, getUsers } from '../services/api';

const imagesController = async () => {
  const { list } = await getUsers();
  const users = list.filter(({ totalPulls, teammate }) => totalPulls > 0 && !teammate);
  console.log('Creating images');
  for (const { github, totalPulls } of users) {
    try {
      // try with this to get badges
      // github = 'TheLearneer';
      // totalPulls = 3;
      console.log('Create badges for ' + github);
      // we need to get the full information on pulls, which is missing from the /contributors/ endpoint,
      // so we have to make an additional request to extract this data
      const { pulls, achievementsList } = await getUser(github);
      // console.log({ achievementsList });
      const formattedPulls = getFormattedPulls(pulls);
      console.log(formattedPulls);
      console.log(path.join(process.env.SAVE_FOLDER!, `/${github}.jpg`));
      const imageOutput = path.join(process.env.SAVE_FOLDER!, `/${github}.jpg`);
      const imageOutputCompact = path.join(process.env.SAVE_FOLDER!, `/${github}-small.jpg`);

      const imageProps = {
        userName: github,
        pulls: formattedPulls,
        totalPulls,
        achievementsList,
      };

      await renderImage(imageProps, imageOutput);
      await renderImage({ compact: 'true', ...imageProps }, imageOutputCompact);
    } catch (err) {
      // not empty catch statement anymore to stop the error
    }
  }
};

export default imagesController;
