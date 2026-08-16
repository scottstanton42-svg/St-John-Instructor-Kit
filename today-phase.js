(()=>{
  const style=document.createElement('style');
  style.textContent=`
    #todayFlow{display:none!important}
    #todayPhaseCard{margin-top:14px}
    #todayPhaseCard .phase-banner{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}
    #todayPhaseCard .phase-banner h3{font-size:22px}
    #todayPhaseCard .phase-banner small{display:block;color:var(--muted);margin-top:4px}
    #todayPhaseCard .phase-status{font-size:12px;font-weight:800;padding:8px 11px;border-radius:999px;background:var(--blue-soft);color:#78baf0;white-space:nowrap}
    #todayPhaseCard .phase-status.complete{background:#163b2d;color:#5ee09b}
    #todayPhaseCard .phase-row{display:flex;align-items:center;gap:12px;padding:14px 4px;border-top:1px solid #394650;min-height:66px}
    #todayPhaseCard .phase-row:first-child{border-top:0}
    #todayPhaseCard .phase-row input[type=checkbox]{width:32px;height:32px;min-width:32px;accent-color:var(--red);cursor:pointer;touch-action:manipulation}
    #todayPhaseCard .phase-row.done .phase-label{text-decoration:line-through;color:#7f8993}
    #todayPhaseCard .phase-label{flex:1;font-size:18px;line-height:1.35;font-weight:750}
    #todayPhaseCard .phase-detail{display:block;color:var(--muted);font-size:15px;font-weight:400;margin-top:3px}
    #todayPhaseCard .phase-controls{display:flex;gap:5px}
    #todayPhaseCard .phase-controls button{width:48px;height:48px;border:1px solid #43515d;background:#202a33;color:#d8e0e6;border-radius:10px;font-weight:900;font-size:18px;touch-action:manipulation}
    #todayPhaseCard .phase-controls button:hover{background:var(--card-light)}
    #todayPhaseCard .phase-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;padding-top:16px;border-top:1px solid #394650}
    #todayPhaseCard .phase-complete-message{padding:18px;border-radius:14px;background:#163b2d;border:1px solid #2d805a;color:#d8ffe9;font-weight:750}
    @media(max-width:800px){#todayPhaseCard .phase-banner{align-items:flex-start;flex-direction:column}#todayPhaseCard .phase-row{min-height:74px}.phase-controls button{width:50px!important;height:50px!important}}
  `;
  document.head.appendChild(style);

  function prepComplete(){const a=equipmentList();return a.length>0&&a.every(x=>x.done)}
  function teachComplete(){const a=editableTopics(),c=state.checks[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function packComplete(){const a=editablePackDown(),c=state.packChecks[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function currentPhase(){if(!prepComplete())return 'prep';if(!teachComplete())return 'teach';if(!packComplete())return 'pack';return 'done'}

  function addItem(kind){
    const label=kind==='prep'?'Name the new preparation item:':kind==='teach'?'Name the new teaching item:':'Name the new pack-down item:';
    const name=prompt(label); if(!name||!name.trim())return;
    if(kind==='prep'){equipmentList().push({text:name.trim(),done:false});}
    else if(kind==='teach'){state.customTopics[state.course]=state.customTopics[state.course]||[];state.customTopics[state.course].push([name.trim(),'']);}
    else {state.customPackDown[state.course]=state.customPackDown[state.course]||[];state.customPackDown[state.course].push(name.trim());}
    save();
  }

  function toggle(kind,index,checked){
    if(kind==='prep'){const a=equipmentList();if(a[index])a[index].done=checked;}
    else if(kind==='teach'){state.checks[state.course]=state.checks[state.course]||{};state.checks[state.course][index]=checked;}
    else {state.packChecks[state.course]=state.packChecks[state.course]||{};state.packChecks[state.course][index]=checked;}
    save();
  }

  function reorder(kind,index,dir){
    if(typeof moveItem==='function'){moveItem(kind==='prep'?'equipment':kind==='teach'?'teaching':'pack',index,dir);return;}
  }

  function render(){
    const old=document.getElementById('todayPhaseCard');if(old)old.remove();
    const anchor=document.querySelector('#today .grid.three');if(!anchor)return;
    const card=document.createElement('div');card.id='todayPhaseCard';card.className='card';
    const phase=currentPhase();
    const configs={
      prep:{title:'Preparation checklist',desc:'Get the room, equipment and course materials ready before teaching.',status:'IN PROGRESS',kind:'prep',items:equipmentList(),doneFn:prepComplete},
      teach:{title:'Teaching checklist',desc:'Work through the course content. The preparation checklist is complete.',status:'IN PROGRESS',kind:'teach',items:editableTopics(),doneFn:teachComplete},
      pack:{title:'Pack down checklist',desc:'Finish the course, clean up, document and submit everything.',status:'FINAL PHASE',kind:'pack',items:editablePackDown(),doneFn:packComplete},
      done:{title:'Course complete',desc:'Preparation, course content and pack down are all complete.',status:'COMPLETE',kind:null,items:[],doneFn:()=>true}
    };
    const cfg=configs[phase];
    let rows='';
    if(phase==='done'){
      rows='<div class="phase-complete-message">✓ All three course phases are complete for today.</div>';
    }else{
      rows=cfg.items.map((item,i)=>{
        const text=cfg.kind==='prep'?(item.text||item):(Array.isArray(item)?item[0]:item);
        const detail=Array.isArray(item)?(item[1]||''):'';
        const checked=cfg.kind==='prep'?!!item.done:cfg.kind==='teach'?!!((state.checks[state.course]||{})[i]):!!((state.packChecks[state.course]||{})[i]);
        return `<div class="phase-row ${checked?'done':''}" data-index="${i}"><input type="checkbox" ${checked?'checked':''} aria-label="Complete ${text.replace(/"/g,'&quot;')}"><span class="phase-label">${text}${detail?`<span class="phase-detail">${detail}</span>`:''}</span><span class="phase-controls"><button type="button" class="phase-up" aria-label="Move ${text.replace(/"/g,'&quot;')} up">▲</button><button type="button" class="phase-down" aria-label="Move ${text.replace(/"/g,'&quot;')} down">▼</button></span></div>`;
      }).join('');
    }
    card.innerHTML=`<div class="phase-banner"><div><p class="eyebrow">TODAY'S ACTIVE CHECKLIST</p><h3>${cfg.title}</h3><small>${cfg.desc}</small></div><span class="phase-status ${phase==='done'?'complete':''}">${cfg.status}</span></div><div class="today-phase-list">${rows}</div>${phase!=='done'?`<div class="phase-actions"><button type="button" class="primary" id="todayPhaseAdd">+ Add item</button><button type="button" class="ghost" onclick="printChecklist('${cfg.kind==='prep'?'equipment':cfg.kind==='teach'?'teaching':'packdown'}')">🖨 Print checklist</button><button type="button" class="ghost" onclick="emailChecklist('${cfg.kind==='prep'?'equipment':cfg.kind==='teach'?'teaching':'packdown'}')">✉ Email a copy</button></div>`:''}`;
    anchor.insertAdjacentElement('afterend',card);

    if(phase!=='done'){
      card.querySelectorAll('input[type=checkbox]').forEach((box)=>box.addEventListener('change',()=>toggle(cfg.kind,Number(box.closest('.phase-row').dataset.index),box.checked)));
      card.querySelectorAll('.phase-up').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),-1)));
      card.querySelectorAll('.phase-down').forEach(b=>b.addEventListener('click',()=>reorder(cfg.kind,Number(b.closest('.phase-row').dataset.index),1)));
      card.querySelector('#todayPhaseAdd').addEventListener('click',()=>addItem(cfg.kind));
    }
  }

  const oldEnhance=window.enhanceAll;
  function refresh(){render();}
  if(typeof window.updateAll==='function'){
    const base=window.updateAll;window.updateAll=function(){base();render()};
  }
  document.addEventListener('DOMContentLoaded',render);
  setTimeout(render,50);
})();
