import{j as r}from"./Modal-5f6515f6.js";import{a as d}from"./chunk-WFFRPTHA-80d37c1b.js";import{_ as x}from"./soknad-056e750f.js";import{S as c,C as o}from"./routes-345f7acb.js";import{A as p}from"./ArbeidIUtlandetStep-97b1a9ba.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./fridagerUtils-9d650fd8.js";import"./index-b580f7e8.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./useFortsettSøknadSenere-ae1126db.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./dateFormValidation-8cbaac98.js";import"./dates-1fe13765.js";import"./dateUtils-445f5d04.js";import"./HorizontalLine-831b0129.js";import"./validation-631bcf6e.js";import"./BackButton-f80f5ffe.js";import"./Plus-b48ff6db.js";const K={title:"steps/ArbeidIUtlandet",component:p},n=()=>(...e)=>(d("button-click")(...e),Promise.resolve()),a=x,S=({mellomlagreSøknadOgNaviger:e=n(),gåTilNesteSide:l})=>r.jsx(c,{onDispatch:l,initialState:{[o.INNTEKTSINFORMASJON]:{harHattAnnenInntekt:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[o.OM_BARNET]:a.søknad.barn},children:r.jsx(p,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:n(),søkerInfo:a.søkerinfo})}),t=S.bind({});var i,s,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
    [ContextDataType.INNTEKTSINFORMASJON]: {
      harHattAnnenInntekt: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    [ContextDataType.OM_BARNET]: context.søknad.barn
  }}>
            <ArbeidIUtlandetStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
        </SvpDataContext>;
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};const P=["Default"];export{t as Default,P as __namedExportsOrder,K as default};
