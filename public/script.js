const skills = [{skill:"web design", proficiency:"very good"}, {skill:"graphic design", proficiency:"master"}];
let myli, mySpan;

for(let skill of skills){
    myli=document.createElement("li");
    myli.textContent=skill.skill ;
    mySpan=document.createElement("span");
    mySpan.setAttribute("class", skill.proficiency.replace(" ","-"));
    mySpan.textContent=skill.proficiency;
    myli.appendChild(mySpan);
    document.getElementById("skills").appendChild(myli)
}

