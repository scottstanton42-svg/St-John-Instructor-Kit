(()=>{
  const finishPackDownIndividually=()=>{
    if(typeof state==='undefined'||typeof window.buddyPhase!=='function')return;
    const active=document.querySelector('.view.active')?.id;
    if(active==='winddown'&&window.buddyPhase()==='done')window.showBuddyView?.('today');
  };
  document.addEventListener('change',e=>{
    if(!e.target.closest?.('.stable-row input[type="checkbox"]'))return;
    setTimeout(finishPackDownIndividually,40);
  },false);
})();
