import{j as o}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-9ec34b5d.js";import{i as S}from"./Step-b0b81968.js";import{F as u,C as x}from"./FpDataContext-91c673b7.js";import{S as g}from"./useFpNavigator-94b086ce.js";import{S as s}from"./SenereUtenlandsoppholdSteg-e2179ed4.js";import{M as f}from"./dateFormValidation-5ec6c7b9.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./Tidsperioden-42a1bdbe.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-6c46f0d1.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./TidligereUtenlandsoppholdPanel-2176c587.js";import"./ErrorSummaryHookForm-7bca43c9.js";import"./ConfirmationPanel-92fc954c.js";import"./ExpansionCard-ce8199b5.js";const k=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},X={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[g.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:l,children:o.jsx(u,{onDispatch:p,initialState:{[x.UTENLANDSOPPHOLD]:m},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=D.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
                    <SenereUtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
