import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{a as S}from"./index-B-lxVbXh.js";import{M as U,P as T,C as i}from"./usePlanleggerNavigator-CA8DfEuq.js";import{P as f}from"./routes-Cyl7_Mgv.js";import"./VeiviserPage-8Wpng40q.js";import{H as t}from"./HvemPlanleggerType-CugjyLV2.js";import{A as R}from"./ArbeidssituasjonSteg-DrI9GMF1.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DWx8ZgD2.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-ZKU_BOQQ.js";import"./barnType-CnRI8jWg.js";import"./VStack-TyG4_st1.js";import"./BlueRadioGroup-Dd5QY42l.js";import"./StepButtonsHookForm-877k_zyp.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-3gl0cHrT.js";import"./customErrorFormatter-AuWeTsWn.js";import"./PlanleggerStepPage-BewzdlxV.js";import"./satserUtils-0x8Oi8-g.js";import"./validation-Dy1ue2_T.js";import"./dateFormValidation-BJvWp8x7.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./Checkmark-BGP8o-VH.js";import"./Spacer-AgKh28B3.js";const s={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j=({hvemPlanlegger:F,gåTilNesteSide:O=S("button-click"),satser:_,locale:b})=>o.jsx(U,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(T,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:F},onDispatch:O,children:o.jsx(R,{satser:_,locale:b})})}),tr={title:"steg/ArbeidssituasjonSteg",component:R,render:j},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},satser:s}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var g,c,d;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(d=(c=e.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var v,A,P;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(P=(A=a.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var u,M,E;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(E=(M=n.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};const sr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,sr as __namedExportsOrder,tr as default};
