(()=>{
  const style=document.createElement('style');
  style.textContent=`
    #today > .section-head{order:0;margin:0 0 14px;display:flex;align-items:flex-end;justify-content:space-between;gap:20px}
    #today > .section-head .eyebrow{color:#d71920!important;margin-bottom:7px}
    #today > .section-head h2{font-size:44px!important;line-height:1.05!important;letter-spacing:-.035em!important;margin:0!important;color:#f3f6f8!important}
    #today > .section-head #todayCourseCodes{font-size:21px!important;margin:8px 0 0!important;color:#aeb8c2!important;font-weight:600}
    #today > .section-head .select{min-width:230px}
    #wfDetails{margin-top:0!important}
    #wfDetails .card-title h3{display:none!important}
    #wfDetails .card-title{margin-bottom:0!important}
    #wfDetails .card-title .eyebrow{font-size:15px!important}
    #progressBar{transition:width .3s ease,background-color .25s ease}
    #progressLabel{transition:color .25s ease}
    @media(max-width:800px){#today > .section-head{align-items:flex-start;flex-direction:column}#today > .section-head h2{font-size:36px!important}#today > .section-head .select{width:100%;min-width:0}}
  `;
  document.head.appendChild(style);

  function reorderCourseHeader(){
    const today=document.getElementById('today');
    const head=today?.querySelector(':scope > .section-head');
    const details=document.getElementById('wfDetails');
    if(!today||!head||!details)return;
    if(details.previousElementSibling!==head)details.parentNode.insertBefore(head,details);
    const eyebrow=head.querySelector('.eyebrow');
    if(eyebrow)eyebrow.textContent='CURRENT COURSE';
  }

  function topicComplete(){
    const base=(course().topics||[]).map((x,i)=>({key:'b'+i}));
    const custom=(state.customTopics?.[state.course]||[]).map((x,i)=>({key:'c'+i}));
    const gone=state.deletedTopics?.[state.course]||{};
    const items=[...base,...custom].filter(x=>!gone[x.key]);
    const checks=state.checks?.[state.course]||{};
    return items.length>0&&items.every((_,i)=>!!checks[i]);
  }
  function packComplete(){
    const base=(packDownByCourse[state.course]||defaultPackDown).map((x,i)=>({key:'b'+i}));
    const custom=(state.customPackDown?.[state.course]||[]).map((x,i)=>({key:'c'+i}));
    const gone=state.deletedPackDown?.[state.course]||{};
    const items=[...base,...custom].filter(x=>!gone[x.key]);
    const checks=state.packChecks?.[state.course]||{};
    return items.length>0&&items.every((_,i)=>!!checks[i]);
  }
  function prepComplete(){const items=equipmentList();return items.length>0&&items.every(x=>!!x.done)}

  function updateProgressColour(){
    const bar=document.getElementById('progressBar');
    const label=document.getElementById('progressLabel');
    if(!bar)return;
    let colour='#d71920';
    if(packComplete())colour='#35c978';
    else if(prepComplete())colour='#f59e0b';
    bar.style.backgroundColor=colour;
    if(label)label.style.color=colour;
  }

  function run(){reorderCourseHeader();updateProgressColour()}
  if(typeof window.updateAll==='function'){
    const base=window.updateAll;
    window.updateAll=function(){base();run()};
  }
  document.addEventListener('DOMContentLoaded',run);
  setInterval(run,500);
})();
