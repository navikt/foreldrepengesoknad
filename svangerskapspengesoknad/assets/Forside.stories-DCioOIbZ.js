import{J as m,j as s}from"./iframe-BiYp680F.js";import{c as k}from"./routes-CGBprxaH.js";import{h as n,A as o,a as i}from"./index-qygDrpiP.js";import{F as a}from"./Forside-BwyFNOYN.js";import"./preload-helper-D9Z9MdNV.js";import"./List-CKfZ9cIM.js";const c={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[]},g={foreldrepenger:[],engangsstønad:[],svangerskapspenger:[{saksnummer:"702",familiehendelse:{termindato:"2025-09-12",antallBarn:0},sakAvsluttet:!1,åpenBehandling:{tilstand:"VENT_INNTEKTSMELDING",søknad:{arbeidsforhold:[{aktivitet:{type:"ORDINÆRT_ARBEID",arbeidsgiver:{id:"992260475",type:"ORGANISASJON"},arbeidsgiverNavn:"NAV FAMILIE- OG PENSJONSYTELSER STORD"},behovFrom:"2025-06-12",tilrettelegginger:[{fom:"2025-06-12",tom:"2025-08-21",type:"INGEN"}],oppholdsperioder:[]}]}},oppdatertTidspunkt:"2025-06-12T10:45:38.358"}]},{action:t}=__STORYBOOK_MODULE_ACTIONS__,l=()=>()=>(t("button-click")(),Promise.resolve()),O={title:"pages/Forside",component:a,decorators:[m],render:({gåTilNesteSide:d=t("button-click"),...p})=>s.jsx(k,{onDispatch:d,children:s.jsx(a,{...p})})},e={args:{setHarGodkjentVilkår:t("button-click"),mellomlagreSøknadOgNaviger:l(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[n.get(o.saker,()=>i.json(c))]}}},r={args:{setHarGodkjentVilkår:t("button-click"),mellomlagreSøknadOgNaviger:l(),harGodkjentVilkår:!1},parameters:{msw:{handlers:[n.get(o.saker,()=>i.json(g))]}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    setHarGodkjentVilkår: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction(),
    harGodkjentVilkår: false
  },
  parameters: {
    msw: {
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(ingenSaker))]
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
      handlers: [http.get(API_URLS.saker, () => HttpResponse.json(saker))]
    }
  }
}`,...r.parameters?.docs?.source}}};const v=["Default","MedEksisterendeSøknad"];export{e as Default,r as MedEksisterendeSøknad,v as __namedExportsOrder,O as default};
