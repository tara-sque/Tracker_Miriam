function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (1000*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function add_to_gelernt(amount){
    gelernt_abs = amount; 
    gelernt_rel = Math.round(gelernt_abs/module_total*100); 
    setCookie("gelernt_abs", gelernt_abs);
    document.getElementById("gelernt").innerHTML=gelernt_abs+" ("+gelernt_rel+"%)"; 
}

function add_to_gelesen(amount){
    gelesen_abs = amount;
    gelesen_rel = Math.round(gelesen_abs/module_total*100); 
    setCookie("gelesen_abs", gelesen_abs);
    document.getElementById("gelesen").innerHTML=gelesen_abs+" ("+gelesen_rel+"%)"; 
}

function add_to_richtig(amount){
    richtig_abs = richtig_abs + amount;
    fragen_total = unbeantwortet_abs + falsch_abs + richtig_abs;
    document.getElementById("fragen").innerHTML="Aktuell "+ fragen_total+" Fragen gestartet"; 
    richtig_rel = Math.round(richtig_abs/fragen_total*100); 
    setCookie("richtig_abs", richtig_abs);
    document.getElementById("richtig").innerHTML=richtig_abs+" ("+richtig_rel+"%)"; 
}

function add_to_falsch(amount){
    falsch_abs = falsch_abs + amount;
    falsch_rel = Math.round(falsch_abs/fragen_total*100); 
    fragen_total = unbeantwortet_abs + falsch_abs + richtig_abs;
    document.getElementById("fragen").innerHTML="Aktuell "+ fragen_total+" Fragen gestartet"; 
    setCookie("falsch_abs", falsch_abs);
    document.getElementById("falsch").innerHTML=falsch_abs+" ("+falsch_rel+"%)"; 
}

function add_to_unbeantwortet(amount){
    unbeantwortet_abs = unbeantwortet_abs + amount;
    unbeantwortet_rel = Math.round(unbeantwortet_abs/fragen_total*100); 
    fragen_total = unbeantwortet_abs + falsch_abs + richtig_abs;
    document.getElementById("fragen").innerHTML="Aktuell "+ fragen_total+" Fragen gestartet"; 
    setCookie("unbeantwortet_abs", unbeantwortet_abs);
    document.getElementById("unbeantwortet").innerHTML=unbeantwortet_abs+" ("+unbeantwortet_rel+"%)"; 
}




function polarToCartesian(radius, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: radius * Math.cos(angleInRadians),
        y: radius * Math.sin(angleInRadians)
    };
}

function describeDonutArc(innerRadius, outerRadius, startAngle, endAngle) {
    const startOuter = polarToCartesian(outerRadius, endAngle);
    const endOuter = polarToCartesian(outerRadius, startAngle);
    const startInner = polarToCartesian(innerRadius, startAngle);
    const endInner = polarToCartesian(innerRadius, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", startOuter.x, startOuter.y,
        "A", outerRadius, outerRadius, 0, largeArcFlag, 0, endOuter.x, endOuter.y,
        "L", startInner.x, startInner.y,
        "A", innerRadius, innerRadius, 0, largeArcFlag, 1, endInner.x, endInner.y,
        "Z"
    ].join(" ");
}


function updateAntwortenCircle(richtigPercent, falschPercent, unbeantwortetPercent) {
    const outerRadius = 40;
    const innerRadius = 29;

    let start = 0;

    const richtigEnd = start + (360 * richtigPercent / 100);
    const richtigPath = describeDonutArc(innerRadius, outerRadius, start, richtigEnd);
    document.getElementById("richtigArc").setAttribute("d", richtigPath);
    start = richtigEnd;

    const falschEnd = start + (360 * falschPercent / 100);
    const falschPath = describeDonutArc(innerRadius, outerRadius, start, falschEnd);
    document.getElementById("falschArc").setAttribute("d", falschPath);
    start = falschEnd;

    const unbeantwortetEnd = start + (360 * unbeantwortetPercent / 100);
    const unbeantwortetPath = describeDonutArc(innerRadius, outerRadius, start, unbeantwortetEnd);
    document.getElementById("unbeantwortetArc").setAttribute("d", unbeantwortetPath);

    // Optional: update label
    document.getElementById("percentageRFText").textContent = `${richtigPercent}%`;
}








