const courses = {
  cpr: {
    name:"CPR Refresher",
    codes:["HLTAID009"],
    duration:"2.5 hours face-to-face",
    topics:[
      ["Before class","Room, equipment, attendance and learner readiness"],
      ["DRSABCD","Explain and demonstrate the emergency action plan"],
      ["Adult CPR","Demonstrate high-quality adult CPR and learner practice"],
      ["Child CPR","Demonstrate child CPR and learner practice"],
      ["Infant CPR","Demonstrate infant CPR and learner practice"],
      ["AED","Demonstrate safe AED use and learner practice"],
      ["Choking","Cover recognition and first aid response"],
      ["Recovery position","Demonstrate when appropriate and safe"],
      ["Assessment","Complete required practical assessment"],
      ["Wrap-up","Questions, feedback and completion/admin"]
    ]
  },
  pfa: {
    name:"Provide First Aid",
    codes:["HLTAID009","HLTAID010","HLTAID011"],
    duration:"Full day face-to-face",
    topics:[
      ["Welcome & safety","Introductions, course overview, learner safety and expectations"],
      ["DRSABCD","Emergency action plan and scene safety"],
      ["CPR","Adult, child and infant CPR practice"],
      ["AED","Safe AED use and practical learner practice"],
      ["Choking","Assessment and first aid response"],
      ["Medical emergencies","Common first aid medical presentations"],
      ["Trauma & bleeding","Wounds, bleeding and appropriate first aid"],
      ["Soft tissue injuries","Sprains, strains and soft tissue management"],
      ["Fractures & dislocations","Recognition and first aid management"],
      ["Burns","Recognition, immediate first aid and escalation"],
      ["Head, neck & spinal injuries","Recognition, precautions and escalation"],
      ["Poisons & bites/stings","Relevant Australian first aid responses"],
      ["Assessment","Complete required practical/theory assessment"],
      ["Wrap-up","Questions, feedback and completion/admin"]
    ]
  },
  paf: {
    name:"Provide Advanced First Aid",
    codes:["HLTAID009","HLTAID010","HLTAID011","HLTAID014"],
    duration:"3 days face-to-face (course format may include pre-learning)",
    topics:[
      ["Course orientation","High-risk environment, scope, safety and expectations"],
      ["Advanced assessment","Primary/secondary assessment and clinical observations"],
      ["Major trauma","Systematic approach to major trauma"],
      ["Triage","Principles of triage and major incident organisation"],
      ["Spinal & stretcher skills","Spinal precautions, boards/stretchers and safe movement"],
      ["Sudden cardiac arrest","CPR/AED integration and team response"],
      ["Medical emergencies","Advanced first aid responses within scope"],
      ["Medications","Recognise and respond to medication-related presentations"],
      ["Drug & alcohol affected casualties","Assessment, safety and escalation"],
      ["Emotionally disturbed casualties","Personal safety, de-escalation and escalation"],
      ["Soft bag resuscitation","Equipment familiarisation and practical skills"],
      ["Infection control","Standard precautions and equipment hygiene"],
      ["Post-incident support","Post-incident stress and support considerations"],
      ["Assessment","Complete required assessment activities"],
      ["Wrap-up","Questions, feedback and completion/admin"]
    ]
  },
  ar: {
    name:"Advanced Resuscitation & Oxygen Therapy",
    codes:["HLTAID015"],
    duration:"Face-to-face",
    topics:[
      ["Orientation","Equipment, safety, scope and session plan"],
      ["Advanced resuscitation","Review and demonstrate relevant resuscitation skills"],
      ["Oxygen therapy","Equipment, indications, safety and practical skills"],
      ["Airway management","Airway assessment and appropriate adjuncts"],
      ["Bag-mask ventilation","Equipment setup and effective ventilation"],
      ["AED integration","Team-based resuscitation and AED practice"],
      ["Special situations","Relevant advanced resuscitation scenarios"],
      ["Infection control","Cleaning, PPE and equipment handling"],
      ["Assessment","Complete required practical/theory assessment"],
      ["Wrap-up","Questions, feedback and completion/admin"]
    ]
  },
  ofa: {
    name:"Occupational First Aid",
    codes:["HLTAID009","HLTAID010","HLTAID011","HLTAID014","HLTAID015","HLTAID016"],
    duration:"3.5 days face-to-face",
    topics:[
      ["Course orientation","Occupational role, scope, workplace safety and expectations"],
      ["Core first aid","DRSABCD, CPR, AED and common first aid"],
      ["Advanced assessment","Clinical assessment and observations"],
      ["Major trauma","Management principles and escalation"],
      ["Triage","Major incident and workplace triage principles"],
      ["Resuscitation","Advanced resuscitation and team response"],
      ["Oxygen therapy","Equipment, safety and practical skills"],
      ["Workplace first aid services","Establishing, maintaining and facilitating first aid resources"],
      ["Medications","Recognition and response within scope"],
      ["Drug & alcohol affected casualties","Safety, assessment and escalation"],
      ["Emotionally disturbed casualties","Safety, de-escalation and escalation"],
      ["Infection control","Standard precautions and equipment hygiene"],
      ["Assessment","Complete required assessment activities"],
      ["Wrap-up","Documentation, handover, feedback and completion"]
    ]
  },
  lvr: {
    name:"Low Voltage Rescue & CPR",
    codes:["HLTAID009","UETDRMP018"],
    duration:"6 hours immersive / other delivery formats may apply",
    topics:[
      ["Course orientation","Electrical safety, scene safety and PPE"],
      ["CPR","Review and practical CPR skills"],
      ["Electrical incidents","Hazards, approach and safe work principles"],
      ["LV panel rescue","Rescue process from a live low-voltage panel"],
      ["Rescue equipment","Equipment familiarisation and safe use"],
      ["CPR/AED integration","Post-rescue casualty management"],
      ["Scenario practice","Integrated rescue and first aid scenarios"],
      ["Assessment","Complete required practical/theory assessment"],
      ["Wrap-up","Questions, feedback and completion/admin"]
    ]
  },
  qldfire: {
    name:"QLD Fire Department — First Aid, Advanced Resuscitation & Oxygen Therapy",
    codes:["HLTAID011","HLTAID015"],
    duration:"Specialty course — combined first aid and advanced resuscitation / oxygen therapy",
    topics:[
      ["Course orientation","Course overview, operational safety, scope and learner expectations"],
      ["DRSABCD & scene safety","Emergency action plan, scene assessment and casualty priorities"],
      ["CPR & AED","Adult CPR, AED use and team-based resuscitation practice"],
      ["Airway management","Airway assessment, management and appropriate adjuncts"],
      ["Oxygen therapy","Oxygen equipment, indications, safety and practical skills"],
      ["Bag-mask ventilation","Equipment setup and effective ventilation"],
      ["Medical emergencies","Recognition, first aid management and escalation"],
      ["Trauma & major bleeding","Recognition and immediate management of serious bleeding"],
      ["Tourniquets","Tourniquet equipment, application and practical scenario training"],
      ["Haemostatic dressings","Haemostatic dressing use, packing principles and practical application"],
      ["Trauma scenarios","Integrated casualty assessment, bleeding control, resuscitation and oxygen therapy"],
      ["Team response","Role allocation, communication and coordinated casualty management"],
      ["Assessment","Complete required practical/theory assessment activities"],
      ["Wrap-up","Equipment recovery, documentation, feedback and completion/admin"]
    ]
  }
};

