var Te=Object.defineProperty;var Le=(e,n,r)=>n in e?Te(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var F=(e,n,r)=>(Le(e,typeof n!="symbol"?n+"":n,r),r);import{j as s,u as Me}from"./index-DjQlcsKf.js";import{E as S,S as Re,M as _}from"./SkjemaSteg-Bz5lY_sf.js";/* empty css              */import{r as d,a as xe}from"./index-Dl6G-zuu.js";import{b as ge,a as Fe}from"./attachmentApi-C_RMp63E.js";import{k as je,b as Pe,d as le,r as _e,E as De,i as Oe}from"./VStack-7ThGWPLh.js";import{k as pe,l as Be,m as de,C as f,j as qe,E as Ce,a as m,n as Ge,U as Ue,S as Ve,I as Ke,o as We}from"./routes-CNaXZGz1.js";import"./index-D1_ZHIBm.js";import{C as He,R as $e,E as j,n as A,A as D,k as T,F as Je,G as k,N as Ye}from"./useSvpNavigator-BdOkPM0z.js";import{N as Xe}from"./EgenNæring-DdBVG6ty.js";import{g as ze}from"./dateUtils-TrASljZ4.js";import{m as Qe}from"./tilretteleggingUtils-CMNQ4cQC.js";import{F as Ze}from"./Forside-N0nRDyNy.js";import{A as en}from"./ArbeidIUtlandetStep-CHuuO1IT.js";import{B as nn}from"./Barnet-D4PoHS7j.js";import{E as rn}from"./EgenNæringStep-f_7KUFNQ.js";import{F as tn}from"./FrilansStep-7sCDDYGW.js";import{I as sn}from"./InntektsinformasjonSteg-7mNKVrX0.js";import{O as on}from"./Oppsummering-B11kFfJe.js";import{P as an}from"./PerioderStep-BFlKJmwj.js";import{T as gn}from"./TilretteleggingStep-BujTaANO.js";import{U as ln}from"./UtenlandsoppholdSteg-JIh0PGvE.js";import{S as pn}from"./SenereUtenlandsoppholdSteg-75FHX2x2.js";import{T as dn}from"./TidligereUtenlandsoppholdSteg-DCQ633sY.js";import{V as cn}from"./VelgArbeid-Du04LBEH.js";import{L as un}from"./Button-BLGHixGq.js";import{I as mn}from"./IkkeKvinne-hbuBpYay.js";import{n as kn,a as vn}from"./nn_NO-BW3aQ9U8.js";import{B as fn}from"./ByttBrowserModal-tIj-dgOF.js";import"./ErrorSummaryHookForm-5siRA4qs.js";import"./Modal-CfcGZiRT.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-BKT3Ld-O.js";import"./index-BfyspvgH.js";import"./createIntl-3lAAbMQb.js";import"./_baseIteratee-DR4_vQwt.js";import"./_baseUniq-BvvQ7sai.js";import"./ConfirmationPanel-CNJV-WfQ.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-0kFRQt2y.js";import"./Plus-i_xX1OI2.js";import"./ReadMore-Bt25DJgX.js";import"./velgArbeidFormUtils-GayuYaWJ.js";import"./ArbeidsforholdInformasjon-Inr0uFjt.js";import"./ExpansionCard-mC9D6fSj.js";import"./numberUtils-DCxWcr3S.js";import"./TidligereUtenlandsoppholdPanel-CJBBdiYv.js";const{Axios:et,AxiosError:nt,CanceledError:rt,isCancel:tt,CancelToken:st,VERSION:ot,all:at,Cancel:it,isAxiosError:En,spread:gt,toFormData:lt,AxiosHeaders:pt,HttpStatusCode:dt,formToJSON:ct,getAdapter:ut,mergeConfig:mt}=ge;class E extends Error{constructor(r,t,o){super(r);F(this,"callId");F(this,"timestamp");this.callId=t,this.timestamp=o}}class L extends Error{constructor(){super("API_ACCESS_ERROR")}}const hn=e=>e instanceof L||e instanceof E,ce=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,n)=>{const[r,t]=d.useState(),[o,a]=d.useState(!1),[g,i]=d.useState();return d.useEffect(()=>{let p=!1;return(async()=>{var l,c;try{a(!0);const v=await e.get(n,{withCredentials:!0,timeout:60*1e3});p||t(v.data)}catch(v){En(v)?((l=v.response)==null?void 0:l.status)===401||((c=v.response)==null?void 0:c.status)===403?i(new L):i(new E(v.message)):v instanceof Error?i(new E(v.message)):i(new E(String(v)))}finally{a(!1)}})(),()=>{p=!0}},[e,n]),{data:r,loading:o,error:g}},Sn=e=>ge.create({baseURL:e,withCredentials:!0}),B="ukjent uuid",ue=async(e,n,r,t,o=!1,a)=>{var g,i,p,u;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(l){if(ce(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((i=l.response)==null?void 0:i.status)===403)throw new L;const c=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:B,v=c!==B?c.slice(0,8):c;throw new E(t+v,c,(u=(p=l.response)==null?void 0:p.data)==null?void 0:u.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},q="ukjent uuid",M=async(e,n,r,t,o)=>{var a,g;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:t})).data}catch(i){if(ce(i)&&i.code!=="ERR_CANCELED"){if(((a=i.response)==null?void 0:a.status)===401||((g=i.response)==null?void 0:g.status)===403)throw new L;const p=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:q,u=p!==q?p.slice(0,8):p;throw new E(r+u)}throw i instanceof Error?new E(i.message):new E(String(i))}};var C=function(e,n,r){if(r||arguments.length===2)for(var t=0,o=n.length,a;t<o;t++)(a||!(t in n))&&(a||(a=Array.prototype.slice.call(n,0,t)),a[t]=n[t]);return e.concat(a||Array.prototype.slice.call(n))},yn=function(){function e(n,r,t){this.name=n,this.version=r,this.os=t,this.type="browser"}return e}(),An=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),In=function(){function e(n,r,t,o){this.name=n,this.version=r,this.os=t,this.bot=o,this.type="bot-device"}return e}(),wn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Nn=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),bn=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Tn=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,G=3,Ln=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",bn]],U=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Mn(e){return e?V(e):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Nn:typeof navigator<"u"?V(navigator.userAgent):Fn()}function Rn(e){return e!==""&&Ln.reduce(function(n,r){var t=r[0],o=r[1];if(n)return n;var a=o.exec(e);return!!a&&[t,a]},!1)}function V(e){var n=Rn(e);if(!n)return null;var r=n[0],t=n[1];if(r==="searchbot")return new wn;var o=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);o?o.length<G&&(o=C(C([],o,!0),jn(G-o.length),!0)):o=[];var a=o.join("."),g=xn(e),i=Tn.exec(e);return i&&i[1]?new In(r,a,g,i[1]):new yn(r,a,g)}function xn(e){for(var n=0,r=U.length;n<r;n++){var t=U[n],o=t[0],a=t[1],g=a.exec(e);if(g)return o}return null}function Fn(){var e=typeof process<"u"&&process.version;return e?new An(process.version.slice(1)):null}function jn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Pn=()=>{const e=Mn();return e?e.name==="ie":!1},me=e=>{window.location.href=e},_n=e=>{me(e+"?redirect="+window.location.origin)},ke="selectedLocale",Dn=()=>sessionStorage.getItem(ke)||"nb",On=e=>{sessionStorage.setItem(ke,e)};/**
 * React Router DOM v6.22.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Bn="6";try{window.__reactRouterVersion=Bn}catch{}const qn="startTransition",K=xe[qn];function Cn(e){let{basename:n,children:r,future:t,window:o}=e,a=d.useRef();a.current==null&&(a.current=He({window:o,v5Compat:!0}));let g=a.current,[i,p]=d.useState({action:g.action,location:g.location}),{v7_startTransition:u}=t||{},l=d.useCallback(c=>{u&&K?K(()=>p(c)):p(c)},[p,u]);return d.useLayoutEffect(()=>g.listen(l),[g,l]),d.createElement($e,{basename:n,children:r,location:i.location,navigationType:i.action,navigator:g,future:t})}var W;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(W||(W={}));var H;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(H||(H={}));const Gn=(e,n)=>{const r=j(),t=pe();return d.useCallback(async()=>{je("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),t(),n(!1);try{await M(e,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,t,e])},ve=2,$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Un=(e,n,r)=>{const t=j(),o=Be(),a=pe(),[g,i]=d.useState(!1),p=d.useRef();return d.useEffect(()=>{g&&(async()=>{i(!1);const c=o[f.APP_ROUTE];c?(t(c),await ue(e,"/storage/svangerskapspenger",{version:ve,locale:n,...o},$)):(r(!1),a(),t("/"),await M(e,"/storage/svangerskapspenger",$)),p.current&&p.current()})().catch(c=>{de(c.message),p.current&&p.current()})},[g]),d.useCallback(()=>(i(!0),new Promise(c=>{p.current=c})),[])};var fe=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(fe||{}),Ee=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(Ee||{}),he=(e=>(e.MOR="mor",e))(he||{}),Se=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Se||{});const ye=e=>e.arbeidsforhold.type===D.FRILANSER||e.arbeidsforhold.type===D.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},J=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),Vn=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(J),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(J)}),Kn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),Wn=(e,n)=>({type:T.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Hn=(e,n)=>({type:T.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),$n=(e,n)=>({type:T.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Jn=e=>{const n=ye(e);return e.type===T.HEL?Wn(e,n):e.type===T.DELVIS?Hn(e,n):$n(e,n)},Yn=e=>e.map(n=>Jn(n)),Xn=e=>Pe(e)?le(e).startOf("day").isAfter(_e,"day"):!0,zn=e=>{if(e){const n=e.næringstype===Xe.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=Xn(e.fomDato),t={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...t,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...t,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},Qn=e=>({type:Ee.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),Zn=(e,n,r,t,o)=>{const a=zn(r),g=o?o.arbeidIUtlandet.map(p=>Qn(p)):void 0;return{rolle:he.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?t:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:g}},er=e=>e.map(r=>{const t=ye(r);return r.vedlegg.map(a=>({...a,dokumenterer:{type:fe.TILRETTELEGGING,arbeidsforhold:t}}))}).flat(1),nr=(e,n)=>{const r=Vn(A(e(f.UTENLANDSOPPHOLD)),e(f.UTENLANDSOPPHOLD_SENERE),e(f.UTENLANDSOPPHOLD_TIDLIGERE)),t=A(e(f.OM_BARNET)),o=A(e(f.TILRETTELEGGINGER)),a=Kn(t),g=er(o),i=Zn(n,A(e(f.INNTEKTSINFORMASJON)),e(f.EGEN_NÆRING),e(f.FRILANS),e(f.ARBEID_I_UTLANDET)),p=ze(t),u=Qe(o,p),l=Yn(u);return{type:Se.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:a,vedlegg:g,tilrettelegging:l,søker:i}},Y="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",rr=(e,n,r)=>{const t=qe(),[o,a]=d.useState(),g=d.useCallback(async i=>{const p=nr(t,r);let u;try{u=await ue(e,`${S.REST_API_URL}/soknad`,p,Y,!0,i)}catch(l){if(hn(l))l instanceof E&&de(l.message),a(l);else throw new Error("SendSøknad - This should never happen")}if(u){try{await M(e,"/storage/svangerskapspenger",Y,i)}catch{}n(u)}},[t,n,r,e]);return d.useMemo(()=>({sendSøknad:g,errorSendSøknad:o}),[g,o])},R=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(un,{size:"2xlarge"})}),h=Sn(S.REST_API_URL),P=({error:e})=>e instanceof L?(_n(S.LOGIN_URL),s.jsx(R,{})):s.jsx(Ce,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),tr=(e,n,r,t,o)=>e?s.jsxs(s.Fragment,{children:[s.jsx(k,{path:m.BARNET,element:s.jsx(nn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.UTENLANDSOPPHOLD,element:s.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.HAR_BODD_I_UTLANDET,element:s.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.SKAL_BO_I_UTLANDET,element:s.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.INNTEKTSINFORMASJON,element:s.jsx(sn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.FRILANS,element:s.jsx(tn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.NÆRING,element:s.jsx(rn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.ARBEID_I_UTLANDET,element:s.jsx(en,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.VELG_ARBEID,element:s.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.SKJEMA,element:s.jsx(Re,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.TILRETTELEGGING,element:s.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.PERIODER,element:s.jsx(an,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(k,{path:m.OPPSUMMERING,element:s.jsx(on,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,sendSøknad:o})})]}):s.jsx(k,{path:"*",element:s.jsx(Ye,{to:m.FORSIDE})}),Ae=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:t})=>{const o=j(),[a,g]=d.useState(!1),[i,p]=d.useState(),{sendSøknad:u,errorSendSøknad:l}=rr(h,p,n),c=Un(h,n,g),v=Gn(h,g);return d.useEffect(()=>{t&&t[f.APP_ROUTE]&&(g(!0),t.locale&&r(t.locale),o(t[f.APP_ROUTE]))},[t]),i?S.INNSYN?(me(i.saksNr?`${S.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${S.INNSYN}/redirectFromSoknad`),s.jsx(R,{})):s.jsx("div",{children:"Redirected to Innsyn"}):l?s.jsx(P,{error:l}):s.jsxs(Je,{children:[s.jsx(k,{path:m.FORSIDE,element:s.jsx(Ze,{mellomlagreSøknadOgNaviger:c,setHarGodkjentVilkår:g,harGodkjentVilkår:a,locale:n,onChangeLocale:r})}),tr(a,e,c,v,u)]})};R.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ae.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ie=({locale:e,onChangeLocale:n})=>{const r=Me();Ge(r.formatMessage({id:"søknad.pagetitle"}));const{data:t,error:o}=O(h,"/sokerinfo"),{data:a,loading:g,error:i}=O(h,"/storage/svangerskapspenger");if(o||i)return s.jsx(P,{error:A(o||i)});if(!t||g)return s.jsx(R,{});if(!(t.søker.kjønn==="K"))return s.jsx(mn,{});const u=De(t.søker.fødselsdato),l=(a==null?void 0:a.version)===ve?a:void 0;return s.jsx("div",{children:u?s.jsx(Cn,{children:s.jsx(Ve,{initialState:l,children:s.jsx(Ae,{locale:e,onChangeLocale:n,søkerInfo:t,mellomlagretData:l})})}):s.jsx(Ue,{appnavn:"Svangerskapspenger"})})};Ie.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const we=Dn(),sr={nb:kn,nn:vn};le.locale(we);const or=async()=>{try{await M(h,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Ne=()=>{const[e,n]=d.useState(we);return s.jsx(Ke,{locale:e,messagesGroupedByLocale:sr,children:s.jsxs(We,{appName:"Svangerskapspenger",retryCallback:or,children:[s.jsx(fn,{skalEndreNettleser:Pn()}),s.jsx(Ie,{locale:e,onChangeLocale:r=>{On(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},be=Ne;Ne.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const y={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},kt={title:"AppContainer",component:be},x=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Oe();const t=new _(h);t.onGet("/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),t.onGet("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),t.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),t.onPost("/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),t.onDelete("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200]));const o=new _(Fe);return o.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),o.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),s.jsx(be,{})},I=x.bind({});I.args={søkerinfo:y};const w=x.bind({});w.args={søkerinfo:{...y,arbeidsforhold:[]}};const N=x.bind({});N.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"M"}}};const b=x.bind({});b.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var X,z,Q;I.parameters={...I.parameters,docs:{...(X=I.parameters)==null?void 0:X.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(svpApi);
  apiMock.onGet('/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/storage/svangerskapspenger').reply(() => {
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
  apiMock.onPost('/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  //story
  attachmentApiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(Q=(z=I.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var Z,ee,ne;w.parameters={...w.parameters,docs:{...(Z=w.parameters)==null?void 0:Z.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(svpApi);
  apiMock.onGet('/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/storage/svangerskapspenger').reply(() => {
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
  apiMock.onPost('/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  //story
  attachmentApiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ne=(ee=w.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,te,se;N.parameters={...N.parameters,docs:{...(re=N.parameters)==null?void 0:re.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(svpApi);
  apiMock.onGet('/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/storage/svangerskapspenger').reply(() => {
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
  apiMock.onPost('/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  //story
  attachmentApiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(se=(te=N.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};var oe,ae,ie;b.parameters={...b.parameters,docs:{...(oe=b.parameters)==null?void 0:oe.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(svpApi);
  apiMock.onGet('/sokerinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /sokerinfo');
    }
    return [200, søkerinfo];
  });
  apiMock.onGet('/storage/svangerskapspenger').reply(() => {
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
  apiMock.onPost('/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  apiMock.onPost('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger');
    }
    return [200];
  });
  apiMock.onDelete('/storage/svangerskapspenger').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/svangerskapspenger');
    }
    return [200];
  });
  const attachmentApiMock = new MockAdapter(attachmentApi);
  //story
  attachmentApiMock.onPost('/rest-api/storage/svangerskapspenger/vedlegg').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/svangerskapspenger/vedlegg');
    }
    return [200];
  });
  attachmentApiMock.onPost('http://localhost:8888/rest/storage/svangerskapspenger/vedlegg').reply(200, {}); //test

  return <AppContainer />;
}`,...(ie=(ae=b.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};const vt=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,w as VisAppKvinneUtenArbeid,N as VisAppMann,b as VisAppUmyndig,vt as __namedExportsOrder,kt as default};
