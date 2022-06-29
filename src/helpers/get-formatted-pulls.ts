import moment from 'moment';

import { IPull, IPullFormatted } from '../types/user';

export const getFormattedPulls = (pulls: IPull[]): IPullFormatted => {
  const formattedPulls = pulls
    .slice(0)
    .reverse()
    .reduce(
      (all: IPullFormatted, current) => {
        if (all.counter === 1 || all.counter === 3 || all.counter === 7) {
          all.values[all.counter] = moment(current.merged_at).format('LL');
        }
        all.counter += 1;
        return all;
      },
      { counter: 1, values: {} }
    );

  return formattedPulls;
};
