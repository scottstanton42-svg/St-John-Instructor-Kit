(()=>{
const css=document.createElement('style');css.textContent='#wfBar{display:none!important}';document.head.appendChild(css);
document.addEventListener('click',e=>{const b=e.target.closest('#phaseNext');if(!b)return;const text=(b.textContent||'').toLowerCase();if(!text.includes('finish course'))return;e.preventDefault();e.stopImmediatePropagation();setTimeout(()=>document.getElementById('finish')?.click(),0)},true);
})();