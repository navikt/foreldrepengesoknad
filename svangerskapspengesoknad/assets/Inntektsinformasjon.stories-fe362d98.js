import{j as o}from"./Modal-5f6515f6.js";import{a as d}from"./chunk-WFFRPTHA-80d37c1b.js";import{I as m}from"./Inntektsinformasjon-de4a2520.js";import{_ as l}from"./soknad-056e750f.js";import{S as x,C as r}from"./routes-345f7acb.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-bf3b07ca.js";import"./index-b580f7e8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c112d50a.js";import"./dates-5d9af962.js";import"./useFortsettSøknadSenere-40515bb0.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./ArbeidsforholdInformasjon-743d756d.js";import"./links-439b6638.js";import"./ExpansionCard-9832699c.js";import"./Alert-ddc59fb2.js";import"./BackButton-f80f5ffe.js";const U={title:"steps/Inntektsinformasjon",component:m},n=()=>(...e)=>(d("button-click")(...e),Promise.resolve()),c=({mellomlagreSøknadOgNaviger:e=n(),gåTilNesteSide:p})=>o.jsx(x,{onDispatch:p,initialState:{[r.UTENLANDSOPPHOLD]:{iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!0},[r.OM_BARNET]:{erBarnetFødt:!1,termindato:"2024-02-18",fødselsdato:"2024-02-18"}},children:o.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:n(),søkerInfo:l.søkerinfo})}),t=c.bind({});var a,i,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.UTENLANDSOPPHOLD]: {
      iNorgeNeste12Mnd: true,
      iNorgeSiste12Mnd: true
    },
    [ContextDataType.OM_BARNET]: {
      erBarnetFødt: false,
      termindato: '2024-02-18',
      fødselsdato: '2024-02-18'
    }
  }}>
            <Inntektsinformasjon mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={(soknad.søkerinfo as any)} />
        </SvpDataContext>;
}`,...(s=(i=t.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const q=["Default"];export{t as Default,q as __namedExportsOrder,U as default};
