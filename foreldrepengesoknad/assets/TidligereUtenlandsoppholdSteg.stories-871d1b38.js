import{j as o}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-9ec34b5d.js";import{i as g}from"./Step-9ec5e5b4.js";import{F as u,C as x}from"./FpDataContext-91c673b7.js";import{S}from"./useFpNavigator-670f4669.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-3d4efedf.js";import{M as f}from"./dateFormValidation-fdbfc976.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./Tidsperioden-806f28f3.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./dateUtils-49e5e83c.js";import"./amplitude.esm-2809efde.js";import"./createIntl-eb403849.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./links-4d39192e.js";import"./TidligereUtenlandsoppholdPanel-203d103a.js";import"./ErrorSummaryHookForm-28d0d702.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-8d036378.js";const k=()=>(...e)=>(l("button-click")(...e),Promise.resolve()),X={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:()=>{}})})})})},t=D.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
