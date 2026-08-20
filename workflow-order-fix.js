(()=>{
  // Final workflow guard: the course sequence is Load Up -> Setup -> Teach -> Pack Down.
  // This runs after the older transition scripts and corrects any legacy transition that
  // would otherwise skip the classroom Setup stage.
  const css=document.createElement('style');
  css.textContent=`#wfPhase .workflow-order-card{max-width:900px;margin:0 auto;background:rgba(24,33,41,.96);border:1px solid #3d4a55;border-radius:22px;padding:46px 32px 42px;box-sizing:border-box;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.35);color:#f3f6f8}#wfPhase .workflow-order-card h2{font-size:clamp(30px,4vw,46px);margin:0}#wfPhase .workflow-order-card p{font-size:20px;line-height:1.55;color:#c3ccd4;max-width:720px;margin:22px auto 28px}#wfPhase .workflow-order-check{width:86px;height:86px;margin:0 auto 24px;border-radius:50%;display:grid;place-items:center;background:#168b55;border:4px solid #35c978;color:#fff;font-size:48px;font-weight:900}`;
  document.head.appendChild(css);
  function active(){return !!state?.activeCourse&&state.activeCourse===state.course}
  function setupDone(){return typeof window.classroomComplete==='function'&&window.classroomComplete()}
  function loadDone(){const a=typeof equipmentList==='function'?equipmentList():[];return a.length>0&&a.every(x=>x.done)}
  function teachDone(){const a=typeof topicItems==='function'?topicItems():[];const c=state.checks?.[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function packDone(){const a=typeof packItems==='function'?packItems():[];const c=state.packChecks?.[state.course]||{};return a.length>0&&a.every((_,i)=>!!c[i])}
  function correctTransition(){
    if(!active())return;
    const el=document.getElementById('wfPhase');
    if(!el)return;
    const load=loadDone(), setup=setupDone(), teach=teachDone(), pack=packDone();
    let title='',message='',button='',action='';
    if(load&&!setup){
      title='Load Up checklist complete!';
      message='Everything is loaded and ready. The next step is to set up the classroom and practical training areas.';
      button="I'M READY FOR SETUP";
      action='setup';
    } else if(load&&setup&&!teach){
      title='Setup checklist complete!';
      message='The classroom and practical training environment are ready. Select the button below when you are ready to begin teaching.';
      button="I'M READY TO TEACH";
      action='teach';
    } else if(load&&setup&&teach&&!pack){
      title='Teaching checklist complete!';
      message='The teaching checklist is complete. Select the button below when you are ready to begin pack down.';
      button="I'M READY TO PACK DOWN";
      action='pack';
    } else if(load&&setup&&teach&&pack){
      title='Pack down checklist complete!';
      message='All course checklists are complete. Select the button below to finish the course and create the completion summary.';
      button='FINISH COURSE & CREATE SUMMARY';
      action='finish';
    } else return;
    const h=el.querySelector('.wfbrand h1');
    const existing=(h?.textContent||'').toLowerCase();
    const needs=(action==='setup'&&!existing.includes('load up')&&!existing.includes('preparation'))||(action==='teach'&&!existing.includes('setup'))||(action==='pack'&&!existing.includes('teaching'))||(action==='finish'&&!existing.includes('pack down'));
    if(!needs)return;
    const c=typeof course==='function'?course():{name:state.course||''};
    const d=state.courseDetails?.[state.course]||{};
    el.innerHTML=`<div class="wf"><div class="wfbrand"><img src="optimise.webp" alt="St John Ambulance"><h1>Course workflow</h1></div><div class="workflow-order-card"><div class="workflow-order-check">✓</div><h2>${title}</h2><div style="width:220px;height:3px;margin:24px auto;background:#d71920"></div><p>${message}</p><button class="wbtn wp" id="workflowOrderContinue">${button} <span aria-hidden="true">›</span></button></div><div class="course-strip"><p class="eyebrow">CURRENT COURSE</p><strong>${esc(c.name)}</strong>${d.courseNumber?` &nbsp; <span style="color:#aeb8c2">${esc(d.courseNumber)}</span>`:''}</div></div>`;
    const next=el.querySelector('#workflowOrderContinue');
    next.onclick=()=>{
      el.remove();
      if(action==='setup'){
        if(typeof window.renderSetup==='function')window.renderSetup();
        else window.updateAll?.();
      } else if(action==='teach'||action==='pack'){
        window.updateAll?.();
      } else if(action==='finish'){
        document.getElementById('finish')?.click();
      }
    };
  }
  const observer=new MutationObserver(()=>setTimeout(correctTransition,0));
  observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',()=>setTimeout(correctTransition,100));
})();
