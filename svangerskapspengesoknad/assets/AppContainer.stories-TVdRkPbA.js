var Re=Object.defineProperty;var xe=(e,n,r)=>n in e?Re(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var F=(e,n,r)=>(xe(e,typeof n!="symbol"?n+"":n,r),r);import{j as s,L as Fe,u as je}from"./Button-uluYPR4k.js";import{E as S,S as Pe,M as _}from"./SkjemaSteg-DoPnU9li.js";/* empty css              */import{r as d,$ as _e}from"./index-DVXBtNgz.js";import{b as ie,a as De}from"./attachmentApi-ChTKvg06.js";import{k as Oe,b as Be,d as ge,A as qe,K as Ce,i as Ge}from"./Uttaksdagen-BhZsPxay.js";import{n as Ue,u as le,a as pe,o as de,b as Ve}from"./nn_NO-BNqxtSAC.js";import"./index-Cbx7Fas8.js";import{h as Ke,R as We,i as j,A as D,d as T,j as $e,k as m,N as He}from"./useSvpNavigator-Bww-HRoF.js";import{f as ce,E as Je,g as Ye,U as Xe,I as ze,h as Qe}from"./infobox.module-DXupakH_.js";import{n as y}from"./dateFormValidation--aNpoRrd.js";import{d as ue,e as Ze,C as v,c as en,a as k,S as nn}from"./routes-DY2bjmhp.js";import{N as rn}from"./EgenNæring-DdBVG6ty.js";import{g as tn}from"./dateUtils-EvKMcKqf.js";import{m as sn}from"./tilretteleggingUtils-Dpape7Xv.js";import{F as on}from"./Forside-DlEyecnN.js";import{A as an}from"./ArbeidIUtlandetStep-BGiOkPMR.js";import{B as gn}from"./Barnet-BmRgEY3F.js";import{E as ln}from"./EgenNæringStep-AezLrY11.js";import{F as pn}from"./FrilansStep-CzMO0ekt.js";import{I as dn}from"./InntektsinformasjonSteg-C0kPmZrz.js";import{O as cn}from"./Oppsummering-Cc9bbP2w.js";import{P as un}from"./PerioderStep-DI1kSfbr.js";import{T as mn}from"./TilretteleggingStep-CDYW_M7e.js";import{U as kn}from"./UtenlandsoppholdSteg-g_FIawho.js";import{S as fn}from"./SenereUtenlandsoppholdSteg-BhciTUNf.js";import{T as vn}from"./TidligereUtenlandsoppholdSteg-Dgw0blzf.js";import{V as En}from"./VelgArbeid-BcemesBo.js";import{I as hn}from"./IkkeKvinne-B-SNTZIy.js";import{B as Sn}from"./ByttBrowserModal-qzV62nF4.js";import"./tslib.es6-pJfR_DrR.js";import"./ErrorSummaryHookForm-C2oW9Y-j.js";import"./Modal-BUY5Cvog.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-Dh6xGJdy.js";import"./SøkerOppsummeringspunkt-BjMxX3nY.js";import"./ConfirmationPanel-CW32K6KX.js";import"./useControllableState-cgc7bYZe.js";import"./TidligereUtenlandsoppholdPanel-Ct83jYEW.js";import"./ExpansionCard-Bjj_HrJJ.js";import"./Plus-DA51gZnq.js";import"./_baseIteratee-Br7F5h5R.js";import"./_baseUniq-BxoSU8YA.js";import"./index-Dcs0RV0A.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-BozE-Eyp.js";import"./ReadMore-B7MbZl_B.js";import"./velgArbeidFormUtils-YUNBfXex.js";import"./ArbeidsforholdInformasjon-Bb8A9tTl.js";import"./numberUtils-DCxWcr3S.js";const{Axios:kt,AxiosError:ft,CanceledError:vt,isCancel:Et,CancelToken:ht,VERSION:St,all:At,Cancel:yt,isAxiosError:An,spread:It,toFormData:bt,AxiosHeaders:wt,HttpStatusCode:Nt,formToJSON:Tt,getAdapter:Mt,mergeConfig:Lt}=ie;class E extends Error{constructor(r,t,o){super(r);F(this,"callId");F(this,"timestamp");this.callId=t,this.timestamp=o}}class M extends Error{constructor(){super("API_ACCESS_ERROR")}}const yn=e=>e instanceof M||e instanceof E,me=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,n)=>{const[r,t]=d.useState(),[o,a]=d.useState(!1),[g,i]=d.useState();return d.useEffect(()=>{let p=!1;return(async()=>{var l,c;try{a(!0);const f=await e.get(n,{withCredentials:!0,timeout:60*1e3});p||t(f.data)}catch(f){An(f)?((l=f.response)==null?void 0:l.status)===401||((c=f.response)==null?void 0:c.status)===403?i(new M):i(new E(f.message)):f instanceof Error?i(new E(f.message)):i(new E(String(f)))}finally{a(!1)}})(),()=>{p=!0}},[e,n]),{data:r,loading:o,error:g}},In=e=>ie.create({baseURL:e,withCredentials:!0}),B="ukjent uuid",ke=async(e,n,r,t,o=!1,a)=>{var g,i,p,u;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(l){if(me(l)&&l.code!=="ERR_CANCELED"){if(((g=l.response)==null?void 0:g.status)===401||((i=l.response)==null?void 0:i.status)===403)throw new M;const c=l.response&&l.response.data&&l.response.data.uuid?l.response.data.uuid:B,f=c!==B?c.slice(0,8):c;throw new E(t+f,c,(u=(p=l.response)==null?void 0:p.data)==null?void 0:u.timestamp)}throw l instanceof Error?new E(l.message):new E(String(l))}},q="ukjent uuid",L=async(e,n,r,t,o)=>{var a,g;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:t})).data}catch(i){if(me(i)&&i.code!=="ERR_CANCELED"){if(((a=i.response)==null?void 0:a.status)===401||((g=i.response)==null?void 0:g.status)===403)throw new M;const p=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:q,u=p!==q?p.slice(0,8):p;throw new E(r+u)}throw i instanceof Error?new E(i.message):new E(String(i))}},bn="From {fom} until {tom}",wn={tidsperiode:bn,"tidsperiode.kort":"{fom} - {tom}"},Nn="Fra {fom} til {tom}",Tn={tidsperiode:Nn,"tidsperiode.kort":"{fom} - {tom}"},Mn="Frå {fom} til {tom}",Ln={tidsperiode:Mn,"tidsperiode.kort":"{fom} - {tom}"};var C=function(e,n,r){if(r||arguments.length===2)for(var t=0,o=n.length,a;t<o;t++)(a||!(t in n))&&(a||(a=Array.prototype.slice.call(n,0,t)),a[t]=n[t]);return e.concat(a||Array.prototype.slice.call(n))},Rn=function(){function e(n,r,t){this.name=n,this.version=r,this.os=t,this.type="browser"}return e}(),xn=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),Fn=function(){function e(n,r,t,o){this.name=n,this.version=r,this.os=t,this.bot=o,this.type="bot-device"}return e}(),jn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Pn=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),_n=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Dn=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,G=3,On=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",_n]],U=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Bn(e){return typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Pn:typeof navigator<"u"?Cn(navigator.userAgent):Un()}function qn(e){return e!==""&&On.reduce(function(n,r){var t=r[0],o=r[1];if(n)return n;var a=o.exec(e);return!!a&&[t,a]},!1)}function Cn(e){var n=qn(e);if(!n)return null;var r=n[0],t=n[1];if(r==="searchbot")return new jn;var o=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);o?o.length<G&&(o=C(C([],o,!0),Vn(G-o.length),!0)):o=[];var a=o.join("."),g=Gn(e),i=Dn.exec(e);return i&&i[1]?new Fn(r,a,g,i[1]):new Rn(r,a,g)}function Gn(e){for(var n=0,r=U.length;n<r;n++){var t=U[n],o=t[0],a=t[1],g=a.exec(e);if(g)return o}return null}function Un(){var e=typeof process<"u"&&process.version;return e?new xn(process.version.slice(1)):null}function Vn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Kn=()=>{const e=Bn();return e?e.name==="ie":!1},fe=e=>{window.location.href=e},Wn=e=>{fe(e+"?redirect="+window.location.origin)};var ve=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ve||{});const Ee="selectedLocale",$n=()=>sessionStorage.getItem(Ee)||"nb",Hn=e=>{sessionStorage.setItem(Ee,e)},he={nb:Tn,nn:Ln,en:wn};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Jn="6";try{window.__reactRouterVersion=Jn}catch{}const Yn="startTransition",V=_e[Yn];function Xn(e){let{basename:n,children:r,future:t,window:o}=e,a=d.useRef();a.current==null&&(a.current=Ke({window:o,v5Compat:!0}));let g=a.current,[i,p]=d.useState({action:g.action,location:g.location}),{v7_startTransition:u}=t||{},l=d.useCallback(c=>{u&&V?V(()=>p(c)):p(c)},[p,u]);return d.useLayoutEffect(()=>g.listen(l),[g,l]),d.createElement(We,{basename:n,children:r,location:i.location,navigationType:i.action,navigator:g,future:t})}var K;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(K||(K={}));var W;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(W||(W={}));const zn=(e,n)=>{const r=j(),t=ue();return d.useCallback(async()=>{Oe("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),t(),n(!1);try{await L(e,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,t,e])},Se=2,$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Qn=(e,n,r)=>{const t=j(),o=Ze(),a=ue(),[g,i]=d.useState(!1),p=d.useRef();return d.useEffect(()=>{g&&(async()=>{i(!1);const c=o[v.APP_ROUTE];c?(t(c),await ke(e,"/storage/svangerskapspenger",{version:Se,locale:n,...o},$)):(r(!1),a(),t("/"),await L(e,"/storage/svangerskapspenger",$)),p.current&&p.current()})().catch(c=>{ce(c.message),p.current&&p.current()})},[g]),d.useCallback(()=>(i(!0),new Promise(c=>{p.current=c})),[])};var Ae=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(Ae||{}),ye=(e=>(e.MOR="mor",e))(ye||{}),Ie=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Ie||{});const be=e=>e.arbeidsforhold.type===D.FRILANSER||e.arbeidsforhold.type===D.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},H=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),Zn=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(H),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(H)}),er=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),nr=(e,n)=>({type:T.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),rr=(e,n)=>({type:T.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),tr=(e,n)=>({type:T.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),sr=e=>{const n=be(e);return e.type===T.HEL?nr(e,n):e.type===T.DELVIS?rr(e,n):tr(e,n)},or=e=>e.map(n=>sr(n)),ar=e=>Be(e)?ge(e).startOf("day").isAfter(qe,"day"):!0,ir=e=>{if(e){const n=e.næringstype===rn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=ar(e.fomDato),t={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...t,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...t,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},gr=e=>({type:Ae.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),lr=(e,n,r,t,o)=>{const a=ir(r),g=o?o.arbeidIUtlandet.map(p=>gr(p)):void 0;return{rolle:ye.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?t:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:g}},pr=e=>e.map(r=>{const t=be(r);return r.vedlegg.map(a=>({...a,dokumenterer:{type:ve.TILRETTELEGGING,arbeidsforhold:t}}))}).flat(1),dr=(e,n)=>{const r=Zn(y(e(v.UTENLANDSOPPHOLD)),e(v.UTENLANDSOPPHOLD_SENERE),e(v.UTENLANDSOPPHOLD_TIDLIGERE)),t=y(e(v.OM_BARNET)),o=y(e(v.TILRETTELEGGINGER)),a=er(t),g=pr(o),i=lr(n,y(e(v.INNTEKTSINFORMASJON)),e(v.EGEN_NÆRING),e(v.FRILANS),e(v.ARBEID_I_UTLANDET)),p=tn(t),u=sn(o,p),l=or(u);return{type:Ie.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:a,vedlegg:g,tilrettelegging:l,søker:i}},J="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",cr=(e,n,r)=>{const t=en(),[o,a]=d.useState(),g=d.useCallback(async i=>{const p=dr(t,r);let u;try{u=await ke(e,`${S.REST_API_URL}/soknad`,p,J,!0,i)}catch(l){if(yn(l))l instanceof E&&ce(l.message),a(l);else throw new Error("SendSøknad - This should never happen")}if(u){try{await L(e,"/storage/svangerskapspenger",J,i)}catch{}n(u)}},[t,n,r,e]);return d.useMemo(()=>({sendSøknad:g,errorSendSøknad:o}),[g,o])},R=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(Fe,{size:"2xlarge"})}),h=In(S.REST_API_URL),P=({error:e})=>e instanceof M?(Wn(S.LOGIN_URL),s.jsx(R,{})):s.jsx(Je,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),ur=(e,n,r,t,o)=>e?s.jsxs(s.Fragment,{children:[s.jsx(m,{path:k.BARNET,element:s.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.UTENLANDSOPPHOLD,element:s.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.HAR_BODD_I_UTLANDET,element:s.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.SKAL_BO_I_UTLANDET,element:s.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.INNTEKTSINFORMASJON,element:s.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.FRILANS,element:s.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.NÆRING,element:s.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.ARBEID_I_UTLANDET,element:s.jsx(an,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.VELG_ARBEID,element:s.jsx(En,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.SKJEMA,element:s.jsx(Pe,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.TILRETTELEGGING,element:s.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.PERIODER,element:s.jsx(un,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(m,{path:k.OPPSUMMERING,element:s.jsx(cn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,sendSøknad:o})})]}):s.jsx(m,{path:"*",element:s.jsx(He,{to:k.FORSIDE})}),we=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:t})=>{const o=j(),[a,g]=d.useState(!1),[i,p]=d.useState(),{sendSøknad:u,errorSendSøknad:l}=cr(h,p,n),c=Qn(h,n,g),f=zn(h,g);return d.useEffect(()=>{t&&t[v.APP_ROUTE]&&(g(!0),t.locale&&r(t.locale),o(t[v.APP_ROUTE]))},[t]),i?S.INNSYN?(fe(i.saksNr?`${S.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${S.INNSYN}/redirectFromSoknad`),s.jsx(R,{})):s.jsx("div",{children:"Redirected to Innsyn"}):l?s.jsx(P,{error:l}):s.jsxs($e,{children:[s.jsx(m,{path:k.FORSIDE,element:s.jsx(on,{mellomlagreSøknadOgNaviger:c,setHarGodkjentVilkår:g,harGodkjentVilkår:a,locale:n,onChangeLocale:r})}),ur(a,e,c,f,u)]})};R.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};we.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ne=({locale:e,onChangeLocale:n})=>{const r=je();Ye(r.formatMessage({id:"søknad.pagetitle"}));const{data:t,error:o}=O(h,"/sokerinfo"),{data:a,loading:g,error:i}=O(h,"/storage/svangerskapspenger");if(o||i)return s.jsx(P,{error:y(o||i)});if(!t||g)return s.jsx(R,{});if(!(t.søker.kjønn==="K"))return s.jsx(hn,{});const u=Ce(t.søker.fødselsdato),l=(a==null?void 0:a.version)===Se?a:void 0;return s.jsx("div",{children:u?s.jsx(Xn,{children:s.jsx(nn,{initialState:l,children:s.jsx(we,{locale:e,onChangeLocale:n,søkerInfo:t,mellomlagretData:l})})}):s.jsx(Xe,{appnavn:"Svangerskapspenger"})})};Ne.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const mr={...Ue,...le.nb,...pe.nb,...de.nb,...he.nb},kr={...Ve,...le.nn,...pe.nn,...de.nn,...he.nn},Te=$n(),fr={nb:mr,nn:kr};ge.locale(Te);const vr=async()=>{try{await L(h,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Me=()=>{const[e,n]=d.useState(Te);return s.jsx(ze,{locale:e,messagesGroupedByLocale:fr,children:s.jsxs(Qe,{appName:"Svangerskapspenger",retryCallback:vr,children:[s.jsx(Sn,{skalEndreNettleser:Kn()}),s.jsx(Ne,{locale:e,onChangeLocale:r=>{Hn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Le=Me;Me.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const A={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},Rt={title:"AppContainer",component:Le},x=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Ge();const t=new _(h);t.onGet("/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),t.onGet("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),t.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),t.onPost("/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),t.onDelete("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200]));const o=new _(De);return o.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),o.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),s.jsx(Le,{})},I=x.bind({});I.args={søkerinfo:A};const b=x.bind({});b.args={søkerinfo:{...A,arbeidsforhold:[]}};const w=x.bind({});w.args={søkerinfo:{...A,søker:{...A.søker,kjønn:"M"}}};const N=x.bind({});N.args={søkerinfo:{...A,søker:{...A.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,X,z;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(z=(X=I.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var Q,Z,ee;b.parameters={...b.parameters,docs:{...(Q=b.parameters)==null?void 0:Q.docs,source:{originalSource:`({
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
}`,...(ee=(Z=b.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,re,te;w.parameters={...w.parameters,docs:{...(ne=w.parameters)==null?void 0:ne.docs,source:{originalSource:`({
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
}`,...(te=(re=w.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var se,oe,ae;N.parameters={...N.parameters,docs:{...(se=N.parameters)==null?void 0:se.docs,source:{originalSource:`({
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
}`,...(ae=(oe=N.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};const xt=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,b as VisAppKvinneUtenArbeid,w as VisAppMann,N as VisAppUmyndig,xt as __namedExportsOrder,Rt as default};
