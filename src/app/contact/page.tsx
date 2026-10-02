import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight, IconArrowUpRight, IconBrandMessenger, IconBrandWhatsapp, IconClock, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { agency } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/inquiry.css';

export const metadata = pageMeta('Contact us', 'Speak with Prosperity International Travel Services through WhatsApp, Messenger, Viber, telephone or email, or visit our office in Cabuyao, Laguna.', '/contact');

export default function ContactPage() {
  return (
    <>
      <div className="container page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
        <h1>A real person.<br />A helpful next step.</h1>
        <p>Tell us where you would like to go. We’ll help you explore the possibilities.</p>
      </div>
      <section className="container section" aria-label="Contact details">
        <div className="contact-layout">
          <div className="contact-options">
            <div className="contact-option">
              <h2 className="contact-option-title"><IconBrandWhatsapp size={23} stroke={1.6} aria-hidden="true" /> WhatsApp</h2>
              <a href={agency.whatsapp} target="_blank" rel="noopener noreferrer">Start a WhatsApp conversation <IconArrowUpRight size={17} stroke={1.6} aria-hidden="true" /></a>
              <p>Opens WhatsApp for {agency.phone}. You choose when to send your message.</p>
            </div>
            <div className="contact-option">
              <h2 className="contact-option-title"><IconBrandMessenger size={23} stroke={1.6} aria-hidden="true" /> Messenger</h2>
              <a href={agency.messenger} target="_blank" rel="noopener noreferrer">Message our Facebook page <IconArrowUpRight size={17} stroke={1.6} aria-hidden="true" /></a>
              <p>Continue the conversation through our official Facebook page.</p>
            </div>
            <div className="contact-option">
              <h2 className="contact-option-title"><IconPhone size={23} stroke={1.6} aria-hidden="true" /> Call or Viber</h2>
              <a href={`tel:${agency.phoneIntl}`}>{agency.phone}</a>
              <br />
              <a href={agency.viber}>Open Viber <IconArrowUpRight size={17} stroke={1.6} aria-hidden="true" /></a>
              <p>If the app does not open, call this number or send us an email.</p>
            </div>
            <div className="contact-option">
              <h2 className="contact-option-title"><IconMail size={23} stroke={1.6} aria-hidden="true" /> Email</h2>
              <a className="contact-email" href={`mailto:${agency.email}`}>{agency.email}</a>
              <p>Share your destination ideas, travel dates or questions with our team.</p>
            </div>
          </div>
          <div>
            <div className="contact-office-image"><Image src="/images/office.webp" alt="The Prosperity International Travel Services office in Cabuyao, Laguna" fill sizes="(max-width: 767px) 100vw, 55vw" /></div>
            <div className="contact-office-details">
              <h2>Visit us in Cabuyao.</h2>
              <address><IconMapPin size={19} stroke={1.6} aria-hidden="true" /> {agency.address}<br />{agency.addressDetail}</address>
              <p className="contact-hours"><IconClock size={19} stroke={1.6} aria-hidden="true" /> Office hours: {agency.hours}</p>
              <p className="contact-office-note">Contact us before visiting to confirm the office is open on your chosen day.</p>
            </div>
          </div>
        </div>
        <div className="contact-plan-strip">
          <div><h2>Have a journey in mind?</h2><p>Put a few trip ideas into a message you can send through your preferred app.</p></div>
          <Link className="button" href="/plan">Plan your trip <IconArrowRight size={19} stroke={1.6} aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
