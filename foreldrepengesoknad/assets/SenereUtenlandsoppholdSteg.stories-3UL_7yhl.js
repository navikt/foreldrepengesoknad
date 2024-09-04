import{j as t}from"./Uttaksdagen-DrQ0Oxxl.js";import{a}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DWv_wXoA.js";import{i as S}from"./ErrorSummaryHookForm-1nFoirfj.js";import{M as u,F as g,C as k}from"./FpDataContext-BW_0HfWx.js";import{S as f}from"./useFpNavigator-rsQS18v_.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DTjFf0FX.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-Uwu7Pz6v.js";import"./useMergeRefs-DNxXm0No.js";import"./Modal-Bbx7_2or.js";import"./index-BVEwUaSm.js";import"./dateFormValidation-DXkRFCUV.js";import"./Link-BaYazeYY.js";import"./index-Snk9MO9S.js";import"./iframe-qjwadSKR.js";import"../sb-preview/runtime.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-DKGDLLUe.js";import"./ExpansionCard-B0Uu_XwO.js";import"./Plus-CRD_EDjI.js";const N=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),D={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},K={title:"steps/SenereUtenlandsoppholdSteg",component:s},x=({mellomlagreSøknadOgNaviger:e=N(),gåTilNesteSide:p,utenlandsforhold:m=D})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[f.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(g,{onDispatch:p,initialState:{[k.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=x.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
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
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const Q=["Default"];export{o as Default,Q as __namedExportsOrder,K as default};
