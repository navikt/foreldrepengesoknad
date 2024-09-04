import{j as o}from"./Uttaksdagen-CVi1UdfS.js";import{a}from"./chunk-454WOBUV-CM0pFb8Z.js";import{A as d}from"./AxiosMock-DWv_wXoA.js";import{i as c}from"./Uttaksplan-C-q_5N0-.js";import{M as S,F as u,C as k}from"./FpDataContext-Bw3l41n2.js";import{S as g}from"./useFpNavigator-BE1soRC3.js";import{U as s}from"./UtenlandsoppholdSteg-SVZz8QXh.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DkNKrNHd.js";import"./apiInterceptor-BCtLUnPl.js";import"./Label-D9yH3wXA.js";import"./iframe-Dr6P14DD.js";import"../sb-preview/runtime.js";import"./links-D6IYREgS.js";import"./Modal-Bf7Xci8e.js";import"./index-BVEwUaSm.js";import"./index-Snk9MO9S.js";import"./_baseAssignValue-DljJpCQy.js";import"./_overArg-DqZhcJg_.js";import"./TidligereUtenlandsoppholdPanel-CSGuhRpc.js";import"./ErrorSummaryHookForm-BSEElhq_.js";import"./ExpansionCard-Dtc-vcar.js";import"./Plus-B3Jq1k4K.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),w={title:"steps/UtenlandsoppholdSteg",component:s},x=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(S,{initialEntries:[g.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(u,{onDispatch:p,initialState:{[k.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=x.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const z=["Default"];export{t as Default,z as __namedExportsOrder,w as default};
