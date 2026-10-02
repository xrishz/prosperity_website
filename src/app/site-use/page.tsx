import Link from 'next/link';
import { agency } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/inquiry.css';

export const metadata = pageMeta('Website information', 'Understand how to use the Prosperity travel website, destination inspiration and contact tools before discussing your travel arrangements with our team.', '/site-use');

export default function SiteUsePage() {
  return (
    <>
      <div className="container page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Website information</span></nav>
        <h1>Before you travel.</h1>
        <p>Helpful context for browsing destinations and starting a travel inquiry.</p>
      </div>
      <section className="container section">
        <div className="notice-content prose">
          <h2>Explore, then speak with our team</h2>
          <p>This website introduces Prosperity International Travel Services, its travel services and selected destinations. The trip planner prepares an inquiry message. It does not book a trip, confirm availability or collect payment.</p>

          <h2>Confirm the details of your trip</h2>
          <p>Ask the agency about available arrangements, current prices, inclusions, dates, document requirements and applicable booking conditions for your specific trip. Review the quotation and relevant supplier conditions before making a booking or payment.</p>
          <p>Visa and passport assistance are support services. Decisions and requirements come from the relevant authorities. Discuss your circumstances and current requirements directly with the agency.</p>

          <h2>Photography and traveler stories</h2>
          <p>Destination photographs illustrate the places featured on this website. They do not confirm a particular itinerary, hotel, activity or package inclusion. Traveler photographs and testimonial excerpts identified as Prosperity client stories come from the agency’s supplied company profile. Individual experiences may differ.</p>

          <h2>External contact services</h2>
          <p>WhatsApp, Messenger, Viber, Facebook, telephone and email links open a separate app or service. You choose whether to send a message there. If an app link does not work on your device, use the telephone or email contact details instead.</p>

          <h2>Need clarification?</h2>
          <p>Contact the team at <a href={`mailto:${agency.email}`}>{agency.email}</a> or <a href={`tel:${agency.phoneIntl}`}>{agency.phone}</a>. You can also <Link href="/contact">see all contact options</Link> or <Link href="/plan">prepare a travel inquiry</Link>.</p>
        </div>
      </section>
    </>
  );
}
