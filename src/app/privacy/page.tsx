import Link from 'next/link';
import { agency } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import '@/components/inquiry.css';

export const metadata = pageMeta('Privacy notice', 'Learn how the optional travel inquiry draft works, what stays in your browser and what happens when you open an external contact service.', '/privacy');

export default function PrivacyPage() {
  return (
    <>
      <div className="container page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Privacy notice</span></nav>
        <h1>Privacy notice.</h1>
        <p>A clear explanation of the travel inquiry tools on this website.</p>
      </div>
      <section className="container section">
        <div className="notice-content prose">
          <h2>Your optional trip draft</h2>
          <p>The trip planner lets you add a destination, travel month and number of travelers, and edit a message. These details form a draft in your browser. The planner does not submit the draft to an agency database or send a message automatically.</p>
          <p>The draft is saved using this browser tab’s session storage so it can remain available while you browse. Use the planner’s Clear control to remove the saved details. Session storage normally ends when the tab or browser session closes, although browser restore features may preserve a session. If storage is blocked, you can still create a draft.</p>

          <h2>Your appearance preference</h2>
          <p>The sun or moon control switches between light and dark appearance. On your first visit, the website follows your device’s color preference. An explicit light or dark choice is saved in this browser’s local storage under prosperity-appearance so it can be used on your next visit. This stores the appearance setting only. Clear this website’s browser data to remove the saved preference and follow your device again.</p>

          <h2>Opening a contact app</h2>
          <p>Opening WhatsApp places your draft in a WhatsApp link. WhatsApp receives the link when you open it; you review and send the message in the app. Messenger and Viber links open their respective services. Copying a draft places its text on your device’s clipboard so you can paste it into a conversation.</p>
          <p>These services operate separately from this website and have their own privacy policies and settings. Information you choose to send through chat, telephone or email is shared through that channel.</p>

          <h2>Keep sensitive documents out of your draft</h2>
          <p>This website has no passport, ID, payment or document upload form. Please do not put passport numbers, identity documents, card details or other sensitive information in the travel inquiry draft. Ask the agency directly about the appropriate next steps for documents needed for your chosen service.</p>

          <h2>Website delivery</h2>
          <p>Loading the website makes requests to its hosting provider for pages and media. The provider may process technical request information, such as an IP address, as part of delivering and protecting the website.</p>

          <h2>Questions about your information</h2>
          <p>For questions about information you have shared with Prosperity International Travel Services, contact <a href={`mailto:${agency.email}`}>{agency.email}</a> or call <a href={`tel:${agency.phoneIntl}`}>{agency.phone}</a>.</p>
        </div>
      </section>
    </>
  );
}
