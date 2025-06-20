import{j as n}from"./iframe-BSnBYb0H.js";import{M as R,P as A,C as t}from"./usePlanleggerNavigator-CtW8Zg21.js";import{P}from"./routes-Cyl7_Mgv.js";import{A as g}from"./Arbeidssituasjon-i2z_eSVB.js";import{H as d}from"./HvemPlanleggerUtils-tY-ycf-D.js";import{H as a}from"./HvorMyeSteg-DN7PVolB.js";import"./barnetUtils-C4R--m3k.js";import"./PlanleggerStepPage-C3SgeqXX.js";import"./hvemHarRettUtils-TmteFj5U.js";import"./satserUtils-CNGTdJGW.js";import"./Wallet-BcgmTODB.js";import"./Spacer-CYP_imde.js";const{action:O}=__STORYBOOK_MODULE_ACTIONS__,v={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},x={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:u,hvemPlanlegger:c,arbeidssituasjon:E,gåTilNesteSide:M=O("button-click"),satser:S})=>n.jsx(R,{initialEntries:[P.HVOR_MYE],children:n.jsx(A,{initialState:{[t.HVOR_MYE]:u,[t.HVEM_PLANLEGGER]:c,[t.ARBEIDSSITUASJON]:E},onDispatch:M,children:n.jsx(a,{satser:S})})})},e={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:d.MOR_OG_FAR},arbeidssituasjon:{status:g.JOBBER,jobberAnnenPart:!0},satser:v,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:d.MOR},arbeidssituasjon:{status:g.JOBBER},satser:v,hvorMye:{lønnSøker1:void 0}}};var s,o,i;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined
    }
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const D=["FlereForsørgere","AleneforsørgerMor"];export{r as AleneforsørgerMor,e as FlereForsørgere,D as __namedExportsOrder,x as default};
