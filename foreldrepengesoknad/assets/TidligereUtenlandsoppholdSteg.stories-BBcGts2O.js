import{j as t}from"./jsx-runtime-Cw0GR0a5.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DmzRutAZ.js";import{i as g}from"./ByttBrowserModal-B_8YCR86.js";import{M as u,F as x,C as S}from"./FpDataContext-7C49oNtd.js";import{S as k}from"./useFpNavigator-BpJPmo6p.js";import{T as p}from"./TidligereUtenlandsoppholdSteg-BlYV6Mqg.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./index-CxzRwX_-.js";import"./apiInterceptor-D-WKbiXB.js";import"./index-DSgjoNiG.js";import"./tslib.es6-CcC3cBMT.js";import"./links-BegG-28I.js";import"./Uttaksdagen-C7qvZjyy.js";import"./VStack-DmKyg8-d.js";import"./Label-C_UMiHsP.js";import"./Tidsperioden-BBrWkrto.js";import"./index-BRV0Se7Z.js";import"./Link-D0RLsnK2.js";import"./index-CCQ3W5xA.js";import"./index-9r8iugjR.js";import"./message-CjkJih2D.js";import"./bemUtils-DmNyTjfb.js";import"./_baseToString-Cq6MbKF_.js";import"./_createSet-D2BJ0WVx.js";import"./iframe-DRQ5W9Sx.js";import"../sb-preview/runtime.js";import"./ErrorSummaryHookForm-D14xGqJh.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-_34OS4c-.js";import"./_baseUniq-BwrlAMKh.js";import"./dateFormValidation-DamLOwkK.js";import"./TidligereUtenlandsoppholdPanel-kyzPGObx.js";import"./Plus-BLsDsiTu.js";const D=()=>(...e)=>(l("button-click")(...e),Promise.resolve()),ot={title:"steps/TidligereUtenlandsoppholdSteg",component:p},N=({mellomlagreSøknadOgNaviger:e=D(),gåTilNesteSide:s,utenlandsopphold:a={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[k.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(x,{onDispatch:s,initialState:{[S.UTENLANDSOPPHOLD]:a},children:t.jsx(p,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:()=>{}})})})})},o=N.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
      }}>
                    <TidligereUtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const et=["Default"];export{o as Default,et as __namedExportsOrder,ot as default};
