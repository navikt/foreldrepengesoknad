var pe=Object.defineProperty;var ue=(e,n,o)=>n in e?pe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o;var A=(e,n,o)=>(ue(e,typeof n!="symbol"?n+"":n,o),o);import{aa as me,n as ee,j as s,ab as fe,ac as ke,u as Ee,ad as Se,ae as Ne,af as xe,d as he,ag as ye,ah as Me,i as we}from"./dateFormValidation-DdoIbtyB.js";import{d as ve,R as Ae,e as ne,f as Ie,g as je,C as S,h as Re,i as be,j as k,N as Te,P as f,E as _e}from"./useEsNavigator-DtqThUgW.js";import{D,M as Le}from"./DokumentasjonSteg-DnngeS2W.js";import{r as p,$ as Pe}from"./index-DVXBtNgz.js";import{a as Ce,g as te}from"./apiInterceptor-DZtTMO6M.js";import"./index-Cbx7Fas8.js";import{b as De,u as j,a as R,o as b,e as Oe,n as Ue}from"./nn_NO-DmvXqrpZ.js";import{e as Fe,O as qe}from"./OppsummeringSteg-y3kpTlOr.js";import{e as Ge,b as Ve,a as Ke}from"./OmBarnet-BV6De4cI.js";import{O as $e}from"./OmBarnetSteg-YPmF3PlA.js";import{S as Be}from"./SøkersituasjonSteg-CWlh7-ZB.js";import{U as He}from"./UtenlandsoppholdSteg-D-AZg9uP.js";import{S as Je}from"./SenereUtenlandsoppholdSteg-2EKeu-UU.js";import{T as Ye}from"./TidligereUtenlandsoppholdSteg-CvsyVvAt.js";import{V as ze}from"./Velkommen-D1oVGYqn.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./ErrorSummaryHookForm-Drl-dvzD.js";import"./SøkerOppsummeringspunkt-Da1LsAc-.js";import"./ConfirmationPanel-BGYbmQnf.js";import"./TidligereUtenlandsoppholdPanel-50A_dSG2.js";const{Axios:Gn,AxiosError:Vn,CanceledError:Kn,isCancel:$n,CancelToken:Bn,VERSION:Hn,all:Jn,Cancel:Yn,isAxiosError:Qe,spread:zn,toFormData:Qn,AxiosHeaders:Wn,HttpStatusCode:Xn,formToJSON:Zn,getAdapter:et,mergeConfig:nt}=Ce;class E extends Error{constructor(o,t,i){super(o);A(this,"callId");A(this,"timestamp");this.callId=t,this.timestamp=i}}class w extends Error{constructor(){super("API_ACCESS_ERROR")}}const We=e=>e instanceof w||e instanceof E,se=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,n)=>{const[o,t]=p.useState(),[i,d]=p.useState(!1),[c,r]=p.useState();return p.useEffect(()=>{let l=!1;return(async()=>{var g,a;try{d(!0);const m=await e.get(n,{withCredentials:!0,timeout:60*1e3});l||t(m.data)}catch(m){Qe(m)?((g=m.response)==null?void 0:g.status)===401||((a=m.response)==null?void 0:a.status)===403?r(new w):r(new E(m.message)):m instanceof Error?r(new E(m.message)):r(new E(String(m)))}finally{d(!1)}})(),()=>{l=!0}},[e,n]),{data:o,loading:i,error:c}},U="ukjent uuid",oe=async(e,n,o,t,i=!1,d)=>{var c,r,l,u;try{return(await e.post(n,o,{withCredentials:!0,timeout:6e4,signal:d,headers:i?{"content-type":"application/json;"}:{}})).data}catch(g){if(se(g)&&g.code!=="ERR_CANCELED"){if(((c=g.response)==null?void 0:c.status)===401||((r=g.response)==null?void 0:r.status)===403)throw new w;const a=g.response&&g.response.data&&g.response.data.uuid?g.response.data.uuid:U,m=a!==U?a.slice(0,8):a;throw new E(t+m,a,(u=(l=g.response)==null?void 0:l.data)==null?void 0:u.timestamp)}throw g instanceof Error?new E(g.message):new E(String(g))}},F="ukjent uuid",_=async(e,n,o,t,i)=>{var d,c;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:i,data:t})).data}catch(r){if(se(r)&&r.code!=="ERR_CANCELED"){if(((d=r.response)==null?void 0:d.status)===401||((c=r.response)==null?void 0:c.status)===403)throw new w;const l=r.response&&r.response.data&&r.response.data.uuid?r.response.data.uuid:F,u=l!==F?l.slice(0,8):l;throw new E(o+u)}throw r instanceof Error?new E(r.message):new E(String(r))}};/**
 * React Router DOM v6.23.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Xe="6";try{window.__reactRouterVersion=Xe}catch{}const Ze="startTransition",q=Pe[Ze];function en(e){let{basename:n,children:o,future:t,window:i}=e,d=p.useRef();d.current==null&&(d.current=ve({window:i,v5Compat:!0}));let c=d.current,[r,l]=p.useState({action:c.action,location:c.location}),{v7_startTransition:u}=t||{},g=p.useCallback(a=>{u&&q?q(()=>l(a)):l(a)},[l,u]);return p.useLayoutEffect(()=>c.listen(g),[c,g]),p.createElement(Ae,{basename:n,children:o,location:r.location,navigationType:r.action,navigator:c,future:t})}var G;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(G||(G={}));var V;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(V||(V={}));const nn="From {fom} until {tom}",tn={tidsperiode:nn,"tidsperiode.kort":"{fom} - {tom}"},sn="Fra {fom} til {tom}",on={tidsperiode:sn,"tidsperiode.kort":"{fom} - {tom}"},rn="Frå {fom} til {tom}",an={tidsperiode:rn,"tidsperiode.kort":"{fom} - {tom}"},gn=e=>{window.location.href=e},re="selectedLocale",ln=()=>sessionStorage.getItem(re)||"nb",cn=e=>{sessionStorage.setItem(re,e)},T={nb:on,nn:an,en:tn},ae=1,K="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",dn=(e,n,o)=>{const t=ne(),i=Ie(),d=je(),[c,r]=p.useState(!1),l=p.useRef();return p.useEffect(()=>{c&&(async()=>{r(!1);const a=i[S.CURRENT_PATH];a?(t(a),await oe(e,"/rest/storage/engangsstonad",{version:ae,locale:n,...i},K)):(await _(e,"/rest/storage/engangsstonad",K),o(!1),d(),t("/")),l.current&&l.current()})().catch(a=>{me(a.message),l.current&&l.current()})},[c]),p.useCallback(()=>(r(!0),new Promise(a=>{l.current=a})),[])},pn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{APP_VERSION:n.APP_VERSION,INNSYN:n.INNSYN}},I=pn(),un=(e,n)=>{const o=(n==null?void 0:n.vedlegg.map(t=>t.id))||[];if(Ge(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(t=>t.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(Ve(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ke(e)&&n&&Fe(n))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:n.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},$="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",mn=(e,n,o)=>{const t=Re(),[i,d]=p.useState(),c=p.useCallback(async r=>{const l=ee(t(S.OM_BARNET)),u=t(S.DOKUMENTASJON),g=t(S.UTENLANDSOPPHOLD_TIDLIGERE),a=t(S.UTENLANDSOPPHOLD_SENERE),m={type:"engangsstønad",språkkode:n,barn:un(l,u),oppholdIUtlandet:((g==null?void 0:g.utenlandsoppholdSiste12Mnd)||[]).concat((a==null?void 0:a.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(u==null?void 0:u.vedlegg.map(N=>({...N,dokumenterer:{type:"barn"}})))||[]};let v;try{v=await oe(e,"/rest/soknad/engangsstonad",m,$,!0,r)}catch(N){if(We(N))d(N);else throw new Error("This should never happen")}if(v){try{await _(e,"/rest/storage/engangsstonad",$,r)}catch{}o(v)}},[t,n,o,e]);return p.useMemo(()=>({sendSøknad:c,errorSendSøknad:i}),[c,i])},M=te(),L=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(fe,{size:"2xlarge"})}),P=({error:e})=>s.jsx(ke,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),ie=({locale:e,onChangeLocale:n,søker:o,mellomlagretData:t})=>{const i=ne(),[d,c]=p.useState(!1),[r,l]=p.useState(),{sendSøknad:u,errorSendSøknad:g}=mn(M,e,l),a=dn(M,e,c);return p.useEffect(()=>{t!=null&&t[S.CURRENT_PATH]&&(c(!0),t.locale&&n(t.locale),i(t[S.CURRENT_PATH]))},[t]),r?I.INNSYN?(gn(r.saksNr?`${I.INNSYN}/sak/${r.saksNr}/redirectFromSoknad`:`${I.INNSYN}/redirectFromSoknad`),s.jsx(L,{})):s.jsx("div",{children:"Redirected to Innsyn"}):g?s.jsx(P,{error:g}):s.jsxs(be,{children:[!d&&s.jsx(k,{path:"*",element:s.jsx(Te,{to:f.VELKOMMEN})}),s.jsx(k,{path:f.VELKOMMEN,element:s.jsx(ze,{locale:e,onChangeLocale:n,startSøknad:c,erVelkommen:d,mellomlagreOgNaviger:a})}),d&&s.jsxs(s.Fragment,{children:[s.jsx(k,{path:f.SØKERSITUASJON,element:s.jsx(Be,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.OM_BARNET,element:s.jsx($e,{kjønn:o.kjønn,mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.TERMINBEKREFTELSE,element:s.jsx(D,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:s.jsx(D,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.UTENLANDSOPPHOLD,element:s.jsx(He,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:s.jsx(Ye,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:s.jsx(Je,{mellomlagreOgNaviger:a})}),s.jsx(k,{path:f.OPPSUMMERING,element:s.jsx(qe,{søker:o,sendSøknad:u,mellomlagreOgNaviger:a})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};ie.__docgenInfo={description:"",methods:[],displayName:"EngangsstønadRoutes"};const ge=({locale:e,onChangeLocale:n})=>{const o=Ee();Se(o.formatMessage({id:"Søknad.Pagetitle"}));const{data:t,error:i}=O(M,"/rest/personinfo"),{data:d,loading:c,error:r}=O(M,"/rest/storage/engangsstonad");if(i||r)return s.jsx(P,{error:ee(i||r)});if(!t||c)return s.jsx(L,{});if(!Ne(t.fødselsdato))return s.jsx(xe,{appnavn:"Engangsstønad"});const l=(d==null?void 0:d.version)===ae?d:void 0;return s.jsx(_e,{initialState:l,children:s.jsx(ie,{locale:e,onChangeLocale:n,søker:t,mellomlagretData:l})})};ge.__docgenInfo={description:"",methods:[],displayName:"Engangsstønad"};const fn={...Ue,...j.nb,...R.nb,...b.nb,...T.nb},le=ln(),kn={nb:fn,nn:{...De,...j.nn,...R.nn,...b.nn,...T.nn},en:{...Oe,...j.en,...R.en,...b.en,...T.en}};he.locale(le);const En=async()=>{try{await _(M,"/rest/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},ce=()=>{const[e,n]=p.useState(le),o=p.useCallback(t=>{cn(t),n(t),document.documentElement.setAttribute("lang",t)},[]);return s.jsx(ye,{locale:e,messagesGroupedByLocale:kn,children:s.jsx(Me,{appName:"Engangsstønad",retryCallback:En,children:s.jsx(en,{children:s.jsx(ge,{locale:e,onChangeLocale:o})})})})},de=ce;ce.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const Sn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},tt={title:"Applikasjon - Engangsstønad (AppContainer)",component:de},C=({søker:e,mellomlagretData:n,doLogging:o=!0})=>{we();const t=te(),i=new Le(t);return i.onGet("/rest/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),i.onGet("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,n])),i.onPost("/rest/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,Sn])),i.onPost("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),i.onDelete("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200])),i.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),i.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),s.jsx(de,{})},x=C.bind({});x.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const h=C.bind({});h.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const y=C.bind({});y.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var B,H,J;x.parameters={...x.parameters,docs:{...(B=x.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(J=(H=x.parameters)==null?void 0:H.docs)==null?void 0:J.source}}};var Y,z,Q;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(Q=(z=h.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;y.parameters={...y.parameters,docs:{...(W=y.parameters)==null?void 0:W.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(Z=(X=y.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const st=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{x as SøkerErKvinne,h as SøkerErKvinneMedMellomlagretData,y as SøkerErMann,st as __namedExportsOrder,tt as default};
