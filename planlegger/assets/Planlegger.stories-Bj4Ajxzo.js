import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{Q as k,P as m,h as s,H as n,a as S}from"./Planlegger-Cfq5sqMn.js";import{M as j,P as v}from"./usePlanleggerNavigator-CVkzx2Y2.js";import{r as y}from"./index-CTjT7uj6.js";import{S as e}from"./uttakUtils-CmW0Gn_-.js";import"./Label-BxLm70D5.js";import{i as F}from"./amplitude-C7WzJwse.js";import{n as x,u as p,e as E,a as M}from"./nn_NO-B8ZiuajE.js";import{I as b,E as O}from"./VeiviserPage-D7Uw8UMB.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-D1xsqW5u.js";import"./barnetUtils-Dtg6gkcN.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./routes-kf2p-jG8.js";import"./ArbeidssituasjonSteg-BkND6tP6.js";import"./BlueRadioGroup-Cd0vKcFW.js";import"./StepButtonsHookForm-CrMd-Mt-.js";import"./VStack-CHPVCYB5.js";import"./Responsive-C8snjzxo.js";import"./index-vZN_Bsf0.js";import"./ArrowLeft-l9pGEy0M.js";import"./ArrowRight-BxFWJcl5.js";import"./customErrorFormatter-BAPWT5E-.js";import"./PlanleggerStepPage-E_O1yaDv.js";import"./satserUtils-MHYhUNIZ.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-BSOPccLF.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./stringUtils-DWuGC-tf.js";import"./Checkmark-CHF9SNUp.js";import"./Spacer-BW3tgveW.js";import"./BarnehageplassSteg-XfrCdbjm.js";import"./BabyWrapped-cMFYh14d.js";import"./Information-DTjzskpf.js";import"./ExpansionCard-B6k4Ih6k.js";import"./FordelingSteg-B0wPe-hh.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./HvemPlanleggerSteg-tPU3KEZh.js";import"./HvorLangPeriodeSteg-fFJildgU.js";import"./PersonGroup-Cdi4bEX1.js";import"./HvorMyeSteg-D8kE7r4T.js";import"./Wallet-DVjw1ed4.js";import"./OmBarnetSteg-zJpSxphU.js";import"./TasklistStart-O5RifqLr.js";import"./OmPlanleggerenSteg-BrYBpLO7.js";import"./OppsummeringSteg-lagLm-IT.js";import"./ShareDataInfobox-BJ_5ZZA7.js";import"./kalenderPerioderUtils-DJdhiczp.js";import"./CalendarIconLabel-Cq_rP7F1.js";import"./FamiliehendelseLabel-CIr_imIJ.js";import"./PlanenDeresSteg-B_YjJvWN.js";import"./OmÅTilpassePlanen-BZ5qK3zR.js";import"./PersonPregnant-2Tw-1mbW.js";import"./UforutsetteEndringer-CO51_hJY.js";import"./index-BRV0Se7Z.js";const R=new k({defaultOptions:{queries:{retry:!1}}}),D={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},T={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},w={...M,...p.nb},P={nb:w,nn:{...x,...p.nn},en:{...E,...p.en}},Ne={title:"PlanleggerDataFetcher",component:m,parameters:{msw:{handlers:[s.post("https://pl/rest/konto",async({request:i})=>{const a=await i.json(),f=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/konto",{body:JSON.stringify(a),method:"POST",headers:{"Content-Type":"application/json"}})).json();return n.json(f)}),s.get("https://pl/rest/satser",async()=>{const a=await(await fetch("https://foreldrepengesoknad-api.ekstern.dev.nav.no/rest/satser")).json();return n.json(a)})]}},render:()=>(F(),t.jsx(y.StrictMode,{children:t.jsx(j,{children:t.jsx(b,{locale:"nb",messagesGroupedByLocale:P,children:t.jsx(O,{appName:"Foreldrepengeplanlegger",retryCallback:()=>{},children:t.jsx(S,{client:R,children:t.jsx(v,{initialState:{},children:t.jsx(m,{locale:"nb",changeLocale:()=>{}})})})})})})}))},r={args:{changeLocale:()=>{},locale:"nb"}},o={...r,parameters:{msw:{handlers:[s.post("https://pl/rest/konto",()=>n.json(D)),s.get("https://pl/rest/satser",()=>n.json(T))]}}};var d,l,c;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    changeLocale: () => undefined,
    locale: 'nb'
  }
}`,...(c=(l=r.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var g,u,h;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...Default,
  parameters: {
    msw: {
      handlers: [http.post('https://pl/rest/konto', () => HttpResponse.json(STØNADSKONTOER)), http.get('https://pl/rest/satser', () => HttpResponse.json(SATSER))]
    }
  }
}`,...(h=(u=o.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};const Le=["Default","DefaultMockaStønadskontoerOgSatser"];export{r as Default,o as DefaultMockaStønadskontoerOgSatser,Le as __namedExportsOrder,Ne as default};
