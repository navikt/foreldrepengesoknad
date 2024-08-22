import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{a as p}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{i as l}from"./ByttBrowserModal-Db6MxZXB.js";import{M as d,F as g,C as S}from"./FpDataContext-7C49oNtd.js";import{S as x}from"./useFpNavigator-MWSJmHcc.js";import{E as m}from"./EgenNæringSteg-DSafFhNm.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BegG-28I.js";import"./Uttaksdagen-Cq_fjHH8.js";import"./VStack-BeCluNci.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-Bwm_FIru.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-CbIirB0R.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./ErrorSummaryHookForm-DsXPVMwo.js";import"./dateFormValidation-pcF71gb3.js";import"./EgenNæringPanel-3Bufi7PN.js";import"./numberFormValidation-C-hbme7F.js";const V={title:"steps/EgenNæringSteg",component:m},o=()=>(...r)=>(p("button-click")(...r),Promise.resolve()),c=({mellomlagreSøknadOgNaviger:r=o(),gåTilNesteSide:s})=>(l(),e.jsx(d,{initialEntries:[x.EGEN_NÆRING],children:e.jsx(g,{onDispatch:s,initialState:{[S.ARBEIDSFORHOLD_OG_INNTEKT]:{harJobbetSomSelvstendigNæringsdrivende:!0,harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1}},children:e.jsx(m,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:o(),arbeidsforhold:[]})})})),t=c.bind({});var i,n,a;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`({
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
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const W=["Default"];export{t as Default,W as __namedExportsOrder,V as default};
