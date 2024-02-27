import{j as t}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-f85117c7.js";import{S as s}from"./SenereUtenlandsoppholdSteg-99b4d661.js";import{F as S,C as u}from"./FpDataContext-939a8168.js";import{S as x}from"./useFpNavigator-80e27ea2.js";import{i as g}from"./IntlProvider-c1bc26a9.js";import{M as k}from"./dateFormValidation-309722c8.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./Tidsperioden-2d1db4bf.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dates-1f1d6788.js";import"./TidligereUtenlandsoppholdPanel-b6a02d0d.js";import"./ErrorSummaryHookForm-612c20ac.js";import"./isNativeReflectConstruct-554b52b6.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./ExpansionCard-91e81e8b.js";import"./createIntl-9cf0195b.js";import"./amplitude.esm-2809efde.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},W={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{g();const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[x.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(S,{onDispatch:p,initialState:{[u.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.SENERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
      }}>
                    <SenereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const X=["Default"];export{o as Default,X as __namedExportsOrder,W as default};
