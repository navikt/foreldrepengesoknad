import{j as r}from"./Uttaksdagen-CVi1UdfS.js";import{a as s}from"./chunk-454WOBUV-CM0pFb8Z.js";import{i as p}from"./Uttaksplan-C-q_5N0-.js";import{M as d,F as c,C as S}from"./FpDataContext-Bw3l41n2.js";import{S as u}from"./useFpNavigator-BE1soRC3.js";import{F as m}from"./FrilansSteg-Bt3UrZy3.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./FrilansPanel-B0ep3gpM.js";import"./ErrorSummaryHookForm-BSEElhq_.js";const H={title:"steps/FrilansSteg",component:m},o=()=>(...e)=>(s("button-click")(...e),Promise.resolve()),g=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:l=s("button-click")})=>(p(),r.jsx(d,{initialEntries:[u.FRILANS],children:r.jsx(c,{onDispatch:l,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!1}},children:r.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=g.bind({});var i,a,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const J=["Default"];export{t as Default,J as __namedExportsOrder,H as default};
