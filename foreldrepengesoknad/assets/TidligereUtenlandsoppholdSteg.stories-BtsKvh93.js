import{j as e}from"./Uttaksdagen-CVi1UdfS.js";import{a as l}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DWv_wXoA.js";import{i as g}from"./Uttaksplan-C-q_5N0-.js";import{M as u,F as S,C as k}from"./FpDataContext-Bw3l41n2.js";import{S as D}from"./useFpNavigator-BE1soRC3.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-dtBfdK-4.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-CSGuhRpc.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./ExpansionCard-Dtc-vcar.js";import"./Plus-B3Jq1k4K.js";const N=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),B={title:"steps/TidligereUtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:o=N(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return e.jsx(u,{initialEntries:[D.TIDLIGERE_UTENLANDSOPPHOLD],children:e.jsx(c,{mock:m,children:e.jsx(S,{onDispatch:a,initialState:{[k.UTENLANDSOPPHOLD]:p},children:e.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},t=f.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const J=["Default"];export{t as Default,J as __namedExportsOrder,B as default};
