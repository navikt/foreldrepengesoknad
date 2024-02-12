import{j as t}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-f85117c7.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-564f8b54.js";import{F as g,C as u}from"./FpDataContext-939a8168.js";import{S as x}from"./useFpNavigator-7e9e8eb3.js";import{i as S}from"./IntlProvider-73307a5a.js";import{M as k}from"./dateFormValidation-0494f3da.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./Tidsperioden-d1902d25.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dates-329dcbbc.js";import"./TidligereUtenlandsoppholdPanel-46e6c012.js";import"./ErrorSummaryHookForm-d1d33a18.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ExpansionCard-67831c32.js";import"./createIntl-c9f2f516.js";import"./amplitude.esm-2809efde.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),V={title:"steps/TidligereUtenlandsoppholdSteg",component:a},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{S();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[x.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(g,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:p},children:t.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},e=N.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
