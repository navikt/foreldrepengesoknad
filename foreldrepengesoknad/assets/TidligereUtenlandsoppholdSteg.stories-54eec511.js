import{j as t}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-35a08809.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-2e1e92a8.js";import{F as g,C as u}from"./FpDataContext-c0784ba8.js";import{S as x}from"./useFpNavigator-35d501ad.js";import{i as S}from"./IntlProvider-3646511b.js";import{M as k}from"./dateFormValidation-58034f6f.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-71cf49c7.js";import"./Tidsperioden-0ce27701.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dates-11179115.js";import"./TidligereUtenlandsoppholdPanel-547160bb.js";import"./ErrorSummaryHookForm-d377c7b0.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import"./ExpansionCard-c322da11.js";import"./createIntl-53be0640.js";import"./amplitude.esm-2809efde.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),V={title:"steps/TidligereUtenlandsoppholdSteg",component:a},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{S();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[x.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(g,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:p},children:t.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},e=N.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
