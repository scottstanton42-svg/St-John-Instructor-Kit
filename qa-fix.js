(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('reset')==='1' && typeof stateKey!=='undefined'){
    localStorage.removeItem(stateKey);
    location.replace(location.pathname+'?build=clean2');
    return;
  }
  const hideLegacy=()=>{
    ['today','equipment','setup','teach','winddown'].forEach(id=>{
      const section=document.getElementById(id); if(!section)return;
      const legacy=section.querySelector(':scope > .card');
      if(legacy && !legacy.classList.contains('stable-checklist')) legacy.hidden=true;
    });
    ['resetCourse','addTopic','addEquipment','clearEquipment','addPackDown','clearPackDown'].forEach(id=>{const b=document.getElementById(id);if(b)b.hidden=true});
  };
  const kindForSection=id=>id==='equipment'?'load':id==='setup'?'setup':id==='teach'?'teach':id==='winddown'?'pack':'load';
  const transitionText={load:['Ready for Setup','Load Up is complete. Your equipment is checked and you are ready to prepare the classroom.','setup'],setup:['Ready to Teach','Classroom setup is complete. You are ready to begin teaching.','teach'],teach:['Ready to Pack Down','Teaching and assessment are complete. You are ready to finish the course and pack down.','winddown']};
  const showWorkflowTransition=(kind)=>{
    const data=transitionText[kind]; if(!data)return false;
    document.getElementById('buddyStageTransition')?.remove();
    const o=document.createElement('div'); o.id='buddyStageTransition';
    o.innerHTML=`<div class="buddy-overlay"><div class="buddy-panel"><div class="buddy-transition-icon">✓</div><p class="eyebrow">STAGE COMPLETE</p><h1>${data[0]}</h1><p class="buddy-sub">${data[1]}</p><div class="buddy-card"><button class="buddy-btn primary" id="continueStage">Continue to ${data[2]==='setup'?'Setup':data[2]==='teach'?'Teach':'Pack Down'}</button></div></div></div>`;
    document.body.appendChild(o);
    o.querySelector('#continueStage').onclick=()=>{o.remove();window.showBuddyView?.(data[2]);};
    return true;
  };
  const selectAll=button=>{
    const card=button.closest('.stable-checklist'); if(!card || typeof state==='undefined' || !state.course)return;
    const section=card.closest('.view'); if(!section)return;
    const kind=kindForSection(section.id);
    const rows=Array.from(card.querySelectorAll('.stable-row')); if(!rows.length)return;
    rows.forEach(row=>{const key=row.dataset.key;if(kind==='load'){const idx=Number(String(key||'').slice(1));const list=typeof equipmentList==='function'?equipmentList():[];if(Number.isInteger(idx)&&list[idx])list[idx].done=true}else if(kind==='setup'){state.classroomChecks=state.classroomChecks||{};state.classroomChecks[state.course]=state.classroomChecks[state.course]||{};state.classroomChecks[state.course][key]=true}else if(kind==='teach'){state.checks=state.checks||{};state.checks[state.course]=state.checks[state.course]||{};state.checks[state.course][key]=true}else{state.packChecks=state.packChecks||{};state.packChecks[state.course]=state.packChecks[state.course]||{};state.packChecks[state.course][key]=true}});
    localStorage.setItem(stateKey,JSON.stringify(state));
    rows.forEach(row=>{const input=row.querySelector('input[type="checkbox"]');if(input)input.checked=true;row.classList.add('done')});
    window.refreshBuddy?.();
    setTimeout(()=>{
      hideLegacy();
      if(kind==='pack' && window.buddyPhase?.()==='done'){window.showBuddyView?.('today');return;}
      const p=window.buddyPhase?.();
      if((kind==='load'&&p==='setup')||(kind==='setup'&&p==='teach')||(kind==='teach'&&p==='pack'))showWorkflowTransition(kind);
    },0);
  };
  document.addEventListener('click',e=>{const b=e.target.closest('.stable-actions .all');if(!b)return;e.preventDefault();e.stopImmediatePropagation();selectAll(b)},true);
  const boot=()=>{hideLegacy();setTimeout(hideLegacy,50);setTimeout(hideLegacy,250);setTimeout(hideLegacy,800)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',boot);
})();
