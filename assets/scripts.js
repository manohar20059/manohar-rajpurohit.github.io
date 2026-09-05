/* Scripts: reels autoplay, services filter, WhatsApp CTAs, contact fetch (admin-only) */

(() => {
  const WA_NUMBER = "+919079216393"; // using +91; change if needed
  const WA_BASE = `https://wa.me/${WA_NUMBER.replace(/[^\d+]/g,'')}`;
  // Background video fallback: if autoplay blocked, show poster
  const bg = document.getElementById('bgVideo');
  bg.addEventListener('error',()=>{ bg.style.display='none'; });

  // Reels carousel: autoplay vertical
  const carousel = document.getElementById('reelsCarousel');
  let reelIndex = 0;
  const reels = Array.from(carousel.querySelectorAll('.reel'));
  function showReel(i){
    const r = reels[i];
    r.scrollIntoView({behavior:'smooth',block:'center'});
    // play video if present
    reels.forEach((el, idx)=>{
      const v = el.querySelector('video');
      if (v) { if(idx===i){ v.play().catch(()=>{});} else { v.pause(); v.currentTime=0; } }
    });
  }
  function nextReel(){
    reelIndex = (reelIndex + 1) % reels.length;
    showReel(reelIndex);
  }
  // autoplay every 4s
  let reelTimer = setInterval(nextReel, 4000);
  carousel.addEventListener('mouseenter', ()=> clearInterval(reelTimer));
  carousel.addEventListener('mouseleave', ()=> reelTimer = setInterval(nextReel, 4000));
  // keyboard support
  carousel.addEventListener('keydown', e=>{
    if(e.key==='ArrowDown'){ nextReel(); }
    if(e.key==='ArrowUp'){ reelIndex = (reelIndex-1+reels.length)%reels.length; showReel(reelIndex); }
  });

  // Services filter & CTAs
  document.querySelectorAll('.service-filters button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.service-filters button').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.service-card').forEach(card=>{
        card.style.display = (f==='all' || card.dataset.type === f) ? '' : 'none';
      });
    });
  });

  // Buttons: Book & Meeting open WhatsApp with prefilled message (professional)
  function openWhatsApp(prefilled){
    const message = encodeURIComponent(prefilled);
    window.open(`${WA_BASE}?text=${message}`, '_blank');
  }
  document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.book-btn')){
      const title = e.target.closest('.service-card').querySelector('.service-title').textContent.trim();
      openWhatsApp(`Hello, I would like to book the service: ${title}. Please share availability and next steps. — Manohar`);
    }
    if(e.target.matches('.meeting-btn')){
      const title = e.target.closest('.service-card').querySelector('.service-title').textContent.trim();
      openWhatsApp(`Hello, I am interested in a meeting about: ${title}. Please propose a time for a meeting. — Manohar`);
    }
  });

  // Contact fetch: hidden by default. Admin can unlock from /admin/ (uses API key)
  async function loadPublicContact(){
    // intentionally do not fetch private data here
    const el = document.getElementById('contactData');
    el.style.display = 'none';
  }
  loadPublicContact();
})();
