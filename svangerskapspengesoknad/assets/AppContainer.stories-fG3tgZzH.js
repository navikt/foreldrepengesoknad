var xe=Object.defineProperty;var Re=(e,n,r)=>n in e?xe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var R=(e,n,r)=>(Re(e,typeof n!="symbol"?n+"":n,r),r);import{j as s,L as Fe,u as je}from"./Button-uluYPR4k.js";import{S as Oe,M as De}from"./SkjemaSteg-DXX6hC_3.js";/* empty css              */import{r as c,$ as Pe}from"./index-DVXBtNgz.js";import{a as _e,g as ie}from"./apiInterceptor-DZtTMO6M.js";import{k as Be,b as qe,d as ge,A as Ce,K as Ge,i as Ue}from"./Uttaksdagen-H-XNd7g7.js";import{n as Ve,u as le,a as de,o as pe,b as Ke}from"./nn_NO-BLIJH93b.js";import"./index-Cbx7Fas8.js";import{h as We,R as $e,i as j,A as P,d as w,j as He,k as f,N as Ye}from"./useSvpNavigator-RswE5uDc.js";import{f as ue,E as Je,g as Xe,U as ze,I as Qe,h as Ze}from"./infobox.module-DxLUJskk.js";import{n as h}from"./dateFormValidation-CdD9UNZL.js";import{d as ce,e as en,C as v,c as nn,a as k,S as rn}from"./routes-DY2bjmhp.js";import{N as tn}from"./EgenNæring-DdBVG6ty.js";import{g as sn}from"./dateUtils-CMHpe-vT.js";import{m as on}from"./tilretteleggingUtils-Dm8kmT7m.js";import{F as an}from"./Forside-BRvJvMj-.js";import{A as gn}from"./ArbeidIUtlandetStep-Dihq2lS2.js";import{B as ln}from"./Barnet-CwHpcqcv.js";import{E as dn}from"./EgenNæringStep-DMIoZfrJ.js";import{F as pn}from"./FrilansStep-1ySo599e.js";import{I as un}from"./InntektsinformasjonSteg-BmiMk1x5.js";import{O as cn}from"./Oppsummering-DyWZ7Ygr.js";import{P as mn}from"./PerioderStep-Duh3fyh3.js";import{T as fn}from"./TilretteleggingStep-CVj76cl1.js";import{U as kn}from"./UtenlandsoppholdSteg-B8NWvERW.js";import{S as vn}from"./SenereUtenlandsoppholdSteg-DghWgNvp.js";import{T as En}from"./TidligereUtenlandsoppholdSteg-CiLFB2jE.js";import{V as Sn}from"./VelgArbeid-Cqr6v6ut.js";import{I as yn}from"./IkkeKvinne-B0rUACvM.js";import{B as hn}from"./ByttBrowserModal-lNNnBvR7.js";import"./tslib.es6-pJfR_DrR.js";import"./ErrorSummaryHookForm-C7ZyV80h.js";import"./Modal-BUY5Cvog.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-BrKO03ya.js";import"./SøkerOppsummeringspunkt-C4wkADMH.js";import"./ConfirmationPanel-CGHqo6-e.js";import"./useControllableState-cgc7bYZe.js";import"./TidligereUtenlandsoppholdPanel-D1zks80G.js";import"./ExpansionCard-Dn4HSht6.js";import"./Plus-DA51gZnq.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";import"./index-Dcs0RV0A.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-hsu74pFg.js";import"./ReadMore-BSwYuI4T.js";import"./velgArbeidFormUtils-Bf44V_Ek.js";import"./ArbeidsforholdInformasjon-wo3WRM0B.js";import"./numberUtils-DCxWcr3S.js";const{Axios:kt,AxiosError:vt,CanceledError:Et,isCancel:St,CancelToken:yt,VERSION:ht,all:It,Cancel:Nt,isAxiosError:In,spread:At,toFormData:bt,AxiosHeaders:wt,HttpStatusCode:Tt,formToJSON:Mt,getAdapter:Lt,mergeConfig:xt}=_e;class E extends Error{constructor(r,t,o){super(r);R(this,"callId");R(this,"timestamp");this.callId=t,this.timestamp=o}}class M extends Error{constructor(){super("API_ACCESS_ERROR")}}const Nn=e=>e instanceof M||e instanceof E,me=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),_=(e,n)=>{const[r,t]=c.useState(),[o,a]=c.useState(!1),[i,g]=c.useState();return c.useEffect(()=>{let p=!1;return(async()=>{var d,m;try{a(!0);const u=await e.get(n,{withCredentials:!0,timeout:60*1e3});p||t(u.data)}catch(u){In(u)?((d=u.response)==null?void 0:d.status)===401||((m=u.response)==null?void 0:m.status)===403?g(new M):g(new E(u.message)):u instanceof Error?g(new E(u.message)):g(new E(String(u)))}finally{a(!1)}})(),()=>{p=!0}},[e,n]),{data:r,loading:o,error:i}},B="ukjent uuid",fe=async(e,n,r,t,o=!1,a)=>{var i,g,p,l,d,m;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(u){if(me(u)&&u.code!=="ERR_CANCELED"){if(((i=u.response)==null?void 0:i.status)===401||((g=u.response)==null?void 0:g.status)===403)throw new M;const T=(l=(p=u.response)==null?void 0:p.data)!=null&&l.uuid?u.response.data.uuid:B,Le=T!==B?T.slice(0,8):T;throw new E(t+Le,T,(m=(d=u.response)==null?void 0:d.data)==null?void 0:m.timestamp)}throw u instanceof Error?new E(u.message):new E(String(u))}},q="ukjent uuid",L=async(e,n,r,t,o)=>{var a,i,g,p;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:t})).data}catch(l){if(me(l)&&l.code!=="ERR_CANCELED"){if(((a=l.response)==null?void 0:a.status)===401||((i=l.response)==null?void 0:i.status)===403)throw new M;const d=(p=(g=l.response)==null?void 0:g.data)!=null&&p.uuid?l.response.data.uuid:q,m=d!==q?d.slice(0,8):d;throw new E(r+m)}throw l instanceof Error?new E(l.message):new E(String(l))}},An="From {fom} until {tom}",bn={tidsperiode:An,"tidsperiode.kort":"{fom} - {tom}"},wn="Fra {fom} til {tom}",Tn={tidsperiode:wn,"tidsperiode.kort":"{fom} - {tom}"},Mn="Frå {fom} til {tom}",Ln={tidsperiode:Mn,"tidsperiode.kort":"{fom} - {tom}"};var C=function(e,n,r){if(r||arguments.length===2)for(var t=0,o=n.length,a;t<o;t++)(a||!(t in n))&&(a||(a=Array.prototype.slice.call(n,0,t)),a[t]=n[t]);return e.concat(a||Array.prototype.slice.call(n))},xn=function(){function e(n,r,t){this.name=n,this.version=r,this.os=t,this.type="browser"}return e}(),Rn=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),Fn=function(){function e(n,r,t,o){this.name=n,this.version=r,this.os=t,this.bot=o,this.type="bot-device"}return e}(),jn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),On=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),Dn=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Pn=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,G=3,_n=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",Dn]],U=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Bn(e){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new On:typeof navigator<"u"?Cn(navigator.userAgent):Un()}function qn(e){return e!==""&&_n.reduce(function(n,r){var t=r[0],o=r[1];if(n)return n;var a=o.exec(e);return!!a&&[t,a]},!1)}function Cn(e){var n=qn(e);if(!n)return null;var r=n[0],t=n[1];if(r==="searchbot")return new jn;var o=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);o?o.length<G&&(o=C(C([],o,!0),Vn(G-o.length),!0)):o=[];var a=o.join("."),i=Gn(e),g=Pn.exec(e);return g&&g[1]?new Fn(r,a,i,g[1]):new xn(r,a,i)}function Gn(e){for(var n=0,r=U.length;n<r;n++){var t=U[n],o=t[0],a=t[1],i=a.exec(e);if(i)return o}return null}function Un(){var e=typeof process<"u"&&process.version;return e?new Rn(process.version.slice(1)):null}function Vn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Kn=()=>{const e=Bn();return e?e.name==="ie":!1},Wn=e=>{window.location.href=e};var ke=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ke||{});const ve="selectedLocale",$n=()=>sessionStorage.getItem(ve)||"nb",Hn=e=>{sessionStorage.setItem(ve,e)},Ee={nb:Tn,nn:Ln,en:bn};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Yn="6";try{window.__reactRouterVersion=Yn}catch{}const Jn="startTransition",V=Pe[Jn];function Xn(e){let{basename:n,children:r,future:t,window:o}=e,a=c.useRef();a.current==null&&(a.current=We({window:o,v5Compat:!0}));let i=a.current,[g,p]=c.useState({action:i.action,location:i.location}),{v7_startTransition:l}=t||{},d=c.useCallback(m=>{l&&V?V(()=>p(m)):p(m)},[p,l]);return c.useLayoutEffect(()=>i.listen(d),[i,d]),c.createElement($e,{basename:n,children:r,location:g.location,navigationType:g.action,navigator:i,future:t})}var K;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(K||(K={}));var W;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(W||(W={}));const zn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},F=zn(),Qn=(e,n)=>{const r=j(),t=ce();return c.useCallback(async()=>{Be("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),t(),n(!1);try{await L(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,t,e])},Se=2,$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Zn=(e,n,r)=>{const t=j(),o=en(),a=ce(),[i,g]=c.useState(!1),p=c.useRef();return c.useEffect(()=>{i&&(async()=>{g(!1);const m=o[v.APP_ROUTE];m?(t(m),await fe(e,"/rest/storage/svangerskapspenger",{version:Se,locale:n,...o},$)):(r(!1),a(),t("/"),await L(e,"/rest/storage/svangerskapspenger",$)),p.current&&p.current()})().catch(m=>{ue(m.message),p.current&&p.current()})},[i]),c.useCallback(()=>(g(!0),new Promise(m=>{p.current=m})),[])};var ye=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(ye||{}),he=(e=>(e.MOR="mor",e))(he||{}),Ie=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Ie||{});const Ne=e=>e.arbeidsforhold.type===P.FRILANSER||e.arbeidsforhold.type===P.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},H=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),er=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(H),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(H)}),nr=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),rr=(e,n)=>({type:w.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),tr=(e,n)=>({type:w.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),sr=(e,n)=>({type:w.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),or=e=>{const n=Ne(e);return e.type===w.HEL?rr(e,n):e.type===w.DELVIS?tr(e,n):sr(e,n)},ar=e=>e.map(n=>or(n)),ir=e=>qe(e)?ge(e).startOf("day").isAfter(Ce,"day"):!0,gr=e=>{if(e){const n=e.næringstype===tn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=ir(e.fomDato),t={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...t,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...t,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},lr=e=>({type:ye.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),dr=(e,n,r,t,o)=>{const a=gr(r),i=o?o.arbeidIUtlandet.map(p=>lr(p)):void 0;return{rolle:he.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?t:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:i}},pr=e=>e.map(r=>{const t=Ne(r);return r.vedlegg.map(a=>({...a,dokumenterer:{type:ke.TILRETTELEGGING,arbeidsforhold:t}}))}).flat(1),ur=(e,n)=>{const r=er(h(e(v.UTENLANDSOPPHOLD)),e(v.UTENLANDSOPPHOLD_SENERE),e(v.UTENLANDSOPPHOLD_TIDLIGERE)),t=h(e(v.OM_BARNET)),o=h(e(v.TILRETTELEGGINGER)),a=nr(t),i=pr(o),g=dr(n,h(e(v.INNTEKTSINFORMASJON)),e(v.EGEN_NÆRING),e(v.FRILANS),e(v.ARBEID_I_UTLANDET)),p=sn(t),l=on(o,p),d=ar(l);return{type:Ie.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:a,vedlegg:i,tilrettelegging:d,søker:g}},Y="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",cr=(e,n,r)=>{const t=nn(),[o,a]=c.useState(),i=c.useCallback(async g=>{const p=ur(t,r);let l;try{l=await fe(e,"/rest/soknad",p,Y,!0,g)}catch(d){if(Nn(d))d instanceof E&&ue(d.message),a(d);else throw new Error("SendSøknad - This should never happen")}if(l){try{await L(e,"/rest/storage/svangerskapspenger",Y,g)}catch{}n(l)}},[t,n,r,e]);return c.useMemo(()=>({sendSøknad:i,errorSendSøknad:o}),[i,o])},O=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(Fe,{size:"2xlarge"})}),S=ie(),D=({error:e})=>s.jsx(Je,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),mr=(e,n,r,t,o)=>e?s.jsxs(s.Fragment,{children:[s.jsx(f,{path:k.BARNET,element:s.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.UTENLANDSOPPHOLD,element:s.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.HAR_BODD_I_UTLANDET,element:s.jsx(En,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.SKAL_BO_I_UTLANDET,element:s.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.INNTEKTSINFORMASJON,element:s.jsx(un,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.FRILANS,element:s.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.NÆRING,element:s.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.ARBEID_I_UTLANDET,element:s.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.VELG_ARBEID,element:s.jsx(Sn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.SKJEMA,element:s.jsx(Oe,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.TILRETTELEGGING,element:s.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.PERIODER,element:s.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(f,{path:k.OPPSUMMERING,element:s.jsx(cn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,sendSøknad:o})})]}):s.jsx(f,{path:"*",element:s.jsx(Ye,{to:k.FORSIDE})}),Ae=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:t})=>{const o=j(),[a,i]=c.useState(!1),[g,p]=c.useState(),{sendSøknad:l,errorSendSøknad:d}=cr(S,p,n),m=Zn(S,n,i),u=Qn(S,i);return c.useEffect(()=>{t!=null&&t[v.APP_ROUTE]&&(i(!0),t.locale&&r(t.locale),o(t[v.APP_ROUTE]))},[t]),g?F.INNSYN?(Wn(g.saksNr?`${F.INNSYN}/sak/${g.saksNr}/redirectFromSoknad`:`${F.INNSYN}/redirectFromSoknad`),s.jsx(O,{})):s.jsx("div",{children:"Redirected to Innsyn"}):d?s.jsx(D,{error:d}):s.jsxs(He,{children:[s.jsx(f,{path:k.FORSIDE,element:s.jsx(an,{mellomlagreSøknadOgNaviger:m,setHarGodkjentVilkår:i,harGodkjentVilkår:a,locale:n,onChangeLocale:r})}),mr(a,e,m,u,l)]})};O.__docgenInfo={description:"",methods:[],displayName:"Spinner"};D.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ae.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: Søker;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"intersection",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"bankkonto",value:{name:"Bankkonto",required:!1}},{key:"sivilstand",value:{name:"Sivilstand",required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]",required:!0}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},mellomlagretData:{required:!1,tsType:{name:"intersection",raw:"{ version: number; locale: LocaleNo } & ContextDataMap",elements:[{name:"signature",type:"object",raw:"{ version: number; locale: LocaleNo }",signature:{properties:[{key:"version",value:{name:"number",required:!0}},{key:"locale",value:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}],required:!0}}]}},{name:"signature",type:"object",raw:`{
    [ContextDataType.APP_ROUTE]?: SøknadRoutes;
    [ContextDataType.OM_BARNET]?: Barn;
    [ContextDataType.UTENLANDSOPPHOLD]?: Utenlandsopphold;
    [ContextDataType.UTENLANDSOPPHOLD_SENERE]?: UtenlandsoppholdSenere;
    [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]?: UtenlandsoppholdTidligere;
    [ContextDataType.INNTEKTSINFORMASJON]?: Inntektsinformasjon;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet;
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.TILRETTELEGGINGER]?: Tilrettelegging[];
    [ContextDataType.VALGT_TILRETTELEGGING_ID]?: string;
}`,signature:{properties:[]}}]},description:""}}};const be=({locale:e,onChangeLocale:n})=>{const r=je();Xe(r.formatMessage({id:"søknad.pagetitle"}));const{data:t,error:o}=_(S,"/rest/sokerinfo"),{data:a,loading:i,error:g}=_(S,"/rest/storage/svangerskapspenger");if(o||g)return s.jsx(D,{error:h(o||g)});if(!t||i)return s.jsx(O,{});if(!(t.søker.kjønn==="K"))return s.jsx(yn,{});const l=Ge(t.søker.fødselsdato),d=(a==null?void 0:a.version)===Se?a:void 0;return s.jsx("div",{children:l?s.jsx(Xn,{children:s.jsx(rn,{initialState:d,children:s.jsx(Ae,{locale:e,onChangeLocale:n,søkerInfo:t,mellomlagretData:d})})}):s.jsx(ze,{appnavn:"Svangerskapspenger"})})};be.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const fr={...Ve,...le.nb,...de.nb,...pe.nb,...Ee.nb},kr={...Ke,...le.nn,...de.nn,...pe.nn,...Ee.nn},we=$n(),vr={nb:fr,nn:kr};ge.locale(we);const Er=async()=>{try{await L(S,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Te=()=>{const[e,n]=c.useState(we);return s.jsx(Qe,{locale:e,messagesGroupedByLocale:vr,children:s.jsxs(Ze,{appName:"Svangerskapspenger",retryCallback:Er,children:[s.jsx(hn,{skalEndreNettleser:Kn()}),s.jsx(be,{locale:e,onChangeLocale:r=>{Hn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Me=Te;Te.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const y={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},Rt={title:"AppContainer",component:Me},x=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Ue();const t=new De(ie());return t.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),t.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),t.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),t.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),s.jsx(Me,{})},I=x.bind({});I.args={søkerinfo:y};const N=x.bind({});N.args={søkerinfo:{...y,arbeidsforhold:[]}};const A=x.bind({});A.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"M"}}};const b=x.bind({});b.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var J,X,z;I.parameters={...I.parameters,docs:{...(J=I.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(z=(X=I.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var Q,Z,ee;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ee=(Z=N.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,re,te;A.parameters={...A.parameters,docs:{...(ne=A.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(te=(re=A.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var se,oe,ae;b.parameters={...b.parameters,docs:{...(se=b.parameters)==null?void 0:se.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ae=(oe=b.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};const Ft=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,A as VisAppMann,b as VisAppUmyndig,Ft as __namedExportsOrder,Rt as default};
