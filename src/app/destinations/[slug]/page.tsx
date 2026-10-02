import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IconArrowUpRight, IconCheck } from '@tabler/icons-react';
import { destinations } from '@/lib/content';
import { atlasGallery } from '@/lib/gallery-content';
import { pageMeta } from '@/lib/metadata';
import '@/components/editorial.css';

type Props = { params: Promise<{ slug: string }> };

const destinationStories: Record<string, { heading: string; copy: string; second: string; alternative?: { image: string; alt: string; caption: string } }> = {
  japan: {
    heading: 'Make space for the moments in between.',
    copy: 'A walk beside the water, a neighborhood you did not expect to love, a meal worth remembering. Japan invites both big discoveries and small everyday pleasures.',
    second: 'Your starting point can be a city, a season or simply an experience you have always wanted to try. Share it with our team, along with your preferred dates and who will be joining you.',
  },
  korea: {
    heading: 'Follow your curiosity.',
    copy: 'There is room for a quiet palace morning and an evening of city discoveries on the same journey. Let the details that interest you shape the way you explore Korea.',
    second: 'Whether you are traveling with family, friends or a smaller group, tell us what matters to you. Our team can help you discuss travel arrangements around those interests.',
  },
  turkey: {
    heading: 'A landscape that stays with you.',
    copy: 'Cappadocia’s sculpted valleys and open skies are a remarkable place to begin imagining Türkiye. Beyond the view, leave room for the culture, food and conversations along the way.',
    second: 'Use these scenes as inspiration, then share the places and experiences you hope to include. We can discuss available arrangements for the journey you have in mind.',
    alternative: { image: '/images/cappadocia-alternate.webp', alt: 'Hot air balloons drifting over Cappadocia’s valleys in Türkiye', caption: 'Another view of Cappadocia, Türkiye.' },
  },
  greece: {
    heading: 'Leave room to slow down.',
    copy: 'The blue horizon of Santorini, a sunlit lane, a moment shared over a meal. Greece can be a starting point for the kind of journey where time together matters as much as the sights.',
    second: 'Tell us what you imagine for your visit, from a quieter escape to a trip with loved ones. We can help you explore arrangements that reflect your plans.',
    alternative: { image: '/images/santorini-alternate.webp', alt: 'Whitewashed Santorini buildings stepping down a hillside towards the sea', caption: 'A hillside view of Santorini, Greece.' },
  },
  dubai: {
    heading: 'Give yourself a new perspective.',
    copy: 'Dubai’s architecture makes an impression from the first look. Imagine taking in the city with the people you enjoy traveling with, and discovering what interests you along the way.',
    second: 'Share whether you are planning a city break, family holiday or group journey. Our team can discuss flights, accommodation and other available travel arrangements with you.',
  },
};

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) return {};
  return pageMeta(`${destination.name} travel`, destination.intro, `/destinations/${slug}`);
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinations.find((item) => item.slug === slug);
  if (!destination) notFound();
  const story = destinationStories[slug];
  const otherDestinations = destinations.filter((item) => item.slug !== slug).slice(0, 2);
  const extraPhotos = atlasGallery.filter((photo) => photo.destination === slug && photo.src !== destination.image && photo.src !== story.alternative?.image);

  return (
    <div className="destination-page destination-detail-page">
      <div className="destination-sky">
      <div className="container page-intro editorial-intro destination-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/destinations">Destinations</Link><span aria-hidden="true">/</span><span aria-current="page">{destination.name}</span></nav>
        <h1>{destination.name}</h1>
        <p className="destination-phrase">{destination.phrase}</p>
        <Link className="button" href={`/plan?destination=${slug}`}>Plan your {destination.name} journey <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
      <figure className="container destination-hero">
        <div className="photo destination-hero-image"><Image src={destination.image} alt={destination.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" preload /></div>
        <figcaption>Destination inspiration: {destination.name}. Illustrative destination photography.</figcaption>
      </figure>
      </div>
      <section className="container section destination-story">
        <div>
          <h2>{story.heading}</h2>
          <p className="destination-story-lead">{destination.intro}</p>
        </div>
        <div className="prose">
          <p>{story.copy}</p>
          <p>{story.second}</p>
          <ul className="destination-moods" aria-label="Travel inspiration">
            {destination.moods.map((mood) => <li key={mood}><IconCheck size={18} aria-hidden="true" />{mood}</li>)}
          </ul>
        </div>
      </section>
      {extraPhotos.length > 0 && (
        <section className="container destination-detail-gallery" aria-labelledby="destination-gallery-heading">
          <div className="destination-gallery-heading">
            <h2 id="destination-gallery-heading">A little more of {destination.name}.</h2>
            <p>A different view to spark your plans. These stock photos are destination inspiration; your itinerary comes together in a conversation with our team.</p>
          </div>
          <div className="destination-gallery-photos">
            {extraPhotos.map((photo) => (
              <figure key={photo.src}>
                <div className="photo"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 850px) 100vw, 800px" /></div>
                <figcaption>
                  {photo.caption} Stock destination photography.
                  {photo.credit && <> <a href={photo.credit.url} target="_blank" rel="noopener noreferrer">Photo: {photo.credit.name}<span className="sr-only"> (stock source opens in a new tab)</span></a></>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
      {story.alternative ? (
        <figure className="container destination-second-view">
          <div className="photo"><Image src={story.alternative.image} alt={story.alternative.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" /></div>
          <figcaption>{story.alternative.caption} Illustrative destination photography.</figcaption>
        </figure>
      ) : (
        <section className="container destination-client-story">
          <figure>
            <div className="photo"><Image src="/images/traveler-group.webp" alt="A group of Prosperity travelers on a trip in China" fill sizes="(max-width: 768px) 100vw, 550px" /></div>
            <figcaption>From our travelers: a China trip pictured in Prosperity’s company profile.</figcaption>
          </figure>
          <div>
            <h2>Personal support for your journey.</h2>
            <p>Behind every travel plan are real people. Our team can assist with arrangements and stay in touch as your journey comes together.</p>
            <Link className="text-link" href="/about">Meet Prosperity <IconArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </section>
      )}
      <div className="destination-inquiry">
      <section className="container section destination-assistance">
        <h2>Let’s bring the details together.</h2>
        <p>Start with your destination, preferred dates and travel group. We’ll help you discuss the next steps.</p>
        <div className="destination-assistance-list">
          <div><h3>Travel arrangements</h3><p>Ask about flights, accommodation and customized or private tours.</p></div>
          <div><h3>Document assistance</h3><p>Discuss visa and passport assistance with our team. Final decisions rest with the issuing authorities.</p></div>
          <div><h3>A personal conversation</h3><p>Confirm the itinerary, current pricing, inclusions and availability directly before making a booking.</p></div>
        </div>
        <Link className="button" href={`/plan?destination=${slug}`}>Start a {destination.name} inquiry <IconArrowUpRight size={20} aria-hidden="true" /></Link>
        <Link className="text-link destination-services-link" href="/services">Explore our services <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
      </div>
      <section className="container section destination-more">
        <h2>Keep exploring.</h2>
        <div className="destination-more-grid">
          {otherDestinations.map((other) => <Link href={`/destinations/${other.slug}`} className="destination-more-link" key={other.slug}><div className="photo"><Image src={other.image} alt={other.alt} fill sizes="(max-width: 650px) 100vw, 580px" /></div><span>{other.name}<IconArrowUpRight size={24} aria-hidden="true" /></span></Link>)}
        </div>
        <Link className="text-link" href="/destinations">See all destinations <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
    </div>
  );
}
