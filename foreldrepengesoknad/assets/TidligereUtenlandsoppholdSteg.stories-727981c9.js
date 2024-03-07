import{j as e}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-f85117c7.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-2894fec3.js";import{F as g,C as u}from"./FpDataContext-9c963fd7.js";import{S as x}from"./useFpNavigator-d887b885.js";import{i as S}from"./IntlProvider-1d845c21.js";import{M as k}from"./dateFormValidation-996d41a1.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./dates-c7d75be6.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./TidligereUtenlandsoppholdPanel-f46e9c9a.js";import"./ErrorSummaryHookForm-1dae46df.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ExpansionCard-52dde959.js";import"./createIntl-39c77dfb.js";import"./amplitude.esm-2809efde.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),Q={title:"steps/TidligereUtenlandsoppholdSteg",component:a},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{S();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(k,{initialEntries:[x.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(g,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:p},children:e.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},t=N.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{t as Default,V as __namedExportsOrder,Q as default};
