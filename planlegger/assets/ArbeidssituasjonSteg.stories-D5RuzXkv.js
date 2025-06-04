import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{a as S}from"./index-B-lxVbXh.js";import{M as U,P as T,C as i}from"./usePlanleggerNavigator-79nakA9I.js";import{P as f}from"./routes-Cyl7_Mgv.js";import"./VeiviserPage-CHSQEW6u.js";import{H as s}from"./HvemPlanleggerUtils-BRHn8u1k.js";import{A as R}from"./ArbeidssituasjonSteg-S3jrdif2.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DYBBskKi.js";import"./barnType-CnRI8jWg.js";import"./VStack-05Ww9A8B.js";import"./stringUtils-DApHD7Y2.js";import"./BlueRadioGroup-CxMdCoFR.js";import"./StepButtonsHookForm-DAulkPa7.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./customErrorFormatter-AuWeTsWn.js";import"./PlanleggerStepPage-ChY5fp_x.js";import"./satserUtils-9JOgwpQY.js";import"./validation-Dy1ue2_T.js";import"./dateFormValidation-DphE57k6.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./Checkmark-DM1nKV0w.js";import"./Spacer-C5GDfzOr.js";const t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j=({hvemPlanlegger:F,gåTilNesteSide:O=S("button-click"),satser:_})=>o.jsx(U,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(T,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:F},onDispatch:O,children:o.jsx(R,{satser:_})})}),ar={title:"steg/ArbeidssituasjonSteg",component:R,render:j},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},e={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},satser:t}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var g,d,v;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(v=(d=e.parameters)==null?void 0:d.docs)==null?void 0:v.source}}};var c,A,P;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(P=(A=a.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var u,M,E;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(E=(M=n.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};const nr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,nr as __namedExportsOrder,ar as default};
