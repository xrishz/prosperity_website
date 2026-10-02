import type { Metadata } from 'next';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')).replace(/\/$/, '');
export function pageMeta(title: string, description: string, path: string, image = '/images/social.jpg'): Metadata {
 return {title, description, alternates:{canonical:path}, openGraph:{title:`${title} | Prosperity Travel`,description,url:`${siteUrl}${path}`,siteName:'Prosperity International Travel Services',type:'website',images:[{url:image,width:1200,height:630,alt:'Prosperity International Travel Services — Your trusted partner in every journey'}]},twitter:{card:'summary_large_image',title,description,images:[image]}};
}
