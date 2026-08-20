(()=>{
  const style=document.createElement('style');
  style.textContent=`
    #todayFlow,#legacyTeachingCard{display:none!important}
    #todayPhaseCard{margin-top:14px}
    #todayPhaseCard .phase-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
    #todayPhaseCard .phase-banner h3{font-size:22px}
    #todayPhaseCard .phase-banner small{display:block;color:var(--muted);margin-top:4px}
    #todayPhaseCard .phase-status{font-size:12px;font-weight:800;padding:8px 11px;border-radius:999px;background:var(--blue-soft);color:#78baf0;white-space:nowrap}
    #todayPhaseCard .phase-status.complete{background:#163b2d;color:#5ee09b}
    #todayPhaseCard .phase-collapse{width:48px;height:48px;border:1px solid #43515d;background:#202a33;color:#d8e0e6;border-radius:10px;font-weight:900;font-size:20px;touch-action:manipulation;cursor:pointer;flex:0 0 auto}
    #todayPhaseCard .phase-collapse:hover{background:var(--card-light)}
    #todayPhaseCard .phase-row{display:flex;align-items:center;gap:12px;padding:14px 4px;border-top:1px solid #394650;min-height:66px}
    #todayPhaseCard .phase-row:first-child{border-top:0}
    #todayPhaseCard .phase-row input[type=checkbox]{width:32px;height:32px;min-width:32px;accent-color:#35c978;cursor:pointer;touch-action:manipulation}
    #todayPhaseCard .phase-row.done .phase-label{text-decoration:line-through;color:#7f8993}
    #todayPhaseCard .phase-label{flex:1;font-size:18px;line-height:1.35;font-weight:750}
    #todayPhaseCard .phase-detail{display:block;color:var(--muted);font-size:15px;font-weight:400;margin-top:3px}
    #todayPhaseCard .phase-controls{display:flex;gap:5px}
    #todayPhaseCard .phase-controls button{width:48px;height:48px;border:1px solid #43515d;background:#202a33;color:#d8e0e6;border-radius:10px;font-weight:900;font-size:18px;touch-action:manipulation}
    #todayPhaseCard .phase-controls button:hover{background:var(--card-light)}
    #todayPhaseCard .phase-controls .phase-delete{color:#ff9a9f;border-color:#684047;background:#2b2529}
    #todayPhaseCard .phase-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;padding-top:16px;border-top:1px solid #394650}
    #todayPhaseCard .phase-complete-message{padding:18px;border-radius:14px;background:#163b2d;border:1px solid #2d805a;color:#d8ffe9;font-weight:750}
    #phaseGate{position:fixed;inset:0;z-index:9998;background:#0e1419;color:#f3f6f8;overflow:auto;padding:24px 16px;display:flex;align-items:center;justify-content:center}
    #phaseGate::before{content:"";position:fixed;inset:0;background:radial-gradient(circle at 50% 35%,rgba(215,25,32,.10),transparent 48%);pointer-events:none}
    #phaseGate .gate-card{position:relative;z-index:1;width:min(680px,100%);background:#242d35;border:1px solid #3d4a55;border-radius:24px;padding:34px;box-shadow:0 16px 45px rgba(0,0,0,.35);text-align:center}
    #phaseGate .gate-icon{width:76px;height:76px;margin:0 auto 20px;border-radius:50%;display:grid;place-items:center;background:#163b2d;border:1px solid #2d805a;color:#5ee09b;font-size:40px;font-weight:900}
    #phaseGate .gate-eyebrow{font-size:11px;letter-spacing:.13em;font-weight:800;color:#f04b52;margin:0 0 8px}
    #phaseGate h2{font-size:30px;margin:0 0 12px}
    #phaseGate p{color:#aeb8c2;font-size:17px;line-height:1.55;margin:0 auto 24px;max-width:540px}
    #phaseGate .gate-button{width:100%;padding:16px;border:0;border-radius:12px;background:#d71920;color:#fff;font-size:17px;font-weight:800;box-shadow:0 5px 15px rgba(215,25,32,.18);cursor:pointer}
    #phaseGate .gate-button:hover{background:#b51218}
    #phaseGate .gate-course{color:#aeb8c2;font-size:13px;margin-top:14px}
    @media(max-width:650px){#phaseGate .gate-card{padding:26px 20px}#phaseGate h2{font-size:25px}}
    @media(max-width:800px){#todayPhaseCard .phase-banner{align-items:flex-start;flex-direction:column}#todayPhaseCard .phase-row{min-height:74px}}
  `;
  document.head.appendChild(style);

  state.deletedTopics=state.deletedTopics||{};
  state.deletedPackDown=state.deletedPackDown||{};
  state.todayCollapsed=state.todayCollapsed||{};
  state.phaseGate=state.phaseGate||{};

  function deleted(set,key){return !!(set&&set[key])}
  function topicItems(){
    const base=(course().topics||[]).map((x,i)=>({value:x,key:'b'+i}));
    const custom=(state.customTopics[state.course]||[]).map((x,i)=>({value:x,key:'c'+i}));
    const gone=state.deletedTopics[state.course]||{};
    return [...base,...custom].filter(x=>!deleted(gone,x.key));
  }
  function packItems(){
    const base=(packDownByCourse[state.course]||defaultPackDown).map((x,i)=>({value:x,key:'b'+i}));
    const custom=(state.customPackDown[state.course]||[]).map((x,i)=>({value:x,key:'c'+i}));
    const gone=state.deletedPackDown[state.course]||{};
    return [...base,...custom].filter(x=>!deleted(gone,x.key));
  }
  function prepComplete(){const a=equipmentList();return a.length>0&&a.every(x=>x.done)}
  function teachComplete(){const a=topicItems(),c=state.checks[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function packComplete(){const a=packItems(),c=state.packChecks[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function completedPhase(){
    if(!prepComplete())return null;
    if(!teachComplete())return 'prep';
    if(!packComplete())return 'teach';
    return 'pack';
  }
  function currentPhase(){
    const gate=state.phaseGate[state.course]||'prep';
    if(gate==='prep'&&!prepComplete())return 'prep';
    if(gate==='prep'&&prepComplete())return 'prep';
    if(gate==='teach'&&!teachComplete())return 'teach';
    if(gate==='teach'&&teachComplete())return 'teach';
    if(gate==='pack'&&!packComplete())return 'pack';
    if(gate==='pack'&&packComplete())return 'done';
    return 'prep';
  }
  function gateNeeded(){
    const gate=state.phaseGate[state.course]||'prep';
    if(gate==='prep'&&prepComplete())return 'prep';
    if(gate==='teach'&&teachComplete())return 'teach';
    if(gate==='pack'&&packComplete())return 'pack';
    return null;
  }

  function showGate(kind){
    const old=document.getElementById('phaseGate');if(old)old.remove();
    const copy={
      prep:{title:'Preparation checklist complete',message:'Everything is packed and ready. Select the button below when you are ready to begin teaching.',button:'Ready to teach'},
      teach:{title:'Teaching checklist complete',message:'The teaching content is complete. Select the button below when you are ready to begin the pack down checklist.',button:'Ready for pack down'},
      pack:{title:'Pack down checklist complete',message:'The course checklists are complete. You can now finish the course and create the course completion summary.',button:'Finish course'}
    }[kind];
    if(!copy)return;
    const e=document.createElement('div');e.id='phaseGate';e.innerHTML=`<div class="gate-card"><div class="gate-icon">✓</div><p class="gate-eyebrow">CHECKLIST COMPLETE</p><h2>${copy.title}</h2><p>${copy.message}</p><button class="gate-button" id="phaseGateNext">${copy.button}</button><div class="gate-course">${esc(course().name)}</div></div>`;document.body.appendChild(e);
    e.querySelector('#phaseGateNext').onclick=()=>{state.phaseGate[state.course]=kind==='prep'?'teach':kind==='teach'?'pack':'done';save();e.remove();render()};
  }

  function addItem(kind){
    const label=kind==='prep'?'Name the new preparation item:':kind==='teach'?'Name the new teaching item:':'Name the new pack-down item:';
    const name=prompt(label);if(!name||!name.trim())return;
    if(kind==='prep')equipmentList().push({text:name.trim(),done:false});
    else if(kind==='teach'){state.customTopics[state.course]=state.customTopics[state.course]||[];state.customTopics[state.course].push([name.trim(),'']);}
    else{state.customPackDown[state.course]=state.customPackDown[state.course]||[];state.customPackDown[state.course].push(name.trim())}
    save()
  }
  function toggle(kind,index,checked){
    if(kind==='prep'){const a=equipmentList();if(a[index])a[index].done=checked}
    else if(kind==='teach'){state.checks[state.course]=state.checks[state.course]||{};state.checks[state.course][index]=checked}
    else{state.packChecks[state.course]=state.packChecks[state.course]||{};state.packChecks[state.course][index]=checked}
    save()
  }
  function shiftChecks(store,index){const next={};Object.keys(store||{}).forEach(k=>{const n=Number(k);if(Number.isNaN(n)||n===index)return;next[n>index?n-1:n]=store[k]});return next}
  function deleteItem(kind,index){
    if(!confirm('Delete this checklist item? It cannot be edited once created.'))return;
    if(kind==='prep'){equipmentList().splice(index,1)}
    else if(kind==='teach'){const item=topicItems()[index];if(!item)return;state.deletedTopics[state.course]=state.deletedTopics[state.course]||{};state.deletedTopics[state.course][item.key]=true;state.checks[state.course]=shiftChecks(state.checks[state.course]||{},index)}
    else{const item=packItems()[index];if(!item)return;state.deletedPackDown[state.course]=state.deletedPackDown[state.course]||{};state.deletedPackDown[state.course][item.key]=true;state.packChecks[state.course]=shiftChecks(state.packChecks[state.course]||{},index)}
    save()
  }
  function reorder(kind,index,dir){if(typeof moveItem==='function')moveItem(kind==='prep'?'equipment':kind==='teach'?'teaching':'pack',index,dir)}
  function toggleCollapsed(phase){const key=state.course+'-'+phase;state.todayCollapsed[key]=!state.todayCollapsed[key];save()}

  function render(){
    const old=document.getElementById('todayPhaseCard');if(old)old.remove();
    const anchor=document.querySelector('#today .grid.three');if(!anchor)return;
    const phase=currentPhase();
    const needed=gateNeeded();
    if(needed){showGate(needed);return}
    const card=document.createElement('div');card.id='todayPhaseCard';card.className='card';
    const configs={
      prep:{title:'Preparation checklist',desc:'Get the room, equipment and course materials ready before teaching.',status:'IN PROGRESS',kind:'prep',items:equipmentList()},
      teach:{title:'Teaching checklist',desc:'Work through the course content. The preparation checklist is complete.',status:'IN PROGRESS',kind:'teach',items:topicItems()},
      pack:{title:'Pack down checklist',desc:'Finish the course, clean up, document and submit everything.',status:'FINAL PHASE',kind:'pack',items:packItems()},
      done:{title:'Course complete',desc:'Preparation, course content and pack down are all complete.',status:'COMPLETE',kind:null,items:[]}
    };
    const cfg=configs[phase];
    const collapseKey=state.course+'-'+phase;
    const collapsed=phase!=='done'&&!!state.todayCollapsed[collapseKey];
    let rows='';
    if(phase==='done')rows='<div class="phase-complete-message">✓ All three course phases are complete for today.</div>';
    else if(!collapsed)rows=cfg.items.map((item,i)=>{
      const raw=cfg.kind==='prep'?item:item.value;
      const text=cfg.kind==='prep'?(raw.text||raw):(Array.isArray(raw)?raw[0]:raw);
      const detail=Array.isArray(raw)?(raw[1]||''):'';
      const checked=cfg.kind==='prep'?!!raw.done:cfg.kind==='teach'?!!((state.checks[state.course]||{})[i]):!!((state.packChecks[state.course]||{})[i]);
      return `<div class="phase-row ${checked?'done':''}" data-index="${i}"><input type="checkbox" ${checked?'checked':''} aria-label="Complete item"><span class="phase-label">${esc(text)}${detail?`<span class="phase-detail">${esc(detail)}</span>`:''}</span><span class="phase-controls"><button type="button" class="phase-up" aria-label="Move item up">▲</button><button type="button" class="phase-down" aria-label="Move item down">▼</button><button type="button" class="phase-delete" aria-label="Delete item">✕</button></span></div>`
    }).join('');
    const type=cfg.kind==='prep'?'equipment':cfg.kind==='teach'?'teaching':'packdown';
    card.innerHTML=`<div class="phase-banner"><div><p class="eyebrow">TODAY'S ACTIVE CHECKLIST</p><h3>${cfg.title}</h3><small>${cfg.desc}</small></div><div style="display:flex;align-items:center;gap:8px"><span class="phase-status ${phase==='done'?'complete':''}">${cfg.status}</span>${phase!=='done'?`<button type="button" class="phase-collapse" id="todayPhaseCollapse" aria-expanded="${!collapsed}" aria-label="${collapsed?'Expand':'Collapse'} checklist">${collapsed?'＋':'−'}</button>`:''}</div></div><div class="today-phase-list">${rows}</div>${phase!=='done'&&!collapsed?`<div class="phase-actions"><button type="button" class="primary" id="todayPhaseAdd">+ Add item</button><button type="button" class="ghost" onclick="printChecklist('${type}')">🖨 Print checklist</button><button type="button" class="ghost" onclick="emailChecklist('${type}')">✉ Email a copy</button></div>`:''}`;
    anchor.insertAdjacentElement('afterend',card);
    if(phase!=='done'){
      card.querySelector('#todayPhaseCollapse').addEventListener('click',()=>toggleCollapsed(phase));
      if(!collapsed){card.querySelectorAll('input[type=checkbox]').forEach(box=>box.addEventListener('change',()=>toggle(cfg.kind,Number(box.closest('.phase-row').dataset.index),box.checked)));card.querySelectorAll('.phase-up').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),-1)));card.querySelectorAll('.phase-down').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),1)));card.querySelectorAll('.phase-delete').forEach(b=>b.addEventListener('click',()=>deleteItem(cfg.kind,Number(b.closest('.phase-row').dataset.index))));card.querySelector('#todayPhaseAdd').addEventListener('click',()=>addItem(cfg.kind))}
    }
  }
  if(typeof window.updateAll==='function'){const base=window.updateAll;window.updateAll=function(){base();render()}}
  document.addEventListener('DOMContentLoaded',render);setTimeout(render,50);
})();
