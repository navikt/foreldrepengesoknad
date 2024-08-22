import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as m}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as l}from"./ByttBrowserModal-Db6MxZXB.js";import{M as d,F as c,C as S}from"./FpDataContext-7C49oNtd.js";import{S as u}from"./useFpNavigator-MWSJmHcc.js";import{F as s}from"./FrilansSteg-BsxZeR6L.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BegG-28I.js";import"./Uttaksdagen-Cq_fjHH8.js";import"./VStack-BeCluNci.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-Bwm_FIru.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-CbIirB0R.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./ErrorSummaryHookForm-DsXPVMwo.js";import"./dateFormValidation-pcF71gb3.js";import"./FrilansPanel-DI0OgZE1.js";const U={title:"steps/FrilansSteg",component:s},o=()=>(...r)=>(m("button-click")(...r),Promise.resolve()),x=({mellomlagreSøknadOgNaviger:r=o(),gåTilNesteSide:p=m("button-click")})=>(l(),e.jsx(d,{initialEntries:[u.FRILANS],children:e.jsx(c,{onDispatch:p,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomFrilans:!0,harJobbetSomSelvstendigNæringsdrivende:!1,harHattAndreInntektskilder:!1}},children:e.jsx(s,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=x.bind({});var i,a,n;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(n=(a=t.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};const V=["Default"];export{t as Default,V as __namedExportsOrder,U as default};
