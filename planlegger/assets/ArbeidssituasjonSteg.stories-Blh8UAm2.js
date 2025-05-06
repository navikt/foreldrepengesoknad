import{j as o}from"./jsx-runtime-CLpGMVip.js";import{a as S}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as U,P as T,C as i}from"./usePlanleggerNavigator-D5A2C4Zt.js";import{P as f}from"./routes-Cyl7_Mgv.js";import"./VeiviserPage-BKHwxsHN.js";import{H as t}from"./HvemPlanleggerType-CugjyLV2.js";import{A as R}from"./ArbeidssituasjonSteg--crnDOGx.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-DYtKJeZ8.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-CpVLOGVp.js";import"./barnType-CnRI8jWg.js";import"./VStack-2apmvZh_.js";import"./BlueRadioGroup-9bzc3Irv.js";import"./StepButtonsHookForm-Dz1pU4zH.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./customErrorFormatter-RUbEXImz.js";import"./PlanleggerStepPage-74yA8_eh.js";import"./satserUtils-DcUqk7-n.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-v0HcUGOV.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Checkmark-DkUBrDzq.js";import"./Spacer-DmBY75Fg.js";const s={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},j=({hvemPlanlegger:F,gåTilNesteSide:O=S("button-click"),satser:_,locale:b})=>o.jsx(U,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(T,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:F},onDispatch:O,children:o.jsx(R,{satser:_,locale:b})})}),tr={title:"steg/ArbeidssituasjonSteg",component:R,render:j},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},satser:s}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
