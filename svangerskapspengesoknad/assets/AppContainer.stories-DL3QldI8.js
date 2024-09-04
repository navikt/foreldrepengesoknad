var Me=Object.defineProperty;var Re=(e,n,r)=>n in e?Me(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var R=(e,n,r)=>Re(e,typeof n!="symbol"?n+"":n,r);import{l as Fe,ab as te,m as je,f as oe,a1 as De,j as t,ac as Pe,ad as _e,u as qe,ae as Oe,af as Ge,ag as Ce,ah as Ue,ai as Be,aj as Ve,i as Ke}from"./ByttBrowserModal-B0_Lz7to.js";import{S as He,M as Ye}from"./SkjemaSteg-Bgy7pqmR.js";/* empty css              */import{r as u,a as Je}from"./index-CTjT7uj6.js";import{a as $e,g as ae}from"./apiInterceptor-DfqAa4et.js";import{n as ze,u as ie,a as le,o as ge,f as pe,e as de,b as ce,c as Qe}from"./nn_NO-AB_rwtgx.js";import"./index-CYM-y3Gt.js";import{f as We,R as Xe,h as j,A as _,e as h,i as Ze,j as k,N as en}from"./useSvpNavigator-DoJmEIyW.js";import{n as S}from"./minMax-DvJ4k8UE.js";import{d as ue,e as nn,C as f,c as rn,a as v,S as sn}from"./routes-E6r3g9EM.js";import{N as tn}from"./EgenNæringPanel-CJ_lAXXV.js";import{g as on}from"./dateUtils-SvT5BRX6.js";import{m as an}from"./tilretteleggingUtils-BDeNJYbV.js";import{F as ln}from"./Forside-U-6eMY78.js";import{A as gn}from"./ArbeidIUtlandetStep-C9olH9ni.js";import{A as pn}from"./ArbeidsforholdOgInntektSteg-BwvV4y_P.js";import{B as dn}from"./Barnet-Dp1E5ncF.js";import{E as cn}from"./EgenNæringStep-iDGqlyNU.js";import{F as un}from"./FrilansStep-B-SIYUJD.js";import{O as mn}from"./Oppsummering-BoaSC9By.js";import{P as kn}from"./PerioderStep-qAQnsUvt.js";import{T as vn}from"./TilretteleggingStep-jPFWvsWX.js";import{U as fn}from"./UtenlandsoppholdSteg-BnDC7TBg.js";import{S as En}from"./SenereUtenlandsoppholdSteg-D0F_8Jom.js";import{T as bn}from"./TidligereUtenlandsoppholdSteg-CimeHsUb.js";import{V as yn}from"./VelgArbeid-v1C1NiaJ.js";import{I as Sn}from"./IkkeKvinne-B5U0GMF7.js";import"./index-BRV0Se7Z.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-B3cMAY3W.js";import"./ArbeidsforholdOgInntektPanel-r2ePJnk7.js";import"./ReadMore-BuABtR1D.js";import"./ExpansionCard-YAZjDaPK.js";import"./FrilansPanel-ClnpQ31W.js";import"./BoIUtlandetOppsummeringspunkt-MMMoBM6o.js";import"./ConfirmationPanel-BgkMr3VL.js";import"./Checkbox-EHX0GevH.js";import"./TidligereUtenlandsoppholdPanel-BdOWlS94.js";import"./Plus-CtC8jYXd.js";import"./_baseUniq-CD0pQQ78.js";import"./_overArg-BRHtLdyz.js";import"./EgenNæring-BaE2fK_g.js";import"./validationUtils-DUD17xhv.js";import"./velgArbeidFormUtils-CAKio3sC.js";import"./numberUtils-DCxWcr3S.js";const{Axios:Qr,AxiosError:Wr,CanceledError:Xr,isCancel:Zr,CancelToken:es,VERSION:ns,all:rs,Cancel:ss,isAxiosError:In,spread:ts,toFormData:os,AxiosHeaders:as,HttpStatusCode:is,formToJSON:ls,getAdapter:gs,mergeConfig:ps}=$e;class E extends Error{constructor(r,s,a){super(r);R(this,"callId");R(this,"timestamp");this.callId=s,this.timestamp=a}}class L extends Error{constructor(){super("API_ACCESS_ERROR")}}const Nn=e=>e instanceof L||e instanceof E,me=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),q=(e,n)=>{const[r,s]=u.useState(),[a,o]=u.useState(!1),[i,l]=u.useState();return u.useEffect(()=>{let d=!1;return(async()=>{var p,m;try{o(!0);const c=await e.get(n,{withCredentials:!0,timeout:60*1e3});d||s(c.data)}catch(c){In(c)?((p=c.response)==null?void 0:p.status)===401||((m=c.response)==null?void 0:m.status)===403?l(new L):l(new E(c.message)):c instanceof Error?l(new E(c.message)):l(new E(String(c)))}finally{o(!1)}})(),()=>{d=!0}},[e,n]),{data:r,loading:a,error:i}},O="ukjent uuid",ke=async(e,n,r,s,a=!1,o)=>{var i,l,d,g,p,m;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:o,headers:a?{"content-type":"application/json;"}:{}})).data}catch(c){if(me(c)&&c.code!=="ERR_CANCELED"){if(((i=c.response)==null?void 0:i.status)===401||((l=c.response)==null?void 0:l.status)===403)throw new L;const x=(g=(d=c.response)==null?void 0:d.data)!=null&&g.uuid?c.response.data.uuid:O,we=x!==O?x.slice(0,8):x;throw new E(s+we,x,(m=(p=c.response)==null?void 0:p.data)==null?void 0:m.timestamp)}throw c instanceof Error?new E(c.message):new E(String(c))}},G="ukjent uuid",w=async(e,n,r,s,a)=>{var o,i,l,d;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:a,data:s})).data}catch(g){if(me(g)&&g.code!=="ERR_CANCELED"){if(((o=g.response)==null?void 0:o.status)===401||((i=g.response)==null?void 0:i.status)===403)throw new L;const p=(d=(l=g.response)==null?void 0:l.data)!=null&&d.uuid?g.response.data.uuid:G,m=p!==G?p.slice(0,8):p;throw new E(r+m)}throw g instanceof Error?new E(g.message):new E(String(g))}};var ve=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ve||{});const An="From {fom} until {tom}",Tn={tidsperiode:An,"tidsperiode.kort":"{fom} - {tom}"},hn="Fra {fom} til {tom}",xn={tidsperiode:hn,"tidsperiode.kort":"{fom} - {tom}"},Ln="Frå {fom} til {tom}",wn={tidsperiode:Ln,"tidsperiode.kort":"{fom} - {tom}"},Mn=e=>{window.location.href=e},fe="selectedLocale",Rn=()=>sessionStorage.getItem(fe)||"nb",Fn=e=>{sessionStorage.setItem(fe,e)},Ee={nb:xn,nn:wn,en:Tn};/**
 * React Router DOM v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const jn="6";try{window.__reactRouterVersion=jn}catch{}const Dn="startTransition",C=Je[Dn];function Pn(e){let{basename:n,children:r,future:s,window:a}=e,o=u.useRef();o.current==null&&(o.current=We({window:a,v5Compat:!0}));let i=o.current,[l,d]=u.useState({action:i.action,location:i.location}),{v7_startTransition:g}=s||{},p=u.useCallback(m=>{g&&C?C(()=>d(m)):d(m)},[d,g]);return u.useLayoutEffect(()=>i.listen(p),[i,p]),u.createElement(Xe,{basename:n,children:r,location:l.location,navigationType:l.action,navigator:i,future:s})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var B;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(B||(B={}));const _n=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},F=_n(),qn=(e,n)=>{const r=j(),s=ue();return u.useCallback(async()=>{Fe("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),n(!1);try{await w(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,s,e])},be=2,V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",On=(e,n,r)=>{const s=j(),a=nn(),o=ue(),[i,l]=u.useState(!1),d=u.useRef();return u.useEffect(()=>{i&&(async()=>{l(!1);const m=a[f.APP_ROUTE];m?(s(m),await ke(e,"/rest/storage/svangerskapspenger",{version:be,locale:n,...a},V)):(r(!1),o(),s("/"),await w(e,"/rest/storage/svangerskapspenger",V)),d.current&&d.current()})().catch(m=>{te(m.message),d.current&&d.current()})},[i]),u.useCallback(()=>(l(!0),new Promise(m=>{d.current=m})),[])};var ye=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(ye||{}),Se=(e=>(e.MOR="mor",e))(Se||{}),Ie=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Ie||{});const Ne=e=>e.arbeidsforhold.type===_.FRILANSER||e.arbeidsforhold.type===_.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},K=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),Gn=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(K),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(K)}),Cn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),Un=(e,n)=>({type:h.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Bn=(e,n)=>({type:h.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),Vn=(e,n)=>({type:h.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Kn=e=>{const n=Ne(e);return e.type===h.HEL?Un(e,n):e.type===h.DELVIS?Bn(e,n):Vn(e,n)},Hn=e=>e.map(n=>Kn(n)),Yn=e=>je(e)?oe(e).startOf("day").isAfter(De,"day"):!0,Jn=e=>{if(e){const n=e.næringstype===tn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=Yn(e.fomDato),s={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},$n=e=>({type:ye.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),zn=(e,n,r,s,a)=>{const o=Jn(r),i=a?a.arbeidIUtlandet.map(d=>$n(d)):void 0;return{rolle:Se.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?s:void 0,selvstendigNæringsdrivendeInformasjon:o?[o]:void 0,andreInntekterSiste10Mnd:i}},Qn=e=>e.map(r=>{const s=Ne(r);return r.vedlegg.map(o=>({...o,dokumenterer:{type:ve.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),Wn=(e,n)=>{const r=Gn(S(e(f.UTENLANDSOPPHOLD)),e(f.UTENLANDSOPPHOLD_SENERE),e(f.UTENLANDSOPPHOLD_TIDLIGERE)),s=S(e(f.OM_BARNET)),a=S(e(f.TILRETTELEGGINGER)),o=Cn(s),i=Qn(a),l=zn(n,S(e(f.ARBEIDSFORHOLD_OG_INNTEKT)),e(f.EGEN_NÆRING),e(f.FRILANS),e(f.ARBEID_I_UTLANDET)),d=on(s),g=an(a,d),p=Hn(g);return{type:Ie.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:o,vedlegg:i,tilrettelegging:p,søker:l}},H="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Xn=(e,n,r)=>{const s=rn(),[a,o]=u.useState(),i=u.useCallback(async l=>{const d=Wn(s,r);let g;try{g=await ke(e,"/rest/soknad",d,H,!0,l)}catch(p){if(Nn(p))p instanceof E&&te(p.message),o(p);else throw new Error("SendSøknad - This should never happen")}if(g){try{await w(e,"/rest/storage/svangerskapspenger",H,l)}catch{}n(g)}},[s,n,r,e]);return u.useMemo(()=>({sendSøknad:i,errorSendSøknad:a}),[i,a])},D=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(Pe,{size:"2xlarge"})}),b=ae(),P=({error:e})=>t.jsx(_e,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),Zn=(e,n,r,s,a)=>e?t.jsxs(t.Fragment,{children:[t.jsx(k,{path:v.BARNET,element:t.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.UTENLANDSOPPHOLD,element:t.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.HAR_BODD_I_UTLANDET,element:t.jsx(bn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKAL_BO_I_UTLANDET,element:t.jsx(En,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.INNTEKTSINFORMASJON,element:t.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.FRILANS,element:t.jsx(un,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.NÆRING,element:t.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.ARBEID_I_UTLANDET,element:t.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.VELG_ARBEID,element:t.jsx(yn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKJEMA,element:t.jsx(He,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.TILRETTELEGGING,element:t.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.PERIODER,element:t.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.OPPSUMMERING,element:t.jsx(mn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s,sendSøknad:a})})]}):t.jsx(k,{path:"*",element:t.jsx(en,{to:v.FORSIDE})}),Ae=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:s})=>{const a=j(),[o,i]=u.useState(!1),[l,d]=u.useState(),{sendSøknad:g,errorSendSøknad:p}=Xn(b,d,n),m=On(b,n,i),c=qn(b,i);return u.useEffect(()=>{s!=null&&s[f.APP_ROUTE]&&(i(!0),s.locale&&r(s.locale),a(s[f.APP_ROUTE]))},[s]),l?F.INNSYN?(Mn(l.saksNr?`${F.INNSYN}/sak/${l.saksNr}/redirectFromSoknad`:`${F.INNSYN}/redirectFromSoknad`),t.jsx(D,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p?t.jsx(P,{error:p}):t.jsxs(Ze,{children:[t.jsx(k,{path:v.FORSIDE,element:t.jsx(ln,{mellomlagreSøknadOgNaviger:m,setHarGodkjentVilkår:i,harGodkjentVilkår:o,locale:n,onChangeLocale:r})}),Zn(o,e,m,c,g)]})};D.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ae.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
    [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]?: ArbeidsforholdOgInntektSvp;
    [ContextDataType.FRILANS]?: Frilans;
    [ContextDataType.ARBEID_I_UTLANDET]?: ArbeidIUtlandet;
    [ContextDataType.EGEN_NÆRING]?: EgenNæring;
    [ContextDataType.TILRETTELEGGINGER]?: Tilrettelegging[];
    [ContextDataType.VALGT_TILRETTELEGGING_ID]?: string;
}`,signature:{properties:[]}}]},description:""}}};const Te=({locale:e,onChangeLocale:n})=>{const r=qe();Oe(r.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:a}=q(b,"/rest/sokerinfo"),{data:o,loading:i,error:l}=q(b,"/rest/storage/svangerskapspenger");if(a||l)return t.jsx(P,{error:S(a||l)});if(!s||i)return t.jsx(D,{});if(!(s.søker.kjønn==="K"))return t.jsx(Sn,{});const g=Ge(s.søker.fødselsdato),p=(o==null?void 0:o.version)===be?o:void 0;return t.jsx("div",{children:g?t.jsx(Pn,{children:t.jsx(sn,{initialState:p,children:t.jsx(Ae,{locale:e,onChangeLocale:n,søkerInfo:s,mellomlagretData:p})})}):t.jsx(Ce,{appnavn:"Svangerskapspenger"})})};Te.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const er={...ze,...ie.nb,...le.nb,...ge.nb,...Ee.nb,...pe.nb,...de.nb,...ce.nb},nr={...Qe,...ie.nn,...le.nn,...ge.nn,...Ee.nn,...pe.nn,...de.nn,...ce.nn},he=Rn(),rr={nb:er,nn:nr};oe.locale(he);const sr=async()=>{try{await w(b,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},xe=()=>{const[e,n]=u.useState(he);return t.jsx(Ue,{locale:e,messagesGroupedByLocale:rr,children:t.jsxs(Be,{appName:"Svangerskapspenger",retryCallback:sr,children:[t.jsx(Ve,{}),t.jsx(Te,{locale:e,onChangeLocale:r=>{Fn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Le=xe;xe.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const y={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},ds={title:"AppContainer",component:Le},M=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Ke();const s=new Ye(ae());return s.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),s.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(Le,{})},I=M.bind({});I.args={søkerinfo:y};const N=M.bind({});N.args={søkerinfo:{...y,arbeidsforhold:[]}};const A=M.bind({});A.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"M"}}};const T=M.bind({});T.args={søkerinfo:{...y,søker:{...y.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,J,$;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...($=(J=I.parameters)==null?void 0:J.docs)==null?void 0:$.source}}};var z,Q,W;N.parameters={...N.parameters,docs:{...(z=N.parameters)==null?void 0:z.docs,source:{originalSource:`({
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
}`,...(W=(Q=N.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,ee;A.parameters={...A.parameters,docs:{...(X=A.parameters)==null?void 0:X.docs,source:{originalSource:`({
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
}`,...(ee=(Z=A.parameters)==null?void 0:Z.docs)==null?void 0:ee.source}}};var ne,re,se;T.parameters={...T.parameters,docs:{...(ne=T.parameters)==null?void 0:ne.docs,source:{originalSource:`({
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
}`,...(se=(re=T.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const cs=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,A as VisAppMann,T as VisAppUmyndig,cs as __namedExportsOrder,ds as default};
