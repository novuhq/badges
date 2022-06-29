import path from 'path';

import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';

import { COMPOSITION_ID, COMPACT_COMPOSITION_ID } from '../config/composition';
import { IPullFormatted } from '../types/user';

interface IImageProps {
  userName: string;
  pulls: IPullFormatted;
  totalPulls: number;
  compact?: string;
}

const toReturn = {[`${COMPACT_COMPOSITION_ID}`]: undefined, [`${COMPOSITION_ID}`]: undefined};

const createBundler = async ({ compact }: {compact: any}) => {
  const id = compact ? COMPACT_COMPOSITION_ID : COMPOSITION_ID;
  if (toReturn[id]) {
    return toReturn[id];
  }
  const bundleLocation = await bundle(path.resolve('/../', 'src', 'index.tsx'));

  // Extract all the compositions you have defined in your project
  // from the webpack bundle.
  const comps = await getCompositions(bundleLocation);

  // Select the composition you want to render.
  const composition = comps.find((c) => c.id === id);

  // Ensure the composition exists
  if (!composition) {
    throw new Error(`No composition with the ID ${id} found`);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  toReturn[id] = {
    bundleLocation, comps, composition
  }

  return toReturn[id];
}
export const renderImage = async (
  { userName, pulls, totalPulls, compact }: IImageProps,
  imageOutput: string
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {bundleLocation, comps, composition} = await createBundler({compact});

    // Ensure the composition exists
    if (!composition) {
      throw new Error(`No composition with the ID found`);
    }

    await renderStill({
      composition,
      serveUrl: bundleLocation,
      output: imageOutput,
      scale: compact ? 2 : 1,
      imageFormat: 'jpeg',
      inputProps: {
        userName,
        pulls,
        totalPulls,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
