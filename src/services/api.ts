import https from 'https';

import { Achievement, IUser } from '../types/user';

const getUser = (userName: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    https.get(`${process.env.API_PATH}/${userName}/page-data.json`, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error("Failed to get Contributor's data"));
      }
      let data = '';
      response
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          const parsedData = JSON.parse(data).result;
          const pullsData = parsedData.pageContext.contributor;
          const achievementsData =
            parsedData.data?.wpUserAchievement?.userAchievement?.achievementsList;
          const achievements: Array<Achievement> = achievementsData?.map((achievement: any) => {
            // only god can understand this after today
            return {
              achievementDate: achievement.achievementDate,
              title: achievement.achievement.title,
              tooltip: achievement.achievement.achievement.tooltip,
              badge: {
                altText: achievement.achievement.achievement.badge.altText,
                src: achievement.achievement.achievement.badge.localFile.childImageSharp
                  .gatsbyImageData.images.fallback.src,
                width:
                  achievement.achievement.achievement.badge.localFile.childImageSharp
                    .gatsbyImageData.width,
                height:
                  achievement.achievement.achievement.badge.localFile.childImageSharp
                    .gatsbyImageData.height,
              },
            };
          });
          resolve({ ...pullsData, achievementsList: achievements });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });
};

const getUsers = (): Promise<{
  list: IUser[];
  pages: number;
}> => {
  return new Promise((resolve, reject) => {
    https.get(`${process.env.API_PATH}/page-data.json`, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error("Failed to get Contributor's data"));
      }
      let data = '';
      response
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          resolve(JSON.parse(data).result.pageContext.contributors);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });
};

export { getUser, getUsers };
