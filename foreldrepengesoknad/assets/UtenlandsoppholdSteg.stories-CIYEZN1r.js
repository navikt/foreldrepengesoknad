import{j as o}from"./tslib.es6-BMc9PpVS.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-c2nI01-r.js";import{i as c}from"./ErrorSummaryHookForm-CpcWKZeM.js";import{M as x,F as S,C as u}from"./FpDataContext-wT6-gpAc.js";import{S as k}from"./useFpNavigator-cdVAXfmg.js";import{U as s}from"./UtenlandsoppholdSteg-CZsX3zYG.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Uttaksdagen-B0FM17qM.js";import"./index-DoedxA3Z.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-CMcKJG1V.js";import"./bemUtils-Cb0-YXpW.js";import"./links-BegG-28I.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-CnSJsggb.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./TidligereUtenlandsoppholdPanel-CrL1MndR.js";import"./ExpansionCard-CQN8G37-.js";import"./Plus-CFOkeXK6.js";const g=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),G={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:e=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(x,{initialEntries:[k.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(S,{onDispatch:p,initialState:{[u.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Q=["Default"];export{t as Default,Q as __namedExportsOrder,G as default};
