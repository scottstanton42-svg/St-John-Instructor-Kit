(()=>{
  const KEY='sj-instructor-kit-m2';
  const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
  const viewKind=()=>{const id=document.querySelector('.view.active')?.id;return id==='equipment'?'load':id==='setup'?'setup':id==='teach'?'teach':id==='winddown'?'pack':null};
  const rowsFor=kind=>Array.from(document.querySelectorAll(`#${kind==='load'?'equipment':kind==='pack'?'winddown':kind} .stable-row`));
  const complete=kind=>{const r=rowsFor(kind);return r.length>0&&r.every(x=>x.classList.contains('done')||x.querySelector('input')?.checked)};
  const currentStage=()=>{if(!complete('load'))return'load';if(!complete('setup'))return'setup';if(!complete('teach'))return'teach';if(!complete('pack'))return'pack';return'done'};
  const setItem=(kind,key,value)=>{
    if(kind==='load'){
      const i=Number(String(key).slice(1)); const a=equipmentList(); if(a[i])a[i].done=value;
    } else if(kind==='setup'){
      state.classroomChecks=state.classroomChecks||{}; state.classroomChecks[state.course]=state.classroomChecks[state.course]||{}; state.classroomChecks[state.course][key]=value;
    } else if(kind==='teach'){
      state.checks=state.checks||{}; state.checks[state.course]=state.checks[state.course]||{}; state.checks[state.course][key]=value;
    } else {
      state.packChecks=state.packChecks||{}; state.packChecks[state.course]=state.packChecks[state.course]||{}; state.packChecks[state.course][key]=value;
    }
  };
  const transition=(kind)=>{
    const next=kind==='load'?'setup':kind==='setup'?'teach':kind==='teach'?'pack':'done';
    const title=kind==='load'?'Load Up checklist complete!':kind==='setup'?'Setup checklist complete!':kind==='teach'?'Teaching checklist complete!':'Pack Down checklist complete!';
    const msg=kind==='load'?'Everything is loaded and ready for classroom setup.':kind==='setup'?'The classroom and practical training environment are ready.':kind==='teach'?'The teaching content is complete.':'All course checklists are complete.';
    const btn=next==='setup'?"I'M READY FOR SETUP":next==='teach'?"I'M READY TO TEACH":next==='pack'?"I'M READY TO PACK DOWN":'FINISH COURSE & CREATE SUMMARY';
    document.getElementById('buddyTransition')?.remove();
    const o=document.createElement('div');o.className='stable-overlay';o.id='buddyTransition';
    o.innerHTML=`<div class="stable-transition-box"><img src="australian-first-aid-mark.svg" alt=""><p class="eyebrow">CHECKLIST COMPLETE</p><h1>${title}</h1><p>${msg}</p><button class="buddy-btn primary" id="workflowNextStage">${btn}</button></div>`;
    document.body.appendChild(o);
    o.querySelector('#workflowNextStage').onclick=()=>{o.remove();if(next==='done')window.finishBuddyCourse?.();else window.showBuddyView?.(next==='setup'?'setup':next==='teach'?'teach':'winddown')};
  };
  const shouldTransition=kind=>{
    const current=currentStage();
    return current===(kind==='load'?'setup':kind==='setup'?'teach':kind==='teach'?'pack':'done');
  };
  document.addEventListener('click',e=>{
    const all=e.target.closest('.stable-actions .all');
    if(!all)return;
    e.preventDefault();e.stopImmediatePropagation();
    const kind=viewKind();if(!kind||!state.activeCourse)return;
    rowsFor(kind).forEach(row=>{const key=row.dataset.key;setItem(kind,key,true)});
    save();window.refreshBuddy?.();
    if(shouldTransition(kind))transition(kind);
  },true);
  document.addEventListener('change',e=>{
    const input=e.target.closest('.stable-row input[type="checkbox"]');
    if(!input)return;
    e.preventDefault();e.stopImmediatePropagation();
    const kind=viewKind();const row=input.closest('.stable-row');if(!kind||!row||!state.activeCourse)return;
    setItem(kind,row.dataset.key,input.checked);save();window.refreshBuddy?.();
    if(input.checked&&shouldTransition(kind))transition(kind);
  },true);
})();
