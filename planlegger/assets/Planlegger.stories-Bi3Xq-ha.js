import{j as t}from"./VStack-Bypcsavb.js";import{P as k}from"./usePlanleggerNavigator-Avwn3mPP.js";import{P as n,g as u,M as h,a as i,B as f}from"./Planlegger-DFErNa5H.js";import{r as v}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-BrvxP9lU.js";import"./Label-DrVT6kL1.js";import{i as x}from"./Arbeidssituasjon-BU6zEaot.js";import{n as F,u as a,e as M,a as b}from"./nn_NO-DFbhufIo.js";import{I as y,E}from"./Infobox-Or6GeBkH.js";import"./routes-Cp-2uEwO.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./index-CYM-y3Gt.js";import"./hvemHarRettUtils-Bz4PEX9v.js";import"./ArbeidssituasjonSteg-CWqRfNs8.js";import"./BlueRadioGroup-CQ6pCXHU.js";import"./StepButtonsHookForm-DwoDtt-o.js";import"./Calendar-CdedEl02.js";import"./Responsive-CMY18hyE.js";import"./ArrowLeft-C03Jdrb8.js";import"./PlanleggerStepPage-CoUNjkj8.js";import"./satserUtils-C65OlwZv.js";import"./validation-4HO0J-zV.js";import"./useScrollBehaviour-CknwOGzw.js";import"./Spacer-BW3tgveW.js";import"./FordelingSteg-CY9-ykql.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-BiWz9hU6.js";import"./HvorLangPeriodeSteg-BU7TfyiV.js";import"./PersonGroup-BZgbcndd.js";import"./OmBarnetSteg-Dox_sXSV.js";import"./TasklistStart-Di7ZrbYl.js";import"./OmPlanleggerenSteg-C3ROJUlk.js";import"./OppsummeringSteg-BjHhMC2t.js";import"./ExpansionCard-DWhNIOQp.js";import"./kalenderPerioderUtils-C7NmDdoU.js";import"./CalendarIconLabel-Dcpp4ieL.js";import"./FamiliehendelseLabel-Cq-Hyj2B.js";import"./PlanenDeresSteg-80ay0UvB.js";import"./OmÅTilpassePlanen-FAYWyG0b.js";import"./BabyWrapped-D30skVMZ.js";import"./PersonPregnant-DOvTPghS.js";import"./UforutsetteEndringer-BB5Q5BTx.js";import"./Information-t3hv7DAC.js";import"./index-BRV0Se7Z.js";const P={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},R={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j={...b,...a.nb},S={nb:j,nn:{...F,...a.nn},en:{...M,...a.en}},Fe={title:"PlanleggerDataFetcher",component:n,render:l=>{x();const c=u(),o=new h(c);return l.brukMocks?(o.onPost("/rest/konto").reply(()=>[200,P]),o.onGet("/rest/satser").reply(()=>[200,R])):(o.onPost("/rest/konto").reply(async r=>[200,(await i.create().post("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",r.data,{withCredentials:r.withCredentials,headers:r.headers,timeout:r.timeout})).data]),o.onGet("/rest/satser").reply(async r=>[200,(await i.create().get("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser",{headers:r.headers,timeout:r.timeout})).data])),t.jsx(v.StrictMode,{children:t.jsx(y,{locale:"nb",messagesGroupedByLocale:S,children:t.jsx(E,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(f,{children:t.jsx(k,{initialState:{},children:t.jsx(n,{locale:"nb",changeLocale:()=>{}})})})})})})}},s={args:{changeLocale:()=>{},locale:"nb"}};var p,m,d;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const Me=["Default"];export{s as Default,Me as __namedExportsOrder,Fe as default};
