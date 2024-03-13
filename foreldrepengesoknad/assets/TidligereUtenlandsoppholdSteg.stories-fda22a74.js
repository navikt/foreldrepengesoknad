import{j as o}from"./jsx-runtime-1caa8f64.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-9ec34b5d.js";import{i as g}from"./Step-da4fc7de.js";import{F as u,C as x}from"./FpDataContext-91c673b7.js";import{S}from"./useFpNavigator-1545f6cd.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-708123c8.js";import{M as f}from"./dateFormValidation-4b34891c.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./Tidsperioden-1fa14f31.js";import"./index-daf33b80.js";import"./Link-1e7d9fc8.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./links-022380bf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-2daa866d.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import"./TidligereUtenlandsoppholdPanel-88bf234d.js";import"./ErrorSummaryHookForm-0bf6bf0f.js";import"./ConfirmationPanel-a0ca3272.js";import"./ExpansionCard-f1e9afa7.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),W={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})})},e=D.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const X=["Default"];export{e as Default,X as __namedExportsOrder,W as default};
