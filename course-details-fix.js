(()=>{
  const KEY='sj-instructor-kit-m2';
  function read(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
  function write(s){localStorage.setItem(KEY,JSON.stringify(s))}
  function escHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
  function openEditor(){
    const s=read();
    if(!s.activeCourse)return;
    const id=s.course||s.activeCourse;
    const d=(s.courseDetails&&s.courseDetails[id])||{};
    const courses=window.__sjCourses||{};
    let overlay=document.getElementById('courseDetailsEditor');
    if(overlay)overlay.remove();
    overlay=document.createElement('div');
    overlay.id='courseDetailsEditor';
    overlay.innerHTML=`<div class="cde-backdrop"><div class="cde-modal" role="dialog" aria-modal="true" aria-labelledby="cdeTitle">
      <div class="cde-head"><div><p class="eyebrow">COURSE DETAILS</p><h2 id="cdeTitle">Edit course details</h2></div><button type="button" class="cde-close" id="cdeCancel">×</button></div>
      <div class="cde-grid">
        <label>Course<select id="cdeCourse">${Object.entries(courses).map(([k,c])=>`<option value="${escHtml(k)}" ${k===id?'selected':''}>${escHtml(c.name)}</option>`).join('')}</select></label>
        <label>Course number<input id="cdeNumber" value="${escHtml(d.courseNumber||'')}" autocomplete="off"></label>
        <label>Client<select id="cdeClient"><option value="public" ${d.clientType!=='industry'?'selected':''}>Public</option><option value="industry" ${d.clientType==='industry'?'selected':''}>Industry</option></select></label>
        <label id="cdeClientNameWrap" class="${d.clientType==='industry'?'':'hidden'}">Client name<input id="cdeClientName" value="${escHtml(d.clientName||'')}" autocomplete="off"></label>
        <label>Location<input id="cdeLocation" value="${escHtml(d.location||'')}" autocomplete="off"></label>
        <label>Date<input id="cdeDate" type="date" value="${escHtml(d.date||'')}"></label>
      </div>
      <div class="cde-actions"><button type="button" class="ghost" id="cdeCancel2">Cancel</button><button type="button" class="primary" id="cdeSave">Save details</button></div>
    </div></div>`;
    document.body.appendChild(overlay);
    const client=document.getElementById('cdeClient');
    const clientWrap=document.getElementById('cdeClientNameWrap');
    client.onchange=()=>clientWrap.classList.toggle('hidden',client.value!=='industry');
    document.getElementById('cdeCancel').onclick=()=>overlay.remove();
    document.getElementById('cdeCancel2').onclick=()=>overlay.remove();
    overlay.querySelector('.cde-backdrop').onclick=e=>{if(e.target===e.currentTarget)overlay.remove()};
    document.getElementById('cdeSave').onclick=()=>{
      const nextId=document.getElementById('cdeCourse').value;
      s.course=nextId;
      s.activeCourse=nextId;
      s.courseDetails=s.courseDetails||{};
      s.courseDetails[nextId]={courseNumber:document.getElementById('cdeNumber').value.trim(),clientType:client.value,clientName:document.getElementById('cdeClientName').value.trim(),location:document.getElementById('cdeLocation').value.trim(),date:document.getElementById('cdeDate').value,instructor:s.name||''};
      s.courseNotes=s.courseNotes||{};
      if(s.courseNotes[nextId]===undefined)s.courseNotes[nextId]='';
      s.checks=s.checks||{};s.packChecks=s.packChecks||{};
      if(!s.checks[nextId])s.checks[nextId]={};
      if(!s.packChecks[nextId])s.packChecks[nextId]={};
      write(s);overlay.remove();
      window.dispatchEvent(new Event('course-details-updated'));
      if(typeof window.updateAll==='function')window.updateAll();
    };
  }
  const css=document.createElement('style');
  css.textContent=`#courseDetailsEditor{position:fixed;inset:0;z-index:20000}.cde-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.72);display:grid;place-items:center;padding:20px;box-sizing:border-box}.cde-modal{width:min(720px,100%);background:#242d35;color:#f3f6f8;border:1px solid #43515d;border-radius:18px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.5);box-sizing:border-box}.cde-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:20px}.cde-head h2{margin:0;font-size:28px}.cde-close{width:42px;height:42px;border:1px solid #43515d;border-radius:10px;background:#202a33;color:#fff;font-size:28px;cursor:pointer}.cde-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.cde-grid label{display:block;font-weight:700}.cde-grid input,.cde-grid select{display:block;width:100%;box-sizing:border-box;margin-top:7px;padding:12px;border-radius:9px;border:1px solid #53616d;background:#f4f4f4;color:#182129;font:inherit}.cde-grid .hidden{display:none}.cde-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:24px;padding-top:18px;border-top:1px solid #3d4a55}.cde-actions button{padding:12px 20px;border-radius:10px;font-weight:800;cursor:pointer}@media(max-width:650px){.cde-grid{grid-template-columns:1fr}.cde-modal{padding:18px}}
`;
  document.head.appendChild(css);
  window.addEventListener('click',e=>{const b=e.target.closest('#editDetails');if(b){e.preventDefault();e.stopPropagation();openEditor()}} ,true);
  window.addEventListener('click',e=>{const b=e.target.closest('#ed');if(b){e.preventDefault();e.stopPropagation();openEditor()}},true);
  window.addEventListener('course-details-updated',()=>setTimeout(()=>{if(typeof window.updateAll==='function')window.updateAll()},0));
  // Keep a course catalogue available without depending on app.js lexical scope.
  window.__sjCourses={cpr:{name:'CPR Refresher'},pfa:{name:'Provide First Aid'},paf:{name:'Provide Advanced First Aid'},ar:{name:'Advanced Resuscitation & Oxygen Therapy'},ofa:{name:'Occupational First Aid'},lvr:{name:'Low Voltage Rescue & CPR'},qldfire:{name:'QLD Fire Department — First Aid, Advanced Resuscitation & Oxygen Therapy'},remote:{name:'Remote Area First Aid'},powerlink:{name:'Powerlink Queensland — Trauma & Remote Work Module'}};
})();
