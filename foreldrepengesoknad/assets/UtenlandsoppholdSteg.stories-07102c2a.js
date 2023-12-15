import{j as r}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as d}from"./AxiosMock-ee1c53ff.js";import{U as p}from"./UtenlandsoppholdSteg-7876f056.js";import{F as g,C as S}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-d85ef78f.js";import"./index-b3a39e30.js";import"./Link-11d7c909.js";import"./_createSet-a6e67bdd.js";import"./_baseToString-4b695375.js";import"./index-e13aeee6.js";import"./TidligereUtenlandsoppholdPanel-d4f92082.js";import"./ErrorSummaryHookForm-ccb4d8a4.js";import"./dates-6a016f0f.js";import"./isNativeReflectConstruct-0525dbfe.js";import"./IntlProvider-788f10d0.js";import"./Alert-d5660280.js";import"./amplitude.esm-b6594747.js";import"./provider-91e4eed5.js";import"./dateFormValidation-7b994c51.js";import"./ExpansionCard-24c428ff.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./routes-9effe5a6.js";import"./message-5ceb38b3.js";const k=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),V={title:"steps/UtenlandsoppholdSteg",component:p,decorators:[c]},u=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:s})=>{const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(d,{mock:m,children:r.jsx(g,{onDispatch:s,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:r.jsx(p,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:a("button-click")})})})},o=u.bind({});var e,i,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      }
    }}>
                <UtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{o as Default,W as __namedExportsOrder,V as default};
//# sourceMappingURL=UtenlandsoppholdSteg.stories-07102c2a.js.map
