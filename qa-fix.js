(()=>{
  const hideLegacy=()=>{
    ['today','equipment','setup','teach','winddown'].forEach(id=>{
      const section=document.getElementById(id); if(!section)return;
      const legacy=section.querySelector(':scope > .card');
      if(legacy && !legacy.classList.contains('stable-checklist')) legacy.hidden=true;
    });
    ['resetCourse','addTopic','addEquipment','clearEquipment','addPackDown','clearPackDown'].forEach(id=>{const b=document.getElementById(id);if(b)b.hidden=true});
  };
  const kindForSection=id=>id==='equipment'?'load':id==='setup'?'setup':id==='teach'?'teach':id==='winddown'?'pack':'load';
  const nextView=kind=>kind==='load'?'setup':kind==='setup'?'teach':kind==='teach'?'winddown':null;
  const selectAll=button=>{
    const card=button.closest('.stable-checklist'); if(!card || typeof state==='undefined' || !state.course)return;
    const section=card.closest('.view'); if(!section)return;
    const kind=kindForSection(section.id);
    const rows=Array.from(card.querySelectorAll('.stable-row'));
    if(!rows.length)return;
    rows.forEach(row=>{
      const key=row.dataset.key;
      if(kind==='load'){
        const idx=Number(String(key||'').slice(1));
        const list=typeof equipmentList==='function'?equipmentList():[];
        if(Number.isInteger(idx)&&list[idx])list[idx].done=true;
      }else if(kind==='setup'){
        state.classroomChecks=state.classroomChecks||{};state.classroomChecks[state.course]=state.classroomChecks[state.course]||{};state.classroomChecks[state.course][key]=true;
      }else if(kind==='teach'){
        state.checks=state.checks||{};state.checks[state.course]=state.checks[state.course]||{};state.checks[state.course][key]=true;
      }else{
        state.packChecks=state.packChecks||{};state.packChecks[state.course]=state.packChecks[state.course]||{};state.packChecks[state.course][key]=true;
      }
    });
    localStorage.setItem(stateKey,JSON.stringify(state));
    rows.forEach(row=>{const input=row.querySelector('input[type="checkbox"]');if(input)input.checked=true;row.classList.add('done')});
    if(typeof window.refreshBuddy==='function')window.refreshBuddy();
    setTimeout(()=>{
      hideLegacy();
      if(typeof window.buddyPhase==='function'){
        const p=window.buddyPhase();
        if(p==='setup'&&kind==='load')window.showBuddyView?.('setup');
        else if(p==='teach'&&kind==='setup')window.showBuddyView?.('teach');
        else if(p==='pack'&&kind==='teach')window.showBuddyView?.('winddown');
      }
    },0);
  };
  document.addEventListener('click',e=>{
    const b=e.target.closest('.stable-actions .all');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    selectAll(b);
  },true);
  const boot=()=>{hideLegacy();setTimeout(hideLegacy,50);setTimeout(hideLegacy,250);setTimeout(hideLegacy,800)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',boot);
})();
