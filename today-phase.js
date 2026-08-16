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
    @media(max-width:800px){#todayPhaseCard .phase-banner{align-items:flex-start;flex-direction:column}#todayPhaseCard .phase-row{min-height:74px}}
  `;
  document.head.appendChild(style);

  state.deletedTopics=state.deletedTopics||{};
  state.deletedPackDown=state.deletedPackDown||{};
  state.todayCollapsed=state.todayCollapsed||{};

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
  function currentPhase(){if(!prepComplete())return 'prep';if(!teachComplete())return 'teach';if(!packComplete())return 'pack';return 'done'}

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

  function shiftChecks(store,index){
    const next={};Object.keys(store||{}).forEach(k=>{const n=Number(k);if(Number.isNaN(n)||n===index)return;next[n>index?n-1:n]=store[k]});return next
  }

  function deleteItem(kind,index){
    if(!confirm('Delete this checklist item? It cannot be edited once created.'))return;
    if(kind==='prep'){
      const a=equipmentList();a.splice(index,1);
      state.checks[state.course]=state.checks[state.course]||{};
    }else if(kind==='teach'){
      const items=topicItems(),item=items[index];if(!item)return;
      state.deletedTopics[state.course]=state.deletedTopics[state.course]||{};state.deletedTopics[state.course][item.key]=true;
      state.checks[state.course]=shiftChecks(state.checks[state.course]||{},index);
    }else{
      const items=packItems(),item=items[index];if(!item)return;
      state.deletedPackDown[state.course]=state.deletedPackDown[state.course]||{};state.deletedPackDown[state.course][item.key]=true;
      state.packChecks[state.course]=shiftChecks(state.packChecks[state.course]||{},index);
    }
    save()
  }

  function reorder(kind,index,dir){if(typeof moveItem==='function')moveItem(kind==='prep'?'equipment':kind==='teach'?'teaching':'pack',index,dir)}

  function toggleCollapsed(phase){
    const key=state.course+'-'+phase;
    state.todayCollapsed[key]=!state.todayCollapsed[key];
    save();
  }

  function render(){
    const old=document.getElementById('todayPhaseCard');if(old)old.remove();
    const anchor=document.querySelector('#today .grid.three');if(!anchor)return;
    const card=document.createElement('div');card.id='todayPhaseCard';card.className='card';
    const phase=currentPhase();
    const configs={
      prep:{title:'Preparation checklist',desc:'Get the room, equipment and course materials ready before teaching.',status:'IN PROGRESS',kind:'prep',items:equipmentList()},
      teach:{title:'Teaching checklist',desc:'Work through the course content. The preparation checklist is complete.',status:'IN PROGRESS',kind:'teach',items:topicItems()},
      pack:{title:'Pack down checklist',desc:'Finish the course, clean up, document and submit everything.',status:'FINAL PHASE',kind:'pack',items:packItems()},
      done:{title:'Course complete',desc:'Preparation, course content and pack down are all complete.',status:'COMPLETE',kind:null,items:[]}
    };
    const cfg=configs[phase];
    const collapseKey=state.course+'-'+phase;
    const collapsed=phase!=='done' && !!state.todayCollapsed[collapseKey];
    let rows='';
    if(phase==='done')rows='<div class="phase-complete-message">✓ All three course phases are complete for today.</div>';
    else if(!collapsed)rows=cfg.items.map((item,i)=>{
      const raw=cfg.kind==='prep'?item:(item.value);
      const text=cfg.kind==='prep'?(raw.text||raw):(Array.isArray(raw)?raw[0]:raw);
      const detail=Array.isArray(raw)?(raw[1]||''):'';
      const checked=cfg.kind==='prep'?!!raw.done:cfg.kind==='teach'?!!((state.checks[state.course]||{})[i]):!!((state.packChecks[state.course]||{})[i]);
      return `<div class="phase-row ${checked?'done':''}" data-index="${i}"><input type="checkbox" ${checked?'checked':''} aria-label="Complete item"><span class="phase-label">${text}${detail?`<span class="phase-detail">${detail}</span>`:''}</span><span class="phase-controls"><button type="button" class="phase-up" aria-label="Move item up">▲</button><button type="button" class="phase-down" aria-label="Move item down">▼</button><button type="button" class="phase-delete" aria-label="Delete item">✕</button></span></div>`
    }).join('');
    const type=cfg.kind==='prep'?'equipment':cfg.kind==='teach'?'teaching':'packdown';
    card.innerHTML=`<div class="phase-banner"><div><p class="eyebrow">TODAY'S ACTIVE CHECKLIST</p><h3>${cfg.title}</h3><small>${cfg.desc}</small></div><div style="display:flex;align-items:center;gap:8px"><span class="phase-status ${phase==='done'?'complete':''}">${cfg.status}</span>${phase!=='done'?`<button type="button" class="phase-collapse" id="todayPhaseCollapse" aria-expanded="${!collapsed}" aria-label="${collapsed?'Expand':'Collapse'} checklist">${collapsed?'＋':'−'}</button>`:''}</div></div><div class="today-phase-list">${rows}</div>${phase!=='done'&&!collapsed?`<div class="phase-actions"><button type="button" class="primary" id="todayPhaseAdd">+ Add item</button><button type="button" class="ghost" onclick="printChecklist('${type}')">🖨 Print checklist</button><button type="button" class="ghost" onclick="emailChecklist('${type}')">✉ Email a copy</button></div>`:''}`;
    anchor.insertAdjacentElement('afterend',card);
    if(phase!=='done'){
      card.querySelector('#todayPhaseCollapse').addEventListener('click',()=>toggleCollapsed(phase));
      if(!collapsed){
        card.querySelectorAll('input[type=checkbox]').forEach(box=>box.addEventListener('change',()=>toggle(cfg.kind,Number(box.closest('.phase-row').dataset.index),box.checked)));
        card.querySelectorAll('.phase-up').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),-1)));
        card.querySelectorAll('.phase-down').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),1)));
        card.querySelectorAll('.phase-delete').forEach(b=>b.addEventListener('click',()=>deleteItem(cfg.kind,Number(b.closest('.phase-row').dataset.index))));
        card.querySelector('#todayPhaseAdd').addEventListener('click',()=>addItem(cfg.kind));
      }
    }
  }

  if(typeof window.updateAll==='function'){const base=window.updateAll;window.updateAll=function(){base();render()}}
  document.addEventListener('DOMContentLoaded',render);setTimeout(render,50);
})();
