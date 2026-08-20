(()=>{
const css=document.createElement('style');css.textContent=`
#wfPhase{background:#0e1419!important;color:#f3f6f8!important;position:fixed!important;inset:0!important;z-index:10000!important;overflow:auto!important}
#wfPhase::before{content:"";position:fixed;inset:0;background-image:url('https://stjohn.org.au/app/uploads/2025/08/SJA_T_AT_WhatIs.jpg');background-size:cover;background-position:center;opacity:.12;pointer-events:none;z-index:-1}
#wfPhase .wf{position:relative;z-index:1;max-width:1000px;margin:0 auto;min-height:100vh;padding:34px 28px;box-sizing:border-box;display:flex;flex-direction:column}
#wfPhase .wfbrand{text-align:center;margin:18px 0 34px}
#wfPhase .wfbrand img{width:68px;height:68px;object-fit:contain;margin-bottom:14px}
#wfPhase .wfbrand h1{color:#f3f6f8;font-size:clamp(32px,5vw,54px);margin:0 0 12px;letter-spacing:-.03em}
#wfPhase .wfbrand p{color:#b8c2cb;font-size:20px;margin:0}
#wfPhase .phase-steps{display:flex;align-items:center;justify-content:center;gap:0;margin:0 auto 34px;width:min(760px,100%)}
#wfPhase .phase-step{display:flex;align-items:center;gap:9px;color:#7f8b95;font-weight:700;white-space:nowrap}
#wfPhase .phase-step.active{color:#f3f6f8}
#wfPhase .phase-step.complete{color:#42b883}
#wfPhase .phase-dot{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;border:2px solid #43515d;background:#182129;color:#aeb8c2;font-weight:900}
#wfPhase .phase-step.complete .phase-dot{background:#168b55;border-color:#32c47e;color:#fff}
#wfPhase .phase-line{height:2px;flex:1;background:#43515d;max-width:190px;margin:0 12px}
#wfPhase .phase-line.complete{background:#32c47e}
#wfPhase .transition-card{width:min(900px,100%);margin:0 auto;background:rgba(24,33,41,.92)!important;border:1px solid #3d4a55!important;border-radius:22px;padding:46px 32px 42px;box-sizing:border-box;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.35)!important}
#wfPhase .transition-check{width:86px;height:86px;margin:0 auto 24px;border-radius:50%;display:grid;place-items:center;background:#168b55;border:4px solid #35c978;color:#fff;font-size:48px;font-weight:900}
#wfPhase .transition-card h2{font-size:clamp(30px,4vw,46px);margin:0;color:#f3f6f8}
#wfPhase .transition-rule{width:220px;height:3px;margin:24px auto;background:#d71920}
#wfPhase .transition-card p{font-size:20px;line-height:1.55;color:#c3ccd4;margin:0 auto 28px;max-width:720px}
#wfPhase .transition-card .wbtn{max-width:540px;margin:0 auto;padding:18px 24px;font-size:20px;border-radius:13px}
#wfPhase .course-strip{width:min(900px,100%);margin:20px auto 0;background:rgba(24,33,41,.9);border:1px solid #3d4a55;border-radius:16px;padding:18px 22px;box-sizing:border-box;text-align:left}
#wfPhase .course-strip .eyebrow{color:#ff333a;font-weight:800;font-size:12px;letter-spacing:.08em;margin:0 0 5px}
#wfPhase .course-strip strong{font-size:20px;color:#f3f6f8}
@media(max-width:650px){#wfPhase .wf{padding:22px 14px}.phase-step{font-size:12px!important}.phase-line{margin:0 5px!important}.phase-dot{width:28px!important;height:28px!important}.transition-card{padding:34px 20px!important}.transition-card p{font-size:17px!important}}
`;
document.head.appendChild(css);
function stageFor(title){if(title.toLowerCase().includes('preparation'))return 0;if(title.toLowerCase().includes('teaching'))return 1;return 2}
function replaceTransition(el){const h=el.querySelector('.wfbrand h1');if(!h)return;const title=h.textContent.trim();const stage=stageFor(title);const isFinal=stage===2;const d=state.courseDetails?.[state.course]||{};const c=typeof course==='function'?course():{name:state.course||''};const names=['Preparation','Teaching','Pack Down'];const prompts=['Everything is packed and ready.\nSelect the button below when you are ready to begin teaching.','The teaching checklist is complete.\nSelect the button below when you are ready to begin pack down.','All course checklists are complete.\nSelect the button below to finish the course and create the completion summary.'];const buttons=['I’M READY TO TEACH','I’M READY TO PACK DOWN','FINISH COURSE & CREATE SUMMARY'];el.innerHTML=`<div class="wf"><div class="wfbrand"><img src="optimise.webp" alt="St John Ambulance"><div class="phase-steps">${names.map((n,i)=>`<div class="phase-step ${i<stage?'complete':''} ${i===stage?'active':''}"><span class="phase-dot">${i<stage?'✓':i+1}</span><span>${n}</span></div>${i<2?`<span class="phase-line ${i<stage?'complete':''}"></span>`:''}`).join('')}</div></div><div class="transition-card"><div class="transition-check">✓</div><h2>${stage===0?'Preparation checklist complete!':stage===1?'Teaching checklist complete!':'Pack down checklist complete!'}</h2><div class="transition-rule"></div><p>${prompts[stage].replace('\\n','<br>')}</p><button class="wbtn wp" id="transitionContinue">${buttons[stage]} <span aria-hidden="true">›</span></button></div><div class="course-strip"><p class="eyebrow">CURRENT COURSE</p><strong>${esc(c.name)}</strong>${d.courseNumber?` &nbsp; <span style="color:#aeb8c2">${esc(d.courseNumber)}</span>`:''}</div></div>`;el.querySelector('#transitionContinue').onclick=()=>{el.remove();if(isFinal){document.getElementById('finish')?.click()}}}
const observer=new MutationObserver(()=>{const el=document.getElementById('wfPhase');if(el&&!el.dataset.polished){el.dataset.polished='1';replaceTransition(el)}});observer.observe(document.body,{childList:true});
})();