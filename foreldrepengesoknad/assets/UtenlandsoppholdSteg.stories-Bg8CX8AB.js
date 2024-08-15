import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-DmzRutAZ.js";import{i as c}from"./ByttBrowserModal-50UgTbct.js";import{M as x,F as S,C as u}from"./FpDataContext-DMa8S1I2.js";import{S as k}from"./useFpNavigator-BZhZz5y3.js";import{U as s}from"./UtenlandsoppholdSteg-BgaERDzH.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-CxzRwX_-.js";import"./apiInterceptor-D-WKbiXB.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BGW0SL1u.js";import"./Uttaksdagen-CXktmUXL.js";import"./VStack-C22gJDrI.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-Cw9xAJ1Y.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-CR2mJFsE.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./Accordion-BQJCEbp_.js";import"./dateFormValidation-CHGPS-b7.js";import"./TidligereUtenlandsoppholdPanel-DN0aMXfn.js";import"./ErrorSummaryHookForm-BEAS1IP-.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),oo={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(x,{initialEntries:[k.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(S,{onDispatch:p,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        }
      }}>
                    <UtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const to=["Default"];export{t as Default,to as __namedExportsOrder,oo as default};
