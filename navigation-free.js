(()=>{
  function active(){return !!window.state?.activeCourse&&window.state.activeCourse===window.state.course}
  function go(view){
    if(typeof window.showView==='function') window.showView(view);
    else {document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById(view)?.classList.add('active')}
    if(view==='today') setTimeout(()=>{window.updateAll?.();window.renderCurrentChecklist?.();window.openCurrent?.()},60);
    if(view==='setup') setTimeout(()=>window.renderSetupView?.(),60);
    if(view==='teach') setTimeout(()=>window.renderTeachView?.(),60);
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('#stageToday,#stageEquipment,#stageClassroom,#stageTeach,#stagePackDown');
    if(!b)return;
    e.preventDefault();e.stopImmediatePropagation();
    if(!active())return;
    if(b.id==='stageToday')go('today');
    else if(b.id==='stageEquipment')go('equipment');
    else if(b.id==='stageClassroom')go('setup');
    else if(b.id==='stageTeach')go('teach');
    else if(b.id==='stagePackDown')go('winddown');
  },true);
  window.addEventListener('load',()=>setTimeout(()=>{if(active()&&document.getElementById('today')?.classList.contains('active')){window.updateAll?.();window.renderCurrentChecklist?.()}},100));
})();
