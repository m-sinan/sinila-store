// One shared loader: shows while a page is loading, while a link to another page is being opened,
// and while any request (fetch) is running. Appears after 150 ms so quick actions don't flicker.
(function(){
  var css='#busy{position:fixed;inset:0;background:rgba(15,20,18,.35);display:none;place-items:center;z-index:9999}'+
          '#busy.on{display:grid}'+
          '#busy .sp{width:44px;height:44px;border:4px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:busyspin .8s linear infinite}'+
          '@keyframes busyspin{to{transform:rotate(360deg)}}';
  var count=0,timer=null,el=null;
  function ensure(){
    if(el)return el;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    el=document.createElement('div');el.id='busy';el.setAttribute('role','status');el.setAttribute('aria-live','polite');
    el.innerHTML='<span class="sp"></span><span style="position:absolute;left:-9999px">Loading</span>';
    document.body.appendChild(el);return el;
  }
  function start(){
    count++;
    if(timer||(el&&el.classList.contains('on')))return;
    timer=setTimeout(function(){timer=null;if(count>0)ensure().classList.add('on')},150);
  }
  function end(){
    count=Math.max(0,count-1);
    if(count===0){clearTimeout(timer);timer=null;if(el)el.classList.remove('on')}
  }
  window.SinilaBusy={start:start,end:end};
  var of=window.fetch;
  if(of){window.fetch=function(){start();return of.apply(this,arguments).then(function(r){end();return r},function(err){end();throw err})}}
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href]');
    if(!a||(a.target&&a.target!=='_self')||a.hasAttribute('download'))return;
    var h=a.getAttribute('href');if(!h||h.charAt(0)==='#')return;
    var u;try{u=new URL(a.href,location.href)}catch(x){return}
    if(u.origin!==location.origin)return;
    if(u.pathname===location.pathname&&u.hash)return;
    if(e.ctrlKey||e.metaKey||e.shiftKey)return;
    start();
  },true);
  start();
  window.addEventListener('load',end);
  window.addEventListener('pageshow',function(e){if(e.persisted){count=0;clearTimeout(timer);timer=null;if(el)el.classList.remove('on')}});
})();
