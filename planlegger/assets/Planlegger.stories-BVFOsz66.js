import{j as t}from"./VStack-1BYz4cx9.js";import{P as n,A as k,M as u,a as i,B as h,E as f}from"./Planlegger-C2U_2wok.js";import{P as v}from"./usePlanleggerNavigator-CSXZAriH.js";import{r as x}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-IrxiEj86.js";import"./Label-xTGzdijQ.js";import{i as F}from"./Arbeidssituasjon-CIfsLvvg.js";import{n as M,u as a,e as b,a as P}from"./nn_NO-CK_o95vS.js";import{I as E,E as y}from"./VeiviserPage-CkT1vu0n.js";import"./index-CYM-y3Gt.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-CqRnCsCY.js";import"./routes-Cp-2uEwO.js";import"./ArbeidssituasjonSteg-CeMcZd3V.js";import"./BlueRadioGroup-HcwezNgf.js";import"./StepButtonsHookForm-CFhcz6Nn.js";import"./Calendar-CYQP7Vnt.js";import"./Responsive-CxM9YB4e.js";import"./ArrowLeft-DcKJ7GdH.js";import"./PlanleggerStepPage-mJcSQXyF.js";import"./satserUtils-tEGAV9ZK.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-CUQTHxD6.js";import"./Spacer-BW3tgveW.js";import"./FordelingSteg-CuJKZriM.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-oALZUZC-.js";import"./HvorLangPeriodeSteg-TWhRsO_a.js";import"./PersonGroup-DhM52ZF8.js";import"./OmBarnetSteg-vTik9_GG.js";import"./TasklistStart-BzZunxp6.js";import"./OmPlanleggerenSteg-BHeNOTFr.js";import"./OppsummeringSteg-ok6EbkGA.js";import"./ExpansionCard-KaTYnhLS.js";import"./kalenderPerioderUtils-ptH-5ZA6.js";import"./CalendarIconLabel-CKmrFO18.js";import"./FamiliehendelseLabel-HtLE5l3r.js";import"./PlanenDeresSteg-D1AOi38h.js";import"./OmÅTilpassePlanen-CMroIri2.js";import"./BabyWrapped-DG0A_Fdn.js";import"./PersonPregnant-CCkY59BK.js";import"./UforutsetteEndringer-DGtSmV2e.js";import"./Information--Df_NHHt.js";import"./index-BRV0Se7Z.js";const R={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},j={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},A={...P,...a.nb},S={nb:A,nn:{...M,...a.nn},en:{...b,...a.en}},Me={title:"PlanleggerDataFetcher",component:n,render:l=>{F();const c=k(),o=new u(c);return l.brukMocks?(o.onPost("/rest/konto").reply(()=>[200,R]),o.onGet("/rest/satser").reply(()=>[200,j])):(o.onPost("/rest/konto").reply(async r=>[200,(await i.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",r.data,{withCredentials:r.withCredentials,headers:r.headers,timeout:r.timeout})).data]),o.onGet("/rest/satser").reply(async r=>[200,(await i.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:r.headers,timeout:r.timeout})).data])),t.jsx(x.StrictMode,{children:t.jsx(E,{locale:"nb",messagesGroupedByLocale:S,children:t.jsx(y,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(h,{basename:f.PUBLIC_PATH,children:t.jsx(v,{initialState:{},children:t.jsx(n,{locale:"nb",changeLocale:()=>{}})})})})})})}},s={args:{changeLocale:()=>{},locale:"nb"}};var p,m,d;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const be=["Default"];export{s as Default,be as __namedExportsOrder,Me as default};
