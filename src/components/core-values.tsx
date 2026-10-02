import Image from 'next/image';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';

// The supplied company profile, slide 3. Keep these values and statements intact.
const values = [
  { title: 'Excellence', description: 'We aim to exceed expectations every time.' },
  { title: 'Integrity', description: 'We practice honesty and transparency in all we do.' },
  { title: 'Customer Commitment', description: 'Our clients’ happiness comes first.' },
  { title: 'Teamwork', description: 'We grow and succeed together.' },
  { title: 'Innovation', description: 'We continuously improve and adapt to serve you better.' },
];

const team = [
  { name: 'Veronica', image: '/images/team-veronica.webp' },
  { name: 'Klarissa', image: '/images/team-klarissa.webp' },
  { name: 'Ms. Joy', image: '/images/team-joy.webp' },
  { name: 'Carla', image: '/images/team-carla.webp' },
];

export function CoreValues() {
  return (
    <section className="section values-section" aria-labelledby="values-heading">
      <div className="container values-layout">
        <div className="values-story">
          <h2 id="values-heading">Our core values.</h2>
          <p>Five values guide how we work together and care for your journey.</p>
          <div className="values-photo-stack" role="group" aria-label="The Prosperity team">
            {team.map((member) => (
              <figure className="values-member" key={member.name}>
                <div className="photo values-portrait">
                  <Image
                    src={member.image}
                    alt={`${member.name}, a member of the Prosperity team`}
                    fill
                    sizes="(max-width: 650px) 23vw, (max-width: 1100px) 16vw, 145px"
                  />
                </div>
                <figcaption>{member.name}</figcaption>
              </figure>
            ))}
          </div>
          <Link className="text-link" href="/about">Meet the people behind your plans <IconArrowUpRight size={19} aria-hidden /></Link>
        </div>
        <dl className="values-list">
          {values.map((value) => (
            <div key={value.title}>
              <dt>{value.title}</dt>
              <dd>{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
