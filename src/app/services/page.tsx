import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight, IconCheck } from '@tabler/icons-react';
import { serviceGroups } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/editorial.css';

export const metadata = pageMeta('Travel services', 'Personal assistance for tours, flights, accommodation, cruises, group travel, travel insurance, visas and passports from Prosperity International Travel Services.', '/services');

export default function ServicesPage() {
  return (
    <>
      <div className="container page-intro editorial-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Services</span></nav>
        <h1>Your journey, thoughtfully arranged.</h1>
        <p>From the first idea to the practical details, get personal assistance from our travel team.</p>
        <Link className="button" href="/plan">Tell us what you need <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </div>
      <div className="container service-directory">
        {serviceGroups.map((group, index) => (
          <section id={["trips", "arrangements", "documentation"][index]} className={`service-group service-group-${index}`} key={group.title}>
            {index < 2 && <figure><div className="photo service-group-image"><Image src={group.image} alt={group.alt} fill sizes="(max-width: 768px) 100vw, 580px" preload={index === 0} /></div><figcaption>Illustrative destination photography.</figcaption></figure>}
            <div className="service-group-copy">
              <h2>{group.title}</h2>
              <p>{group.description}</p>
              <ul>{group.items.map((item) => <li key={item}><IconCheck size={20} stroke={1.7} aria-hidden="true" /><span>{item}</span></li>)}</ul>
            </div>
          </section>
        ))}
      </div>
      <section className="container section service-process">
        <h2>A good plan starts with a conversation.</h2>
        <ol>
          <li><h3>Share your plans</h3><p>Tell us your destination, preferred dates, group size and the assistance you need.</p></li>
          <li><h3>Discuss the details</h3><p>Our team can help you explore arrangements and clarify your questions.</p></li>
          <li><h3>Confirm before booking</h3><p>Review current pricing, inclusions, availability and the applicable terms with the team.</p></li>
        </ol>
        <p className="service-note">Visa and passport assistance supports your preparation. Approval and issuance decisions remain with the relevant authorities.</p>
        <Link className="button" href="/plan">Start your travel inquiry <IconArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
    </>
  );
}
