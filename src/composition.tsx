import { Still } from 'remotion';

import CompactImage from './compositions/compact-image';
import Image from './compositions/image';
import { COMPOSITION_ID, COMPACT_COMPOSITION_ID } from './config/composition';

export const RemotionImage = (): JSX.Element => (
  <>
    <Still
      id={COMPOSITION_ID}
      component={Image}
      width={1280}
      height={630}
      defaultProps={{
        userName: 'andrewgolovanov',
        pulls: {
          counter: 6,
          values: {
            1: 'April 27, 2022',
            3: 'June 1, 2022',
            7: 'June 1, 2022',
          },
        },
        totalPulls: 7,
      }}
    />
    <Still
      id={COMPACT_COMPOSITION_ID}
      component={CompactImage}
      width={450}
      height={170}
      defaultProps={{
        userName: 'andrewgolovanov',
        pulls: {
          counter: 6,
          values: {
            1: 'April 27, 2022',
            3: 'June 1, 2022',
            7: 'June 1, 2022',
          },
        },
        totalPulls: 7,
      }}
    />
  </>
);
