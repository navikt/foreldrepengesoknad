import{j as e}from"./tslib.es6-BMc9PpVS.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as g}from"./ErrorSummaryHookForm-B_LopTqh.js";import{M as u,F as x,C as S}from"./FpDataContext-wT6-gpAc.js";import{S as k}from"./useFpNavigator-CdYY8cCo.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-q-CGlluZ.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Uttaksdagen-CHlL4_FN.js";import"./Tidsperioden-CRlAJzBJ.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-B567oMpk.js";import"./bemUtils-DTdo7NuC.js";import"./links-BegG-28I.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-Cn5AZTru.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./TidligereUtenlandsoppholdPanel-1FSheWZE.js";import"./ExpansionCard-DHMDG-_R.js";import"./Plus-r-gVJQR-.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),Q={title:"steps/TidligereUtenlandsoppholdSteg",component:s},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return e.jsx(u,{initialEntries:[k.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(x,{onDispatch:a,initialState:{[S.UTENLANDSOPPHOLD]:p},children:e.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},t=N.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{t as Default,V as __namedExportsOrder,Q as default};
