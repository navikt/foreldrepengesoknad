import{j as n}from"./jsx-runtime-d079401a.js";import{M as un}from"./index-7358cd3c.js";import{r as c}from"./index-f1f2c4b1.js";import{aV as pn,d as B,g as cn,a4 as ne,M as ke,H as kn,b as M,B as me,af as mn,Y as Se,U as Ot,C as gn,u as Ve,c as G,i as te,I as De,z as xe,a3 as fn,o as Ut,S as Sn,aR as En}from"./Tidsperioden-d39f673c.js";import{H as hn,a as An,w as vn,c as Nn,b as Tn,I as Pn}from"./IntlProvider-e522e5d2.js";import"./dates-54b128b9.js";import{n as Fn,a as ct,b as In}from"./app-175d7b5c.js";import"./index-2d278ef6.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{L as yn,u as Ke,a as On,R as Un,b as I,N as kt,B as jn}from"./index-aa2fc0fb.js";import"./dateFormValidation-80cee100.js";import{A as b,R as H,r as jt}from"./api-a0f6edda.js";import{g as bn,a as xn,b as _n,c as mt,s as C,d as Rn,e as Dn,f as bt,h as Mn,i as Bn,j as Ln,U as wn}from"./UttaksplanInfo-d7879eee.js";import{V as Vn}from"./Velkommen-3a8492ec.js";import{A as Kn}from"./AnnenForelder-12164a8d.js";import{I as Gn}from"./Inntektsinformasjon-9015227d.js";import{O as Cn}from"./OmBarnet-6151f2d9.js";import{c as Jn,O as gt}from"./Oppsummering-def9cab2.js";import{S as Wn}from"./SøkersituasjonSteg-1951a086.js";import{B as Hn,r as xt,a as qn,i as ft,b as $n,c as Yn,e as _t,d as zn,z as St,h as Qn}from"./barnUtils-2943bedb.js";import{P as Xn,D as _e,S as Zn}from"./Periodene-08800708.js";import{b as q,d as Rt,c as er,g as tr,P as nr,U as rr,S as Me,n as sr,r as or}from"./Perioden-22dabb05.js";import{i as ar}from"./isFarEllerMedmor-120238ea.js";import{l as ir}from"./uttaksPlanStatus-4bc3d31e.js";import{g as lr,U as dr,a as ur,u as pr}from"./Uttaksplan-bf9bef99.js";import{g as cr}from"./arbeidsforholdUtils-a1831a19.js";import{S as g}from"./routes-9effe5a6.js";import{s as kr,g as mr,u as gr}from"./stepsConfig-81c894d5.js";import{b as fr,c as Sr}from"./dateUtils-068570bb.js";import{B as Et}from"./Link-13f307fd.js";import{c as Er,a as hr}from"./BackButton-9f66eb01.js";import{c as Ar,g as vr}from"./eksisterendeSakUtils-89e2ca03.js";import{g as Nr,I as Tr}from"./InfoOmSøknaden-e1abbb2a.js";import{a as Pr}from"./FormikFileUploader-5a19581c.js";import{f as Fr,s as Ir}from"./leggTilPeriode-5bd531a5.js";import{n as R}from"./validation-631bcf6e.js";import{u as j,C as l,a as K,d as yr,e as Dt,b as Or,F as Ur}from"./FpDataContext-fc20d236.js";import{A as Be}from"./Alert-2b03bb1d.js";import{Q as jr}from"./index-47edccfa.js";import{U as br}from"./UtenlandsoppholdSteg-f101101f.js";import{T as xr}from"./TidligereUtenlandsoppholdSteg-6ff390b2.js";import{S as _r}from"./SenereUtenlandsoppholdSteg-cb238f30.js";import{l as Rr}from"./amplitude-b929dfa7.js";import{m as Dr}from"./mapSøkerinfoDTO-aa29149d.js";import{F as Mr}from"./Feilside-ccb3c83a.js";import{l as Br}from"./links-b36d21ab.js";import{E as Re,A as Lr}from"./apiInterceptor-87eb5c75.js";import{B as wr}from"./ByttBrowserModal-b9cd1fe5.js";import"./index-b580f7e8.js";import"./index-c74c9f7f.js";import"./v4-4a60fe23.js";import"./amplitude.esm-ec80886e.js";import"./provider-d52ba294.js";import"./LenkeKnapp-9b88ce13.js";import"./Ingress-6c1bbb1b.js";import"./velkommenUtils-a0694d5f.js";import"./Tag-01a82302.js";import"./DinePlikter-83e009a5.js";import"./DinePersonopplysningerModal-a367de06.js";import"./stringUtils-4a2fcc5c.js";import"./validationUtil-4c399064.js";import"./RegistrertePersonalia-e20ed415.js";import"./InteractiveListElement-a737d66f.js";import"./Næring-e1b25dad.js";import"./ExpansionCard-9e7512df.js";import"./ErrorSummaryHookForm-02ace7eb.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./AttachmentList-c97f7e55.js";import"./Attachment-0c250fce.js";import"./TidligereUtenlandsoppholdPanel-d5457625.js";const Vr=[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2018-03-01"}],Kr={søker:{fnr:"06499121154",fornavn:"Tapper",etternavn:"Konvolutt",kjønn:"M",fødselsdato:"1991-09-06",bankkonto:{kontonummer:"",banknavn:""}},arbeidsforhold:Vr},Gr=[{fom:"2022-12-12",tom:"2023-02-17",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},samtidigUttak:100,flerbarnsdager:!1},{fom:"2023-02-20",tom:"2023-03-05",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},samtidigUttak:50,flerbarnsdager:!1},{fom:"2023-03-20",tom:"2023-03-31",kontoType:"FEDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!0,trekkerDager:!0,årsak:"ANNET"},flerbarnsdager:!1}],Cr="HUNDRE",Jr={perioder:Gr,dekningsgrad:Cr},Wr=[{saksnummer:"352011594",sakAvsluttet:!1,sisteSøknadMottattDato:"2023-03-31",kanSøkeOmEndring:!1,sakTilhørerMor:!1,gjelderAdopsjon:!0,morUføretrygd:!1,harAnnenForelderTilsvarendeRettEØS:!1,ønskerJustertUttakVedFødsel:!1,rettighetType:"BEGGE_RETT",annenPart:{type:"person",fnr:"05489305072",fornavn:"Sentral",etternavn:"Tangent"},familiehendelse:{fødselsdato:"2023-02-01",antallBarn:1,omsorgsovertakelse:"2023-04-10"},åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknadsperioder:[{fom:"2023-04-10",tom:"2023-07-21",kontoType:"FEDREKVOTE",flerbarnsdager:!1},{fom:"2023-07-24",tom:"2023-09-15",kontoType:"FELLESPERIODE",morsAktivitet:"UTDANNING",flerbarnsdager:!1}]},barn:[],dekningsgrad:"HUNDRE"}],Hr=[],qr={foreldrepenger:Wr,engangsstønad:[],svangerskapspenger:Hr},$r="2019-02-01",Yr="23123",zr={innsendingstidspunkt:$r,pdf:Yr},Qr={MØDREKVOTE:95,FEDREKVOTE:95,FELLESPERIODE:90,FORELDREPENGER_FØR_FØDSEL:15,FORELDREPENGER:80},Xr={},Zr={kontoer:Qr,minsteretter:Xr},Mt="selectedLocale",es=()=>sessionStorage.getItem(Mt)||"nb",ts=t=>{sessionStorage.setItem(Mt,t)};var ht=globalThis&&globalThis.__spreadArray||function(t,e,r){if(r||arguments.length===2)for(var s=0,o=e.length,a;s<o;s++)(a||!(s in e))&&(a||(a=Array.prototype.slice.call(e,0,s)),a[s]=e[s]);return t.concat(a||Array.prototype.slice.call(e))},ns=function(){function t(e,r,s){this.name=e,this.version=r,this.os=s,this.type="browser"}return t}(),rs=function(){function t(e){this.version=e,this.type="node",this.name="node",this.os=process.platform}return t}(),ss=function(){function t(e,r,s,o){this.name=e,this.version=r,this.os=s,this.bot=o,this.type="bot-device"}return t}(),os=function(){function t(){this.type="bot",this.bot=!0,this.name="bot",this.version=null,this.os=null}return t}(),as=function(){function t(){this.type="react-native",this.name="react-native",this.version=null,this.os=null}return t}(),is=/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/,ls=/(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/,At=3,ds=[["aol",/AOLShield\/([0-9\._]+)/],["edge",/Edge\/([0-9\._]+)/],["edge-ios",/EdgiOS\/([0-9\._]+)/],["yandexbrowser",/YaBrowser\/([0-9\._]+)/],["kakaotalk",/KAKAOTALK\s([0-9\.]+)/],["samsung",/SamsungBrowser\/([0-9\.]+)/],["silk",/\bSilk\/([0-9._-]+)\b/],["miui",/MiuiBrowser\/([0-9\.]+)$/],["beaker",/BeakerBrowser\/([0-9\.]+)/],["edge-chromium",/EdgA?\/([0-9\.]+)/],["chromium-webview",/(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["phantomjs",/PhantomJS\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["fxios",/FxiOS\/([0-9\.]+)/],["opera-mini",/Opera Mini.*Version\/([0-9\.]+)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)/],["pie",/^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],["pie",/^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/],["netfront",/^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/Version\/([0-9\._]+).*Mobile.*Safari.*/],["safari",/Version\/([0-9\._]+).*Safari/],["facebook",/FB[AS]V\/([0-9\.]+)/],["instagram",/Instagram\s([0-9\.]+)/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Mobile/],["ios-webview",/AppleWebKit\/([0-9\.]+).*Gecko\)$/],["curl",/^curl\/([0-9\.]+)$/],["searchbot",is]],vt=[["iOS",/iP(hone|od|ad)/],["Android OS",/Android/],["BlackBerry OS",/BlackBerry|BB10/],["Windows Mobile",/IEMobile/],["Amazon OS",/Kindle/],["Windows 3.11",/Win16/],["Windows 95",/(Windows 95)|(Win95)|(Windows_95)/],["Windows 98",/(Windows 98)|(Win98)/],["Windows 2000",/(Windows NT 5.0)|(Windows 2000)/],["Windows XP",/(Windows NT 5.1)|(Windows XP)/],["Windows Server 2003",/(Windows NT 5.2)/],["Windows Vista",/(Windows NT 6.0)/],["Windows 7",/(Windows NT 6.1)/],["Windows 8",/(Windows NT 6.2)/],["Windows 8.1",/(Windows NT 6.3)/],["Windows 10",/(Windows NT 10.0)/],["Windows ME",/Windows ME/],["Windows CE",/Windows CE|WinCE|Microsoft Pocket Internet Explorer/],["Open BSD",/OpenBSD/],["Sun OS",/SunOS/],["Chrome OS",/CrOS/],["Linux",/(Linux)|(X11)/],["Mac OS",/(Mac_PowerPC)|(Macintosh)/],["QNX",/QNX/],["BeOS",/BeOS/],["OS/2",/OS\/2/]];function us(t){return t?Nt(t):typeof document>"u"&&typeof navigator<"u"&&navigator.product==="ReactNative"?new as:typeof navigator<"u"?Nt(navigator.userAgent):ks()}function ps(t){return t!==""&&ds.reduce(function(e,r){var s=r[0],o=r[1];if(e)return e;var a=o.exec(t);return!!a&&[s,a]},!1)}function Nt(t){var e=ps(t);if(!e)return null;var r=e[0],s=e[1];if(r==="searchbot")return new os;var o=s[1]&&s[1].split(".").join("_").split("_").slice(0,3);o?o.length<At&&(o=ht(ht([],o,!0),ms(At-o.length),!0)):o=[];var a=o.join("."),d=cs(t),i=ls.exec(t);return i&&i[1]?new ss(r,a,d,i[1]):new ns(r,a,d)}function cs(t){for(var e=0,r=vt.length;e<r;e++){var s=vt[e],o=s[0],a=s[1],d=a.exec(t);if(d)return o}return null}function ks(){var t=typeof process<"u"&&process.version;return t?new rs(process.version.slice(1)):null}function ms(t){for(var e=[],r=0;r<t;r++)e.push("0");return e}const gs=t=>{window.location.href=t},fs=(t,e)=>{const[r,s]=c.useState(t);return c.useEffect(()=>{const o=setTimeout(()=>{s(t)},e);return()=>{clearTimeout(o)}},[t,e]),r},Bt=t=>q(t)||Rt(t)||er(t)||tr(t),Tt=(t,e,r,s,o)=>s?e?Es(s,t,o,r):t.filter(Bt):t,Ss=(t,e,r,s)=>{const o=e.filter(a=>pn(r,a.tidsperiode.fom,a.tidsperiode.tom)||B(a.tidsperiode.fom).isSameOrAfter(B(r),"day")).filter(Bt);if(o.length===0&&t.length>e.length){const a=t.find(i=>B(i.tidsperiode.fom).isSame(r,"day"));return[{id:cn(),type:nr.Utsettelse,tidsperiode:{fom:a.tidsperiode.fom,tom:a.tidsperiode.tom},årsak:rr.Fri,forelder:s?ne.farMedmor:ne.mor,erArbeidstaker:!1}]}else return o},Es=(t,e,r,s)=>r===void 0?[]:Ss(t,e,r,s),hs=({isOpen:t,setIsOpen:e,goToPreviousStep:r})=>n.jsxs(ke,{"aria-label":"Vil du gå tilbake",open:t,onClose:()=>e(!1),children:[n.jsx(ke.Header,{children:n.jsx(kn,{size:"small",level:"1",children:n.jsx(M,{id:"uttaksplan.vilDuGåTilbakeModal.tittel"})})}),n.jsx(ke.Body,{children:n.jsxs(hn,{gap:"4",children:[n.jsx(Et,{children:n.jsx(M,{id:"uttaksplan.vilDuGåTilbakeModal.intro"})}),n.jsx(Et,{children:n.jsx(M,{id:"uttaksplan.vilDuGåTilbakeModal.spørsmål"})})]})}),n.jsxs(ke.Footer,{children:[n.jsx(me,{onClick:r,children:n.jsx(M,{id:"uttaksplan.vilDuGåTilbakeModal.okLabel"})}),n.jsx(me,{variant:"secondary",onClick:()=>e(!1),children:n.jsx(M,{id:"uttaksplan.vilDuGåTilbakeModal.avbrytLabel"})})]})]});try{VilDuGTilbakeModal.displayName="VilDuGTilbakeModal",VilDuGTilbakeModal.__docgenInfo={description:"",displayName:"VilDuGTilbakeModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},setIsOpen:{defaultValue:null,description:"",name:"setIsOpen",required:!0,type:{name:"Dispatch<SetStateAction<boolean>>"}},goToPreviousStep:{defaultValue:null,description:"",name:"goToPreviousStep",required:!0,type:{name:"() => void"}}}}}catch{}var re=(t=>(t.ønskerAutomatiskJustering="ønskerAutomatiskJustering",t))(re||{});const Le=mn(),As=t=>hr(t),vs=t=>({ønskerAutomatiskJustering:t!==void 0?Er(t):Se.UNANSWERED}),Lt=(t,e)=>e!==void 0&&q(t)&&B(t.tidsperiode.fom).isSame(Ot(e).denneEllerNeste(),"day")&&t.forelder===ne.farMedmor&&t.konto===Me.Fedrekvote&&t.ønskerSamtidigUttak===!0&&t.ønskerFlerbarnsdager!==!0,Ns=(t,e,r,s)=>s.type===Hn.UFØDT&&r&&t.length===1&&Lt(t[0],e),Ts=(t,e,r,s,o,a,d)=>t&&gn(e)&&r==="fødsel"&&s.length!==0&&xt(o)&&a!==void 0&&!d,we=({termindato:t,perioderMedUttakRundtFødsel:e,antallBarn:r,visibility:s})=>{const o=Ve(),a=Ot(t).denneEllerNeste(),d=R(j(l.UTTAKSPLAN_METADATA)),i=K(l.UTTAKSPLAN_METADATA),N=d.ønskerJustertUttakVedFødsel,E=N&&e.length>1,O=N&&e.length===1&&!B(e[0].tidsperiode.fom).isSame(a,"day"),k=N&&e.length===1&&B(e[0].tidsperiode.fom).isSame(a,"day")&&(q(e[0])&&(e[0].konto!==Me.Fedrekvote||!e[0].ønskerSamtidigUttak)||Rt(e[0])),A=N&&e.length===1&&B(e[0].tidsperiode.fom).isSame(a,"day")&&q(e[0])&&e[0].konto===Me.Fedrekvote&&e[0].ønskerFlerbarnsdager===!0;let f="";E&&(f="uttaksplan.automatiskJustering.info.hvisFlerePerioder"),O&&(f="uttaksplan.automatiskJustering.info.hvisIkkeLengerStarterPåTermin"),k&&(f="uttaksplan.automatiskJustering.info.hvisEndretPeriodePåTermin"),A&&(f="uttaksplan.automatiskJustering.info.hvisEndretPeriodeTilØnskerFlerbarnsdager");const u=p=>{const S=As(p);i({...d,ønskerJustertUttakVedFødsel:S})};return n.jsx(Le.Form,{includeButtons:!1,children:n.jsxs("div",{style:{paddingTop:"1rem",paddingBottom:"1rem"},children:[f!==""&&n.jsx(G,{padBottom:"l",children:n.jsx(Be,{variant:"info",children:n.jsx(M,{id:f})})}),n.jsx(G,{visible:s.isVisible(re.ønskerAutomatiskJustering),padBottom:"l",children:n.jsx(Le.YesOrNoQuestion,{name:re.ønskerAutomatiskJustering,legend:te(o,"uttaksplan.automatiskJustering.spørsmål",{antallBarn:r}),validate:p=>{if(p===Se.UNANSWERED)return te(o,"uttaksplan.automatiskJustering.svar.påkrevd")},afterOnChange:p=>u(p)})})]})})};try{we.displayName="AutomatiskJusteringForm",we.__docgenInfo={description:"",displayName:"AutomatiskJusteringForm",props:{termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date"}},perioderMedUttakRundtFødsel:{defaultValue:null,description:"",name:"perioderMedUttakRundtFødsel",required:!0,type:{name:"Periode[]"}},antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!0,type:{name:"number"}},visibility:{defaultValue:null,description:"",name:"visibility",required:!0,type:{name:"QuestionVisibility<UttaksplanFormField, undefined>"}}}}}catch{}const Ps=(t,e)=>t.length!==1||e===void 0?!1:Lt(t[0],e),Fs={[re.ønskerAutomatiskJustering]:{isIncluded:({perioderMedUttakRundtFødsel:t,termindato:e})=>Ps(t,e),isAnswered:({ønskerAutomatiskJustering:t})=>t!==Se.UNANSWERED}},Is=jr(Fs),ys=[],ge=({søkerInfo:t,erEndringssøknad:e,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})=>{const o=Ve(),a=gr(),[d,i]=c.useState(!1),[N,E]=c.useState(!1),[O,k]=c.useState(!1),[A,f]=c.useState(!0),u=R(j(l.SØKERSITUASJON)),p=R(j(l.OM_BARNET)),S=R(j(l.ANNEN_FORELDER)),D=R(j(l.SØKER)),m=R(j(l.UTTAKSPLAN_METADATA)),$=j(l.UTTAKSPLAN_INFO),L=j(l.UTTAKSPLAN)||ys,T=j(l.BARN_FRA_NESTE_SAK),P=j(l.EKSISTERENDE_SAK),J=K(l.OM_BARNET),Ge=K(l.BARN_FRA_NESTE_SAK),Y=K(l.UTTAKSPLAN),Ce=K(l.EKSISTERENDE_SAK),x=K(l.UTTAKSPLAN_METADATA),Je=K(l.APP_ROUTE),[se,Kt]=c.useState(m.endringstidspunkt),[oe,Ee]=c.useState(m.perioderSomSkalSendesInn||[]),Gt=e?g.OPPSUMMERING:g.UTENLANDSOPPHOLD,{person:We,arbeidsforhold:Ct}=t,{erAleneOmOmsorg:He}=D,{situasjon:he}=u,{rolle:qe}=u,Jt=qn(S),ae=ft(S)?!!S.harRettPåForeldrepengerINorge||!!S.harRettPåForeldrepengerIEØS:!1,v=ar(u.rolle),ie=$n(!v,He,S),le=Yn(v,He,S),Ae=ie||le,Wt=ae?void 0:v?ne.farMedmor:ne.mor,w=_t(p),z=De(w),Ht=lr(S,v),qt=zn(We,S,v,o),$e=p.antallBarn,$t=$e>1,Ye=St(qe,v,S),U=P==null?void 0:P.uttaksplan,Yt=P?P.uttaksplan!==void 0:!1,zt=!1,Qt=fr($),W=Qn(p),ve=ft(S)&&!S.utenlandskFnr?S.fnr:void 0,Ne=he==="adopsjon",Te=T!==void 0?T.annenForelderFnr:void 0,ze=T!==void 0&&T.fnr!==void 0&&T.fnr.length>0?T.fnr[0]:void 0,Q=T!==void 0?T.familiehendelsesdato:void 0,V=T!==void 0?T.startdatoFørsteStønadsperiode:void 0,Pe=!St(u.rolle,v,S),Qe=!xt(p)&&p.fnr!==void 0&&p.fnr.length>0?p.fnr[0]:void 0,de=!(!Ae&&ve!==void 0&&ve!==""&&(Qe!==void 0||w!==void 0)),Xt=fs(yr(),3e3),Xe=c.useRef(!0);c.useEffect(()=>{Xe.current===!1&&r(),Xe.current=!1},[Xt,r]);const{eksisterendeSakAnnenPartData:Ze,eksisterendeSakAnnenPartError:Fe,eksisterendeSakAnnenPartRequestStatus:Ie}=b.useGetAnnenPartsVedtak(ve,Qe,w,de),_=c.useMemo(()=>Ar(Ze,p,v,w,V),[Ze,p,v,w,V]),Zt=()=>{k(!1),Je(g.UTTAKSPLAN_INFO),r()},et=bn(P==null?void 0:P.grunnlag.termindato,_==null?void 0:_.grunnlag.termindato),X=xn(v,p.antallBarn,_==null?void 0:_.grunnlag.antallBarn);c.useEffect(()=>{v&&p.antallBarn!==X&&J({...p,antallBarn:X})},[v,X,p,J]);const ye=!(Te!==void 0&&Te!==""&&(ze!==void 0||Q!==void 0)&&(de||Ie===H.FINISHED)),{eksisterendeSakAnnenPartData:en,eksisterendeSakAnnenPartError:Oe,eksisterendeSakAnnenPartRequestStatus:tt}=b.useGetAnnenPartsVedtak(Te,ze,xe(Q),ye),ue=vr(en);c.useEffect(()=>{if(ue!==void 0&&T!==void 0&&(B(ue).isBefore(T.startdatoFørsteStønadsperiode,"d")||T.startdatoFørsteStønadsperiode===void 0)){const h={...T,startdatoFørsteStønadsperiode:ue};Ge(h)}},[V,ue,T,Ge]);const nt=ur({erDeltUttak:ae,morHarRett:Ye,søkerErAleneOmOmsorg:Ae});c.useEffect(()=>{if(P!==void 0&&U!==void 0&&_!==void 0&&!m.annenPartsUttakErLagtTilIPlan){U.forEach(F=>{if(q(F)){const ce=Xn(_.uttaksplan).finnOverlappendePerioder(F);ce.length!==0&&ce.find(pt=>sr(pt)&&pt.ønskerSamtidigUttak===!0)&&(F.ønskerSamtidigUttak||(F.ønskerSamtidigUttak=!0,F.samtidigUttakProsent=_n(F.gradert,F.stillingsprosent)))}});const h=Fr(Ir(U,_.uttaksplan,z,V,!0),nt,z,Ne,Pe,v,V),y={...P,uttaksplan:h};Y(h),Ce(y),x({...m,annenPartsUttakErLagtTilIPlan:!0})}},[_,U,z,nt,Ne,Pe,v,V,P,m,Y,Ce,x]);const tn=(h,y)=>{const F=h!==Zn.Ingen?h:void 0,ce={...m.tilleggsopplysninger||{},begrunnelseForSenEndring:{...(m.tilleggsopplysninger||{}).begrunnelseForSenEndring,tekst:y,ekstraInformasjon:F}};x({...m,tilleggsopplysninger:ce})};c.useEffect(()=>{const h=U==null?void 0:U.find(y=>q(y)&&y.angittAvAnnenPart);if(h&&se===void 0){const y=h.tidsperiode.fom,F=Tt(L,e,v,U,y);Ee(F),x({...m,perioderSomSkalSendesInn:F,endringstidspunkt:se})}},[U,se,v,L,e,x,m]);const rt=async()=>{i(!0),E(!0);const h=Jn(m.tilleggsopplysninger);x({...m,endringstidspunkt:se,perioderSomSkalSendesInn:oe,tilleggsopplysninger:h}),Je(Gt),r()},Z=ir(L,z,W),pe=Ts(v,z,he,Z,p,W,Pe),st=Ns(Z,W,v,p),nn=()=>{(pe||e)&&!st&&x({...m,ønskerJustertUttakVedFødsel:void 0})},rn=h=>pe&&st&&h!==void 0,Ue=c.useRef(null),sn=async h=>{E(!0),A&&!ut&&(i(!0),Ue.current&&Ue.current.handleSubmit(),nn(),rn(h.ønskerAutomatiskJustering)&&await rt())},on=fn(We.kjønn,Jt,ae,ie,le,qe),ot=(de?!1:Ie!==H.FINISHED)||(ye?!1:tt!==H.FINISHED),{tilgjengeligeStønadskontoerData:je,tilgjengeligeStønadskontoerError:be}=b.useGetUttakskontoer(mt(_e.HUNDRE_PROSENT,p,S,u,le,ie,xe(Q),X,et),ot),{tilgjengeligeStønadskontoerData:at}=b.useGetUttakskontoer(mt(_e.ÅTTI_PROSENT,p,S,u,le,ie,xe(Q),X,et),ot),an=h=>{E(!1),i(!1),Y(h);const y=Sr(U,h,e);Kt(y);const F=Tt(h,e,v,U,y);Ee(F),x({...m,perioderSomSkalSendesInn:F})};if(c.useEffect(()=>{if(be)throw C(be),new Error("Vi klarte ikke å hente opp stønadskontoer. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(Fe)throw C(Fe),new Error("Vi klarte ikke å hente informasjon om saken til annen forelder. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(Oe)throw C(Oe),new Error("Vi klarte ikke å hente informasjon om saken til annen forelder for neste barn. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.")},[be,Fe,Oe]),!je||!at||Ie!==H.FINISHED&&!de||tt!==H.FINISHED&&!ye)return n.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:n.jsx(Ut,{size:"2xlarge"})});const it=Rn(at,je),lt=Nr(je.minsteretter.toTette),dt=m.dekningsgrad===_e.HUNDRE_PROSENT?it[100]:it[80],ut=e&&(oe===void 0||oe.length===0),ln=()=>{const h=L.filter(y=>or(y));Y(h),x({...m,harUttaksplanBlittSlettet:!0})},dn=()=>{P&&(Y(P.uttaksplan),x({...m,perioderSomSkalSendesInn:[]}),Ee([]))};return n.jsx(Le.FormikWrapper,{initialValues:vs(m.ønskerJustertUttakVedFødsel),onSubmit:rt,innerRef:Ue,renderForm:({values:h})=>{const y=Is.getVisbility({ønskerAutomatiskJustering:h[re.ønskerAutomatiskJustering]??Se.NO,termindato:W,perioderMedUttakRundtFødsel:Z});return n.jsxs(Sn,{bannerTitle:te(o,"søknad.pageheading"),activeStepId:"uttaksplan",pageTitle:te(o,"søknad.uttaksplan"),onCancel:s,onContinueLater:a,steps:kr(o,e),children:[n.jsx(G,{padBottom:"l",children:n.jsx(Tr,{eksisterendeSak:P,erIUttaksplanenSteg:!0,tilgjengeligeStønadskontoer:dt,minsterettUkerToTette:lt,person:t.person})}),n.jsx(dr,{foreldreSituasjon:on,forelderVedAleneomsorg:Wt,erDeltUttak:ae,uttaksplan:L,familiehendelsesdato:w,handleOnPlanChange:an,stønadskontoer:dt,navnPåForeldre:qt,annenForelder:S,arbeidsforhold:cr(Ct,Ne,v,De(w)),erEndringssøknad:e,erFarEllerMedmor:v,erFlerbarnssøknad:$t,erAleneOmOmsorg:Ae,harMidlertidigOmsorg:zt,situasjon:he,erMorUfør:Ht,morHarRett:Ye,søkersituasjon:u,dekningsgrad:m.dekningsgrad,antallBarn:$e,tilleggsopplysninger:m.tilleggsopplysninger||{},setUttaksplanErGyldig:f,handleBegrunnelseChange:tn,eksisterendeSak:P,perioderSomSkalSendesInn:oe,morsSisteDag:Qt,harKomplettUttaksplan:Yt,opprinneligPlan:m.harUttaksplanBlittSlettet?void 0:U,handleSlettUttaksplan:ln,handleResetUttaksplan:dn,termindato:W,barn:p,saveAttachment:Pr.saveAttachment,visAutomatiskJusteringForm:pe,perioderMedUttakRundtFødsel:Z,barnFraNesteSak:T,familiehendelsesdatoNesteSak:Q,førsteUttaksdagNesteBarnsSak:V,minsterettUkerToTette:lt}),pe&&n.jsx(G,{padBottom:"l",children:n.jsx(we,{termindato:W,perioderMedUttakRundtFødsel:Z,antallBarn:p.antallBarn,visibility:y})}),n.jsx(hs,{isOpen:O,setIsOpen:k,goToPreviousStep:Zt}),!A&&N&&n.jsx(G,{textAlignCenter:!0,padBottom:"l",children:n.jsx(Be,{variant:"error",children:n.jsx(M,{id:"uttaksplan.validering.kanIkkeGåVidere"})})}),ut&&N&&n.jsx(G,{textAlignCenter:!0,padBottom:"l",children:n.jsx(Be,{variant:"error",children:n.jsx(M,{id:"uttaksplan.validering.kanIkkeGåVidereEndringssøknad"})})}),n.jsx(G,{textAlignCenter:!0,padBottom:"l",children:n.jsxs(En,{children:[!e&&n.jsx(me,{variant:"secondary",as:yn,onClick:F=>{F.preventDefault(),k(!0)},to:mr("uttaksplan"),children:n.jsx(M,{id:"backlink.label"})}),n.jsx(me,{type:"submit",onClick:sn,disabled:d,loading:d,children:te(o,"søknad.gåVidere")})]})})]})}})};try{ge.displayName="UttaksplanStep",ge.__docgenInfo={description:"",displayName:"UttaksplanStep",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},erEndringssøknad:{defaultValue:null,description:"",name:"erEndringssøknad",required:!0,type:{name:"boolean"}},mellomlagreSøknadOgNaviger:{defaultValue:null,description:"",name:"mellomlagreSøknadOgNaviger",required:!0,type:{name:"() => Promise<void>"}},avbrytSøknad:{defaultValue:null,description:"",name:"avbrytSøknad",required:!0,type:{name:"() => void"}}}}}catch{}const Os=(t,e,r=[])=>{switch(t){case g.SØKERSITUASJON:return e===!0;case g.OPPSUMMERING:return pr(r)===!1&&r.length>0;default:return!0}},Us=(t,e,r,s,o,a)=>{const d=R(e(l.APP_ROUTE)),i=e(l.SØKERSITUASJON),N=e(l.OM_BARNET),E=e(l.ANNEN_FORELDER),O=e(l.SØKER),k=e(l.UTENLANDSOPPHOLD),A=e(l.UTENLANDSOPPHOLD_SENERE),f=e(l.UTENLANDSOPPHOLD_TIDLIGERE),u=e(l.UTTAKSPLAN_METADATA),p=e(l.BARN_FRA_NESTE_SAK),S=e(l.EKSISTERENDE_SAK),D=e(l.UTTAKSPLAN),m=e(l.UTTAKSPLAN_INFO),$={version:5,currentRoute:d,søknadGjelderEtNyttBarn:a,søknad:{harGodkjentVilkår:o,søkersituasjon:i,barn:N,annenForelder:E,søker:{...O,språkkode:t},informasjonOmUtenlandsopphold:k?{...k,senereOpphold:(A==null?void 0:A.senereOpphold)||[],tidligereOpphold:(f==null?void 0:f.tidligereOpphold)||[]}:void 0,erEndringssøknad:s,dekningsgrad:u==null?void 0:u.dekningsgrad,uttaksplan:D,vedlegg:[],tilleggsopplysninger:u==null?void 0:u.tilleggsopplysninger,ønskerJustertUttakVedFødsel:u==null?void 0:u.ønskerJustertUttakVedFødsel},eksisterendeSak:S,barnFraNesteSak:p,uttaksplanInfo:m,endringstidspunkt:u==null?void 0:u.endringstidspunkt,antallUkerIUttaksplan:u==null?void 0:u.antallUkerIUttaksplan,perioderSomSkalSendesInn:u==null?void 0:u.perioderSomSkalSendesInn,harUttaksplanBlittSlettet:u==null?void 0:u.harUttaksplanBlittSlettet,annenPartsUttakErLagtTilIPlan:u==null?void 0:u.annenPartsUttakErLagtTilIPlan};return b.storeAppState($,r)},js=(t,e,r,s,o)=>{const a=Ke(),d=Dt(),[i,N]=c.useState(!1),E=c.useRef();return c.useEffect(()=>{if(i){const k=R(d(l.APP_ROUTE));(async()=>{N(!1),await Us(t,d,e,r,s,o),a(k),E.current&&E.current()})().catch(f=>{f.response&&(f.response.status===401||f.response.status===403)?jt():(C(f),a(k)),E.current&&E.current()})}},[i]),c.useCallback(()=>(N(!0),new Promise(A=>{E.current=A})),[])},bs=t=>!!(t&&typeof t=="object"&&"isAxiosError"in t),xs=(t,e,r,s)=>{const o=Dt();return async d=>{const i=R(o(l.UTTAKSPLAN_METADATA)),N=R(o(l.OM_BARNET)),E=Dn(e,o,i.perioderSomSkalSendesInn,De(_t(N)),s,i.endringstidspunkt);if(E.uttaksplan.length===0&&E.erEndringssøknad)throw new Error("Søknaden din inneholder ingen nye perioder.");let O;try{O=(await b.sendSøknad(E,t,d)).data}catch(k){if(bs(k)){if(k.response&&(k.response.status===401||k.response.status===403)&&jt(),C(k),k.response&&k.response.status===400&&k.response.data&&k.response.data.messages&&k.response.data.messages.includes("Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg"))throw new Error(bt);const A=Mn(k),f=A!==Bn?A.slice(0,8):A;throw new Error(Ln+f)}throw new Error(String(k))}try{await b.deleteMellomlagretSøknad(t,d)}catch{}r(O)}},_s=(t,e,r,s)=>{const o=Ke(),a=Or();return c.useCallback(async()=>{Rr("applikasjon-hendelse",{app:"foreldrepengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),a(),e(!1),r(!1),s(void 0);try{await b.deleteMellomlagretSøknad(t)}catch{}o("/")},[t,o,a,e,r,s])},Rs=(t,e,r,s,o,a,d,i)=>!t||i===void 0?n.jsx(I,{path:"*",element:n.jsx(kt,{to:g.VELKOMMEN})}):r?e?n.jsxs(n.Fragment,{children:[n.jsx(I,{path:g.UTTAKSPLAN,element:n.jsx(ge,{søkerInfo:s,erEndringssøknad:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.OPPSUMMERING,element:n.jsx(gt,{erEndringssøknad:e,søkerInfo:s,sendSøknad:a,avbrytSøknad:d,mellomlagreSøknadOgNaviger:o})})]}):n.jsxs(n.Fragment,{children:[n.jsx(I,{path:g.SØKERSITUASJON,element:n.jsx(Wn,{kjønn:s.person.kjønn,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.OM_BARNET,element:n.jsx(Cn,{søkerInfo:s,søknadGjelderNyttBarn:i,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.ANNEN_FORELDER,element:n.jsx(Kn,{søkerInfo:s,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.UTTAKSPLAN_INFO,element:n.jsx(wn,{søkerInfo:s,erEndringssøknad:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.UTTAKSPLAN,element:n.jsx(ge,{søkerInfo:s,erEndringssøknad:e,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.UTENLANDSOPPHOLD,element:n.jsx(br,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.TIDLIGERE_UTENLANDSOPPHOLD,element:n.jsx(xr,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.SENERE_UTENLANDSOPPHOLD,element:n.jsx(_r,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.INNTEKTSINFORMASJON,element:n.jsx(Gn,{søkerInfo:s,mellomlagreSøknadOgNaviger:o,avbrytSøknad:d})}),n.jsx(I,{path:g.OPPSUMMERING,element:n.jsx(gt,{erEndringssøknad:e,søkerInfo:s,sendSøknad:a,avbrytSøknad:d,mellomlagreSøknadOgNaviger:o})})]}):n.jsx(I,{path:"*",element:n.jsx(kt,{to:g.IKKE_MYNDIG})}),Ds=({locale:t,onChangeLocale:e,currentRoute:r,søkerInfo:s,saker:o,lagretErEndringssøknad:a,lagretHarGodkjentVilkår:d,lagretSøknadGjelderNyttBarn:i,setKvittering:N})=>{const E=Ke(),O=On(),[k,A]=c.useState(!0),[f,u]=c.useState(d||!1),[p,S]=c.useState(a||!1),[D,m]=c.useState(i),$=xs(s.person.fnr,p,N,t),L=js(t,s.person.fnr,p,f,D),T=_s(s.person.fnr,S,u,m),P=j(l.UTTAKSPLAN),J=s.person.erMyndig;return c.useEffect(()=>{r&&J&&d&&k&&(A(!1),Os(r,d,P)?E(r):O.pathname===g.OPPSUMMERING&&E(g.UTTAKSPLAN))},[r,J,d,E,k,O.pathname,P]),n.jsxs(Un,{children:[n.jsx(I,{path:g.VELKOMMEN,element:n.jsx(Vn,{fornavn:s.person.fornavn,locale:t,saker:o,onChangeLocale:e,fnr:s.person.fnr,harGodkjentVilkår:f,søkerInfo:s,setHarGodkjentVilkår:u,setErEndringssøknad:S,setSøknadGjelderNyttBarn:m,mellomlagreSøknadOgNaviger:L})}),n.jsx(I,{path:g.IKKE_MYNDIG,element:n.jsx(An,{appnavn:"Foreldrepenger"})}),Rs(f,p,J,s,L,$,T,D)]})};try{ForeldrepengesknadRoutes.displayName="ForeldrepengesknadRoutes",ForeldrepengesknadRoutes.__docgenInfo={description:"",displayName:"ForeldrepengesknadRoutes",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}},currentRoute:{defaultValue:null,description:"",name:"currentRoute",required:!0,type:{name:"enum",value:[{value:'"/"'},{value:'"/soknad/sokersituasjon"'},{value:'"/soknad/om-barnet"'},{value:'"/soknad/annen-forelder"'},{value:'"/soknad/uttaksplan-info"'},{value:'"/soknad/uttaksplan"'},{value:'"/soknad/utenlandsopphold"'},{value:'"/soknad/tidligere-utenlandsopphold"'},{value:'"/soknad/senere-utenlandsopphold"'},{value:'"/soknad/inntektsinformasjon"'},{value:'"/soknad/manglende-vedlegg"'},{value:'"/soknad/oppsummering"'},{value:'"/soknad/soknad-sendt"'},{value:'"ikke-myndig"'}]}},søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!0,type:{name:"Søkerinfo"}},saker:{defaultValue:null,description:"",name:"saker",required:!0,type:{name:"Sak[]"}},lagretErEndringssøknad:{defaultValue:null,description:"",name:"lagretErEndringssøknad",required:!1,type:{name:"boolean"}},lagretHarGodkjentVilkår:{defaultValue:null,description:"",name:"lagretHarGodkjentVilkår",required:!1,type:{name:"boolean"}},lagretSøknadGjelderNyttBarn:{defaultValue:null,description:"",name:"lagretSøknadGjelderNyttBarn",required:!1,type:{name:"boolean"}},setKvittering:{defaultValue:null,description:"",name:"setKvittering",required:!0,type:{name:"(kvittering: Kvittering) => void"}}}}}catch{}const Ms=t=>{switch(t){case g.UTTAKSPLAN:case g.OPPSUMMERING:case g.SØKNAD_SENDT:return!0;default:return!1}},Bs=t=>t.søknad&&t.søknad.erEndringssøknad&&!Ms(t.currentRoute)?!1:t.version===5,Ls=t=>{const e=t.søknad;return{[l.APP_ROUTE]:t.currentRoute,[l.EKSISTERENDE_SAK]:t.eksisterendeSak,[l.BARN_FRA_NESTE_SAK]:t.barnFraNesteSak,[l.SØKERSITUASJON]:e==null?void 0:e.søkersituasjon,[l.OM_BARNET]:e==null?void 0:e.barn,[l.ANNEN_FORELDER]:e==null?void 0:e.annenForelder,[l.SØKER]:e==null?void 0:e.søker,[l.UTENLANDSOPPHOLD]:e!=null&&e.informasjonOmUtenlandsopphold?{iNorgeNeste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,iNorgeSiste12Mnd:e.informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}:void 0,[l.UTENLANDSOPPHOLD_SENERE]:e!=null&&e.informasjonOmUtenlandsopphold?{senereOpphold:e.informasjonOmUtenlandsopphold.senereOpphold}:void 0,[l.UTENLANDSOPPHOLD_TIDLIGERE]:e!=null&&e.informasjonOmUtenlandsopphold?{tidligereOpphold:e.informasjonOmUtenlandsopphold.tidligereOpphold}:void 0,[l.UTTAKSPLAN_INFO]:t.uttaksplanInfo,[l.UTTAKSPLAN]:e==null?void 0:e.uttaksplan,[l.UTTAKSPLAN_METADATA]:{dekningsgrad:e==null?void 0:e.dekningsgrad,tilleggsopplysninger:e==null?void 0:e.tilleggsopplysninger,ønskerJustertUttakVedFødsel:e==null?void 0:e.ønskerJustertUttakVedFødsel,perioderSomSkalSendesInn:t.perioderSomSkalSendesInn,antallUkerIUttaksplan:t.antallUkerIUttaksplan,harUttaksplanBlittSlettet:t.harUttaksplanBlittSlettet,annenPartsUttakErLagtTilIPlan:t.annenPartsUttakErLagtTilIPlan,endringstidspunkt:t.endringstidspunkt}}};class fe extends c.Component{constructor(e){super(e),this.state={hasError:!1,error:null}}componentDidCatch(e,r){e&&e.message!=="window.hasFocus is not a function"&&(this.setState({...this.state,hasError:!0,error:e}),vn(s=>{s.setExtras(r),Nn(e)}))}render(){var e;if(this.state.hasError){const r=!!this.state.error&&!!this.state.error.message&&this.state.error.message===bt,s=r?"Feil: for mange vedlegg":"Informasjon om feilen";return n.jsx(Mr,{dokumenttittel:"NAV Foreldrepengesøknad",ingress:`${(e=this.state.error)==null?void 0:e.message}`,tittel:s,søkerInfo:this.props.søkerInfo,illustrasjon:{tittel:"Hei!",tekst:"Noe har gått galt med søknaden.",lenke:{tekst:"Her finner du en lenke til brukerstøtte",url:Br.brukerstøtte}},skalKunneGåTilbakeTilSøknad:r})}return this.props.children}}try{fe.displayName="ErrorBoundary",fe.__docgenInfo={description:"",displayName:"ErrorBoundary",props:{søkerInfo:{defaultValue:null,description:"",name:"søkerInfo",required:!1,type:{name:"Søkerinfo"}}}}}catch{}const Pt=()=>n.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:n.jsx(Ut,{size:"2xlarge"})}),ws=({locale:t,onChangeLocale:e})=>{var f,u;const r=Ve();Tn(r.formatMessage({id:"søknad.pagetitle"}));const{søkerinfoData:s,søkerinfoError:o}=b.useSøkerinfo(),{sakerData:a,sakerError:d}=b.useGetSaker(),{storageData:i,storageStatus:N}=b.useStoredAppState(),[E,O]=c.useState();c.useEffect(()=>{if(o)throw C(o),new Error("Vi klarte ikke å hente informasjon om deg. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.");if(d)throw C(d),new Error("Vi klarte ikke å hente informasjon om sakene dine. Prøv igjen om noen minutter og hvis problemet vedvarer kontakt brukerstøtte.")},[o,d]);const k=c.useMemo(()=>i&&Bs(i)?Ls(i):void 0,[i]),A=c.useMemo(()=>s?Dr(s):void 0,[s]);return c.useEffect(()=>{var p,S,D,m;(S=(p=i==null?void 0:i.søknad)==null?void 0:p.søker)!=null&&S.språkkode&&i.søknad.søker.språkkode!==t&&e((m=(D=i.søknad)==null?void 0:D.søker)==null?void 0:m.språkkode)},[i]),E?Re.INNSYN?(gs(E.saksNr?`${Re.INNSYN}/sak/${E.saksNr}/redirectFromSoknad`:`${Re.INNSYN}/redirectFromSoknad`),n.jsx(Pt,{})):n.jsx("div",{children:"Redirected to Innsyn"}):!a||!A||N===H.IN_PROGRESS?n.jsx(Pt,{}):n.jsx(fe,{søkerInfo:A,children:n.jsx(Ur,{initialState:k,children:n.jsx(jn,{children:n.jsx(Ds,{locale:t,onChangeLocale:e,søkerInfo:A,saker:a.foreldrepenger,currentRoute:i?i.currentRoute:g.VELKOMMEN,lagretErEndringssøknad:(f=i==null?void 0:i.søknad)==null?void 0:f.erEndringssøknad,lagretHarGodkjentVilkår:(u=i==null?void 0:i.søknad)==null?void 0:u.harGodkjentVilkår,lagretSøknadGjelderNyttBarn:i==null?void 0:i.søknadGjelderEtNyttBarn,setKvittering:O})})})})};try{Foreldrepengesknad.displayName="Foreldrepengesknad",Foreldrepengesknad.__docgenInfo={description:"",displayName:"Foreldrepengesknad",props:{locale:{defaultValue:null,description:"",name:"locale",required:!0,type:{name:"enum",value:[{value:'"nb"'},{value:'"nn"'}]}},onChangeLocale:{defaultValue:null,description:"",name:"onChangeLocale",required:!0,type:{name:"(locale: LocaleNo) => void"}}}}}catch{}const Vs=()=>{const t=us();return t?t.name==="ie":!1},wt=es(),Ks={nb:{...Fn,...ct.nb},nn:{...In,...ct.nn}};B.locale(wt);const Gs=()=>{const[t,e]=c.useState(wt);return n.jsx(fe,{children:n.jsxs(Pn,{locale:t,messagesGroupedByLocale:Ks,children:[n.jsx(wr,{skalEndreNettleser:Vs()}),n.jsx(ws,{locale:t,onChangeLocale:r=>{ts(r),e(r),document.documentElement.setAttribute("lang",r)}})]})})},Vt=Gs,ua={title:"AppContainer",component:Vt},Cs=({søkerinfoData:t,sakerData:e,annenPartVedtakData:r,stønadskontoerData:s,storageKvitteringData:o})=>{const a=new un(Lr);return a.onGet("/sokerinfo").reply(200,t),a.onGet("/innsyn/v2/saker").reply(200,e),a.onGet("/innsyn/v2/annenPartVedtak").reply(200,r),a.onGet("/konto").reply(200,s),a.onGet("/storage/kvittering/foreldrepenger").reply(200,o),a.onPost("/storage/foreldrepenger").reply(200,{}),a.onPost("/soknad").reply(200,{}),a.onPost("/sendSøknadUrl").reply(200,{}),a.onDelete("/storage/foreldrepenger").reply(200,{}),n.jsx(Vt,{})},ee=Cs.bind({});ee.args={søkerinfoData:Kr,sakerData:qr,annenPartVedtakData:Jr,stønadskontoerData:Zr,storageKvitteringData:zr};var Ft,It,yt;ee.parameters={...ee.parameters,docs:{...(Ft=ee.parameters)==null?void 0:Ft.docs,source:{originalSource:`({
  søkerinfoData,
  sakerData,
  annenPartVedtakData,
  stønadskontoerData,
  storageKvitteringData
}) => {
  const apiMock = new MockAdapter(AxiosInstance);
  apiMock.onGet('/sokerinfo').reply(200, søkerinfoData);
  apiMock.onGet('/innsyn/v2/saker').reply(200, sakerData);
  apiMock.onGet('/innsyn/v2/annenPartVedtak').reply(200, annenPartVedtakData);
  apiMock.onGet('/konto').reply(200, stønadskontoerData);
  apiMock.onGet('/storage/kvittering/foreldrepenger').reply(200, storageKvitteringData);
  apiMock.onPost('/storage/foreldrepenger').reply(200, {});
  apiMock.onPost('/soknad').reply(200, {});
  apiMock.onPost('/sendSøknadUrl').reply(200, {});
  apiMock.onDelete('/storage/foreldrepenger').reply(200, {});
  return <AppContainer />;
}`,...(yt=(It=ee.parameters)==null?void 0:It.docs)==null?void 0:yt.source}}};const pa=["SøkerErMann"];export{ee as SøkerErMann,pa as __namedExportsOrder,ua as default};
