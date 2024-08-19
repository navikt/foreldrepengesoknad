var we=Object.defineProperty;var Fe=(e,n,r)=>n in e?we(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var M=(e,n,r)=>Fe(e,typeof n!="symbol"?n+"":n,r);import{j as t}from"./tslib.es6-C_-gbNBy.js";import{S as Me,M as je}from"./SkjemaSteg-DtEVVuCf.js";/* empty css              */import{r as u,a as Re}from"./index-CTjT7uj6.js";import{a as De,g as te}from"./apiInterceptor-D9XpNqGK.js";import{l as Pe,aa as oe,k as _e,f as ae,a0 as qe,ab as Oe,ac as Ge,u as Ce,ad as Ue,ae as Be,af as Ve,ag as Ke,ah as He,ai as Ye,i as Je}from"./ByttBrowserModal-BPMC3PEp.js";import{n as $e,u as ie,a as le,o as ge,f as pe,e as de,b as ze}from"./nn_NO-0-Q_CVVM.js";import"./index-9r8iugjR.js";import{f as Qe,R as We,h as R,A as _,d as h,i as Xe,j as k,N as Ze}from"./useSvpNavigator-cZk11U8c.js";import{n as S}from"./dateFormValidation-V1ks7W7B.js";import{d as ce,e as en,C as f,c as nn,a as v,S as rn}from"./routes-BKH065He.js";import{N as sn}from"./EgenNæringPanel-BRpvtcj-.js";import{g as tn}from"./dateUtils-CxTeSXQs.js";import{m as on}from"./tilretteleggingUtils-DiBrZ8KD.js";import{F as an}from"./Forside-DIL_MDEm.js";import{A as ln}from"./ArbeidIUtlandetStep-CXdUBUdl.js";import{B as gn}from"./Barnet-DOw55wGt.js";import{E as pn}from"./EgenNæringStep-CDfxVTXn.js";import{F as dn}from"./FrilansStep-IXEVkONO.js";import{I as cn}from"./InntektsinformasjonSteg-DgBAXeGW.js";import{O as un}from"./Oppsummering-CbPHOl5h.js";import{P as mn}from"./PerioderStep-rIVJNa7x.js";import{T as kn}from"./TilretteleggingStep-9VLWnt1L.js";import{U as vn}from"./UtenlandsoppholdSteg-B6oLxlun.js";import{S as fn}from"./SenereUtenlandsoppholdSteg-CsFMm4OK.js";import{T as En}from"./TidligereUtenlandsoppholdSteg-BUmBI23l.js";import{V as yn}from"./VelgArbeid-BlpQaA67.js";import{I as bn}from"./IkkeKvinne-B03ssKUt.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-DS2ZK60u.js";import"./index-BRV0Se7Z.js";import"./BoIUtlandetOppsummeringspunkt-DZZ8MvOR.js";import"./ConfirmationPanel-BrAGdW6L.js";import"./Checkbox-CO1sZ1Ja.js";import"./FrilansPanel-DbYZZiAK.js";import"./TidligereUtenlandsoppholdPanel-BHvwvsyq.js";import"./ExpansionCard-CAduI23o.js";import"./Plus-CBf9aGuI.js";import"./_baseIteratee-BgXxtZRV.js";import"./_baseUniq-IUta85de.js";import"./ReadMore-CTYHN1eQ.js";import"./EgenNæring-BaE2fK_g.js";import"./validationUtils-XmP4dt29.js";import"./velgArbeidFormUtils-GSEWz77T.js";import"./numberUtils-DCxWcr3S.js";const{Axios:zr,AxiosError:Qr,CanceledError:Wr,isCancel:Xr,CancelToken:Zr,VERSION:es,all:ns,Cancel:rs,isAxiosError:Sn,spread:ss,toFormData:ts,AxiosHeaders:os,HttpStatusCode:as,formToJSON:is,getAdapter:ls,mergeConfig:gs}=De;class E extends Error{constructor(r,s,a){super(r);M(this,"callId");M(this,"timestamp");this.callId=s,this.timestamp=a}}class L extends Error{constructor(){super("API_ACCESS_ERROR")}}const In=e=>e instanceof L||e instanceof E,ue=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),q=(e,n)=>{const[r,s]=u.useState(),[a,o]=u.useState(!1),[i,l]=u.useState();return u.useEffect(()=>{let d=!1;return(async()=>{var p,m;try{o(!0);const c=await e.get(n,{withCredentials:!0,timeout:60*1e3});d||s(c.data)}catch(c){Sn(c)?((p=c.response)==null?void 0:p.status)===401||((m=c.response)==null?void 0:m.status)===403?l(new L):l(new E(c.message)):c instanceof Error?l(new E(c.message)):l(new E(String(c)))}finally{o(!1)}})(),()=>{d=!0}},[e,n]),{data:r,loading:a,error:i}},O="ukjent uuid",me=async(e,n,r,s,a=!1,o)=>{var i,l,d,g,p,m;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:o,headers:a?{"content-type":"application/json;"}:{}})).data}catch(c){if(ue(c)&&c.code!=="ERR_CANCELED"){if(((i=c.response)==null?void 0:i.status)===401||((l=c.response)==null?void 0:l.status)===403)throw new L;const x=(g=(d=c.response)==null?void 0:d.data)!=null&&g.uuid?c.response.data.uuid:O,Le=x!==O?x.slice(0,8):x;throw new E(s+Le,x,(m=(p=c.response)==null?void 0:p.data)==null?void 0:m.timestamp)}throw c instanceof Error?new E(c.message):new E(String(c))}},G="ukjent uuid",w=async(e,n,r,s,a)=>{var o,i,l,d;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:a,data:s})).data}catch(g){if(ue(g)&&g.code!=="ERR_CANCELED"){if(((o=g.response)==null?void 0:o.status)===401||((i=g.response)==null?void 0:i.status)===403)throw new L;const p=(d=(l=g.response)==null?void 0:l.data)!=null&&d.uuid?g.response.data.uuid:G,m=p!==G?p.slice(0,8):p;throw new E(r+m)}throw g instanceof Error?new E(g.message):new E(String(g))}},Nn="From {fom} until {tom}",An={tidsperiode:Nn,"tidsperiode.kort":"{fom} - {tom}"},Tn="Fra {fom} til {tom}",hn={tidsperiode:Tn,"tidsperiode.kort":"{fom} - {tom}"},xn="Frå {fom} til {tom}",Ln={tidsperiode:xn,"tidsperiode.kort":"{fom} - {tom}"},wn=e=>{window.location.href=e};var ke=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ke||{});const ve="selectedLocale",Fn=()=>sessionStorage.getItem(ve)||"nb",Mn=e=>{sessionStorage.setItem(ve,e)},fe={nb:hn,nn:Ln,en:An};/**
 * React Router DOM v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const jn="6";try{window.__reactRouterVersion=jn}catch{}const Rn="startTransition",C=Re[Rn];function Dn(e){let{basename:n,children:r,future:s,window:a}=e,o=u.useRef();o.current==null&&(o.current=Qe({window:a,v5Compat:!0}));let i=o.current,[l,d]=u.useState({action:i.action,location:i.location}),{v7_startTransition:g}=s||{},p=u.useCallback(m=>{g&&C?C(()=>d(m)):d(m)},[d,g]);return u.useLayoutEffect(()=>i.listen(p),[i,p]),u.createElement(We,{basename:n,children:r,location:l.location,navigationType:l.action,navigator:i,future:s})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var B;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(B||(B={}));const Pn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},j=Pn(),_n=(e,n)=>{const r=R(),s=ce();return u.useCallback(async()=>{Pe("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),n(!1);try{await w(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,s,e])},Ee=2,V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",qn=(e,n,r)=>{const s=R(),a=en(),o=ce(),[i,l]=u.useState(!1),d=u.useRef();return u.useEffect(()=>{i&&(async()=>{l(!1);const m=a[f.APP_ROUTE];m?(s(m),await me(e,"/rest/storage/svangerskapspenger",{version:Ee,locale:n,...a},V)):(r(!1),o(),s("/"),await w(e,"/rest/storage/svangerskapspenger",V)),d.current&&d.current()})().catch(m=>{oe(m.message),d.current&&d.current()})},[i]),u.useCallback(()=>(l(!0),new Promise(m=>{d.current=m})),[])};var ye=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(ye||{}),be=(e=>(e.MOR="mor",e))(be||{}),Se=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(Se||{});const Ie=e=>e.arbeidsforhold.type===_.FRILANSER||e.arbeidsforhold.type===_.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},K=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),On=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(K),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(K)}),Gn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),Cn=(e,n)=>({type:h.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Un=(e,n)=>({type:h.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),Bn=(e,n)=>({type:h.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Vn=e=>{const n=Ie(e);return e.type===h.HEL?Cn(e,n):e.type===h.DELVIS?Un(e,n):Bn(e,n)},Kn=e=>e.map(n=>Vn(n)),Hn=e=>_e(e)?ae(e).startOf("day").isAfter(qe,"day"):!0,Yn=e=>{if(e){const n=e.næringstype===sn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=Hn(e.fomDato),s={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},Jn=e=>({type:ye.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),$n=(e,n,r,s,a)=>{const o=Yn(r),i=a?a.arbeidIUtlandet.map(d=>Jn(d)):void 0;return{rolle:be.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?s:void 0,selvstendigNæringsdrivendeInformasjon:o?[o]:void 0,andreInntekterSiste10Mnd:i}},zn=e=>e.map(r=>{const s=Ie(r);return r.vedlegg.map(o=>({...o,dokumenterer:{type:ke.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),Qn=(e,n)=>{const r=On(S(e(f.UTENLANDSOPPHOLD)),e(f.UTENLANDSOPPHOLD_SENERE),e(f.UTENLANDSOPPHOLD_TIDLIGERE)),s=S(e(f.OM_BARNET)),a=S(e(f.TILRETTELEGGINGER)),o=Gn(s),i=zn(a),l=$n(n,S(e(f.INNTEKTSINFORMASJON)),e(f.EGEN_NÆRING),e(f.FRILANS),e(f.ARBEID_I_UTLANDET)),d=tn(s),g=on(a,d),p=Kn(g);return{type:Se.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:o,vedlegg:i,tilrettelegging:p,søker:l}},H="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Wn=(e,n,r)=>{const s=nn(),[a,o]=u.useState(),i=u.useCallback(async l=>{const d=Qn(s,r);let g;try{g=await me(e,"/rest/soknad",d,H,!0,l)}catch(p){if(In(p))p instanceof E&&oe(p.message),o(p);else throw new Error("SendSøknad - This should never happen")}if(g){try{await w(e,"/rest/storage/svangerskapspenger",H,l)}catch{}n(g)}},[s,n,r,e]);return u.useMemo(()=>({sendSøknad:i,errorSendSøknad:a}),[i,a])},D=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(Oe,{size:"2xlarge"})}),y=te(),P=({error:e})=>t.jsx(Ge,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),Xn=(e,n,r,s,a)=>e?t.jsxs(t.Fragment,{children:[t.jsx(k,{path:v.BARNET,element:t.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.UTENLANDSOPPHOLD,element:t.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.HAR_BODD_I_UTLANDET,element:t.jsx(En,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKAL_BO_I_UTLANDET,element:t.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.INNTEKTSINFORMASJON,element:t.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.FRILANS,element:t.jsx(dn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.NÆRING,element:t.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.ARBEID_I_UTLANDET,element:t.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.VELG_ARBEID,element:t.jsx(yn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKJEMA,element:t.jsx(Me,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.TILRETTELEGGING,element:t.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.PERIODER,element:t.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.OPPSUMMERING,element:t.jsx(un,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s,sendSøknad:a})})]}):t.jsx(k,{path:"*",element:t.jsx(Ze,{to:v.FORSIDE})}),Ne=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:s})=>{const a=R(),[o,i]=u.useState(!1),[l,d]=u.useState(),{sendSøknad:g,errorSendSøknad:p}=Wn(y,d,n),m=qn(y,n,i),c=_n(y,i);return u.useEffect(()=>{s!=null&&s[f.APP_ROUTE]&&(i(!0),s.locale&&r(s.locale),a(s[f.APP_ROUTE]))},[s]),l?j.INNSYN?(wn(l.saksNr?`${j.INNSYN}/sak/${l.saksNr}/redirectFromSoknad`:`${j.INNSYN}/redirectFromSoknad`),t.jsx(D,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p?t.jsx(P,{error:p}):t.jsxs(Xe,{children:[t.jsx(k,{path:v.FORSIDE,element:t.jsx(an,{mellomlagreSøknadOgNaviger:m,setHarGodkjentVilkår:i,harGodkjentVilkår:o,locale:n,onChangeLocale:r})}),Xn(o,e,m,c,g)]})};D.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};Ne.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ae=({locale:e,onChangeLocale:n})=>{const r=Ce();Ue(r.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:a}=q(y,"/rest/sokerinfo"),{data:o,loading:i,error:l}=q(y,"/rest/storage/svangerskapspenger");if(a||l)return t.jsx(P,{error:S(a||l)});if(!s||i)return t.jsx(D,{});if(!(s.søker.kjønn==="K"))return t.jsx(bn,{});const g=Be(s.søker.fødselsdato),p=(o==null?void 0:o.version)===Ee?o:void 0;return t.jsx("div",{children:g?t.jsx(Dn,{children:t.jsx(rn,{initialState:p,children:t.jsx(Ne,{locale:e,onChangeLocale:n,søkerInfo:s,mellomlagretData:p})})}):t.jsx(Ve,{appnavn:"Svangerskapspenger"})})};Ae.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const Zn={...$e,...ie.nb,...le.nb,...ge.nb,...fe.nb,...pe.nb,...de.nb},er={...ze,...ie.nn,...le.nn,...ge.nn,...fe.nn,...pe.nn,...de.nn},Te=Fn(),nr={nb:Zn,nn:er};ae.locale(Te);const rr=async()=>{try{await w(y,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},he=()=>{const[e,n]=u.useState(Te);return t.jsx(Ke,{locale:e,messagesGroupedByLocale:nr,children:t.jsxs(He,{appName:"Svangerskapspenger",retryCallback:rr,children:[t.jsx(Ye,{}),t.jsx(Ae,{locale:e,onChangeLocale:r=>{Mn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},xe=he;he.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const b={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},ps={title:"AppContainer",component:xe},F=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{Je();const s=new je(te());return s.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),s.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(xe,{})},I=F.bind({});I.args={søkerinfo:b};const N=F.bind({});N.args={søkerinfo:{...b,arbeidsforhold:[]}};const A=F.bind({});A.args={søkerinfo:{...b,søker:{...b.søker,kjønn:"M"}}};const T=F.bind({});T.args={søkerinfo:{...b,søker:{...b.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,J,$;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(se=(re=T.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const ds=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,A as VisAppMann,T as VisAppUmyndig,ds as __namedExportsOrder,ps as default};
