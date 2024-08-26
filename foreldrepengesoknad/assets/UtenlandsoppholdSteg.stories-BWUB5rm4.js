import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-DmzRutAZ.js";import{i as c}from"./ByttBrowserModal-DiOm4a-5.js";import{M as x,F as S,C as u}from"./FpDataContext-7C49oNtd.js";import{S as k}from"./useFpNavigator-Bu-rnXQX.js";import{U as s}from"./UtenlandsoppholdSteg-CF_QDQ0K.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-CxzRwX_-.js";import"./apiInterceptor-D-WKbiXB.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BegG-28I.js";import"./Uttaksdagen-C7qvZjyy.js";import"./VStack-C3DRnCHF.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-CX6uww3z.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-DjWNikeI.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./ErrorSummaryHookForm-D4M3e3OE.js";import"./dateFormValidation-DamLOwkK.js";import"./TidligereUtenlandsoppholdPanel-iQX0VCGy.js";import"./Plus-zXW6TB9j.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),oo={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(x,{initialEntries:[k.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(S,{onDispatch:p,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
