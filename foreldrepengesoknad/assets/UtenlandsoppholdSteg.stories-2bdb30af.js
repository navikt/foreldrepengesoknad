import{j as o}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as d}from"./AxiosMock-9ec34b5d.js";import{i as c}from"./Step-da4fc7de.js";import{F as x,C as S}from"./FpDataContext-91c673b7.js";import{S as u}from"./useFpNavigator-1545f6cd.js";import{U as s}from"./UtenlandsoppholdSteg-cd0539d6.js";import{M as k}from"./dateFormValidation-4b34891c.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./Tidsperioden-1fa14f31.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-2daa866d.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./TidligereUtenlandsoppholdPanel-88bf234d.js";import"./ErrorSummaryHookForm-0bf6bf0f.js";import"./ConfirmationPanel-a0ca3272.js";import"./ExpansionCard-f1e9afa7.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),V={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{t as Default,W as __namedExportsOrder,V as default};
