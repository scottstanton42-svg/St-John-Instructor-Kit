(()=>{
  function go(view){
    const target=document.getElementById(view);
    if(!target)return;
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    target.classList.add('active');
    document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t.dataset.view===view));
    if(view==='today'){window.renderCurrentChecklist?.();window.updateAll?.();}
    if(view==='setup')window.renderSetupView?.();
    if(view==='teach')window.renderTeachView?.();
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function wire(){
    const map={stageToday:'today',stageEquipment:'equipment',stageClassroom:'setup',stageTeach:'teach',stagePackDown:'winddown'};
    Object.entries(map).forEach(([id,view])=>{
      const b=document.getElementById(id);if(!b)return;
      b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();go(view)};
    });
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(wire,300));
  setTimeout(wire,800);
})();
