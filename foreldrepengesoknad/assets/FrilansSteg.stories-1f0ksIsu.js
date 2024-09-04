import{j as r}from"./jsx-runtime-CexXSJP5.js";import{a as s}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as p}from"./Uttaksplan-CIx8nvnt.js";import{M as d,F as c,C as S}from"./FpDataContext-CLfRphv-.js";import{S as u}from"./useFpNavigator-CX4xXzw_.js";import{F as m}from"./FrilansSteg-DIZSSd0G.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-3vFTugDi.js";import"./Label-D9yH3wXA.js";import"./iframe-CZEZfifu.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./VStack-BiLf-1IQ.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./FrilansPanel-_n1tlr97.js";import"./ErrorSummaryHookForm-CVY6T7Su.js";const J={title:"steps/FrilansSteg",component:m},o=()=>(...e)=>(s("button-click")(...e),Promise.resolve()),g=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:l=s("button-click")})=>(p(),r.jsx(d,{initialEntries:[u.FRILANS],children:r.jsx(c,{onDispatch:l,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!1}},children:r.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=g.bind({});var i,a,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide = action('button-click')
}) => {
  initAmplitude();
  return <MemoryRouter initialEntries={[SøknadRoutes.FRILANS]}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: {
        harJobbetSomFrilans: true,
        harJobbetSomSelvstendigNæringsdrivende: false,
        harHattAndreInntektskilder: false
      }
    }}>
                <FrilansSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={promiseAction()} arbeidsforhold={[]} />
            </FpDataContext>
        </MemoryRouter>;
}`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const L=["Default"];export{t as Default,L as __namedExportsOrder,J as default};
