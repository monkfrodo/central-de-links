const D=[
  {n:"Newsletter - Captura",u:"https://news.somosintegros.com.br",p:"Integros",c:"Landing Page",s:"Ativo",pl:"Proprio",no:"Pagina de captura de leads para newsletter"},
  {n:"App - Caixa de Ferramentas",u:"https://app.somosintegros.com.br",p:"Integros",c:"Landing Page",s:"Ativo",pl:"Proprio",no:"Caixa de ferramentas da Integros"},
  {n:"Low-ticket R$47",u:"https://pay.assiny.com.br/80ff50/node/WpqMFP",p:"Low-ticket",c:"Checkout",s:"Ativo",pl:"Assiny",no:"11x de R$5,06"},
  {n:"Fundamentos R$4.000 (a vista)",u:"https://pay.assiny.com.br/30597e/node/BEEZT1",p:"Fundamentos",c:"Checkout",s:"Ativo",pl:"Assiny",no:"12x de R$399,93"},
  {n:"Fundamentos R$4.000 (2x de 2k)",u:"https://pay.assiny.com.br/544c64/node/VeGATE",p:"Fundamentos",c:"Checkout",s:"Ativo",pl:"Assiny",no:"2x de R$2.000,00"},
  {n:"Fundamentos R$4.000 (4x de 1k)",u:"https://pay.assiny.com.br/953704/node/0UjW4x",p:"Fundamentos",c:"Checkout",s:"Ativo",pl:"Assiny",no:"4x de R$1.000,00"},
  {n:"Fundamentos R$3.500",u:"https://pay.assiny.com.br/b965f8/node/faE2ah",p:"Fundamentos",c:"Checkout",s:"Ativo",pl:"Assiny",no:"12x de R$349,94"},
  {n:"Fundamentos R$2.000 (entrada)",u:"https://pay.assiny.com.br/_l2cT3/node/TMujGp",p:"Fundamentos",c:"Checkout",s:"Ativo",pl:"Assiny",no:"12x de R$199,97"},
  {n:"A Bussola R$497",u:"https://pay.assiny.com.br/686ce1/node/LiXCJM",p:"A Bussola",c:"Checkout",s:"Ativo",pl:"Assiny",no:"12x de R$49,69"},
  {n:"Integros R$25.004,25",u:"https://pay.assiny.com.br/180d82/node/HiiFt1",p:"Integros",c:"Checkout",s:"Ativo",pl:"Assiny",no:"12x de R$2.500,00"}
];

let lnks=[...D],flt="Todos",qry="",eIdx=-1;

function ld(){const x=localStorage.getItem("lnks5");if(x)try{lnks=JSON.parse(x)}catch(e){}}
function sv(){localStorage.setItem("lnks5",JSON.stringify(lnks))}
ld();

// Theme meta
(function(){
  const m=window.matchMedia('(prefers-color-scheme:light)');
  const u=()=>document.getElementById('tc').content=m.matches?'#f2f2f7':'#000';
  u();m.addEventListener('change',u);
})();

function dc(s){return s==="Ativo"?"on":s==="Em Teste"?"test":"off"}

function filt(){
  return lnks.filter(l=>{
    if(flt!=="Todos"&&l.c!==flt)return false;
    if(qry){const q=qry.toLowerCase();
      return l.n.toLowerCase().includes(q)||l.u.toLowerCase().includes(q)||
        l.p.toLowerCase().includes(q)||(l.no||'').toLowerCase().includes(q)||
        l.c.toLowerCase().includes(q)||l.pl.toLowerCase().includes(q);}
    return true;
  });
}

function rPills(){
  const cs=["Todos",...new Set(lnks.map(l=>l.c))].sort((a,b)=>a==="Todos"?-1:a.localeCompare(b));
  document.getElementById("pills").innerHTML=cs.map(c=>`<button class="pill ${c===flt?'on':''}" onclick="setF('${c}')">${c}</button>`).join("");
}

function render(){
  rPills();
  const items=filt(),el=document.getElementById("list");
  if(!items.length){el.innerHTML='<div class="empty">Nenhum link encontrado</div>';return;}
  const g={};
  items.forEach(l=>{const k=l.p||"Outros";if(!g[k])g[k]=[];g[k].push(l);});
  let h="";
  Object.keys(g).sort().forEach(k=>{
    h+=`<div class="sec"><div class="sec-t">${k}</div><div class="cg">`;
    g[k].forEach(l=>{
      const i=lnks.indexOf(l);
      h+=`<div class="row" onclick="openPm(event,${i})">
        <div class="row-dot ${dc(l.s)}"></div>
        <div class="row-body">
          <div class="row-name">${l.n}</div>
          <div class="row-sub">${l.c} · ${l.pl}</div>
        </div>
        <button class="row-cp" id="cp${i}" onclick="event.stopPropagation();cp(${i})">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        </button>
      </div>`;
    });
    h+=`</div></div>`;
  });
  el.innerHTML=h;
}

