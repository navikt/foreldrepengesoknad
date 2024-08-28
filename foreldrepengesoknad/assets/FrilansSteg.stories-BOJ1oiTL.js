import{j as r}from"./tslib.es6-BMc9PpVS.js";import{a as s}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as p}from"./ErrorSummaryHookForm-B_LopTqh.js";import{M as d,F as c,C as S}from"./FpDataContext-wT6-gpAc.js";import{S as u}from"./useFpNavigator-CdYY8cCo.js";import{F as m}from"./FrilansSteg-Bdp3Yypg.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./Uttaksdagen-CHlL4_FN.js";import"./Tidsperioden-CRlAJzBJ.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-B567oMpk.js";import"./bemUtils-DTdo7NuC.js";import"./links-BegG-28I.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-Cn5AZTru.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./FrilansPanel-DKDAavn6.js";const M={title:"steps/FrilansSteg",component:m},o=()=>(...e)=>(s("button-click")(...e),Promise.resolve()),x=({mellomlagreSøknadOgNaviger:e=o(),gåTilNesteSide:l=s("button-click")})=>(p(),r.jsx(d,{initialEntries:[u.FRILANS],children:r.jsx(c,{onDispatch:l,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!1}},children:r.jsx(m,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=x.bind({});var i,a,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const B=["Default"];export{t as Default,B as __namedExportsOrder,M as default};
