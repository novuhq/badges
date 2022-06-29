import * as React from 'react';
import { Img, staticFile } from 'remotion';

import { ACHIEVEMENTS, TAchievementIconKeys } from '../../config/achievements';
import { IPullFormatted } from '../../types/user';

const goldMedal = staticFile('/images/gold-medal.png');
const silverMedal = staticFile('/images/silver-medal.png');
const bronzeMedal = staticFile('/images/bronze-medal.png');

const imageCommonProps = {
  height: 248,
};

const icons: {
  [key in TAchievementIconKeys]: JSX.Element;
} = {
  goldMedal: <Img src={goldMedal} {...imageCommonProps} />,
  silverMedal: <Img src={silverMedal} {...imageCommonProps} />,
  bronzeMedal: <Img src={bronzeMedal} {...imageCommonProps} />,
};

interface IAchievementsProps {
  pulls: IPullFormatted;
  totalPulls: number;
  compact?: boolean;
}

const Achievements = ({ pulls, totalPulls }: IAchievementsProps): JSX.Element => {
  const lastAchievement = ACHIEVEMENTS.filter((f) => totalPulls >= f.minStars)[0];

  const icon = icons[lastAchievement.iconName];
  const title = lastAchievement.title;
  const date = pulls.values[lastAchievement.minStars];

  return (
    <div>
      {icon}

      <div
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '14px',
        }}
      >
        <h3
          style={{
            fontSize: '24px',
            margin: '0',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '18px',
            color: '#666666',
            fontWeight: 'light',
            marginTop: '6px',
            marginBottom: '0',
          }}
        >
          {date}
        </p>
      </div>
    </div>
  );
};

export default Achievements;
