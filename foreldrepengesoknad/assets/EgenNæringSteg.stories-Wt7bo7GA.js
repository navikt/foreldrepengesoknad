import{j as r}from"./jsx-runtime-CexXSJP5.js";import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as l}from"./Uttaksplan-CIx8nvnt.js";import{M as d,F as g,C as S}from"./FpDataContext-CLfRphv-.js";import{S as c}from"./useFpNavigator-CX4xXzw_.js";import{E as s}from"./EgenNæringSteg-CQFK_WUl.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-3vFTugDi.js";import"./Label-D9yH3wXA.js";import"./iframe-CZEZfifu.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./VStack-BiLf-1IQ.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./EgenNæringPanel-wVfd4Q8N.js";import"./ErrorSummaryHookForm-CVY6T7Su.js";import"./numberFormValidation-nq9_T3w6.js";const J={title:"steps/EgenNæringSteg",component:s},o=()=>(...e)=>(p("button-click")(...e),Promise.resolve()),u=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:m})=>(l(),r.jsx(d,{initialEntries:[c.EGEN_NÆRING],children:r.jsx(g,{onDispatch:m,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:r.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=u.bind({});var i,n,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.EGEN_NÆRING]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
        harJobbetSomSelvstendigNæringsdrivende: true,
        harHattAndreInntektskilder: false,
        harJobbetSomFrilans: false
      }
    }}>
                <EgenNæringSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={[]} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const M=["Default"];export{t as Default,M as __namedExportsOrder,J as default};
