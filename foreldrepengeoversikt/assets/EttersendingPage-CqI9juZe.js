import{c as q,k as Ne,f as he,o as ye,E as Le,d as D,m as be,n as Ge,p as Me,q as Fe,i as $,j as w,V as ce,B as Pe,L as je,g as Ke,e as Ve}from"./index-Cmv8OFop.js";import{r as A,R as j,c as Be,g as xe}from"./index-BBkUAzwr.js";import{u as Ue,A as ue,F as Se,a as Ce,B as He}from"./stepFooter-Cgl20CZ_.js";import{u as $e,d as Ye,e as We,S as h,f as ze,g as qe,L as Je,A as Ze,h as Xe,G as Qe}from"./attachmentApi-REiYrTSQ.js";import{C as et,E as ae,Y as K}from"./Ytelse-C5aoEp6i.js";import{u as tt}from"./useId-4vqqPgaI.js";function nt(e){A.useEffect(()=>{const t=document.title;return document.title=e,()=>{document.title=t}},[e])}var rt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const st=A.forwardRef((e,t)=>{const{inputProps:n,errorId:r,showErrorMsg:o,hasError:p,size:u,inputDescriptionId:m,readOnly:_}=$e(e,"select"),{children:S,label:f,className:I,description:R,htmlSize:N,hideLabel:G=!1,style:B}=e,x=rt(e,["children","label","className","description","htmlSize","hideLabel","style"]),b={onMouseDown:M=>{_&&(M.preventDefault(),M.target.focus())},onKeyDown:M=>{_&&["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"," "].includes(M.key)&&M.preventDefault()}};return j.createElement("div",{className:q(I,"navds-form-field",`navds-form-field--${u}`,{"navds-form-field--disabled":!!n.disabled,"navds-form-field--readonly":_,"navds-select--error":p,"navds-select--readonly":_})},j.createElement(Ne,{htmlFor:n.id,size:u,className:q("navds-form-field__label",{"navds-sr-only":G})},j.createElement(Ye,{readOnly:_,nativeReadOnly:!1}),f),!!R&&j.createElement(he,{className:q("navds-form-field__description",{"navds-sr-only":G}),id:m,size:u,as:"div"},R),j.createElement("div",{className:"navds-select__container",style:B},j.createElement("select",Object.assign({},ye(x,["error","errorId","size","readOnly"]),n,b,{ref:t,className:q("navds-select__input","navds-body-short",`navds-body-short--${u??"medium"}`),size:N}),S),j.createElement(et,{className:"navds-select__chevron","aria-hidden":!0})),j.createElement("div",{className:"navds-form-field__error",id:r,"aria-relevant":"additions removals","aria-live":"polite"},o&&j.createElement(Le,{size:u},e.error)))}),ot=st;var L=(e=>(e.UNFETCHED="Unfetched",e.IN_PROGRESS="InProgress",e.FINISHED="Finished",e))(L||{});const at=ae.REST_API_URL,ee=We.create({baseURL:at}),Z=e=>(ee.interceptors.request.use(t=>(t.timeout=60*1e3,e&&(t.headers.fnr=e),t)),ee.interceptors.response.use(t=>t,t=>Promise.reject(t)),ee),ve=()=>{window.location.href=ae.LOGIN_URL+"?redirect="+window.location.origin},_e={config:{},isSuspended:!1},V=(e,t=_e,n)=>{const[r,o]=A.useState(),[p,u]=A.useState(null),[m,_]=A.useState(L.UNFETCHED),S=Z(n);return A.useEffect(()=>{!t.isSuspended&&m===L.UNFETCHED&&(_(L.IN_PROGRESS),S.get(e,t.config).then(f=>{f.data===""?o(void 0):o(f.data),_(L.FINISHED)}).catch(f=>{f.response&&(f.response.status===401||f.response.status===403)?ve():u(f),_(L.FINISHED)}))},[t,e,S,m]),{data:r,error:p,requestStatus:m}},it=(e,t,n=_e)=>{const[r,o]=A.useState(),[p,u]=A.useState(null),[m,_]=A.useState(L.UNFETCHED),S=n.fnr?Z(n.fnr):Z();return A.useEffect(()=>{!n.isSuspended&&m===L.UNFETCHED&&(_(L.IN_PROGRESS),S.post(e,t,n.config).then(f=>{f.data===""?o(void 0):o(f.data),_(L.FINISHED)}).catch(f=>{f.response&&(f.response.status===401||f.response.status===403)?ve():u(f),_(L.FINISHED)}))},[n,e,S,m,t]),{data:r,error:p,requestStatus:m}},dt=()=>{const{data:e,error:t}=V("/sokerinfo",{config:{withCredentials:!0}});return{søkerinfoData:e,søkerinfoError:t}},lt=e=>{const{data:t,error:n}=V("/innsyn/v2/saker",{config:{withCredentials:!0},isSuspended:e});return{sakerData:t,sakerError:n}},ct=()=>{const{data:e,error:t}=V("/storage/aktive",{config:{withCredentials:!0},isSuspended:!0});return{storageData:e,storageError:t}},ut=(e,t,n,r)=>{const o={annenPartFødselsnummer:e,barnFødselsnummer:t,familiehendelse:n},{data:p,error:u,requestStatus:m}=it("/innsyn/v2/annenPartVedtak",o,{config:{withCredentials:!0},isSuspended:r});return u&&u.message.includes("Ugyldig ident")?{annenPartsVedtakData:void 0,annenPartsVedtakError:void 0,annenPartsVedtakRequestStatus:L.FINISHED}:{annenPartsVedtakData:p,annenPartsVedtakError:u,annenPartsVedtakRequestStatus:m}},ft=e=>{const{data:t,error:n,requestStatus:r}=V("/dokument/alle",{config:{withCredentials:!0,params:{saksnummer:e}}});return{dokumenterData:t,dokumenterError:n,dokumenterStatus:r}},Et=e=>{const{data:t,error:n}=V("/innsyn/tidslinje",{config:{withCredentials:!0,params:{saksnummer:e}}});return{tidslinjeHendelserData:t,tidslinjeHendelserError:n}},gt=()=>{const{data:e,error:t}=V("/minidialog",{config:{withCredentials:!0}});return{minidialogData:e,minidialogError:t}},mt=e=>{const{data:t,error:n}=V("/historikk/vedlegg",{config:{withCredentials:!0,params:{saksnummer:e}}});return{manglendeVedleggData:t,manglendeVedleggError:n}},pt=(e,t)=>Z(t).post("/soknad/ettersend",e,{timeout:30*1e3,withCredentials:!0}),ht=()=>{const{data:e,error:t}=V("/innsyn/v2/saker/oppdatert",{config:{withCredentials:!0}});return{oppdatertData:e,oppdatertError:t}},St={useSøkerinfo:dt,useGetSaker:lt,useGetDokumenter:ft,useGetAnnenPartsVedtak:ut,useGetTidslinjeHendelser:Et,useGetMinidialog:gt,useGetManglendeVedlegg:mt,useErSakOppdatert:ht,useGetMellomlagretSøknad:ct,sendEttersending:pt};var O={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1,STORYBOOK:"true"};let vt=0;function _t(e,t){const n=`atom${++vt}`,r={toString:()=>n};return typeof e=="function"?r.read=e:(r.init=e,r.read=At,r.write=kt),t&&(r.write=t),r}function At(e){return e(this)}function kt(e,t,n){return t(this,typeof n=="function"?n(e(this)):n)}const te=(e,t)=>e.unstable_is?e.unstable_is(t):t===e,ne=e=>"init"in e,re=e=>!!e.write,X=new WeakMap,Tt=(e,t)=>{X.set(e,t),e.catch(()=>{}).finally(()=>X.delete(e))},fe=(e,t)=>{const n=X.get(e);n&&(X.delete(e),n(t))},Ee=(e,t)=>{e.status="fulfilled",e.value=t},ge=(e,t)=>{e.status="rejected",e.reason=t},wt=e=>typeof(e==null?void 0:e.then)=="function",C=(e,t)=>!!e&&"v"in e&&"v"in t&&Object.is(e.v,t.v),me=(e,t)=>!!e&&"e"in e&&"e"in t&&Object.is(e.e,t.e),U=e=>!!e&&"v"in e&&e.v instanceof Promise,Dt=(e,t)=>"v"in e&&"v"in t&&e.v.orig&&e.v.orig===t.v.orig,J=e=>{if("e"in e)throw e.e;return e.v},Rt=()=>{const e=new WeakMap,t=new WeakMap,n=[],r=new WeakMap;let o,p;(O?"production":void 0)!=="production"&&(o=new Set,p=new Set);const u=s=>e.get(s),m=(s,d)=>{d.d.forEach((E,c)=>{var l;if(!r.has(c)){const a=u(c);(l=n[n.length-1])==null||l.add(c),r.set(c,[a,new Set]),a&&m(c,a)}r.get(c)[1].add(s)})},_=(s,d)=>{var E;(O?"production":void 0)!=="production"&&Object.freeze(d);const c=u(s);if(e.set(s,d),r.has(s)||((E=n[n.length-1])==null||E.add(s),r.set(s,[c,new Set]),m(s,d)),U(c)){const l="v"in d?d.v instanceof Promise?d.v:Promise.resolve(d.v):Promise.reject(d.e);c.v!==l&&fe(c.v,l)}},S=(s,d,E,c)=>{const l=new Map(c?d.d:null);let a=!1;E.forEach((i,g)=>{!i&&te(s,g)&&(i=d),i?(l.set(g,i),d.d.get(g)!==i&&(a=!0)):(O?"production":void 0)!=="production"&&console.warn("[Bug] atom state not found")}),(a||d.d.size!==l.size)&&(d.d=l)},f=(s,d,E,c)=>{const l=u(s),a={d:(l==null?void 0:l.d)||new Map,v:d};if(E&&S(s,a,E,c),C(l,a)&&l.d===a.d)return l;if(U(l)&&U(a)&&Dt(l,a)){if(l.d===a.d)return l;a.v=l.v}return _(s,a),a},I=(s,d,E,c)=>{if(wt(d)){let l;const a=()=>{const g=u(s);if(!U(g)||g.v!==i)return;const T=f(s,i,E);t.has(s)&&g.d!==T.d&&de(s,T,g.d)},i=new Promise((g,T)=>{let v=!1;d.then(k=>{v||(v=!0,Ee(i,k),g(k),a())},k=>{v||(v=!0,ge(i,k),T(k),a())}),l=k=>{v||(v=!0,k.then(P=>Ee(i,P),P=>ge(i,P)),g(k))}});return i.orig=d,i.status="pending",Tt(i,g=>{g&&l(g),c==null||c()}),f(s,i,E,!0)}return f(s,d,E)},R=(s,d,E)=>{const c=u(s),l={d:(c==null?void 0:c.d)||new Map,e:d};return E&&S(s,l,E),me(c,l)&&c.d===l.d?c:(_(s,l),l)},N=(s,d)=>{const E=u(s);if(!d&&E&&(t.has(s)||Array.from(E.d).every(([v,k])=>{if(v===s)return!0;const P=N(v);return P===k||C(P,k)})))return E;const c=new Map;let l=!0;const a=v=>{if(te(s,v)){const P=u(v);if(P)return c.set(v,P),J(P);if(ne(v))return c.set(v,void 0),v.init;throw new Error("no atom init")}const k=N(v);return c.set(v,k),J(k)};let i,g;const T={get signal(){return i||(i=new AbortController),i.signal},get setSelf(){return(O?"production":void 0)!=="production"&&!re(s)&&console.warn("setSelf function cannot be used with read-only atom"),!g&&re(s)&&(g=(...v)=>{if((O?"production":void 0)!=="production"&&l&&console.warn("setSelf function cannot be called in sync"),!l)return y(s,...v)}),g}};try{const v=s.read(a,T);return I(s,v,c,()=>i==null?void 0:i.abort())}catch(v){return R(s,v,c)}finally{l=!1}},G=s=>J(N(s)),B=s=>{let d=t.get(s);return d||(d=F(s)),d},x=(s,d)=>!d.l.size&&(!d.t.size||d.t.size===1&&d.t.has(s)),b=s=>{const d=t.get(s);d&&x(s,d)&&W(s)},M=s=>{const d=i=>{var g,T;const v=new Set((g=t.get(i))==null?void 0:g.t);return(T=r.get(i))==null||T[1].forEach(k=>{v.add(k)}),v},E=new Array,c=new Set,l=i=>{if(!c.has(i)){c.add(i);for(const g of d(i))i!==g&&l(g);E.push(i)}};l(s);const a=new Set([s]);for(let i=E.length-1;i>=0;--i){const g=E[i],T=u(g);if(!T)continue;let v=!1;for(const k of T.d.keys())if(k!==g&&a.has(k)){v=!0;break}if(v){const k=N(g,!0);C(T,k)||a.add(g)}}},Y=(s,...d)=>{const E=a=>J(N(a)),c=(a,...i)=>{const g=n.length>0;g||n.push(new Set([a]));let T;if(te(s,a)){if(!ne(a))throw new Error("atom not writable");const v=u(a),k=I(a,i[0]);C(v,k)||M(a)}else T=Y(a,...i);if(!g){const v=z(n.pop());(O?"production":void 0)!=="production"&&o.forEach(k=>k({type:"async-write",flushed:v}))}return T};return s.write(E,c,...d)},y=(s,...d)=>{n.push(new Set([s]));const E=Y(s,...d),c=z(n.pop());return(O?"production":void 0)!=="production"&&o.forEach(l=>l({type:"write",flushed:c})),E},F=(s,d,E)=>{var c;const l=E||[];(c=u(s))==null||c.d.forEach((i,g)=>{const T=t.get(g);T?T.t.add(s):g!==s&&F(g,s,l)}),N(s);const a={t:new Set(d&&[d]),l:new Set};if(t.set(s,a),(O?"production":void 0)!=="production"&&p.add(s),re(s)&&s.onMount){const{onMount:i}=s;l.push(()=>{const g=i((...T)=>y(s,...T));g&&(a.u=g)})}return E||l.forEach(i=>i()),a},W=s=>{var d;const E=(d=t.get(s))==null?void 0:d.u;E&&E(),t.delete(s),(O?"production":void 0)!=="production"&&p.delete(s);const c=u(s);c?(U(c)&&fe(c.v),c.d.forEach((l,a)=>{if(a!==s){const i=t.get(a);i&&(i.t.delete(s),x(a,i)&&W(a))}})):(O?"production":void 0)!=="production"&&console.warn("[Bug] could not find atom state to unmount",s)},de=(s,d,E)=>{const c=new Set(d.d.keys()),l=new Set;E==null||E.forEach((a,i)=>{if(c.has(i)){c.delete(i);return}l.add(i);const g=t.get(i);g&&g.t.delete(s)}),c.forEach(a=>{const i=t.get(a);i?i.t.add(s):t.has(s)&&F(a,s)}),l.forEach(a=>{const i=t.get(a);i&&x(a,i)&&W(a)})},z=s=>{let d;(O?"production":void 0)!=="production"&&(d=new Set);const E=[],c=l=>{var a;if(!r.has(l))return;const[i,g]=r.get(l);r.delete(l),E.push([l,i]),g.forEach(c),(a=u(l))==null||a.d.forEach((T,v)=>c(v))};if(s.forEach(c),E.forEach(([l,a])=>{const i=u(l);if(!i){(O?"production":void 0)!=="production"&&console.warn("[Bug] no atom state to flush");return}if(i!==a){const g=t.get(l);g&&i.d!==(a==null?void 0:a.d)&&de(l,i,a==null?void 0:a.d),g&&!(!U(a)&&(C(a,i)||me(a,i)))&&(g.l.forEach(T=>T()),(O?"production":void 0)!=="production"&&d.add(l))}}),(O?"production":void 0)!=="production")return d},le=(s,d)=>{const E=B(s),c=z([s]),l=E.l;return l.add(d),(O?"production":void 0)!=="production"&&o.forEach(a=>a({type:"sub",flushed:c})),()=>{l.delete(d),b(s),(O?"production":void 0)!=="production"&&o.forEach(a=>a({type:"unsub"}))}};return(O?"production":void 0)!=="production"?{get:G,set:y,sub:le,dev_subscribe_store:(s,d)=>{if(d!==2)throw new Error("The current StoreListener revision is 2.");return o.add(s),()=>{o.delete(s)}},dev_get_mounted_atoms:()=>p.values(),dev_get_atom_state:s=>e.get(s),dev_get_mounted:s=>t.get(s),dev_restore_atoms:s=>{n.push(new Set);for(const[E,c]of s)ne(E)&&(I(E,c),M(E));const d=z(n.pop());o.forEach(E=>E({type:"restore",flushed:d}))}}:{get:G,set:y,sub:le}};let se;(O?"production":void 0)!=="production"&&(typeof globalThis.__NUMBER_OF_JOTAI_INSTANCES__=="number"?++globalThis.__NUMBER_OF_JOTAI_INSTANCES__:globalThis.__NUMBER_OF_JOTAI_INSTANCES__=1);const Ot=()=>(se||((O?"production":void 0)!=="production"&&globalThis.__NUMBER_OF_JOTAI_INSTANCES__!==1&&console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"),se=Rt()),se);var It={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1,STORYBOOK:"true"};const Nt=A.createContext(void 0),Ae=e=>{const t=A.useContext(Nt);return(e==null?void 0:e.store)||t||Ot()},yt=e=>typeof(e==null?void 0:e.then)=="function",Lt=j.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)});function bt(e,t){const n=Ae(t),[[r,o,p],u]=A.useReducer(S=>{const f=n.get(e);return Object.is(S[0],f)&&S[1]===n&&S[2]===e?S:[f,n,e]},void 0,()=>[n.get(e),n,e]);let m=r;(o!==n||p!==e)&&(u(),m=n.get(e));const _=t==null?void 0:t.delay;return A.useEffect(()=>{const S=n.sub(e,()=>{if(typeof _=="number"){setTimeout(u,_);return}u()});return u(),S},[n,e,_]),A.useDebugValue(m),yt(m)?Lt(m):m}function Gt(e,t){const n=Ae(t);return A.useCallback((...o)=>{if((It?"production":void 0)!=="production"&&!("write"in e))throw new Error("not writable atom");return n.set(e,...o)},[n,e])}var ie=(e=>(e.HOVEDSIDE="/",e.SAKSOVERSIKT="/sak",e.DIN_PLAN="din-plan",e.DOKUMENTER="dokumenter",e.ETTERSEND="ettersend",e.TIDSLINJEN="tidslinjen",e.OPPGAVER="oppgaver",e))(ie||{}),Mt=(e=>(e.SAKSBEHANDLINGSTIDER="https://www.nav.no/saksbehandlingstider",e.SAKSBEHANDLINGSTIDER_FP="https://www.nav.no/saksbehandlingstider#foreldrepenger",e.SAKSBEHANDLINGSTIDER_SVP="https://www.nav.no/saksbehandlingstider#svangerskapspenger",e.SAKSBEHANDLINGSTIDER_ES="https://www.nav.no/saksbehandlingstider#engangsstonad",e.KLAGERETTIGHETER="https://www.nav.no/klage",e.KLAGERETTIGHETER_FP="https://www.nav.no/klage#foreldrepenger",e.KLAGERETTIGHETER_SVP="https://www.nav.no/klage#svangerskapspenger",e.KLAGERETTIGHETER_ES="https://www.nav.no/klage#engangsstonad",e.CHAT_MED_OSS="https://www.nav.no/person/kontakt-oss/chat/familie",e.SKRIV_TIL_OSS="https://innboks.nav.no/s/skriv-til-oss?category=Familie",e.RING_OSS="tel:55553333",e.SE_FLERE_TLF_NR_OG_TASTEVALG="https://www.nav.no/kontaktoss#ring-oss",e.LES_MER_OM_VÅRE_PENGESTØTTER="https://www.nav.no/barn",e.LES_MER_OM_FORELDREPENGER="https://www.nav.no/foreldrepenger",e.LES_MER_OM_SVANGERSKAPSPENGER="https://familie.nav.no/om-svangerskapspenger",e.LES_MER_OM_ENGANGSTØNAD="https://familie.nav.no/om-engangsstonad",e.MELD_FRA_OM_ENDRINGER="https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",e.VENT_INNTEKTSMELDING="https://www.nav.no/arbeidsgiver/inntektsmelding",e.VENT_MELDEKORT="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det",e.SØKNADSFRISTER="https://www.nav.no/foreldrepenger#soknadsfrister",e.FORELDREPENGESOKNAD="https://foreldrepengesoknad.nav.no",e.HVOR_LENGE="https://www.nav.no/foreldrepenger#hvor-lenge",e))(Mt||{});const ke=_t(ie.HOVEDSIDE),mn=()=>bt(ke),Ft=e=>{const t=Gt(ke);A.useEffect(()=>{t(e)},[t,e])};var Te={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(Be,function(){var n="day";return function(r,o,p){var u=function(S){return S.add(4-S.isoWeekday(),n)},m=o.prototype;m.isoWeekYear=function(){return u(this).year()},m.isoWeek=function(S){if(!this.$utils().u(S))return this.add(7*(S-this.isoWeek()),n);var f,I,R,N,G=u(this),B=(f=this.isoWeekYear(),I=this.$u,R=(I?p.utc:p)().year(f).startOf("year"),N=4-R.isoWeekday(),R.isoWeekday()>4&&(N+=7),R.add(N,n));return G.diff(B,"week")+1},m.isoWeekday=function(S){return this.$utils().u(S)?this.day()||7:this.day(this.day()%7?S:S-7)};var _=m.startOf;m.startOf=function(S,f){var I=this.$utils(),R=!!I.u(f)||f;return I.p(S)==="isoweek"?R?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):_.bind(this)(S,f)}}})})(Te);var Pt=Te.exports;const jt=xe(Pt);D.extend(be);D.extend(jt);D.extend(Ge);D.extend(Me);const Kt=(e,t)=>D(e).format(t||"dddd D. MMMM YYYY"),pn=e=>Kt(e,"KL.HH:mm"),hn=e=>e.format("MMM").substr(0,3),Vt=e=>{const t=Math.floor(e/5);return{dager:e-t*5,uker:t}},Sn=(e,t,n="full")=>{const{uker:r,dager:o}=Vt(Math.abs(e)),p=t.formatMessage({id:"varighet.dager"},{dager:o});if(r===0)return p;const u=t.formatMessage({id:"varighet.uker"},{uker:r});if(o>0){const m=n==="full"?t.formatMessage({id:"varighet.separator--full"}):t.formatMessage({id:"varighet.separator--normal"});return`${u}${m}${p}`}return u},Bt=e=>e.fom!==void 0&&e.tom!==void 0&&D(e.fom).isSameOrBefore(e.tom,"day"),pe=e=>D(e).isoWeekday(),xt=e=>pe(e)!==6&&pe(e)!==7,vn=e=>{if(!Bt(e))return 0;let t=D(e.fom);const n=D(e.tom);let r=0;for(;t.isSameOrBefore(n,"day");)xt(t.toDate())&&r++,t=t.add(24,"hours");return r},H=e=>{if(e!==void 0&&Fe(e)&&D(e,"YYYY-MM-DD",!0).isValid())return D.utc(e).toDate()},Ut=(e,t)=>e===void 0||t===void 0?!1:D(e).isSameOrAfter(D(t).subtract(1,"day"),"day")&&D(e).isSameOrBefore(D(t).add(1,"day"),"day"),Ct=e=>{const t=e.charAt(e.length-1).toLowerCase();return t==="s"||t==="x"||t==="z"},_n=(e,t)=>t!=="nb"?e:Ct(e)?`${e}'`:`${e}s`,An=(e,t,n)=>{const r=!e.sakTilhørerMor;return{farMedmor:r?t:n,mor:r?n:t}},Ht=e=>!e.dødsdato,we=e=>[...e.engangsstønad,...e.foreldrepenger,...e.svangerskapspenger];function $t(e,t){return D(e.fødselsdato).isAfter(t.fødselsdato,"d")?1:D(e.fødselsdato).isBefore(t.fødselsdato,"d")||e.fornavn<t.fornavn?-1:1}const kn=e=>{var t;if(e.gjeldendeVedtak&&e.gjeldendeVedtak.perioder.length>0)return H(e.gjeldendeVedtak.perioder[0].fom);if(e.åpenBehandling&&e.åpenBehandling.søknadsperioder)return H((t=e.åpenBehandling)==null?void 0:t.søknadsperioder[0].fom)},Yt=(e,t)=>{const n=e.ytelse===K.FORELDREPENGER,r=n&&e.barn!==void 0?e.barn.map(f=>f.fnr).flat():[],o=n&&t?t.filter(f=>r.includes(f.fnr)):[],p=H(e.familiehendelse.fødselsdato),u=p!==void 0&&t?t.filter(f=>Ut(H(f.fødselsdato),p)&&!(o!=null&&o.find(I=>I.fnr===f.fnr))):[],m=o.concat(u);m.sort($t);const _=m.filter(f=>f.fødselsdato!==void 0).map(f=>H(f.fødselsdato));let S=[];return _&&_.length>0?S=_:p&&(S=[p]),{fornavn:m==null?void 0:m.filter(f=>f.fornavn!==void 0&&f.fornavn.trim()!=="").map(f=>[f.fornavn,f.mellomnavn!==void 0?f.mellomnavn:""].join(" ")),fødselsdatoer:S,alleBarnaLever:!!(m!=null&&m.every(f=>Ht(f)))}},Tn=(e,t)=>we(t).reduce((r,o)=>{if(o.familiehendelse){const p=qt(o.familiehendelse),u=r.find(m=>Wt(m,p));if(u&&u.saker.push(o),u&&r.includes(u))return r;{const m=zt(o.familiehendelse,o.gjelderAdopsjon),_={antallBarn:o.familiehendelse.antallBarn,familiehendelsedato:p,saker:[o],type:m,ytelse:o.ytelse,barn:m!=="termin"?Yt(o,e):void 0};return r.push(_),r}}else return r},[]),oe=(e,t)=>t===K.ENGANGSSTØNAD?e.map(n=>({...n,ytelse:t})):t===K.SVANGERSKAPSPENGER?e.map(n=>({...n,ytelse:t})):e.map(n=>({...n,ytelse:t})),wn=e=>({foreldrepenger:oe(e.foreldrepenger,K.FORELDREPENGER),engangsstønad:oe(e.engangsstønad,K.ENGANGSSTØNAD),svangerskapspenger:oe(e.svangerskapspenger,K.SVANGERSKAPSPENGER)}),Dn=e=>{const{foreldrepenger:t,svangerskapspenger:n,engangsstønad:r}=e;return t.length+n.length+r.length},Wt=(e,t)=>{const n=D(t).subtract(2,"months"),r=D(t).add(3,"weeks");if(e)return D(e.familiehendelsedato).isAfter(n)&&D(e.familiehendelsedato).isSameOrBefore(r)},zt=(e,t)=>{if(t)return"adopsjon";const{fødselsdato:n}=e;return n?"fødsel":"termin"},qt=e=>{const{fødselsdato:t,termindato:n,omsorgsovertakelse:r}=e;return r||t||n},Rn=(e,t)=>{const n=t&&t.familiehendelse?t.familiehendelse.fødselsdato:void 0,r=e.søker.barn&&n?e.søker.barn.find(p=>D(p.fødselsdato).isSame(n,"d")):void 0,o=r&&r.annenForelder?r.annenForelder.fornavn:void 0;return o!==void 0&&o.trim()!==""?o:"Annen forelder"},Jt=(e,t)=>e===1||e===0?t.formatMessage({id:"barn"}):e===2?t.formatMessage({id:"tvillinger"}):e===3?t.formatMessage({id:"trillinger"}):t.formatMessage({id:"flerlinger"}),De=e=>{if(e===void 0)return;const t=[];if(e.forEach(n=>{t.find(o=>D(o).isSame(n,"day"))===void 0&&t.push(n)}),t.length>1){const n=t.map(p=>$(p)),r=n.slice(0,-1).join(", "),o=n[n.length-1];return`${r} og ${o}`}return $(t[0])},Zt=(e,t,n,r,o)=>{const p=Jt(n,r);if(n===0&&t===void 0||o==="termin")return r.formatMessage({id:"barnHeader.terminBarn"},{barnTekst:p,termindato:$(e)});if(o==="adopsjon")return r.formatMessage({id:"barnHeader.adoptertBarn"},{adopsjonsdato:$(e)});{const u=De(t);return t!==void 0&&t.length>0?r.formatMessage({id:"barnHeader.fødtBarn"},{barnTekst:p,fødselsdatoTekst:u}):""}},Xt=e=>{if(e.length>1){const t=e.map(r=>r.trim()).slice(0,-1).join(", "),n=e[e.length-1];return`${t} og ${n}`}else return`${e[0]}`},On=(e,t,n,r,o,p,u)=>{if(e===void 0||e.length===0||!r)return Zt(n,t,o,p,u);const m=Xt(e);if(u==="fødsel"){const _=De(t);return`${m} født ${_}`}return u==="adopsjon"?`${m} adoptert ${$(n)}`:""};var Qt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const en=A.forwardRef((e,t)=>{var{title:n,titleId:r}=e,o=Qt(e,["title","titleId"]);let p=tt();return p=n?r||"title-"+p:void 0,A.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":p},o),n?A.createElement("title",{id:p},n):null,A.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11 13v8h2v-8h8v-2h-8V3h-2v8H3v2h8Z",fill:"currentColor"}))}),tn=en,Re=e=>{const t=Object.values(h);return e.ytelse===K.FORELDREPENGER?e.kanSøkeOmEndring?t.filter(rn):t.filter(nn):e.ytelse===K.ENGANGSSTØNAD?t.filter(on):t.filter(sn)},nn=e=>{switch(e){case h.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:case h.DEPRECATED_TERMINBEKREFTELSE:case h.DEPRECATED_BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:case h.DEPRECATED_DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:return!1;default:return!0}},rn=e=>{switch(e){case h.ANNET:case h.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:case h.BEKREFTELSE_FRA_ARBEIDSGIVER:case h.BEKREFTELSE_PÅ_AVTALT_FERIE:case h.DOK_AV_ALENEOMSORG:case h.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:case h.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:case h.DOK_INNLEGGELSE_BARN:case h.DOK_INNLEGGELSE_MOR:case h.DOK_INNLEGGELSE_FAR:case h.DOK_SYKDOM_MOR:case h.DOK_SYKDOM_FAR:case h.DOK_UTDANNING_MOR:case h.DOK_UTDANNING_OG_ARBEID_MOR:case h.DOK_ARBEID_MOR:case h.OMSORGSOVERTAKELSE:case h.TILBAKEBETALING:case h.HV_ØVELSE:case h.NAV_TILTAK:case h.TERMINBEKREFTELSE:case h.DEPRECATED_TILBAKEBETALING:case h.DEPRECATED_KOPI_SKATTEMELDING:return!0;default:return!1}},sn=e=>{switch(e){case h.ANNET:case h.DOK_MILITÆR_SILVIL_TJENESTE:case h.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:case h.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:case h.TILBAKEBETALING:case h.TERMINBEKREFTELSE:case h.SKATTEMELDING:case h.RESULTATREGNSKAP:return!0;default:return!1}},on=e=>{switch(e){case h.ANNET:case h.TERMINBEKREFTELSE:case h.FØDSELSATTEST:case h.TILBAKEBETALING:return!0;default:return!1}},an=e=>e===K.ENGANGSSTØNAD?"engangsstonad":e===K.FORELDREPENGER?"foreldrepenger":"svangerskapspenger",Q="default",Oe=(e,t)=>t?w.jsxs(w.Fragment,{children:[w.jsx("option",{value:Q,disabled:!1,hidden:!1,children:w.jsx(Se,{id:"ettersendelse.select.defaultValue"})}),Re(t).map(n=>({skjemanummer:n,text:e.formatMessage({id:`ettersendelse.${n}`})})).sort((n,r)=>n.text.localeCompare(r.text)).map(({skjemanummer:n,text:r})=>w.jsx("option",{value:n,children:r},n))]}):null,dn=e=>{if(e===Q)return e;const t=Object.values(h).find(n=>n===e);if(t)return t;throw Error("Valgt skjemanr finnes ikke")},Ie=({saker:e})=>{const t=Ue();nt(`${t.formatMessage({id:"lastOppDokumenter"})} - ${t.formatMessage({id:"dineForeldrepenger"})}`),Ft(ie.ETTERSEND);const n=ze(),r=Ve("ettersending-page"),[o,p]=A.useState(!1),[u,m]=A.useState(!1),[_,S]=A.useState(void 0),[f,I]=A.useState(Q),[R,N]=A.useState([]),[G,B]=A.useState(!1),b=we(e).find(y=>y.saksnummer===n.saksnummer),M=(y,F)=>{N(y),B(F)},Y=y=>{y.preventDefault(),p(!0);const F={saksnummer:b.saksnummer,type:b.ytelse,vedlegg:R};St.sendEttersending(F).then(()=>{p(!1),m(!0)}).catch(W=>{p(!1),S("Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.")})};return u||_?w.jsxs(w.Fragment,{children:[w.jsx(qe,{}),w.jsxs(ce,{gap:"2",children:[u&&w.jsx(ue,{variant:"success",children:"Dokumentene er sendt"}),_&&w.jsx(ue,{variant:"error",children:_}),w.jsx(Je,{to:`/sak/${b.saksnummer}`,children:w.jsx(Se,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]})]}):w.jsx("form",{onSubmit:Y,children:w.jsxs(ce,{gap:"4",children:[w.jsx(Pe,{children:"Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din."}),w.jsx(he,{children:"Du kan laste opp dokumenter i formatene pdf, png og jpg."}),w.jsx(je,{target:"_blank",href:"https://www.nav.no/brukerstotte#sende-soknad-pa-nett",children:"Les om hvordan du kan ta bilde av dokumenter med mobilen"}),w.jsx(ot,{className:r.element("select"),label:"Hva inneholder dokumentene dine?",onChange:y=>I(dn(y.target.value)),children:Oe(t,b)}),f!==Q&&w.jsx(Ce,{updateAttachments:M,attachmentType:Ze.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:f,existingAttachments:R,saveAttachment:Xe(ae.REST_API_URL,an(b.ytelse)),skjemanummerTextMap:b?Re(b).reduce((y,F)=>({...y,[F]:t.formatMessage({id:`ettersendelse.${F}`})}),{}):void 0}),R&&R.length>0&&R.length<=40&&w.jsx(Ke,{children:w.jsx(He,{type:"submit",icon:w.jsx(tn,{"aria-hidden":!0}),loading:o||G,disabled:o||G,children:"Legg ved sak"})}),R&&R.length>40&&w.jsx(Qe,{children:"Du kan bare laste opp 40 dokumenter på en gang. Hvis du skal laste opp flere enn 40 dokumenter kan du gjøre det i flere omganger."})]})})},In=Ie;Oe.__docgenInfo={description:"",methods:[],displayName:"getAttachmentTypeSelectOptions"};Ie.__docgenInfo={description:"",methods:[],displayName:"EttersendingPage"};export{St as A,In as E,H as I,Mt as N,ie as O,L as R,_t as a,Gt as b,mn as c,zt as d,On as e,we as f,qt as g,_n as h,jt as i,vn as j,Sn as k,An as l,hn as m,Ft as n,nt as o,Rn as p,Xt as q,Kt as r,pn as s,kn as t,bt as u,Yt as v,Dn as w,Tn as x,wn as y,ee as z};
