var Ge=Object.defineProperty;var Ve=(e,n,r)=>n in e?Ge(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var X=(e,n,r)=>(Ve(e,typeof n!="symbol"?n+"":n,r),r);import{j as s,L as qe,u as Ue}from"./Modal-5f6515f6.js";/* empty css              */import{E as F,S as Ke,M as ee}from"./SkjemaSteg-20eeb79b.js";import{r as f,c as We,g as $e}from"./index-f1f2c4b1.js";import{I as v,d as H,J as He,K as ze,M as Ie,N as we}from"./fridagerUtils-8a4187a7.js";import{c as Ne,E as Ye,u as Je,U as Xe,I as Ze,a as Qe}from"./IntlProvider-695f9b5c.js";import"./dates-f0f943ad.js";import{n as en,a as ne,b as nn}from"./nn_NO-ad7ed4eb.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{b as Me,a as rn}from"./attachmentApi-1d2d61fa.js";import{I as tn,B as sn}from"./IkkeKvinne-1d487ccc.js";import{n as O}from"./validation-631bcf6e.js";import"./dateFormValidation-061ee335.js";import{F as on}from"./Forside-f4c79113.js";import{B as an}from"./Barnet-6a43c00a.js";import{I as pn}from"./Inntektsinformasjon-438be86a.js";import{U as gn}from"./UtenlandsoppholdSteg-314f8c59.js";import{T as ln}from"./TilretteleggingStep-3c1f64c7.js";import{O as dn}from"./Oppsummering-fdc51487.js";import{F as cn}from"./FrilansStep-4fe9c199.js";import{a as un,A as mn}from"./ArbeidIUtlandetStep-88cdec87.js";import{V as fn}from"./VelgArbeid-afba1215.js";import{E as vn}from"./EgenNæringStep-8e352cbb.js";import{P as kn}from"./PerioderStep-e28437f2.js";import{c as hn,d as xe,C as I,e as Sn,b as h,S as En}from"./routes-345f7acb.js";import{h as Q,i as An,j as S,N as yn}from"./index-0df0c4a0.js";import{l as In}from"./amplitude-672a2544.js";import{T as wn}from"./TidligereUtenlandsoppholdSteg-2532eddb.js";import{S as Nn}from"./SenereUtenlandsoppholdSteg-5e2e811d.js";import{e as Mn}from"./egenNæringFormUtils-96917a4e.js";import{ab as xn,A as re,ac as G,R as Tn}from"./useFortsettSøknadSenere-fa5c8d8a.js";import{g as bn}from"./dateUtils-cbce580e.js";import{B as _n}from"./ByttBrowserModal-b9f95f6a.js";import"./index-da441cba.js";import"./ErrorSummaryHookForm-e967ee9b.js";import"./isNativeReflectConstruct-554b52b6.js";import"./check-dates-d5278c7f.js";import"./ArrowRight-7eea1688.js";import"./Bedriftsbanner-76c9e355.js";import"./HStack-13158dfb.js";import"./VStack-ea079a1e.js";import"./links-439b6638.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./Alert-4ba076fc.js";import"./Paperplane-3462cdad.js";import"./createIntl-f391d6e4.js";import"./index-47edccfa.js";import"./ArbeidsforholdInformasjon-74c5685d.js";import"./ExpansionCard-3d7aef3e.js";import"./BackButton-f80f5ffe.js";import"./TidligereUtenlandsoppholdPanel-39c2eed9.js";import"./Plus-b48ff6db.js";import"./tilretteleggingValidation-42f025e5.js";import"./HorizontalLine-831b0129.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";const Te="selectedLocale",Ln=()=>sessionStorage.getItem(Te)||"nb",Fn=e=>{sessionStorage.setItem(Te,e)},{Axios:_t,AxiosError:Lt,CanceledError:Ft,isCancel:Rt,CancelToken:jt,VERSION:Ot,all:Pt,Cancel:Dt,isAxiosError:Rn,spread:Ct,toFormData:Bt,AxiosHeaders:Gt,HttpStatusCode:Vt,formToJSON:qt,getAdapter:Ut,mergeConfig:Kt}=Me;class w extends Error{constructor(r,t,o){super(r);X(this,"callId");X(this,"timestamp");this.callId=t,this.timestamp=o}}class q extends Error{constructor(){super("API_ACCESS_ERROR")}}const jn=e=>e instanceof q||e instanceof w,be=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),te=(e,n)=>{const[r,t]=f.useState(),[o,i]=f.useState(!1),[p,a]=f.useState();return f.useEffect(()=>{let d=!1;return(async()=>{var g,c;try{i(!0);const l=await e.get(n,{withCredentials:!0,timeout:60*1e3});d||t(l.data)}catch(l){Rn(l)?((g=l.response)==null?void 0:g.status)===401||((c=l.response)==null?void 0:c.status)===403?a(new q):a(new w(l.message)):l instanceof Error?a(new w(l.message)):a(new w(String(l)))}finally{i(!1)}})(),()=>{d=!0}},[e,n]),{data:r,loading:o,error:p}},On=e=>Me.create({baseURL:e,withCredentials:!0}),se="ukjent uuid",_e=async(e,n,r,t,o=!1,i)=>{var p,a,d,u;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:i,headers:o?{"content-type":"application/json;"}:{}})).data}catch(g){if(be(g)&&g.code!=="ERR_CANCELED"){if(((p=g.response)==null?void 0:p.status)===401||((a=g.response)==null?void 0:a.status)===403)throw new q;const c=g.response&&g.response.data&&g.response.data.uuid?g.response.data.uuid:se,l=c!==se?c.slice(0,8):c;throw new w(t+l,c,(u=(d=g.response)==null?void 0:d.data)==null?void 0:u.timestamp)}throw g instanceof Error?new w(g.message):new w(String(g))}},oe="ukjent uuid",z=async(e,n,r,t,o)=>{var i,p;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:o,data:t})).data}catch(a){if(be(a)&&a.code!=="ERR_CANCELED"){if(((i=a.response)==null?void 0:i.status)===401||((p=a.response)==null?void 0:p.status)===403)throw new q;const d=a.response&&a.response.data&&a.response.data.uuid?a.response.data.uuid:oe,u=d!==oe?d.slice(0,8):d;throw new w(r+u)}throw a instanceof Error?new w(a.message):new w(String(a))}};var ae=globalThis&&globalThis.__spreadArray||function(e,n,r){if(r||arguments.length===2)for(var t=0,o=n.length,i;t<o;t++)(i||!(t in n))&&(i||(i=Array.prototype.slice.call(n,0,t)),i[t]=n[t]);return e.concat(i||Array.prototype.slice.call(n))},Pn=function(){function e(n,r,t){this.name=n,this.version=r,this.os=t,this.type="browser"}return e}(),Dn=function(){function e(n){this.version=n,this.type="node",this.name="node",this.os=process.platform}return e}(),Cn=function(){function e(n,r,t,o){this.name=n,this.version=r,this.os=t,this.bot=o,this.type="bot-device"}return e}(),Bn=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Gn=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),Vn=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,qn=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,ie=3,Un=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",Vn]],pe=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Kn(e){return e?ge(e):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Gn:typeof navigator<"u"?ge(navigator.userAgent):Hn()}function Wn(e){return e!==""&&Un.reduce(function(n,r){var t=r[0],o=r[1];if(n)return n;var i=o.exec(e);return!!i&&[t,i]},!1)}function ge(e){var n=Wn(e);if(!n)return null;var r=n[0],t=n[1];if(r==="searchbot")return new Bn;var o=t[1]&&t[1].split(".").join("_").split("_").slice(0,3);o?o.length<ie&&(o=ae(ae([],o,!0),zn(ie-o.length),!0)):o=[];var i=o.join("."),p=$n(e),a=qn.exec(e);return a&&a[1]?new Cn(r,i,p,a[1]):new Pn(r,i,p)}function $n(e){for(var n=0,r=pe.length;n<r;n++){var t=pe[n],o=t[0],i=t[1],p=i.exec(e);if(p)return o}return null}function Hn(){var e=typeof process<"u"&&process.version;return e?new Dn(process.version.slice(1)):null}function zn(e){for(var n=[],r=0;r<e;r++)n.push("0");return n}const Le=e=>{window.location.href=e},Yn=e=>{Le(e+"?redirect="+window.location.origin)},W="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Fe=1,Jn=(e,n,r)=>{const t=Q(),o=hn(),i=xe(),[p,a]=f.useState(!1),d=f.useRef();return f.useEffect(()=>{p&&(async()=>{a(!1);const c=o[I.APP_ROUTE];c?(t(c),await _e(e,"/storage/svangerskapspenger",{version:Fe,locale:n,...o},W)):(r(!1),i(),t("/"),await z(e,"/storage/svangerskapspenger",W)),d.current&&d.current()})().catch(c=>{Ne(c.message),d.current&&d.current()})},[p]),f.useCallback(()=>(a(!0),new Promise(c=>{d.current=c})),[])},Xn=(e,n)=>{const r=Q(),t=xe();return f.useCallback(async()=>{In("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),t(),n(!1);try{await z(e,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,t,e])};var Re=(e=>(e.TILRETTELEGGING="tilrettelegging",e))(Re||{}),je=(e=>(e.MOR="mor",e))(je||{}),Oe=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Oe||{});const Pe=e=>e.arbeidsforhold.type===re.FRILANSER||e.arbeidsforhold.type===re.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},le=e=>({land:e.land,tidsperiode:{fom:v(e.tidsperiode.fom),tom:v(e.tidsperiode.tom)}}),Zn=(e,n,r)=>({iNorgeSiste12Mnd:e.iNorgeSiste12Mnd,iNorgeNeste12Mnd:e.iNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.tidligereOpphold)||[]).map(le),senereOpphold:((n==null?void 0:n.senereOpphold)||[]).map(le)}),Qn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:v(e.termindato),fødselsdatoer:e.fødselsdato?[v(e.fødselsdato)]:void 0}),er=(e,n)=>({type:G.HEL,tilrettelagtArbeidFom:v(e.fom),arbeidsforhold:n,behovForTilretteleggingFom:v(e.behovForTilretteleggingFom)}),nr=(e,n)=>({type:G.DELVIS,tilrettelagtArbeidFom:v(e.fom),arbeidsforhold:n,behovForTilretteleggingFom:v(e.behovForTilretteleggingFom),stillingsprosent:e.stillingsprosent}),rr=(e,n)=>({type:G.INGEN,slutteArbeidFom:v(e.fom),arbeidsforhold:n,behovForTilretteleggingFom:v(e.behovForTilretteleggingFom)}),tr=e=>{const n=Pe(e);return e.type===G.HEL?er(e,n):e.type===G.DELVIS?nr(e,n):rr(e,n)},sr=e=>e.map(n=>tr(n)),or=e=>{if(e){const n=e.næringstype===Tn.FISKER&&e.navnPåNæringen.trim().length===0?void 0:e.navnPåNæringen,r=Mn(v(e.tidsperiode.fom)),t={næringstyper:[e.næringstype],tidsperiode:{fom:v(e.tidsperiode.fom),tom:v(e.tidsperiode.tom)},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer?e.organisasjonsnummer:void 0,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand?e.registrertILand:void 0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...t,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...t,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:v(e.varigEndringDato),næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},ar=e=>{if(e)return{...e,oppstart:v(e.oppstart)}},ir=e=>({type:un.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:v(e.tidsperiode.fom),tom:v(e.tidsperiode.tom)}}),pr=(e,n,r,t,o)=>{const i=or(r),p=o?o.map(d=>ir(d)):void 0;return{rolle:je.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?ar(t):void 0,selvstendigNæringsdrivendeInformasjon:i?[i]:void 0,andreInntekterSiste10Mnd:p}},gr=e=>e.map(r=>{const t=Pe(r);return r.vedlegg.map(i=>({...i,dokumenterer:{type:Re.TILRETTELEGGING,arbeidsforhold:t}}))}).flat(1),lr=(e,n)=>{const r=Zn(O(e(I.UTENLANDSOPPHOLD)),e(I.UTENLANDSOPPHOLD_SENERE),e(I.UTENLANDSOPPHOLD_TIDLIGERE)),t=O(e(I.OM_BARNET)),o=O(e(I.TILRETTELEGGINGER)),i=Qn(t),p=gr(o),a=pr(n,O(e(I.INNTEKTSINFORMASJON)),e(I.EGEN_NÆRING),e(I.FRILANS),e(I.ARBEID_I_UTLANDET)),d=bn(t),u=xn(o,d),g=sr(u);return{type:Oe.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:i,vedlegg:p,tilrettelegging:g,søker:a}},dr=(e,n,r)=>{const t=Sn(),[o,i]=f.useState(),p=f.useCallback(async a=>{const d=lr(t,r);let u;try{u=await _e(e,`${F.REST_API_URL}/soknad`,d,W,!0,a)}catch(g){if(jn(g))g instanceof w&&Ne(g.message),i(g);else throw new Error("SendSøknad - This should never happen")}if(u){try{await z(e,"/storage/svangerskapspenger",W,a)}catch{}n(u)}},[t,n,r,e]);return f.useMemo(()=>({sendSøknad:p,errorSendSøknad:o}),[p,o])},V=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(qe,{size:"2xlarge"})}),x=On(F.REST_API_URL),$=({error:e})=>e instanceof q?(Yn(F.LOGIN_URL),s.jsx(V,{})):s.jsx(Ye,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),cr=(e,n,r,t,o)=>e?s.jsxs(s.Fragment,{children:[s.jsx(S,{path:h.BARNET,element:s.jsx(an,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.UTENLANDSOPPHOLD,element:s.jsx(gn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.HAR_BODD_I_UTLANDET,element:s.jsx(wn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.SKAL_BO_I_UTLANDET,element:s.jsx(Nn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.ARBEID,element:s.jsx(pn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.FRILANS,element:s.jsx(cn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.NÆRING,element:s.jsx(vn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.ARBEID_I_UTLANDET,element:s.jsx(mn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.VELG_ARBEID,element:s.jsx(fn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.SKJEMA,element:s.jsx(Ke,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.TILRETTELEGGING,element:s.jsx(ln,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.PERIODER,element:s.jsx(kn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t})}),s.jsx(S,{path:h.OPPSUMMERING,element:s.jsx(dn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:t,sendSøknad:o})})]}):s.jsx(S,{path:"*",element:s.jsx(yn,{to:h.FORSIDE})}),ur=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:t})=>{const o=Q(),[i,p]=f.useState(!1),[a,d]=f.useState(),{sendSøknad:u,errorSendSøknad:g}=dr(x,d,n),c=Jn(x,n,p),l=Xn(x,p);return f.useEffect(()=>{t&&t[I.APP_ROUTE]&&(p(!0),t.locale&&r(t.locale),o(t[I.APP_ROUTE]))},[t]),a?F.INNSYN?(Le(a.saksNr?`${F.INNSYN}/sak/${a.saksNr}/redirectFromSoknad`:`${F.INNSYN}/redirectFromSoknad`),s.jsx(V,{})):s.jsx("div",{children:"Redirected to Innsyn"}):g?s.jsx($,{error:g}):s.jsxs(An,{children:[s.jsx(S,{path:h.FORSIDE,element:s.jsx(on,{mellomlagreSøknadOgNaviger:c,setHarGodkjentVilkår:p,harGodkjentVilkår:i,locale:n,onChangeLocale:r})}),cr(i,e,c,l,u)]})};try{V.displayName="Spinner",V.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{x.displayName="svpApi",x.__docgenInfo={description:"",displayName:"svpApi",props:{}}}catch{}try{$.displayName="ApiErrorHandler",$.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{SvangerskapspengesknadRoutes.displayName="SvangerskapspengesknadRoutes",SvangerskapspengesknadRoutes.__docgenInfo={description:"",displayName:"SvangerskapspengesknadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"SvpDataMapAndMetaData"}}}}}catch{}var De={exports:{}};(function(e,n){(function(r,t){e.exports=t()})(We,function(){var r={year:0,month:1,day:2,hour:3,minute:4,second:5},t={};return function(o,i,p){var a,d=function(l,A,k){k===void 0&&(k={});var m=new Date(l),y=function(M,E){E===void 0&&(E={});var T=E.timeZoneName||"short",b=M+"|"+T,N=t[b];return N||(N=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:M,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:T}),t[b]=N),N}(A,k);return y.formatToParts(m)},u=function(l,A){for(var k=d(l,A),m=[],y=0;y<k.length;y+=1){var M=k[y],E=M.type,T=M.value,b=r[E];b>=0&&(m[b]=parseInt(T,10))}var N=m[3],U=N===24?0:N,_=m[0]+"-"+m[1]+"-"+m[2]+" "+U+":"+m[4]+":"+m[5]+":000",j=+l;return(p.utc(_).valueOf()-(j-=j%1e3))/6e4},g=i.prototype;g.tz=function(l,A){l===void 0&&(l=a);var k=this.utcOffset(),m=this.toDate(),y=m.toLocaleString("en-US",{timeZone:l}),M=Math.round((m-new Date(y))/1e3/60),E=p(y,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(m.getTimezoneOffset()/15)-M,!0);if(A){var T=E.utcOffset();E=E.add(k-T,"minute")}return E.$x.$timezone=l,E},g.offsetName=function(l){var A=this.$x.$timezone||p.tz.guess(),k=d(this.valueOf(),A,{timeZoneName:l}).find(function(m){return m.type.toLowerCase()==="timezonename"});return k&&k.value};var c=g.startOf;g.startOf=function(l,A){if(!this.$x||!this.$x.$timezone)return c.call(this,l,A);var k=p(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return c.call(k,l,A).tz(this.$x.$timezone,!0)},p.tz=function(l,A,k){var m=k&&A,y=k||A||a,M=u(+p(),y);if(typeof l!="string")return p(l).tz(y);var E=function(U,_,j){var K=U-60*_*1e3,L=u(K,j);if(_===L)return[K,_];var J=u(K-=60*(L-_)*1e3,j);return L===J?[K,L]:[U-60*Math.min(L,J)*1e3,Math.max(L,J)]}(p.utc(l,m).valueOf(),M,y),T=E[0],b=E[1],N=p(T).utcOffset(b);return N.$x.$timezone=y,N},p.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},p.tz.setDefault=function(l){a=l}}})})(De);var mr=De.exports;const fr=$e(mr);H.extend(He);H.extend(fr);const vr=e=>e?e.map(n=>({id:ze(),arbeidsgiverId:n.arbeidsgiverId,arbeidsgiverIdType:n.arbeidsgiverIdType,arbeidsgiverNavn:n.arbeidsgiverNavn,fom:n.fom,stillingsprosent:n.stillingsprosent,tom:n.tom?n.tom:void 0})):[],kr=e=>({erKvinne:Ie(e.kjønn),erMyndig:we(e.fødselsdato),etternavn:e.etternavn,fornavn:e.fornavn,fnr:e.fnr,fødselsdato:H.utc(e.fødselsdato).toDate(),kjønn:e.kjønn}),hr=e=>{const n=vr(e.arbeidsforhold),r=kr(e.søker);return{arbeidsforhold:n,person:r}},Sr=({locale:e,onChangeLocale:n})=>{const r=Ue();Je(r.formatMessage({id:"søknad.pagetitle"}));const{data:t,error:o}=te(x,"/sokerinfo"),{data:i,loading:p,error:a}=te(x,"/storage/svangerskapspenger"),d=f.useMemo(()=>t?hr(t):void 0,[t]);if(o||a)return s.jsx($,{error:O(o||a)});if(!d||p)return s.jsx(V,{});if(!Ie(d.person.kjønn))return s.jsx(tn,{});const g=we(d.person.fødselsdato),c=(i==null?void 0:i.version)===Fe?i:void 0;return s.jsx("div",{children:g?s.jsx(sn,{children:s.jsx(En,{initialState:c,children:s.jsx(ur,{locale:e,onChangeLocale:n,søkerInfo:d,mellomlagretData:c})})}):s.jsx(Xe,{appnavn:"Svangerskapspenger"})})};try{Svangerskapspengesknad.displayName="Svangerskapspengesknad",Svangerskapspengesknad.__docgenInfo={description:"",displayName:"Svangerskapspengesknad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"any"}}}}}catch{}const Er=()=>{const e=Kn();return e?e.name==="ie":!1},Ce=Ln(),Ar={nb:{...en,...ne.nb},nn:{...nn,...ne.nn}};H.locale(Ce);const yr=async()=>{try{await z(x,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Z=()=>{const[e,n]=f.useState(Ce);return s.jsx(Ze,{locale:e,messagesGroupedByLocale:Ar,children:s.jsxs(Qe,{appName:"Svangerskapspenger",retryCallback:yr,children:[s.jsx(_n,{skalEndreNettleser:Er()}),s.jsx(Sr,{locale:e,onChangeLocale:r=>{Fn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Be=Z;try{Z.displayName="AppContainer",Z.__docgenInfo={description:"",displayName:"AppContainer",props:{}}}catch{}const Ir=[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}],wr={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:Ir},R=wr,Wt={title:"AppContainer",component:Be},Y=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{const t=new ee(x);t.onGet("/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),t.onGet("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),t.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),t.onPost("/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),t.onPost("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),t.onDelete("/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200]));const o=new ee(rn);return o.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),o.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),s.jsx(Be,{})},P=Y.bind({});P.args={søkerinfo:R};const D=Y.bind({});D.args={søkerinfo:{...R,arbeidsforhold:[]}};const C=Y.bind({});C.args={søkerinfo:{...R,søker:{...R.søker,kjønn:"M"}}};const B=Y.bind({});B.args={søkerinfo:{...R,søker:{...R.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var de,ce,ue;P.parameters={...P.parameters,docs:{...(de=P.parameters)==null?void 0:de.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
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
}`,...(ue=(ce=P.parameters)==null?void 0:ce.docs)==null?void 0:ue.source}}};var me,fe,ve;D.parameters={...D.parameters,docs:{...(me=D.parameters)==null?void 0:me.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
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
}`,...(ve=(fe=D.parameters)==null?void 0:fe.docs)==null?void 0:ve.source}}};var ke,he,Se;C.parameters={...C.parameters,docs:{...(ke=C.parameters)==null?void 0:ke.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
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
}`,...(Se=(he=C.parameters)==null?void 0:he.docs)==null?void 0:Se.source}}};var Ee,Ae,ye;B.parameters={...B.parameters,docs:{...(Ee=B.parameters)==null?void 0:Ee.docs,source:{originalSource:`({
  søkerinfo,
  mellomlagretData,
  doLogging = true
}) => {
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
}`,...(ye=(Ae=B.parameters)==null?void 0:Ae.docs)==null?void 0:ye.source}}};const $t=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{P as VisAppKvinneMedArbeid,D as VisAppKvinneUtenArbeid,C as VisAppMann,B as VisAppUmyndig,$t as __namedExportsOrder,Wt as default};
