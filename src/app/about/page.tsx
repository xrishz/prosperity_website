import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight, IconMapPin, IconCheck } from '@tabler/icons-react';
import { agency } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/editorial.css';

export const metadata = pageMeta('About Prosperity', 'Meet Prosperity International Travel Services, a Cabuyao, Laguna travel agency founded in 2024 by Jocelyn G. Brodith and Christian Bryan L. Brodith.', '/about');

const team = [
  { name: 'Veronica', image: '/images/team-veronica.webp' },
  { name: 'Klarissa', image: '/images/team-klarissa.webp' },
  { name: 'Ms. Joy', image: '/images/team-joy.webp' },
  { name: 'Carla', image: '/images/team-carla.webp' },
];

const values = [
  { title: 'Excellence', description: 'Care in the details that shape each journey.' },
  { title: 'Integrity', description: 'Honest conversations and clear travel arrangements.' },
  { title: 'Customer commitment', description: 'Personal attention before, during and after your trip.' },
  { title: 'Teamwork', description: 'Working together to support each traveler.' },
  { title: 'Innovation', description: 'Looking for better ways to make travel planning simpler.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="container page-intro editorial-intro about-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">About</span></nav>
        <h1>Real people. Memorable journeys.</h1>
        <p>Your trusted partner in every journey, with a home in Cabuyao, Laguna.</p>
      </div>
      <figure className="container about-office-hero">
        <div className="photo"><Image src="/images/office.webp" alt="The Prosperity International Travel Services office with seating and the agency’s illuminated logo" fill sizes="(max-width: 1200px) 100vw, 1200px" preload /></div>
        <figcaption>Our office in Cabuyao, Laguna, pictured in the company profile.</figcaption>
      </figure>
      <section className="container section about-story">
        <h2>A personal beginning.</h2>
        <div className="prose">
          <p>Prosperity International Travel Services was founded in 2024 by Jocelyn G. Brodith and Christian Bryan L. Brodith, with a commitment to helping people discover the world through thoughtful, personal service.</p>
          <p>Jocelyn brings over 20 years of experience in sales and marketing and three years of administrative experience in the travel industry. Her personal background supports the care and attention at the heart of the agency.</p>
          <p>Today, the team assists with domestic and international travel, customized journeys, group arrangements and the practical details that help a trip come together.</p>
        </div>
      </section>
      <section className="container section about-team">
        <h2>The people behind your plans.</h2>
        <p>Meet the team introduced in Prosperity’s company profile.</p>
        <div className="about-team-grid">
          {team.map((member) => <figure key={member.name}><div className="photo"><Image src={member.image} alt={`${member.name}, a member of the Prosperity team`} fill sizes="(max-width: 650px) 50vw, (max-width: 1200px) 25vw, 280px" /></div><figcaption>{member.name}</figcaption></figure>)}
        </div>
      </section>
      <section className="container section about-values">
        <div className="about-values-intro"><h2>Care that travels with you.</h2><p>Our work is guided by Christian values, with respect and a warm welcome for people of every belief.</p></div>
        <dl>{values.map((value) => <div key={value.title}><dt>{value.title}</dt><dd>{value.description}</dd></div>)}</dl>
      </section>
      <section className="container section about-registered">
        <h2>Built on a clear foundation.</h2>
        <p>The company profile includes the following business documents:</p>
        <ul><li><IconCheck size={20} aria-hidden="true" />DTI business name registration</li><li><IconCheck size={20} aria-hidden="true" />BIR certificate of registration</li><li><IconCheck size={20} aria-hidden="true" />2026 Cabuyao business permit</li></ul>
        <p className="editorial-source-note">Business information is drawn from the agency’s supplied company profile.</p>
      </section>
      <section className="container section about-visit">
        <figure><div className="photo"><Image src="/images/traveler-group.webp" alt="A group of Prosperity travelers enjoying a trip in China" fill sizes="(max-width: 768px) 100vw, 580px" /></div><figcaption>Prosperity travelers in China, from the company profile.</figcaption></figure>
        <div><h2>Let’s talk about your next journey.</h2><p>Visit the office or reach out online. Bring an idea, a question or a destination you cannot stop thinking about.</p><p className="about-address"><IconMapPin size={22} aria-hidden="true" /><span>{agency.address}<br />{agency.addressDetail}</span></p><Link className="button" href="/contact">Get in touch <IconArrowUpRight size={20} aria-hidden="true" /></Link></div>
      </section>
    </>
  );
}
