import{j as o}from"./jsx-runtime-CLpGMVip.js";import{a as b}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as j,P as U,C as i}from"./usePlanleggerNavigator-DXWNGG0W.js";import{P as f}from"./routes-gnI_NAHe.js";import{S as t}from"./HvemPlanleggerUtils-BK9nF1ca.js";import{A as R}from"./ArbeidssituasjonSteg-8cNY5Jk8.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./UttaksdagenString-DZRvsvH4.js";import"./VStack-D_n2pLOa.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DZa-yFdT.js";import"./barnType-CnRI8jWg.js";import"./BlueRadioGroup-BA8hWJNq.js";import"./StepButtonsHookForm-DG-h9OTV.js";import"./VeiviserPage-XL7TpHKm.js";import"./Responsive-CdbskSYN.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./useDescendant-BzwzV3Ua.js";import"./ArrowLeft-DNFuY2Zh.js";import"./ArrowRight-BqU9Gr9z.js";import"./stringUtils-BLFzASq_.js";import"./customErrorFormatter-BQTSu9Hw.js";import"./PlanleggerStepPage-DJx4ooEt.js";import"./satserUtils-bn4SJB-X.js";import"./validation-C6jaRJB5.js";import"./dateFormValidation-D0AFPq5M.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Checkmark-Bmw2nUaE.js";import"./Spacer-zSi7sa7G.js";const s={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},k=({hvemPlanlegger:S,gåTilNesteSide:F=b("button-click"),satser:O,locale:_})=>o.jsx(j,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:S},onDispatch:F,children:o.jsx(R,{satser:O,locale:_})})}),ir={title:"steg/ArbeidssituasjonSteg",component:R,render:k},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},satser:s}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var c,g,d;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(E=(P=n.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const mr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,mr as __namedExportsOrder,ir as default};
