import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight, IconCheck } from '@tabler/icons-react';
import { Hero } from '@/components/hero';
import { DestinationCarousel } from '@/components/destination-carousel';
import { CoreValues } from '@/components/core-values';
import { Testimonials } from '@/components/testimonials';
import { InquiryCTA } from '@/components/inquiry-cta';
import { JourneyServices } from '@/components/journey-services';
import { DestinationGallery } from '@/components/destination-gallery';
import { pageMeta } from '@/lib/metadata';
import { agency } from '@/lib/content';
import { atlasGallery } from '@/lib/gallery-content';

export const metadata = pageMeta(
  'Your trusted partner in every journey',
  'Discover your next destination with Prosperity. Personal travel planning, tours, flights, hotels and documentation assistance from Cabuyao, Laguna.',
  '/',
);

export default function Home() {
  return (
    <>
      <Hero />
      <DestinationCarousel />
      <section className="section container why-section" aria-labelledby="why-heading">
        <div className="why-photo photo">
          <Image
            src="/images/traveler-group.webp"
            alt="Prosperity travelers together at Tianmen Mountain in Zhangjiajie, China"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <span>Actual moments from our travelers</span>
        </div>
        <div className="why-copy">
          <h2 id="why-heading">A journey that<br />feels like you.</h2>
          <p>Every traveler has a different idea of a great trip. We take time to understand yours.</p>
          <p>From choosing a destination to arranging flights, stays and travel documents, Prosperity brings personal care to the details.</p>
          <ul className="why-points">
            <li><IconCheck aria-hidden size={20} />Travel plans shaped around your needs</li>
            <li><IconCheck aria-hidden size={20} />Practical guidance before you go</li>
            <li><IconCheck aria-hidden size={20} />Support throughout your journey</li>
          </ul>
          <div className="home-section-actions">
            <Link className="button" href="/plan">Plan your trip <IconArrowUpRight aria-hidden size={20} /></Link>
            <Link className="text-link" href="/services">Explore our services <IconArrowUpRight aria-hidden size={19} /></Link>
          </div>
        </div>
      </section>
      <CoreValues />
      <JourneyServices />
      <DestinationGallery photos={atlasGallery} />
      <section className="moments-section section" aria-labelledby="moments-heading">
        <div className="container">
          <h2 id="moments-heading">Places become memories.<br />People make them matter.</h2>
          <p>From our travelers’ photo album.</p>
        </div>
        <div className="moments-rail" role="region" tabIndex={0} aria-label="Real Prosperity travel moments">
          <figure>
            <Image
              src="/images/traveler-mountains.webp"
              alt="Prosperity group travelers among the mountains of Zhangjiajie"
              width={960}
              height={720}
              sizes="(max-width: 768px) 86vw, 48vw"
            />
            <figcaption>Discovering Zhangjiajie together</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/traveler-pagoda.webp"
              alt="A small group of Prosperity travelers beside a pagoda in China"
              width={1200}
              height={1600}
              sizes="(max-width: 768px) 70vw, 30vw"
            />
            <figcaption>A new place. A shared memory.</figcaption>
          </figure>
        </div>
      </section>
      <section className="section container planning-section" aria-labelledby="planning-heading">
        <div className="planning-heading">
          <h2 id="planning-heading">A great trip starts<br />with a conversation.</h2>
          <Link className="button" href="/plan">Plan your trip <IconArrowUpRight aria-hidden size={20} /></Link>
        </div>
        <ol className="planning-steps">
          <li><span>1</span><h3>Share your ideas</h3><p>Your destination, who’s coming and when you hope to travel. It’s fine if you’re still deciding.</p></li>
          <li><span>2</span><h3>Explore your options</h3><p>Talk with our team about arrangements that fit your preferences and the details you need help with.</p></li>
          <li><span>3</span><h3>Get ready to go</h3><p>Confirm the details with your consultant and get assistance preparing for your journey.</p></li>
        </ol>
      </section>
      <Testimonials />
      <section className="section container office-section" aria-labelledby="office-heading">
        <div className="office-copy">
          <h2 id="office-heading">Real people.<br />A place to say hello.</h2>
          <p>Visit our Cabuyao office or reach us on your preferred messaging app. We’d love to hear what you’re planning.</p>
          <address>{agency.address}<br />{agency.addressDetail}</address>
          <p>Office hours: {agency.hours}</p>
          <Link href="/contact" className="text-link">Visit or contact us <IconArrowUpRight aria-hidden size={19} /></Link>
        </div>
        <div className="photo office-photo">
          <Image
            src="/images/office.webp"
            alt="Prosperity’s actual office seating area and illuminated agency logo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>
      <InquiryCTA />
    </>
  );
}
