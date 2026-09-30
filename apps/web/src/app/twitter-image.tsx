import { ImageResponse } from 'next/og';
import { defaultCard } from '@/lib/og-card';
import { loadFont } from '@/lib/og-assets';

// The root card every route without its own image unfurls into. Replaces the
// old 317×128 "passport" banner, which X and the other cards dropped for being
// under the summary_large_image minimum.
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Collect people, not points.';

export default function Image() {
  const regularFont = loadFont('fonts/NotoSans-Regular.ttf');
  const boldFont = loadFont('fonts/NotoSans-Bold.ttf');

  return new ImageResponse(defaultCard(), {
    ...size,
    // Both weights are required: passing only the bold font replaces Satori's default font
    // entirely, so every text node (not just the ones with fontWeight: 700) would render in
    // bold with no regular counterpart to fall back to.
    fonts: [
      {
        name: 'Noto Sans',
        data: regularFont,
        weight: 400,
        style: 'normal',
      },
      {
        name: 'Noto Sans',
        data: boldFont,
        weight: 700,
        style: 'normal',
      },
    ],
  });
}
