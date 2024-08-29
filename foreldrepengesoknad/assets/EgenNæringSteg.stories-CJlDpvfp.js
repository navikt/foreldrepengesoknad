import{j as r}from"./tslib.es6-BMc9PpVS.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as l}from"./ErrorSummaryHookForm-CpcWKZeM.js";import{M as d,F as g,C as S}from"./FpDataContext-wT6-gpAc.js";import{S as x}from"./useFpNavigator-cdVAXfmg.js";import{E as s}from"./EgenNæringSteg-BxCSN01k.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-B0FM17qM.js";import"./index-DoedxA3Z.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-CMcKJG1V.js";import"./bemUtils-Cb0-YXpW.js";import"./links-BegG-28I.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-CnSJsggb.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./EgenNæringPanel-ev7cu4ru.js";import"./numberFormValidation-CbwjmV3h.js";const B={title:"steps/EgenNæringSteg",component:s},o=()=>(...e)=>(p("button-click")(...e),Promise.resolve()),c=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:m})=>(l(),r.jsx(d,{initialEntries:[x.EGEN_NÆRING],children:r.jsx(g,{onDispatch:m,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:r.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=c.bind({});var i,n,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const K=["Default"];export{t as Default,K as __namedExportsOrder,B as default};
