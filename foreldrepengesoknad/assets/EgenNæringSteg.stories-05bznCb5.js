import{j as r}from"./Uttaksdagen-CVi1UdfS.js";import{a as p}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as l}from"./Uttaksplan-C-q_5N0-.js";import{M as d,F as g,C as S}from"./FpDataContext-Bw3l41n2.js";import{S as c}from"./useFpNavigator-BE1soRC3.js";import{E as s}from"./EgenNæringSteg-Dvmo1MMy.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./EgenNæringPanel-BTUik1x_.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./numberFormValidation-DIpjEZtT.js";const H={title:"steps/EgenNæringSteg",component:s},o=()=>(...e)=>(p("button-click")(...e),Promise.resolve()),u=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:m})=>(l(),r.jsx(d,{initialEntries:[c.EGEN_NÆRING],children:r.jsx(g,{onDispatch:m,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:r.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=u.bind({});var i,n,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const J=["Default"];export{t as Default,J as __namedExportsOrder,H as default};
