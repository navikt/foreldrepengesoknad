import{j as n}from"./jsx-runtime-Cw0GR0a5.js";import{a as R}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as f,P as b,C as t}from"./usePlanleggerNavigator-BlNZLooZ.js";import{P}from"./routes-gnI_NAHe.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as u}from"./HvemPlanleggerUtils-CRuekH12.js";import{i as j}from"./amplitude-BkHN_MpI.js";import{H as o}from"./HvorMyeSteg-DYK0dYga.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./UttaksdagenString-CIHKv-n2.js";import"./VStack-CL9KkpXr.js";import"./barnetUtils-DSW5SWB3.js";import"./barnType-CnRI8jWg.js";import"./VeiviserPage-DMWh4IvO.js";import"./index-BRV0Se7Z.js";import"./PlanleggerStepPage-4fo2lw1v.js";import"./StepButtonsHookForm-DRMXlWgh.js";import"./Responsive-DXvSXsD0.js";import"./index-BbmHap-z.js";import"./useDescendant-BhqfAzDh.js";import"./ArrowLeft-DucJ29WA.js";import"./ArrowRight-DKhFa6bH.js";import"./stringUtils-BLFzASq_.js";import"./hvemHarRettUtils-DaTWCV6h.js";import"./validation-DdAZ_Aa2.js";import"./dateFormValidation-dNhenV-l.js";import"./satserUtils-BLJwjcx3.js";import"./Wallet-BVwe51Pq.js";import"./Spacer-BW3tgveW.js";const v={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},er={title:"steg/HvorMyeSteg",component:o,render:({hvorMye:c,hvemPlanlegger:g,arbeidssituasjon:S,gåTilNesteSide:E=R("button-click"),locale:M,satser:A})=>(j(),n.jsx(f,{initialEntries:[P.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:c,[t.HVEM_PLANLEGGER]:g,[t.ARBEIDSSITUASJON]:S},onDispatch:E,children:n.jsx(o,{locale:M,satser:A})})}))},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:u.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:v,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:u.MOR},arbeidssituasjon:{status:d.JOBBER},satser:v,hvorMye:{lønnSøker1:void 0}}};var a,s,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,p,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const nr=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,nr as __namedExportsOrder,er as default};
