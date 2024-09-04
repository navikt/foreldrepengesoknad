import{j as e}from"./jsx-runtime-CexXSJP5.js";import{a as l}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DWv_wXoA.js";import{i as g}from"./Uttaksplan-CIx8nvnt.js";import{M as u,F as S,C as k}from"./FpDataContext-CLfRphv-.js";import{S as D}from"./useFpNavigator-CX4xXzw_.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-Cruw4iJG.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Uttaksdagen-3vFTugDi.js";import"./Label-D9yH3wXA.js";import"./iframe-CZEZfifu.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./VStack-BiLf-1IQ.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-C0DKavI8.js";import"./ErrorSummaryHookForm-CVY6T7Su.js";import"./ExpansionCard-pq8VkahT.js";import"./Plus-BZVLbM7C.js";const N=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),J={title:"steps/TidligereUtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:o=N(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return e.jsx(u,{initialEntries:[D.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(S,{onDispatch:a,initialState:{[k.UTENLANDSOPPHOLD]:p},children:e.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},t=f.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
