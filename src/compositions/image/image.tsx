import { AbsoluteFill, Img, staticFile, continueRender, delayRender } from 'remotion';

import Achievements from '../../components/achievements';
import Logo from '../../components/logo/logo';
import { IPullFormatted } from '@/types/user';

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

interface ICompositionProps {
  userName?: string;
  pulls: IPullFormatted;
  totalPulls: number;
}

const Image = ({ userName, pulls, totalPulls }: ICompositionProps): JSX.Element => (
  <AbsoluteFill
    style={{
      fontFamily: 'Brother-1816',
      backgroundColor: 'black',
    }}
  >
    <AbsoluteFill>
      <Img src={bg} height={630} width={1280} />
    </AbsoluteFill>

    <AbsoluteFill
      style={{
        top: 40,
        left: 40,
      }}
    >
      <Logo
        style={{
          width: '160px',
        }}
      />
    </AbsoluteFill>

    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: '575px',
        margin: '0 auto',
      }}
    >
      <Achievements pulls={pulls} totalPulls={totalPulls} />
    </AbsoluteFill>

    <p
      style={{
        position: 'absolute',
        fontSize: '18px',
        bottom: 40,
        left: '50%',
        color: 'white',
        transform: 'translateX(-50%)',
        margin: '0',
      }}
    >
      Earned by contribution to Novu project by {userName}
    </p>
  </AbsoluteFill>
);

export default Image;
