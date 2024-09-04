import{j as e}from"./Uttaksdagen-DrQ0Oxxl.js";import{a as l}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DWv_wXoA.js";import{i as g}from"./ErrorSummaryHookForm-1nFoirfj.js";import{M as u,F as S,C as k}from"./FpDataContext-BW_0HfWx.js";import{S as D}from"./useFpNavigator-rsQS18v_.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-C37hyQjt.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./dateFormValidation-DXkRFCUV.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-DKGDLLUe.js";import"./ExpansionCard-B0Uu_XwO.js";import"./Plus-CRD_EDjI.js";const N=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),J={title:"steps/TidligereUtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:o=N(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return e.jsx(u,{initialEntries:[D.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(S,{onDispatch:a,initialState:{[k.UTENLANDSOPPHOLD]:p},children:e.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},t=f.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const K=["Default"];export{t as Default,K as __namedExportsOrder,J as default};
