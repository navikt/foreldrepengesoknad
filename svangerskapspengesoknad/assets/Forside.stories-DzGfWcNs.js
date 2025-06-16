import{H as S,j as s}from"./iframe-BSp1CvC8.js";import{c as h}from"./routes-CXQ4cg5P.js";import{h as k,a as c}from"./index-CmF21e0E.js";import{F as a}from"./Forside-CUmpMPeS.js";import"./List-BnTKFtxw.js";const v={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[]},N={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[{saksnummer:"702",familiehendelse:{termindato:"2025-09-12",antallBarn:0},sakAvsluttet:!1,åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknad:{arbeidsforhold:[{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"992260475",type:"ORGANISASJON"},arbeidsgiverNavn:"NAV FAMILIE- OG PENSJONSYTELSER STORD"},behovFrom:"2025-06-12",tilrettelegginger:[{fom:"2025-06-12",tom:"2025-08-21",type:"INGEN"}],oppholdsperioder:[]}]}},oppdatertTidspunkt:"2025-06-12T10:45:38.358"}]},{action:n}=__STORYBOOK_MODULE_ACTIONS__,g=()=>(...t)=>(n("button-click")(...t),Promise.resolve()),A={title:"pages/Forside",component:a,decorators:[S],render:({gåTilNesteSide:t=n("button-click"),...u})=>s.jsx(h,{onDispatch:t,children:s.jsx(a,{...u})})},e={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:g(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>c.json(v))]}}},r={args:{setHarGodkjentVilkår:n("button-click"),mellomlagreSøknadOgNaviger:g(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[k.get(".//rest/innsyn/v2/saker",()=>c.json(N))]}}};var o,i,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,p,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const G=["Default","MedEksisterendeSøknad"];export{e as Default,r as MedEksisterendeSøknad,G as __namedExportsOrder,A as default};
