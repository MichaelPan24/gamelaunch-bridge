/* GameLaunch Bridge — static-first creator discovery.
   Client-only search, saved candidates and brief builder. No sign-in, API, or backend.
   Public channel presence is NOT creator consent, availability, representation or endorsement. */
(() => {
  "use strict";
  const DATA = Array.isArray(window.CREATOR_PROFILES) ? window.CREATOR_PROFILES : typeof CREATOR_PROFILES !== "undefined" ? CREATOR_PROFILES : [];
  const STORAGE_KEY = "glb-creator-shortlist-v1";
  const SAVED_KEY = "glb-creator-saved-v1";
  const MAIL = "1102847670py@gmail.com";
  const byId = id => document.getElementById(id);
  const safe = value => String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
  const shortNumber = count => count == null ? "Not checked" : count >= 1e6 ? (count/1e6).toFixed(2).replace(/0$/,"").replace(/\.$/,"")+"M" : (count/1e3).toFixed(count<1e5?1:0).replace(/\\.0$/,"")+"K";
  const validIDs = new Set(DATA.map(p => p.id));
  function load(key) { try {const v=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(v) ? v.filter(id=>validIDs.has(id)) : [];}catch{return [];} }
  function save(key, ids) {try{localStorage.setItem(key,JSON.stringify(ids));}catch{}}
  const state={selected:load(STORAGE_KEY).slice(0,8), saved:load(SAVED_KEY),onlySaved:false};

  function initials(name) {return name.split(/\s+/).map(w=>w.charAt(0)).slice(0,2).join("").toUpperCase();}
  function categoryClass(i) {return "color"+(i%4);}
  function render() {
    const query=byId("search").value.toLocaleLowerCase().trim();
    const category=byId("category").value,language=byId("language").value,size=byId("size").value,sort=byId("sort").value;
    let list=DATA.filter(p => {
      if(query && ![p.name,p.handle,p.description,p.category,p.fit,p.language].join(" ").toLocaleLowerCase().includes(query))return false;
      if(category && p.category!==category) return false;
      if(language && p.language!==language) return false;
      if(state.onlySaved && !state.saved.includes(p.id))return false;
      if(size==="large" && (p.subs==null || p.subs<1e6))return false;
      if(size==="mid" && (p.subs==null || p.subs>=1e6 || p.subs<1e5))return false;
      if(size==="small" && (p.subs==null || p.subs>=1e5))return false;
      if(size==="unknown" && p.subs!=null)return false;
      return true;
    });
    if(sort==="size")list.sort((a,b)=>(b.subs||-1)-(a.subs||-1));
    if(sort==="az")list.sort((a,b)=>a.name.localeCompare(b.name));
    byId("total-count").textContent=String(DATA.length);
    byId("result-count").textContent=String(list.length);
    byId("saved-count").textContent=String(state.saved.length);
    byId("show-saved").setAttribute("aria-pressed",String(state.onlySaved));
    const grid=byId("results");
    grid.innerHTML=list.map((p,i)=> {
      const selected=state.selected.includes(p.id),saved=state.saved.includes(p.id);
      return `<article class="creator-card ${selected?"selected":""}">
        <div class="creator-cover ${categoryClass(i)}"><div class="avatar" aria-hidden="true">${safe(initials(p.name))}</div><div style="display:flex;gap:6px;align-items:start"><span class="category-chip">${safe(p.category)}</span><button type="button" class="heart" data-action="save" data-id="${safe(p.id)}" aria-label="${saved?"Remove":"Save"} ${safe(p.name)}" aria-pressed="${saved}">${saved?"♥":"♡"}</button></div></div>
        <div class="creator-body"><h3 class="creator-name">${safe(p.name)}</h3><div class="creator-handle">${safe(p.handle)} · ${safe(p.platform)} · ${safe(p.language)}</div><p class="creator-desc">${safe(p.description)}</p>
        <div class="creator-facts"><div><b>${shortNumber(p.subs)}</b><span>${p.subs==null?"Followers not verified":"Subscribers · "+safe(p.subsAsOf)}</span></div><div><b>Not checked</b><span>Avg. recent views</span></div></div>
        <p class="creator-notice">◌ Not onboarded · Rates &amp; availability unknown</p></div>
        <div class="creator-actions"><button type="button" class="add-shortlist" data-action="select" data-id="${safe(p.id)}" aria-pressed="${selected}">${selected?"✓ Shortlisted":"+ Add to shortlist"}</button><button type="button" class="view-details" data-action="details" data-id="${safe(p.id)}">View profile ↗</button></div></article>`;
    }).join("");
    byId("empty").hidden=list.length!==0;
    renderShortlist();
  }
  function renderShortlist(){
    const selected=state.selected.map(id=>DATA.find(p=>p.id===id)).filter(Boolean);
    byId("shortlist-total").textContent=String(selected.length);
    byId("nav-count").textContent=String(selected.length);
    byId("selected-list").innerHTML=selected.length
      ? selected.map((p,i)=>`<div class="selected-row"><div><strong>${i+1}. ${safe(p.name)}</strong><small>${safe(p.category)} · ${safe(p.language)} · ${p.subs==null?"No confirmed audience size":"Dated public count: "+shortNumber(p.subs)}</small></div><button type="button" data-action="remove" data-id="${safe(p.id)}" aria-label="Remove ${safe(p.name)}">Remove</button></div>`).join("")
      : '<p class="no-selection">No creators selected yet. Use <strong>+ Add to shortlist</strong> on a card to get started.</p>';
    byId("email-brief").disabled=selected.length===0;
    byId("download-csv").disabled=selected.length===0;
  }
  function toggleSelected(id){ if(!validIDs.has(id))return;
    if(state.selected.includes(id))state.selected=state.selected.filter(x=>x!==id);
    else {if(state.selected.length>=8){byId("brief-status").textContent="The shortlist is limited to 8 candidates for a focused pilot. Remove one to add another.";byId("shortlist").scrollIntoView({behavior:"smooth"});return;}state.selected.push(id);}
    save(STORAGE_KEY,state.selected);render();
  }
  function toggleSaved(id){if(!validIDs.has(id))return;
    state.saved=state.saved.includes(id)?state.saved.filter(x=>x!==id):[...state.saved,id];save(SAVED_KEY,state.saved);render();
  }
  function openDetails(id){
    const p=DATA.find(x=>x.id===id);if(!p)return;
    const box=byId("dialog-content");
    box.innerHTML=`<span class="modal-kicker">PUBLIC CANDIDATE · RESEARCH PROFILE</span><h2>${safe(p.name)}</h2><p>${safe(p.handle)} · ${safe(p.platform)} · ${safe(p.language)}</p>
      <div class="modal-meta"><span>${safe(p.category)}</span><span>${p.subs==null?"Subscriber count not verified":"About "+shortNumber(p.subs)+" subscribers (snapshot "+safe(p.subsAsOf)+")"}</span><span>Uncontacted candidate</span></div>
      <h3>Content overview</h3><p>${safe(p.description)}</p>
      <h3>Potential product fit — editorial suggestion</h3><p>${safe(p.fit)}. This is not an approved campaign concept or evidence of interest.</p>
      <h3>Data transparency</h3><p class="fact-note">Recent average video views: not verified. Audience countries: not verified. Sponsorship rate: not verified. Availability or willingness to participate: not verified.</p>
      <p class="fact-note">Research references: <a class="source-link" href="${safe(p.evidence)}" target="_blank" rel="noopener noreferrer">Creator directory source ↗</a>${p.subsSource?' · <a class="source-link" href="'+safe(p.subsSource)+'" target="_blank" rel="noopener noreferrer">Dated audience-size reference ↗</a>':""}.</p>
      <div class="modal-cta"><a class="btn primary" href="${safe(p.channel)}" target="_blank" rel="noopener noreferrer">${p.platform==="Creator directory"?"View public directory profile ↗":"Visit public channel ↗"}</a><button class="btn secondary" type="button" id="modal-add">${state.selected.includes(p.id)?"Remove from shortlist":"+ Add to shortlist"}</button></div>
      <p class="modal-safety">This profile is public-channel research only. The creator is not claimed as a platform member, client or available sponsor. Some candidate URLs open external research profiles rather than the original channel.</p>`;
    byId("modal-add").addEventListener("click",()=>{toggleSelected(id);box.querySelector("#modal-add").textContent=state.selected.includes(id)?"Remove from shortlist":"+ Add to shortlist";});
    const dialog=byId("creator-dialog");
    if(typeof dialog.showModal==="function")dialog.showModal();else dialog.setAttribute("open","");
  }
  function resetFilters(){byId("search").value="";byId("category").value="";byId("language").value="";byId("size").value="";byId("sort").value="curated";state.onlySaved=false;render();}
  function exportCsv(){
    const rows=[["Creator","Platform","Channel URL","Focus","Language","Public subscriber snapshot","Snapshot date","Data source","Relationship","Rate","Recent avg views"]];
    state.selected.forEach(id=>{const p=DATA.find(x=>x.id===id);if(!p)return;rows.push([p.name,p.platform,p.channel,p.category,p.language,p.subs??"Not verified",p.subsAsOf??"Not verified",p.evidence,"Uncontacted public candidate","Unknown","Not verified"]);});
    const field=v=>{const value=String(v??"");const guarded=/^[=+@\-\t\r]/.test(value)?"'"+value:value;return '"'+guarded.replace(/"/g,'""')+'"';};
    const csv="\uFEFF"+rows.map(r=>r.map(field).join(",")).join("\r\n");
    const blob=new Blob([csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="gamelaunch-creator-shortlist.csv";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    byId("brief-status").textContent="CSV saved locally. Creator rates, audience geographies and availability remain unverified.";
  }
  function buildEmail(){
    const members=state.selected.map(id=>DATA.find(p=>p.id===id)).filter(Boolean);if(!members.length)return;
    const company=byId("brief-brand").value.trim().slice(0,120);
    const goal=byId("brief-goal").value.trim().slice(0,1000);
    const list=members.map((p,i)=>`${i+1}. ${p.name} — ${p.channel} (${p.category}; public lead, not contracted)`).join("\n");
    const body=`Hello GameLaunch Bridge,\n\nI would like to discuss creator research for a gaming campaign.\n\nCompany: ${company||"Not specified"}\nProduct and audience: ${goal||"Not specified"}\n\nMy selected public-channel candidates:\n${list}\n\nI understand this list is editorial research only. Rates, audience geography, availability and participation require verification, and opening this draft does not submit anything until I send it.\n\nPlease reply with the scope and next steps.\n`;
    byId("brief-status").textContent="Opening an email draft — not sent. Please review and press Send in your email application. If no app opens, use the public contact address.";
    window.location.href=`mailto:${MAIL}?subject=${encodeURIComponent("GameLaunch Bridge — Creator research brief ("+members.length+" candidates)")}&body=${encodeURIComponent(body)}`;
  }
  function init(){
    if(!byId("results"))return;
    ["search","category","language","size","sort"].forEach(id=>byId(id).addEventListener(id==="search"?"input":"change",render));
    byId("show-saved").addEventListener("click",()=>{state.onlySaved=!state.onlySaved;render();});
    byId("reset-filters").addEventListener("click",resetFilters);
    byId("empty-reset").addEventListener("click",resetFilters);
    document.addEventListener("click",event=>{const btn=event.target.closest("button[data-action][data-id]");if(!btn)return;const id=btn.dataset.id,act=btn.dataset.action;if(act==="save")toggleSaved(id);if(act==="select"||act==="remove")toggleSelected(id);if(act==="details")openDetails(id);});
    byId("download-csv").addEventListener("click",exportCsv);
    byId("email-brief").addEventListener("click",buildEmail);
    byId("creator-dialog").addEventListener("click",event=>{if(event.target===byId("creator-dialog"))byId("creator-dialog").close();});
    render();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();