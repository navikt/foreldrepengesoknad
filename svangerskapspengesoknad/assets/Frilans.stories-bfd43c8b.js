import{j as o}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as p}from"./FrilansStep-f42d945b.js";import{_ as c}from"./soknad-056e750f.js";import{S,C as r}from"./routes-345f7acb.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./validation-631bcf6e.js";import"./dateFormValidation-8cbaac98.js";import"./fridagerUtils-9d650fd8.js";import"./index-b580f7e8.js";import"./dates-1fe13765.js";import"./useFortsettSøknadSenere-ae1126db.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./index-47edccfa.js";import"./dateUtils-445f5d04.js";import"./BackButton-f80f5ffe.js";const B={title:"steps/FrilansStep",component:p},a=()=>(...e)=>(x("button-click")(...e),Promise.resolve()),n=c,d=({mellomlagreSøknadOgNaviger:e=a(),gåTilNesteSide:l})=>o.jsx(S,{onDispatch:l,initialState:{[r.INNTEKTSINFORMASJON]:{harJobbetSomFrilans:!0,harHattAnnenInntekt:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[r.TILRETTELEGGINGER]:n.søknad.tilrettelegging,[r.OM_BARNET]:n.søknad.barn},children:o.jsx(p,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:a(),søkerInfo:n.søkerinfo})}),t=d.bind({});var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harJobbetSomFrilans: true,
      harHattAnnenInntekt: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
    [ContextDataType.OM_BARNET]: context.søknad.barn
  }}>
            <FrilansStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const H=["Default"];export{t as Default,H as __namedExportsOrder,B as default};