function cp(i){
  const u=lnks[i].u;
  navigator.clipboard.writeText(u).then(()=>{
    const b=document.getElementById(`cp${i}`);if(!b)return;
    b.classList.add("ok");
    b.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>';
    msg("Link copiado");
    setTimeout(()=>{if(!document.getElementById(`cp${i}`))return;b.classList.remove("ok");
      b.innerHTML='<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>';
    },1200);
  }).catch(()=>msg("Link copiado"));
}

function setF(c){flt=c;render();}
function clrS(){document.getElementById("s").value="";qry="";document.getElementById("sx").classList.remove("on");render();}
function msg(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),1800);}

// Popup menu
function openPm(e,i){
  e.stopPropagation();
  const pm=document.getElementById("pm"),l=lnks[i];
  pm.innerHTML=`
    <button class="pm-i" onclick="cp(${i});clPm()"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>Copiar link</button>
    <button class="pm-i" onclick="window.open('${l.u}','_blank');clPm()"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-4.5-6h6m0 0v6m0-6L9.75 14.25"/></svg>Abrir no navegador</button>
    <div class="pm-sep"></div>
    <button class="pm-i" onclick="edLnk(${i});clPm()"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z"/></svg>Editar</button>
    <button class="pm-i red" onclick="rmLnk(${i});clPm()"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79"/></svg>Remover</button>`;
  // Position near tap
  const r=e.currentTarget.getBoundingClientRect();
  const y=Math.min(r.top+r.height/2, window.innerHeight-220);
  const x=Math.min(r.right-10, window.innerWidth-200);
  pm.style.cssText=`display:block;top:${y}px;left:${Math.max(10,x-180)}px`;
  document.getElementById("pmOv").classList.add("on");
}
function clPm(){document.getElementById("pm").style.display='none';document.getElementById("pmOv").classList.remove("on");}

// Sheet
function addNew(){
  eIdx=-1;
  document.getElementById("shT").textContent="Novo link";
  ["fN","fU","fP","fNo"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("fC").value="Checkout";
  document.getElementById("fS").value="Ativo";
  document.getElementById("fPl").value="Hotmart";
  opSh();
}
function edLnk(i){
  eIdx=i;const l=lnks[i];
  document.getElementById("shT").textContent="Editar link";
  document.getElementById("fN").value=l.n;
  document.getElementById("fU").value=l.u;
  document.getElementById("fP").value=l.p;
  document.getElementById("fC").value=l.c;
  document.getElementById("fS").value=l.s;
  document.getElementById("fPl").value=l.pl;
  document.getElementById("fNo").value=l.no||"";
  opSh();
}
function opSh(){document.getElementById("ov").classList.add("on");requestAnimationFrame(()=>document.getElementById("sh").classList.add("on"));}
function clSh(){document.getElementById("sh").classList.remove("on");setTimeout(()=>document.getElementById("ov").classList.remove("on"),320);}
function svLnk(){
  const n=document.getElementById("fN").value.trim(),u=document.getElementById("fU").value.trim(),p=document.getElementById("fP").value.trim();
  if(!n||!u){msg("Preencha nome e URL");return;}
  const d={n,u,p,c:document.getElementById("fC").value,s:document.getElementById("fS").value,pl:document.getElementById("fPl").value,no:document.getElementById("fNo").value.trim()};
  if(eIdx>=0){lnks[eIdx]=d;msg("Atualizado");}else{lnks.push(d);msg("Adicionado");}
  sv();clSh();render();
}
function rmLnk(i){if(confirm('Remover "'+lnks[i].n+'"?')){lnks.splice(i,1);sv();render();msg("Removido");}}

function xport(){
  // Export with readable keys
  const out=lnks.map(l=>({name:l.n,url:l.u,product:l.p,category:l.c,status:l.s,platform:l.pl,notes:l.no}));
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,2)],{type:'application/json'}));
  a.download=`links-${new Date().toISOString().slice(0,10)}.json`;
  a.click();msg("Backup salvo");
}
function imp(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=function(ev){try{const d=JSON.parse(ev.target.result);
    if(Array.isArray(d)){
      // Support both short and long key formats
      lnks=d.map(l=>l.n?l:{n:l.name||'',u:l.url||'',p:l.product||'',c:l.category||'Outro',s:l.status||'Ativo',pl:l.platform||'Outro',no:l.notes||''});
      sv();render();msg(d.length+" links importados");
    }}catch(e){msg("Erro");}};
  r.readAsText(f);e.target.value="";
}

document.getElementById("s").addEventListener("input",e=>{qry=e.target.value;document.getElementById("sx").classList.toggle("on",!!qry);render();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){clSh();clPm();}});

render();

if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js');}
