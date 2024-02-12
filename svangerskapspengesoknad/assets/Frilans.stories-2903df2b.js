import{j as e}from"./Modal-5f6515f6.js";import{a as x}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as p}from"./FrilansStep-596e6af1.js";import{_ as c}from"./soknad-056e750f.js";import{S as d,C as o}from"./routes-345f7acb.js";import{M as S}from"./index-0df0c4a0.js";import"./index-f1f2c4b1.js";import"./index-da441cba.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./validation-631bcf6e.js";import"./dateFormValidation-c112d50a.js";import"./fridagerUtils-bf3b07ca.js";import"./index-b580f7e8.js";import"./dates-5d9af962.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./useFortsettSøknadSenere-40515bb0.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./amplitude-672a2544.js";import"./dateUtils-8598b125.js";import"./ErrorSummaryHookForm-2c6d2e49.js";import"./isNativeReflectConstruct-554b52b6.js";import"./check-dates-d5278c7f.js";import"./ArrowRight-7eea1688.js";import"./IntlProvider-63c24ec3.js";import"./links-439b6638.js";import"./VStack-ea079a1e.js";import"./HStack-13158dfb.js";import"./Alert-ddc59fb2.js";import"./Paperplane-3462cdad.js";import"./createIntl-f391d6e4.js";const X={title:"steps/FrilansStep",component:p},i=()=>(...r)=>(x("button-click")(...r),Promise.resolve()),n=c,g=({mellomlagreSøknadOgNaviger:r=i(),gåTilNesteSide:l})=>e.jsx(S,{children:e.jsx(d,{onDispatch:l,initialState:{[o.INNTEKTSINFORMASJON]:{harJobbetSomFrilans:!0,harHattAnnenInntekt:!1,harJobbetSomSelvstendigNæringsdrivende:!1},[o.TILRETTELEGGINGER]:n.søknad.tilrettelegging,[o.OM_BARNET]:n.søknad.barn},children:e.jsx(p,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:i(),søkerInfo:n.søkerinfo})})}),t=g.bind({});var a,m,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  return <MemoryRouter>
            <SvpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.INNTEKTSINFORMASJON]: {
        harJobbetSomFrilans: true,
        harHattAnnenInntekt: false,
        harJobbetSomSelvstendigNæringsdrivende: false
      },
      [ContextDataType.TILRETTELEGGINGER]: context.søknad.tilrettelegging,
      [ContextDataType.OM_BARNET]: context.søknad.barn
    }}>
                <FrilansStep mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} søkerInfo={context.søkerinfo} />
            </SvpDataContext>
        </MemoryRouter>;
}`,...(s=(m=t.parameters)==null?void 0:m.docs)==null?void 0:s.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
