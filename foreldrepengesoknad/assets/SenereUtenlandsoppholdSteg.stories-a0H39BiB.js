import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DmzRutAZ.js";import{i as S}from"./ByttBrowserModal-D3KhWmTA.js";import{M as u,F as x,C as g}from"./FpDataContext-DMa8S1I2.js";import{S as k}from"./useFpNavigator-B0XCZ2ut.js";import{S as p}from"./SenereUtenlandsoppholdSteg-CElaKx81.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-CxzRwX_-.js";import"./apiInterceptor-D-WKbiXB.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BGW0SL1u.js";import"./Uttaksdagen-CXktmUXL.js";import"./VStack-C22gJDrI.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-Cw9xAJ1Y.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-i9wyl4b5.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./Accordion-DiMfcrGz.js";import"./dateFormValidation-CHGPS-b7.js";import"./TidligereUtenlandsoppholdPanel-6qFUE4KP.js";import"./ErrorSummaryHookForm-DJYNEB2h.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},et={title:"steps/SenereUtenlandsoppholdSteg",component:p},D=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:s,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[k.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(x,{onDispatch:s,initialState:{[g.UTENLANDSOPPHOLD]:m},children:t.jsx(p,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.SENERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
      }}>
                    <SenereUtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const rt=["Default"];export{o as Default,rt as __namedExportsOrder,et as default};
