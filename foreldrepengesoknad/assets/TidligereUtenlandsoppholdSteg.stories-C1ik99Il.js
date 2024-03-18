import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{a as l}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as c}from"./AxiosMock-Ch5ZGkFd.js";import{i as g}from"./Step-DMjU3ety.js";import{F as u,C as x}from"./FpDataContext-CjNulmBK.js";import{S}from"./useFpNavigator-CnrN-bhH.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-WDWrAeC_.js";import{M as f}from"./dateFormValidation-A9ng-RC0.js";import"./index-Cu9bd8lq.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-BlveB6PB.js";import"./axios-Dg6gsKS0.js";import"./Tidsperioden-C8HcA-rk.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-C-6Uy6j4.js";import"./index-Ckls47V4.js";import"./links-dJHPeQm3.js";import"./message-BTv7u0RP.js";import"./amplitude.esm-CWYNo8IU.js";import"./createIntl-DjMHtdaC.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import"./lodash-o8vTUAkc.js";import"./TidligereUtenlandsoppholdPanel-CFifDK8o.js";import"./ErrorSummaryHookForm-DaBY2tD2.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),Q={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:e.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})})},o=D.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
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
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
