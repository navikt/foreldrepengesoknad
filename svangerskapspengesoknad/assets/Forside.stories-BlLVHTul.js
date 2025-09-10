import{J as d,j as t}from"./iframe-BTBPA1fO.js";import{c as m}from"./routes-Da_foFPc.js";import{h as a,a as o}from"./index-DLYzKiYx.js";import{F as s}from"./Forside-DZQALrI_.js";import"./preload-helper-D9Z9MdNV.js";import"./List-CaGYlwVn.js";const k={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[]},c={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[{saksnummer:"702",familiehendelse:{termindato:"2025-09-12",antallBarn:0},sakAvsluttet:!1,åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknad:{arbeidsforhold:[{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"992260475",type:"ORGANISASJON"},arbeidsgiverNavn:"NAV FAMILIE- OG PENSJONSYTELSER STORD"},behovFrom:"2025-06-12",tilrettelegginger:[{fom:"2025-06-12",tom:"2025-08-21",type:"INGEN"}],oppholdsperioder:[]}]}},oppdatertTidspunkt:"2025-06-12T10:45:38.358"}]},{action:n}=__STORYBOOK_MODULE_ACTIONS__,i=()=>()=>(n("button-click")(),Promise.resolve()),f={title:"pages/Forside",component:s,decorators:[d],render:({gåTilNesteSide:l=n("button-click"),...p})=>t.jsx(m,{onDispatch:l,children:t.jsx(s,{...p})})},e={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:i(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[a.get(".//rest/innsyn/v2/saker",()=>o.json(k))]}}},r={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:i(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[a.get(".//rest/innsyn/v2/saker",()=>o.json(c))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    setHarGodkjentVilkår: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction(),
    harGodkjentVilkår: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(ingenSaker))]
    }
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    setHarGodkjentVilkår: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction(),
    harGodkjentVilkår: false
  },
  parameters: {
    msw: {
      handlers: [http.get(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/saker\`, () => HttpResponse.json(saker))]
    }
  }
}`,...r.parameters?.docs?.source}}};const j=["Default","MedEksisterendeSøknad"];export{e as Default,r as MedEksisterendeSøknad,j as __namedExportsOrder,f as default};
