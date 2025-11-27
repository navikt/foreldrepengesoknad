import{j as u}from"./iframe-CFDKleqI.js";import{A as a,H as t}from"./HvemPlanleggerUtils-C8FvzZ4X.js";import{U as s}from"./UforutsetteEndringer-DroL7hFm.js";import"./preload-helper-D9Z9MdNV.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./hvemHarRettUtils-i7Dfjx-0.js";import"./PersonPregnant-Bzq4SBFK.js";const c={title:"steg/PlanenDeresSteg/components/UforutsetteEndringer",component:s,render:({hvemPlanlegger:o,barnet:d,arbeidssituasjon:l})=>u.jsx(s,{arbeidssituasjon:l,hvemPlanlegger:o,barnet:d})},r={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"2",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},e={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},n={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const v=["AdopsjonMorOgFarBeggeHarRettToBarn","FødselMorOgFarKunFarHarRett","FødselMorOgFarKunMorHarRett"];export{r as AdopsjonMorOgFarBeggeHarRettToBarn,e as FødselMorOgFarKunFarHarRett,n as FødselMorOgFarKunMorHarRett,v as __namedExportsOrder,c as default};
