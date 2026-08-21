(()=>{
  const boot=()=>{
    if(typeof window.showBuddyView!=='function' && typeof show==='function') window.showBuddyView=show;
    if(typeof window.buddyPhase!=='function' && typeof phase==='function') window.buddyPhase=phase;
    if(typeof window.refreshBuddy!=='function' && typeof renderAll==='function') window.refreshBuddy=renderAll;
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  window.addEventListener('load',boot);
})();
