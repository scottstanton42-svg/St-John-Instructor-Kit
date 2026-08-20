(()=>{
  function currentStage(){
    if(!state.activeCourse)return null;
    const eq=typeof equipmentList==='function'?equipmentList():[];
    const prepDone=eq.length>0&&eq.every(x=>x.done);
    const classroomDone=typeof classroomComplete==='function'&&classroomComplete();
    const topics=typeof topicItems==='function'?topicItems():[];
    const tc=state.checks?.[state.course]||{};
    const teachDone=topics.length>0&&topics.every((_,i)=>!!tc[i]);
    const packs=typeof packItems==='function'?packItems():[];
    const pc=state.packChecks?.[state.course]||{};
    const packDone=packs.length>0&&packs.every((_,i)=>!!pc[i]);
    if(!prepDone)return 'prep';
    if(!classroomDone)return 'classroom';
    if(!teachDone)return 'teach';
    if(!packDone)return 'pack';
    return 'done';
  }
  function openCurrent(){
    if(!state.activeCourse)return;
    const stage=currentStage();
    state.todayCollapsed=state.todayCollapsed||{};
    if(stage)state.todayCollapsed[state.course+'-'+stage]=false;
    localStorage.setItem(stateKey,JSON.stringify(state));
    document.querySelector('.tab[data-view="today"]')?.click();
    setTimeout(()=>{
      if(typeof window.updateAll==='function')window.updateAll();
      setTimeout(()=>document.getElementById('todayPhaseCard')?.scrollIntoView({behavior:'smooth',block:'start'}),120);
    },80);
  }
  function wire(){
    const b=document.getElementById('stageToday');
    if(!b)return;
    b.onclick=openCurrent;
    b.dataset.currentFix='1';
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(wire,100));
  setInterval(wire,400);
})();