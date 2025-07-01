import{H as S,j as t}from"./iframe-B24QlUEB.js";import{c as h}from"./routes-vHid20My.js";import{h as m,a as k}from"./index-DJ5BE_k2.js";import{F as s}from"./Forside-BQfW_8ea.js";import"./List-B0W-Weln.js";const v={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[]},N={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[{saksnummer:"702",familiehendelse:{termindato:"2025-09-12",antallBarn:0},sakAvsluttet:!1,åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknad:{arbeidsforhold:[{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"992260475",type:"ORGANISASJON"},arbeidsgiverNavn:"NAV FAMILIE- OG PENSJONSYTELSER STORD"},behovFrom:"2025-06-12",tilrettelegginger:[{fom:"2025-06-12",tom:"2025-08-21",type:"INGEN"}],oppholdsperioder:[]}]}},oppdatertTidspunkt:"2025-06-12T10:45:38.358"}]},{action:n}=__STORYBOOK_MODULE_ACTIONS__,c=()=>()=>(n("button-click")(),Promise.resolve()),A={title:"pages/Forside",component:s,decorators:[S],render:({gåTilNesteSide:g=n("button-click"),...u})=>t.jsx(h,{onDispatch:g,children:t.jsx(s,{...u})})},e={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:c(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[m.get(".//rest/innsyn/v2/saker",()=>k.json(v))]}}},r={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:c(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[m.get(".//rest/innsyn/v2/saker",()=>k.json(N))]}}};var a,o,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(i=(o=e.parameters)==null?void 0:o.docs)==null?void 0:i.source}}};var l,d,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const G=["Default","MedEksisterendeSøknad"];export{e as Default,r as MedEksisterendeSøknad,G as __namedExportsOrder,A as default};
