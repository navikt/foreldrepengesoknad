import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a as b}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as j,P as U,C as i}from"./usePlanleggerNavigator-Cm6vQNA1.js";import{P as f}from"./routes-gnI_NAHe.js";import{S as t}from"./HvemPlanleggerUtils-CRuekH12.js";import{i as k}from"./amplitude-CwVHyeVN.js";import{A as R}from"./ArbeidssituasjonSteg-CcFghVNm.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./composeEventHandlers-CQxkItEI.js";import"./VStack-CL9KkpXr.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DlK2ezHC.js";import"./barnType-CnRI8jWg.js";import"./VeiviserPage-96q4z1iB.js";import"./index-BRV0Se7Z.js";import"./BlueRadioGroup-BXetq7PL.js";import"./StepButtonsHookForm-BKlDxIoe.js";import"./Responsive-DXvSXsD0.js";import"./index-BbmHap-z.js";import"./useDescendant-BRdZoW52.js";import"./ArrowLeft-DucJ29WA.js";import"./ArrowRight-DKhFa6bH.js";import"./stringUtils-BLFzASq_.js";import"./customErrorFormatter-BAPWT5E-.js";import"./PlanleggerStepPage-CSYOuldx.js";import"./satserUtils-Crj2HgKZ.js";import"./validation-DdAZ_Aa2.js";import"./dateFormValidation-akPD_OBx.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./Checkmark-BTbDdFPG.js";import"./Spacer-BW3tgveW.js";const s={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},h=({hvemPlanlegger:S,gåTilNesteSide:F=b("button-click"),satser:O,locale:_})=>(k(),o.jsx(j,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:S},onDispatch:F,children:o.jsx(R,{satser:O,locale:_})})})),lr={title:"steg/ArbeidssituasjonSteg",component:R,render:h},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:t.MOR_OG_FAR},satser:s}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:t.MOR},satser:s}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:t.MOR_OG_MEDMOR},satser:s}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},satser:s}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var c,d,g;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var v,u,A;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(E=(P=n.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const pr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,pr as __namedExportsOrder,lr as default};
