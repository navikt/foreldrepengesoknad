var Ie=Object.defineProperty;var ye=(e,r,n)=>r in e?Ie(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var F=(e,r,n)=>(ye(e,typeof r!="symbol"?r+"":r,n),n);import{j as t,u as Ne}from"./index-f7e8eec7.js";import{E as S,S as we,M as j}from"./SkjemaSteg-7fe40f68.js";/* empty css              */import{r as u}from"./index-f1f2c4b1.js";import{b as ae,a as be}from"./attachmentApi-1d2d61fa.js";import{k as Te,b as _e,d as ie,r as Me,E as Le,i as xe}from"./VStack-1b7d0c8f.js";import{k as pe,l as Re,m as ge,C as v,j as Fe,E as Pe,a as m,n as Oe,U as je,S as De,I as Be,o as Ce}from"./routes-999d7714.js";import{I as Ge,B as Ve}from"./IkkeKvinne-c0ed6a51.js";import{n as I,A as D,k as T}from"./useSvpNavigator-7f6afa8c.js";import{h as O,i as Ue,j as k,N as qe}from"./index-0df0c4a0.js";import{N as Ke}from"./EgenNæring-1a3aa973.js";import{g as We}from"./dateUtils-596e9d2c.js";import{m as He}from"./tilretteleggingUtils-3df42593.js";import{F as $e}from"./Forside-3a6dc477.js";import{A as Ye}from"./ArbeidIUtlandetStep-7c349dbd.js";import{B as Je}from"./Barnet-15c99e81.js";import{E as Xe}from"./EgenNæringStep-a1a76c6a.js";import{F as ze}from"./FrilansStep-e3a0bd27.js";import{I as Qe}from"./InntektsinformasjonSteg-1a6040b8.js";import{O as Ze}from"./Oppsummering-822a0d86.js";import{P as er}from"./PerioderStep-a988a65b.js";import{T as rr}from"./TilretteleggingStep-e7229efd.js";import{U as nr}from"./UtenlandsoppholdSteg-8016b127.js";import{S as sr}from"./SenereUtenlandsoppholdSteg-029c965d.js";import{T as tr}from"./TidligereUtenlandsoppholdSteg-809b2c5d.js";import{V as or}from"./VelgArbeid-b02ce341.js";import{L as ar}from"./Button-07c65ca4.js";import{n as ir,a as pr}from"./nn_NO-4167bb8c.js";import{B as gr}from"./ByttBrowserModal-4f4e97a2.js";import"./ErrorSummaryHookForm-b3689071.js";import"./Modal-d372bfb0.js";import"./index-da441cba.js";import"./attachmentType-7a83d42b.js";import"./Bedriftsbanner-2bf3cbcf.js";import"./index-b580f7e8.js";import"./createIntl-34ad85ce.js";import"./_baseIteratee-c0f324be.js";import"./_baseUniq-332e0f4d.js";import"./Frilans-f45bffb0.js";import"./HorizontalLine-a53a7446.js";import"./validationUtils-9ec7b8ab.js";import"./ReadMore-c884ad2a.js";import"./velgArbeidFormUtils-95eaeee3.js";import"./ArbeidsforholdInformasjon-3957f89c.js";import"./ExpansionCard-3069fe02.js";import"./numberUtils-1f932ffe.js";import"./TidligereUtenlandsoppholdPanel-c52896c0.js";const{Axios:Hn,AxiosError:$n,CanceledError:Yn,isCancel:Jn,CancelToken:Xn,VERSION:zn,all:Qn,Cancel:Zn,isAxiosError:lr,spread:es,toFormData:rs,AxiosHeaders:ns,HttpStatusCode:ss,formToJSON:ts,getAdapter:os,mergeConfig:as}=ae;class h extends Error{constructor(n,s,o){super(n);F(this,"callId");F(this,"timestamp");this.callId=s,this.timestamp=o}}class M extends Error{constructor(){super("API_ACCESS_ERROR")}}const dr=e=>e instanceof M||e instanceof h,le=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),B=(e,r)=>{const[n,s]=u.useState(),[o,a]=u.useState(!1),[g,i]=u.useState();return u.useEffect(()=>{let l=!1;return(async()=>{var p,d;try{a(!0);const f=await e.get(r,{withCredentials:!0,timeout:60*1e3});l||s(f.data)}catch(f){lr(f)?((p=f.response)==null?void 0:p.status)===401||((d=f.response)==null?void 0:d.status)===403?i(new M):i(new h(f.message)):f instanceof Error?i(new h(f.message)):i(new h(String(f)))}finally{a(!1)}})(),()=>{l=!0}},[e,r]),{data:n,loading:o,error:g}},cr=e=>ae.create({baseURL:e,withCredentials:!0}),C="ukjent uuid",de=async(e,r,n,s,o=!1,a)=>{var g,i,l,c;try{return(await e.post(r,n,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(p){if(le(p)&&p.code!=="ERR_CANCELED"){if(((g=p.response)==null?void 0:g.status)===401||((i=p.response)==null?void 0:i.status)===403)throw new M;const d=p.response&&p.response.data&&p.response.data.uuid?p.response.data.uuid:C,f=d!==C?d.slice(0,8):d;throw new h(s+f,d,(c=(l=p.response)==null?void 0:l.data)==null?void 0:c.timestamp)}throw p instanceof Error?new h(p.message):new h(String(p))}},G="ukjent uuid",x=async(e,r,n,s,o)=>{var a,g;try{return(await e.delete(r,{withCredentials:!0,timeout:6e4,signal:o,data:s})).data}catch(i){if(le(i)&&i.code!=="ERR_CANCELED"){if(((a=i.response)==null?void 0:a.status)===401||((g=i.response)==null?void 0:g.status)===403)throw new M;const l=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:G,c=l!==G?l.slice(0,8):l;throw new h(n+c)}throw i instanceof Error?new h(i.message):new h(String(i))}};var V=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,a;s<o;s++)(a||!(s in r))&&(a||(a=Array.prototype.slice.call(r,0,s)),a[s]=r[s]);return e.concat(a||Array.prototype.slice.call(r))},ur=function(){function e(r,n,s){this.name=r,this.version=n,this.os=s,this.type="browser"}return e}(),mr=function(){function e(r){this.version=r,this.type="node",this.name="node",this.os=process.platform}return e}(),kr=function(){function e(r,n,s,o){this.name=r,this.version=n,this.os=s,this.bot=o,this.type="bot-device"}return e}(),fr=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),vr=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),hr=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Er=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,U=3,Sr=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",hr]],q=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Ar(e){return e?K(e):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new vr:typeof navigator<"u"?K(navigator.userAgent):Nr()}function Ir(e){return e!==""&&Sr.reduce(function(r,n){var s=n[0],o=n[1];if(r)return r;var a=o.exec(e);return!!a&&[s,a]},!1)}function K(e){var r=Ir(e);if(!r)return null;var n=r[0],s=r[1];if(n==="searchbot")return new fr;var o=s[1]&&s[1].split(".").join("_").split("_").slice(0,3);o?o.length<U&&(o=V(V([],o,!0),wr(U-o.length),!0)):o=[];var a=o.join("."),g=yr(e),i=Er.exec(e);return i&&i[1]?new kr(n,a,g,i[1]):new ur(n,a,g)}function yr(e){for(var r=0,n=q.length;r<n;r++){var s=q[r],o=s[0],a=s[1],g=a.exec(e);if(g)return o}return null}function Nr(){var e=typeof process<"u"&&process.version;return e?new mr(process.version.slice(1)):null}function wr(e){for(var r=[],n=0;n<e;n++)r.push("0");return r}const br=()=>{const e=Ar();return e?e.name==="ie":!1},ce=e=>{window.location.href=e},Tr=e=>{ce(e+"?redirect="+window.location.origin)},ue="selectedLocale",_r=()=>sessionStorage.getItem(ue)||"nb",Mr=e=>{sessionStorage.setItem(ue,e)},Lr=(e,r)=>{const n=O(),s=pe();return u.useCallback(async()=>{Te("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),r(!1);try{await x(e,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}n("/")},[n,r,s,e])},me=2,W="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",xr=(e,r,n)=>{const s=O(),o=Re(),a=pe(),[g,i]=u.useState(!1),l=u.useRef();return u.useEffect(()=>{g&&(async()=>{i(!1);const d=o[v.APP_ROUTE];d?(s(d),await de(e,"/storage/svangerskapspenger",{version:me,locale:r,...o},W)):(n(!1),a(),s("/"),await x(e,"/storage/svangerskapspenger",W)),l.current&&l.current()})().catch(d=>{ge(d.message),l.current&&l.current()})},[g]),u.useCallback(()=>(i(!0),new Promise(d=>{l.current=d})),[])};var ke=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ke||{}),fe=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(fe||{}),ve=(e=>(e.MOR="mor",e))(ve||{}),he=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(he||{});const Ee=e=>e.arbeidsforhold.type===D.FRILANSER||e.arbeidsforhold.type===D.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},H=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),Rr=(e,r,n)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((n==null?void 0:n.utenlandsoppholdSiste12Mnd)||[]).map(H),senereOpphold:((r==null?void 0:r.utenlandsoppholdNeste12Mnd)||[]).map(H)}),Fr=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),Pr=(e,r)=>({type:T.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:r,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Or=(e,r)=>({type:T.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:r,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),jr=(e,r)=>({type:T.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:r,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Dr=e=>{const r=Ee(e);return e.type===T.HEL?Pr(e,r):e.type===T.DELVIS?Or(e,r):jr(e,r)},Br=e=>e.map(r=>Dr(r)),Cr=e=>_e(e)?ie(e).startOf("day").isAfter(Me,"day"):!0,Gr=e=>{if(e){const r=e.næringstype===Ke.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,n=Cr(e.fomDato),s={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:r,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return n?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},Vr=e=>({type:fe.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),Ur=(e,r,n,s,o)=>{const a=Gr(n),g=o?o.arbeidIUtlandet.map(l=>Vr(l)):void 0;return{rolle:ve.MOR,språkkode:e,frilansInformasjon:r.harJobbetSomFrilans?s:void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:g}},qr=e=>e.map(n=>{const s=Ee(n);return n.vedlegg.map(a=>({...a,dokumenterer:{type:ke.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),Kr=(e,r)=>{const n=Rr(I(e(v.UTENLANDSOPPHOLD)),e(v.UTENLANDSOPPHOLD_SENERE),e(v.UTENLANDSOPPHOLD_TIDLIGERE)),s=I(e(v.OM_BARNET)),o=I(e(v.TILRETTELEGGINGER)),a=Fr(s),g=qr(o),i=Ur(r,I(e(v.INNTEKTSINFORMASJON)),e(v.EGEN_NÆRING),e(v.FRILANS),e(v.ARBEID_I_UTLANDET)),l=We(s),c=He(o,l),p=Br(c);return{type:he.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:n,barn:a,vedlegg:g,tilrettelegging:p,søker:i}},$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Wr=(e,r,n)=>{const s=Fe(),[o,a]=u.useState(),g=u.useCallback(async i=>{const l=Kr(s,n);let c;try{c=await de(e,`${S.REST_API_URL}/soknad`,l,$,!0,i)}catch(p){if(dr(p))p instanceof h&&ge(p.message),a(p);else throw new Error("SendSøknad - This should never happen")}if(c){try{await x(e,"/storage/svangerskapspenger",$,i)}catch{}r(c)}},[s,r,n,e]);return u.useMemo(()=>({sendSøknad:g,errorSendSøknad:o}),[g,o])},_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ar,{size:"2xlarge"})}),E=cr(S.REST_API_URL),L=({error:e})=>e instanceof M?(Tr(S.LOGIN_URL),t.jsx(_,{})):t.jsx(Pe,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),Hr=(e,r,n,s,o)=>e?t.jsxs(t.Fragment,{children:[t.jsx(k,{path:m.BARNET,element:t.jsx(Je,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.UTENLANDSOPPHOLD,element:t.jsx(nr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.HAR_BODD_I_UTLANDET,element:t.jsx(tr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.SKAL_BO_I_UTLANDET,element:t.jsx(sr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.INNTEKTSINFORMASJON,element:t.jsx(Qe,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.FRILANS,element:t.jsx(ze,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.NÆRING,element:t.jsx(Xe,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.ARBEID_I_UTLANDET,element:t.jsx(Ye,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.VELG_ARBEID,element:t.jsx(or,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.SKJEMA,element:t.jsx(we,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.TILRETTELEGGING,element:t.jsx(rr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.PERIODER,element:t.jsx(er,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.OPPSUMMERING,element:t.jsx(Ze,{søkerInfo:r,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s,sendSøknad:o})})]}):t.jsx(k,{path:"*",element:t.jsx(qe,{to:m.FORSIDE})}),$r=({søkerInfo:e,locale:r,onChangeLocale:n,mellomlagretData:s})=>{const o=O(),[a,g]=u.useState(!1),[i,l]=u.useState(),{sendSøknad:c,errorSendSøknad:p}=Wr(E,l,r),d=xr(E,r,g),f=Lr(E,g);return u.useEffect(()=>{s&&s[v.APP_ROUTE]&&(g(!0),s.locale&&n(s.locale),o(s[v.APP_ROUTE]))},[s]),i?S.INNSYN?(ce(i.saksNr?`${S.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${S.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p?t.jsx(L,{error:p}):t.jsxs(Ue,{children:[t.jsx(k,{path:m.FORSIDE,element:t.jsx($e,{mellomlagreSøknadOgNaviger:d,setHarGodkjentVilkår:g,harGodkjentVilkår:a,locale:r,onChangeLocale:n})}),Hr(a,e,d,f,c)]})};try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{E.displayName="svpApi",E.__docgenInfo={description:"",displayName:"svpApi",props:{}}}catch{}try{L.displayName="ApiErrorHandler",L.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{SvangerskapspengesknadRoutes.displayName="SvangerskapspengesknadRoutes",SvangerskapspengesknadRoutes.__docgenInfo={description:"",displayName:"SvangerskapspengesknadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"SvpDataMapAndMetaData"}}}}}catch{}const Yr=({locale:e,onChangeLocale:r})=>{const n=Ne();Oe(n.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:o}=B(E,"/sokerinfo"),{data:a,loading:g,error:i}=B(E,"/storage/svangerskapspenger");if(o||i)return t.jsx(L,{error:I(o||i)});if(!s||g)return t.jsx(_,{});if(!(s.søker.kjønn==="K"))return t.jsx(Ge,{});const c=Le(s.søker.fødselsdato),p=(a==null?void 0:a.version)===me?a:void 0;return t.jsx("div",{children:c?t.jsx(Ve,{children:t.jsx(De,{initialState:p,children:t.jsx($r,{locale:e,onChangeLocale:r,søkerInfo:s,mellomlagretData:p})})}):t.jsx(je,{appnavn:"Svangerskapspenger"})})};try{Svangerskapspengesknad.displayName="Svangerskapspengesknad",Svangerskapspengesknad.__docgenInfo={description:"",displayName:"Svangerskapspengesknad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"any"}}}}}catch{}const Se=_r(),Jr={nb:ir,nn:pr};ie.locale(Se);const Xr=async()=>{try{await x(E,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},P=()=>{const[e,r]=u.useState(Se);return t.jsx(Be,{locale:e,messagesGroupedByLocale:Jr,children:t.jsxs(Ce,{appName:"Svangerskapspenger",retryCallback:Xr,children:[t.jsx(gr,{skalEndreNettleser:br()}),t.jsx(Yr,{locale:e,onChangeLocale:n=>{Mr(n),r(n),document.documentElement.setAttribute("lang",n)}})]})})},Ae=P;try{P.displayName="AppContainer",P.__docgenInfo={description:"",displayName:"AppContainer",props:{}}}catch{}const A={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},is={title:"AppContainer",component:Ae},R=({søkerinfo:e,mellomlagretData:r,doLogging:n=!0})=>{xe();const s=new j(E);s.onGet("/sokerinfo").reply(()=>(n&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: get /storage/svangerskapspenger"),[200,r])),s.onPost("rest-api/soknad").reply(()=>(n&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/storage/svangerskapspenger/vedlegg").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: delete /storage/svangerskapspenger"),[200]));const o=new j(be);return o.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),o.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(Ae,{})},y=R.bind({});y.args={søkerinfo:A};const N=R.bind({});N.args={søkerinfo:{...A,arbeidsforhold:[]}};const w=R.bind({});w.args={søkerinfo:{...A,søker:{...A.søker,kjønn:"M"}}};const b=R.bind({});b.args={søkerinfo:{...A,søker:{...A.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,J,X;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(X=(J=y.parameters)==null?void 0:J.docs)==null?void 0:X.source}}};var z,Q,Z;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(Z=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:Z.source}}};var ee,re,ne;w.parameters={...w.parameters,docs:{...(ee=w.parameters)==null?void 0:ee.docs,source:{originalSource:`({
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
}`,...(ne=(re=w.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var se,te,oe;b.parameters={...b.parameters,docs:{...(se=b.parameters)==null?void 0:se.docs,source:{originalSource:`({
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
}`,...(oe=(te=b.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};const ps=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{y as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,w as VisAppMann,b as VisAppUmyndig,ps as __namedExportsOrder,is as default};
