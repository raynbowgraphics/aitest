const pages = [...document.querySelectorAll('.page')];
const navItems = [...document.querySelectorAll('.nav-item[data-page]')];
const crumb = document.getElementById('crumb');
const toast = document.getElementById('toast');
let toastTimer;
function notify(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove('show'),2600);
}
function showPage(name){
  pages.forEach(p=>p.classList.toggle('active',p.id===`page-${name}`));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.page===name));
  const active = navItems.find(n=>n.dataset.page===name);
  crumb.textContent = active ? active.textContent.trim() : 'Overview';
  document.getElementById('sidebar').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navItems.forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page)));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.go)));
document.getElementById('mobileMenu').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.querySelector('.notice-close').addEventListener('click',e=>e.currentTarget.closest('.notice').remove());
document.getElementById('helpBtn').addEventListener('click',()=>notify('This is a prototype. No live services are connected.'));
document.getElementById('identityDemo').addEventListener('click',()=>notify('Verification flow preview: consent → provider check → result. Real verification is not enabled.'));
document.getElementById('textTool').addEventListener('click',()=>notify('AI text generation will be connected to a vetted AI provider in a future release.'));
document.getElementById('workflowTool').addEventListener('click',()=>notify('Workflow automation is a planned module.'));
document.getElementById('notifyToggle').addEventListener('change',e=>notify(`Demo notifications ${e.target.checked?'enabled':'disabled'}.`));
document.getElementById('fileInput').addEventListener('change',e=>{
  const file=e.target.files[0];
  const out=document.getElementById('fileResult');
  if(!file){out.textContent='No file selected';return;}
  const size=file.size<1024*1024?`${(file.size/1024).toFixed(1)} KB`:`${(file.size/1024/1024).toFixed(2)} MB`;
  out.textContent=`Selected: ${file.name} · ${size}. File remains in your browser; it was not uploaded or processed.`;
});
document.getElementById('assistantForm').addEventListener('submit',e=>{
  e.preventDefault();
  const input=document.getElementById('assistantInput');
  const value=input.value.trim();
  if(!value)return;
  const chat=document.getElementById('assistantChat');
  const user=document.createElement('div'); user.className='user-message'; user.textContent=value; chat.appendChild(user);
  const bot=document.createElement('div'); bot.className='bot-message';
  bot.textContent='Thanks. This demo has no live AI model connected, so it cannot process your request. In production, connect a vetted AI service, apply safety filters, and avoid sending sensitive information without clear consent.';
  chat.appendChild(bot); input.value=''; chat.scrollTop=chat.scrollHeight;
});
document.getElementById('clearActivity').addEventListener('click',()=>{
  document.getElementById('fullActivity').innerHTML='<p class="subheading">Demo entries cleared from this view. This does not delete any real audit records.</p>';
  notify('Demo activity entries cleared.');
});
document.querySelectorAll('#securityActions input').forEach(input=>input.addEventListener('change',()=>{
  const done=[...document.querySelectorAll('#securityActions input')].filter(x=>x.checked).length;
  notify(`${done} of 5 suggested actions marked complete.`);
}));
