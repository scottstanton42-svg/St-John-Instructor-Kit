(()=>{
  function go(view){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    const target=document.getElementById(view);
    if(target) target.classList.add('active');
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    const tab=document.querySelector(`.tab[data-view="${view}"]`);
    if(tab) tab.classList.add('active');
    if(view==='today') setTimeout(()=>{window.updateAll?.();window.renderCurrentChecklist?.();window.openCurrent?.()},30);
    if(view==='equipment') setTimeout(()=>window.updateAll?.(),30);
    if(view==='setup') setTimeout(()=>window.renderSetupView?.(),30);
    if(view==='teach') setTimeout(()=>window.renderTeachView?.(),30);
    if(view==='winddown') setTimeout(()=>window.updateAll?.(),30);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('#stageToday,#stageEquipment,#stageClassroom,#stageTeach,#stagePackDown');
    if(!b)return;
    e.preventDefault();e.stopPropagation();
    if(b.id==='stageToday')go('today');
    else if(b.id==='stageEquipment')go('equipment');
    else if(b.id==='stageClassroom')go('setup');
    else if(b.id==='stageTeach')go('teach');
    else if(b.id==='stagePackDown')go('winddown');
  },true);
  window.stageNavigate=go;
})();
