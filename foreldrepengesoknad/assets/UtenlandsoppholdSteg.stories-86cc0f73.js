import{j as t}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-f85117c7.js";import{U as s}from"./UtenlandsoppholdSteg-73cd6aad.js";import{F as d,C as x}from"./FpDataContext-939a8168.js";import{S}from"./useFpNavigator-b6dca37b.js";import{i as u}from"./IntlProvider-b5213292.js";import{M as k}from"./dateFormValidation-a28db7fc.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./Tidsperioden-9e986206.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dates-a34ba53a.js";import"./TidligereUtenlandsoppholdPanel-72fcf13d.js";import"./ErrorSummaryHookForm-8ff48ca9.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ExpansionCard-8141c4b0.js";import"./createIntl-3e09be91.js";import"./amplitude.esm-2809efde.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),Q={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:e=g(),gåTilNesteSide:p})=>{u();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[S.UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(d,{onDispatch:p,initialState:{[x.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:t.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=f.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        }
      }}>
                    <UtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
