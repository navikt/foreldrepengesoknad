import{j as r}from"./Uttaksdagen-DrQ0Oxxl.js";import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as l}from"./ErrorSummaryHookForm-1nFoirfj.js";import{M as d,F as g,C as S}from"./FpDataContext-BW_0HfWx.js";import{S as c}from"./useFpNavigator-rsQS18v_.js";import{E as s}from"./EgenNæringSteg-DHXzO5aq.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./dateFormValidation-DXkRFCUV.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./EgenNæringPanel-CpYs4uEG.js";import"./numberFormValidation-D4iWMYX4.js";const J={title:"steps/EgenNæringSteg",component:s},o=()=>(...e)=>(p("button-click")(...e),Promise.resolve()),u=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:m})=>(l(),r.jsx(d,{initialEntries:[c.EGEN_NÆRING],children:r.jsx(g,{onDispatch:m,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:r.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=u.bind({});var i,n,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
