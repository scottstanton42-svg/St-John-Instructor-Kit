(()=>{
  const imageMap={cpr:'hero-cpr.svg',pfa:'illustration-first-aid.svg',paf:'illustration-advanced.svg',ar:'illustration-advanced.svg',ofa:'illustration-first-aid.svg',lvr:'illustration-trauma.svg',education:'illustration-classroom.svg',cpraa:'illustration-first-aid.svg',pfaaa:'illustration-first-aid.svg',remote:'illustration-classroom.svg'};
  const labels={cpr:'CPR',pfa:'Provide First Aid',paf:'Provide Advanced First Aid',ar:'Advanced resuscitation & oxygen therapy',ofa:'Occupational first aid',lvr:'Low voltage rescue & CPR',education:'Education & care first aid',cpraa:'CPR with asthma & anaphylaxis',pfaaa:'Provide First Aid with asthma & anaphylaxis',remote:'Remote-area first aid'};
  const order=['cpr','pfa','paf','ar','ofa','lvr','education','cpraa','pfaaa','remote'];
  const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function render(){
    const host=document.getElementById('courseCards');
    if(!host||typeof courses==='undefined')return;
    host.innerHTML=order.filter(k=>courses[k]).map((k)=>{
      const c=courses[k];
      const codes=(c.codes||[]).map(code=>`<li><strong>${esc(code)}</strong> ${esc(labels[k]||'Course')}</li>`).join('');
      const units=(c.codes||[]).length;
      return `<article class="course-card" style="background-image:url('${imageMap[k]}')">
        <div class="course-top"><h3>${esc(c.name)}</h3><span class="badge">${units||'Course'} ${units?'unit'+(units===1?'':'s'):''}</span></div>
        <div class="course-meta">${esc(c.duration)}</div>
        ${codes?`<ul class="code-list">${codes}</ul>`:''}
        <div class="course-meta">${(c.topics||[]).length} teaching topics</div>
        <div style="margin-top:14px"><button type="button" class="primary course-use" data-course="${esc(k)}">Use this course</button></div>
      </article>`;
    }).join('');
    host.querySelectorAll('.course-use').forEach(btn=>btn.addEventListener('click',()=>window.selectCourse?.(btn.dataset.course)));
  }
  const boot=()=>{render();setTimeout(render,200);setTimeout(render,700)};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.renderBuddyCourseLibrary=render;
})();
