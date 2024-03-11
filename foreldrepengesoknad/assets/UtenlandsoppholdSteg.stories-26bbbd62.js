import{j as o}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as d}from"./AxiosMock-9ec34b5d.js";import{i as c}from"./Step-9ec5e5b4.js";import{F as x,C as S}from"./FpDataContext-91c673b7.js";import{S as u}from"./useFpNavigator-670f4669.js";import{U as s}from"./UtenlandsoppholdSteg-c465c65f.js";import{M as k}from"./dateFormValidation-fdbfc976.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./Tidsperioden-806f28f3.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dateUtils-49e5e83c.js";import"./amplitude.esm-2809efde.js";import"./createIntl-eb403849.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./links-4d39192e.js";import"./TidligereUtenlandsoppholdPanel-203d103a.js";import"./ErrorSummaryHookForm-28d0d702.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-8d036378.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),W={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
                    <UtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const X=["Default"];export{t as Default,X as __namedExportsOrder,W as default};
