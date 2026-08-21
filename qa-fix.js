(()=>{
  const params=new URLSearchParams(location.search);
  if(params.get('reset')==='1' && typeof stateKey!=='undefined'){
    localStorage.removeItem(stateKey);
    location.replace(location.pathname+'?build=clean3');
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
  const kindForCard=card=>{const section=card?.closest('.view');if(section)return kindForSection(section.id);const label=card?.querySelector('.stable-head .eyebrow')?.textContent?.toLowerCase()||'';return label.includes('load')?'load':label.includes('setup')?'setup':label.includes('teach')?'teach':label.includes('pack')?'pack':null};
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
    const card=button?.closest('.stable-checklist'); if(!card || typeof state==='undefined' || !state.course)return;
    const kind=kindForCard(card); if(!kind)return;
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
  const bindSelectAll=()=>document.querySelectorAll('.stable-actions .all').forEach(b=>{
    if(b.dataset.qaBound==='1')return;
    b.dataset.qaBound='1';
    b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();selectAll(b)},false);
  });
  document.addEventListener('click',e=>{const b=e.target.closest?.('.stable-actions .all');if(!b)return;e.preventDefault();e.stopImmediatePropagation();selectAll(b)},true);
  document.addEventListener('change',e=>{
    const input=e.target.closest?.('.stable-row input[type="checkbox"]');
    if(!input)return;
    setTimeout(()=>{
      const row=input.closest('.stable-row');
      const card=row?.closest('.stable-checklist');
      if(!card)return;
      const kind=kindForCard(card);
      const p=window.buddyPhase?.();
      if((kind==='load'&&p==='setup')||(kind==='setup'&&p==='teach')||(kind==='teach'&&p==='pack'))showWorkflowTransition(kind);
      else if(kind==='pack'&&p==='done')showWorkflowTransition(kind);
    },0);
  });
  const boot=()=>{hideLegacy();bindSelectAll();setTimeout(()=>{hideLegacy();bindSelectAll()},50);setTimeout(()=>{hideLegacy();bindSelectAll()},250);setTimeout(()=>{hideLegacy();bindSelectAll()},800)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',boot);
  new MutationObserver(bindSelectAll).observe(document.body,{childList:true,subtree:true});
  const style=document.createElement('style');style.textContent='.buddy-transition .buddy-btn{display:block;margin:0 auto}.buddy-transition{text-align:center}';document.head.appendChild(style);
})();
