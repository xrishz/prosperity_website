'use client';

import Link from 'next/link';
import {IconArrowUpRight} from '@tabler/icons-react';
import {TransportScene} from './transport-scene';
import {useTravelMotion} from './travel-motion-provider';

export function JourneyServices() {
  const {motionEnabled} = useTravelMotion();
  return <section className="journey-services section" aria-labelledby="journey-services-heading">
    <div className="container journey-services-grid">
      <div className="journey-services-story">
        <h2 id="journey-services-heading">More exploring.<br/>Less figuring<br/>it all out.</h2>
        <p>From your first idea to the details before you go, our team helps bring your travel plans together.</p>
        <TransportScene vehicle="bus" motionEnabled={motionEnabled} className="atlas-bus"/>
        <p className="journey-illustration-note">A little journey inspiration. Arrangements are confirmed with your consultant.</p>
      </div>
      <div className="journey-services-list">
        <article><h3>Trips made for you</h3><p>Domestic and international tours, private journeys, cruises, school trips and corporate travel.</p><Link href="/services#trips" className="text-link">Explore travel options <IconArrowUpRight size={20} aria-hidden/></Link></article>
        <article><h3>The details, taken care of</h3><p>Airline tickets, hotels and resorts, and travel insurance. Bring your plans together with help from our team.</p><Link href="/services#arrangements" className="text-link">See how we help <IconArrowUpRight size={20} aria-hidden/></Link></article>
        <article><h3>Guidance before you go</h3><p>Visa and passport assistance, with clear next steps for preparing your travel documents.</p><Link href="/services#documentation" className="text-link">Ask about assistance <IconArrowUpRight size={20} aria-hidden/></Link></article>
      </div>
    </div>
  </section>;
}
