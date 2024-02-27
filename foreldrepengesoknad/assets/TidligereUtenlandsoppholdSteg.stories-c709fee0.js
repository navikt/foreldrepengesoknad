import{j as t}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-f85117c7.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-122d0677.js";import{F as g,C as u}from"./FpDataContext-939a8168.js";import{S as x}from"./useFpNavigator-80e27ea2.js";import{i as S}from"./IntlProvider-c1bc26a9.js";import{M as k}from"./dateFormValidation-309722c8.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./Tidsperioden-2d1db4bf.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dates-1f1d6788.js";import"./TidligereUtenlandsoppholdPanel-b6a02d0d.js";import"./ErrorSummaryHookForm-612c20ac.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ExpansionCard-91e81e8b.js";import"./createIntl-9cf0195b.js";import"./amplitude.esm-2809efde.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),V={title:"steps/TidligereUtenlandsoppholdSteg",component:a},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{S();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[x.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(g,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:p},children:t.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},e=N.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
                    <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{e as Default,W as __namedExportsOrder,V as default};
