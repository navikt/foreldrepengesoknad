import{u as Re,d as A,i as _e,a as Ae,b as De,e as Te,f as ke,g as x,h as M,k as we,j as _,F as Ee,B as Le,l as Ie,L as Ne,S as Pe,m as Me,G as be,n as Fe}from"./index-b2d669dc.js";import{r as O,R as Ve}from"./index-1b03fe98.js";import{b as Ge,E as ee,Y as N,S as h,u as Be,c as ye,d as je,V as re,A as se,L as Ke,F as Ue,e as xe,g as Ye,H as He}from"./attachmentApi-d56f253c.js";import"./_baseToString-128d9545.js";import"./_createSet-13e922ed.js";var Ce=globalThis&&globalThis.__rest||function(e,t){var n={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(n[s]=e[s]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,s=Object.getOwnPropertySymbols(e);a<s.length;a++)t.indexOf(s[a])<0&&Object.prototype.propertyIsEnumerable.call(e,s[a])&&(n[s[a]]=e[s[a]]);return n};const $e=O.forwardRef((e,t)=>{var{title:n,titleId:s}=e,a=Ce(e,["title","titleId"]);let l=Re();return l=n?s||"title-"+l:void 0,O.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:t,"aria-labelledby":l},a),n?O.createElement("title",{id:l},n):null,O.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11 13v8h2v-8h8v-2h-8V3h-2v8H3v2h8Z",fill:"currentColor"}))}),qe=$e;var w=(e=>(e.UNFETCHED="Unfetched",e.IN_PROGRESS="InProgress",e.FINISHED="Finished",e))(w||{});const Je=ee.REST_API_URL,W=Ge.create({baseURL:Je}),C=e=>(W.interceptors.request.use(t=>(t.timeout=60*1e3,e&&(t.headers.fnr=e),t)),W.interceptors.response.use(t=>t,t=>Promise.reject(t)),W),Se=()=>{window.location.href=ee.LOGIN_URL+"?redirect="+window.location.origin},ge={config:{},isSuspended:!1},F=(e,t=ge,n)=>{const[s,a]=O.useState(),[l,m]=O.useState(null),[S,v]=O.useState(w.UNFETCHED),D=C(n);return O.useEffect(()=>{!t.isSuspended&&S===w.UNFETCHED&&(v(w.IN_PROGRESS),D.get(e,t.config).then(f=>{f.data===""?a(void 0):a(f.data),v(w.FINISHED)}).catch(f=>{f.response&&(f.response.status===401||f.response.status===403)?Se():m(f),v(w.FINISHED)}))},[t,e,D,S]),{data:s,error:l,requestStatus:S}},ze=(e,t,n=ge)=>{const[s,a]=O.useState(),[l,m]=O.useState(null),[S,v]=O.useState(w.UNFETCHED),D=n.fnr?C(n.fnr):C();return O.useEffect(()=>{!n.isSuspended&&S===w.UNFETCHED&&(v(w.IN_PROGRESS),D.post(e,t,n.config).then(f=>{f.data===""?a(void 0):a(f.data),v(w.FINISHED)}).catch(f=>{f.response&&(f.response.status===401||f.response.status===403)?Se():m(f),v(w.FINISHED)}))},[n,e,D,S,t]),{data:s,error:l,requestStatus:S}},We=()=>{const{data:e,error:t}=F("/sokerinfo",{config:{withCredentials:!0}});return{søkerinfoData:e,søkerinfoError:t}},Ze=e=>{const{data:t,error:n}=F("/innsyn/v2/saker",{config:{withCredentials:!0},isSuspended:e});return{sakerData:t,sakerError:n}},Xe=()=>{const{data:e,error:t}=F("/storage/aktive",{config:{withCredentials:!0},isSuspended:!0});return{storageData:e,storageError:t}},Qe=(e,t,n,s)=>{const a={annenPartFødselsnummer:e,barnFødselsnummer:t,familiehendelse:n},{data:l,error:m,requestStatus:S}=ze("/innsyn/v2/annenPartVedtak",a,{config:{withCredentials:!0},isSuspended:s});return m&&m.message.includes("Ugyldig ident")?{annenPartsVedtakData:void 0,annenPartsVedtakError:void 0,annenPartsVedtakRequestStatus:w.FINISHED}:{annenPartsVedtakData:l,annenPartsVedtakError:m,annenPartsVedtakRequestStatus:S}},et=e=>{const{data:t,error:n,requestStatus:s}=F("/dokument/alle",{config:{withCredentials:!0,params:{saksnummer:e}}});return{dokumenterData:t,dokumenterError:n,dokumenterStatus:s}},tt=e=>{const{data:t,error:n}=F("/innsyn/tidslinje",{config:{withCredentials:!0,params:{saksnummer:e}}});return{tidslinjeHendelserData:t,tidslinjeHendelserError:n}},nt=()=>{const{data:e,error:t}=F("/minidialog",{config:{withCredentials:!0}});return{minidialogData:e,minidialogError:t}},rt=e=>{const{data:t,error:n}=F("/historikk/vedlegg",{config:{withCredentials:!0,params:{saksnummer:e}}});return{manglendeVedleggData:t,manglendeVedleggError:n}},st=(e,t)=>C(t).post("/soknad/ettersend",e,{timeout:30*1e3,withCredentials:!0}),ot=()=>{const{data:e,error:t}=F("/innsyn/v2/saker/oppdatert",{config:{withCredentials:!0}});return{oppdatertData:e,oppdatertError:t}},at={useSøkerinfo:We,useGetSaker:Ze,useGetDokumenter:et,useGetAnnenPartsVedtak:Qe,useGetTidslinjeHendelser:tt,useGetMinidialog:nt,useGetManglendeVedlegg:rt,useErSakOppdatert:ot,useGetMellomlagretSøknad:Xe,sendEttersending:st};let it=0;function dt(e,t){const n=`atom${++it}`,s={toString:()=>n};return typeof e=="function"?s.read=e:(s.init=e,s.read=function(a){return a(this)},s.write=function(a,l,m){return l(this,typeof m=="function"?m(a(this)):m)}),t&&(s.write=t),s}const oe=e=>"init"in e,ae=e=>!!e.write,$=new WeakMap,lt=(e,t)=>{$.set(e,t),e.catch(()=>{}).finally(()=>$.delete(e))},ie=(e,t)=>{const n=$.get(e);n&&($.delete(e),n(t))},de=(e,t)=>{e.status="fulfilled",e.value=t},le=(e,t)=>{e.status="rejected",e.reason=t},ut=e=>typeof(e==null?void 0:e.then)=="function",K=(e,t)=>!!e&&"v"in e&&"v"in t&&Object.is(e.v,t.v),ue=(e,t)=>!!e&&"e"in e&&"e"in t&&Object.is(e.e,t.e),B=e=>!!e&&"v"in e&&e.v instanceof Promise,ct=(e,t)=>"v"in e&&"v"in t&&e.v.orig&&e.v.orig===t.v.orig,H=e=>{if("e"in e)throw e.e;return e.v},ft=()=>{const e=new WeakMap,t=new WeakMap,n=new Map;let s,a;const l=r=>e.get(r),m=(r,i)=>{const u=e.get(r);if(e.set(r,i),n.has(r)||n.set(r,u),B(u)){const o="v"in i?i.v instanceof Promise?i.v:Promise.resolve(i.v):Promise.reject(i.e);u.v!==o&&ie(u.v,o)}},S=(r,i,u)=>{const o=new Map;let c=!1;u.forEach((g,d)=>{!g&&d===r&&(g=i),g&&(o.set(d,g),i.d.get(d)!==g&&(c=!0))}),(c||i.d.size!==o.size)&&(i.d=o)},v=(r,i,u)=>{const o=l(r),c={d:(o==null?void 0:o.d)||new Map,v:i};if(u&&S(r,c,u),K(o,c)&&o.d===c.d)return o;if(B(o)&&B(c)&&ct(o,c)){if(o.d===c.d)return o;c.v=o.v}return m(r,c),c},D=(r,i,u,o)=>{if(ut(i)){let c;const g=()=>{const E=l(r);if(!B(E)||E.v!==d)return;const T=v(r,d,u);t.has(r)&&E.d!==T.d&&G(r,T,E.d)},d=new Promise((E,T)=>{let p=!1;i.then(R=>{p||(p=!0,de(d,R),E(R),g())},R=>{p||(p=!0,le(d,R),T(R),g())}),c=R=>{p||(p=!0,R.then(k=>de(d,k),k=>le(d,k)),E(R))}});return d.orig=i,d.status="pending",lt(d,E=>{E&&c(E),o==null||o()}),v(r,d,u)}return v(r,i,u)},f=(r,i,u)=>{const o=l(r),c={d:(o==null?void 0:o.d)||new Map,e:i};return u&&S(r,c,u),ue(o,c)&&o.d===c.d?o:(m(r,c),c)},I=(r,i)=>{const u=l(r);if(!i&&u&&(t.has(r)||Array.from(u.d).every(([p,R])=>{if(p===r)return!0;const k=I(p);return k===R||K(k,R)})))return u;const o=new Map;let c=!0;const g=p=>{if(p===r){const k=l(p);if(k)return o.set(p,k),H(k);if(oe(p))return o.set(p,void 0),p.init;throw new Error("no atom init")}const R=I(p);return o.set(p,R),H(R)};let d,E;const T={get signal(){return d||(d=new AbortController),d.signal},get setSelf(){return!E&&ae(r)&&(E=(...p)=>{if(!c)return y(r,...p)}),E}};try{const p=r.read(g,T);return D(r,p,o,()=>d==null?void 0:d.abort())}catch(p){return f(r,p,o)}finally{c=!1}},P=r=>H(I(r)),J=r=>{let i=t.get(r);return i||(i=j(r)),i},V=(r,i)=>!i.l.size&&(!i.t.size||i.t.size===1&&i.t.has(r)),z=r=>{const i=t.get(r);i&&V(r,i)&&L(r)},ne=r=>{const i=new Map,u=new WeakMap,o=d=>{var E;const T=new Set((E=t.get(d))==null?void 0:E.t);return n.forEach((p,R)=>{var k;(k=l(R))!=null&&k.d.has(d)&&T.add(R)}),T},c=d=>{o(d).forEach(E=>{E!==d&&(i.set(E,(i.get(E)||new Set).add(d)),u.set(E,(u.get(E)||0)+1),c(E))})};c(r);const g=d=>{o(d).forEach(E=>{var T;if(E!==d){let p=u.get(E);if(p&&u.set(E,--p),!p){let R=!!((T=i.get(E))!=null&&T.size);if(R){const k=l(E),Oe=I(E,!0);R=!K(k,Oe)}R||i.forEach(k=>k.delete(E))}g(E)}})};g(r)},b=(r,...i)=>{let u=!0;const o=d=>H(I(d)),c=(d,...E)=>{let T;if(d===r){if(!oe(d))throw new Error("atom not writable");const p=l(d),R=D(d,E[0]);K(p,R)||ne(d)}else T=b(d,...E);if(!u){const p=Y()}return T},g=r.write(o,c,...i);return u=!1,g},y=(r,...i)=>{const u=b(r,...i),o=Y();return u},j=(r,i,u)=>{var o;const c=u||[];(o=l(r))==null||o.d.forEach((d,E)=>{const T=t.get(E);T?T.t.add(r):E!==r&&j(E,r,c)}),I(r);const g={t:new Set(i&&[i]),l:new Set};if(t.set(r,g),ae(r)&&r.onMount){const{onMount:d}=r;c.push(()=>{const E=d((...T)=>y(r,...T));E&&(g.u=E)})}return u||c.forEach(d=>d()),g},L=r=>{var i;const u=(i=t.get(r))==null?void 0:i.u;u&&u(),t.delete(r);const o=l(r);o&&(B(o)&&ie(o.v),o.d.forEach((c,g)=>{if(g!==r){const d=t.get(g);d&&(d.t.delete(r),V(g,d)&&L(g))}}))},G=(r,i,u)=>{const o=new Set(i.d.keys());u==null||u.forEach((c,g)=>{if(o.has(g)){o.delete(g);return}const d=t.get(g);d&&(d.t.delete(r),V(g,d)&&L(g))}),o.forEach(c=>{const g=t.get(c);g?g.t.add(r):t.has(r)&&j(c,r)})},Y=()=>{let r;for(;n.size;){const i=Array.from(n);n.clear(),i.forEach(([u,o])=>{const c=l(u);if(c){const g=t.get(u);g&&c.d!==(o==null?void 0:o.d)&&G(u,c,o==null?void 0:o.d),g&&!(!B(o)&&(K(o,c)||ue(o,c)))&&g.l.forEach(d=>d())}})}};return{get:P,set:y,sub:(r,i)=>{const u=J(r),o=Y(),c=u.l;return c.add(i),()=>{c.delete(i),z(r)}}}};let Z;const Et=()=>(Z||(Z=ft()),Z),St=O.createContext(void 0),me=e=>{const t=O.useContext(St);return(e==null?void 0:e.store)||t||Et()},gt=e=>typeof(e==null?void 0:e.then)=="function",mt=Ve.use||(e=>{if(e.status==="pending")throw e;if(e.status==="fulfilled")return e.value;throw e.status==="rejected"?e.reason:(e.status="pending",e.then(t=>{e.status="fulfilled",e.value=t},t=>{e.status="rejected",e.reason=t}),e)});function pt(e,t){const n=me(t),[[s,a,l],m]=O.useReducer(D=>{const f=n.get(e);return Object.is(D[0],f)&&D[1]===n&&D[2]===e?D:[f,n,e]},void 0,()=>[n.get(e),n,e]);let S=s;(a!==n||l!==e)&&(m(),S=n.get(e));const v=t==null?void 0:t.delay;return O.useEffect(()=>{const D=n.sub(e,()=>{if(typeof v=="number"){setTimeout(m,v);return}m()});return m(),D},[n,e,v]),O.useDebugValue(S),gt(S)?mt(S):S}function ht(e,t){const n=me(t);return O.useCallback((...a)=>n.set(e,...a),[n,e])}var te=(e=>(e.HOVEDSIDE="/",e.SAKSOVERSIKT="/sak",e.DIN_PLAN="din-plan",e.DOKUMENTER="dokumenter",e.ETTERSEND="ettersend",e.TIDSLINJEN="tidslinjen",e.OPPGAVER="oppgaver",e))(te||{}),vt=(e=>(e.SAKSBEHANDLINGSTIDER="https://www.nav.no/saksbehandlingstider",e.SAKSBEHANDLINGSTIDER_FP="https://www.nav.no/saksbehandlingstider#foreldrepenger",e.SAKSBEHANDLINGSTIDER_SVP="https://www.nav.no/saksbehandlingstider#svangerskapspenger",e.SAKSBEHANDLINGSTIDER_ES="https://www.nav.no/saksbehandlingstider#engangsstonad",e.KLAGERETTIGHETER="https://klage.nav.no/nb/familie",e.KLAGERETTIGHETER_FP="https://klage.nav.no/nb/familie/foreldrepenger",e.KLAGERETTIGHETER_SVP="https://klage.nav.no/nb/familie/svangerskapspenger",e.KLAGERETTIGHETER_ES="https://klage.nav.no/nb/familie/engangsstonad",e.CHAT_MED_OSS="https://www.nav.no/person/kontakt-oss/chat/familie",e.SKRIV_TIL_OSS="https://innboks.nav.no/s/skriv-til-oss?category=Familie",e.RING_OSS="tel:55553333",e.SE_FLERE_TLF_NR_OG_TASTEVALG="https://www.nav.no/kontaktoss#ring-oss",e.LES_MER_OM_VÅRE_PENGESTØTTER="https://www.nav.no/barn",e.LES_MER_OM_FORELDREPENGER="https://www.nav.no/foreldrepenger",e.LES_MER_OM_SVANGERSKAPSPENGER="https://familie.nav.no/om-svangerskapspenger",e.LES_MER_OM_ENGANGSTØNAD="https://familie.nav.no/om-engangsstonad",e.MELD_FRA_OM_ENDRINGER="https://www.nav.no/no/nav-og-samfunn/om-nav/relatert-informasjon/du-har-plikt-til-a-gi-nav-riktige-opplysninger",e.VENT_INNTEKTSMELDING="https://www.nav.no/arbeidsgiver/inntektsmelding",e.VENT_MELDEKORT="https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det",e.SØKNADSFRISTER="https://www.nav.no/foreldrepenger#soknadsfrister",e.FORELDREPENGESOKNAD="https://foreldrepengesoknad.nav.no",e.HVOR_LENGE="https://www.nav.no/foreldrepenger#hvor-lenge",e))(vt||{});const pe=dt(te.HOVEDSIDE),Wt=()=>pt(pe),Ot=e=>{const t=ht(pe);O.useEffect(()=>{t(e)},[t,e])},Rt=e=>{const t=e.charAt(e.length-1).toLowerCase();return t==="s"||t==="x"||t==="z"},Zt=(e,t)=>t!=="nb"?e:Rt(e)?`${e}'`:`${e}s`,Xt=(e,t,n)=>{const s=!e.sakTilhørerMor;return{farMedmor:s?t:n,mor:s?n:t}},_t=e=>!e.dødsdato;A.extend(_e);A.extend(Ae);A.extend(De);A.extend(Te);const At=(e,t)=>A(e).format(t||"dddd D. MMMM YYYY"),Qt=e=>At(e,"KL.HH:mm"),en=e=>e.format("MMM").substr(0,3),Dt=e=>{const t=Math.floor(e/5);return{dager:e-t*5,uker:t}},tn=(e,t,n="full")=>{const{uker:s,dager:a}=Dt(Math.abs(e)),l=t.formatMessage({id:"varighet.dager"},{dager:a});if(s===0)return l;const m=t.formatMessage({id:"varighet.uker"},{uker:s});if(a>0){const S=n==="full"?t.formatMessage({id:"varighet.separator--full"}):t.formatMessage({id:"varighet.separator--normal"});return`${m}${S}${l}`}return m},Tt=e=>e.fom!==void 0&&e.tom!==void 0&&A(e.fom).isSameOrBefore(e.tom,"day"),ce=e=>A(e).isoWeekday(),kt=e=>ce(e)!==6&&ce(e)!==7,nn=e=>{if(!Tt(e))return 0;let t=A(e.fom);const n=A(e.tom);let s=0;for(;t.isSameOrBefore(n,"day");)kt(t.toDate())&&s++,t=t.add(24,"hours");return s},U=e=>{if(e!==void 0&&ke(e)&&A(e,"YYYY-MM-DD",!0).isValid())return A.utc(e).toDate()},wt=(e,t)=>e===void 0||t===void 0?!1:A(e).isSameOrAfter(A(t).subtract(1,"day"),"day")&&A(e).isSameOrBefore(A(t).add(1,"day"),"day"),he=e=>[...e.engangsstønad,...e.foreldrepenger,...e.svangerskapspenger];function Lt(e,t){return A(e.fødselsdato).isAfter(t.fødselsdato,"d")?1:A(e.fødselsdato).isBefore(t.fødselsdato,"d")||e.fornavn<t.fornavn?-1:1}const rn=e=>{var t;if(e.gjeldendeVedtak&&e.gjeldendeVedtak.perioder.length>0)return U(e.gjeldendeVedtak.perioder[0].fom);if(e.åpenBehandling&&e.åpenBehandling.søknadsperioder)return U((t=e.åpenBehandling)==null?void 0:t.søknadsperioder[0].fom)},It=(e,t)=>{const n=e.ytelse===N.FORELDREPENGER,s=n&&e.barn!==void 0?e.barn.map(f=>f.fnr).flat():[],a=n&&t?t.filter(f=>s.includes(f.fnr)):[],l=U(e.familiehendelse.fødselsdato),m=l!==void 0&&t?t.filter(f=>wt(U(f.fødselsdato),l)&&!(a!=null&&a.find(I=>I.fnr===f.fnr))):[],S=a.concat(m);S.sort(Lt);const v=S.filter(f=>f.fødselsdato!==void 0).map(f=>U(f.fødselsdato));let D=[];return v&&v.length>0?D=v:l&&(D=[l]),{fornavn:S==null?void 0:S.filter(f=>f.fornavn!==void 0&&f.fornavn.trim()!=="").map(f=>[f.fornavn,f.mellomnavn!==void 0?f.mellomnavn:""].join(" ")),fødselsdatoer:D,alleBarnaLever:!!(S!=null&&S.every(f=>_t(f)))}},sn=(e,t)=>he(t).reduce((s,a)=>{if(a.familiehendelse){const l=Mt(a.familiehendelse),m=s.find(S=>Nt(S,l));if(m&&m.saker.push(a),m&&s.includes(m))return s;{const S=Pt(a.familiehendelse,a.gjelderAdopsjon),v={antallBarn:a.familiehendelse.antallBarn,familiehendelsedato:l,saker:[a],type:S,ytelse:a.ytelse,barn:S!=="termin"?It(a,e):void 0};return s.push(v),s}}else return s},[]),X=(e,t)=>t===N.ENGANGSSTØNAD?e.map(n=>({...n,ytelse:t})):t===N.SVANGERSKAPSPENGER?e.map(n=>({...n,ytelse:t})):e.map(n=>({...n,ytelse:t})),on=e=>({foreldrepenger:X(e.foreldrepenger,N.FORELDREPENGER),engangsstønad:X(e.engangsstønad,N.ENGANGSSTØNAD),svangerskapspenger:X(e.svangerskapspenger,N.SVANGERSKAPSPENGER)}),an=e=>{const{foreldrepenger:t,svangerskapspenger:n,engangsstønad:s}=e;return t.length+n.length+s.length},Nt=(e,t)=>{const n=A(t).subtract(2,"months"),s=A(t).add(3,"weeks");if(e)return A(e.familiehendelsedato).isAfter(n)&&A(e.familiehendelsedato).isSameOrBefore(s)},Pt=(e,t)=>{if(t)return"adopsjon";const{fødselsdato:n}=e;return n?"fødsel":"termin"},Mt=e=>{const{fødselsdato:t,termindato:n,omsorgsovertakelse:s}=e;return s||t||n},dn=(e,t)=>{const n=t&&t.familiehendelse?t.familiehendelse.fødselsdato:void 0,s=e.søker.barn&&n?e.søker.barn.find(l=>A(l.fødselsdato).isSame(n,"d")):void 0,a=s&&s.annenForelder?s.annenForelder.fornavn:void 0;return a!==void 0&&a.trim()!==""?a:"Annen forelder"},bt=(e,t)=>e===1||e===0?M(t,"barn"):e===2?M(t,"tvillinger"):e===3?M(t,"trillinger"):M(t,"flerlinger"),ve=e=>{if(e===void 0)return;const t=[];if(e.forEach(n=>{t.find(a=>A(a).isSame(n,"day"))===void 0&&t.push(n)}),t.length>1){const n=t.map(l=>x(l)),s=n.slice(0,-1).join(", "),a=n[n.length-1];return`${s} og ${a}`}return x(t[0])},Ft=(e,t,n,s,a)=>{const l=bt(n,s);if(n===0&&t===void 0||a==="termin")return M(s,"barnHeader.terminBarn",{barnTekst:l,termindato:x(e)});if(a==="adopsjon")return M(s,"barnHeader.adoptertBarn",{adopsjonsdato:x(e)});{const m=ve(t);return t!==void 0&&t.length>0?M(s,"barnHeader.fødtBarn",{barnTekst:l,fødselsdatoTekst:m}):""}},Vt=e=>{if(e.length>1){const t=e.map(s=>s.trim()).slice(0,-1).join(", "),n=e[e.length-1];return`${t} og ${n}`}else return`${e[0]}`},ln=(e,t,n,s,a,l,m)=>{if(e===void 0||e.length===0||!s)return Ft(n,t,a,l,m);const S=Vt(e);if(m==="fødsel"){const v=ve(t);return`${S} født ${v}`}return m==="adopsjon"?`${S} adoptert ${x(n)}`:""},Gt=e=>{const t=Object.values(h);return e.ytelse===N.FORELDREPENGER?e.kanSøkeOmEndring?t.filter(yt):t.filter(Bt):e.ytelse===N.ENGANGSSTØNAD?t.filter(Kt):t.filter(jt)},Bt=e=>{switch(e){case h.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:return!1;default:return!0}},yt=e=>{switch(e){case h.ANNET:case h.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM:case h.BEKREFTELSE_FRA_ARBEIDSGIVER:case h.BEKREFTELSE_FRA_STUDIESTED:case h.BEKREFTELSE_PÅ_AVTALT_FERIE:case h.DOK_AV_ALENEOMSORG:case h.DOK_BEGRUNNELSE_SØKE_TILBAKE_I_TID:case h.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET:case h.DOK_INNLEGGELSE:case h.DOK_MORS_UTDANNING_ARBEID_SYKDOM:case h.DOK_OVERFØRING_FOR_SYK:case h.OMSORGSOVERTAKELSE:case h.TILBAKEBETALING:case h.HV_ØVELSE:case h.NAV_TILTAK:return!0;default:return!1}},jt=e=>{switch(e){case h.ANNET:case h.DOK_MILITÆR_SILVIL_TJENESTE:case h.INNTEKTSOPPLYSNINGER_FRILANS_ELLER_SELVSTENDIG:case h.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING:case h.TILBAKEBETALING:case h.TERMINBEKREFTELSE:case h.KOPI_SKATTEMELDING:case h.RESULTATREGNSKAP:return!0;default:return!1}},Kt=e=>{switch(e){case h.ANNET:case h.TERMINBEKREFTELSE:case h.FØDSELSATTEST:case h.TILBAKEBETALING:return!0;default:return!1}};const Ut=e=>e===N.ENGANGSSTØNAD?"engangsstonad":e===N.FORELDREPENGER?"foreldrepenger":"svangerskapspenger",fe=e=>e.map(t=>t.skjemanummer).filter((t,n,s)=>s.indexOf(t)===n),q="default",xt=(e,t)=>t?_.jsxs(_.Fragment,{children:[_.jsx("option",{value:q,disabled:!1,hidden:!1,children:_.jsx(Ee,{id:"ettersendelse.select.defaultValue"})}),Gt(t).map(n=>({skjemanummer:n,text:e.formatMessage({id:`ettersendelse.${n}`})})).sort((n,s)=>n.text.localeCompare(s.text)).map(({skjemanummer:n,text:s})=>_.jsx("option",{value:n,children:s},n))]}):null,Yt=e=>{if(e===q)return e;const t=Object.values(h).find(n=>n===e);if(t)return t;throw Error("Valgt skjemanr finnes ikke")},Q=({saker:e})=>{const t=we();Be(`${M(t,"lastOppDokumenter")} - ${M(t,"dineForeldrepenger")}`),Ot(te.ETTERSEND);const n=ye(),s=Fe("ettersending-page"),[a,l]=O.useState(!1),[m,S]=O.useState(!1),[v,D]=O.useState(void 0),[f,I]=O.useState(q),[P,J]=O.useState([]),[V,z]=O.useState(!1),b=he(e).find(L=>L.saksnummer===n.saksnummer),y=(L,G)=>{J(L),z(G)},j=L=>{L.preventDefault(),l(!0);const G={saksnummer:b.saksnummer,type:b.ytelse,vedlegg:P};at.sendEttersending(G).then(()=>{l(!1),S(!0)}).catch(Y=>{l(!1),D("Vi klarte ikke å sende inn dokumentasjonen din. Prøv igjen senere og hvis problemet vedvarer kontakt brukerstøtte.")})};return m||v?_.jsxs(_.Fragment,{children:[_.jsx(je,{}),_.jsxs(re,{gap:"2",children:[m&&_.jsx(se,{variant:"success",children:"Dokumentene er sendt"}),v&&_.jsx(se,{variant:"error",children:v}),_.jsx(Ke,{to:`/sak/${b.saksnummer}`,children:_.jsx(Ee,{id:"miniDialog.kvittering.gåTilbakeTilSaken"})})]})]}):_.jsx("form",{onSubmit:j,children:_.jsxs(re,{gap:"4",children:[_.jsx(Le,{children:"Dokumentene du laster opp vil bli lagt ved søknaden din. Du må velge hva dokumentene inneholder for at saksbehandlerene i NAV skal kunne behandle saken din."}),_.jsx(Ie,{children:"Du kan laste opp dokumenter i formatene pdf, png og jpg."}),_.jsx(Ne,{target:"_blank",href:"https://www.nav.no/brukerstotte#sende-soknad-pa-nett",children:"Les om hvordan du kan ta bilde av dokumenter med mobilen"}),_.jsx(Pe,{className:s.element("select"),label:"Hva inneholder dokumentene dine?",onChange:L=>I(Yt(L.target.value)),children:xt(t,b)}),f!==q&&_.jsx(Ue,{updateAttachments:y,attachmentType:xe.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:f,existingAttachments:P,saveAttachment:Ye(ee.REST_API_URL,Ut(b.ytelse))}),P&&P.length>0&&P.length<=40&&_.jsx(He,{children:_.jsx(Me,{type:"submit",icon:_.jsx(qe,{"aria-hidden":!0}),loading:a||V,disabled:a||V,children:"Legg ved sak"})}),P&&P.length>40&&_.jsx(be,{children:"Du kan bare laste opp 40 dokumenter på en gang. Hvis du skal laste opp flere enn 40 dokumenter kan du gjøre det i flere omganger."})]})})},un=Q;try{fe.displayName="getListOfUniqueSkjemanummer",fe.__docgenInfo={description:"",displayName:"getListOfUniqueSkjemanummer",props:{}}}catch{}try{Q.displayName="EttersendingPage",Q.__docgenInfo={description:"",displayName:"EttersendingPage",props:{saker:{defaultValue:null,description:"",name:"saker",required:!0,type:{name:"SakOppslag"}}}}}catch{}export{at as A,un as E,U as I,vt as N,te as O,w as R,dt as a,ht as b,nn as c,tn as d,Xt as e,Vt as f,Zt as g,At as h,Mt as i,Qt as j,he as k,rn as l,en as m,It as n,Wt as o,Pt as p,ln as q,Ot as r,dn as s,an as t,pt as u,sn as v,on as w,W as x};
