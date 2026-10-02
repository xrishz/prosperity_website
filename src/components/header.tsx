'use client';
import {useEffect,useRef,useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ThemeChoice} from './theme-choice';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import {IconArrowUpRight,IconMenu2,IconX} from '@tabler/icons-react';
const links=[['/','Home'],['/destinations','Destinations'],['/services','Services'],['/about','About'],['/contact','Contact']];
export function Header(){
 const path=usePathname(); const [open,setOpen]=useState(false);const reduce=useReducedMotion();const toggle=useRef<HTMLButtonElement>(null);const menu=useRef<HTMLElement>(null);
 const close=()=>{setOpen(false);toggle.current?.focus();};
 useEffect(()=>{if(!open)return; const previous=document.body.style.overflow;document.body.style.overflow='hidden';menu.current?.querySelector<HTMLAnchorElement>('a')?.focus(); const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){e.preventDefault();setOpen(false);toggle.current?.focus();} if(e.key==='Tab'){const els=[toggle.current,...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement|HTMLButtonElement>('a, button')??[])].filter((x):x is HTMLButtonElement|HTMLAnchorElement=>!!x);const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}};document.addEventListener('keydown',key);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',key);};},[open]);
 const active=(href:string)=>href==='/'?path==='/':path.startsWith(href);
 return <header className="site-header"><div className="header-inner container">
  <Link href="/" className="brand" aria-label="Prosperity Travel home" onClick={()=>setOpen(false)}><Image src="/images/logo.png" alt="Prosperity International Travel Services" width={128} height={128} priority/></Link>
  <nav className="desktop-nav" aria-label="Main navigation">{links.map(([href,label])=><Link key={href} href={href} aria-current={active(href)?'page':undefined}>{label}</Link>)}</nav>
  <ThemeChoice location="desktop"/><Link href="/plan" className="button header-cta">Plan your trip <IconArrowUpRight size={18} aria-hidden/></Link>
  <button className="icon-button menu-toggle" ref={toggle} aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>open?close():setOpen(true)}>{open?<IconX aria-hidden/>:<IconMenu2 aria-hidden/>}</button>
 </div><AnimatePresence>{open&&<motion.nav id="mobile-navigation" ref={menu} className="mobile-nav" aria-label="Mobile navigation" initial={reduce?false:{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduce?0:.2}}>{links.map(([href,label])=><Link key={href} href={href} aria-current={active(href)?'page':undefined} onClick={()=>setOpen(false)}>{label}<IconArrowUpRight size={22} aria-hidden/></Link>)}<Link href="/plan" className="button" onClick={()=>setOpen(false)}>Plan your trip <IconArrowUpRight aria-hidden/></Link><ThemeChoice location="mobile"/><p>A real person. A trip that feels like you.</p></motion.nav>}</AnimatePresence></header>;
}
