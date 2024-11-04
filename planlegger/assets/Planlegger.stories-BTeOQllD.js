import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{Q as S,P as m,h as s,H as n,a as h}from"./Planlegger-CeXlWxPJ.js";import{M as j,P as v}from"./usePlanleggerNavigator-DW4nnOlQ.js";import{r as y}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-D2M1HdQ9.js";import"./Label-CXFT65WO.js";import{i as E}from"./amplitude-pNT9-8Af.js";import{n as F,u as p,e as R,a as x}from"./nn_NO-Cb4cB1FZ.js";import{I as M,E as b}from"./VeiviserPage-BcsEgJcv.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./routes-gnI_NAHe.js";import"./ArbeidssituasjonSteg-9QtKvI9v.js";import"./BlueRadioGroup-1oBjpYRH.js";import"./StepButtonsHookForm-HVapK_lG.js";import"./VStack-DXwxFTIo.js";import"./Responsive-ivt31A_p.js";import"./index-BbmHap-z.js";import"./ArrowLeft-BHWdNJf4.js";import"./ArrowRight-DYX3sAmv.js";import"./customErrorFormatter-BAPWT5E-.js";import"./PlanleggerStepPage-F7Yp21t3.js";import"./satserUtils-Doc8m8GQ.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-DEZIZxBd.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./Checkmark-CvLHQyWN.js";import"./Spacer-BW3tgveW.js";import"./BarnehageplassSteg-BkH-XQwV.js";import"./BabyWrapped-f-N5pHto.js";import"./Information-BHhX2pxT.js";import"./ExpansionCard-BWWqtp0J.js";import"./FordelingSteg-BpfIfuQk.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-DACLuxru.js";import"./HvorLangPeriodeSteg-C6pKtsuk.js";import"./PersonGroup-Dm-EwGRr.js";import"./HvorMyeSteg-De9Go2ma.js";import"./Wallet-BksBw_Ii.js";import"./OmBarnetSteg-QDA-R4Q2.js";import"./TasklistStart-BUjWFJGh.js";import"./OmPlanleggerenSteg-CoFclryo.js";import"./OppsummeringSteg-Bl6YnBwn.js";import"./ShareDataInfobox-vYZvCutl.js";import"./kalenderPerioderUtils-BL1EhGLm.js";import"./CalendarIconLabel-DXHCxJg7.js";import"./FamiliehendelseLabel-CamrjsPy.js";import"./PlanenDeresSteg-Bh_SvnXb.js";import"./OmÅTilpassePlanen-Cg-04bGr.js";import"./PersonPregnant-he-xd9Dl.js";import"./UforutsetteEndringer-S7UcI-8n.js";import"./index-BRV0Se7Z.js";const O=new S({defaultOptions:{queries:{retry:!1}}}),D={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},T={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},w={...x,...p.nb},A={nb:w,nn:{...F,...p.nn},en:{...R,...p.en}},Le={title:"PlanleggerDataFetcher",component:m,parameters:{msw:{handlers:[s.post("/foreldrepenger/planlegger/rest/konto",async({request:i})=>{const a=await i.json(),k=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(a),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(k)}),s.get("/foreldrepenger/planlegger/rest/satser",async()=>{const a=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(a)})]}},render:()=>(E(),r.jsx(y.StrictMode,{children:r.jsx(j,{children:r.jsx(M,{locale:"nb",messagesGroupedByLocale:A,children:r.jsx(b,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:r.jsx(h,{client:O,children:r.jsx(v,{initialState:{},children:r.jsx(m,{locale:"nb",changeLocale:()=>{}})})})})})})}))},t={args:{changeLocale:()=>{},locale:"nb"}},o={...t,parameters:{msw:{handlers:[s.post("/foreldrepenger/planlegger/rest/konto",()=>n.json(D)),s.get("/foreldrepenger/planlegger/rest/satser",()=>n.json(T))]}}};var l,d,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(c=(d=t.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var g,f,u;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/konto\`, () => HttpResponse.json(STØNADSKONTOER)), http.get(\`\${import.meta.env.BASE_URL}/rest/satser\`, () => HttpResponse.json(SATSER))]
    }
  }
}`,...(u=(f=o.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};const _e=["Default","DefaultMockaStønadskontoerOgSatser"];export{t as Default,o as DefaultMockaStønadskontoerOgSatser,_e as __namedExportsOrder,Le as default};
