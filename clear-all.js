(()=>{
  const KEY="sj-instructor-kit-m2";
  function clearAll(){
    const ok=window.confirm("Clear all current course data and return to the start menu?\n\nThis will remove the active course, checklist ticks, course details, attendance and notes stored on this device. Instructor preferences will also be cleared.\n\nThis cannot be undone.");
    if(!ok)return;
    localStorage.removeItem(KEY);
    window.location.href="./?start="+Date.now();
  }
  const boot=()=>{const b=document.getElementById("clearAllButton");if(b)b.addEventListener("click",clearAll)};
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
})();
