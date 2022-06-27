import path from 'path';

import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';

import { COMPOSITION_ID, COMPACT_COMPOSITION_ID } from '../config/composition';
import { IPullFormatted } from '@/types/user';

interface IImageProps {
  userName: string;
  pulls: IPullFormatted;
  totalPulls: number;
  compact?: string;
}

export const renderImage = async (
  { userName, pulls, totalPulls, compact }: IImageProps,
  imageOutput: string
): Promise<void> => {
  const id = compact ? COMPACT_COMPOSITION_ID : COMPOSITION_ID;

  try {
    const bundleLocation = await bundle(path.resolve('/src', 'index.tsx'));

    // Extract all the compositions you have defined in your project
    // from the webpack bundle.
    const comps = await getCompositions(bundleLocation);

    // Select the composition you want to render.
    const composition = comps.find((c) => c.id === id);

    // Ensure the composition exists
    if (!composition) {
      throw new Error(`No composition with the ID ${id} found`);
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
