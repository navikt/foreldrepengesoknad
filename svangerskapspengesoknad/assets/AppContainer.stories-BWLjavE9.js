var xe=Object.defineProperty;var Le=(e,n,r)=>n in e?xe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[n]=r;var j=(e,n,r)=>Le(e,typeof n!="symbol"?n+"":n,r);import{j as t}from"./tslib.es6-C_-gbNBy.js";import{S as we,M as Fe}from"./SkjemaSteg-B_LSdODf.js";/* empty css              */import{r as u,a as je}from"./index-CTjT7uj6.js";import{a as Me,g as te}from"./apiInterceptor-D9XpNqGK.js";import{l as Re,ad as oe,j as De,e as ae,a2 as Pe,ae as _e,af as qe,u as Oe,ag as Ge,ah as Ce,ai as Ue,aj as Be,ak as Ve,al as Ke,i as He}from"./ByttBrowserModal-iiEVx-55.js";import{n as Ye,u as ie,a as le,o as ge,b as Je}from"./nn_NO-DpKyrjDx.js";import"./index-9r8iugjR.js";import{h as $e,R as ze,i as R,n as b,A as _,d as h,j as Qe,k,N as We}from"./useSvpNavigator-Bmm3IUMq.js";import"./dateFormValidation-BKcBHHfi.js";import{d as pe,e as Xe,C as f,c as Ze,a as v,S as en}from"./routes-BKH065He.js";import{N as nn}from"./EgenNæring-DdBVG6ty.js";import{g as rn}from"./dateUtils-DZlRV5Rq.js";import{m as sn}from"./tilretteleggingUtils-CqFI2rNp.js";import{F as tn}from"./Forside-BonWGfu9.js";import{A as on}from"./ArbeidIUtlandetStep-BdAFiAHa.js";import{B as an}from"./Barnet-CVTDVf9m.js";import{E as ln}from"./EgenNæringStep-Dl9eCJ05.js";import{F as gn}from"./FrilansStep-DCAk2idQ.js";import{I as pn}from"./InntektsinformasjonSteg-Dyu3EC9m.js";import{O as dn}from"./Oppsummering-Cw-JRH2p.js";import{P as cn}from"./PerioderStep-CBxe5qnq.js";import{T as un}from"./TilretteleggingStep-DrS5ZB4k.js";import{U as mn}from"./UtenlandsoppholdSteg-iw7YOpgy.js";import{S as kn}from"./SenereUtenlandsoppholdSteg-2aAYnenC.js";import{T as vn}from"./TidligereUtenlandsoppholdSteg-DKqlbZ5P.js";import{V as fn}from"./VelgArbeid-DUgT_8Kt.js";import{I as En}from"./IkkeKvinne--AmbK4Hx.js";import"./ErrorSummaryHookForm-DTQrR26r.js";import"./Checkbox-CH-QuQDz.js";import"./attachmentType-CO8SwnHI.js";import"./Bedriftsbanner-Bh0MiAg-.js";import"./index-BRV0Se7Z.js";import"./BoIUtlandetOppsummeringspunkt-wrS9N1aq.js";import"./ConfirmationPanel-BucZPzpp.js";import"./TidligereUtenlandsoppholdPanel-3M6rkG8y.js";import"./ExpansionCard-ulREdaYC.js";import"./Plus-DbEtL_IK.js";import"./_baseIteratee-Dyzk-1k8.js";import"./_baseUniq-DYqiuyAy.js";import"./Frilans-B_RcwIAw.js";import"./validationUtils-Ipqx8FzI.js";import"./ReadMore-Buh9l1h-.js";import"./velgArbeidFormUtils-NVEofYxq.js";import"./numberUtils-DCxWcr3S.js";const{Axios:Jr,AxiosError:$r,CanceledError:zr,isCancel:Qr,CancelToken:Wr,VERSION:Xr,all:Zr,Cancel:es,isAxiosError:yn,spread:ns,toFormData:rs,AxiosHeaders:ss,HttpStatusCode:ts,formToJSON:os,getAdapter:as,mergeConfig:is}=Me;class E extends Error{constructor(r,s,a){super(r);j(this,"callId");j(this,"timestamp");this.callId=s,this.timestamp=a}}class L extends Error{constructor(){super("API_ACCESS_ERROR")}}const Sn=e=>e instanceof L||e instanceof E,de=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),q=(e,n)=>{const[r,s]=u.useState(),[a,o]=u.useState(!1),[i,l]=u.useState();return u.useEffect(()=>{let d=!1;return(async()=>{var p,m;try{o(!0);const c=await e.get(n,{withCredentials:!0,timeout:60*1e3});d||s(c.data)}catch(c){yn(c)?((p=c.response)==null?void 0:p.status)===401||((m=c.response)==null?void 0:m.status)===403?l(new L):l(new E(c.message)):c instanceof Error?l(new E(c.message)):l(new E(String(c)))}finally{o(!1)}})(),()=>{d=!0}},[e,n]),{data:r,loading:a,error:i}},O="ukjent uuid",ce=async(e,n,r,s,a=!1,o)=>{var i,l,d,g,p,m;try{return(await e.post(n,r,{withCredentials:!0,timeout:6e4,signal:o,headers:a?{"content-type":"application/json;"}:{}})).data}catch(c){if(de(c)&&c.code!=="ERR_CANCELED"){if(((i=c.response)==null?void 0:i.status)===401||((l=c.response)==null?void 0:l.status)===403)throw new L;const x=(g=(d=c.response)==null?void 0:d.data)!=null&&g.uuid?c.response.data.uuid:O,he=x!==O?x.slice(0,8):x;throw new E(s+he,x,(m=(p=c.response)==null?void 0:p.data)==null?void 0:m.timestamp)}throw c instanceof Error?new E(c.message):new E(String(c))}},G="ukjent uuid",w=async(e,n,r,s,a)=>{var o,i,l,d;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:a,data:s})).data}catch(g){if(de(g)&&g.code!=="ERR_CANCELED"){if(((o=g.response)==null?void 0:o.status)===401||((i=g.response)==null?void 0:i.status)===403)throw new L;const p=(d=(l=g.response)==null?void 0:l.data)!=null&&d.uuid?g.response.data.uuid:G,m=p!==G?p.slice(0,8):p;throw new E(r+m)}throw g instanceof Error?new E(g.message):new E(String(g))}},bn="From {fom} until {tom}",In={tidsperiode:bn,"tidsperiode.kort":"{fom} - {tom}"},Nn="Fra {fom} til {tom}",An={tidsperiode:Nn,"tidsperiode.kort":"{fom} - {tom}"},Tn="Frå {fom} til {tom}",hn={tidsperiode:Tn,"tidsperiode.kort":"{fom} - {tom}"},xn=e=>{window.location.href=e};var ue=(e=>(e.BARN="BARN",e.OPPTJENING="OPPTJENING",e.TILRETTELEGGING="TILRETTELEGGING",e.UTTAK="UTTAK",e))(ue||{});const me="selectedLocale",Ln=()=>sessionStorage.getItem(me)||"nb",wn=e=>{sessionStorage.setItem(me,e)},ke={nb:An,nn:hn,en:In};/**
 * React Router DOM v6.26.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Fn="6";try{window.__reactRouterVersion=Fn}catch{}const jn="startTransition",C=je[jn];function Mn(e){let{basename:n,children:r,future:s,window:a}=e,o=u.useRef();o.current==null&&(o.current=$e({window:a,v5Compat:!0}));let i=o.current,[l,d]=u.useState({action:i.action,location:i.location}),{v7_startTransition:g}=s||{},p=u.useCallback(m=>{g&&C?C(()=>d(m)):d(m)},[d,g]);return u.useLayoutEffect(()=>i.listen(p),[i,p]),u.createElement(ze,{basename:n,children:r,location:l.location,navigationType:l.action,navigator:i,future:s})}var U;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(U||(U={}));var B;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(B||(B={}));const Rn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{LOG_VALIDATION:n.LOG_VALIDATION,INNSYN:n.INNSYN}},M=Rn(),Dn=(e,n)=>{const r=R(),s=pe();return u.useCallback(async()=>{Re("applikasjon-hendelse",{app:"svangerskapspengesoknad",team:"foreldrepenger",hendelse:"avbrutt"}),s(),n(!1);try{await w(e,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}r("/")},[r,n,s,e])},ve=2,V="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",Pn=(e,n,r)=>{const s=R(),a=Xe(),o=pe(),[i,l]=u.useState(!1),d=u.useRef();return u.useEffect(()=>{i&&(async()=>{l(!1);const m=a[f.APP_ROUTE];m?(s(m),await ce(e,"/rest/storage/svangerskapspenger",{version:ve,locale:n,...a},V)):(r(!1),o(),s("/"),await w(e,"/rest/storage/svangerskapspenger",V)),d.current&&d.current()})().catch(m=>{oe(m.message),d.current&&d.current()})},[i]),u.useCallback(()=>(l(!0),new Promise(m=>{d.current=m})),[])};var fe=(e=>(e.JOBB_I_UTLANDET="JOBB_I_UTLANDET",e))(fe||{}),Ee=(e=>(e.MOR="mor",e))(Ee||{}),ye=(e=>(e.SVANGERSKAPSPENGER="svangerskapspenger",e))(ye||{});const Se=e=>e.arbeidsforhold.type===_.FRILANSER||e.arbeidsforhold.type===_.SELVSTENDIG?{type:e.arbeidsforhold.type,risikoFaktorer:e.risikofaktorer,tilretteleggingstiltak:e.tilretteleggingstiltak}:{id:e.arbeidsforhold.arbeidsgiverId,type:e.arbeidsforhold.type},K=e=>({land:e.landkode,tidsperiode:{fom:e.fom,tom:e.tom}}),_n=(e,n,r)=>({iNorgeSiste12Mnd:!e.harBoddUtenforNorgeSiste12Mnd,iNorgeNeste12Mnd:!e.skalBoUtenforNorgeNeste12Mnd,tidligereOpphold:((r==null?void 0:r.utenlandsoppholdSiste12Mnd)||[]).map(K),senereOpphold:((n==null?void 0:n.utenlandsoppholdNeste12Mnd)||[]).map(K)}),qn=e=>({erBarnetFødt:e.erBarnetFødt,termindato:e.termindato,fødselsdatoer:e.fødselsdato?[e.fødselsdato]:void 0}),On=(e,n)=>({type:h.HEL,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Gn=(e,n)=>({type:h.DELVIS,tilrettelagtArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom,stillingsprosent:e.stillingsprosent}),Cn=(e,n)=>({type:h.INGEN,slutteArbeidFom:e.fom,arbeidsforhold:n,behovForTilretteleggingFom:e.behovForTilretteleggingFom}),Un=e=>{const n=Se(e);return e.type===h.HEL?On(e,n):e.type===h.DELVIS?Gn(e,n):Cn(e,n)},Bn=e=>e.map(n=>Un(n)),Vn=e=>De(e)?ae(e).startOf("day").isAfter(Pe,"day"):!0,Kn=e=>{if(e){const n=e.næringstype===nn.FISKER&&(!e.navnPåNæringen||e.navnPåNæringen.trim().length===0)?void 0:e.navnPåNæringen,r=Vn(e.fomDato),s={næringstyper:[e.næringstype],tidsperiode:{fom:e.fomDato,tom:e.tomDato},næringsinntekt:e.næringsinntekt?parseInt(e.næringsinntekt,10):void 0,navnPåNæringen:n,organisasjonsnummer:e.organisasjonsnummer,registrertINorge:e.registrertINorge,registrertILand:e.registrertILand,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene};return r?{...s,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,oppstartsdato:e.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene?e.oppstartsdato:void 0}:{...s,hattVarigEndringAvNæringsinntektSiste4Kalenderår:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår,endringAvNæringsinntektInformasjon:e.hattVarigEndringAvNæringsinntektSiste4Kalenderår?{dato:e.varigEndringDato,næringsinntektEtterEndring:parseInt(e.varigEndringInntektEtterEndring),forklaring:e.varigEndringBeskrivelse}:void 0}}},Hn=e=>({type:fe.JOBB_I_UTLANDET,arbeidsgiverNavn:e.arbeidsgiverNavn,land:e.land,tidsperiode:{fom:e.fom,tom:e.tom,pågående:e.pågående}}),Yn=(e,n,r,s,a)=>{const o=Kn(r),i=a?a.arbeidIUtlandet.map(d=>Hn(d)):void 0;return{rolle:Ee.MOR,språkkode:e,frilansInformasjon:n.harJobbetSomFrilans?s:void 0,selvstendigNæringsdrivendeInformasjon:o?[o]:void 0,andreInntekterSiste10Mnd:i}},Jn=e=>e.map(r=>{const s=Se(r);return r.vedlegg.map(o=>({...o,dokumenterer:{type:ue.TILRETTELEGGING,arbeidsforhold:s}}))}).flat(1),$n=(e,n)=>{const r=_n(b(e(f.UTENLANDSOPPHOLD)),e(f.UTENLANDSOPPHOLD_SENERE),e(f.UTENLANDSOPPHOLD_TIDLIGERE)),s=b(e(f.OM_BARNET)),a=b(e(f.TILRETTELEGGINGER)),o=qn(s),i=Jn(a),l=Yn(n,b(e(f.INNTEKTSINFORMASJON)),e(f.EGEN_NÆRING),e(f.FRILANS),e(f.ARBEID_I_UTLANDET)),d=rn(s),g=sn(a,d),p=Bn(g);return{type:ye.SVANGERSKAPSPENGER,erEndringssøknad:!1,informasjonOmUtenlandsopphold:r,barn:o,vedlegg:i,tilrettelegging:p,søker:l}},H="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",zn=(e,n,r)=>{const s=Ze(),[a,o]=u.useState(),i=u.useCallback(async l=>{const d=$n(s,r);let g;try{g=await ce(e,"/rest/soknad",d,H,!0,l)}catch(p){if(Sn(p))p instanceof E&&oe(p.message),o(p);else throw new Error("SendSøknad - This should never happen")}if(g){try{await w(e,"/rest/storage/svangerskapspenger",H,l)}catch{}n(g)}},[s,n,r,e]);return u.useMemo(()=>({sendSøknad:i,errorSendSøknad:a}),[i,a])},D=()=>t.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:t.jsx(_e,{size:"2xlarge"})}),y=te(),P=({error:e})=>t.jsx(qe,{appName:"Svangerskapspenger",errorMessage:e.message,retryCallback:()=>location.reload()}),Qn=(e,n,r,s,a)=>e?t.jsxs(t.Fragment,{children:[t.jsx(k,{path:v.BARNET,element:t.jsx(an,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.UTENLANDSOPPHOLD,element:t.jsx(mn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.HAR_BODD_I_UTLANDET,element:t.jsx(vn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKAL_BO_I_UTLANDET,element:t.jsx(kn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.INNTEKTSINFORMASJON,element:t.jsx(pn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.FRILANS,element:t.jsx(gn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.NÆRING,element:t.jsx(ln,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.ARBEID_I_UTLANDET,element:t.jsx(on,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.VELG_ARBEID,element:t.jsx(fn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.SKJEMA,element:t.jsx(we,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.TILRETTELEGGING,element:t.jsx(un,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.PERIODER,element:t.jsx(cn,{arbeidsforhold:n.arbeidsforhold,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s})}),t.jsx(k,{path:v.OPPSUMMERING,element:t.jsx(dn,{søkerInfo:n,mellomlagreSøknadOgNaviger:r,avbrytSøknad:s,sendSøknad:a})})]}):t.jsx(k,{path:"*",element:t.jsx(We,{to:v.FORSIDE})}),be=({søkerInfo:e,locale:n,onChangeLocale:r,mellomlagretData:s})=>{const a=R(),[o,i]=u.useState(!1),[l,d]=u.useState(),{sendSøknad:g,errorSendSøknad:p}=zn(y,d,n),m=Pn(y,n,i),c=Dn(y,i);return u.useEffect(()=>{s!=null&&s[f.APP_ROUTE]&&(i(!0),s.locale&&r(s.locale),a(s[f.APP_ROUTE]))},[s]),l?M.INNSYN?(xn(l.saksNr?`${M.INNSYN}/sak/${l.saksNr}/redirectFromSoknad`:`${M.INNSYN}/redirectFromSoknad`),t.jsx(D,{})):t.jsx("div",{children:"Redirected to Innsyn"}):p?t.jsx(P,{error:p}):t.jsxs(Qe,{children:[t.jsx(k,{path:v.FORSIDE,element:t.jsx(tn,{mellomlagreSøknadOgNaviger:m,setHarGodkjentVilkår:i,harGodkjentVilkår:o,locale:n,onChangeLocale:r})}),Qn(o,e,m,c,g)]})};D.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};be.__docgenInfo={description:"",methods:[],displayName:"SvangerskapspengesøknadRoutes",props:{locale:{required:!0,tsType:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},description:""},onChangeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleNo) => void",signature:{arguments:[{type:{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},name:"locale"}],return:{name:"void"}}},description:""},søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
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
}`,signature:{properties:[]}}]},description:""}}};const Ie=({locale:e,onChangeLocale:n})=>{const r=Oe();Ge(r.formatMessage({id:"søknad.pagetitle"}));const{data:s,error:a}=q(y,"/rest/sokerinfo"),{data:o,loading:i,error:l}=q(y,"/rest/storage/svangerskapspenger");if(a||l)return t.jsx(P,{error:b(a||l)});if(!s||i)return t.jsx(D,{});if(!(s.søker.kjønn==="K"))return t.jsx(En,{});const g=Ce(s.søker.fødselsdato),p=(o==null?void 0:o.version)===ve?o:void 0;return t.jsx("div",{children:g?t.jsx(Mn,{children:t.jsx(en,{initialState:p,children:t.jsx(be,{locale:e,onChangeLocale:n,søkerInfo:s,mellomlagretData:p})})}):t.jsx(Ue,{appnavn:"Svangerskapspenger"})})};Ie.__docgenInfo={description:"",methods:[],displayName:"Svangerskapspengesøknad"};const Wn={...Ye,...ie.nb,...le.nb,...ge.nb,...ke.nb},Xn={...Je,...ie.nn,...le.nn,...ge.nn,...ke.nn},Ne=Ln(),Zn={nb:Wn,nn:Xn};ae.locale(Ne);const er=async()=>{try{await w(y,"/rest/storage/svangerskapspenger","Feil ved sletting av mellomlagret data")}catch{}location.reload()},Ae=()=>{const[e,n]=u.useState(Ne);return t.jsx(Be,{locale:e,messagesGroupedByLocale:Zn,children:t.jsxs(Ve,{appName:"Svangerskapspenger",retryCallback:er,children:[t.jsx(Ke,{}),t.jsx(Ie,{locale:e,onChangeLocale:r=>{wn(r),n(r),document.documentElement.setAttribute("lang",r)}})]})})},Te=Ae;Ae.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const S={søker:{fnr:"30088930610",fornavn:"ERLINGA-MASK",etternavn:"ORAVAKANGAS",kjønn:"K",fødselsdato:"1989-08-30",land:"NO",barn:[],bankkonto:{kontonummer:"10824223373",banknavn:"Din Bank"}},arbeidsforhold:[{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:32.63,fom:"2014-05-22",tom:"2019-05-31"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:0,fom:"2018-04-09",tom:"2018-09-09"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:80,fom:"2018-06-25",tom:"2018-08-05"},{arbeidsgiverId:"975326209",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SYKEHUSET I VESTFOLD",stillingsprosent:85.09,fom:"2019-06-01"},{arbeidsgiverId:"990322244",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"OMSORGSPARTNER VESTFOLD",stillingsprosent:100,fom:"2017-04-05"},{arbeidsgiverId:"995090910",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"RE KOMMUNE",stillingsprosent:0,fom:"2018-06-01"}]},ls={title:"AppContainer",component:Te},F=({søkerinfo:e,mellomlagretData:n,doLogging:r=!0})=>{He();const s=new Fe(te());return s.onGet("/rest/sokerinfo").reply(()=>(r&&console.log("network request: get /sokerinfo"),[200,e])),s.onGet("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: get /storage/svangerskapspenger"),[200,n])),s.onPost("rest-api/soknad").reply(()=>(r&&console.log("network request: post rest-api/soknad"),[200,{}])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger"),[200])),s.onDelete("/rest/storage/svangerskapspenger").reply(()=>(r&&console.log("network request: delete /storage/svangerskapspenger"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(()=>(r&&console.log("network request: post /storage/svangerskapspenger/vedlegg"),[200])),s.onPost("/rest/storage/svangerskapspenger/vedlegg").reply(200,{}),t.jsx(Te,{})},I=F.bind({});I.args={søkerinfo:S};const N=F.bind({});N.args={søkerinfo:{...S,arbeidsforhold:[]}};const A=F.bind({});A.args={søkerinfo:{...S,søker:{...S.søker,kjønn:"M"}}};const T=F.bind({});T.args={søkerinfo:{...S,søker:{...S.søker,kjønn:"K",fødselsdato:"2023-08-30"}}};var Y,J,$;I.parameters={...I.parameters,docs:{...(Y=I.parameters)==null?void 0:Y.docs,source:{originalSource:`({
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
}`,...(se=(re=T.parameters)==null?void 0:re.docs)==null?void 0:se.source}}};const gs=["VisAppKvinneMedArbeid","VisAppKvinneUtenArbeid","VisAppMann","VisAppUmyndig"];export{I as VisAppKvinneMedArbeid,N as VisAppKvinneUtenArbeid,A as VisAppMann,T as VisAppUmyndig,gs as __namedExportsOrder,ls as default};
