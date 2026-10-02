'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {motion} from 'motion/react';
import {IconArrowUpRight} from '@tabler/icons-react';
import {useTravelMotion} from '@/components/travel-motion-provider';

export type GalleryPhoto = {
  src: string;
  alt: string;
  caption: string;
  destination: string;
  country: string;
  credit?: {name: string; url: string};
};

const filters = ['All places', 'Japan', 'Korea', 'Türkiye', 'Greece', 'Dubai'] as const;
type GalleryFilter = typeof filters[number];

export function DestinationGallery({photos}: {photos: GalleryPhoto[]}) {
  const [selectedFilter, setSelectedFilter] = useState<GalleryFilter>('All places');
  const [hasFiltered, setHasFiltered] = useState(false);
  const {motionEnabled, reducedMotion} = useTravelMotion();
  const visiblePhotos = selectedFilter === 'All places'
    ? photos
    : photos.filter(photo => photo.country === selectedFilter);
  const animateFilter = hasFiltered && motionEnabled && !reducedMotion;

  function selectFilter(filter: GalleryFilter) {
    if (filter === selectedFilter) return;
    setHasFiltered(true);
    setSelectedFilter(filter);
  }

  return (
    <section className="atlas-gallery section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="gallery-heading">
          <h2 id="gallery-heading">Your next journey, in pictures.</h2>
          <p>
            A little inspiration for the places you could go. These are stock destination
            photos; our traveler stories feature photos and feedback from Prosperity trips.
          </p>
        </div>

        <div className="gallery-filters" role="group" aria-label="Filter destination photos">
          {filters.map(filter => (
            <button
              key={filter}
              type="button"
              className={`gallery-filter${selectedFilter === filter ? ' is-active' : ''}`}
              aria-pressed={selectedFilter === filter}
              aria-controls="destination-photo-grid"
              onClick={() => selectFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="gallery-result-count" role="status" aria-live="polite" aria-atomic="true">
          {visiblePhotos.length} {visiblePhotos.length === 1 ? 'photo' : 'photos'}
          {selectedFilter === 'All places' ? ' to spark your plans' : ` of ${selectedFilter}`}
        </p>

        <div className="gallery-grid" id="destination-photo-grid">
          {visiblePhotos.length > 0 ? visiblePhotos.map((photo, index) => (
            <motion.figure
              key={`${selectedFilter}-${photo.src}`}
              className="gallery-photo"
              data-layout={index % 6 === 0 ? 'wide' : index % 6 === 3 ? 'tall' : 'standard'}
              initial={animateFilter ? {opacity: 0.55, y: 12} : false}
              animate={{opacity: 1, y: 0}}
              transition={animateFilter
                ? {duration: 0.36, delay: Math.min(index, 4) * 0.04, ease: [0.16, 1, 0.3, 1]}
                : {duration: 0}}
            >
              <div className="gallery-image">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={index % 6 === 0
                    ? '(max-width: 767px) calc(100vw - 40px), (max-width: 1320px) 56vw, 730px'
                    : index % 6 === 1
                      ? '(max-width: 767px) calc(100vw - 40px), (max-width: 1320px) 40vw, 520px'
                      : '(max-width: 767px) calc(100vw - 40px), (max-width: 1320px) 48vw, 627px'}
                />
              </div>
              <figcaption className="gallery-caption">
                <div>
                  <span>{photo.country}</span>
                  <p>{photo.caption}</p>
                  {photo.credit && (
                    <a
                      className="gallery-credit"
                      href={photo.credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Photo by ${photo.credit.name}, view stock source in a new tab`}
                    >
                      Photo: {photo.credit.name}
                    </a>
                  )}
                </div>
                <Link className="text-link" href={`/destinations/${photo.destination}`}>
                  Explore {photo.country} <IconArrowUpRight size={19} aria-hidden />
                </Link>
              </figcaption>
            </motion.figure>
          )) : (
            <p className="gallery-empty">
              No photos are available for this destination yet. Choose another place to keep exploring.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
