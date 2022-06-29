import { AbsoluteFill, Img, staticFile, continueRender, delayRender } from 'remotion';

import CompactAchievements from '../../components/compact-achievements';
import Logo from '../../components/logo/logo';
import { IPullFormatted } from '../../types/user';

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
}

const CompactImage = ({ userName, pulls, totalPulls }: ICompactImageProps): JSX.Element => (
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
  </AbsoluteFill>
);

export default CompactImage;
