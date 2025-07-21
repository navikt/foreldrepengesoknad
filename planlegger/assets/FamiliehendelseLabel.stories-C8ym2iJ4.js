import{F as t}from"./FamiliehendelseLabel-CMiz-Odi.js";import"./iframe-DQwDPExg.js";import"./barnetUtils-DIdrQew2.js";import"./uttakUtils-DKqwTozJ.js";import"./HvemPlanleggerUtils-CHX4c2X2.js";import"./CalendarIconLabel-D-66Cgsi.js";const c={title:"components/FamiliehendelseLabel",component:t},e={args:{barnet:{antallBarn:"1",erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-04"}}},r={args:{barnet:{antallBarn:"1",erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-04"}}},a={args:{barnet:{antallBarn:"1",erBarnetFødt:!0,erFødsel:!1,fødselsdato:"2024-01-04",overtakelsesdato:"2024-01-04"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    barnet: {
      antallBarn: '1',
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-01-04'
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    barnet: {
      antallBarn: '1',
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-04'
    }
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    barnet: {
      antallBarn: '1',
      erBarnetFødt: true,
      erFødsel: false,
      fødselsdato: '2024-01-04',
      overtakelsesdato: '2024-01-04'
    }
  }
}`,...a.parameters?.docs?.source}}};const p=["FødselLabel","TermindatoLabel","OmsorgsovertakelseLabel"];export{e as FødselLabel,a as OmsorgsovertakelseLabel,r as TermindatoLabel,p as __namedExportsOrder,c as default};