function updateCircleChart(gelerntPercent, gelesenPercent) {
    const outerRadius = 40;
    const innerRadius = 29;

    // Gelernt arc (main progress)
    const gelerntPath = describeDonutArc(innerRadius, outerRadius, 0, 360 * gelerntPercent / 100);
    document.getElementById("gelerntArc").setAttribute("d", gelerntPath);

    // Gelesen arc (on top of gelernt)
    const gelesenStart = 360 * gelerntPercent / 100;
    const gelesenPath = describeDonutArc(innerRadius, outerRadius, gelesenStart, gelesenStart + (360 * gelesenPercent / 100));
    document.getElementById("gelesenArc").setAttribute("d", gelesenPath);

    // Update center text
    document.getElementById("percentageText").textContent = `${gelerntPercent}%`;
}


// Funktionscheck
alert("hello my love <3");

let module_total=2130;

gelernt_abs=560;
/**
if (getCookie("gelernt_abs")==""){
    gelernt_abs=560;
} else {
    gelernt_abs=Number(getCookie("gelernt_abs"));
}
 */

var gelernt_rel=Math.round(gelernt_abs/module_total*100); 
document.getElementById("gelernt").innerHTML=gelernt_abs+" ("+gelernt_rel+"%)"; 

gelesen_abs=27;
/** 
if (getCookie("gelesen_abs")==""){
    gelesen_abs=27;
} else {
    gelesen_abs=Number(getCookie("gelesen_abs"));
}
*/

var gelesen_rel=Math.round(gelesen_abs/module_total*100); 
document.getElementById("gelesen").innerHTML=gelesen_abs+" ("+gelesen_rel+"%)"; 

var neu_abs = module_total-gelernt_abs-gelesen_abs;
var neu_rel=Math.round(neu_abs/module_total*100); 
document.getElementById("neu").innerHTML=neu_abs+" ("+neu_rel+"%)"; 

updateCircleChart(gelernt_rel, gelesen_rel);

function updateGelernt(){
    add_to_gelernt(Number(document.getElementById("input-gelernt").value));
    updateCircleChart(gelernt_rel, gelesen_rel);
    document.getElementById("input-gelernt").value = ""
}

function updateGelesen(){
    add_to_gelesen(Number(document.getElementById("input-gelesen").value));
    updateCircleChart(gelernt_rel, gelesen_rel);
    document.getElementById("input-gelesen").value = ""
}










var richtig_abs=1613;
/**
if (getCookie("richtig_abs")==""){
    richtig_abs=1613;
} else {
    richtig_abs=Number(getCookie("richtig_abs"));
}
 */


var falsch_abs=405;
/** 
if (getCookie("falsch_abs")==""){
    falsch_abs=405;
} else {
    falsch_abs=Number(getCookie("falsch_abs"));
}*/


var unbeantwortet_abs=0;

/** 
if (getCookie("unbeantwortet_abs")==""){
    unbeantwortet_abs=106;
} else {
    unbeantwortet_abs=Number(getCookie("unbeantwortet_abs"));
}
*/

var fragen_total = unbeantwortet_abs + falsch_abs + richtig_abs;
document.getElementById("fragen").innerHTML="Aktuell "+ fragen_total+" Fragen gestartet"; 

var richtig_rel=Math.round(richtig_abs/fragen_total*100); 
document.getElementById("richtig").innerHTML=richtig_abs+" ("+richtig_rel+"%)"; 

var falsch_rel=Math.round(falsch_abs/fragen_total*100); 
document.getElementById("falsch").innerHTML=falsch_abs+" ("+falsch_rel+"%)"; 

var unbeantwortet_rel=Math.round(unbeantwortet_abs/fragen_total*100); 
document.getElementById("unbeantwortet").innerHTML=unbeantwortet_abs+" ("+unbeantwortet_rel+"%)"; 

updateAntwortenCircle(richtig_rel, falsch_rel, unbeantwortet_rel);


function updateRichtig(){
    add_to_richtig(Number(document.getElementById("input-richtig").value));
    updateAntwortenCircle(richtig_rel, falsch_rel, unbeantwortet_rel);
    fragen_total = unbeantwortet_abs + falsch_abs + richtig_abs;
    document.getElementById("fragen").innerHTML="Aktuell "+ fragen_total+" Fragen gestartet";
    document.getElementById("input-richtig").value = ""
}

function updateFalsch(){
    add_to_falsch(Number(document.getElementById("input-falsch").value));
    updateAntwortenCircle(richtig_rel, falsch_rel, unbeantwortet_rel);
    document.getElementById("input-falsch").value = ""
}

function updateUnbeantwortet(){
    add_to_unbeantwortet(Number(document.getElementById("input-unbeantwortet").value));
    updateAntwortenCircle(richtig_rel, falsch_rel, unbeantwortet_rel);
    document.getElementById("input-unbeantwortet").value = ""
}