const defaultEquipment = [
  "Course manuals / learner materials",
  "Instructor laptop or tablet + charger",
  "Attendance / assessment paperwork",
  "Manikins — adult",
  "Manikins — child",
  "Manikins — infant",
  "AED trainer",
  "Pocket masks / face shields",
  "Gloves and PPE",
  "First aid kit / dressings",
  "Bandages / triangular bandages",
  "Burns dressings / burn equipment",
  "Splints / sling equipment",
  "Oxygen equipment (where required)",
  "Bag-valve-mask / soft bag (where required)",
  "Cleaning / disinfecting supplies",
  "Pens, markers and stationery",
  "Cables / power boards / extension lead",
  "Water / consumables as required"
];

const stateKey="sj-instructor-kit-m2";
let state = JSON.parse(localStorage.getItem(stateKey) || "{}");
state.course = state.course || "pfa";
state.checks = state.checks || {};
state.equipment = state.equipment || defaultEquipment.map(x=>({text:x,done:false}));
state.name = state.name || "";

function save(){ localStorage.setItem(stateKey,JSON.stringify(state)); updateAll(); }

function course(){ return courses[state.course]; }
function courseChecks(){ return state.checks[state.course] || {}; }

function renderCourseSelect(){
  const el=document.getElementById("courseSelect");
  el.innerHTML=Object.entries(courses).map(([id,c])=>`<option value="${id}" ${id===state.course?"selected":""}>${c.name}</option>`).join("");
  el.onchange=()=>{state.course=el.value; save();};
}
function renderToday(){
  const c=course();
  document.getElementById("todayCourseName").textContent=c.name;
  document.getElementById("todayCourseCodes").textContent=c.codes.join(" · ");
  const box=document.getElementById("todayChecklist");
  const checks=courseChecks();
  box.innerHTML=c.topics.map((t,i)=>{
    const id="topic-"+i;
    return `<div class="check-row ${checks[id]?"done":""}">
      <input type="checkbox" id="${id}" ${checks[id]?"checked":""}>
      <label for="${id}"><strong>${t[0]}</strong><small>${t[1]}</small></label>
    </div>`;
  }).join("");
  c.topics.forEach((_,i)=>{
    const id="topic-"+i;
    document.getElementById(id).onchange=e=>{
      state.checks[state.course]=state.checks[state.course]||{};
      state.checks[state.course][id]=e.target.checked; save();
    };
  });
}
function renderCourses(){
  document.getElementById("courseCards").innerHTML=Object.values(courses).map(c=>`
    <article class="course-card">
      <div class="course-top"><h3>${c.name}</h3><span class="badge">${c.codes.length} unit${c.codes.length===1?"":"s"}</span></div>
      <div class="course-meta">${c.duration}</div>
      <ul class="code-list">${c.codes.map(code=>`<li><strong>${code}</strong> ${unitName(code)}</li>`).join("")}</ul>
      <button class="ghost" style="margin-top:12px" onclick="selectCourse('${Object.entries(courses).find(([k,v])=>v===c)[0]}')">Use this course</button>
    </article>`).join("");
}
function unitName(code){
  return ({
    HLTAID009:"Provide cardiopulmonary resuscitation",
    HLTAID010:"Provide basic emergency life support",
    HLTAID011:"Provide First Aid",
    HLTAID014:"Provide Advanced First Aid",
    HLTAID015:"Provide advanced resuscitation and oxygen therapy",
    HLTAID016:"Manage first aid services and resources",
    UETDRMP018:"Perform rescue from a live low voltage panel"
  })[code] || "";
}
function selectCourse(id){state.course=id;save();showView("today");}
function renderEquipment(){
  document.getElementById("equipmentCourseTitle").textContent=course().name+" equipment";
  const list=document.getElementById("equipmentList");
  list.innerHTML=state.equipment.map((item,i)=>`
    <div class="equipment-row">
      <input type="checkbox" ${item.done?"checked":""} data-eq="${i}">
      <input type="text" value="${escapeHtml(item.text)}" data-text="${i}" aria-label="Equipment item">
      <button class="remove" data-remove="${i}" aria-label="Remove item">×</button>
    </div>`).join("");
  list.querySelectorAll("[data-eq]").forEach(el=>el.onchange=e=>{state.equipment[e.target.dataset.eq].done=e.target.checked;save()});
  list.querySelectorAll("[data-text]").forEach(el=>el.onchange=e=>{state.equipment[e.target.dataset.text].text=e.target.value;save()});
  list.querySelectorAll("[data-remove]").forEach(el=>el.onclick=e=>{state.equipment.splice(+e.target.dataset.remove,1);save()});
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function renderSettings(){document.getElementById("instructorName").value=state.name;document.getElementById("instructorName").onchange=e=>{state.name=e.target.value;save()}}
function updateProgress(){
  const total=course().topics.length;
  const done=Object.values(courseChecks()).filter(Boolean).length;
  const pct=total?Math.round(done/total*100):0;
  document.getElementById("progressLabel").textContent=pct+"%";
  document.getElementById("progressBar").style.width=pct+"%";
}
function updateAll(){renderCourseSelect();renderToday();renderCourses();renderEquipment();renderSettings();updateProgress();}
function showView(id){
  document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.id===id));
  document.querySelectorAll(".tab").forEach(t=>t.classList.toggle("active",t.dataset.view===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>showView(t.dataset.view));
document.querySelectorAll("[data-jump]").forEach(b=>b.onclick=()=>showView(b.dataset.jump));
document.getElementById("resetCourse").onclick=()=>{
  if(confirm("Reset all teaching checklist ticks for this course?")){state.checks[state.course]={};save();}
};
document.getElementById("clearEquipment").onclick=()=>{
  state.equipment.forEach(x=>x.done=false);save();
};
document.getElementById("addEquipment").onclick=()=>{
  state.equipment.push({text:"New equipment item",done:false});save();
  setTimeout(()=>{const inputs=document.querySelectorAll("[data-text]");inputs[inputs.length-1]?.focus()},50);
};
updateAll();
