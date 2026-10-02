import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import { destinations } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/editorial.css';

export const metadata = pageMeta('Destinations', 'Explore Japan, Korea, Türkiye, Greece and Dubai, then begin a personal travel inquiry with Prosperity International Travel Services.', '/destinations');

export default function DestinationsPage() {
  return (
    <div className="destination-page destination-overview-page">
      <div className="destination-sky">
      <div className="container page-intro editorial-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Destinations</span></nav>
        <h1>A world worth exploring.</h1>
        <p>Find a place that speaks to you. We’ll help you turn the idea into a personal travel inquiry.</p>
        <p className="destination-stock-note">Destination photographs are stock inspiration. Share what catches your eye, then discuss the available arrangements with our team.</p>
      </div>
      </div>
      <section className="container destination-index" aria-label="Featured destinations">
        {destinations.map((destination) => (
          <article className="destination-entry" key={destination.slug}>
            <Link href={`/destinations/${destination.slug}`} className="destination-entry-link">
              <div className="destination-entry-image photo">
                <Image src={destination.image} alt={destination.alt} fill sizes={destination.slug === 'japan' ? '(max-width: 1200px) 100vw, 1200px' : '(max-width: 650px) 100vw, (max-width: 1200px) 50vw, 580px'} preload={destination.slug === 'japan'} />
              </div>
              <div className="destination-entry-title"><h2>{destination.name}</h2><IconArrowUpRight size={28} stroke={1.5} aria-hidden="true" /></div>
              <p className="destination-entry-region">{destination.region}</p>
              <p>{destination.phrase}</p>
            </Link>
          </article>
        ))}
      </section>
      <div className="destination-inquiry">
      <section className="container section editorial-invitation">
        <h2>Have somewhere else in mind?</h2>
        <p>These are a few starting points. Tell us where you would like to go and the kind of trip you are imagining.</p>
        <Link href="/plan" className="button">Tell us about your trip <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
      </div>
    </div>
  );
}
