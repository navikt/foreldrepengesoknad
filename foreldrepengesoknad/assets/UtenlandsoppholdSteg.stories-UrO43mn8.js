import{j as o}from"./Uttaksdagen-DrQ0Oxxl.js";import{a}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as d}from"./AxiosMock-DWv_wXoA.js";import{i as c}from"./ErrorSummaryHookForm-1nFoirfj.js";import{M as S,F as u,C as k}from"./FpDataContext-BW_0HfWx.js";import{S as g}from"./useFpNavigator-rsQS18v_.js";import{U as s}from"./UtenlandsoppholdSteg-B440yAwk.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./dateFormValidation-DXkRFCUV.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-DKGDLLUe.js";import"./ExpansionCard-B0Uu_XwO.js";import"./Plus-CRD_EDjI.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),z={title:"steps/UtenlandsoppholdSteg",component:s},x=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(S,{initialEntries:[g.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(u,{onDispatch:p,initialState:{[k.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=x.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const B=["Default"];export{t as Default,B as __namedExportsOrder,z as default};
