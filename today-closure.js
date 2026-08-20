(()=>{
  const css=document.createElement('style');css.textContent='#todayPhaseCard .today-finish{margin-top:18px;padding-top:18px;border-top:1px solid #394650}.today-finish .wfinish{width:100%;font-size:17px;cursor:pointer}.today-finish .wfinish:disabled{cursor:not-allowed}';document.head.appendChild(css);
  function complete(){
    if(!window.state?.activeCourse)return false;
    const e=typeof equipmentList==='function'?equipmentList():[];
    const s=typeof classroomItems==='function'?classroomItems():[];
    const t=typeof editableTopics==='function'?editableTopics():[];
    const p=typeof editablePackDown==='function'?editablePackDown():[];
    const sc=state.classroomChecks?.[state.course]||{},tc=state.checks?.[state.course]||{},pc=state.packChecks?.[state.course]||{};
    return e.length>0&&e.every(x=>x.done)&&s.length>0&&s.every((_,i)=>!!sc[i])&&t.length>0&&t.every((_,i)=>!!tc[i])&&p.length>0&&p.every((_,i)=>!!pc[i]);
  }
  function renderDone(){
    const card=document.getElementById('todayPhaseCard');if(!card)return;
    if(!complete())return;
    const actions=card.querySelector('.phase-actions');if(actions)actions.remove();
    if(card.querySelector('.today-finish'))return;
    const wrap=document.createElement('div');wrap.className='today-finish';wrap.innerHTML='<button type="button" class="wfinish" id="todayFinish">FINISH COURSE & CREATE SUMMARY ›</button>';
    card.appendChild(wrap);
    wrap.querySelector('#todayFinish').onclick=()=>{const hidden=document.getElementById('finish');if(hidden){hidden.click();return}if(typeof window.finishCourse==='function'){window.finishCourse();return}alert('Please complete the course summary from the Course Complete screen.')};
  }
  const old=window.updateAll;
  if(old&&!old.__todayClosure){window.updateAll=function(){old();if(document.getElementById('today')?.classList.contains('active'))setTimeout(renderDone,0)};window.updateAll.__todayClosure=true}
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderDone,200));
})();
