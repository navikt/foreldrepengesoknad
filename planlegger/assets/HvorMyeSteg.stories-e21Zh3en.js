import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{a as R}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as f,P as b,C as t}from"./usePlanleggerNavigator-3Z4q1rf6.js";import{P}from"./routes-gnI_NAHe.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as u}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as j}from"./amplitude-DV9UZaYy.js";import{H as o}from"./HvorMyeSteg-Fj0NHvP_.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-CdeMuET1.js";import"./VStack-CHPVCYB5.js";import"./barnetUtils-Dtg6gkcN.js";import"./VeiviserPage-C-0AxCnT.js";import"./index-BRV0Se7Z.js";import"./PlanleggerStepPage-CsnGTpNN.js";import"./StepButtonsHookForm-4dTnqz-1.js";import"./Responsive-C8snjzxo.js";import"./index-vZN_Bsf0.js";import"./ArrowLeft-l9pGEy0M.js";import"./ArrowRight-BxFWJcl5.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-CTfP5CLL.js";import"./satserUtils-BFZ_C32Q.js";import"./stringUtils-DWuGC-tf.js";import"./Wallet-DVjw1ed4.js";import"./Spacer-BW3tgveW.js";const v={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},$={title:"steg/HvorMyeSteg",component:o,render:({hvorMye:c,hvemPlanlegger:g,arbeidssituasjon:S,gåTilNesteSide:E=R("button-click"),locale:M,satser:A})=>(j(),n.jsx(f,{initialEntries:[P.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:c,[t.HVEM_PLANLEGGER]:g,[t.ARBEIDSSITUASJON]:S},onDispatch:E,children:n.jsx(o,{locale:M,satser:A})})}))},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:u.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:v,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:u.MOR},arbeidssituasjon:{status:d.JOBBER},satser:v,hvorMye:{lønnSøker1:void 0}}};var a,s,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined,
      lønnSøker2: undefined
    }
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,l,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined
    }
  }
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const rr=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,rr as __namedExportsOrder,$ as default};
