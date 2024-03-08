var Ae=Object.defineProperty;var Ie=(e,r,n)=>r in e?Ae(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var j=(e,r,n)=>(Ie(e,typeof r!="symbol"?r+"":r,n),n);import{j as t,L as ye,u as we}from"./Modal-046e2c19.js";/* empty css              */import{E as A,S as Ne,M as B}from"./SkjemaSteg-540f566e.js";import{r as u}from"./index-f1f2c4b1.js";import{o as f,H as be,J as Me,d as Te}from"./dates-c2c0c09e.js";import{c as ie,E as _e,u as Le,U as xe,I as Re,a as Fe}from"./IntlProvider-3a6b2b97.js";import{n as Pe,a as C,b as je}from"./nn_NO-a13bd8fa.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{b as pe,a as Oe}from"./attachmentApi-1d2d61fa.js";import{n as y}from"./validation-631bcf6e.js";import{ap as De,A as G,aq as T,Z as Be}from"./useFortsettSøknadSenere-f7e44c56.js";import{I as Ce,B as Ge}from"./IkkeKvinne-84d76025.js";import{c as Ve,d as ge,C as h,e as qe,b as m,S as Ue}from"./routes-33249ab0.js";import{h as D,i as Ke,j as k,N as We}from"./index-0df0c4a0.js";import{l as He}from"./amplitude-672a2544.js";import{e as $e}from"./egenNæringFormUtils-d83396e5.js";import{a as Ye,A as Je}from"./ArbeidIUtlandetStep-aed5d228.js";import{g as Xe}from"./dateUtils-2e21b5fc.js";import{F as ze}from"./Forside-56ffc5a8.js";import{B as Qe}from"./Barnet-cbcf36c7.js";import{E as Ze}from"./EgenNæringStep-c0f796a4.js";import{F as er}from"./FrilansStep-07c8408d.js";import{I as rr}from"./Inntektsinformasjon-4e694829.js";import{O as nr}from"./Oppsummering-d2b81ea9.js";import{P as sr}from"./PerioderStep-0db1187d.js";import{T as tr}from"./TilretteleggingStep-e883b1ee.js";import{U as or}from"./UtenlandsoppholdSteg-8fb7d2bc.js";import{S as ar}from"./SenereUtenlandsoppholdSteg-5a2c170a.js";import{T as ir}from"./TidligereUtenlandsoppholdSteg-6c052e48.js";import{V as pr}from"./VelgArbeid-624691f3.js";import{B as gr}from"./ByttBrowserModal-d5b6b659.js";import"./index-da441cba.js";import"./ErrorSummaryHookForm-08361198.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ArrowRight-349977b0.js";import"./attachmentType-7a83d42b.js";import"./Bedriftsbanner-3c637309.js";import"./VStack-976bfc58.js";import"./links-88d1705c.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./Alert-b87e04b4.js";import"./createIntl-071bd006.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./HorizontalLine-159f17a3.js";import"./BackButton-d9cee460.js";import"./Plus-67b0fd41.js";import"./ArbeidsforholdInformasjon-6871d1fe.js";import"./ExpansionCard-fb9a2a23.js";import"./tilretteleggingValidation-f66edb5b.js";import"./TidligereUtenlandsoppholdPanel-9aee2dff.js";var le=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(le||{});const de="selectedLocale",lr=()=>sessionStorage.getItem(de)||"nb",dr=e=>{sessionStorage.setItem(de,e)},{Axios:Qn,AxiosError:Zn,CanceledError:es,isCancel:rs,CancelToken:ns,VERSION:ss,all:ts,Cancel:os,isAxiosError:cr,spread:as,toFormData:is,AxiosHeaders:ps,HttpStatusCode:gs,formToJSON:ls,getAdapter:ds,mergeConfig:cs}=pe;class E extends Error{constructor(n,s,o){super(n);j(this,"callId");j(this,"timestamp");this.callId=s,this.timestamp=o}}class L extends Error{constructor(){super("API_ACCESS_ERROR")}}const ur=e=>e instanceof L||e instanceof E,ce=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),V=(e,r)=>{const[n,s]=u.useState(),[o,a]=u.useState(!1),[g,i]=u.useState();return u.useEffect(()=>{let l=!1;return(async()=>{var p,d;try{a(!0);const v=await e.get(r,{withCredentials:!0,timeout:60*1e3});l||s(v.data)}catch(v){cr(v)?((p=v.response)==null?void 0:p.status)===401||((d=v.response)==null?void 0:d.status)===403?i(new L):i(new E(v.message)):v instanceof Error?i(new E(v.message)):i(new E(String(v)))}finally{a(!1)}})(),()=>{l=!0}},[e,r]),{data:n,loading:o,error:g}},mr=e=>pe.create({baseURL:e,withCredentials:!0}),q="ukjent uuid",ue=async(e,r,n,s,o=!1,a)=>{var g,i,l,c;try{return(await e.post(r,n,{withCredentials:!0,timeout:6e4,signal:a,headers:o?{"content-type":"application/json;"}:{}})).data}catch(p){if(ce(p)&&p.code!=="ERR_CANCELED"){if(((g=p.response)==null?void 0:g.status)===401||((i=p.response)==null?void 0:i.status)===403)throw new L;const d=p.response&&p.response.data&&p.response.data.uuid?p.response.data.uuid:q,v=d!==q?d.slice(0,8):d;throw new E(s+v,d,(c=(l=p.response)==null?void 0:l.data)==null?void 0:c.timestamp)}throw p instanceof Error?new E(p.message):new E(String(p))}},U="ukjent uuid",F=async(e,r,n,s,o)=>{var a,g;try{return(await e.delete(r,{withCredentials:!0,timeout:6e4,signal:o,data:s})).data}catch(i){if(ce(i)&&i.code!=="ERR_CANCELED"){if(((a=i.response)==null?void 0:a.status)===401||((g=i.response)==null?void 0:g.status)===403)throw new L;const l=i.response&&i.response.data&&i.response.data.uuid?i.response.data.uuid:U,c=l!==U?l.slice(0,8):l;throw new E(n+c)}throw i instanceof Error?new E(i.message):new E(String(i))}};var K=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var s=0,o=r.length,a;s<o;s++)(a||!(s in r))&&(a||(a=Array.prototype.slice.call(r,0,s)),a[s]=r[s]);return e.concat(a||Array.prototype.slice.call(r))},kr=function(){function e(r,n,s){this.name=r,this.version=n,this.os=s,this.type="browser"}return e}(),fr=function(){function e(r){this.version=r,this.type="node",this.name="node",this.os=process.platform}return e}(),vr=function(){function e(r,n,s,o){this.name=r,this.version=n,this.os=s,this.bot=o,this.type="bot-device"}return e}(),hr=function(){function e(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return e}(),Er=function(){function e(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return e}(),Sr=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,Ar=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,W=3,Ir=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",Sr]],H=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function yr(e){return e?$(e):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new Er:typeof navigator<"u"?$(navigator.userAgent):br()}function wr(e){return e!==""&&Ir.reduce(function(r,n){var s=n[0],o=n[1];if(r)return r;var a=o.exec(e);return!!a&&[s,a]},!1)}function $(e){var r=wr(e);if(!r)return null;var n=r[0],s=r[1];if(n==="searchbot")return new hr;var o=s[1]&&s[1].split(".").join("_").split("_").slice(0,3);o?o.length<W&&(o=K(K([],o,!0),Mr(W-o.length),!0)):o=[];var a=o.join("."),g=Nr(e),i=Ar.exec(e);return i&&i[1]?new vr(n,a,g,i[1]):new kr(n,a,g)}function Nr(e){for(var r=0,n=H.length;r<n;r++){var s=H[r],o=s[0],a=s[1],g=a.exec(e);if(g)return o}return null}function br(){var e=typeof process<"u"&&process.version;return e?new fr(process.version.slice(1)):null}function Mr(e){for(var r=[],n=0;n<e;n++)r.push("0");return r}const me=e=>{window.location.href=e},Tr=e=>{me(e+"?redirect="+window.location.origin)},x="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",ke=1,_r=(e,r,n)=>{const s=D(),o=Ve(),a=ge(),[g,i]=u.useState(!1),l=u.useRef();return u.useEffect(()=>{g&&(async()=>{i(!1);const d=o[h.APP_ROUTE];d?(s(d),await ue(e,"/storage/svangerskapspenger",{version:ke,locale:r,...o},x)):(n(!1),a(),s("/"),await F(e,"/storage/svangerskapspenger",x)),l.current&&l.current()})().catch(d=>{ie(d.message),l.current&&l.current()})},[g]),u.useCallback(()=>(i(!0),new Promise(d=>{l.current=d})),[])},Lr=(e,r)=>{const n=D(),s=ge();return u.useCallback(async()=>{He("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),r(!1);try{await F(e,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}n("/")},[n,r,s,e])};var fe=(e=>(e.MOR="mor",e))(fe||{}),ve=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(ve||{});const he=e=>e.arbeidsforhold.type===G.FRILANSER||e.arbeidsforhold.type===G.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},Y=e=>({land:e.land,tidsperiode:{fom:f(e.tidsperiode.fom),tom:f(e.tidsperiode.tom)}}),xr=(e,r,n)=>({iNorgeSiste12Mnd:e.iNorgeSiste12Mnd,iNorgeNeste12Mnd:e.iNorgeNeste12Mnd,tidligereOpphold:((n==null?void 0:n.tidligereOpphold)||[]).map(Y),senereOpphold:((r==null?void 0:r.senereOpphold)||[]).map(Y)}),Rr=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),Fr=(e,r)=>({type:T.HEL,tilrettelagtArbeidFom:f(e.fom),arbeidsforhold:r,behovForTilretteleggingFom:f(e.behovForTilretteleggingFom)}),Pr=(e,r)=>({type:T.DELVIS,tilrettelagtArbeidFom:f(e.fom),arbeidsforhold:r,behovForTilretteleggingFom:f(e.behovForTilretteleggingFom),stillingsprosent:e.stillingsprosent}),jr=(e,r)=>({type:T.INGEN,slutteArbeidFom:f(e.fom),arbeidsforhold:r,behovForTilretteleggingFom:f(e.behovForTilretteleggingFom)}),Or=e=>{const r=he(e);return e.type===T.HEL?Fr(e,r):e.type===T.DELVIS?Pr(e,r):jr(e,r)},Dr=e=>e.map(r=>Or(r)),Br=e=>{if(e){const r=e.næringstype===Be.FISKER&&e.navnPåNæringen.trim().length===0?void 0:e.navnPåNæringen,n=$e(f(e.tidsperiode.fom)),s={næringstyper:[e.næringstype],tidsperiode:{fom:f(e.tidsperiode.fom),tom:f(e.tidsperiode.tom)},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:r,organisasjonsnummer:e.organisasjonsnummer?e.organisasjonsnummer:void 0,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand?e.registrertILand:void 0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return n?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:f(e.varigEndringDato),næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},Cr=e=>{if(e)return{...e,oppstart:f(e.oppstart)}},Gr=e=>({type:Ye.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:f(e.tidsperiode.fom),tom:f(e.tidsperiode.tom)}}),Vr=(e,r,n,s,o)=>{const a=Br(n),g=o?o.map(l=>Gr(l)):void 0;return{rolle:fe.MOR,språkkode:e,frilansInformasjon:r.harJobbetSomFrilans?Cr(s):void 0,selvstendigNæringsdrivendeInformasjon:a?[a]:void 0,andreInntekterSiste10Mnd:g}},qr=e=>e.map(n=>{const s=he(n);return n.vedlegg.map(a=>({...a,dokumenterer:{type:le.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),Ur=(e,r)=>{const n=xr(y(e(h.UTENLANDSOPPHOLD)),e(h.UTENLANDSOPPHOLD_SENERE),e(h.UTENLANDSOPPHOLD_TIDLIGERE)),s=y(e(h.OM_BARNET)),o=y(e(h.TILRETTELEGGINGER)),a=Rr(s),g=qr(o),i=Vr(r,y(e(h.INNTEKTSINFORMASJON)),e(h.EGEN_NÆRING),e(h.FRILANS),e(h.ARBEID_I_UTLANDET)),l=Xe(s),c=De(o,l),p=Dr(c);return{type:ve.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:n,barn:a,vedlegg:g,tilrettelegging:p,søker:i}},Kr=(e,r,n)=>{const s=qe(),[o,a]=u.useState(),g=u.useCallback(async i=>{const l=Ur(s,n);let c;try{c=await ue(e,`${A.REST_API_URL}/soknad`,l,x,!0,i)}catch(p){if(ur(p))p instanceof E&&ie(p.message),a(p);else throw new Error("SendSøknad - This should never happen")}if(c){try{await F(e,"/storage/svangerskapspenger",x,i)}catch{}r(c)}},[s,r,n,e]);return u.useMemo(()=>({sendSøknad:g,errorSendSøknad:o}),[g,o])},_=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(ye,{size:"2xlarge"})}),S=mr(A.REST_API_URL),R=({error:e})=>e instanceof L?(Tr(A.LOGIN_URL),t.jsx(_,{})):t.jsx(_e,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),Wr=(e,r,n,s,o)=>e?t.jsxs(t.Fragment,{children:[t.jsx(k,{path:m.BARNET,element:t.jsx(Qe,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.UTENLANDSOPPHOLD,element:t.jsx(or,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.HAR_BODD_I_UTLANDET,element:t.jsx(ir,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.SKAL_BO_I_UTLANDET,element:t.jsx(ar,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.ARBEID,element:t.jsx(rr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.FRILANS,element:t.jsx(er,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.NÆRING,element:t.jsx(Ze,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.ARBEID_I_UTLANDET,element:t.jsx(Je,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.VELG_ARBEID,element:t.jsx(pr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.SKJEMA,element:t.jsx(Ne,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.TILRETTELEGGING,element:t.jsx(tr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.PERIODER,element:t.jsx(sr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s})}),t.jsx(k,{path:m.OPPSUMMERING,element:t.jsx(nr,{søkerInfo:r,mellomlagreSøknadOgNaviger:n,avbrytSøknad:s,sendSøknad:o})})]}):t.jsx(k,{path:"*",element:t.jsx(We,{to:m.FORSIDE})}),Hr=({søkerInfo:e,locale:r,onChangeLocale:n,mellomlagretData:s})=>{const o=D(),[a,g]=u.useState(!1),[i,l]=u.useState(),{sendSøknad:c,errorSendSøknad:p}=Kr(S,l,r),d=_r(S,r,g),v=Lr(S,g);return u.useEffect(()=>{s&&s[h.APP_ROUTE]&&(g(!0),s.locale&&n(s.locale),o(s[h.APP_ROUTE]))},[s]),i?A.INNSYN?(me(i.saksNr?`${A.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${A.INNSYN}/redirectFromSoknad`),t.jsx(_,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p?t.jsx(R,{error:p}):t.jsxs(Ke,{children:[t.jsx(k,{path:m.FORSIDE,element:t.jsx(ze,{mellomlagreSøknadOgNaviger:d,setHarGodkjentVilkår:g,harGodkjentVilkår:a,locale:r,onChangeLocale:n})}),Wr(a,e,d,v,c)]})};try{_.displayName="Spinner",_.__docgenInfo={description:"",displayName:"Spinner",props:{}}}catch{}try{S.displayName="svpApi",S.__docgenInfo={description:"",displayName:"svpApi",props:{}}}catch{}try{R.displayName="ApiErrorHandler",R.__docgenInfo={description:"",displayName:"ApiErrorHandler",props:{error:{defaultValue:null,description:"",name:"error",required:!0,type:{name:"ApiAccessError | ApiGeneralError"}}}}}catch{}try{SvangerskapspengesknadRoutes.displayName="SvangerskapspengesknadRoutes",SvangerskapspengesknadRoutes.__docgenInfo={description:"",displayName:"SvangerskapspengesknadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},mellomlagretData:{defaultValue:null,description:"",name:"mellomlagretData",required:!1,type:{name:"SvpDataMapAndMetaData"}}}}}catch{}const $r=({locale:e,onChangeLocale:r})=>{const n=we();Le(n.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:o}=V(S,"/sokerinfo"),{data:a,loading:g,error:i}=V(S,"/storage/svangerskapspenger");if(o||i)return t.jsx(R,{error:y(o||i)});if(!s||g)return t.jsx(_,{});if(!be(s.søker.kjønn))return t.jsx(Ce,{});const c=Me(s.søker.fødselsdato),p=(a==null?void 0:a.version)===ke?a:void 0;return t.jsx("div",{children:c?t.jsx(Ge,{children:t.jsx(Ue,{initialState:p,children:t.jsx(Hr,{locale:e,onChangeLocale:r,søkerInfo:s,mellomlagretData:p})})}):t.jsx(xe,{appnavn:"Svangerskapspenger"})})};try{Svangerskapspengesknad.displayName="Svangerskapspengesknad",Svangerskapspengesknad.__docgenInfo={description:"",displayName:"Svangerskapspengesknad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"any"}}}}}catch{}const Yr=()=>{const e=yr();return e?e.name==="ie":!1},Ee=lr(),Jr={nb:{...Pe,...C.nb},nn:{...je,...C.nn}};Te.locale(Ee);const Xr=async()=>{try{await F(S,"/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},O=()=>{const[e,r]=u.useState(Ee);return t.jsx(Re,{locale:e,messagesGroupedByLocale:Jr,children:t.jsxs(Fe,{appName:"Svangerskapspenger",retryCallback:Xr,children:[t.jsx(gr,{skalEndreNettleser:Yr()}),t.jsx($r,{locale:e,onChangeLocale:n=>{dr(n),r(n),document.documentElement.setAttribute("lang",n)}})]})})},Se=O;try{O.displayName="AppContainer",O.__docgenInfo={description:"",displayName:"AppContainer",props:{}}}catch{}const I={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},us={title:"AppContainer",component:Se},P=({søkerinfo:e,mellomlagretData:r,doLogging:n=!0})=>{const s=new B(S);s.onGet("/sokerinfo").reply(()=>(n&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: get /storage/svangerskapspenger"),[200,r])),s.onPost("rest-api/soknad").reply(()=>(n&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/storage/svangerskapspenger/vedlegg").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/storage/svangerskapspenger").reply(()=>(n&&console.log("network request: delete /storage/svangerskapspenger"),[200]));const o=new B(Oe);return o.onPost("/rest-api/storage/svangerskapspenger/vedlegg").reply(()=>(n&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),o.onPost("http://localhost:8888/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(Se,{})},w=P.bind({});w.args={søkerinfo:I};const N=P.bind({});N.args={søkerinfo:{...I,arbeidsforhold:[]}};const b=P.bind({});b.args={søkerinfo:{...I,søker:{...I.søker,kjønn:"M"}}};const M=P.bind({});M.args={søkerinfo:{...I,søker:{...I.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var J,X,z;w.parameters={...w.parameters,docs:{...(J=w.parameters)==null?void 0:J.docs,source:{originalSource:`({
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
}`,...(z=(X=w.parameters)==null?void 0:X.docs)==null?void 0:z.source}}};var Q,Z,ee;N.parameters={...N.parameters,docs:{...(Q=N.parameters)==null?void 0:Q.docs,source:{originalSource:`({
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
}`,...(ee=(Z=N.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var re,ne,se;b.parameters={...b.parameters,docs:{...(re=b.parameters)==null?void 0:re.docs,source:{originalSource:`({
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
}`,...(se=(ne=b.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var te,oe,ae;M.parameters={...M.parameters,docs:{...(te=M.parameters)==null?void 0:te.docs,source:{originalSource:`({
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
}`,...(ae=(oe=M.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};const ms=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{w as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,b as VisAppMann,M as VisAppUmyndig,ms as __namedExportsOrder,us as default};
