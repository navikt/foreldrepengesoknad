import{j as u}from"./iframe-CEvsz2vt.js";import{A as a}from"./Arbeidssituasjon-i2z_eSVB.js";import{H as t}from"./HvemPlanleggerUtils-Cr6VmqTZ.js";import{U as s}from"./UforutsetteEndringer-Dm_Yl4Vw.js";import"./preload-helper-D9Z9MdNV.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./hvemHarRettUtils-BXUnNEJ4.js";import"./PersonPregnant-C1mrG_yn.js";const v={title:"steg/PlanenDeresSteg/components/UforutsetteEndringer",component:s,render:({hvemPlanlegger:o,barnet:d,arbeidssituasjon:l})=>u.jsx(s,{arbeidssituasjon:l,hvemPlanlegger:o,barnet:d})},r={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"2",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},e={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},n={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '2',
      overtakelsesdato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: false,
      erBarnetFødt: true
    }
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Mor',
      navnPåFar: 'Far'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    barnet: {
      antallBarn: '1',
      termindato: '2022-01-01',
      fødselsdato: '2022-01-01',
      erFødsel: true,
      erBarnetFødt: true
    }
  }
}`,...n.parameters?.docs?.source}}};const B=["AdopsjonMorOgFarBeggeHarRettToBarn","FødselMorOgFarKunFarHarRett","FødselMorOgFarKunMorHarRett"];export{r as AdopsjonMorOgFarBeggeHarRettToBarn,e as FødselMorOgFarKunFarHarRett,n as FødselMorOgFarKunMorHarRett,B as __namedExportsOrder,v as default};
