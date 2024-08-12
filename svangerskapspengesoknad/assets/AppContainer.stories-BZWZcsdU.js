var Le=Object.defineProperty;var Re=(e,n,r)=>n in e?Le(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var R=(e,n,r)=>Re(e,typeof n!="symbol"?n+"":n,r);import{j as t}from"./tslib.es6-C_-gbNBy.js";import{S as Fe,M as je}from"./SkjemaSteg-B0SM8QEv.js";/* empty css              */import{r as u,a as Oe}from"./index-CTjT7uj6.js";import{a as Pe,g as ie}from"./apiInterceptor-D9XpNqGK.js";import{l as _e,_ as le,f as De,d as ge,O as Be,$ as qe,a0 as Ce,a1 as Ge,a2 as Ue,a3 as Ve,a4 as Ke,i as We}from"./CalendarLabel-BOjWYyGG.js";import{n as $e,u as de,a as pe,o as ce,b as He}from"./nn_NO-PKRNOLQF.js";import{h as Ye,u as Je}from"./Modal-jpjfRTmg.js";import"./index-9r8iugjR.js";import{h as Xe,R as ze,i as j,n as y,A as _,d as w,j as Qe,k as f,N as Ze}from"./useSvpNavigator-CcE3CUWV.js";import"./dateFormValidation-ChXBOKMN.js";import{d as ue,e as en,C as v,c as nn,a as k,S as rn}from"./routes-BKH065He.js";import{N as sn}from"./EgenNæring-DdBVG6ty.js";import{g as tn}from"./dateUtils-hgx9jYdj.js";import{m as on}from"./tilretteleggingUtils-H0_0zdtK.js";import{F as an}from"./Forside-BJrfuyWM.js";import{A as ln}from"./ArbeidIUtlandetStep-B8CkDWi7.js";import{B as gn}from"./Barnet-BWyXfUuv.js";import{E as dn}from"./EgenNæringStep-COCYulwK.js";import{F as pn}from"./FrilansStep-B2XVJUOB.js";import{I as cn}from"./InntektsinformasjonSteg-CZUvuFnR.js";import{O as un}from"./Oppsummering-CkUiibwB.js";import{P as mn}from"./PerioderStep-Xw2gXUS6.js";import{T as fn}from"./TilretteleggingStep-DKxe3XgY.js";import{U as kn}from"./UtenlandsoppholdSteg-GkXGbDQc.js";import{S as vn}from"./SenereUtenlandsoppholdSteg-Cptr-JKr.js";import{T as En}from"./TidligereUtenlandsoppholdSteg-C_vQqrAE.js";import{V as Sn}from"./VelgArbeid-DZ988FSk.js";import{I as bn}from"./IkkeKvinne-BDfsqMta.js";import{B as yn}from"./ByttBrowserModal-CM-Vd_tB.js";import"./ErrorSummaryHookForm-DYQj2NvG.js";import"./Checkbox-E4i2biKU.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-BdaSoWZs.js";import"./index-BRV0Se7Z.js";import"./BoIUtlandetOppsummeringspunkt-DwjtoM9k.js";import"./ConfirmationPanel-LnXZ7aGC.js";import"./TidligereUtenlandsoppholdPanel-CKuNFYri.js";import"./ExpansionCard-zG2D4Nlm.js";import"./Plus-B8CsG95U.js";import"./_baseIteratee-Dyzk-1k8.js";import"./_baseUniq-DYqiuyAy.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-Ct3sPTkW.js";import"./ReadMore-DQFjhoyC.js";import"./velgArbeidFormUtils-CwAzLmny.js";import"./numberUtils-DCxWcr3S.js";const{Axios:us,AxiosError:ms,CanceledError:fs,isCancel:ks,CancelToken:vs,VERSION:Es,all:Ss,Cancel:bs,isAxiosError:hn,spread:ys,toFormData:hs,AxiosHeaders:Is,HttpStatusCode:Ns,formToJSON:As,getAdapter:ws,mergeConfig:Ts}=Pe;class E extends Error{constructor(r,s,o){super(r);R(this,"callId");R(this,"timestamp");this.callId=s,this.timestamp=o}}class x extends Error{constructor(){super("API_ACCESS_ERROR")}}const In=e=>e instanceof x||e instanceof E,me=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),D=(e,n)=>{const[r,s]=u.useState(),[o,a]=u.useState(!1),[i,l]=u.useState();return u.useEffect(()=>{let p=!1;return(async()=>{var d,m;try{a(!0);const c=await e.get(n,{withCredentials:!0,timeout:60*1e3});p||s(c.data)}catch(c){hn(c)?((d=c.response)==null?void 0:d.status)===401||((m=c.response)==null?void 0:m.status)===403?l(new x):l(new E(c.message)):c instanceof Error?l(new E(c.message)):l(new E(String(c)))}finally{a(!1)}})(),()=>{p=!0}},[e,n]),{data:r,loading:o,error:i}},B="ukjent uuid",fe=async(e,n,r,s,o=!1,a)=>{var i,l,p,g,d,m;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(c){if(me(c)&&c.code!=="ERR_CANCELED"){if(((i=c.response)==null?void 0:i.status)===401||((l=c.response)==null?void 0:l.status)===403)throw new x;const T=(g=(p=c.response)==null?void 0:p.data)!=null&&g.uuid?c.response.data.uuid:B,Me=T!==B?T.slice(0,8):T;throw new E(s+Me,T,(m=(d=c.response)==null?void 0:d.data)==null?void 0:m.timestamp)}throw c instanceof Error?new E(c.message):new E(String(c))}},q="ukjent uuid",M=async(e,n,r,s,o)=>{var a,i,l,p;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:s})).data}catch(g){if(me(g)&&g.code!=="ERR_CANCELED"){if(((a=g.response)==null?void 0:a.status)===401||((i=g.response)==null?void 0:i.status)===403)throw new x;const d=(p=(l=g.response)==null?void 0:l.data)!=null&&p.uuid?g.response.data.uuid:q,m=d!==q?d.slice(0,8):d;throw new E(r+m)}throw g instanceof Error?new E(g.message):new E(String(g))}},Nn="From {fom} until {tom}",An={tidsperiode:Nn,"tidsperiode.kort":"{fom} - {tom}"},wn="Fra {fom} til {tom}",Tn={tidsperiode:wn,"tidsperiode.kort":"{fom} - {tom}"},xn="Frå {fom} til {tom}",Mn={tidsperiode:xn,"tidsperiode.kort":"{fom} - {tom}"};var C=function(e,n,r){if(r||arguments.length===2)for(var s=0,o=n.length,a;s<o;s++)(a||!(s in n))&&(a||(a=Array.prototype.slice.call(n,0,s)),a[s]=n[s]);return e.concat(a||Array.prototype.slice.call(n))},Ln=function(){function e(n,r,s){this.name=n,this.version=r,this.os=s,this.type="browser"}return e}(),Rn=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),Fn=function(){function e(n,r,s,o){this.name=n,this.version=r,this.os=s,this.bot=o,this.type="bot-device"}return e}(),jn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),On=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),Pn=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,_n=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,G=3,Dn=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",Pn]],U=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Bn(e){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new On:typeof navigator<"u"?Cn(navigator.userAgent):Un()}function qn(e){return e!==""&&Dn.reduce(function(n,r){var s=r[0],o=r[1];if(n)return n;var a=o.exec(e);return!!a&&[s,a]},!1)}function Cn(e){var n=qn(e);if(!n)return null;var r=n[0],s=n[1];if(r==="searchbot")return new jn;var o=s[1]&&s[1].split(".").join("_").split("_").slice(0,3);o?o.length<G&&(o=C(C([],o,!0),Vn(G-o.length),!0)):o=[];var a=o.join("."),i=Gn(e),l=_n.exec(e);return l&&l[1]?new Fn(r,a,i,l[1]):new Ln(r,a,i)}function Gn(e){for(var n=0,r=U.length;n<r;n++){var s=U[n],o=s[0],a=s[1],i=a.exec(e);if(i)return o}return null}function Un(){var e=typeof process<"u"&&process.version;return e?new Rn(process.version.slice(1)):null}function Vn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Kn=()=>{const e=Bn();return e?e.name==="ie":!1},Wn=e=>{window.location.href=e};var ke=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ke||{});const ve="selectedLocale",$n=()=>sessionStorage.getItem(ve)||"nb",Hn=e=>{sessionStorage.setItem(ve,e)},Ee={nb:Tn,nn:Mn,en:An};/**
 * React Router DOM v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Yn="6";try{window.__reactRouterVersion=Yn}catch{}const Jn="startTransition",V=Oe[Jn];function Xn(e){let{basename:n,children:r,future:s,window:o}=e,a=u.useRef();a.current==null&&(a.current=Xe({window:o,v5Compat:!0}));let i=a.current,[l,p]=u.useState({action:i.action,location:i.location}),{v7_startTransition:g}=s||{},d=u.useCallback(m=>{g&&V?V(()=>p(m)):p(m)},[p,g]);return u.useLayoutEffect(()=>i.listen(d),[i,d]),u.createElement(ze,{basename:n,children:r,location:l.location,navigationType:l.action,navigator:i,future:s})}var K;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(K||(K={}));var W;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(W||(W={}));const zn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},F=zn(),Qn=(e,n)=>{const r=j(),s=ue();return u.useCallback(async()=>{_e("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),n(!1);try{await M(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,s,e])},Se=2,$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Zn=(e,n,r)=>{const s=j(),o=en(),a=ue(),[i,l]=u.useState(!1),p=u.useRef();return u.useEffect(()=>{i&&(async()=>{l(!1);const m=o[v.APP_ROUTE];m?(s(m),await fe(e,"/rest/storage/svangerskapspenger",{version:Se,locale:n,...o},$)):(r(!1),a(),s("/"),await M(e,"/rest/storage/svangerskapspenger",$)),p.current&&p.current()})().catch(m=>{le(m.message),p.current&&p.current()})},[i]),u.useCallback(()=>(l(!0),new Promise(m=>{p.current=m})),[])};var be=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(be||{}),ye=(e=>(e.MOR="mor",e))(ye||{}),he=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(he||{});const Ie=e=>e.arbeidsforhold.type===_.FRILANSER||e.arbeidsforhold.type===_.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},H=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),er=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(H),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(H)}),nr=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),rr=(e,n)=>({type:w.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),sr=(e,n)=>({type:w.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),tr=(e,n)=>({type:w.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),or=e=>{const n=Ie(e);return e.type===w.HEL?rr(e,n):e.type===w.DELVIS?sr(e,n):tr(e,n)},ar=e=>e.map(n=>or(n)),ir=e=>De(e)?ge(e).startOf("day").isAfter(Be,"day"):!0,lr=e=>{if(e){const n=e.næringstype===sn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=ir(e.fomDato),s={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},gr=e=>({type:be.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),dr=(e,n,r,s,o)=>{const a=lr(r),i=o?o.arbeidIUtlandet.map(p=>gr(p)):void 0;return{rolle:ye.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?s:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:i}},pr=e=>e.map(r=>{const s=Ie(r);return r.vedlegg.map(a=>({...a,dokumenterer:{type:ke.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),cr=(e,n)=>{const r=er(y(e(v.UTENLANDSOPPHOLD)),e(v.UTENLANDSOPPHOLD_SENERE),e(v.UTENLANDSOPPHOLD_TIDLIGERE)),s=y(e(v.OM_BARNET)),o=y(e(v.TILRETTELEGGINGER)),a=nr(s),i=pr(o),l=dr(n,y(e(v.INNTEKTSINFORMASJON)),e(v.EGEN_NÆRING),e(v.FRILANS),e(v.ARBEID_I_UTLANDET)),p=tn(s),g=on(o,p),d=ar(g);return{type:he.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:a,vedlegg:i,tilrettelegging:d,søker:l}},Y="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",ur=(e,n,r)=>{const s=nn(),[o,a]=u.useState(),i=u.useCallback(async l=>{const p=cr(s,r);let g;try{g=await fe(e,"/rest/soknad",p,Y,!0,l)}catch(d){if(In(d))d instanceof E&&le(d.message),a(d);else throw new Error("SendSøknad - This should never happen")}if(g){try{await M(e,"/rest/storage/svangerskapspenger",Y,l)}catch{}n(g)}},[s,n,r,e]);return u.useMemo(()=>({sendSøknad:i,errorSendSøknad:o}),[i,o])},O=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(Ye,{size:"2xlarge"})}),S=ie(),P=({error:e})=>t.jsx(qe,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),mr=(e,n,r,s,o)=>e?t.jsxs(t.Fragment,{children:[t.jsx(f,{path:k.BARNET,element:t.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.UTENLANDSOPPHOLD,element:t.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.HAR_BODD_I_UTLANDET,element:t.jsx(En,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.SKAL_BO_I_UTLANDET,element:t.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.INNTEKTSINFORMASJON,element:t.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.FRILANS,element:t.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.NÆRING,element:t.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.ARBEID_I_UTLANDET,element:t.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.VELG_ARBEID,element:t.jsx(Sn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.SKJEMA,element:t.jsx(Fe,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.TILRETTELEGGING,element:t.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.PERIODER,element:t.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(f,{path:k.OPPSUMMERING,element:t.jsx(un,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s,sendSøknad:o})})]}):t.jsx(f,{path:"*",element:t.jsx(Ze,{to:k.FORSIDE})}),Ne=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:s})=>{const o=j(),[a,i]=u.useState(!1),[l,p]=u.useState(),{sendSøknad:g,errorSendSøknad:d}=ur(S,p,n),m=Zn(S,n,i),c=Qn(S,i);return u.useEffect(()=>{s!=null&&s[v.APP_ROUTE]&&(i(!0),s.locale&&r(s.locale),o(s[v.APP_ROUTE]))},[s]),l?F.INNSYN?(Wn(l.saksNr?`${F.INNSYN}/sak/${l.saksNr}/redirectFromSoknad`:`${F.INNSYN}/redirectFromSoknad`),t.jsx(O,{})):t.jsx("div",{children:"Redirected to Innsyn"}):d?t.jsx(P,{error:d}):t.jsxs(Qe,{children:[t.jsx(f,{path:k.FORSIDE,element:t.jsx(an,{mellomlagreSøknadOgNaviger:m,setHarGodkjentVilkår:i,harGodkjentVilkår:a,locale:n,onChangeLocale:r})}),mr(a,e,m,c,g)]})};O.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ne.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ae=({locale:e,onChangeLocale:n})=>{const r=Je();Ce(r.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:o}=D(S,"/rest/sokerinfo"),{data:a,loading:i,error:l}=D(S,"/rest/storage/svangerskapspenger");if(o||l)return t.jsx(P,{error:y(o||l)});if(!s||i)return t.jsx(O,{});if(!(s.søker.kjønn==="K"))return t.jsx(bn,{});const g=Ge(s.søker.fødselsdato),d=(a==null?void 0:a.version)===Se?a:void 0;return t.jsx("div",{children:g?t.jsx(Xn,{children:t.jsx(rn,{initialState:d,children:t.jsx(Ne,{locale:e,onChangeLocale:n,søkerInfo:s,mellomlagretData:d})})}):t.jsx(Ue,{appnavn:"Svangerskapspenger"})})};Ae.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const fr={...$e,...de.nb,...pe.nb,...ce.nb,...Ee.nb},kr={...He,...de.nn,...pe.nn,...ce.nn,...Ee.nn},we=$n(),vr={nb:fr,nn:kr};ge.locale(we);const Er=async()=>{try{await M(S,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Te=()=>{const[e,n]=u.useState(we);return t.jsx(Ve,{locale:e,messagesGroupedByLocale:vr,children:t.jsxs(Ke,{appName:"Svangerskapspenger",retryCallback:Er,children:[t.jsx(yn,{skalEndreNettleser:Kn()}),t.jsx(Ae,{locale:e,onChangeLocale:r=>{Hn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},xe=Te;Te.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const b={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},xs={title:"AppContainer",component:xe},L=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{We();const s=new je(ie());return s.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),s.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(xe,{})},h=L.bind({});h.args={søkerinfo:b};const I=L.bind({});I.args={søkerinfo:{...b,arbeidsforhold:[]}};const N=L.bind({});N.args={søkerinfo:{...b,søker:{...b.søker,kjønn:"M"}}};const A=L.bind({});A.args={søkerinfo:{...b,søker:{...b.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var J,X,z;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(z=(X=h.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var Q,Z,ee;I.parameters={...I.parameters,docs:{...(Q=I.parameters)==null?void 0:Q.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ee=(Z=I.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,re,se;N.parameters={...N.parameters,docs:{...(ne=N.parameters)==null?void 0:ne.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(se=(re=N.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};var te,oe,ae;A.parameters={...A.parameters,docs:{...(te=A.parameters)==null?void 0:te.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(getAxiosInstance());
  apiMock.onGet('/rest/sokerinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/svangerskapspenger');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('rest-api/soknad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post rest-api/soknad');
    }
    return [200, {}];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });

  //story
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ae=(oe=A.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};const Ms=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{h as VisAppKvinneMedArbeid,I as VisAppKvinneUtenArbeid,N as VisAppMann,A as VisAppUmyndig,Ms as __namedExportsOrder,xs as default};
