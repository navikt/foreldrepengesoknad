var Me=Object.defineProperty;var Le=(e,n,r)=>n in e?Me(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var x=(e,n,r)=>(Le(e,typeof n!="symbol"?n+"":n,r),r);import{j as s,L as xe,u as Re}from"./Button-uluYPR4k.js";import{S as Fe,M as je}from"./SkjemaSteg-BvXwuHG8.js";/* empty css              */import{r as p,$ as Oe}from"./index-DVXBtNgz.js";import{a as De,g as ae}from"./apiInterceptor-DZtTMO6M.js";import{k as Pe,b as _e,d as ie,A as Be,K as qe,i as Ce}from"./Uttaksdagen-BhZsPxay.js";import{n as Ge,u as ge,a as le,o as de,b as Ue}from"./nn_NO-C824kvbS.js";import"./index-Cbx7Fas8.js";import{h as Ve,R as Ke,i as F,A as D,d as w,j as We,k as m,N as $e}from"./useSvpNavigator-Bww-HRoF.js";import{f as pe,E as He,g as Ye,U as Je,I as Xe,h as ze}from"./infobox.module-BTAaZqfU.js";import{n as h}from"./dateFormValidation--aNpoRrd.js";import{d as ue,e as Qe,C as v,c as Ze,a as f,S as en}from"./routes-DY2bjmhp.js";import{N as nn}from"./EgenNæring-DdBVG6ty.js";import{g as rn}from"./dateUtils-EvKMcKqf.js";import{m as tn}from"./tilretteleggingUtils-Dpape7Xv.js";import{F as sn}from"./Forside-pTCVB_zF.js";import{A as on}from"./ArbeidIUtlandetStep-BTFtc0JM.js";import{B as an}from"./Barnet-B8qF-urc.js";import{E as gn}from"./EgenNæringStep-Ci0VC32Z.js";import{F as ln}from"./FrilansStep-C6YzriEx.js";import{I as dn}from"./InntektsinformasjonSteg-6H5qFq9b.js";import{O as pn}from"./Oppsummering-BVXs_mZO.js";import{P as un}from"./PerioderStep-BpsnKoHD.js";import{T as cn}from"./TilretteleggingStep-Dp20nu0m.js";import{U as mn}from"./UtenlandsoppholdSteg-D_2x8GVg.js";import{S as fn}from"./SenereUtenlandsoppholdSteg-Cykac7rU.js";import{T as kn}from"./TidligereUtenlandsoppholdSteg-SxPjEH5Y.js";import{V as vn}from"./VelgArbeid-DVeWgXB1.js";import{I as En}from"./IkkeKvinne-B-SNTZIy.js";import{B as Sn}from"./ByttBrowserModal-qzV62nF4.js";import"./tslib.es6-pJfR_DrR.js";import"./ErrorSummaryHookForm-DwmE5MwA.js";import"./Modal-BUY5Cvog.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-Dh6xGJdy.js";import"./SøkerOppsummeringspunkt-C7oeGvR0.js";import"./ConfirmationPanel-DNXC9-oH.js";import"./useControllableState-cgc7bYZe.js";import"./TidligereUtenlandsoppholdPanel-DfPl8k9y.js";import"./ExpansionCard-CAAmVnxP.js";import"./Plus-DA51gZnq.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";import"./index-Dcs0RV0A.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-BozE-Eyp.js";import"./ReadMore-CVe8aK_g.js";import"./velgArbeidFormUtils-YUNBfXex.js";import"./ArbeidsforholdInformasjon-CNXtSm0v.js";import"./numberUtils-DCxWcr3S.js";const{Axios:mt,AxiosError:ft,CanceledError:kt,isCancel:vt,CancelToken:Et,VERSION:St,all:yt,Cancel:ht,isAxiosError:yn,spread:It,toFormData:Nt,AxiosHeaders:At,HttpStatusCode:bt,formToJSON:wt,getAdapter:Tt,mergeConfig:Mt}=De;class E extends Error{constructor(r,t,o){super(r);x(this,"callId");x(this,"timestamp");this.callId=t,this.timestamp=o}}class T extends Error{constructor(){super("API_ACCESS_ERROR")}}const hn=e=>e instanceof T||e instanceof E,ce=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),P=(e,n)=>{const[r,t]=p.useState(),[o,a]=p.useState(!1),[g,i]=p.useState();return p.useEffect(()=>{let d=!1;return(async()=>{var l,u;try{a(!0);const k=await e.get(n,{withCredentials:!0,timeout:60*1e3});d||t(k.data)}catch(k){yn(k)?((l=k.response)==null?void 0:l.status)===401||((u=k.response)==null?void 0:u.status)===403?i(new T):i(new E(k.message)):k instanceof Error?i(new E(k.message)):i(new E(String(k)))}finally{a(!1)}})(),()=>{d=!0}},[e,n]),{data:r,loading:o,error:g}},_="ukjent uuid",me=async(e,n,r,t,o=!1,a)=>{var g,i,d,c;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(l){if(ce(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((i=l.response)==null?void 0:i.status)===403)throw new T;const u=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:_,k=u!==_?u.slice(0,8):u;throw new E(t+k,u,(c=(d=l.response)==null?void 0:d.data)==null?void 0:c.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},B="ukjent uuid",M=async(e,n,r,t,o)=>{var a,g;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:t})).data}catch(i){if(ce(i)&&i.code!=="ERR_CANCELED"){if(((a=i.response)==null?void 0:a.status)===401||((g=i.response)==null?void 0:g.status)===403)throw new T;const d=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:B,c=d!==B?d.slice(0,8):d;throw new E(r+c)}throw i instanceof Error?new E(i.message):new E(String(i))}},In="From {fom} until {tom}",Nn={tidsperiode:In,"tidsperiode.kort":"{fom} - {tom}"},An="Fra {fom} til {tom}",bn={tidsperiode:An,"tidsperiode.kort":"{fom} - {tom}"},wn="Frå {fom} til {tom}",Tn={tidsperiode:wn,"tidsperiode.kort":"{fom} - {tom}"};var q=function(e,n,r){if(r||arguments.length===2)for(var t=0,o=n.length,a;t<o;t++)(a||!(t in n))&&(a||(a=Array.prototype.slice.call(n,0,t)),a[t]=n[t]);return e.concat(a||Array.prototype.slice.call(n))},Mn=function(){function e(n,r,t){this.name=n,this.version=r,this.os=t,this.type="browser"}return e}(),Ln=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),xn=function(){function e(n,r,t,o){this.name=n,this.version=r,this.os=t,this.bot=o,this.type="bot-device"}return e}(),Rn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Fn=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),jn=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,On=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,C=3,Dn=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",jn]],G=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Pn(e){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Fn:typeof navigator<"u"?Bn(navigator.userAgent):Cn()}function _n(e){return e!==""&&Dn.reduce(function(n,r){var t=r[0],o=r[1];if(n)return n;var a=o.exec(e);return!!a&&[t,a]},!1)}function Bn(e){var n=_n(e);if(!n)return null;var r=n[0],t=n[1];if(r==="searchbot")return new Rn;var o=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);o?o.length<C&&(o=q(q([],o,!0),Gn(C-o.length),!0)):o=[];var a=o.join("."),g=qn(e),i=On.exec(e);return i&&i[1]?new xn(r,a,g,i[1]):new Mn(r,a,g)}function qn(e){for(var n=0,r=G.length;n<r;n++){var t=G[n],o=t[0],a=t[1],g=a.exec(e);if(g)return o}return null}function Cn(){var e=typeof process<"u"&&process.version;return e?new Ln(process.version.slice(1)):null}function Gn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Un=()=>{const e=Pn();return e?e.name==="ie":!1},Vn=e=>{window.location.href=e};var fe=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(fe||{});const ke="selectedLocale",Kn=()=>sessionStorage.getItem(ke)||"nb",Wn=e=>{sessionStorage.setItem(ke,e)},ve={nb:bn,nn:Tn,en:Nn};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const $n="6";try{window.__reactRouterVersion=$n}catch{}const Hn="startTransition",U=Oe[Hn];function Yn(e){let{basename:n,children:r,future:t,window:o}=e,a=p.useRef();a.current==null&&(a.current=Ve({window:o,v5Compat:!0}));let g=a.current,[i,d]=p.useState({action:g.action,location:g.location}),{v7_startTransition:c}=t||{},l=p.useCallback(u=>{c&&U?U(()=>d(u)):d(u)},[d,c]);return p.useLayoutEffect(()=>g.listen(l),[g,l]),p.createElement(Ke,{basename:n,children:r,location:i.location,navigationType:i.action,navigator:g,future:t})}var V;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(V||(V={}));var K;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(K||(K={}));const Jn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},R=Jn(),Xn=(e,n)=>{const r=F(),t=ue();return p.useCallback(async()=>{Pe("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),t(),n(!1);try{await M(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,t,e])},Ee=2,W="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",zn=(e,n,r)=>{const t=F(),o=Qe(),a=ue(),[g,i]=p.useState(!1),d=p.useRef();return p.useEffect(()=>{g&&(async()=>{i(!1);const u=o[v.APP_ROUTE];u?(t(u),await me(e,"/rest/storage/svangerskapspenger",{version:Ee,locale:n,...o},W)):(r(!1),a(),t("/"),await M(e,"/rest/storage/svangerskapspenger",W)),d.current&&d.current()})().catch(u=>{pe(u.message),d.current&&d.current()})},[g]),p.useCallback(()=>(i(!0),new Promise(u=>{d.current=u})),[])};var Se=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(Se||{}),ye=(e=>(e.MOR="mor",e))(ye||{}),he=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(he||{});const Ie=e=>e.arbeidsforhold.type===D.FRILANSER||e.arbeidsforhold.type===D.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},$=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),Qn=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map($),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map($)}),Zn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),er=(e,n)=>({type:w.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),nr=(e,n)=>({type:w.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),rr=(e,n)=>({type:w.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),tr=e=>{const n=Ie(e);return e.type===w.HEL?er(e,n):e.type===w.DELVIS?nr(e,n):rr(e,n)},sr=e=>e.map(n=>tr(n)),or=e=>_e(e)?ie(e).startOf("day").isAfter(Be,"day"):!0,ar=e=>{if(e){const n=e.næringstype===nn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=or(e.fomDato),t={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...t,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...t,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},ir=e=>({type:Se.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),gr=(e,n,r,t,o)=>{const a=ar(r),g=o?o.arbeidIUtlandet.map(d=>ir(d)):void 0;return{rolle:ye.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?t:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:g}},lr=e=>e.map(r=>{const t=Ie(r);return r.vedlegg.map(a=>({...a,dokumenterer:{type:fe.TILRETTELEGGING,arbeidsforhold:t}}))}).flat(1),dr=(e,n)=>{const r=Qn(h(e(v.UTENLANDSOPPHOLD)),e(v.UTENLANDSOPPHOLD_SENERE),e(v.UTENLANDSOPPHOLD_TIDLIGERE)),t=h(e(v.OM_BARNET)),o=h(e(v.TILRETTELEGGINGER)),a=Zn(t),g=lr(o),i=gr(n,h(e(v.INNTEKTSINFORMASJON)),e(v.EGEN_NÆRING),e(v.FRILANS),e(v.ARBEID_I_UTLANDET)),d=rn(t),c=tn(o,d),l=sr(c);return{type:he.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:a,vedlegg:g,tilrettelegging:l,søker:i}},H="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",pr=(e,n,r)=>{const t=Ze(),[o,a]=p.useState(),g=p.useCallback(async i=>{const d=dr(t,r);let c;try{c=await me(e,"/rest/soknad",d,H,!0,i)}catch(l){if(hn(l))l instanceof E&&pe(l.message),a(l);else throw new Error("SendSøknad - This should never happen")}if(c){try{await M(e,"/rest/storage/svangerskapspenger",H,i)}catch{}n(c)}},[t,n,r,e]);return p.useMemo(()=>({sendSøknad:g,errorSendSøknad:o}),[g,o])},j=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(xe,{size:"2xlarge"})}),S=ae(),O=({error:e})=>s.jsx(He,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),ur=(e,n,r,t,o)=>e?s.jsxs(s.Fragment,{children:[s.jsx(m,{path:f.BARNET,element:s.jsx(an,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.UTENLANDSOPPHOLD,element:s.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.HAR_BODD_I_UTLANDET,element:s.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.SKAL_BO_I_UTLANDET,element:s.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.INNTEKTSINFORMASJON,element:s.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.FRILANS,element:s.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.NÆRING,element:s.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.ARBEID_I_UTLANDET,element:s.jsx(on,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.VELG_ARBEID,element:s.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.SKJEMA,element:s.jsx(Fe,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.TILRETTELEGGING,element:s.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.PERIODER,element:s.jsx(un,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:f.OPPSUMMERING,element:s.jsx(pn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,sendSøknad:o})})]}):s.jsx(m,{path:"*",element:s.jsx($e,{to:f.FORSIDE})}),Ne=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:t})=>{const o=F(),[a,g]=p.useState(!1),[i,d]=p.useState(),{sendSøknad:c,errorSendSøknad:l}=pr(S,d,n),u=zn(S,n,g),k=Xn(S,g);return p.useEffect(()=>{t&&t[v.APP_ROUTE]&&(g(!0),t.locale&&r(t.locale),o(t[v.APP_ROUTE]))},[t]),i?R.INNSYN?(Vn(i.saksNr?`${R.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${R.INNSYN}/redirectFromSoknad`),s.jsx(j,{})):s.jsx("div",{children:"Redirected to Innsyn"}):l?s.jsx(O,{error:l}):s.jsxs(We,{children:[s.jsx(m,{path:f.FORSIDE,element:s.jsx(sn,{mellomlagreSøknadOgNaviger:u,setHarGodkjentVilkår:g,harGodkjentVilkår:a,locale:n,onChangeLocale:r})}),ur(a,e,u,k,c)]})};j.__docgenInfo={description:"",methods:[],displayName:"Spinner"};O.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ne.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ae=({locale:e,onChangeLocale:n})=>{const r=Re();Ye(r.formatMessage({id:"søknad.pagetitle"}));const{data:t,error:o}=P(S,"/rest/sokerinfo"),{data:a,loading:g,error:i}=P(S,"/rest/storage/svangerskapspenger");if(o||i)return s.jsx(O,{error:h(o||i)});if(!t||g)return s.jsx(j,{});if(!(t.søker.kjønn==="K"))return s.jsx(En,{});const c=qe(t.søker.fødselsdato),l=(a==null?void 0:a.version)===Ee?a:void 0;return s.jsx("div",{children:c?s.jsx(Yn,{children:s.jsx(en,{initialState:l,children:s.jsx(Ne,{locale:e,onChangeLocale:n,søkerInfo:t,mellomlagretData:l})})}):s.jsx(Je,{appnavn:"Svangerskapspenger"})})};Ae.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const cr={...Ge,...ge.nb,...le.nb,...de.nb,...ve.nb},mr={...Ue,...ge.nn,...le.nn,...de.nn,...ve.nn},be=Kn(),fr={nb:cr,nn:mr};ie.locale(be);const kr=async()=>{try{await M(S,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},we=()=>{const[e,n]=p.useState(be);return s.jsx(Xe,{locale:e,messagesGroupedByLocale:fr,children:s.jsxs(ze,{appName:"Svangerskapspenger",retryCallback:kr,children:[s.jsx(Sn,{skalEndreNettleser:Un()}),s.jsx(Ae,{locale:e,onChangeLocale:r=>{Wn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Te=we;we.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const y={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},Lt={title:"AppContainer",component:Te},L=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Ce();const t=new je(ae());return t.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),t.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),t.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),t.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),s.jsx(Te,{})},I=L.bind({});I.args={søkerinfo:y};const N=L.bind({});N.args={søkerinfo:{...y,arbeidsforhold:[]}};const A=L.bind({});A.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"M"}}};const b=L.bind({});b.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,J,X;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(X=(J=I.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var z,Q,Z;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(Z=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,ne,re;A.parameters={...A.parameters,docs:{...(ee=A.parameters)==null?void 0:ee.docs,source:{originalSource:`({
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
}`,...(re=(ne=A.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var te,se,oe;b.parameters={...b.parameters,docs:{...(te=b.parameters)==null?void 0:te.docs,source:{originalSource:`({
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
}`,...(oe=(se=b.parameters)==null?void 0:se.docs)==null?void 0:oe.source}}};const xt=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,A as VisAppMann,b as VisAppUmyndig,xt as __namedExportsOrder,Lt as default};
