import { AbsoluteFill, Img, staticFile, continueRender, delayRender } from 'remotion';

import CompactAchievements from '../../components/compact-achievements';
import Logo from '../../components/logo/logo';
import { Achievement, IPullFormatted } from '../../types/user';

const bg = staticFile('/images/background.jpg');

const waitForFont = delayRender();
const font = new FontFace(
  'Brother-1816',
  `url(${staticFile('/fonts/brother-1816-regular.woff2')}) format('woff2')`
);

font
  .load()
  .then(() => {
    document.fonts.add(font);
    continueRender(waitForFont);
  })
  .catch((err) => console.log('Error loading font', err));

interface ICompactImageProps {
  userName: string;
  pulls: IPullFormatted;
  totalPulls: number;
  achievementsList: Array<Achievement>;
}

const CompactImage = ({
  userName,
  pulls,
  totalPulls,
  achievementsList,
}: ICompactImageProps): JSX.Element => {
  return (
    <AbsoluteFill
      style={{
        fontFamily: 'Brother-1816',
        backgroundColor: 'black',
      }}
    >
      <AbsoluteFill>
        <Img src={bg} height={170} width={450} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          top: 16,
          left: 20,
        }}
      >
        <Logo
          style={{
            width: '64px',
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CompactAchievements userName={userName} pulls={pulls} totalPulls={totalPulls} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          color: 'white',
          // change this to go more down
          top: 125,
          left: 20,
          margin: '0',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {achievementsList?.map((achievement) => (
          <Img
            src={'https://novu.co/' + achievement.badge.src}
            alt={achievement.badge.altText}
            width={30}
            height={30}
            style={{ marginRight: 15 }}
          />
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default CompactImage;
