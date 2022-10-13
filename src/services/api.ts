import https from 'https';

import { IUser } from '../types/user';

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
          resolve(JSON.parse(data).result.pageContext.contributor);
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
