var dt=e=>{throw TypeError(e)};var J=(e,t,s)=>t.has(e)||dt("Cannot "+s);var r=(e,t,s)=>(J(e,t,"read from private field"),s?s.call(e):t.get(e)),p=(e,t,s)=>t.has(e)?dt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),c=(e,t,s,i)=>(J(e,t,"write to private field"),i?i.call(e,s):t.set(e,s),s),f=(e,t,s)=>(J(e,t,"access private method"),s);import{S as Tt,p as pt,r as I,s as X,b as G,n as It,i as Z,c as gt,t as Qt,f as Ft,d as _t,e as mt,g as Et,u as At,k as ht}from"./index-D0Djxy9a.js";import{r as F}from"./index-CTjT7uj6.js";import"./jsx-runtime-Cw0GR0a5.js";import{g as Mt,J as wt}from"./barnUtils-Dvq7kAU-.js";import{c as xt}from"./eksisterendeSakUtils-C6n8rmqc.js";import{i as Y,l as Bt,m as Dt}from"./useFpNavigator-Dm8ebNGa.js";import{O as V,a2 as Ot,a3 as Pt,N as Ut,Y as Nt}from"./Uttaksplan-Dcwnyo3g.js";var E,n,H,R,w,U,A,T,K,N,k,x,B,M,L,h,j,tt,et,st,rt,it,at,nt,St,bt,kt=(bt=class extends Tt{constructor(t,s){super();p(this,h);p(this,E);p(this,n);p(this,H);p(this,R);p(this,w);p(this,U);p(this,A);p(this,T);p(this,K);p(this,N);p(this,k);p(this,x);p(this,B);p(this,M);p(this,L,new Set);this.options=s,c(this,E,t),c(this,T,null),c(this,A,pt()),this.options.experimental_prefetchInRender||r(this,A).reject(new Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(s)}bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.size===1&&(r(this,n).addObserver(this),Rt(r(this,n),this.options)?f(this,h,j).call(this):this.updateResult(),f(this,h,rt).call(this))}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return ot(r(this,n),this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return ot(r(this,n),this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,f(this,h,it).call(this),f(this,h,at).call(this),r(this,n).removeObserver(this)}setOptions(t,s){const i=this.options,l=r(this,n);if(this.options=r(this,E).defaultQueryOptions(t),this.options.enabled!==void 0&&typeof this.options.enabled!="boolean"&&typeof this.options.enabled!="function"&&typeof I(this.options.enabled,r(this,n))!="boolean")throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");f(this,h,nt).call(this),r(this,n).setOptions(this.options),i._defaulted&&!X(this.options,i)&&r(this,E).getQueryCache().notify({type:"observerOptionsUpdated",query:r(this,n),observer:this});const u=this.hasListeners();u&&yt(r(this,n),l,this.options,i)&&f(this,h,j).call(this),this.updateResult(s),u&&(r(this,n)!==l||I(this.options.enabled,r(this,n))!==I(i.enabled,r(this,n))||G(this.options.staleTime,r(this,n))!==G(i.staleTime,r(this,n)))&&f(this,h,tt).call(this);const a=f(this,h,et).call(this);u&&(r(this,n)!==l||I(this.options.enabled,r(this,n))!==I(i.enabled,r(this,n))||a!==r(this,M))&&f(this,h,st).call(this,a)}getOptimisticResult(t){const s=r(this,E).getQueryCache().build(r(this,E),t),i=this.createResult(s,t);return jt(this,i)&&(c(this,R,i),c(this,U,this.options),c(this,w,r(this,n).state)),i}getCurrentResult(){return r(this,R)}trackResult(t,s){const i={};return Object.keys(t).forEach(l=>{Object.defineProperty(i,l,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(l),s==null||s(l),t[l])})}),i}trackProp(t){r(this,L).add(t)}getCurrentQuery(){return r(this,n)}refetch({...t}={}){return this.fetch({...t})}fetchOptimistic(t){const s=r(this,E).defaultQueryOptions(t),i=r(this,E).getQueryCache().build(r(this,E),s);return i.fetch().then(()=>this.createResult(i,s))}fetch(t){return f(this,h,j).call(this,{...t,cancelRefetch:t.cancelRefetch??!0}).then(()=>(this.updateResult(),r(this,R)))}createResult(t,s){var ft;const i=r(this,n),l=this.options,u=r(this,R),a=r(this,w),y=r(this,U),v=t!==i?t.state:r(this,H),{state:b}=t;let o={...b},Q=!1,g;if(s._optimisticResults){const m=this.hasListeners(),D=!m&&Rt(t,s),P=m&&yt(t,i,s,l);(D||P)&&(o={...o,..._t(b.data,t.options)}),s._optimisticResults==="isRestoring"&&(o.fetchStatus="idle")}let{error:_,errorUpdatedAt:O,status:S}=o;if(s.select&&o.data!==void 0)if(u&&o.data===(a==null?void 0:a.data)&&s.select===r(this,K))g=r(this,N);else try{c(this,K,s.select),g=s.select(o.data),g=mt(u==null?void 0:u.data,g,s),c(this,N,g),c(this,T,null)}catch(m){c(this,T,m)}else g=o.data;if(s.placeholderData!==void 0&&g===void 0&&S==="pending"){let m;if(u!=null&&u.isPlaceholderData&&s.placeholderData===(y==null?void 0:y.placeholderData))m=u.data;else if(m=typeof s.placeholderData=="function"?s.placeholderData((ft=r(this,k))==null?void 0:ft.state.data,r(this,k)):s.placeholderData,s.select&&m!==void 0)try{m=s.select(m),c(this,T,null)}catch(D){c(this,T,D)}m!==void 0&&(S="success",g=mt(u==null?void 0:u.data,m,s),Q=!0)}r(this,T)&&(_=r(this,T),g=r(this,N),O=Date.now(),S="error");const $=o.fetchStatus==="fetching",z=S==="pending",W=S==="error",ct=z&&$,lt=g!==void 0,C={status:S,fetchStatus:o.fetchStatus,isPending:z,isSuccess:S==="success",isError:W,isInitialLoading:ct,isLoading:ct,data:g,dataUpdatedAt:o.dataUpdatedAt,error:_,errorUpdatedAt:O,failureCount:o.fetchFailureCount,failureReason:o.fetchFailureReason,errorUpdateCount:o.errorUpdateCount,isFetched:o.dataUpdateCount>0||o.errorUpdateCount>0,isFetchedAfterMount:o.dataUpdateCount>v.dataUpdateCount||o.errorUpdateCount>v.errorUpdateCount,isFetching:$,isRefetching:$&&!z,isLoadingError:W&&!lt,isPaused:o.fetchStatus==="paused",isPlaceholderData:Q,isRefetchError:W&&lt,isStale:ut(t,s),refetch:this.refetch,promise:r(this,A)};if(this.options.experimental_prefetchInRender){const m=q=>{C.status==="error"?q.reject(C.error):C.data!==void 0&&q.resolve(C.data)},D=()=>{const q=c(this,A,C.promise=pt());m(q)},P=r(this,A);switch(P.status){case"pending":t.queryHash===i.queryHash&&m(P);break;case"fulfilled":(C.status==="error"||C.data!==P.value)&&D();break;case"rejected":(C.status!=="error"||C.error!==P.reason)&&D();break}}return C}updateResult(t){const s=r(this,R),i=this.createResult(r(this,n),this.options);if(c(this,w,r(this,n).state),c(this,U,this.options),r(this,w).data!==void 0&&c(this,k,r(this,n)),X(i,s))return;c(this,R,i);const l={},u=()=>{if(!s)return!0;const{notifyOnChangeProps:a}=this.options,y=typeof a=="function"?a():a;if(y==="all"||!y&&!r(this,L).size)return!0;const d=new Set(y??r(this,L));return this.options.throwOnError&&d.add("error"),Object.keys(r(this,R)).some(v=>{const b=v;return r(this,R)[b]!==s[b]&&d.has(b)})};(t==null?void 0:t.listeners)!==!1&&u()&&(l.listeners=!0),f(this,h,St).call(this,{...l,...t})}onQueryUpdate(){this.updateResult(),this.hasListeners()&&f(this,h,rt).call(this)}},E=new WeakMap,n=new WeakMap,H=new WeakMap,R=new WeakMap,w=new WeakMap,U=new WeakMap,A=new WeakMap,T=new WeakMap,K=new WeakMap,N=new WeakMap,k=new WeakMap,x=new WeakMap,B=new WeakMap,M=new WeakMap,L=new WeakMap,h=new WeakSet,j=function(t){f(this,h,nt).call(this);let s=r(this,n).fetch(this.options,t);return t!=null&&t.throwOnError||(s=s.catch(It)),s},tt=function(){f(this,h,it).call(this);const t=G(this.options.staleTime,r(this,n));if(Z||r(this,R).isStale||!gt(t))return;const i=Qt(r(this,R).dataUpdatedAt,t)+1;c(this,x,setTimeout(()=>{r(this,R).isStale||this.updateResult()},i))},et=function(){return(typeof this.options.refetchInterval=="function"?this.options.refetchInterval(r(this,n)):this.options.refetchInterval)??!1},st=function(t){f(this,h,at).call(this),c(this,M,t),!(Z||I(this.options.enabled,r(this,n))===!1||!gt(r(this,M))||r(this,M)===0)&&c(this,B,setInterval(()=>{(this.options.refetchIntervalInBackground||Ft.isFocused())&&f(this,h,j).call(this)},r(this,M)))},rt=function(){f(this,h,tt).call(this),f(this,h,st).call(this,f(this,h,et).call(this))},it=function(){r(this,x)&&(clearTimeout(r(this,x)),c(this,x,void 0))},at=function(){r(this,B)&&(clearInterval(r(this,B)),c(this,B,void 0))},nt=function(){const t=r(this,E).getQueryCache().build(r(this,E),this.options);if(t===r(this,n))return;const s=r(this,n);c(this,n,t),c(this,H,t.state),this.hasListeners()&&(s==null||s.removeObserver(this),t.addObserver(this))},St=function(t){Et.batch(()=>{t.listeners&&this.listeners.forEach(s=>{s(r(this,R))}),r(this,E).getQueryCache().notify({query:r(this,n),type:"observerResultsUpdated"})})},bt);function Lt(e,t){return I(t.enabled,e)!==!1&&e.state.data===void 0&&!(e.state.status==="error"&&t.retryOnMount===!1)}function Rt(e,t){return Lt(e,t)||e.state.data!==void 0&&ot(e,t,t.refetchOnMount)}function ot(e,t,s){if(I(t.enabled,e)!==!1){const i=typeof s=="function"?s(e):s;return i==="always"||i!==!1&&ut(e,t)}return!1}function yt(e,t,s,i){return(e!==t||I(i.enabled,e)===!1)&&(!s.suspense||e.state.status!=="error")&&ut(e,s)}function ut(e,t){return I(t.enabled,e)!==!1&&e.isStaleByTime(G(t.staleTime,e))}function jt(e,t){return!X(e.getCurrentResult(),t)}var Ct=F.createContext(!1),Ht=()=>F.useContext(Ct);Ct.Provider;function Kt(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}var qt=F.createContext(Kt()),Gt=()=>F.useContext(qt);function Vt(e,t){return typeof e=="function"?e(...t):!!e}function $t(){}var zt=(e,t)=>{(e.suspense||e.throwOnError)&&(t.isReset()||(e.retryOnMount=!1))},Wt=e=>{F.useEffect(()=>{e.clearReset()},[e])},Jt=({result:e,errorResetBoundary:t,throwOnError:s,query:i})=>e.isError&&!t.isReset()&&!e.isFetching&&i&&Vt(s,[e.error,i]),Yt=e=>{e.suspense&&(e.staleTime===void 0&&(e.staleTime=1e3),typeof e.gcTime=="number"&&(e.gcTime=Math.max(e.gcTime,1e3)))},Xt=(e,t)=>e.isLoading&&e.isFetching&&!t,Zt=(e,t)=>(e==null?void 0:e.suspense)&&t.isPending,vt=(e,t,s)=>t.fetchOptimistic(e).catch(()=>{s.clearReset()});function te(e,t,s){var b,o,Q,g,_;const i=At(),l=Ht(),u=Gt(),a=i.defaultQueryOptions(e);(o=(b=i.getDefaultOptions().queries)==null?void 0:b._experimental_beforeQuery)==null||o.call(b,a),a._optimisticResults=l?"isRestoring":"optimistic",Yt(a),zt(a,u),Wt(u);const y=!i.getQueryCache().get(a.queryHash),[d]=F.useState(()=>new t(i,a)),v=d.getOptimisticResult(a);if(F.useSyncExternalStore(F.useCallback(O=>{const S=l?()=>{}:d.subscribe(Et.batchCalls(O));return d.updateResult(),S},[d,l]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),F.useEffect(()=>{d.setOptions(a,{listeners:!1})},[a,d]),Zt(a,v))throw vt(a,d,u);if(Jt({result:v,errorResetBoundary:u,throwOnError:a.throwOnError,query:i.getQueryCache().get(a.queryHash)}))throw v.error;if((g=(Q=i.getDefaultOptions().queries)==null?void 0:Q._experimental_afterQuery)==null||g.call(Q,a,v),a.experimental_prefetchInRender&&!Z&&Xt(v,l)){const O=y?vt(a,d,u):(_=i.getQueryCache().get(a.queryHash))==null?void 0:_.promise;O==null||O.catch($t).finally(()=>{d.updateResult()})}return a.notifyOnChangeProps?v:d.trackResult(v)}function me(e,t){return te(e,kt)}const ee=(e,t)=>e?!0:V(t)?!!t.harRettPåForeldrepengerINorge:!1,se=(e,t)=>e?V(t)?!!t.harRettPåForeldrepengerINorge:!1:!0,re=(e,t)=>{if(Ot(e)||Nt(e))return t||e.termindato},ie=(e,t)=>t||e||void 0,ae=(e,t,s)=>e&&s?s:t,ne=(e,t,s,i,l)=>s||i?"ALENEOMSORG":e&&t||l?"BEGGE_RETT":"BARE_SØKER_RETT",Re=(e,t,s,i,l,u)=>{const a=V(t)?t:void 0,y=Y(s.rolle),d=Bt(y,(a==null?void 0:a.erAleneOmOmsorg)||!1,t),v=Dt(!y,(a==null?void 0:a.erAleneOmOmsorg)||!1,t),b=i!==void 0?i.startdatoFørsteStønadsperiode:void 0,o=xt(l,e,y,Mt(e),b),Q=ae(y,e.antallBarn,o==null?void 0:o.grunnlag.antallBarn),g=ie(u==null?void 0:u.grunnlag.termindato,o==null?void 0:o.grunnlag.termindato),_=Y(s.rolle),O=Y(s.rolle),S=V(t)&&t.harRettPåForeldrepengerIEØS;return{rettighetstype:ne(ee(_,t),se(_,t),v||!1,d||!1,S||!1),brukerrolle:O?"FAR":"MOR",antallBarn:Q.toString(),fødselsdato:Ot(e)?e.fødselsdatoer[0]:void 0,termindato:re(e,g),omsorgsovertakelseDato:Pt(e)||Ut(e)?e.adopsjonsdato:void 0,morHarUføretrygd:wt(t,O),familieHendelseDatoNesteSak:b}},ye=(e,t)=>({queryKey:["ANNEN_PART_VEDTAK",e],queryFn:()=>ht.post("/foreldrepenger/soknad/rest/innsyn/v2/annenPartVedtak",{json:e}).json(),enabled:t}),ve=(e,t)=>({queryKey:["NESTE_SAK_ANNEN_PART_VEDTAK",e],queryFn:()=>ht.post("/foreldrepenger/soknad/rest/innsyn/v2/annenPartVedtak",{json:e}).json(),enabled:t}),be=(e,t)=>({queryKey:["TILGJENGELIGE_STONADSKONTOER",e],queryFn:()=>ht.post("/foreldrepenger/soknad/rest/konto",{json:e}).json(),enabled:t});export{ye as a,ae as b,ie as c,ve as d,Re as g,$t as n,Vt as s,be as t,me as u};
