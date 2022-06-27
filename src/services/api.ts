import https from 'https';

import { IUser } from '@/types/user';

const getUser = (userName: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    https.get(`https://contributors.novu.co/contributor/${userName}`, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error("Failed to get Contributor's data"));
      }
      let data = '';
      response
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          resolve(JSON.parse(data));
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
    https.get(`https://contributors.novu.co/contributors/`, (response) => {
      if (response.statusCode !== 200) {
        return reject(new Error("Failed to get Contributor's data"));
      }
      let data = '';
      response
        .on('data', (chunk) => {
          data += chunk;
        })
        .on('end', () => {
          resolve(JSON.parse(data));
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  });
};

export { getUser, getUsers };
