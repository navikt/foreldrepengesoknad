var pe=Object.defineProperty;var ue=(e,n,o)=>n in e?pe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[n]=o;var b=(e,n,o)=>ue(e,typeof n!="symbol"?n+"":n,o);import{a0 as me,j as s,a1 as fe,a2 as ke,u as Ee,a3 as Se,a4 as xe,a5 as Ne,d as he,a6 as ye,a7 as Me,i as we}from"./dateFormValidation-CSo1Ghro.js";import{d as ve,R as be,e as ee,f as Ae,g as Ie,C as S,h as je,n as ne,i as Re,j as k,N as Te,P as f,E as _e}from"./useEsNavigator-DL6e_ycb.js";import{D,M as Le}from"./DokumentasjonSteg-BKbZec8l.js";import{r as m,a as Pe}from"./index-CTjT7uj6.js";import{a as Ce,g as te}from"./apiInterceptor-DfqAa4et.js";import"./index-CYM-y3Gt.js";import{b as De,u as I,a as j,o as R,e as Oe,n as Ue}from"./nn_NO-ClE8LtqC.js";import{e as Fe,O as qe}from"./OppsummeringSteg-YTtDtTwT.js";import{e as Ge,b as Ve,a as Ke}from"./OmBarnet-BV6De4cI.js";import{O as Be}from"./OmBarnetSteg-jHrWfQHK.js";import{S as He}from"./SøkersituasjonSteg-DzjiAdy-.js";import{U as $e}from"./UtenlandsoppholdSteg-C9pPq-BC.js";import{S as Je}from"./SenereUtenlandsoppholdSteg-v3tALIOu.js";import{T as Ye}from"./TidligereUtenlandsoppholdSteg-CWyTEFD_.js";import{V as ze}from"./Velkommen-BEsQH1Is.js";import"./index-BRV0Se7Z.js";import"./ErrorSummaryHookForm-Cl5Hi6CA.js";import"./BoIUtlandetOppsummeringspunkt-BBqZ1K-p.js";import"./ConfirmationPanel-CMnGIRc5.js";import"./TidligereUtenlandsoppholdPanel-BC-rpWDr.js";const{Axios:qn,AxiosError:Gn,CanceledError:Vn,isCancel:Kn,CancelToken:Bn,VERSION:Hn,all:$n,Cancel:Jn,isAxiosError:Qe,spread:Yn,toFormData:zn,AxiosHeaders:Qn,HttpStatusCode:Wn,formToJSON:Xn,getAdapter:Zn,mergeConfig:et}=Ce;class E extends Error{constructor(o,t,a){super(o);b(this,"callId");b(this,"timestamp");this.callId=t,this.timestamp=a}}class v extends Error{constructor(){super("API_ACCESS_ERROR")}}const We=e=>e instanceof v||e instanceof E,se=e=>!!(e&&typeof e=="object"&&"isAxiosError"in e),O=(e,n)=>{const[o,t]=m.useState(),[a,d]=m.useState(!1),[l,i]=m.useState();return m.useEffect(()=>{let g=!1;return(async()=>{var u,r;try{d(!0);const p=await e.get(n,{withCredentials:!0,timeout:60*1e3});g||t(p.data)}catch(p){Qe(p)?((u=p.response)==null?void 0:u.status)===401||((r=p.response)==null?void 0:r.status)===403?i(new v):i(new E(p.message)):p instanceof Error?i(new E(p.message)):i(new E(String(p)))}finally{d(!1)}})(),()=>{g=!0}},[e,n]),{data:o,loading:a,error:l}},U="ukjent uuid",oe=async(e,n,o,t,a=!1,d)=>{var l,i,g,c,u,r;try{return(await e.post(n,o,{withCredentials:!0,timeout:6e4,signal:d,headers:a?{"content-type":"application/json;"}:{}})).data}catch(p){if(se(p)&&p.code!=="ERR_CANCELED"){if(((l=p.response)==null?void 0:l.status)===401||((i=p.response)==null?void 0:i.status)===403)throw new v;const x=(c=(g=p.response)==null?void 0:g.data)!=null&&c.uuid?p.response.data.uuid:U,N=x!==U?x.slice(0,8):x;throw new E(t+N,x,(r=(u=p.response)==null?void 0:u.data)==null?void 0:r.timestamp)}throw p instanceof Error?new E(p.message):new E(String(p))}},F="ukjent uuid",_=async(e,n,o,t,a)=>{var d,l,i,g;try{return(await e.delete(n,{withCredentials:!0,timeout:6e4,signal:a,data:t})).data}catch(c){if(se(c)&&c.code!=="ERR_CANCELED"){if(((d=c.response)==null?void 0:d.status)===401||((l=c.response)==null?void 0:l.status)===403)throw new v;const u=(g=(i=c.response)==null?void 0:i.data)!=null&&g.uuid?c.response.data.uuid:F,r=u!==F?u.slice(0,8):u;throw new E(o+r)}throw c instanceof Error?new E(c.message):new E(String(c))}};/**
 * React Router DOM v6.26.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Xe="6";try{window.__reactRouterVersion=Xe}catch{}const Ze="startTransition",q=Pe[Ze];function en(e){let{basename:n,children:o,future:t,window:a}=e,d=m.useRef();d.current==null&&(d.current=ve({window:a,v5Compat:!0}));let l=d.current,[i,g]=m.useState({action:l.action,location:l.location}),{v7_startTransition:c}=t||{},u=m.useCallback(r=>{c&&q?q(()=>g(r)):g(r)},[g,c]);return m.useLayoutEffect(()=>l.listen(u),[l,u]),m.createElement(be,{basename:n,children:o,location:i.location,navigationType:i.action,navigator:l,future:t})}var G;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(G||(G={}));var V;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(V||(V={}));const nn="From {fom} until {tom}",tn={tidsperiode:nn,"tidsperiode.kort":"{fom} - {tom}"},sn="Fra {fom} til {tom}",on={tidsperiode:sn,"tidsperiode.kort":"{fom} - {tom}"},rn="Frå {fom} til {tom}",an={tidsperiode:rn,"tidsperiode.kort":"{fom} - {tom}"},ln=e=>{window.location.href=e},re="selectedLocale",gn=()=>sessionStorage.getItem(re)||"nb",cn=e=>{sessionStorage.setItem(re,e)},T={nb:on,nn:an,en:tn},ae=1,K="Det har oppstått et problem med mellomlagring av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",dn=(e,n,o)=>{const t=ee(),a=Ae(),d=Ie(),[l,i]=m.useState(!1),g=m.useRef();return m.useEffect(()=>{l&&(async()=>{i(!1);const r=a[S.CURRENT_PATH];r?(t(r),await oe(e,"/rest/storage/engangsstonad",{version:ae,locale:n,...a},K)):(await _(e,"/rest/storage/engangsstonad",K),o(!1),d(),t("/")),g.current&&g.current()})().catch(r=>{me(r.message),g.current&&g.current()})},[l]),m.useCallback(()=>(i(!0),new Promise(r=>{g.current=r})),[])},pn=()=>{const e=document.getElementById("nav:appSettings"),n=JSON.parse(e.text);return{APP_VERSION:n.APP_VERSION,INNSYN:n.INNSYN}},A=pn(),un=(e,n)=>{const o=(n==null?void 0:n.vedlegg.map(t=>t.id))||[];if(Ge(e))return{type:"adopsjon",antallBarn:e.antallBarn,fødselsdatoer:e.fødselsdatoer.map(t=>t.dato),adopsjonsdato:e.adopsjonsdato,adopsjonAvEktefellesBarn:e.adopsjonAvEktefellesBarn,vedleggreferanser:o};if(Ve(e))return{type:"fødsel",antallBarn:e.antallBarn,fødselsdato:e.fødselsdato,vedleggreferanser:[]};if(Ke(e)&&n&&Fe(n))return{type:"termin",antallBarn:e.antallBarn,termindato:e.termindato,terminbekreftelseDato:n.terminbekreftelsedato,vedleggreferanser:o};throw Error("Det er feil i data om barnet")},B="Det har oppstått et problem med innsending av søknaden. Vennligst prøv igjen senere. Hvis problemet vedvarer, kontakt oss og oppgi feil id: ",mn=(e,n,o)=>{const t=je(),[a,d]=m.useState(),l=m.useCallback(async i=>{const g=ne(t(S.OM_BARNET)),c=t(S.DOKUMENTASJON),u=t(S.UTENLANDSOPPHOLD_TIDLIGERE),r=t(S.UTENLANDSOPPHOLD_SENERE),p={type:"engangsstønad",språkkode:n,barn:un(g,c),utenlandsopphold:((u==null?void 0:u.utenlandsoppholdSiste12Mnd)||[]).concat((r==null?void 0:r.utenlandsoppholdNeste12Mnd)||[]),vedlegg:(c==null?void 0:c.vedlegg.map(N=>({...N,dokumenterer:{type:"barn"}})))||[]};let x;try{x=await oe(e,"/rest/soknad/engangsstonad",p,B,!0,i)}catch(N){if(We(N))d(N);else throw new Error("This should never happen")}if(x){try{await _(e,"/rest/storage/engangsstonad",B,i)}catch{}o(x)}},[t,n,o,e]);return m.useMemo(()=>({sendSøknad:l,errorSendSøknad:a}),[l,a])},w=te(),L=()=>s.jsx("div",{style:{textAlign:"center",padding:"12rem 0"},children:s.jsx(fe,{size:"2xlarge"})}),P=({error:e})=>s.jsx(ke,{appName:"Engangsstønad",errorMessage:e.message,retryCallback:()=>location.reload()}),ie=({locale:e,onChangeLocale:n,søker:o,mellomlagretData:t})=>{const a=ee(),[d,l]=m.useState(!1),[i,g]=m.useState(),{sendSøknad:c,errorSendSøknad:u}=mn(w,e,g),r=dn(w,e,l);return m.useEffect(()=>{t!=null&&t[S.CURRENT_PATH]&&(l(!0),t.locale&&n(t.locale),a(t[S.CURRENT_PATH]))},[t]),i?A.INNSYN?(ln(i.saksNr?`${A.INNSYN}/sak/${i.saksNr}/redirectFromSoknad`:`${A.INNSYN}/redirectFromSoknad`),s.jsx(L,{})):s.jsx("div",{children:"Redirected to Innsyn"}):u?s.jsx(P,{error:u}):s.jsxs(Re,{children:[!d&&s.jsx(k,{path:"*",element:s.jsx(Te,{to:f.VELKOMMEN})}),s.jsx(k,{path:f.VELKOMMEN,element:s.jsx(ze,{locale:e,onChangeLocale:n,startSøknad:l,erVelkommen:d,mellomlagreOgNaviger:r})}),d&&s.jsxs(s.Fragment,{children:[s.jsx(k,{path:f.SØKERSITUASJON,element:s.jsx(He,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.OM_BARNET,element:s.jsx(Be,{kjønn:o.kjønn,mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.TERMINBEKREFTELSE,element:s.jsx(D,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.ADOPSJONSBEKREFTELSE,element:s.jsx(D,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.UTENLANDSOPPHOLD,element:s.jsx($e,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.TIDLIGERE_UTENLANDSOPPHOLD,element:s.jsx(Ye,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.SENERE_UTENLANDSOPPHOLD,element:s.jsx(Je,{mellomlagreOgNaviger:r})}),s.jsx(k,{path:f.OPPSUMMERING,element:s.jsx(qe,{sendSøknad:c,mellomlagreOgNaviger:r})})]})]})};L.__docgenInfo={description:"",methods:[],displayName:"Spinner"};P.__docgenInfo={description:"",methods:[],displayName:"ApiErrorHandler"};ie.__docgenInfo={description:"",methods:[],displayName:"EngangsstønadRoutes"};const le=({locale:e,onChangeLocale:n})=>{const o=Ee();Se(o.formatMessage({id:"Søknad.Pagetitle"}));const{data:t,error:a}=O(w,"/rest/personinfo"),{data:d,loading:l,error:i}=O(w,"/rest/storage/engangsstonad");if(a||i)return s.jsx(P,{error:ne(a||i)});if(!t||l)return s.jsx(L,{});if(!xe(t.fødselsdato))return s.jsx(Ne,{appnavn:"Engangsstønad"});const g=(d==null?void 0:d.version)===ae?d:void 0;return s.jsx(_e,{initialState:g,children:s.jsx(ie,{locale:e,onChangeLocale:n,søker:t,mellomlagretData:g})})};le.__docgenInfo={description:"",methods:[],displayName:"Engangsstønad"};const fn={...Ue,...I.nb,...j.nb,...R.nb,...T.nb},ge=gn(),kn={nb:fn,nn:{...De,...I.nn,...j.nn,...R.nn,...T.nn},en:{...Oe,...I.en,...j.en,...R.en,...T.en}};he.locale(ge);const En=async()=>{try{await _(w,"/rest/engangsstonad","Feil ved sletting av mellomlagret data")}catch{}location.reload()},ce=()=>{const[e,n]=m.useState(ge),o=m.useCallback(t=>{cn(t),n(t),document.documentElement.setAttribute("lang",t)},[]);return s.jsx(ye,{locale:e,messagesGroupedByLocale:kn,children:s.jsx(Me,{appName:"Engangsstønad",retryCallback:En,children:s.jsx(en,{children:s.jsx(le,{locale:e,onChangeLocale:o})})})})},de=ce;ce.__docgenInfo={description:"",methods:[],displayName:"AppContainer"};const Sn={mottattDato:"2019-02-19T13:40:45.115",referanseId:"3959c880-83d2-4f01-b107-035fa7693758",leveranseStatus:"PÅ_VENT",journalId:"439772941"},nt={title:"Applikasjon - Engangsstønad (AppContainer)",component:de},C=({søker:e,mellomlagretData:n,doLogging:o=!0})=>{we();const t=te(),a=new Le(t);return a.onGet("/rest/personinfo").reply(()=>(o&&console.log("network request: get /personinfo"),[200,e])),a.onGet("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: get /storage/engangstonad"),[200,n])),a.onPost("/rest/soknad/engangsstonad").reply(()=>(o&&console.log("network request: post /soknad/engangsstonad"),[200,Sn])),a.onPost("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: post /storage/engangstonad"),[200])),a.onDelete("/rest/storage/engangsstonad").reply(()=>(o&&console.log("network request: delete /storage/engangstonad"),[200])),a.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),a.onPost("/rest/storage/engangsstonad/vedlegg").reply(200),s.jsx(de,{})},h=C.bind({});h.args={søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const y=C.bind({});y.args={mellomlagretData:{version:1,locale:"nb",[S.SØKERSITUASJON]:{situasjon:"fødsel"},[S.CURRENT_PATH]:f.SØKERSITUASJON},søker:{fnr:"11111111111",fornavn:"Henrikke",etternavn:"Ibsen",kjønn:"K",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};const M=C.bind({});M.args={søker:{fnr:"1231111111",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1979-01-28",bankkonto:{kontonummer:"49875234987",banknavn:"Storebank"},barn:[]}};var H,$,J;h.parameters={...h.parameters,docs:{...(H=h.parameters)==null?void 0:H.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(J=($=h.parameters)==null?void 0:$.docs)==null?void 0:J.source}}};var Y,z,Q;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(Q=(z=y.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;M.parameters={...M.parameters,docs:{...(W=M.parameters)==null?void 0:W.docs,source:{originalSource:`({
  søker,
  mellomlagretData,
  doLogging = true
}) => {
  initAmplitude();
  const axiosInstance = getAxiosInstance();
  const apiMock = new MockAdapter(axiosInstance);
  apiMock.onGet('/rest/personinfo').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /personinfo');
    }
    return [200, søker];
  });
  apiMock.onGet('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: get /storage/engangstonad');
    }
    return [200, mellomlagretData];
  });
  apiMock.onPost('/rest/soknad/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /soknad/engangsstonad');
    }
    return [200, kvittering];
  });
  apiMock.onPost('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: post /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onDelete('/rest/storage/engangsstonad').reply(() => {
    if (doLogging) {
      // eslint-disable-next-line no-console
      console.log('network request: delete /storage/engangstonad');
    }
    return [200];
  });
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //story
  apiMock.onPost('/rest/storage/engangsstonad/vedlegg').reply(200); //test

  return <AppContainer />;
}`,...(Z=(X=M.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};const tt=["SøkerErKvinne","SøkerErKvinneMedMellomlagretData","SøkerErMann"];export{h as SøkerErKvinne,y as SøkerErKvinneMedMellomlagretData,M as SøkerErMann,tt as __namedExportsOrder,nt as default};
