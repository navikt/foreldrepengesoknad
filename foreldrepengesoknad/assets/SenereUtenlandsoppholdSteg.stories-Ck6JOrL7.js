import{j as t}from"./tslib.es6-BMc9PpVS.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as S}from"./ErrorSummaryHookForm-CpcWKZeM.js";import{M as u,F as x,C as g}from"./FpDataContext-wT6-gpAc.js";import{S as k}from"./useFpNavigator-cdVAXfmg.js";import{S as s}from"./SenereUtenlandsoppholdSteg-ClEB0gja.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Uttaksdagen-B0FM17qM.js";import"./index-DoedxA3Z.js";import"./index-Snk9MO9S.js";import"./index-BxmsGmlx.js";import"./dateFormValidation-CMcKJG1V.js";import"./bemUtils-Cb0-YXpW.js";import"./links-BegG-28I.js";import"./_baseToString-7VaozA17.js";import"./_createSet-1Wr4uFiM.js";import"./iframe-CnSJsggb.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-Bi7npIOr.js";import"./TidligereUtenlandsoppholdPanel-CrL1MndR.js";import"./ExpansionCard-CQN8G37-.js";import"./Plus-CFOkeXK6.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},V={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[k.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(x,{onDispatch:p,initialState:{[g.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const W=["Default"];export{o as Default,W as __namedExportsOrder,V as default};
