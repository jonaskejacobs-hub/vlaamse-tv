const channels = [
  {id:"vrt1", name:"VRT 1", logo:"één", group:"VRT", url:"https://www.vrtmax.be/", description:"Live en programma’s via VRT MAX", color:"#2d83d5"},
  {id:"canvas", name:"VRT Canvas", logo:"canvas", group:"VRT", url:"https://www.vrtmax.be/", description:"Live en programma’s via VRT MAX", color:"#37a7b5"},
  {id:"ketnet", name:"Ketnet", logo:"ketnet", group:"VRT", url:"https://www.vrtmax.be/", description:"Kinderzender via VRT MAX", color:"#1768cb"},
  {id:"vtm", name:"VTM", logo:"vtm", group:"VTM", url:"https://www.vtmgo.be/", description:"Live en programma’s via VTM GO", color:"#efefef"},
  {id:"vtm2", name:"VTM 2", logo:"vtm 2", group:"VTM", url:"https://www.vtmgo.be/", description:"Live en programma’s via VTM GO", color:"#efefef"},
  {id:"vtm3", name:"VTM 3", logo:"vtm 3", group:"VTM", url:"https://www.vtmgo.be/", description:"Live en programma’s via VTM GO", color:"#efefef"},
  {id:"vtm4", name:"VTM 4", logo:"vtm 4", group:"VTM", url:"https://www.vtmgo.be/", description:"Live en programma’s via VTM GO", color:"#efefef"},
  {id:"play4", name:"Play4", logo:"play4", group:"Play", url:"https://www.play.tv/", description:"Live en programma’s via Play", color:"#54ded0"},
  {id:"play5", name:"Play5", logo:"play5", group:"Play", url:"https://www.play.tv/", description:"Live en programma’s via Play", color:"#c07aff"}
];
const demoGuide = [
 ["19:00","VRT 1","Nieuws","Voorbeelddata"],["19:45","VRT 1","Avondprogramma","Voorbeelddata"],
 ["20:00","VRT Canvas","Documentaire","Voorbeelddata"],["19:00","VTM","Nieuws","Voorbeelddata"],
 ["20:00","VTM","Entertainment","Voorbeelddata"],["20:00","VTM 2","Reality","Voorbeelddata"],
 ["20:00","Play4","Entertainment","Voorbeelddata"],["20:30","Play5","Serie","Voorbeelddata"]
];
const channelHost = document.getElementById("channels");
const selectedName = document.getElementById("selected-name");
const selectedDesc = document.getElementById("selected-desc");
const playerTitle = document.getElementById("player-title");
const playerSubtitle = document.getElementById("player-subtitle");
const openOfficial = document.getElementById("open-official");
let selected = null, focusIndex = 0;

function selectChannel(ch) {
  selected = ch;
  document.querySelectorAll(".channel").forEach(el => el.classList.toggle("selected", el.dataset.id === ch.id));
  selectedName.textContent = ch.name;
  selectedDesc.textContent = ch.description;
  playerTitle.textContent = ch.name + " geselecteerd";
  playerSubtitle.textContent = "Voor rechtstreekse weergave is een officiële stream-integratie nodig. Open voorlopig de omroepdienst.";
  openOfficial.disabled = false;
}
channels.forEach((ch,i) => {
  const btn = document.createElement("button");
  btn.className = "channel"; btn.dataset.id = ch.id; btn.setAttribute("role","listitem");
  btn.innerHTML = `<span class="logo" style="color:${ch.color}">${ch.logo}</span><strong>${ch.name}</strong><small>${ch.group} · dienst openen ↗</small>`;
  btn.addEventListener("click", () => { focusIndex=i; selectChannel(ch); });
  channelHost.appendChild(btn);
});
openOfficial.addEventListener("click", () => { if(selected) window.open(selected.url, "_blank", "noopener"); });
document.querySelectorAll(".nav").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".nav").forEach(n => n.classList.toggle("active", n===btn));
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById(btn.dataset.view+"-view").classList.remove("hidden");
  if(btn.dataset.view==="guide") renderGuide();
}));
function renderGuide(){
  const body=document.getElementById("guide-rows"); body.innerHTML="";
  demoGuide.forEach(row=>{const tr=document.createElement("tr");row.forEach((v,i)=>{const td=document.createElement("td");td.textContent=v;if(i===3){td.className="status"}tr.appendChild(td)});body.appendChild(tr)});
  document.getElementById("guide-date").textContent=new Date().toLocaleDateString("nl-BE",{weekday:"long",day:"numeric",month:"long"});
}
document.addEventListener("keydown", e => {
  if(["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"].includes(e.key) && !document.getElementById("live-view").classList.contains("hidden")){
    e.preventDefault(); focusIndex=(focusIndex+(e.key==="ArrowRight"||e.key==="ArrowDown"?1:-1)+channels.length)%channels.length;
    document.querySelectorAll(".channel")[focusIndex].focus();
  }
  if(e.key==="Enter" && document.activeElement.classList.contains("channel")) document.activeElement.click();
});
function updateClock(){document.getElementById("clock").textContent=new Date().toLocaleTimeString("nl-BE",{hour:"2-digit",minute:"2-digit"})}
updateClock();setInterval(updateClock,30000);renderGuide();
