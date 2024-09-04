import{j as t}from"./Uttaksdagen-CVi1UdfS.js";import{a}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DWv_wXoA.js";import{i as S}from"./Uttaksplan-C-q_5N0-.js";import{M as u,F as g,C as k}from"./FpDataContext-Bw3l41n2.js";import{S as f}from"./useFpNavigator-BE1soRC3.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DZdw9285.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-CSGuhRpc.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./ExpansionCard-Dtc-vcar.js";import"./Plus-B3Jq1k4K.js";const N=()=>(...o)=>(a("button-click")(...o),Promise.resolve()),D={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},J={title:"steps/SenereUtenlandsoppholdSteg",component:s},x=({mellomlagreSøknadOgNaviger:o=N(),gåTilNesteSide:p,utenlandsforhold:l=D})=>{S();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[f.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(g,{onDispatch:p,initialState:{[k.UTENLANDSOPPHOLD]:l},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:a("button-click")})})})})},e=x.bind({});var r,n,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const K=["Default"];export{e as Default,K as __namedExportsOrder,J as default};
