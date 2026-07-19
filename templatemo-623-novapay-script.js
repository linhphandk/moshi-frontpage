const nav=document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',window.scrollY>10);
});
window.addEventListener('load',()=>{
  document.querySelectorAll('.hero-content,.hero-visual').forEach((el,i)=>{
    setTimeout(()=>el.classList.add('visible'),i*150+100);
  });
});

const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
let scrollY=0;
hamburger.addEventListener('click',()=>{
  const open=mobileMenu.classList.contains('open');
  if(open){
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.position='';
    document.body.style.top='';
    window.scrollTo({top:scrollY,behavior:'instant'});
  } else {
    scrollY=window.scrollY;
    document.body.style.position='fixed';
    document.body.style.top=`-${scrollY}px`;
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded','true');
  }
});
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click',()=>{
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.position='';
    document.body.style.top='';
    window.scrollTo({top:scrollY,behavior:'instant'});
  });
});

const faqs=[
  {q:'What is a media kit?',a:'A media kit is a one-page summary of your creator profile — your stats, audience demographics, niches, and content samples. Brands use it to decide if you\'re a fit for their campaigns. Noshi makes creating one effortless.'},
  {q:'Is Noshi really free?',a:'Yes — always. Noshi is free for every creator, regardless of follower count. There are no hidden tiers, no "premium" subscriptions, and no credit card required. We\'ll introduce optional paid features later for power users, but the core product stays free.'},
  {q:'How does it work?',a:'Connect your social accounts (or enter stats manually), tell us about your content and niches, and we generate a stunning media kit as a PDF and a live shareable page at noshi.com/@yourhandle. It takes about 2 minutes.'},
  {q:'Who is Noshi for?',a:'Noshi is built for micro and mid-sized creators with 1K to 100K followers. If you\'ve ever been asked for a media kit by a brand and didn\'t have one — or spent hours making one in Canva — Noshi is for you.'},
  {q:'What platforms do you support?',a:'You can connect Instagram, TikTok, and YouTube. If your platform isn\'t listed yet, you can still enter your follower count and engagement manually — raw stats speak louder than the platform name.'},
  {q:'Can brands find me on Noshi?',a:'Not yet — our Phase 1 focuses on getting you set up with a beautiful media kit. In Phase 2, brands will be able to discover and reach out to creators directly on Noshi. Joining the waitlist now means you\'ll be first when that launches.'},
  {q:'What info goes into the media kit?',a:'Your name, photo, bio, location, linked platforms with follower counts and engagement rates, niche tags, and up to 3 content samples. You control everything — nothing is public until you publish your profile.'},
];
const faqList=document.getElementById('faqList');
faqs.forEach((f,i)=>{
  const item=document.createElement('div');
  item.className='faq-item';
  item.innerHTML=`<div class="faq-q"><span class="faq-q-text">${f.q}</span><svg class="faq-chevron" viewBox="0 0 24 24"><polyline points="6,9 12,15 18,9"/></svg></div><div class="faq-a">${f.a}</div>`;
  item.querySelector('.faq-q').addEventListener('click',()=>{
    item.classList.toggle('open');
  });
  faqList.appendChild(item);
});

let allExpanded=false;
function toggleAllFaq(){
  allExpanded=!allExpanded;
  document.querySelectorAll('.faq-item').forEach(el=>{
    allExpanded?el.classList.add('open'):el.classList.remove('open');
  });
  document.getElementById('faqToggleLabel').textContent=allExpanded?'Collapse all':'Expand all';
  const icon=document.getElementById('faqToggleIcon');
  icon.innerHTML=allExpanded
    ?'<line x1="5" y1="12" x2="19" y2="12"/>'
    :'<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>';
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(href==='#')return;
    e.preventDefault();
    const target=document.querySelector(href);
    if(target)target.scrollIntoView({behavior:'smooth'});
  });
});

const revealObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
},{threshold:0.12});
document.querySelectorAll('.silk-reveal,.silk-reveal-left,.silk-reveal-right').forEach((el,i)=>{
  el.style.animationDelay=(i%4)*0.08+'s';
  revealObs.observe(el);
});

// Waitlist form
const waitlistBtn=document.getElementById('waitlistBtn');
const waitlistInput=document.getElementById('waitlistEmail');
if(waitlistBtn&&waitlistInput){
  waitlistBtn.addEventListener('click',()=>{
    const email=waitlistInput.value.trim();
    if(!email||!email.includes('@')){
      waitlistInput.style.borderColor='var(--red)';
      setTimeout(()=>waitlistInput.style.borderColor='',2000);
      return;
    }
    waitlistBtn.textContent='You\'re on the list!';
    waitlistBtn.disabled=true;
    waitlistBtn.style.opacity='.6';
    waitlistInput.disabled=true;
    // bump counter
    const numEl=document.getElementById('waitlistNum');
    if(numEl){
      const current=parseInt(numEl.textContent.replace(/,/g,''));
      numEl.textContent=(current+1).toLocaleString();
    }
  });
  waitlistInput.addEventListener('keydown',e=>{
    if(e.key==='Enter')waitlistBtn.click();
  });
}
