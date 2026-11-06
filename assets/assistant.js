(()=>{const routes=[
["business","Business consulting, formation, credit or automation","/business-services.html"],
["insurance","Insurance, benefits, retirement or risk review","/insurance.html"],
["tax","Prestige Tax Group, bookkeeping and accounting","/prestige-tax-group.html"],
["procurement","Procurement, sourcing, printing and team supplies","/legacy-logistics-solutions.html"],
["property","Property, compliance, courier or delivery coordination","/property-logistics.html"],
["events","Weddings, corporate events and concierge","/events.html"],
["transport","Airport, private car or group transportation","/transportation.html"],
["experience","Experiences, sports, concerts, casino and group outings","/experiences.html"],
["signage","Digital signage and Yodeck solutions","/digital-signage.html"],
["resources","Free guides and paid planning tools","/resources.html"],
["estate","Estate administration, executor or family support","/estate-executor-support.html"],
["partner","Sponsorship, advertising or referral partnership","/partners.html"]];
const box=document.createElement("div");box.className="lw-assistant";box.innerHTML='<button class="lw-launch" aria-expanded="false">Ask Legacy Wise</button><section class="lw-panel" aria-label="Legacy Wise guided assistant"><button class="lw-close" aria-label="Close">×</button><strong>How can we help?</strong><p>Choose the closest match. We’ll take you to the right starting point.</p><div class="lw-options"></div><a class="lw-human" href="https://form.jotform.com/262425135788060">Not sure — tell us what you need</a><small>This guided assistant provides navigation and general information, not legal, tax, investment or insurance advice.</small></section>';document.body.appendChild(box);
const panel=box.querySelector(".lw-panel"),launch=box.querySelector(".lw-launch");routes.forEach(r=>{const a=document.createElement("a");a.href=r[2];a.textContent=r[1];box.querySelector(".lw-options").appendChild(a)});
const toggle=()=>{const open=panel.classList.toggle("open");launch.setAttribute("aria-expanded",open);};launch.onclick=toggle;box.querySelector(".lw-close").onclick=toggle;})();
