import * as React from 'react';
import { Img, staticFile } from 'remotion';

import { ACHIEVEMENTS, TAchievementIconKeys } from '../../config/achievements';
import { IPullFormatted } from '../../types/user';

const goldMedal = staticFile('/images/gold-medal.png');
const silverMedal = staticFile('/images/silver-medal.png');
const bronzeMedal = staticFile('/images/bronze-medal.png');

const imageCommonProps = {
  height: 130,
};

const icons: {
  [key in TAchievementIconKeys]: JSX.Element;
} = {
  goldMedal: <Img src={goldMedal} {...imageCommonProps} />,
  silverMedal: <Img src={silverMedal} {...imageCommonProps} />,
  bronzeMedal: <Img src={bronzeMedal} {...imageCommonProps} />,
};

interface IAchievementsProps {
  userName: string;
  pulls: IPullFormatted;
  totalPulls: number;
}

const CompactAchievements = ({ userName, pulls, totalPulls }: IAchievementsProps): JSX.Element => {
  const lastAchievement = ACHIEVEMENTS.filter((f) => totalPulls >= f.minStars)[0];

  const icon = icons[lastAchievement.iconName];
  const title = lastAchievement.title;
  const date = pulls.values[lastAchievement.minStars];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 45px 0 20px',
      }}
    >
      <div
        style={{
          maxWidth: 226,
        }}
      >
        <h3
          style={{
            fontSize: '24px',
            color: 'white',
            margin: '0',
            lineHeight: '1.125',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.125',
            color: '#E6E6E6',
            fontWeight: 'light',
            marginTop: '6px',
            marginBottom: '0',
          }}
        >
          Earned by contribution to Novu project by{' '}
          <span style={{ color: '#00AAFF' }}>{userName}</span> in {date}
        </p>
      </div>
      {icon}
    </div>
  );
};

export default CompactAchievements;
