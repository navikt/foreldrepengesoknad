import{j as e}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{S as p}from"./SenereUtenlandsoppholdSteg-fe892a3a.js";import{F as S,C as u}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-4072d221.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-b8cd0c22.js";import"./ErrorSummaryHookForm-e7115564.js";import"./dates-b21a3b0a.js";import"./IntlProvider-54af2afe.js";import"./amplitude.esm-b6594747.js";import"./provider-0f1d4d22.js";import"./dateFormValidation-b25b10db.js";import"./stepsConfig-99aab0f1.js";import"./amplitude-3a5afcfb.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-e59c93c2.js";const k=()=>(...o)=>(a("button-click")(...o),Promise.resolve()),f={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},V={title:"steps/SenereUtenlandsoppholdSteg",component:p,decorators:[c]},x=({mellomlagreSøknadOgNaviger:o=k(),gåTilNesteSide:s,utenlandsforhold:m=f})=>{const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:l,children:e.jsx(S,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:m},children:e.jsx(p,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:a("button-click")})})})},t=x.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const W=["Default"];export{t as Default,W as __namedExportsOrder,V as default};
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-7ff8a097.js.map
