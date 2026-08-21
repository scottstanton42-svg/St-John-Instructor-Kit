(()=>{
  const viewKind=()=>{const id=document.querySelector('.view.active')?.id;return id==='equipment'?'load':id==='setup'?'setup':id==='teach'?'teach':id==='winddown'?'pack':null};
  const snapshot=()=>Array.from(document.querySelectorAll('.stable-row')).map(row=>({key:row.dataset.key,text:row.querySelector('.stable-text strong')?.textContent?.trim()||'',done:!!row.querySelector('input[type="checkbox"]')?.checked}));
  let before=null;
  const kindFor=id=>id==='equipment'?'load':id==='setup'?'setup':id==='teach'?'teach':id==='winddown'?'pack':null;
  const restore=()=>{
    if(!before||!before.length)return;
    const kind=viewKind();if(!kind||typeof state==='undefined'||!state.course)return;
    const byText=new Map(before.map(x=>[x.text,x.done]));
    const rows=Array.from(document.querySelectorAll(`#${kind==='load'?'equipment':kind==='pack'?'winddown':kind} .stable-row`));
    if(kind==='load'){
      const list=equipmentList();
      rows.forEach(row=>{const text=row.querySelector('.stable-text strong')?.textContent?.trim()||'';const idx=Number(String(row.dataset.key||'').slice(1));if(Number.isInteger(idx)&&list[idx]&&byText.has(text))list[idx].done=byText.get(text)});
    }else{
      const target=kind==='setup'?(state.classroomChecks[state.course]=state.classroomChecks[state.course]||{}):kind==='teach'?(state.checks[state.course]=state.checks[state.course]||{}):(state.packChecks[state.course]=state.packChecks[state.course]||{});
      rows.forEach(row=>{const text=row.querySelector('.stable-text strong')?.textContent?.trim()||'';const key=row.dataset.key;if(key&&byText.has(text))target[key]=byText.get(text)});
    }
    localStorage.setItem(stateKey,JSON.stringify(state));
    rows.forEach(row=>{const text=row.querySelector('.stable-text strong')?.textContent?.trim()||'';if(!byText.has(text))return;const done=byText.get(text);const input=row.querySelector('input[type="checkbox"]');if(input)input.checked=done;row.classList.toggle('done',done)});
    if(typeof window.refreshBuddy==='function')window.refreshBuddy();
    else if(typeof window.renderAll==='function')window.renderAll();
    before=null;
  };
  document.addEventListener('mousedown',e=>{
    const b=e.target.closest('.stable-controls .up, .stable-controls .down');
    if(!b)return;
    before=snapshot();
    setTimeout(restore,120);
  },true);
})();
