(()=>{
  delete courses.qldfire;
  delete courses.powerlink;
  delete packDownByCourse.qldfire;
  delete packDownByCourse.powerlink;

  // Align existing advanced/remote entries with the current QLD course offerings.
  courses.paf.name="Provide Advanced First Aid + Provide Advanced Resuscitation";
  courses.paf.codes=["HLTAID009","HLTAID010","HLTAID011","HLTAID014","HLTAID015"];
  courses.paf.duration="3 days face-to-face";
  courses.remote.codes=["HLTAID009","HLTAID010","HLTAID011","HLTAID013"];
  courses.remote.duration="3 days face-to-face";

  courses.education={name:"Education & Care First Aid with PFA",codes:["HLTAID009","HLTAID010","HLTAID011","HLTAID012"],duration:"1 day face-to-face",topics:[
    ["Course orientation","Child-focused first aid, scope, safety and expectations"],["DRSABCD","Emergency action plan, scene safety and casualty priorities"],["Adult CPR","Adult CPR skills and learner practice"],["Child CPR","Child CPR skills and learner practice"],["Infant CPR","Infant CPR skills and learner practice"],["AED","Safe AED use with adult, child and infant considerations"],["Asthma emergencies","Recognition, first aid response and asthma management considerations"],["Anaphylaxis","Recognition, emergency response and adrenaline auto-injector considerations"],["Common childhood injuries","Falls, wounds, bleeding, burns, fractures and other common injuries"],["Medical emergencies","Recognition and first aid response for common medical presentations"],["Choking","Recognition and age-appropriate first aid response"],["Assessment","Complete required practical and theory assessment activities"],["Wrap-up","Questions, feedback, documentation and completion/admin"]
  ]};
  courses.cpraa={name:"CPR with Asthma & Anaphylaxis",codes:["HLTAID009","22578VIC","22702VIC"],duration:"1 day face-to-face",topics:[
    ["Course orientation","Scope, safety, session plan and learner expectations"],["CPR","Adult, child and infant CPR practice"],["AED","Safe AED use and practical learner practice"],["Asthma","Recognition of asthma emergencies and appropriate first aid response"],["Asthma management","Asthma action plans, inhaler/spacer use and emergency response"],["Anaphylaxis","Recognition, emergency response and adrenaline auto-injector use"],["Risk management","Strategies to reduce asthma and anaphylaxis risks in relevant settings"],["Scenarios","Integrated CPR, asthma and anaphylaxis scenarios"],["Assessment","Complete required practical and theory assessment activities"],["Wrap-up","Questions, feedback, documentation and completion/admin"]
  ]};
  courses.pfaaa={name:"Provide First Aid with Asthma & Anaphylaxis",codes:["HLTAID009","HLTAID010","HLTAID011","22578VIC","22702VIC"],duration:"2 days face-to-face",topics:[
    ["Course orientation","Scope, safety, session plan and learner expectations"],["DRSABCD","Emergency action plan and scene safety"],["CPR","Adult, child and infant CPR practice"],["AED","Safe AED use and practical learner practice"],["Choking","Recognition and first aid response"],["Medical emergencies","Common first aid medical presentations"],["Trauma & bleeding","Wounds, bleeding and appropriate first aid"],["Burns & soft tissue injuries","Recognition and immediate first aid"],["Fractures & dislocations","Recognition and first aid management"],["Asthma","Recognition of asthma emergencies and appropriate first aid response"],["Asthma management","Asthma action plans, inhaler/spacer use and emergency response"],["Anaphylaxis","Recognition, emergency response and adrenaline auto-injector use"],["Risk management","Strategies to reduce asthma and anaphylaxis risks"],["Scenarios","Integrated first aid, asthma and anaphylaxis scenarios"],["Assessment","Complete required practical and theory assessment activities"],["Wrap-up","Questions, feedback, documentation and completion/admin"]
  ]};

  packDownByCourse.education=["Clean and disinfect adult/child/infant manikins","Check AED trainer","Check asthma and anaphylaxis training devices","Restock first aid dressings and consumables","Complete attendance and assessment documentation","Record equipment issues","Pack course materials and teaching equipment","Check room and leave tidy",...commonPackDown];
  packDownByCourse.cpraa=["Clean and disinfect manikins","Check AED trainer","Check asthma inhaler/spacer training equipment","Check adrenaline auto-injector training devices","Restock consumables","Complete attendance and assessment documentation","Record equipment issues","Pack course materials and teaching equipment","Check room and leave tidy",...commonPackDown];
  packDownByCourse.pfaaa=["Clean and disinfect manikins","Check AED trainer","Check asthma inhaler/spacer training equipment","Check adrenaline auto-injector training devices","Restock first aid dressings and consumables","Complete attendance and assessment documentation","Record equipment issues","Pack course materials and teaching equipment","Check room and leave tidy",...commonPackDown];

  const educationEquipment=["Course manuals / learner materials","Attendance / assessment paperwork","Instructor laptop or tablet + charger","Adult manikin","Child/infant manikins","AED trainer","Asthma inhaler/spacer training device","Adrenaline auto-injector training devices","Pocket masks / face shields","Gloves and PPE","First aid kit / dressings","Bandages / triangular bandages","Burns dressings / burn equipment","Splints / sling equipment","Cleaning / disinfecting supplies","Pens, markers and stationery"];
  const asthmaEquipment=["Course manuals / learner materials","Attendance / assessment paperwork","Instructor laptop or tablet + charger","Adult/child/infant manikins","AED trainer","Asthma inhaler/spacer training device","Adrenaline auto-injector training devices","Gloves and PPE","First aid kit / dressings","Bandages / triangular bandages","Burns dressings / burn equipment","Splints / sling equipment","Cleaning / disinfecting supplies","Pens, markers and stationery"];
  state.equipmentByCourse=state.equipmentByCourse||{};
  if(!state.equipmentByCourse.education) state.equipmentByCourse.education=educationEquipment.map(text=>({text,done:false}));
  if(!state.equipmentByCourse.cpraa) state.equipmentByCourse.cpraa=asthmaEquipment.map(text=>({text,done:false}));
  if(!state.equipmentByCourse.pfaaa) state.equipmentByCourse.pfaaa=asthmaEquipment.map(text=>({text,done:false}));
  if(!courses[state.course]) state.course="pfa";
  localStorage.setItem(stateKey,JSON.stringify(state));
  if(typeof updateAll==='function') updateAll();
})();
