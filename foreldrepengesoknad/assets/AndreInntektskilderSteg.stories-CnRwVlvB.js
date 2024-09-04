import{j as r}from"./jsx-runtime-CexXSJP5.js";import{a as s}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as p}from"./Uttaksplan-CIx8nvnt.js";import{M as d,F as c,C as S}from"./FpDataContext-CLfRphv-.js";import{S as u}from"./useFpNavigator-CX4xXzw_.js";import{A as m}from"./AndreInntektskilderSteg-BKgRuJDb.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-3vFTugDi.js";import"./Label-D9yH3wXA.js";import"./iframe-CZEZfifu.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./VStack-BiLf-1IQ.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./ErrorSummaryHookForm-CVY6T7Su.js";import"./Plus-BZVLbM7C.js";const J={title:"steps/AndreInntektskilderSteg",component:m},o=()=>(...e)=>(s("button-click")(...e),Promise.resolve()),k=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:l=s("button-click")})=>(p(),r.jsx(d,{initialEntries:[u.ANDRE_INNTEKTER],children:r.jsx(c,{onDispatch:l,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!0}},children:r.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=k.bind({});var n,i,a;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(a=(i=t.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const K=["Default"];export{t as Default,K as __namedExportsOrder,J as default};
