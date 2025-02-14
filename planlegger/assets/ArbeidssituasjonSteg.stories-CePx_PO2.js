import{j as o}from"./jsx-runtime-CLpGMVip.js";import{a as b}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as j,P as U,C as i}from"./usePlanleggerNavigator-DvczxTQD.js";import{P as f}from"./routes-Cyl7_Mgv.js";import{S as s}from"./HvemPlanleggerUtils-CzKVUhpa.js";import{A as R}from"./ArbeidssituasjonSteg-DafLSZRe.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./VeiviserPage-C7O1QSdG.js";import"./VStack-BfPiYV8A.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-q5P1ZqAS.js";import"./barnType-CnRI8jWg.js";import"./BlueRadioGroup-2HqTA9QR.js";import"./StepButtonsHookForm-mKptxFxi.js";import"./Responsive-Cl7tMJT2.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./customErrorFormatter-RUbEXImz.js";import"./PlanleggerStepPage-tAiaGuO2.js";import"./satserUtils-7zqjTyZ2.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-3CrpAqpr.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Checkmark-qoQsEnf3.js";import"./Spacer-zSi7sa7G.js";const t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},k=({hvemPlanlegger:S,gåTilNesteSide:F=b("button-click"),satser:O,locale:_})=>o.jsx(j,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:S},onDispatch:F,children:o.jsx(R,{satser:O,locale:_})})}),ar={title:"steg/ArbeidssituasjonSteg",component:R,render:k},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},satser:t}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,g,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(d=(g=e.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var v,u,A;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(A=(u=a.parameters)==null?void 0:u.docs)==null?void 0:A.source}}};var M,P,E;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(E=(P=n.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const nr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,nr as __namedExportsOrder,ar as default};
