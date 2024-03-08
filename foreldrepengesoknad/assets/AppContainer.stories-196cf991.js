import{j as n}from"./jsx-runtime-1caa8f64.js";import{w as fn,c as gn,A as Le,H as Sn,E as En,a as hn,b as An,I as vn,i as Nn}from"./IntlProvider-c123bdc0.js";import{M as Tn}from"./index-146fc9b8.js";import{a as On,s as Pn}from"./stønadskontoDeltUttak80-23916c37.js";import{r as p}from"./index-1cdf6ce0.js";import{aJ as Fn,aQ as _n,d as R,g as Dn,y as Z,aM as me,u as Ge,U as Rt,c as J,b as L,i as ue,Z as Un,M as le,H as Rn,B as pe,e as pt,_ as In,x as jn,L as It,S as bn,aR as yn}from"./dates-3e7e1342.js";import{n as xn,a as ct,b as Mn}from"./app-72de0da2.js";import"./index-753920cd.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{B as Ln}from"./index-dba69f5e.js";import{a as we,n as M,a3 as Q,aq as jt,a4 as Bn,ar as Kn,P as Vn,ad as Gn,S as Be,h as bt,K as xe,I as wn,J as Cn,L as Jn,O as Wn,Q as Hn,as as kt,T as qn,at as $n,au as Yn,D as Qn,av as Xn,b as zn,aw as yt,ax as Zn,ay as O,az as mt}from"./dateFormValidation-fa09613b.js";import{E as Me}from"./axios-91b57d60.js";import{F as er,l as tr,A as H}from"./Feilside-5afaff9f.js";import{a as xt,s as q,g as nr,b as rr,c as sr,d as or,U as ar}from"./UttaksplanInfo-cc255da5.js";import{C as i,c as ir,d as Mt,u as j,a as V,e as lr,F as dr}from"./FpDataContext-91c673b7.js";import{l as ur}from"./links-4d39192e.js";import{r as Lt,R as W}from"./useRequest-84d89b79.js";import{e as Bt,h as pr}from"./barnUtils-441d9631.js";import{V as cr}from"./Velkommen-7ea495de.js";import{A as kr}from"./AnnenForelderSteg-92dbdc7f.js";import{I as mr}from"./Inntektsinformasjon-ad934373.js";import{M as ft}from"./ManglendeVedlegg-4a7e7f06.js";import{O as fr}from"./OmBarnetSteg-a2f4d6a7.js";import{O as gt}from"./Oppsummering-5fa12c83.js";import{P as gr}from"./PeriodeMedForeldrepengerSteg-a12e9139.js";import{S as Sr}from"./SøkersituasjonSteg-dbaba75d.js";import{U as Er}from"./UtenlandsoppholdSteg-44266340.js";import{S as hr}from"./SenereUtenlandsoppholdSteg-ba9d18cb.js";import{T as Ar}from"./TidligereUtenlandsoppholdSteg-02ec181f.js";import{e as vr,h as Nr,Q as Tr,u as Or,a as Pr,g as Fr,f as _r,s as Dr,U as Ur,S as k,i as Rr,k as Ir,j as jr}from"./useFpNavigator-283c2ed8.js";import{S as x}from"./skjemanummer-4d711b8d.js";import{g as br}from"./Næring-0752aa2b.js";import{u as St,a as de,d as yr,e as xr,g as Mr,b as Et,c as Lr,F as Br}from"./uttaksplanInfoUtils-7a4a761f.js";import{I as Kr}from"./InfoOmSøknaden-649e66fd.js";import{b as Vr,c as Gr}from"./dateUtils-f600dec0.js";import{c as wr,g as Cr}from"./eksisterendeSakUtils-1f5e75b3.js";import{a as Jr,g as Wr}from"./stønadskontoer-c466c291.js";import{B as ht}from"./Link-d47e444a.js";import{B as Hr}from"./ByttBrowserModal-cc038e33.js";import{s as qr,A as $r}from"./apiInterceptor-7536bacb.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5b3378a9.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./BabyWrapped-cd5fe4ef.js";import"./ExpansionCard-f4140baf.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";import"./ErrorSummaryHookForm-1b45a718.js";import"./isNativeReflectConstruct-554b52b6.js";import"./DinePlikter-d2229b50.js";import"./DinePersonopplysningerModal-425e46e7.js";import"./velkommenUtils-41d64fdc.js";import"./RegistrertePersonalia-fae19360.js";import"./Box-3dd1780a.js";import"./validationUtil-3c89f521.js";import"./AttachmentMetadata-003d83db.js";import"./InteractiveListElement-ce0b0215.js";import"./attachmentType-1d378a15.js";import"./FormikFileUploader-2483e29a.js";import"./AttachmentList-5a98cfe1.js";import"./Attachment-99140bbb.js";import"./util-be5ef5cd.js";import"./File-2c558d9c.js";import"./TidligereUtenlandsoppholdPanel-602fb533.js";const Yr=[{fom:"2022-12-12",tom:"2023-02-17",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},samtidigUttak:100,flerbarnsdager:!1},{fom:"2023-02-20",tom:"2023-03-05",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},samtidigUttak:50,flerbarnsdager:!1},{fom:"2023-03-20",tom:"2023-03-31",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1}],Qr="HUNDRE",Xr={perioder:Yr,dekningsgrad:Qr},zr="2019-02-01",Zr="23123",es={innsendingstidspunkt:zr,pdf:Zr},ts=[{saksnummer:"352011594",sakAvsluttet:!1,sisteSøknadMottattDato:"2023-03-31",kanSøkeOmEndring:!1,sakTilhørerMor:!1,gjelderAdopsjon:!0,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{type:"person",fnr:"05489305072",fornavn:"Sentral",etternavn:"Tangent"},familiehendelse:{fødselsdato:"2023-02-01",antallBarn:1,omsorgsovertakelse:"2023-04-10"},åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknadsperioder:[{fom:"2023-04-10",tom:"2023-07-21",kontoType:"FEDREKVOTE",flerbarnsdager:!1},{fom:"2023-07-24",tom:"2023-09-15",kontoType:"FELLESPERIODE",morsAktivitet:"UTDANNING",flerbarnsdager:!1}]},barn:[],dekningsgrad:"HUNDRE"}],ns=[],rs={foreldrepenger:ts,engangsstønad:[],svangerskapspenger:ns},ss={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15,FORELDREPENGER:80},os={},as={kontoer:ss,minsteretter:os},Kt="selectedLocale",is=()=>sessionStorage.getItem(Kt)||"nb",ls=t=>{sessionStorage.setItem(Kt,t)};var At=globalThis&&globalThis.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var s=0,a=e.length,o;s<a;s++)(o||!(s in e))&&(o||(o=Array.prototype.slice.call(e,0,s)),o[s]=e[s]);return t.concat(o||Array.prototype.slice.call(e))},ds=function(){function t(e,r,s){this.name=e,this.version=r,this.os=s,this.type="browser"}return t}(),us=function(){function t(e){this.version=e,this.type="node",this.name="node",this.os=process.platform}return t}(),ps=function(){function t(e,r,s,a){this.name=e,this.version=r,this.os=s,this.bot=a,this.type="bot-device"}return t}(),cs=function(){function t(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return t}(),ks=function(){function t(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return t}(),ms=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,fs=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,vt=3,gs=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",ms]],Nt=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function Ss(t){return t?Tt(t):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new ks:typeof navigator<"u"?Tt(navigator.userAgent):As()}function Es(t){return t!==""&&gs.reduce(function(e,r){var s=r[0],a=r[1];if(e)return e;var o=a.exec(t);return!!o&&[s,o]},!1)}function Tt(t){var e=Es(t);if(!e)return null;var r=e[0],s=e[1];if(r==="searchbot")return new cs;var a=s[1]&&s[1].split(".").join("_").split("_").slice(0,3);a?a.length<vt&&(a=At(At([],a,!0),vs(vt-a.length),!0)):a=[];var o=a.join("."),d=hs(t),u=fs.exec(t);return u&&u[1]?new ps(r,o,d,u[1]):new ds(r,o,d)}function hs(t){for(var e=0,r=Nt.length;e<r;e++){var s=Nt[e],a=s[0],o=s[1],d=o.exec(t);if(d)return a}return null}function As(){var t=typeof process<"u"&&process.version;return t?new us(process.version.slice(1)):null}function vs(t){for(var e=[],r=0;r<t;r++)e.push("0");return e}const Ns=t=>{window.location.href=t},Ts=t=>{const e=t.søknad;return{[i.APP_ROUTE]:t.currentRoute,[i.EKSISTERENDE_SAK]:t.eksisterendeSak,[i.BARN_FRA_NESTE_SAK]:t.barnFraNesteSak,[i.SØKERSITUASJON]:e==null?void 0:e.søkersituasjon,[i.OM_BARNET]:e==null?void 0:e.barn,[i.ANNEN_FORELDER]:e==null?void 0:e.annenForelder,[i.SØKER_DATA]:e==null?void 0:e.søker,[i.UTENLANDSOPPHOLD]:e!=null&&e.informasjonOmUtenlandsopphold?{iNorgeNeste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,iNorgeSiste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}:void 0,[i.UTENLANDSOPPHOLD_SENERE]:e!=null&&e.informasjonOmUtenlandsopphold&&e.informasjonOmUtenlandsopphold.senereOpphold&&e.informasjonOmUtenlandsopphold.senereOpphold.length>0?{senereOpphold:e.informasjonOmUtenlandsopphold.senereOpphold}:void 0,[i.UTENLANDSOPPHOLD_TIDLIGERE]:e!=null&&e.informasjonOmUtenlandsopphold&&e.informasjonOmUtenlandsopphold.tidligereOpphold&&e.informasjonOmUtenlandsopphold.tidligereOpphold.length>0?{tidligereOpphold:e.informasjonOmUtenlandsopphold.tidligereOpphold}:void 0,[i.PERIODE_MED_FORELDREPENGER]:e!=null&&e.dekningsgrad?{dekningsgrad:e.dekningsgrad}:void 0,[i.UTTAKSPLAN_INFO]:t.uttaksplanInfo,[i.UTTAKSPLAN]:e==null?void 0:e.uttaksplan,[i.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:e==null?void 0:e.ønskerJustertUttakVedFødsel,perioderSomSkalSendesInn:t.perioderSomSkalSendesInn,antallUkerIUttaksplan:t.antallUkerIUttaksplan,harUttaksplanBlittSlettet:t.harUttaksplanBlittSlettet,annenPartsUttakErLagtTilIPlan:t.annenPartsUttakErLagtTilIPlan,endringstidspunkt:t.endringstidspunkt},[i.VEDLEGG]:e==null?void 0:e.vedlegg}};class ce extends p.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}componentDidCatch(e,r){e&&e.message!=="window.hasFocus is not a function"&&(this.setState({...this.state,hasError:!0,error:e}),fn(s=>{s.setExtras(r),gn(e)}))}render(){var e;if(this.state.hasError){const r=!!this.state.error&&!!this.state.error.message&&this.state.error.message===xt,s=r?"Feil: for mange vedlegg":"Informasjon om feilen";return n.jsx(er,{dokumenttittel:"NAV Foreldrepengesøknad",ingress:`${(e=this.state.error)==null?void 0:e.message}`,tittel:s,søker:this.props.søker,illustrasjon:{tittel:"Hei!",tekst:"Noe har gått galt med søknaden.",lenke:{tekst:"Her finner du en lenke til brukerstøtte",url:ur.brukerstøtte}},skalKunneGåTilbakeTilSøknad:r})}return this.props.children}}try{ce.displayName="ErrorBoundary",ce.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{søker:{defaultValue:null,description:"",name:"søker",required:!1,type:{name:"Søker"}}}}}catch{}const Os=(t,e,r,s)=>{const a=we(),o=ir();return p.useCallback(async()=>{tr("applikasjon-hendelse",{app:"foreldrepengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),o(),e(!1),r(!1),s(void 0);try{await H.deleteMellomlagretSøknad(t)}catch{}a("/")},[t,a,o,e,r,s])},Ps=(t,e,r,s,a,o)=>{const d=M(e(i.APP_ROUTE)),u=e(i.SØKERSITUASJON),N=e(i.OM_BARNET),S=e(i.ANNEN_FORELDER),_=e(i.SØKER_DATA),P=e(i.UTENLANDSOPPHOLD),A=e(i.UTENLANDSOPPHOLD_SENERE),l=e(i.UTENLANDSOPPHOLD_TIDLIGERE),c=e(i.UTTAKSPLAN_METADATA),E=e(i.BARN_FRA_NESTE_SAK),m=e(i.EKSISTERENDE_SAK),f=e(i.UTTAKSPLAN),g=e(i.UTTAKSPLAN_INFO),B=e(i.PERIODE_MED_FORELDREPENGER),$=e(i.VEDLEGG),b={version:6,currentRoute:d,søknadGjelderEtNyttBarn:o,søknad:{harGodkjentVilkår:a,søkersituasjon:u,barn:N,annenForelder:S,søker:{..._,språkkode:t},informasjonOmUtenlandsopphold:P?{...P,senereOpphold:(A==null?void 0:A.senereOpphold)||[],tidligereOpphold:(l==null?void 0:l.tidligereOpphold)||[]}:void 0,erEndringssøknad:s,dekningsgrad:B==null?void 0:B.dekningsgrad,uttaksplan:f,vedlegg:$,ønskerJustertUttakVedFødsel:c==null?void 0:c.ønskerJustertUttakVedFødsel},eksisterendeSak:m,barnFraNesteSak:E,uttaksplanInfo:g,endringstidspunkt:c==null?void 0:c.endringstidspunkt,antallUkerIUttaksplan:c==null?void 0:c.antallUkerIUttaksplan,perioderSomSkalSendesInn:c==null?void 0:c.perioderSomSkalSendesInn,harUttaksplanBlittSlettet:c==null?void 0:c.harUttaksplanBlittSlettet,annenPartsUttakErLagtTilIPlan:c==null?void 0:c.annenPartsUttakErLagtTilIPlan};return H.storeAppState(b,r)},Fs=(t,e,r,s,a)=>{const o=we(),d=Mt(),[u,N]=p.useState(!1),S=p.useRef();return p.useEffect(()=>{if(u){const P=M(d(i.APP_ROUTE));(async()=>{N(!1),o(P),await Ps(t,d,e,r,s,a),S.current&&S.current()})().catch(l=>{l.response&&(l.response.status===401||l.response.status===403)?Lt():q(l),S.current&&S.current()})}},[u]),p.useCallback(()=>(N(!0),new Promise(A=>{S.current=A})),[])},_s=t=>!!(t&&typeof t=="object"&&"isAxiosError"in t),Ds=(t,e,r,s)=>{const a=Mt(),[o,d]=p.useState();return{sendSøknad:async N=>{const S=M(a(i.UTTAKSPLAN_METADATA)),_=M(a(i.OM_BARNET)),P=nr(e,a,S.perioderSomSkalSendesInn,Bt(_),s,S.endringstidspunkt);P.uttaksplan.length===0&&P.erEndringssøknad&&d(new Error("Søknaden din inneholder ingen nye perioder."));let A;try{A=(await H.sendSøknad(P,t,N)).data}catch(l){if(_s(l)){l.response&&(l.response.status===401||l.response.status===403)&&Lt(),q(l),l.response&&l.response.status===400&&l.response.data&&l.response.data.messages&&l.response.data.messages.includes("Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg")&&d(new Error(xt));const c=rr(l),E=c!==sr?c.slice(0,8):c;d(new Error(or+E))}d(new Error(String(l)))}try{await H.deleteMellomlagretSøknad(t,N)}catch{}r(A)},errorSendSøknad:o}};var ee=(t=>(t.ønskerAutomatiskJustering="ønskerAutomatiskJustering",t))(ee||{});const Ke=Fn(),Us=(t,e)=>{const[r,s]=p.useState(t);return p.useEffect(()=>{const a=setTimeout(()=>{s(t)},e);return()=>{clearTimeout(a)}},[t,e]),r},Vt=t=>Q(t)||jt(t)||Bn(t)||Kn(t),Ot=(t,e,r,s,a)=>s?e?Is(s,t,a,r):t.filter(Vt):t,Rs=(t,e,r,s)=>{const a=e.filter(o=>_n(r,o.tidsperiode.fom,o.tidsperiode.tom)||R(o.tidsperiode.fom).isSameOrAfter(R(r),"day")).filter(Vt);if(a.length===0&&t.length>e.length){const o=t.find(u=>R(u.tidsperiode.fom).isSame(r,"day"));return[{id:Dn(),type:Vn.Utsettelse,tidsperiode:{fom:o.tidsperiode.fom,tom:o.tidsperiode.tom},årsak:Gn.Fri,forelder:s?Z.farMedmor:Z.mor,erArbeidstaker:!1}]}else return a},Is=(t,e,r,s)=>r===void 0?[]:Rs(t,e,r,s),js=t=>Nr(t),bs=(t,e)=>({ønskerAutomatiskJustering:t!==void 0&&e?vr(t):me.UNANSWERED}),Ve=({termindato:t,perioderMedUttakRundtFødsel:e,antallBarn:r,visibility:s})=>{const a=Ge(),o=Rt(t).denneEllerNeste(),d=M(j(i.UTTAKSPLAN_METADATA)),u=V(i.UTTAKSPLAN_METADATA),N=d.ønskerJustertUttakVedFødsel,S=N&&e.length>1,_=N&&e.length===1&&!R(e[0].tidsperiode.fom).isSame(o,"day"),P=N&&e.length===1&&R(e[0].tidsperiode.fom).isSame(o,"day")&&(Q(e[0])&&(e[0].konto!==Be.Fedrekvote||!e[0].ønskerSamtidigUttak)||jt(e[0])),A=N&&e.length===1&&R(e[0].tidsperiode.fom).isSame(o,"day")&&Q(e[0])&&e[0].konto===Be.Fedrekvote&&e[0].ønskerFlerbarnsdager===!0;let l="";S&&(l="uttaksplan.automatiskJustering.info.hvisFlerePerioder"),_&&(l="uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin"),P&&(l="uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin"),A&&(l="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager");const c=E=>{const m=js(E);u({...d,ønskerJustertUttakVedFødsel:m})};return n.jsx(Ke.Form,{includeButtons:!1,children:n.jsxs("div",{style:{paddingTop:"1rem",paddingBottom:"1rem"},children:[l!==""&&n.jsx(J,{padBottom:"l",children:n.jsx(Le,{variant:"info",children:n.jsx(L,{id:l})})}),n.jsx(J,{visible:s.isVisible(ee.ønskerAutomatiskJustering),padBottom:"l",children:n.jsx(Ke.YesOrNoQuestion,{name:ee.ønskerAutomatiskJustering,legend:ue(a,"uttaksplan.automatiskJustering.spørsmål",{antallBarn:r}),validate:E=>{if(E===me.UNANSWERED)return ue(a,"uttaksplan.automatiskJustering.svar.påkrevd")},afterOnChange:E=>c(E)})})]})})};try{Ve.displayName="AutomatiskJusteringForm",Ve.__docgenInfo={description:"",displayName:"AutomatiskJusteringForm",props:{termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date"}},perioderMedUttakRundtFødsel:{defaultValue:null,description:"",name:"perioderMedUttakRundtFødsel",required:!0,type:{name:"Periode[]"}},antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!0,type:{name:"number"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<UttaksplanFormField, undefined>"}}}}}catch{}const ys=(t,e)=>e!==void 0&&Q(t)&&R(t.tidsperiode.fom).isSame(Rt(R(e).toDate()).denneEllerNeste(),"day")&&t.forelder===Z.farMedmor&&t.konto===Be.Fedrekvote&&t.ønskerSamtidigUttak===!0&&t.ønskerFlerbarnsdager!==!0,xs=(t,e,r)=>t&&e.length===1&&ys(e[0],r),Ms=(t,e,r,s,a,o,d)=>t&&Un(e)&&r==="fødsel"&&s.length!==0&&bt(a)&&o!==void 0&&!d,Ls=({isOpen:t,setIsOpen:e,goToPreviousStep:r})=>n.jsxs(le,{"aria-label":"Vil du gå tilbake",open:t,onClose:()=>e(!1),children:[n.jsx(le.Header,{children:n.jsx(Rn,{size:"small",level:"1",children:n.jsx(L,{id:"uttaksplan.vilDuGåTilbakeModal.tittel"})})}),n.jsx(le.Body,{children:n.jsxs(Sn,{gap:"4",children:[n.jsx(ht,{children:n.jsx(L,{id:"uttaksplan.vilDuGåTilbakeModal.intro"})}),n.jsx(ht,{children:n.jsx(L,{id:"uttaksplan.vilDuGåTilbakeModal.spørsmål"})})]})}),n.jsxs(le.Footer,{children:[n.jsx(pe,{onClick:r,children:n.jsx(L,{id:"uttaksplan.vilDuGåTilbakeModal.okLabel"})}),n.jsx(pe,{variant:"secondary",onClick:()=>e(!1),children:n.jsx(L,{id:"uttaksplan.vilDuGåTilbakeModal.avbrytLabel"})})]})]});try{VilDuGTilbakeModal.displayName="VilDuGTilbakeModal",VilDuGTilbakeModal.__docgenInfo={description:"",displayName:"VilDuGTilbakeModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},setIsOpen:{defaultValue:null,description:"",name:"setIsOpen",required:!0,type:{name:"Dispatch<SetStateAction<boolean>>"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}}}}}catch{}const Bs={[ee.ønskerAutomatiskJustering]:{isIncluded:({periodeRundtFødselKanAutomatiskJusteres:t})=>t,isAnswered:({ønskerAutomatiskJustering:t})=>t!==me.UNANSWERED}},Ks=Tr(Bs),Vs=[],ke=({søkerInfo:t,erEndringssøknad:e,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})=>{const a=Ge(),o=Or(t.arbeidsforhold,e),d=Pr(t.arbeidsforhold,r,e),[u,N]=p.useState(!1),[S,_]=p.useState(!1),[P,A]=p.useState(!1),[l,c]=p.useState(!0),E=M(j(i.SØKERSITUASJON)),m=M(j(i.OM_BARNET)),f=M(j(i.ANNEN_FORELDER)),g=M(j(i.UTTAKSPLAN_METADATA)),B=M(j(i.PERIODE_MED_FORELDREPENGER)),$=j(i.UTTAKSPLAN_INFO),b=j(i.UTTAKSPLAN)||Vs,T=j(i.BARN_FRA_NESTE_SAK),F=j(i.EKSISTERENDE_SAK),Ct=j(i.VEDLEGG),Ce=V(i.OM_BARNET),Je=V(i.BARN_FRA_NESTE_SAK),Y=V(i.UTTAKSPLAN),We=V(i.EKSISTERENDE_SAK),y=V(i.UTTAKSPLAN_METADATA),Jt=V(i.APP_ROUTE),Wt=V(i.VEDLEGG),[te,Ht]=p.useState(g.endringstidspunkt),[ne,fe]=p.useState(g.perioderSomSkalSendesInn||[]),ge=xe(f)?f:void 0,He=(ge==null?void 0:ge.erAleneOmOmsorg)||!1,{situasjon:Se}=E,{rolle:qe}=E,qt=wn(f),re=xe(f)?!!f.harRettPåForeldrepengerINorge||!!f.harRettPåForeldrepengerIEØS:!1,v=Cn(E.rolle),$e=Jn(!v,He,f),Ye=Wn(v,He,f),Ee=$e||Ye,$t=re?void 0:v?Z.farMedmor:Z.mor,G=Bt(m),X=pt(G),Yt=Fr(f,v),Qt=Hn(t.søker,f,v,a),Qe=m.antallBarn,Xt=Qe>1,Xe=kt(qe,v,f),I=F==null?void 0:F.uttaksplan,zt=F?F.uttaksplan!==void 0:!1,Zt=!1,en=Vr($),K=pr(m),he=xe(f)&&!f.utenlandskFnr?f.fnr:void 0,Ae=Se==="adopsjon",ve=T!==void 0?T.annenForelderFnr:void 0,ze=T!==void 0&&T.fnr!==void 0&&T.fnr.length>0?T.fnr[0]:void 0,Ne=T!==void 0?T.familiehendelsesdato:void 0,w=T!==void 0?T.startdatoFørsteStønadsperiode:void 0,Te=!kt(E.rolle,v,f),Ze=!bt(m)&&m.fnr!==void 0&&m.fnr.length>0?m.fnr[0]:void 0,se=!(!Ee&&he!==void 0&&he!==""&&(Ze!==void 0||G!==void 0)),tn=Us(lr(),3e3),et=p.useRef(!0);p.useEffect(()=>{et.current===!1&&r(),et.current=!1},[tn,r]);const{data:Oe,requestStatus:Pe,error:Fe}=St(de.ANNEN_PART_VEDTAK,{annenPartFødselsnummer:he,barnFødselsnummer:Ze,familiehendelse:G},se),C=p.useMemo(()=>wr(Oe,m,v,G,w),[Oe,m,v,G,w]),nn=()=>{A(!1);const h={[x.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[x.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[x.DOK_SYKDOM_MOR]:[],[x.DOK_SYKDOM_FAR]:[],[x.DOK_INNLEGGELSE_BARN]:[],[x.DOK_INNLEGGELSE_MOR]:[],[x.DOK_INNLEGGELSE_FAR]:[],[x.DOK_ARBEID_MOR]:[],[x.DOK_UTDANNING_MOR]:[],[x.DOK_UTDANNING_OG_ARBEID_MOR]:[]};y({...g,perioderSomSkalSendesInn:[],endringstidspunkt:void 0,ønskerJustertUttakVedFødsel:void 0}),Y([]),Wt({...Ct,...h}),Jt(k.UTTAKSPLAN_INFO),r(),d.goToPreviousDefaultStep()},_e=yr(v,m.antallBarn,C==null?void 0:C.grunnlag.antallBarn);p.useEffect(()=>{v&&m.antallBarn!==_e&&Ce({...m,antallBarn:_e})},[v,_e,m,Ce]);const De=!(ve!==void 0&&ve!==""&&(ze!==void 0||Ne!==void 0)&&(se||Pe===W.FINISHED)),{data:rn,requestStatus:tt,error:Ue}=St(de.NESTE_SAK_ANNEN_PART_VEDTAK,{annenPartFødselsnummer:ve,barnFødselsnummer:ze,familiehendelse:In(Ne)},De),oe=Cr(rn);p.useEffect(()=>{if(oe!==void 0&&T!==void 0&&(R(oe).isBefore(T.startdatoFørsteStønadsperiode,"d")||T.startdatoFørsteStønadsperiode===void 0)){const h={...T,startdatoFørsteStønadsperiode:oe};Je(h)}},[w,oe,T,Je]);const nt=Rr({erDeltUttak:re,morHarRett:Xe,søkerErAleneOmOmsorg:Ee});p.useEffect(()=>{if(F!==void 0&&I!==void 0&&C!==void 0&&!g.annenPartsUttakErLagtTilIPlan){I.forEach(D=>{if(Q(D)){const dt=qn(C.uttaksplan).finnOverlappendePerioder(D);dt.length!==0&&dt.find(ut=>$n(ut)&&ut.ønskerSamtidigUttak===!0)&&(D.ønskerSamtidigUttak||(D.ønskerSamtidigUttak=!0,D.samtidigUttakProsent=xr(D.gradert,D.stillingsprosent)))}});const h=_r(Dr(I,C.uttaksplan,X,w,!0),nt,X,Ae,Te,v,w),U={...F,uttaksplan:h};Y(h),We(U),y({...g,annenPartsUttakErLagtTilIPlan:!0})}},[C,I,X,nt,Ae,Te,v,w,F,g,Y,We,y]),p.useEffect(()=>{const h=I==null?void 0:I.find(U=>Q(U)&&U.angittAvAnnenPart);if(h&&te===void 0){const U=h.tidsperiode.fom,D=Ot(b,e,v,I,U);fe(D),y({...g,perioderSomSkalSendesInn:D,endringstidspunkt:te})}},[I,te,v,b,e,y,g]);const rt=async()=>{const h=Ir(b,v,f,e,g==null?void 0:g.perioderSomSkalSendesInn);return N(!0),_(!0),y({...g,endringstidspunkt:te,perioderSomSkalSendesInn:ne,antallUkerIUttaksplan:mn}),h?d.goToNextStep(k.DOKUMENTASJON):d.goToNextDefaultStep()},ae=Yn(b,X,K?R(K).toDate():void 0),Re=Ms(v,X,Se,ae,m,K,Te),ie=xs(Re,ae,K),sn=()=>{ie||y({...g,ønskerJustertUttakVedFødsel:void 0})},on=h=>ie&&h!==void 0,Ie=p.useRef(null),an=async h=>{_(!0),l&&!lt&&(N(!0),Ie.current&&Ie.current.handleSubmit(),sn(),on(h.ønskerAutomatiskJustering)&&await rt())},ln=jn(t.søker.kjønn,qt,re,$e,Ye,qe),st=(se?!1:Pe!==W.FINISHED)||(De?!1:tt!==W.FINISHED),{stønadskontoParams100:dn,stønadskontoParams80:un}=Mr(m,f,E,T,Oe,F),{data:ot}=Et(de.STØNADSKONTOER_80,un,st),{data:je,error:be}=Et(de.STØNADSKONTOER_100,dn,st),pn=h=>{_(!1),N(!1),Y(h);const U=Gr(I,h,e);Ht(U);const D=Ot(h,e,v,I,U);fe(D),y({...g,perioderSomSkalSendesInn:D})};if(p.useEffect(()=>{if(be)throw q(be),new Error("Vi klarte ikke å hente opp stønadskontoer. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(Fe)throw q(Fe),new Error("Vi klarte ikke å hente informasjon om saken til annen forelder. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(Ue)throw q(Ue),new Error("Vi klarte ikke å hente informasjon om saken til annen forelder for neste barn. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.")},[be,Fe,Ue]),!je||!ot||Pe!==W.FINISHED&&!se||tt!==W.FINISHED&&!De)return n.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:n.jsx(It,{size:"2xlarge"})});const at=Lr(ot,je),it=Jr(je.minsteretter.toTette),ye=B.dekningsgrad===Qn.HUNDRE_PROSENT?at[100]:at[80],lt=e&&(ne===void 0||ne.length===0),cn=()=>{const h=b.filter(U=>Xn(U));Y(h),y({...g,harUttaksplanBlittSlettet:!0})},kn=()=>{F&&(Y(F.uttaksplan),y({...g,perioderSomSkalSendesInn:[]}),fe([]))},mn=Wr(ye);return n.jsx(Ke.FormikWrapper,{initialValues:bs(g.ønskerJustertUttakVedFødsel,ie),onSubmit:rt,innerRef:Ie,renderForm:({values:h})=>{const U=Ks.getVisbility({ønskerAutomatiskJustering:h[ee.ønskerAutomatiskJustering]??me.NO,periodeRundtFødselKanAutomatiskJusteres:ie});return n.jsxs(bn,{bannerTitle:ue(a,"søknad.pageheading"),onCancel:s,onContinueLater:d.fortsettSøknadSenere,steps:o,children:[n.jsx(J,{padBottom:"l",children:n.jsx(Kr,{eksisterendeSak:F,erIUttaksplanenSteg:!0,tilgjengeligeStønadskontoer:ye,minsterettUkerToTette:it,søker:t.søker})}),n.jsx(Ur,{foreldreSituasjon:ln,forelderVedAleneomsorg:$t,erDeltUttak:re,uttaksplan:b,familiehendelsesdato:G,handleOnPlanChange:pn,stønadskontoer:ye,navnPåForeldre:Qt,annenForelder:f,arbeidsforhold:br(t.arbeidsforhold,Ae,v,pt(G)),erEndringssøknad:e,erFarEllerMedmor:v,erFlerbarnssøknad:Xt,erAleneOmOmsorg:Ee,harMidlertidigOmsorg:Zt,situasjon:Se,erMorUfør:Yt,morHarRett:Xe,søkersituasjon:E,dekningsgrad:B.dekningsgrad,antallBarn:Qe,setUttaksplanErGyldig:c,eksisterendeSak:F,perioderSomSkalSendesInn:ne,morsSisteDag:en,harKomplettUttaksplan:zt,opprinneligPlan:g.harUttaksplanBlittSlettet?void 0:I,handleSlettUttaksplan:cn,handleResetUttaksplan:kn,termindato:K?R(K).toDate():void 0,barn:m,visAutomatiskJusteringForm:Re,perioderMedUttakRundtFødsel:ae,barnFraNesteSak:T,familiehendelsesdatoNesteSak:Ne,førsteUttaksdagNesteBarnsSak:w,minsterettUkerToTette:it}),Re&&n.jsx(J,{padBottom:"l",children:n.jsx(Ve,{termindato:K?R(K).toDate():void 0,perioderMedUttakRundtFødsel:ae,antallBarn:m.antallBarn,visibility:U})}),n.jsx(Ls,{isOpen:P,setIsOpen:A,goToPreviousStep:nn}),!l&&S&&n.jsx(J,{textAlignCenter:!0,padBottom:"l",children:n.jsx(Le,{variant:"error",children:n.jsx(L,{id:"uttaksplan.validering.kanIkkeGåVidere"})})}),lt&&S&&n.jsx(J,{textAlignCenter:!0,padBottom:"l",children:n.jsx(Le,{variant:"error",children:n.jsx(L,{id:"uttaksplan.validering.kanIkkeGåVidereEndringssøknad"})})}),n.jsx(J,{textAlignCenter:!0,padBottom:"l",children:n.jsxs(yn,{singleButton:!0,children:[!e&&n.jsx(pe,{variant:"secondary",onClick:D=>{D.preventDefault(),A(!0)},children:n.jsx(L,{id:"backlink.label"})}),n.jsx(pe,{type:"submit",onClick:an,disabled:u,loading:u,children:ue(a,"søknad.gåVidere")})]})})]})}})};try{ke.displayName="UttaksplanStep",ke.__docgenInfo={description:"",displayName:"UttaksplanStep",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},erEndringssøknad:{defaultValue:null,description:"",name:"erEndringssøknad",required:!0,type:{name:"boolean"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}const Gs=(t,e,r=[])=>{switch(t){case k.SØKERSITUASJON:return e===!0;case k.OPPSUMMERING:return jr(r)===!1&&r.length>0;default:return!0}},ws=(t,e,r,s,a,o,d)=>!t||d===void 0?n.jsx(O,{path:"*",element:n.jsx(mt,{to:k.VELKOMMEN})}):yt(r.søker.fødselsdato)?e?n.jsxs(n.Fragment,{children:[n.jsx(O,{path:k.UTTAKSPLAN,element:n.jsx(ke,{søkerInfo:r,erEndringssøknad:e,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.DOKUMENTASJON,element:n.jsx(ft,{søkerInfo:r,erEndringssøknad:e,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.OPPSUMMERING,element:n.jsx(gt,{erEndringssøknad:e,søkerInfo:r,sendSøknad:a,avbrytSøknad:o,mellomlagreSøknadOgNaviger:s})})]}):n.jsxs(n.Fragment,{children:[n.jsx(O,{path:k.SØKERSITUASJON,element:n.jsx(Sr,{arbeidsforhold:r.arbeidsforhold,kjønn:r.søker.kjønn,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.OM_BARNET,element:n.jsx(fr,{søkerInfo:r,søknadGjelderNyttBarn:d,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.ANNEN_FORELDER,element:n.jsx(kr,{søkerInfo:r,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.PERIODE_MED_FORELDREPENGER,element:n.jsx(gr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.UTTAKSPLAN_INFO,element:n.jsx(ar,{søkerInfo:r,erEndringssøknad:e,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.UTTAKSPLAN,element:n.jsx(ke,{søkerInfo:r,erEndringssøknad:e,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.DOKUMENTASJON,element:n.jsx(ft,{søkerInfo:r,erEndringssøknad:e,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.UTENLANDSOPPHOLD,element:n.jsx(Er,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.TIDLIGERE_UTENLANDSOPPHOLD,element:n.jsx(Ar,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.SENERE_UTENLANDSOPPHOLD,element:n.jsx(hr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.INNTEKTSINFORMASJON,element:n.jsx(mr,{arbeidsforhold:r.arbeidsforhold,mellomlagreSøknadOgNaviger:s,avbrytSøknad:o})}),n.jsx(O,{path:k.OPPSUMMERING,element:n.jsx(gt,{erEndringssøknad:e,søkerInfo:r,sendSøknad:a,avbrytSøknad:o,mellomlagreSøknadOgNaviger:s})})]}):n.jsx(O,{path:"*",element:n.jsx(mt,{to:k.IKKE_MYNDIG})}),Cs=({locale:t,onChangeLocale:e,currentRoute:r,søkerInfo:s,saker:a,lagretErEndringssøknad:o,lagretHarGodkjentVilkår:d,lagretSøknadGjelderNyttBarn:u,setKvittering:N})=>{const S=we(),_=zn(),[P,A]=p.useState(!0),[l,c]=p.useState(d||!1),[E,m]=p.useState(o||!1),[f,g]=p.useState(u),{sendSøknad:B,errorSendSøknad:$}=Ds(s.søker.fnr,E,N,t),b=Fs(t,s.søker.fnr,E,l,f),T=Os(s.søker.fnr,m,c,g),F=j(i.UTTAKSPLAN);return p.useEffect(()=>{r&&yt(s.søker.fødselsdato)&&d&&P&&(A(!1),Gs(r,d,F)?S(r):_.pathname===k.OPPSUMMERING&&S(k.UTTAKSPLAN))},[r,s.søker.fødselsdato,d,S,P,_.pathname,F]),$?n.jsx(En,{appName:"Foreldrepenger",errorMessage:$.message,retryCallback:()=>location.reload()}):n.jsxs(Zn,{children:[n.jsx(O,{path:k.VELKOMMEN,element:n.jsx(cr,{fornavn:s.søker.fornavn,locale:t,saker:a,onChangeLocale:e,fnr:s.søker.fnr,harGodkjentVilkår:l,søkerInfo:s,setHarGodkjentVilkår:c,setErEndringssøknad:m,setSøknadGjelderNyttBarn:g,mellomlagreSøknadOgNaviger:b})}),n.jsx(O,{path:k.IKKE_MYNDIG,element:n.jsx(hn,{appnavn:"Foreldrepenger"})}),ws(l,E,s,b,B,T,f)]})};try{ForeldrepengesknadRoutes.displayName="ForeldrepengesknadRoutes",ForeldrepengesknadRoutes.__docgenInfo={description:"",displayName:"ForeldrepengesknadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},currentRoute:{defaultValue:null,description:"",name:"currentRoute",required:!0,type:{name:"enum",value:[{value:'"/"'},{value:'"/soknad/sokersituasjon"'},{value:'"/soknad/om-barnet"'},{value:'"/soknad/annen-forelder"'},{value:'"/soknad/periode-med-foreldrepenger"'},{value:'"/soknad/uttaksplan-info"'},{value:'"/soknad/uttaksplan"'},{value:'"/soknad/utenlandsopphold"'},{value:'"/soknad/tidligere-utenlandsopphold"'},{value:'"/soknad/senere-utenlandsopphold"'},{value:'"/soknad/inntektsinformasjon"'},{value:'"/soknad/dokumentasjon"'},{value:'"/soknad/oppsummering"'},{value:'"ikke-myndig"'}]}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},saker:{defaultValue:null,description:"",name:"saker",required:!0,type:{name:"Sak[]"}},lagretErEndringssøknad:{defaultValue:null,description:"",name:"lagretErEndringssøknad",required:!1,type:{name:"boolean"}},lagretHarGodkjentVilkår:{defaultValue:null,description:"",name:"lagretHarGodkjentVilkår",required:!1,type:{name:"boolean"}},lagretSøknadGjelderNyttBarn:{defaultValue:null,description:"",name:"lagretSøknadGjelderNyttBarn",required:!1,type:{name:"boolean"}},setKvittering:{defaultValue:null,description:"",name:"setKvittering",required:!0,type:{name:"(kvittering: Kvittering) => void"}}}}}catch{}const Js=t=>{switch(t){case k.UTTAKSPLAN:case k.OPPSUMMERING:return!0;default:return!1}},Pt=t=>t.søknad&&t.søknad.erEndringssøknad&&!Js(t.currentRoute)?!1:t.version===6,Ft=()=>n.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:n.jsx(It,{size:"2xlarge"})}),Ws=({locale:t,onChangeLocale:e})=>{var l,c;const r=Ge();An(r.formatMessage({id:"søknad.pagetitle"}));const{søkerinfoData:s,søkerinfoError:a}=H.useSøkerinfo(),{sakerData:o,sakerError:d}=H.useGetSaker(),{storageData:u,storageStatus:N}=H.useStoredAppState(),[S,_]=p.useState();p.useEffect(()=>{if(a)throw q(a),new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(d)throw q(d),new Error("Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.")},[a,d]);const P=u&&Pt(u)?Ts(u):void 0,A=u!==void 0&&Pt(u);return p.useEffect(()=>{var E,m,f,g;(m=(E=u==null?void 0:u.søknad)==null?void 0:E.søker)!=null&&m.språkkode&&u.søknad.søker.språkkode!==t&&e((g=(f=u.søknad)==null?void 0:f.søker)==null?void 0:g.språkkode)},[u]),S?Me.INNSYN?(Ns(S.saksNr?`${Me.INNSYN}/sak/${S.saksNr}/redirectFromSoknad`:`${Me.INNSYN}/redirectFromSoknad`),n.jsx(Ft,{})):n.jsx("div",{children:"Redirected to Innsyn"}):!o||!s||N===W.IN_PROGRESS?n.jsx(Ft,{}):n.jsx(ce,{søker:s.søker,children:n.jsx(dr,{initialState:P,children:n.jsx(Ln,{children:n.jsx(Cs,{locale:t,onChangeLocale:e,søkerInfo:s,saker:o.foreldrepenger,currentRoute:A?u.currentRoute:k.VELKOMMEN,lagretErEndringssøknad:A?(l=u.søknad)==null?void 0:l.erEndringssøknad:!1,lagretHarGodkjentVilkår:A?(c=u.søknad)==null?void 0:c.harGodkjentVilkår:!1,lagretSøknadGjelderNyttBarn:A?u.søknadGjelderEtNyttBarn:!1,setKvittering:_})})})})};try{Foreldrepengesknad.displayName="Foreldrepengesknad",Foreldrepengesknad.__docgenInfo={description:"",displayName:"Foreldrepengesknad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}}}}}catch{}const Hs=()=>{const t=Ss();return t?t.name==="ie":!1},Gt=is(),qs={nb:{...xn,...ct.nb},nn:{...Mn,...ct.nn}};R.locale(Gt);const $s=()=>{const[t,e]=p.useState(Gt);return n.jsx(ce,{children:n.jsx(Br,{children:n.jsxs(vn,{locale:t,messagesGroupedByLocale:qs,children:[n.jsx(Hr,{skalEndreNettleser:Hs()}),n.jsx(Ws,{locale:t,onChangeLocale:r=>{ls(r),e(r),qr(r),document.documentElement.setAttribute("lang",r)}})]})})})},wt=$s,Ys={søker:{fnr:"06499121154",fornavn:"Tapper",etternavn:"Konvolutt",kjønn:"M",fødselsdato:"1991-09-06",bankkonto:{kontonummer:"",banknavn:""},barn:[]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2018-03-01"}]},pa={title:"AppContainer",component:wt},Qs=({søkerinfoData:t,sakerData:e,annenPartVedtakData:r,stønadskontoerData:s,storageKvitteringData:a})=>{Nn();const o=new Tn($r);return o.onGet("/sokerinfo").reply(200,t),o.onGet("/innsyn/v2/saker").reply(200,e),o.onGet("/innsyn/v2/annenPartVedtak").reply(200,r),o.onGet("/konto").reply(200,s),o.onGet("/storage/kvittering/foreldrepenger").reply(200,a),o.onGet("test/konto").replyOnce(200,On),o.onGet("test/konto").replyOnce(200,Pn),o.onPost("/innsyn/v2/annenPartVedtak").replyOnce(200,void 0,W.FINISHED),o.onPost("/storage/foreldrepenger").reply(200,{}),o.onPost("/soknad").reply(200,{}),o.onPost("/sendSøknadUrl").reply(200,{}),o.onDelete("/storage/foreldrepenger").reply(200,{}),n.jsx(wt,{})},z=Qs.bind({});z.args={søkerinfoData:Ys,sakerData:rs,annenPartVedtakData:Xr,stønadskontoerData:as,storageKvitteringData:es};var _t,Dt,Ut;z.parameters={...z.parameters,docs:{...(_t=z.parameters)==null?void 0:_t.docs,source:{originalSource:`({
  søkerinfoData,
  sakerData,
  annenPartVedtakData,
  stønadskontoerData,
  storageKvitteringData
}) => {
  initAmplitude();
  const apiMock = new MockAdapter(AxiosInstance);
  apiMock.onGet('/sokerinfo').reply(200, søkerinfoData);
  apiMock.onGet('/innsyn/v2/saker').reply(200, sakerData);
  apiMock.onGet('/innsyn/v2/annenPartVedtak').reply(200, annenPartVedtakData);
  apiMock.onGet('/konto').reply(200, stønadskontoerData);
  apiMock.onGet('/storage/kvittering/foreldrepenger').reply(200, storageKvitteringData);
  apiMock.onGet('test/konto').replyOnce(200, stønadskontoDeltUttak80);
  apiMock.onGet('test/konto').replyOnce(200, stønadskontoDeltUttak100);
  apiMock.onPost('/innsyn/v2/annenPartVedtak').replyOnce(200, undefined, RequestStatus.FINISHED);
  apiMock.onPost('/storage/foreldrepenger').reply(200, {});
  apiMock.onPost('/soknad').reply(200, {});
  apiMock.onPost('/sendSøknadUrl').reply(200, {});
  apiMock.onDelete('/storage/foreldrepenger').reply(200, {});
  return <AppContainer />;
}`,...(Ut=(Dt=z.parameters)==null?void 0:Dt.docs)==null?void 0:Ut.source}}};const ca=["SøkerErMann"];export{z as SøkerErMann,ca as __namedExportsOrder,pa as default};
