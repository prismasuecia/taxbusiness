import {ImageResponse} from 'next/og';
import {getDictionary} from '@/lib/dictionaries';
import {isLocale} from '@/lib/navigation';

export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default async function Image({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const dict = getDictionary(isLocale(locale) ? locale : 'sv');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F3EC',
          color: '#183C3C',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          fontFamily: 'Georgia'
        }}
      >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 42}}>Taxbusiness Stockholm</div>
          <div style={{fontSize: 24, color: '#B98B5A'}}>Solna / Stockholm</div>
        </div>
        <div style={{fontSize: 76, lineHeight: 1.05, maxWidth: 920}}>{dict.home.heroTitle}</div>
        <div style={{fontSize: 30, color: '#1D1D1B'}}>Svenska · Español · English</div>
      </div>
    ),
    size
  );
}
