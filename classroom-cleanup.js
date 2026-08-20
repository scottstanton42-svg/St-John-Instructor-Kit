(()=>{
// Classroom setup now has its own phase. Remove legacy room/setup entries from equipment packing lists.
const classroomEquipmentPattern=/^(SET UP\s+—|.*\b(training room|classroom|projector|whiteboard|speakers|power points|floor space)\b)/i;
function cleanEquipment(){
 try{
  if(typeof qldEquipment!=='undefined'){
   for(let i=qldEquipment.length-1;i>=0;i--)if(classroomEquipmentPattern.test(qldEquipment[i]))qldEquipment.splice(i,1);
  }
  if(state.equipmentByCourse){Object.keys(state.equipmentByCourse).forEach(k=>{if(Array.isArray(state.equipmentByCourse[k]))state.equipmentByCourse[k]=state.equipmentByCourse[k].filter(x=>!classroomEquipmentPattern.test(String(x.text||x)));});}
  localStorage.setItem(stateKey,JSON.stringify(state));
 }catch(e){}
}
cleanEquipment();
})();