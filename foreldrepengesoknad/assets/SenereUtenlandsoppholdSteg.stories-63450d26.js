import{j as e}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{S as p}from"./SenereUtenlandsoppholdSteg-d032c704.js";import{F as S,C as u}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-d85ef78f.js";import"./index-b3a39e30.js";import"./Link-11d7c909.js";import"./_createSet-a6e67bdd.js";import"./_baseToString-4b695375.js";import"./index-e13aeee6.js";import"./TidligereUtenlandsoppholdPanel-d4f92082.js";import"./ErrorSummaryHookForm-ccb4d8a4.js";import"./dates-6a016f0f.js";import"./isNativeReflectConstruct-0525dbfe.js";import"./IntlProvider-788f10d0.js";import"./Alert-d5660280.js";import"./amplitude.esm-b6594747.js";import"./provider-91e4eed5.js";import"./dateFormValidation-7b994c51.js";import"./ExpansionCard-24c428ff.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-5ceb38b3.js";const k=()=>(...o)=>(a("button-click")(...o),Promise.resolve()),f={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},Y={title:"steps/SenereUtenlandsoppholdSteg",component:p,decorators:[c]},x=({mellomlagreSøknadOgNaviger:o=k(),gåTilNesteSide:s,utenlandsforhold:m=f})=>{const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:l,children:e.jsx(S,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:m},children:e.jsx(p,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:a("button-click")})})})},t=x.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
    }}>
                <SenereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const Z=["Default"];export{t as Default,Z as __namedExportsOrder,Y as default};
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-63450d26.js.map
