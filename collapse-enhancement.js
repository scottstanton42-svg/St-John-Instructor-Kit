(()=>{
const style=document.createElement('style');
style.textContent=`#todayPhaseCard .phase-collapse{width:auto!important;min-width:104px!important;padding:0 14px!important;font-size:14px!important;font-weight:800!important}`;
document.head.appendChild(style);
function update(){const b=document.getElementById('todayPhaseCollapse');if(!b)return;const collapsed=b.textContent.includes('＋');b.textContent=collapsed?'Expand checklist':'Collapse checklist';b.setAttribute('aria-label',collapsed?'Expand current checklist':'Collapse current checklist');b.setAttribute('title',b.getAttribute('aria-label'))}
const mo=new MutationObserver(update);mo.observe(document.body,{childList:true,subtree:true});document.addEventListener('DOMContentLoaded',update);setTimeout(update,100);
})();