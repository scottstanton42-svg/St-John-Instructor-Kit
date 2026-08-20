(()=>{
  function renderCurrent(){
    if(!window.state || !state.activeCourse || state.activeCourse!==state.course) return;
    if(!document.getElementById('today')?.classList.contains('active')) return;
    if(document.getElementById('todayPhaseCard')) return;
    const anchor=document.getElementById('stageGrid');
    if(!anchor) return;
    let phase='prep';
    const eq=typeof equipmentList==='function'?equipmentList():[];
    const setup=typeof classroomItems==='function'?classroomItems():[];
    const setupDone=typeof classroomComplete==='function'?classroomComplete():false;
    const topics=typeof editableTopics==='function'?editableTopics():[];
    const packs=typeof editablePackDown==='function'?editablePackDown():[];
    const prepDone=eq.length>0&&eq.every(x=>x.done);
    const teachChecks=state.checks?.[state.course]||{};
    const packChecks=state.packChecks?.[state.course]||{};
    const teachDone=topics.length>0&&topics.every((_,i)=>!!teachChecks[i]);
    const packDone=packs.length>0&&packs.every((_,i)=>!!packChecks[i]);
    if(!prepDone)phase='prep'; else if(!setupDone)phase='setup'; else if(!teachDone)phase='teach'; else if(!packDone)phase='pack'; else phase='done';
    const defs={prep:['Load Up checklist','Load and check the equipment and materials required for the course.','IN PROGRESS',eq,'prep'],setup:['Setup checklist','Prepare the classroom and practical learning environment before teaching.','READY FOR SETUP',setup,'setup'],teach:['Teaching checklist','Work through the teaching topics for this course.','READY TO TEACH',topics,'teach'],pack:['Pack down checklist','Finish the course, clean up, document and submit everything.','READY FOR PACK DOWN',packs,'pack'],done:['Course complete','All course checklists are complete.','COMPLETE',[],'done']};
    const d=defs[phase];
    const checks=phase==='prep'?eq.map(x=>!!x.done):phase==='setup'?setup.map((_,i)=>!!(state.classroomChecks?.[state.course]||{})[i]):phase==='teach'?topics.map((_,i)=>!!teachChecks[i]):packs.map((_,i)=>!!packChecks[i]);
    const card=document.createElement('div');card.id='todayPhaseCard';card.className='card';
    card.innerHTML=`<div class="phase-banner"><div><p class="eyebrow">TODAY'S ACTIVE CHECKLIST</p><h3>${d[0]}</h3><small>${d[1]}</small></div><span class="phase-status ${phase==='done'?'complete':''}">${d[2]}</span></div><div class="today-phase-list">${phase==='done'?'<div class="phase-complete-message">✓ All course phases are complete for today.</div>':d[3].map((item,i)=>{const raw=phase==='prep'?item:item.value;const text=phase==='prep'?(raw.text||raw):(Array.isArray(raw)?raw[0]:raw);const detail=Array.isArray(raw)?raw[1]||'':'';return `<div class="phase-row ${checks[i]?'done':''}" data-index="${i}"><input type="checkbox" ${checks[i]?'checked':''}><span class="phase-label">${esc(text)}${detail?`<span class="phase-detail">${esc(detail)}</span>`:''}</span><span class="phase-controls"><button type="button" class="phase-up">▲</button><button type="button" class="phase-down">▼</button></span></div>`}).join('')}</div>${phase!=='done'?'<div class="phase-actions"><button type="button" class="primary select-all" id="currentSelectAll">✓ Select all</button></div>':''}`;
    anchor.insertAdjacentElement('afterend',card);
    if(phase==='done')return;
    card.querySelector('#currentSelectAll').onclick=()=>{if(phase==='prep')eq.forEach(x=>x.done=true);else if(phase==='setup'){state.classroomChecks[state.course]={};setup.forEach((_,i)=>state.classroomChecks[state.course][i]=true)}else if(phase==='teach'){state.checks[state.course]={};topics.forEach((_,i)=>state.checks[state.course][i]=true)}else{state.packChecks[state.course]={};packs.forEach((_,i)=>state.packChecks[state.course][i]=true)}save();setTimeout(renderCurrent,0)};
    card.querySelectorAll('input[type=checkbox]').forEach(box=>box.onchange=()=>{const i=Number(box.closest('.phase-row').dataset.index);if(phase==='prep')eq[i].done=box.checked;else if(phase==='setup'){state.classroomChecks[state.course]=state.classroomChecks[state.course]||{};state.classroomChecks[state.course][i]=box.checked}else if(phase==='teach'){state.checks[state.course]=state.checks[state.course]||{};state.checks[state.course][i]=box.checked}else{state.packChecks[state.course]=state.packChecks[state.course]||{};state.packChecks[state.course][i]=box.checked}save();setTimeout(renderCurrent,0)});
  }
  window.renderCurrentChecklist=renderCurrent;
  const old=window.updateAll;
  if(old&&!old.__currentChecklistFix){window.updateAll=function(){old();renderCurrent()};window.updateAll.__currentChecklistFix=true}
  window.addEventListener('load',()=>setTimeout(renderCurrent,250));
  document.addEventListener('DOMContentLoaded',()=>setTimeout(renderCurrent,250));
  document.addEventListener('click',e=>{if(e.target.closest('#stageToday'))setTimeout(renderCurrent,100)});
})();