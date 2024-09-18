import{j as P}from"./VStack-1BYz4cx9.js";import{A as a}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as t}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{U as s}from"./UforutsetteEndringer-DAOoLCjv.js";import"./index-CTjT7uj6.js";import"./Label-xTGzdijQ.js";import"./amplitude-oEVdNv_j.js";import"./VeiviserPage-CD2w7MX0.js";import"./index-BRV0Se7Z.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./PersonPregnant-CCkY59BK.js";import"./ExpansionCard--vI4M-QZ.js";const y={title:"steg/PlanenDeresSteg/components/UforutsetteEndringer",component:s,render:({hvemPlanlegger:b,barnet:M,arbeidssituasjon:c})=>P.jsx(s,{arbeidssituasjon:c,hvemPlanlegger:b,barnet:M})},r={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!0},barnet:{antallBarn:"2",overtakelsesdato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!1,erBarnetFødt:!0}}},e={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.INGEN,jobberAnnenPart:!0},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}},n={args:{hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Mor",navnPåFar:"Far"},arbeidssituasjon:{status:a.JOBBER,jobberAnnenPart:!1},barnet:{antallBarn:"1",termindato:"2022-01-01",fødselsdato:"2022-01-01",erFødsel:!0,erBarnetFødt:!0}}};var o,d,l;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
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
}`,...(l=(d=r.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var u,i,m;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
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
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var F,p,g;n.parameters={...n.parameters,docs:{...(F=n.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.MOR_OG_FAR,
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
}`,...(g=(p=n.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const H=["AdopsjonMorOgFarBeggeHarRettToBarn","FødselMorOgFarKunFarHarRett","FødselMorOgFarKunMorHarRett"];export{r as AdopsjonMorOgFarBeggeHarRettToBarn,e as FødselMorOgFarKunFarHarRett,n as FødselMorOgFarKunMorHarRett,H as __namedExportsOrder,y as default};
