var ue=Object.defineProperty;var At=e=>{throw TypeError(e)};var he=(e,t,s)=>t in e?ue(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var Q=(e,t,s)=>he(e,typeof t!="symbol"?t+"":t,s),Pt=(e,t,s)=>t.has(e)||At("Cannot "+s);var i=(e,t,s)=>(Pt(e,t,"read from private field"),s?s.call(e):t.get(e)),f=(e,t,s)=>t.has(e)?At("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s,r)=>(Pt(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),R=(e,t,s)=>(Pt(e,t,"access private method"),s);var yt=(e,t,s,r)=>({set _(n){h(e,t,n,s)},get _(){return i(e,t,r)}});import{r as Ot}from"./index-f9CH5uyH.js";import{j as ce}from"./jsx-runtime-DCY474Ph.js";var vt=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},Rt=typeof window>"u"||"Deno"in globalThis;function A(){}function le(e,t){return typeof e=="function"?e(t):e}function fe(e){return typeof e=="number"&&e>=0&&e!==1/0}function de(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Mt(e,t){return typeof e=="function"?e(t):e}function ye(e,t){return typeof e=="function"?e(t):e}function kt(e,t){const{type:s="all",exact:r,fetchStatus:n,predicate:a,queryKey:u,stale:o}=e;if(u){if(r){if(t.queryHash!==Tt(u,t.options))return!1}else if(!ct(t.queryKey,u))return!1}if(s!=="all"){const c=t.isActive();if(s==="active"&&!c||s==="inactive"&&c)return!1}return!(typeof o=="boolean"&&t.isStale()!==o||n&&n!==t.state.fetchStatus||a&&!a(t))}function xt(e,t){const{exact:s,status:r,predicate:n,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(s){if(ht(t.options.mutationKey)!==ht(a))return!1}else if(!ct(t.options.mutationKey,a))return!1}return!(r&&t.state.status!==r||n&&!n(t))}function Tt(e,t){return((t==null?void 0:t.queryKeyHashFn)||ht)(e)}function ht(e){return JSON.stringify(e,(t,s)=>St(s)?Object.keys(s).sort().reduce((r,n)=>(r[n]=s[n],r),{}):s)}function ct(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(s=>!ct(e[s],t[s])):!1}function Vt(e,t){if(e===t)return e;const s=Dt(e)&&Dt(t);if(s||St(e)&&St(t)){const r=s?e:Object.keys(e),n=r.length,a=s?t:Object.keys(t),u=a.length,o=s?[]:{};let c=0;for(let d=0;d<u;d++){const p=s?d:a[d];(!s&&r.includes(p)||s)&&e[p]===void 0&&t[p]===void 0?(o[p]=void 0,c++):(o[p]=Vt(e[p],t[p]),o[p]===e[p]&&e[p]!==void 0&&c++)}return n===u&&c===n?e:o}return t}function We(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}function Dt(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function St(e){if(!Qt(e))return!1;const t=e.constructor;if(t===void 0)return!0;const s=t.prototype;return!(!Qt(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function Qt(e){return Object.prototype.toString.call(e)==="[object Object]"}function pe(e){return new Promise(t=>{setTimeout(t,e)})}function me(e,t,s){return typeof s.structuralSharing=="function"?s.structuralSharing(e,t):s.structuralSharing!==!1?Vt(e,t):t}function be(e,t,s=0){const r=[...e,t];return s&&r.length>s?r.slice(1):r}function ge(e,t,s=0){const r=[t,...e];return s&&r.length>s?r.slice(0,-1):r}var Et=Symbol();function Wt(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Et?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}var V,N,Z,Ht,we=(Ht=class extends vt{constructor(){super();f(this,V);f(this,N);f(this,Z);h(this,Z,t=>{if(!Rt&&window.addEventListener){const s=()=>t();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){i(this,N)||this.setEventListener(i(this,Z))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,N))==null||t.call(this),h(this,N,void 0))}setEventListener(t){var s;h(this,Z,t),(s=i(this,N))==null||s.call(this),h(this,N,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){i(this,V)!==t&&(h(this,V,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(s=>{s(t)})}isFocused(){var t;return typeof i(this,V)=="boolean"?i(this,V):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},V=new WeakMap,N=new WeakMap,Z=new WeakMap,Ht),Xt=new we,tt,G,et,Kt,ve=(Kt=class extends vt{constructor(){super();f(this,tt,!0);f(this,G);f(this,et);h(this,et,t=>{if(!Rt&&window.addEventListener){const s=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",r)}}})}onSubscribe(){i(this,G)||this.setEventListener(i(this,et))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,G))==null||t.call(this),h(this,G,void 0))}setEventListener(t){var s;h(this,et,t),(s=i(this,G))==null||s.call(this),h(this,G,t(this.setOnline.bind(this)))}setOnline(t){i(this,tt)!==t&&(h(this,tt,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return i(this,tt)}},tt=new WeakMap,G=new WeakMap,et=new WeakMap,Kt),gt=new ve;function Re(){let e,t;const s=new Promise((n,a)=>{e=n,t=a});s.status="pending",s.catch(()=>{});function r(n){Object.assign(s,n),delete s.resolve,delete s.reject}return s.resolve=n=>{r({status:"fulfilled",value:n}),e(n)},s.reject=n=>{r({status:"rejected",reason:n}),t(n)},s}function Pe(e){return Math.min(1e3*2**e,3e4)}function Yt(e){return(e??"online")==="online"?gt.isOnline():!0}var Zt=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function _t(e){return e instanceof Zt}function te(e){let t=!1,s=0,r=!1,n;const a=Re(),u=l=>{var b;r||(m(new Zt(l)),(b=e.abort)==null||b.call(e))},o=()=>{t=!0},c=()=>{t=!1},d=()=>Xt.isFocused()&&(e.networkMode==="always"||gt.isOnline())&&e.canRun(),p=()=>Yt(e.networkMode)&&e.canRun(),y=l=>{var b;r||(r=!0,(b=e.onSuccess)==null||b.call(e,l),n==null||n(),a.resolve(l))},m=l=>{var b;r||(r=!0,(b=e.onError)==null||b.call(e,l),n==null||n(),a.reject(l))},q=()=>new Promise(l=>{var b;n=O=>{(r||d())&&l(O)},(b=e.onPause)==null||b.call(e)}).then(()=>{var l;n=void 0,r||(l=e.onContinue)==null||l.call(e)}),_=()=>{if(r)return;let l;const b=s===0?e.initialPromise:void 0;try{l=b??e.fn()}catch(O){l=Promise.reject(O)}Promise.resolve(l).then(y).catch(O=>{var D;if(r)return;const F=e.retry??(Rt?0:3),w=e.retryDelay??Pe,T=typeof w=="function"?w(s,O):w,x=F===!0||typeof F=="number"&&s<F||typeof F=="function"&&F(s,O);if(t||!x){m(O);return}s++,(D=e.onFail)==null||D.call(e,s,O),pe(T).then(()=>d()?void 0:q()).then(()=>{t?m(O):_()})})};return{promise:a,cancel:u,continue:()=>(n==null||n(),a),cancelRetry:o,continueRetry:c,canStart:p,start:()=>(p()?_():q().then(_),a)}}function _e(){let e=[],t=0,s=o=>{o()},r=o=>{o()},n=o=>setTimeout(o,0);const a=o=>{t?e.push(o):n(()=>{s(o)})},u=()=>{const o=e;e=[],o.length&&n(()=>{r(()=>{o.forEach(c=>{s(c)})})})};return{batch:o=>{let c;t++;try{c=o()}finally{t--,t||u()}return c},batchCalls:o=>(...c)=>{a(()=>{o(...c)})},schedule:a,setNotifyFunction:o=>{s=o},setBatchNotifyFunction:o=>{r=o},setScheduler:o=>{n=o}}}var S=_e(),W,Nt,ee=(Nt=class{constructor(){f(this,W)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),fe(this.gcTime)&&h(this,W,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(Rt?1/0:5*60*1e3))}clearGcTimeout(){i(this,W)&&(clearTimeout(i(this,W)),h(this,W,void 0))}},W=new WeakMap,Nt),st,rt,E,P,lt,X,M,L,Gt,Ce=(Gt=class extends ee{constructor(t){super();f(this,M);f(this,st);f(this,rt);f(this,E);f(this,P);f(this,lt);f(this,X);h(this,X,!1),h(this,lt,t.defaultOptions),this.setOptions(t.options),this.observers=[],h(this,E,t.cache),this.queryKey=t.queryKey,this.queryHash=t.queryHash,h(this,st,qe(this.options)),this.state=t.state??i(this,st),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=i(this,P))==null?void 0:t.promise}setOptions(t){this.options={...i(this,lt),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&i(this,E).remove(this)}setData(t,s){const r=me(this.state.data,t,this.options);return R(this,M,L).call(this,{data:r,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),r}setState(t,s){R(this,M,L).call(this,{type:"setState",state:t,setStateOptions:s})}cancel(t){var r,n;const s=(r=i(this,P))==null?void 0:r.promise;return(n=i(this,P))==null||n.cancel(t),s?s.then(A).catch(A):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(i(this,st))}isActive(){return this.observers.some(t=>ye(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Et||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!de(this.state.dataUpdatedAt,t)}onFocus(){var s;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,P))==null||s.continue()}onOnline(){var s;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,P))==null||s.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),i(this,E).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(s=>s!==t),this.observers.length||(i(this,P)&&(i(this,X)?i(this,P).cancel({revert:!0}):i(this,P).cancelRetry()),this.scheduleGc()),i(this,E).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||R(this,M,L).call(this,{type:"invalidate"})}fetch(t,s){var c,d,p;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(i(this,P))return i(this,P).continueRetry(),i(this,P).promise}if(t&&this.setOptions(t),!this.options.queryFn){const y=this.observers.find(m=>m.options.queryFn);y&&this.setOptions(y.options)}const r=new AbortController,n=y=>{Object.defineProperty(y,"signal",{enumerable:!0,get:()=>(h(this,X,!0),r.signal)})},a=()=>{const y=Wt(this.options,s),m={queryKey:this.queryKey,meta:this.meta};return n(m),h(this,X,!1),this.options.persister?this.options.persister(y,m,this):y(m)},u={fetchOptions:s,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:a};n(u),(c=this.options.behavior)==null||c.onFetch(u,this),h(this,rt,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((d=u.fetchOptions)==null?void 0:d.meta))&&R(this,M,L).call(this,{type:"fetch",meta:(p=u.fetchOptions)==null?void 0:p.meta});const o=y=>{var m,q,_,l;_t(y)&&y.silent||R(this,M,L).call(this,{type:"error",error:y}),_t(y)||((q=(m=i(this,E).config).onError)==null||q.call(m,y,this),(l=(_=i(this,E).config).onSettled)==null||l.call(_,this.state.data,y,this)),this.scheduleGc()};return h(this,P,te({initialPromise:s==null?void 0:s.initialPromise,fn:u.fetchFn,abort:r.abort.bind(r),onSuccess:y=>{var m,q,_,l;if(y===void 0){o(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(y)}catch(b){o(b);return}(q=(m=i(this,E).config).onSuccess)==null||q.call(m,y,this),(l=(_=i(this,E).config).onSettled)==null||l.call(_,y,this.state.error,this),this.scheduleGc()},onError:o,onFail:(y,m)=>{R(this,M,L).call(this,{type:"failed",failureCount:y,error:m})},onPause:()=>{R(this,M,L).call(this,{type:"pause"})},onContinue:()=>{R(this,M,L).call(this,{type:"continue"})},retry:u.options.retry,retryDelay:u.options.retryDelay,networkMode:u.options.networkMode,canRun:()=>!0})),i(this,P).start()}},st=new WeakMap,rt=new WeakMap,E=new WeakMap,P=new WeakMap,lt=new WeakMap,X=new WeakMap,M=new WeakSet,L=function(t){const s=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...Se(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const n=t.error;return _t(n)&&n.revert&&i(this,rt)?{...i(this,rt),fetchStatus:"idle"}:{...r,error:n,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=s(this.state),S.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),i(this,E).notify({query:this,type:"updated",action:t})})},Gt);function Se(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:Yt(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function qe(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,s=t!==void 0,r=s?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:s?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var j,Bt,Oe=(Bt=class extends vt{constructor(t={}){super();f(this,j);this.config=t,h(this,j,new Map)}build(t,s,r){const n=s.queryKey,a=s.queryHash??Tt(n,s);let u=this.get(a);return u||(u=new Ce({cache:this,queryKey:n,queryHash:a,options:t.defaultQueryOptions(s),state:r,defaultOptions:t.getQueryDefaults(n)}),this.add(u)),u}add(t){i(this,j).has(t.queryHash)||(i(this,j).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const s=i(this,j).get(t.queryHash);s&&(t.destroy(),s===t&&i(this,j).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){S.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return i(this,j).get(t)}getAll(){return[...i(this,j).values()]}find(t){const s={exact:!0,...t};return this.getAll().find(r=>kt(s,r))}findAll(t={}){const s=this.getAll();return Object.keys(t).length>0?s.filter(r=>kt(t,r)):s}notify(t){S.batch(()=>{this.listeners.forEach(s=>{s(t)})})}onFocus(){S.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){S.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},j=new WeakMap,Bt),U,C,Y,I,K,$t,Te=($t=class extends ee{constructor(t){super();f(this,I);f(this,U);f(this,C);f(this,Y);this.mutationId=t.mutationId,h(this,C,t.mutationCache),h(this,U,[]),this.state=t.state||Ee(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){i(this,U).includes(t)||(i(this,U).push(t),this.clearGcTimeout(),i(this,C).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){h(this,U,i(this,U).filter(s=>s!==t)),this.scheduleGc(),i(this,C).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){i(this,U).length||(this.state.status==="pending"?this.scheduleGc():i(this,C).remove(this))}continue(){var t;return((t=i(this,Y))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,a,u,o,c,d,p,y,m,q,_,l,b,O,F,w,T,x,D,dt;h(this,Y,te({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(v,z)=>{R(this,I,K).call(this,{type:"failed",failureCount:v,error:z})},onPause:()=>{R(this,I,K).call(this,{type:"pause"})},onContinue:()=>{R(this,I,K).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>i(this,C).canRun(this)}));const s=this.state.status==="pending",r=!i(this,Y).canStart();try{if(!s){R(this,I,K).call(this,{type:"pending",variables:t,isPaused:r}),await((a=(n=i(this,C).config).onMutate)==null?void 0:a.call(n,t,this));const z=await((o=(u=this.options).onMutate)==null?void 0:o.call(u,t));z!==this.state.context&&R(this,I,K).call(this,{type:"pending",context:z,variables:t,isPaused:r})}const v=await i(this,Y).start();return await((d=(c=i(this,C).config).onSuccess)==null?void 0:d.call(c,v,t,this.state.context,this)),await((y=(p=this.options).onSuccess)==null?void 0:y.call(p,v,t,this.state.context)),await((q=(m=i(this,C).config).onSettled)==null?void 0:q.call(m,v,null,this.state.variables,this.state.context,this)),await((l=(_=this.options).onSettled)==null?void 0:l.call(_,v,null,t,this.state.context)),R(this,I,K).call(this,{type:"success",data:v}),v}catch(v){try{throw await((O=(b=i(this,C).config).onError)==null?void 0:O.call(b,v,t,this.state.context,this)),await((w=(F=this.options).onError)==null?void 0:w.call(F,v,t,this.state.context)),await((x=(T=i(this,C).config).onSettled)==null?void 0:x.call(T,void 0,v,this.state.variables,this.state.context,this)),await((dt=(D=this.options).onSettled)==null?void 0:dt.call(D,void 0,v,t,this.state.context)),v}finally{R(this,I,K).call(this,{type:"error",error:v})}}finally{i(this,C).runNext(this)}}},U=new WeakMap,C=new WeakMap,Y=new WeakMap,I=new WeakSet,K=function(t){const s=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=s(this.state),S.batch(()=>{i(this,U).forEach(r=>{r.onMutationUpdate(t)}),i(this,C).notify({mutation:this,type:"updated",action:t})})},$t);function Ee(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var H,k,ft,Jt,Fe=(Jt=class extends vt{constructor(t={}){super();f(this,H);f(this,k);f(this,ft);this.config=t,h(this,H,new Set),h(this,k,new Map),h(this,ft,0)}build(t,s,r){const n=new Te({mutationCache:this,mutationId:++yt(this,ft)._,options:t.defaultMutationOptions(s),state:r});return this.add(n),n}add(t){i(this,H).add(t);const s=pt(t);if(typeof s=="string"){const r=i(this,k).get(s);r?r.push(t):i(this,k).set(s,[t])}this.notify({type:"added",mutation:t})}remove(t){if(i(this,H).delete(t)){const s=pt(t);if(typeof s=="string"){const r=i(this,k).get(s);if(r)if(r.length>1){const n=r.indexOf(t);n!==-1&&r.splice(n,1)}else r[0]===t&&i(this,k).delete(s)}}this.notify({type:"removed",mutation:t})}canRun(t){const s=pt(t);if(typeof s=="string"){const r=i(this,k).get(s),n=r==null?void 0:r.find(a=>a.state.status==="pending");return!n||n===t}else return!0}runNext(t){var r;const s=pt(t);if(typeof s=="string"){const n=(r=i(this,k).get(s))==null?void 0:r.find(a=>a!==t&&a.state.isPaused);return(n==null?void 0:n.continue())??Promise.resolve()}else return Promise.resolve()}clear(){S.batch(()=>{i(this,H).forEach(t=>{this.notify({type:"removed",mutation:t})}),i(this,H).clear(),i(this,k).clear()})}getAll(){return Array.from(i(this,H))}find(t){const s={exact:!0,...t};return this.getAll().find(r=>xt(s,r))}findAll(t={}){return this.getAll().filter(s=>xt(t,s))}notify(t){S.batch(()=>{this.listeners.forEach(s=>{s(t)})})}resumePausedMutations(){const t=this.getAll().filter(s=>s.state.isPaused);return S.batch(()=>Promise.all(t.map(s=>s.continue().catch(A))))}},H=new WeakMap,k=new WeakMap,ft=new WeakMap,Jt);function pt(e){var t;return(t=e.options.scope)==null?void 0:t.id}function jt(e){return{onFetch:(t,s)=>{var p,y,m,q,_;const r=t.options,n=(m=(y=(p=t.fetchOptions)==null?void 0:p.meta)==null?void 0:y.fetchMore)==null?void 0:m.direction,a=((q=t.state.data)==null?void 0:q.pages)||[],u=((_=t.state.data)==null?void 0:_.pageParams)||[];let o={pages:[],pageParams:[]},c=0;const d=async()=>{let l=!1;const b=w=>{Object.defineProperty(w,"signal",{enumerable:!0,get:()=>(t.signal.aborted?l=!0:t.signal.addEventListener("abort",()=>{l=!0}),t.signal)})},O=Wt(t.options,t.fetchOptions),F=async(w,T,x)=>{if(l)return Promise.reject();if(T==null&&w.pages.length)return Promise.resolve(w);const D={queryKey:t.queryKey,pageParam:T,direction:x?"backward":"forward",meta:t.options.meta};b(D);const dt=await O(D),{maxPages:v}=t.options,z=x?ge:be;return{pages:z(w.pages,dt,v),pageParams:z(w.pageParams,T,v)}};if(n&&a.length){const w=n==="backward",T=w?Ae:Ut,x={pages:a,pageParams:u},D=T(r,x);o=await F(x,D,w)}else{const w=e??a.length;do{const T=c===0?u[0]??r.initialPageParam:Ut(r,o);if(c>0&&T==null)break;o=await F(o,T),c++}while(c<w)}return o};t.options.persister?t.fetchFn=()=>{var l,b;return(b=(l=t.options).persister)==null?void 0:b.call(l,d,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},s)}:t.fetchFn=d}}}function Ut(e,{pages:t,pageParams:s}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,s[r],s):void 0}function Ae(e,{pages:t,pageParams:s}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,s[0],s):void 0}var g,B,$,nt,it,J,at,ot,zt,Xe=(zt=class{constructor(e={}){f(this,g);f(this,B);f(this,$);f(this,nt);f(this,it);f(this,J);f(this,at);f(this,ot);h(this,g,e.queryCache||new Oe),h(this,B,e.mutationCache||new Fe),h(this,$,e.defaultOptions||{}),h(this,nt,new Map),h(this,it,new Map),h(this,J,0)}mount(){yt(this,J)._++,i(this,J)===1&&(h(this,at,Xt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,g).onFocus())})),h(this,ot,gt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,g).onOnline())})))}unmount(){var e,t;yt(this,J)._--,i(this,J)===0&&((e=i(this,at))==null||e.call(this),h(this,at,void 0),(t=i(this,ot))==null||t.call(this),h(this,ot,void 0))}isFetching(e){return i(this,g).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return i(this,B).findAll({...e,status:"pending"}).length}getQueryData(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,g).get(t.queryHash))==null?void 0:s.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),s=i(this,g).build(this,t),r=s.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&s.isStaleByTime(Mt(t.staleTime,s))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return i(this,g).findAll(e).map(({queryKey:t,state:s})=>{const r=s.data;return[t,r]})}setQueryData(e,t,s){const r=this.defaultQueryOptions({queryKey:e}),n=i(this,g).get(r.queryHash),a=n==null?void 0:n.state.data,u=le(t,a);if(u!==void 0)return i(this,g).build(this,r).setData(u,{...s,manual:!0})}setQueriesData(e,t,s){return S.batch(()=>i(this,g).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,s)]))}getQueryState(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,g).get(t.queryHash))==null?void 0:s.state}removeQueries(e){const t=i(this,g);S.batch(()=>{t.findAll(e).forEach(s=>{t.remove(s)})})}resetQueries(e,t){const s=i(this,g),r={type:"active",...e};return S.batch(()=>(s.findAll(e).forEach(n=>{n.reset()}),this.refetchQueries(r,t)))}cancelQueries(e,t={}){const s={revert:!0,...t},r=S.batch(()=>i(this,g).findAll(e).map(n=>n.cancel(s)));return Promise.all(r).then(A).catch(A)}invalidateQueries(e,t={}){return S.batch(()=>{if(i(this,g).findAll(e).forEach(r=>{r.invalidate()}),(e==null?void 0:e.refetchType)==="none")return Promise.resolve();const s={...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"};return this.refetchQueries(s,t)})}refetchQueries(e,t={}){const s={...t,cancelRefetch:t.cancelRefetch??!0},r=S.batch(()=>i(this,g).findAll(e).filter(n=>!n.isDisabled()).map(n=>{let a=n.fetch(void 0,s);return s.throwOnError||(a=a.catch(A)),n.state.fetchStatus==="paused"?Promise.resolve():a}));return Promise.all(r).then(A)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const s=i(this,g).build(this,t);return s.isStaleByTime(Mt(t.staleTime,s))?s.fetch(t):Promise.resolve(s.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(A).catch(A)}fetchInfiniteQuery(e){return e.behavior=jt(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(A).catch(A)}ensureInfiniteQueryData(e){return e.behavior=jt(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return gt.isOnline()?i(this,B).resumePausedMutations():Promise.resolve()}getQueryCache(){return i(this,g)}getMutationCache(){return i(this,B)}getDefaultOptions(){return i(this,$)}setDefaultOptions(e){h(this,$,e)}setQueryDefaults(e,t){i(this,nt).set(ht(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...i(this,nt).values()],s={};return t.forEach(r=>{ct(e,r.queryKey)&&Object.assign(s,r.defaultOptions)}),s}setMutationDefaults(e,t){i(this,it).set(ht(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...i(this,it).values()];let s={};return t.forEach(r=>{ct(e,r.mutationKey)&&(s={...s,...r.defaultOptions})}),s}defaultQueryOptions(e){if(e._defaulted)return e;const t={...i(this,$).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=Tt(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Et&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...i(this,$).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){i(this,g).clear(),i(this,B).clear()}},g=new WeakMap,B=new WeakMap,$=new WeakMap,nt=new WeakMap,it=new WeakMap,J=new WeakMap,at=new WeakMap,ot=new WeakMap,zt),se=Ot.createContext(void 0),Ye=e=>{const t=Ot.useContext(se);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},Ze=({client:e,children:t})=>(Ot.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),ce.jsx(se.Provider,{value:e,children:t}));class It extends Error{constructor(s,r,n){const a=s.status||s.status===0?s.status:"",u=s.statusText||"",o=`${a} ${u}`.trim(),c=o?`status code ${o}`:"an unknown error";super(`Request failed with ${c}: ${r.method} ${r.url}`);Q(this,"response");Q(this,"request");Q(this,"options");this.name="HTTPError",this.response=s,this.request=r,this.options=n}}class re extends Error{constructor(s){super(`Request timed out: ${s.method} ${s.url}`);Q(this,"request");this.name="TimeoutError",this.request=s}}const ut=e=>e!==null&&typeof e=="object",mt=(...e)=>{for(const t of e)if((!ut(t)||Array.isArray(t))&&t!==void 0)throw new TypeError("The `options` argument must be an object");return Ft({},...e)},ne=(e={},t={})=>{const s=new globalThis.Headers(e),r=t instanceof globalThis.Headers,n=new globalThis.Headers(t);for(const[a,u]of n.entries())r&&u==="undefined"||u===void 0?s.delete(a):s.set(a,u);return s};function bt(e,t,s){return Object.hasOwn(t,s)&&t[s]===void 0?[]:Ft(e[s]??[],t[s]??[])}const ie=(e={},t={})=>({beforeRequest:bt(e,t,"beforeRequest"),beforeRetry:bt(e,t,"beforeRetry"),afterResponse:bt(e,t,"afterResponse"),beforeError:bt(e,t,"beforeError")}),Ft=(...e)=>{let t={},s={},r={};for(const n of e)if(Array.isArray(n))Array.isArray(t)||(t=[]),t=[...t,...n];else if(ut(n)){for(let[a,u]of Object.entries(n))ut(u)&&a in t&&(u=Ft(t[a],u)),t={...t,[a]:u};ut(n.hooks)&&(r=ie(r,n.hooks),t.hooks=r),ut(n.headers)&&(s=ne(s,n.headers),t.headers=s)}return t},Me=(()=>{let e=!1,t=!1;const s=typeof globalThis.ReadableStream=="function",r=typeof globalThis.Request=="function";if(s&&r)try{t=new globalThis.Request("https://empty.invalid",{body:new globalThis.ReadableStream,method:"POST",get duplex(){return e=!0,"half"}}).headers.has("Content-Type")}catch(n){if(n instanceof Error&&n.message==="unsupported BodyInit type")return!1;throw n}return e&&!t})(),ke=typeof globalThis.AbortController=="function",xe=typeof globalThis.ReadableStream=="function",De=typeof globalThis.FormData=="function",ae=["get","post","put","patch","head","delete"],Qe={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},Ct=2147483647,oe=Symbol("stop"),je={json:!0,parseJson:!0,stringifyJson:!0,searchParams:!0,prefixUrl:!0,retry:!0,timeout:!0,hooks:!0,throwHttpErrors:!0,onDownloadProgress:!0,fetch:!0},Ue={method:!0,headers:!0,body:!0,mode:!0,credentials:!0,cache:!0,redirect:!0,referrer:!0,referrerPolicy:!0,integrity:!0,keepalive:!0,signal:!0,window:!0,dispatcher:!0,duplex:!0,priority:!0},Ie=e=>ae.includes(e)?e.toUpperCase():e,Le=["get","put","head","delete","options","trace"],He=[408,413,429,500,502,503,504],Ke=[413,429,503],Lt={limit:2,methods:Le,statusCodes:He,afterStatusCodes:Ke,maxRetryAfter:Number.POSITIVE_INFINITY,backoffLimit:Number.POSITIVE_INFINITY,delay:e=>.3*2**(e-1)*1e3},Ne=(e={})=>{if(typeof e=="number")return{...Lt,limit:e};if(e.methods&&!Array.isArray(e.methods))throw new Error("retry.methods must be an array");if(e.statusCodes&&!Array.isArray(e.statusCodes))throw new Error("retry.statusCodes must be an array");return{...Lt,...e}};async function Ge(e,t,s,r){return new Promise((n,a)=>{const u=setTimeout(()=>{s&&s.abort(),a(new re(e))},r.timeout);r.fetch(e,t).then(n).catch(a).then(()=>{clearTimeout(u)})})}async function Be(e,{signal:t}){return new Promise((s,r)=>{t&&(t.throwIfAborted(),t.addEventListener("abort",n,{once:!0}));function n(){clearTimeout(a),r(t.reason)}const a=setTimeout(()=>{t==null||t.removeEventListener("abort",n),s()},e)})}const $e=(e,t)=>{const s={};for(const r in t)!(r in Ue)&&!(r in je)&&!(r in e)&&(s[r]=t[r]);return s};class wt{constructor(t,s={}){Q(this,"request");Q(this,"abortController");Q(this,"_retryCount",0);Q(this,"_input");Q(this,"_options");var r,n;if(this._input=t,this._options={...s,headers:ne(this._input.headers,s.headers),hooks:ie({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},s.hooks),method:Ie(s.method??this._input.method),prefixUrl:String(s.prefixUrl||""),retry:Ne(s.retry),throwHttpErrors:s.throwHttpErrors!==!1,timeout:s.timeout??1e4,fetch:s.fetch??globalThis.fetch.bind(globalThis)},typeof this._input!="string"&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&typeof this._input=="string"){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(ke){this.abortController=new globalThis.AbortController;const a=this._options.signal??this._input.signal;a!=null&&a.aborted&&this.abortController.abort(a==null?void 0:a.reason),a==null||a.addEventListener("abort",()=>{this.abortController.abort(a.reason)}),this._options.signal=this.abortController.signal}if(Me&&(this._options.duplex="half"),this._options.json!==void 0&&(this._options.body=((n=(r=this._options).stringifyJson)==null?void 0:n.call(r,this._options.json))??JSON.stringify(this._options.json),this._options.headers.set("content-type",this._options.headers.get("content-type")??"application/json")),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const u="?"+(typeof this._options.searchParams=="string"?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),o=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,u);(De&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)&&!(this._options.headers&&this._options.headers["content-type"])&&this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(o,{...this.request}),this._options)}}static create(t,s){const r=new wt(t,s),n=async()=>{if(typeof r._options.timeout=="number"&&r._options.timeout>Ct)throw new RangeError(`The \`timeout\` option cannot be greater than ${Ct}`);await Promise.resolve();let o=await r._fetch();for(const c of r._options.hooks.afterResponse){const d=await c(r.request,r._options,r._decorateResponse(o.clone()));d instanceof globalThis.Response&&(o=d)}if(r._decorateResponse(o),!o.ok&&r._options.throwHttpErrors){let c=new It(o,r.request,r._options);for(const d of r._options.hooks.beforeError)c=await d(c);throw c}if(r._options.onDownloadProgress){if(typeof r._options.onDownloadProgress!="function")throw new TypeError("The `onDownloadProgress` option must be a function");if(!xe)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return r._stream(o.clone(),r._options.onDownloadProgress)}return o},u=r._options.retry.methods.includes(r.request.method.toLowerCase())?r._retry(n):n();for(const[o,c]of Object.entries(Qe))u[o]=async()=>{r.request.headers.set("accept",r.request.headers.get("accept")||c);const d=await u;if(o==="json"){if(d.status===204||(await d.clone().arrayBuffer()).byteLength===0)return"";if(s.parseJson)return s.parseJson(await d.text())}return d[o]()};return u}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount>this._options.retry.limit||t instanceof re)throw t;if(t instanceof It){if(!this._options.retry.statusCodes.includes(t.response.status))throw t;const r=t.response.headers.get("Retry-After")??t.response.headers.get("RateLimit-Reset")??t.response.headers.get("X-RateLimit-Reset")??t.response.headers.get("X-Rate-Limit-Reset");if(r&&this._options.retry.afterStatusCodes.includes(t.response.status)){let n=Number(r)*1e3;Number.isNaN(n)?n=Date.parse(r)-Date.now():n>=Date.parse("2024-01-01")&&(n-=Date.now());const a=this._options.retry.maxRetryAfter??n;return n<a?n:a}if(t.response.status===413)throw t}const s=this._options.retry.delay(this._retryCount);return Math.min(this._options.retry.backoffLimit,s)}_decorateResponse(t){return this._options.parseJson&&(t.json=async()=>this._options.parseJson(await t.text())),t}async _retry(t){try{return await t()}catch(s){const r=Math.min(this._calculateRetryDelay(s),Ct);if(this._retryCount<1)throw s;await Be(r,{signal:this._options.signal});for(const n of this._options.hooks.beforeRetry)if(await n({request:this.request,options:this._options,error:s,retryCount:this._retryCount})===oe)return;return this._retry(t)}}async _fetch(){for(const r of this._options.hooks.beforeRequest){const n=await r(this.request,this._options);if(n instanceof Request){this.request=n;break}if(n instanceof Response)return n}const t=$e(this.request,this._options),s=this.request;return this.request=s.clone(),this._options.timeout===!1?this._options.fetch(s,t):Ge(s,t,this.abortController,this._options)}_stream(t,s){const r=Number(t.headers.get("content-length"))||0;let n=0;return t.status===204?(s&&s({percent:1,totalBytes:r,transferredBytes:n},new Uint8Array),new globalThis.Response(null,{status:t.status,statusText:t.statusText,headers:t.headers})):new globalThis.Response(new globalThis.ReadableStream({async start(a){const u=t.body.getReader();s&&s({percent:0,transferredBytes:0,totalBytes:r},new Uint8Array);async function o(){const{done:c,value:d}=await u.read();if(c){a.close();return}if(s){n+=d.byteLength;const p=r===0?0:n/r;s({percent:p,transferredBytes:n,totalBytes:r},d)}a.enqueue(d),await o()}await o()}}),{status:t.status,statusText:t.statusText,headers:t.headers})}}/*! MIT License © Sindre Sorhus */const qt=e=>{const t=(s,r)=>wt.create(s,mt(e,r));for(const s of ae)t[s]=(r,n)=>wt.create(r,mt(e,n,{method:s}));return t.create=s=>qt(mt(s)),t.extend=s=>(typeof s=="function"&&(s=s(e??{})),qt(mt(e,s))),t.stop=oe,t},ts=qt();export{It as H,Xe as Q,vt as S,Ze as a,Mt as b,fe as c,Se as d,me as e,Xt as f,S as g,ht as h,Rt as i,Ee as j,ts as k,A as n,Re as p,ye as r,We as s,de as t,Ye as u};
