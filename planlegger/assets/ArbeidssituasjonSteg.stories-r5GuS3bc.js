import{j as o}from"./iframe-DYD6BlSH.js";import{M as S,P as U,C as i}from"./usePlanleggerNavigator-C6Sph3Vp.js";import{P as T}from"./routes-Cyl7_Mgv.js";import{H as s}from"./HvemPlanleggerUtils-BEUoFL1z.js";import{A as E}from"./ArbeidssituasjonSteg-R4m9wTnP.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DTbMt5dp.js";import"./BlueRadioGroup-B0MxDaKp.js";import"./customErrorFormatter-ClBn-nw0.js";import"./PlanleggerStepPage-Dt1_AoND.js";import"./satserUtils-Db1ZVMAu.js";import"./useScrollBehaviour-yQI5uWdj.js";import"./Spacer-C3TgO8c8.js";const{action:f}=__STORYBOOK_MODULE_ACTIONS__,t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j=({hvemPlanlegger:R,gåTilNesteSide:_=f("button-click"),satser:F})=>o.jsx(S,{initialEntries:[T.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:R},onDispatch:_,children:o.jsx(E,{satser:F})})}),I={title:"steg/ArbeidssituasjonSteg",component:E,render:j},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},satser:t}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};var l,m,g;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
