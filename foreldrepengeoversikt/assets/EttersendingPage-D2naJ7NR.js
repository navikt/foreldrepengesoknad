import{c as q,k as ke,f as Ee,o as we,E as De,d as D,m as Re,n as Oe,p as Ie,q as Ne,r as Le,i as z,j as k,V as ae,B as be,L as Me,g as Ge,e as ye}from"./Link-6XJR653k.js";import{r as A,R as y}from"./index-DVXBtNgz.js";import{u as Fe,A as ie,M as ge,F as Pe,B as je}from"./infobox.module-CQRRBhhZ.js";import{u as Ke,c as Ve,g as W,S as p,d as Be,e as xe,L as He,A as Ue,f as Ce,G as $e}from"./ScrollToTop-CkIONejd.js";import{S as Ye,Y as F}from"./Ytelse-Dcr9dYDr.js";import{u as ze}from"./useId-DbilmxAP.js";const qe=e=>{A.useEffect(()=>{const t=document.title;return document.title=e,()=>{document.title=t}},[e])};var Je=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const We=A.forwardRef((e,t)=>{const{inputProps:n,errorId:r,showErrorMsg:o,hasError:g,size:c,inputDescriptionId:m,readOnly:v}=Ke(e,"select"),{children:w,label:S,className:P,description:L,htmlSize:G,hideLabel:K=!1,style:B}=e,H=Je(e,["children","label","className","description","htmlSize","hideLabel","style"]),I={onMouseDown:M=>{v&&(M.preventDefault(),M.target.focus())},onKeyDown:M=>{v&&["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"," "].includes(M.key)&&M.preventDefault()}};return y.createElement("div",{className:q(P,"navds-form-field",`navds-form-field--${c}`,{"navds-form-field--disabled":!!n.disabled,"navds-form-field--readonly":v,"navds-select--error":g,"navds-select--readonly":v})},y.createElement(ke,{htmlFor:n.id,size:c,className:q("navds-form-field__label",{"navds-sr-only":K})},y.createElement(Ve,{readOnly:v,nativeReadOnly:!1}),S),!!L&&y.createElement(Ee,{className:q("navds-form-field__description",{"navds-sr-only":K}),id:m,size:c,as:"div"},L),y.createElement("div",{className:"navds-select__container",style:B},y.createElement("select",Object.assign({},we(H,["error","errorId","size","readOnly"]),n,I,{ref:t,className:q("navds-select__input","navds-body-short",`navds-body-short--${c??"medium"}`),size:G}),w),y.createElement(Ye,{className:"navds-select__chevron","aria-hidden":!0})),y.createElement("div",{className:"navds-form-field__error",id:r,"aria-relevant":"additions removals","aria-live":"polite"},o&&y.createElement(De,{size:c},e.error)))});var b=(e=>(e.UNFETCHED="Unfetched",e.IN_PROGRESS="InProgress",e.FINISHED="Finished",e))(b||{});const me={config:{},isSuspended:!1},V=(e,t=me,n)=>{const[r,o]=A.useState(),[g,c]=A.useState(null),[m,v]=A.useState(b.UNFETCHED),w=W(n);return A.useEffect(()=>{!t.isSuspended&&m===b.UNFETCHED&&(v(b.IN_PROGRESS),w.get(e,t.config).then(S=>{S.data===""?o(void 0):o(S.data),v(b.FINISHED)}).catch(S=>{c(S),v(b.FINISHED)}))},[t,e,w,m]),{data:r,error:g,requestStatus:m}},Ze=(e,t,n=me)=>{const[r,o]=A.useState(),[g,c]=A.useState(null),[m,v]=A.useState(b.UNFETCHED),w=n.fnr?W(n.fnr):W();return A.useEffect(()=>{!n.isSuspended&&m===b.UNFETCHED&&(v(b.IN_PROGRESS),w.post(e,t,n.config).then(S=>{S.data===""?o(void 0):o(S.data),v(b.FINISHED)}).catch(S=>{c(S),v(b.FINISHED)}))},[n,e,w,m,t]),{data:r,error:g,requestStatus:m}},Xe=()=>{const{data:e,error:t}=V("/rest/sokerinfo",{config:{withCredentials:!0}});return{søkerinfoData:e,søkerinfoError:t}},Qe=e=>{const{data:t,error:n}=V("/rest/innsyn/v2/saker",{config:{withCredentials:!0},isSuspended:e});return{sakerData:t,sakerError:n}},et=()=>{const{data:e,error:t}=V("/rest/storage/aktive",{config:{withCredentials:!0},isSuspended:!0});return{storageData:e,storageError:t}},tt=(e,t,n,r)=>{var v;const o={annenPartFødselsnummer:e,barnFødselsnummer:t,familiehendelse:n},{data:g,error:c,requestStatus:m}=Ze("/rest/innsyn/v2/annenPartVedtak",o,{config:{withCredentials:!0},isSuspended:r});return(v=c==null?void 0:c.message)!=null&&v.includes("Ugyldig ident")?{annenPartsVedtakData:void 0,annenPartsVedtakError:void 0,annenPartsVedtakRequestStatus:b.FINISHED}:{annenPartsVedtakData:g,annenPartsVedtakError:c,annenPartsVedtakRequestStatus:m}},nt=e=>{const{data:t,error:n,requestStatus:r}=V("/rest/dokument/alle",{config:{withCredentials:!0,params:{saksnummer:e}}});return{dokumenterData:t,dokumenterError:n,dokumenterStatus:r}},rt=e=>{const{data:t,error:n}=V("/rest/innsyn/tidslinje",{config:{withCredentials:!0,params:{saksnummer:e}}});return{tidslinjeHendelserData:t,tidslinjeHendelserError:n}},st=()=>{const{data:e,error:t}=V("/rest/minidialog",{config:{withCredentials:!0}});return{minidialogData:e,minidialogError:t}},ot=e=>{const{data:t,error:n}=V("/rest/historikk/vedlegg",{config:{withCredentials:!0,params:{saksnummer:e}}});return{manglendeVedleggData:t,manglendeVedleggError:n}},at=(e,t)=>W(t).post("/rest/soknad/ettersend",e,{timeout:30*1e3,withCredentials:!0}),it=()=>{const{data:e,error:t}=V("/rest/innsyn/v2/saker/oppdatert",{config:{withCredentials:!0}});return{oppdatertData:e,oppdatertError:t}},dt={useSøkerinfo:Xe,useGetSaker:Qe,useGetDokumenter:nt,useGetAnnenPartsVedtak:tt,useGetTidslinjeHendelser:rt,useGetMinidialog:st,useGetManglendeVedlegg:ot,useErSakOppdatert:it,useGetMellomlagretSøknad:et,sendEttersending:at};var O={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1,STORYBOOK:"true"};let lt=0;function ct(e,t){const n=`atom${++lt}`,r={toString:()=>n};return typeof e=="function"?r.read=e:(r.init=e,r.read=ut,r.write=ft),r}function ut(e){return e(this)}function ft(e,t,n){return t(this,typeof n=="function"?n(e(this)):n)}const ee=(e,t)=>e.unstable_is?e.unstable_is(t):t===e,te=e=>"init"in e,ne=e=>!!e.write,Z=new WeakMap,Et=(e,t)=>{Z.set(e,t),e.catch(()=>{}).finally(()=>Z.delete(e))},de=(e,t)=>{const n=Z.get(e);n&&(Z.delete(e),n(t))},le=(e,t)=>{e.status="fulfilled",e.value=t},ce=(e,t)=>{e.status="rejected",e.reason=t},gt=e=>typeof(e==null?void 0:e.then)=="function",C=(e,t)=>!!e&&"v"in e&&"v"in t&&Object.is(e.v,t.v),ue=(e,t)=>!!e&&"e"in e&&"e"in t&&Object.is(e.e,t.e),x=e=>!!e&&"v"in e&&e.v instanceof Promise,mt=(e,t)=>"v"in e&&"v"in t&&e.v.orig&&e.v.orig===t.v.orig,J=e=>{if("e"in e)throw e.e;return e.v},St=()=>{const e=new WeakMap,t=new WeakMap,n=[],r=new WeakMap;let o,g;(O?"production":void 0)!=="production"&&(o=new Set,g=new Set);const c=s=>e.get(s),m=(s,i)=>{i.d.forEach((E,l)=>{if(!r.has(l)){const a=c(l);r.set(l,[a,new Set]),a&&m(l,a)}r.get(l)[1].add(s)})},v=(s,i)=>{var E;(O?"production":void 0)!=="production"&&Object.freeze(i);const l=c(s);if(e.set(s,i),(E=n[n.length-1])==null||E.add(s),r.has(s)||(r.set(s,[l,new Set]),m(s,i)),x(l)){const a="v"in i?i.v instanceof Promise?i.v:Promise.resolve(i.v):Promise.reject(i.e);l.v!==a&&de(l.v,a)}},w=(s,i,E,l)=>{const a=new Map(l?i.d:null);let d=!1;E.forEach((u,f)=>{!u&&ee(s,f)&&(u=i),u?(a.set(f,u),i.d.get(f)!==u&&(d=!0)):(O?"production":void 0)!=="production"&&console.warn("[Bug] atom state not found")}),(d||i.d.size!==a.size)&&(i.d=a)},S=(s,i,E,l)=>{const a=c(s),d={d:(a==null?void 0:a.d)||new Map,v:i};if(E&&w(s,d,E,l),C(a,d)&&a.d===d.d)return a;if(x(a)&&x(d)&&mt(a,d)){if(a.d===d.d)return a;d.v=a.v}return v(s,d),d},P=(s,i,E,l)=>{if(gt(i)){let a;const d=()=>{const f=c(s);if(!x(f)||f.v!==u)return;const _=S(s,u,E);t.has(s)&&f.d!==_.d&&j(s,_,f.d)},u=new Promise((f,_)=>{let h=!1;i.then(T=>{h||(h=!0,le(u,T),f(T),d())},T=>{h||(h=!0,ce(u,T),_(T),d())}),a=T=>{h||(h=!0,T.then(R=>le(u,R),R=>ce(u,R)),f(T))}});return u.orig=i,u.status="pending",Et(u,f=>{f&&a(f),l==null||l()}),S(s,u,E,!0)}return S(s,i,E)},L=(s,i,E)=>{const l=c(s),a={d:(l==null?void 0:l.d)||new Map,e:i};return E&&w(s,a,E),ue(l,a)&&l.d===a.d?l:(v(s,a),a)},G=(s,i)=>{const E=c(s);if(!(i!=null&&i(s))&&E&&(t.has(s)||Array.from(E.d).every(([h,T])=>{if(h===s)return!0;const R=G(h,i);return R===T||C(R,T)})))return E;const l=new Map;let a=!0;const d=h=>{if(ee(s,h)){const R=c(h);if(R)return l.set(h,R),J(R);if(te(h))return l.set(h,void 0),h.init;throw new Error("no atom init")}const T=G(h,i);return l.set(h,T),J(T)};let u,f;const _={get signal(){return u||(u=new AbortController),u.signal},get setSelf(){return(O?"production":void 0)!=="production"&&!ne(s)&&console.warn("setSelf function cannot be used with read-only atom"),!f&&ne(s)&&(f=(...h)=>{if((O?"production":void 0)!=="production"&&a&&console.warn("setSelf function cannot be called in sync"),!a)return I(s,...h)}),f}};try{const h=s.read(d,_);return P(s,h,l,()=>u==null?void 0:u.abort())}catch(h){return L(s,h,l)}finally{a=!1}},K=s=>J(G(s)),B=s=>{const i=f=>{var _,h;const T=new Set((_=t.get(f))==null?void 0:_.t);return(h=r.get(f))==null||h[1].forEach(R=>{T.add(R)}),T},E=new Array,l=new Set,a=f=>{if(!l.has(f)){l.add(f);for(const _ of i(f))f!==_&&a(_);E.push(f)}};a(s);const d=new Set([s]),u=f=>l.has(f);for(let f=E.length-1;f>=0;--f){const _=E[f],h=c(_);if(!h)continue;let T=!1;for(const R of h.d.keys())if(R!==_&&d.has(R)){T=!0;break}if(T){const R=G(_,u);m(_,R),C(h,R)||d.add(_)}l.delete(_)}},H=(s,...i)=>{const E=d=>J(G(d)),l=(d,...u)=>{const f=n.length>0;f||n.push(new Set([d]));let _;if(ee(s,d)){if(!te(d))throw new Error("atom not writable");const h=c(d),T=P(d,u[0]);C(h,T)||B(d)}else _=H(d,...u);if(!f){const h=U(n.pop());(O?"production":void 0)!=="production"&&o.forEach(T=>T({type:"async-write",flushed:h}))}return _};return s.write(E,l,...i)},I=(s,...i)=>{n.push(new Set([s]));const E=H(s,...i),l=U(n.pop());return(O?"production":void 0)!=="production"&&o.forEach(a=>a({type:"write",flushed:l})),E},M=(s,i,E)=>{var l;const a=t.get(s);if(a)return i&&a.t.add(i),a;const d=E||[];(l=c(s))==null||l.d.forEach((f,_)=>{_!==s&&M(_,s,d)}),G(s);const u={t:new Set(i&&[i]),l:new Set};if(t.set(s,u),(O?"production":void 0)!=="production"&&g.add(s),ne(s)&&s.onMount){const{onMount:f}=s;d.push(()=>{const _=f((...h)=>I(s,...h));_&&(u.u=_)})}return E||d.forEach(f=>f()),u},Q=(s,i)=>!i.l.size&&(!i.t.size||i.t.size===1&&i.t.has(s)),N=(s,i)=>{if(!Q(s,i))return;const E=i.u;E&&E(),t.delete(s),(O?"production":void 0)!=="production"&&g.delete(s);const l=c(s);l?(x(l)&&de(l.v),l.d.forEach((a,d)=>{if(d!==s){const u=t.get(d);u&&(u.t.delete(s),N(d,u))}})):(O?"production":void 0)!=="production"&&console.warn("[Bug] could not find atom state to unmount",s)},j=(s,i,E)=>{const l=new Set(i.d.keys()),a=new Set;E==null||E.forEach((d,u)=>{if(l.has(u)){l.delete(u);return}a.add(u);const f=t.get(u);f&&f.t.delete(s)}),l.forEach(d=>{M(d,s)}),a.forEach(d=>{const u=t.get(d);u&&N(d,u)})},U=s=>{let i;(O?"production":void 0)!=="production"&&(i=new Set);const E=[],l=a=>{var d;if(!r.has(a))return;const[u,f]=r.get(a);r.delete(a),E.push([a,u]),f.forEach(l),(d=c(a))==null||d.d.forEach((_,h)=>l(h))};if(s.forEach(l),E.forEach(([a,d])=>{const u=c(a);if(!u){(O?"production":void 0)!=="production"&&console.warn("[Bug] no atom state to flush");return}if(u!==d){const f=t.get(a);f&&u.d!==(d==null?void 0:d.d)&&j(a,u,d==null?void 0:d.d),f&&!(!x(d)&&(C(d,u)||ue(d,u)))&&(f.l.forEach(_=>_()),(O?"production":void 0)!=="production"&&i.add(a))}}),(O?"production":void 0)!=="production")return i},oe=(s,i)=>{const E=M(s),l=U([s]),a=E.l;return a.add(i),(O?"production":void 0)!=="production"&&o.forEach(d=>d({type:"sub",flushed:l})),()=>{a.delete(i),N(s,E),(O?"production":void 0)!=="production"&&o.forEach(d=>d({type:"unsub"}))}};return(O?"production":void 0)!=="production"?{get:K,set:I,sub:oe,dev_subscribe_store:s=>(o.add(s),()=>{o.delete(s)}),dev_get_mounted_atoms:()=>g.values(),dev_get_atom_state:s=>e.get(s),dev_get_mounted:s=>t.get(s),dev_restore_atoms:s=>{n.push(new Set);for(const[E,l]of s)te(E)&&(P(E,l),B(E));const i=U(n.pop());o.forEach(E=>E({type:"restore",flushed:i}))}}:{get:K,set:I,sub:oe}};let $;const pt=()=>($||($=St(),(O?"production":void 0)!=="production"&&(globalThis.__JOTAI_DEFAULT_STORE__||(globalThis.__JOTAI_DEFAULT_STORE__=$),globalThis.__JOTAI_DEFAULT_STORE__!==$&&console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"))),$),ht=pt;var vt={BASE_URL:"./",MODE:"production",DEV:!1,PROD:!0,SSR:!1,STORYBOOK:"true"};const _t=A.createContext(void 0),Se=e=>A.useContext(_t)||ht(),At=e=>typeof(e==null?void 0:e.then)=="function",Tt=y.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)});function kt(e,t){const n=Se(),[[r,o,g],c]=A.useReducer(w=>{const S=n.get(e);return Object.is(w[0],S)&&w[1]===n&&w[2]===e?w:[S,n,e]},void 0,()=>[n.get(e),n,e]);let m=r;return(o!==n||g!==e)&&(c(),m=n.get(e)),A.useEffect(()=>{const w=n.sub(e,()=>{c()});return c(),w},[n,e,void 0]),A.useDebugValue(m),At(m)?Tt(m):m}function wt(e,t){const n=Se();return A.useCallback((...o)=>{if((vt?"production":void 0)!=="production"&&!("write"in e))throw new Error("not writable atom");return n.set(e,...o)},[n,e])}var se=(e=>(e.HOVEDSIDE="/",e.SAKSOVERSIKT="/sak",e.DIN_PLAN="din-plan",e.DOKUMENTER="dokumenter",e.ETTERSEND="ettersend",e.TIDSLINJEN="tidslinjen",e.OPPGAVER="oppgaver",e))(se||{}),Dt=(e=>(e.SAKSBEHANDLINGSTIDER="https://www.nav.no/saksbehandlingstider",e.SAKSBEHANDLINGSTIDER_FP="https://www.nav.no/saksbehandlingstider#foreldrepenger",e.SAKSBEHANDLINGSTIDER_SVP="https://www.nav.no/saksbehandlingstider#svangerskapspenger",e.SAKSBEHANDLINGSTIDER_ES="https://www.nav.no/saksbehandlingstider#engangsstonad",e.KLAGERETTIGHETER="https://www.nav.no/klage",e.KLAGERETTIGHETER_FP="https://www.nav.no/klage#foreldrepenger",e.KLAGERETTIGHETER_SVP="https://www.nav.no/klage#svangerskapspenger",e.KLAGERETTIGHETER_ES="https://www.nav.no/klage#engangsstonad",e.CHAT_MED_OSS="https://www.nav.no/person/kontakt-oss/chat/familie",e.SKRIV_TIL_OSS="https://innboks.nav.no/s/skriv-til-oss?category=Familie",e.RING_OSS="tel:55553333",e.SE_FLERE_TLF_NR_OG_TASTEVALG="https://www.nav.no/kontaktoss#ring-oss",e.LES_MER_OM_VÅRE_PENGESTØTTER="https://www.nav.no/barn",e.LES_MER_OM_FORELDREPENGER="https://www.nav.no/foreldrepenger",e.LES_MER_OM_SVANGERSKAPSPENGER="https://familie.nav.no/om-svangerskapspenger",e.LES_MER_OM_ENGANGSTØNAD="https://familie.nav.no/om-engangsstonad",e.MELD_FRA_OM_ENDRINGER="https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",e.VENT_INNTEKTSMELDING="https://www.nav.no/arbeidsgiver/inntektsmelding",e.VENT_MELDEKORT="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det",e.SØKNADSFRISTER="https://www.nav.no/foreldrepenger#for-soknad",e.FORELDREPENGESOKNAD="https://foreldrepengesoknad.nav.no",e.HVOR_LENGE="https://www.nav.no/foreldrepenger#hvor-lenge",e))(Dt||{});const pe=ct(se.HOVEDSIDE),tn=()=>kt(pe),Rt=e=>{const t=wt(pe);A.useEffect(()=>{t(e)},[t,e])};D.extend(Re);D.extend(Oe);D.extend(Ie);D.extend(Ne);const Ot=(e,t)=>D(e).format(t||"dddd D. MMMM YYYY"),nn=e=>Ot(e,"KL.HH:mm"),rn=e=>e.format("MMM").substr(0,3),It=e=>{const t=Math.floor(e/5);return{dager:e-t*5,uker:t}},sn=(e,t,n="full")=>{const{uker:r,dager:o}=It(Math.abs(e)),g=t.formatMessage({id:"varighet.dager"},{dager:o});if(r===0)return g;const c=t.formatMessage({id:"varighet.uker"},{uker:r});if(o>0){const m=n==="full"?t.formatMessage({id:"varighet.separator--full"}):t.formatMessage({id:"varighet.separator--normal"});return`${c}${m}${g}`}return c},Nt=e=>e.fom!==void 0&&e.tom!==void 0&&D(e.fom).isSameOrBefore(e.tom,"day"),fe=e=>D(e).isoWeekday(),Lt=e=>fe(e)!==6&&fe(e)!==7,on=e=>{if(!Nt(e))return 0;let t=D(e.fom);const n=D(e.tom);let r=0;for(;t.isSameOrBefore(n,"day");)Lt(t.toDate())&&r++,t=t.add(24,"hours");return r},Y=e=>{if(e!==void 0&&Le(e)&&D(e,"YYYY-MM-DD",!0).isValid())return D.utc(e).toDate()},bt=(e,t)=>e===void 0||t===void 0?!1:D(e).isSameOrAfter(D(t).subtract(1,"day"),"day")&&D(e).isSameOrBefore(D(t).add(1,"day"),"day"),an=(e,t,n)=>{const r=!e.sakTilhørerMor;return{farMedmor:r?t:n,mor:r?n:t}},Mt=e=>!e.dødsdato,he=e=>[...e.engangsstønad,...e.foreldrepenger,...e.svangerskapspenger];function Gt(e,t){return D(e.fødselsdato).isAfter(t.fødselsdato,"d")?1:D(e.fødselsdato).isBefore(t.fødselsdato,"d")||e.fornavn<t.fornavn?-1:1}const dn=e=>{var t;if(e.gjeldendeVedtak&&e.gjeldendeVedtak.perioder.length>0)return Y(e.gjeldendeVedtak.perioder[0].fom);if(e.åpenBehandling&&e.åpenBehandling.søknadsperioder)return Y((t=e.åpenBehandling)==null?void 0:t.søknadsperioder[0].fom)},yt=(e,t)=>{const n=e.ytelse===F.FORELDREPENGER,r=n&&e.barn!==void 0?e.barn.map(S=>S.fnr).flat():[],o=n&&t?t.filter(S=>r.includes(S.fnr)):[],g=Y(e.familiehendelse.fødselsdato),c=g!==void 0&&t?t.filter(S=>bt(Y(S.fødselsdato),g)&&!(o!=null&&o.find(P=>P.fnr===S.fnr))):[],m=o.concat(c);m.sort(Gt);const v=m.filter(S=>S.fødselsdato!==void 0).map(S=>Y(S.fødselsdato));let w=[];return v&&v.length>0?w=v:g&&(w=[g]),{fornavn:m==null?void 0:m.filter(S=>S.fornavn!==void 0&&S.fornavn.trim()!=="").map(S=>[S.fornavn,S.mellomnavn!==void 0?S.mellomnavn:""].join(" ")),fødselsdatoer:w,alleBarnaLever:!!(m!=null&&m.every(S=>Mt(S)))}},ln=(e,t)=>he(t).reduce((r,o)=>{if(o.familiehendelse){const g=jt(o.familiehendelse),c=r.find(m=>Ft(m,g));if(c&&c.saker.push(o),c&&r.includes(c))return r;{const m=Pt(o.familiehendelse,o.gjelderAdopsjon),v={antallBarn:o.familiehendelse.antallBarn,familiehendelsedato:g,saker:[o],type:m,ytelse:o.ytelse,barn:m!=="termin"?yt(o,e):void 0};return r.push(v),r}}else return r},[]),re=(e,t)=>t===F.ENGANGSSTØNAD?e.map(n=>({...n,ytelse:t})):t===F.SVANGERSKAPSPENGER?e.map(n=>({...n,ytelse:t})):e.map(n=>({...n,ytelse:t})),cn=e=>({foreldrepenger:re(e.foreldrepenger,F.FORELDREPENGER),engangsstønad:re(e.engangsstønad,F.ENGANGSSTØNAD),svangerskapspenger:re(e.svangerskapspenger,F.SVANGERSKAPSPENGER)}),un=e=>{const{foreldrepenger:t,svangerskapspenger:n,engangsstønad:r}=e;return t.length+n.length+r.length},Ft=(e,t)=>{const n=D(t).subtract(2,"months"),r=D(t).add(3,"weeks");if(e)return D(e.familiehendelsedato).isAfter(n)&&D(e.familiehendelsedato).isSameOrBefore(r)},Pt=(e,t)=>{if(t)return"adopsjon";const{fødselsdato:n}=e;return n?"fødsel":"termin"},jt=e=>{const{fødselsdato:t,termindato:n,omsorgsovertakelse:r}=e;return r||t||n},fn=(e,t)=>{const n=t&&t.familiehendelse?t.familiehendelse.fødselsdato:void 0,r=e.søker.barn&&n?e.søker.barn.find(g=>D(g.fødselsdato).isSame(n,"d")):void 0,o=r&&r.annenForelder?r.annenForelder.fornavn:void 0;return o!==void 0&&o.trim()!==""?o:"Annen forelder"},Kt=(e,t)=>e===1||e===0?t.formatMessage({id:"barn"}):e===2?t.formatMessage({id:"tvillinger"}):e===3?t.formatMessage({id:"trillinger"}):t.formatMessage({id:"flerlinger"}),ve=e=>{if(e===void 0)return;const t=[];if(e.forEach(n=>{t.find(o=>D(o).isSame(n,"day"))===void 0&&t.push(n)}),t.length>1){const n=t.map(g=>z(g)),r=n.slice(0,-1).join(", "),o=n[n.length-1];return`${r} og ${o}`}return z(t[0])},Vt=(e,t,n,r,o)=>{const g=Kt(n,r);if(n===0&&t===void 0||o==="termin")return r.formatMessage({id:"barnHeader.terminBarn"},{barnTekst:g,termindato:z(e)});if(o==="adopsjon")return r.formatMessage({id:"barnHeader.adoptertBarn"},{adopsjonsdato:z(e)});{const c=ve(t);return t!==void 0&&t.length>0?r.formatMessage({id:"barnHeader.fødtBarn"},{barnTekst:g,fødselsdatoTekst:c}):""}},Bt=e=>{if(e.length>1){const t=e.map(r=>r.trim()).slice(0,-1).join(", "),n=e[e.length-1];return`${t} og ${n}`}else return`${e[0]}`},En=(e,t,n,r,o,g,c)=>{if(e===void 0||e.length===0||!r)return Vt(n,t,o,g,c);const m=Bt(e);if(c==="fødsel"){const v=ve(t);return`${m} født ${v}`}return c==="adopsjon"?`${m} adoptert ${z(n)}`:""};var xt=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};const Ht=A.forwardRef((e,t)=>{var{title:n,titleId:r}=e,o=xt(e,["title","titleId"]);let g=ze();return g=n?r||"title-"+g:void 0,A.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":g},o),n?A.createElement("title",{id:g},n):null,A.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11 13v8h2v-8h8v-2h-8V3h-2v8H3v2h8Z",fill:"currentColor"}))}),_e=e=>{const t=Object.values(p);return e.ytelse===F.FORELDREPENGER?e.kanSøkeOmEndring?t.filter(Ct):t.filter(Ut):e.ytelse===F.ENGANGSSTØNAD?t.filter(Yt):t.filter($t)},Ut=e=>{switch(e){case p.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:case p.DEPRECATED_TERMINBEKREFTELSE:case p.DEPRECATED_BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:case p.DEPRECATED_DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:return!1;default:return!0}},Ct=e=>{switch(e){case p.ANNET:case p.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:case p.BEKREFTELSE_FRA_ARBEIDSGIVER:case p.BEKREFTELSE_PÅ_AVTALT_FERIE:case p.DOK_AV_ALENEOMSORG:case p.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:case p.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:case p.DOK_INNLEGGELSE_BARN:case p.DOK_INNLEGGELSE_MOR:case p.DOK_INNLEGGELSE_FAR:case p.DOK_SYKDOM_MOR:case p.DOK_SYKDOM_FAR:case p.DOK_UTDANNING_MOR:case p.DOK_UTDANNING_OG_ARBEID_MOR:case p.DOK_ARBEID_MOR:case p.OMSORGSOVERTAKELSE:case p.TILBAKEBETALING:case p.HV_ØVELSE:case p.NAV_TILTAK:case p.TERMINBEKREFTELSE:case p.DEPRECATED_TILBAKEBETALING:case p.DEPRECATED_KOPI_SKATTEMELDING:return!0;default:return!1}},$t=e=>{switch(e){case p.ANNET:case p.DOK_MILITÆR_SILVIL_TJENESTE:case p.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:case p.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:case p.TILBAKEBETALING:case p.TERMINBEKREFTELSE:case p.SKATTEMELDING:case p.RESULTATREGNSKAP:return!0;default:return!1}},Yt=e=>{switch(e){case p.ANNET:case p.TERMINBEKREFTELSE:case p.FØDSELSATTEST:case p.TILBAKEBETALING:return!0;default:return!1}},zt=e=>e===F.ENGANGSSTØNAD?"engangsstonad":e===F.FORELDREPENGER?"foreldrepenger":"svangerskapspenger",X="default",Ae=(e,t)=>t?k.jsxs(k.Fragment,{children:[k.jsx("option",{value:X,disabled:!1,hidden:!1,children:k.jsx(ge,{id:"ettersendelse.select.defaultValue"})}),_e(t).map(n=>({skjemanummer:n,text:e.formatMessage({id:`ettersendelse.${n}`})})).sort((n,r)=>n.text.localeCompare(r.text)).map(({skjemanummer:n,text:r})=>k.jsx("option",{value:n,children:r},n))]}):null,qt=e=>{if(e===X)return e;const t=Object.values(p).find(n=>n===e);if(t)return t;throw Error("Valgt skjemanr finnes ikke")},Te=({saker:e})=>{const t=Fe();qe(`${t.formatMessage({id:"lastOppDokumenter"})} - ${t.formatMessage({id:"dineForeldrepenger"})}`),Rt(se.ETTERSEND);const n=Be(),r=ye("ettersending-page"),[o,g]=A.useState(!1),[c,m]=A.useState(!1),[v,w]=A.useState(void 0),[S,P]=A.useState(X),[L,G]=A.useState([]),[K,B]=A.useState(!1),I=he(e).find(N=>N.saksnummer===n.saksnummer),M=(N,j)=>{G(N),B(j)},Q=N=>{N.preventDefault(),g(!0);const j={saksnummer:I.saksnummer,type:I.ytelse,vedlegg:L};dt.sendEttersending(j).then(()=>{g(!1),m(!0)}).catch(U=>{g(!1),w("Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.")})};return c||v?k.jsxs(k.Fragment,{children:[k.jsx(xe,{}),k.jsxs(ae,{gap:"2",children:[c&&k.jsx(ie,{variant:"success",children:"Dokumentene er sendt"}),v&&k.jsx(ie,{variant:"error",children:v}),k.jsx(He,{to:`/sak/${I.saksnummer}`,children:k.jsx(ge,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]})]}):k.jsx("form",{onSubmit:Q,children:k.jsxs(ae,{gap:"4",children:[k.jsx(be,{children:"Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din."}),k.jsx(Ee,{children:"Du kan laste opp dokumenter i formatene pdf, png og jpg."}),k.jsx(Me,{target:"_blank",href:"https://www.nav.no/brukerstotte#sende-soknad-pa-nett",children:"Les om hvordan du kan ta bilde av dokumenter med mobilen"}),k.jsx(We,{className:r.element("select"),label:"Hva inneholder dokumentene dine?",onChange:N=>P(qt(N.target.value)),children:Ae(t,I)}),S!==X&&k.jsx(Pe,{updateAttachments:M,attachmentType:Ue.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:S,existingAttachments:L,saveAttachment:Ce(zt(I.ytelse)),skjemanummerTextMap:I?_e(I).reduce((N,j)=>({...N,[j]:t.formatMessage({id:`ettersendelse.${j}`})}),{}):void 0}),L&&L.length>0&&L.length<=40&&k.jsx(Ge,{children:k.jsx(je,{type:"submit",icon:k.jsx(Ht,{"aria-hidden":!0}),loading:o||K,disabled:o||K,children:"Legg ved sak"})}),L&&L.length>40&&k.jsx($e,{children:"Du kan bare laste opp 40 dokumenter på en gang. Hvis du skal laste opp flere enn 40 dokumenter kan du gjøre det i flere omganger."})]})})},gn=Te;Ae.__docgenInfo={description:"",methods:[],displayName:"getAttachmentTypeSelectOptions"};Te.__docgenInfo={description:"",methods:[],displayName:"EttersendingPage"};export{dt as A,gn as E,Y as I,Dt as N,se as O,b as R,ct as a,wt as b,tn as c,Pt as d,En as e,on as f,jt as g,sn as h,an as i,Rt as j,qe as k,fn as l,rn as m,he as n,Bt as o,Ot as p,nn as q,dn as r,yt as s,un as t,kt as u,ln as v,cn as w};
