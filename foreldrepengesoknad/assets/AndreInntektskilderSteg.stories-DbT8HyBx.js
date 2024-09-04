import{j as r}from"./Uttaksdagen-CVi1UdfS.js";import{a as s}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as p}from"./Uttaksplan-C-q_5N0-.js";import{M as d,F as c,C as S}from"./FpDataContext-Bw3l41n2.js";import{S as u}from"./useFpNavigator-BE1soRC3.js";import{A as m}from"./AndreInntektskilderSteg-DaGaNyZW.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./Plus-B3Jq1k4K.js";const H={title:"steps/AndreInntektskilderSteg",component:m},o=()=>(...e)=>(s("button-click")(...e),Promise.resolve()),k=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:l=s("button-click")})=>(p(),r.jsx(d,{initialEntries:[u.ANDRE_INNTEKTER],children:r.jsx(c,{onDispatch:l,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!0}},children:r.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=k.bind({});var n,i,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.ANDRE_INNTEKTER]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
        harJobbetSomFrilans: false,
        harJobbetSomSelvstendigNæringsdrivende: false,
        harHattAndreInntektskilder: true
      }
    }}>
                <AndreInntektskilderSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={[]} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const J=["Default"];export{t as Default,J as __namedExportsOrder,H as default};
