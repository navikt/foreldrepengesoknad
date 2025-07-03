import{j as o}from"./iframe-ClkbrzSB.js";import{M as S,P as U,C as i}from"./usePlanleggerNavigator-B6vDRMOc.js";import{P as T}from"./routes-Cyl7_Mgv.js";import{H as s}from"./HvemPlanleggerUtils-5H2S_3Nj.js";import{A as E}from"./ArbeidssituasjonSteg-NJYwvVCL.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DutV4Y9k.js";import"./BlueRadioGroup-CkAipmw6.js";import"./customErrorFormatter-CZoJ6xrL.js";import"./PlanleggerStepPage-r9vMsIeg.js";import"./satserUtils-l5irKFdK.js";import"./useScrollBehaviour-CglsPqv2.js";import"./Spacer-BeN815oP.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j=({hvemPlanlegger:R,gåTilNesteSide:_=f("button-click"),satser:F})=>o.jsx(S,{initialEntries:[T.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:R},onDispatch:_,children:o.jsx(E,{satser:F})})}),I={title:"steg/ArbeidssituasjonSteg",component:E,render:j},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},satser:t}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};var l,m,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(g=(m=e.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var p,d,v;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(v=(d=r.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var c,A,P;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(P=(A=a.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var u,M,O;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(O=(M=n.parameters)==null?void 0:M.docs)==null?void 0:O.source}}};const J=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{r as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,e as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,J as __namedExportsOrder,I as default};
