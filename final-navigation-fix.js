(()=>{
  const css=document.createElement('style');
  css.textContent='#wfBar{display:none!important}#todayPhaseCard .final-finish{margin-top:16px;width:100%;padding:16px;border:0;border-radius:12px;background:#16803c;color:#fff;font-size:17px;font-weight:800;cursor:pointer}';
  document.head.appendChild(css);
  function wireToday(){
    const b=document.getElementById('stageToday');
    if(!b||b.dataset.finalTodayFix)return;
    b.dataset.finalTodayFix='1';
    b.onclick=()=>{
      document.querySelector('.tab[data-view="today"]')?.click();
      setTimeout(()=>{
        if(typeof window.updateAll==='function')window.updateAll();
        setTimeout(()=>document.getElementById('todayPhaseCard')?.scrollIntoView({behavior:'smooth',block:'start'}),100);
      },80);
    };
  }
  function wireFinish(){
    const card=document.getElementById('todayPhaseCard');
    if(!card)return;
    const title=card.querySelector('.phase-banner h3')?.textContent?.trim().toLowerCase();
    if(title!=='course complete')return;
    if(card.querySelector('.final-finish'))return;
    const b=document.createElement('button');
    b.className='final-finish';
    b.textContent='FINISH COURSE & CREATE SUMMARY';
    b.onclick=()=>document.getElementById('finish')?.click();
    card.appendChild(b);
  }
  function clean(){wireToday();wireFinish();}
  const mo=new MutationObserver(clean);mo.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',()=>setTimeout(clean,150));
  setInterval(clean,500);
})();