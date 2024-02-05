import{j as o}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{V as p}from"./VelgArbeid-88645fb1.js";import{_ as d}from"./soknad-056e750f.js";import{S as c,C as r}from"./routes-345f7acb.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-57eeeb7b.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./useFortsettSøknadSenere-e239225e.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./validation-631bcf6e.js";import"./dateFormValidation-78b19ee9.js";import"./dates-ef312fee.js";import"./BackButton-f80f5ffe.js";const L={title:"steps/VelgArbeid",component:p},n=()=>(...e)=>(x("button-click")(...e),Promise.resolve()),a=d,S=({mellomlagreSøknadOgNaviger:e=n(),gåTilNesteSide:l})=>o.jsx(c,{onDispatch:l,initialState:{[r.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[r.TILRETTELEGGINGER]:[],[r.OM_BARNET]:a.søknad.barn},children:o.jsx(p,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:n(),søkerInfo:a.søkerinfo})}),t=S.bind({});var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: false,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: [],
    [ContextDataType.OM_BARNET]: context.søknad.barn
  }}>
            <VelgArbeid mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const M=["Default"];export{t as Default,M as __namedExportsOrder,L as default};
