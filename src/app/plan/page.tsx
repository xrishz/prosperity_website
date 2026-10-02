import Image from 'next/image';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { InquiryPlanner } from '@/components/inquiry-planner';
import { destinations } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';

export const metadata = pageMeta('Plan your trip', 'Start a personal travel inquiry with Prosperity. Share an optional destination, travel month and traveler count, then open your preferred chat app.', '/plan');

export default async function PlanPage({ searchParams }: { searchParams: Promise<{ destination?: string | string[] }> }) {
  const query = await searchParams;
  const selected = typeof query.destination === 'string' ? destinations.find((destination) => destination.slug === query.destination) : undefined;
  const image = selected?.image ?? '/images/japan-fuji.webp';
  const alt = selected?.alt ?? 'Mount Fuji beyond a lake framed by cherry blossoms';

  return (
    <>
      <div className="container page-intro">
        <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Plan your trip</span></nav>
        <h1>Let’s plan your<br />next journey.</h1>
        <p>{selected ? `Thinking about ${selected.name}? Start a conversation with our team.` : 'A few ideas are all you need to start. Tell us what you have in mind.'}</p>
      </div>
      <section className="container section plan-layout" aria-label="Create your travel inquiry">
        <InquiryPlanner initialDestination={selected?.slug} />
        <aside className="plan-aside">
          <div className="plan-aside-image"><Image src={image} alt={alt} fill sizes="(max-width: 480px) 100vw, (max-width: 900px) 40vw, 32vw" /></div>
          <div>
            <h2>Travel plans start with a conversation.</h2>
            <p>No need to have every detail ready. Our team can help you explore travel arrangements and the practical next steps.</p>
            <Link className="text-link" href="/contact">Meet us or speak directly <IconArrowRight size={18} stroke={1.6} aria-hidden="true" /></Link>
          </div>
        </aside>
      </section>
    </>
  );
}
