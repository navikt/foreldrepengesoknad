import{j as r}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{E as s}from"./EgenNæringStep-4a34a1f4.js";import{_ as c}from"./soknad-056e750f.js";import{S as g,C as o}from"./routes-345f7acb.js";import{M as d}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./egenNæringFormUtils-49aad5b8.js";import"./fridagerUtils-bf3b07ca.js";import"./index-b580f7e8.js";import"./dateUtils-8598b125.js";import"./useFortsettSøknadSenere-40515bb0.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./dateFormValidation-c112d50a.js";import"./dates-5d9af962.js";import"./ErrorSummaryHookForm-2c6d2e49.js";import"./isNativeReflectConstruct-554b52b6.js";import"./check-dates-d5278c7f.js";import"./ArrowRight-7eea1688.js";import"./IntlProvider-63c24ec3.js";import"./links-439b6638.js";import"./VStack-ea079a1e.js";import"./HStack-13158dfb.js";import"./Alert-ddc59fb2.js";import"./Paperplane-3462cdad.js";import"./createIntl-f391d6e4.js";import"./validation-631bcf6e.js";const Y={title:"steps/EgenNæringStep",component:s},i=()=>(...e)=>(x("button-click")(...e),Promise.resolve()),n=c,S=({mellomlagreSøknadOgNaviger:e=i(),gåTilNesteSide:l})=>r.jsx(d,{children:r.jsx(g,{onDispatch:l,initialState:{[o.INNTEKTSINFORMASJON]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAnnenInntekt:!1,harJobbetSomFrilans:!1},[o.TILRETTELEGGINGER]:n.søknad.tilrettelegging,[o.OM_BARNET]:n.søknad.barn},children:r.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:i(),søkerInfo:n.søkerinfo})})}),t=S.bind({});var a,m,p;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <MemoryRouter>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harJobbetSomSelvstendigNæringsdrivende: true,
        harHattAnnenInntekt: false,
        harJobbetSomFrilans: false
      },
      [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
      [ContextDataType.OM_BARNET]: context.søknad.barn
    }}>
                <EgenNæringStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Z=["Default"];export{t as Default,Z as __namedExportsOrder,Y as default};
