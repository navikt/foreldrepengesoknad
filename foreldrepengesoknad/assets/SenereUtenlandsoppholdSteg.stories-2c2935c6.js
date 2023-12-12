import{j as e}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{S as p}from"./SenereUtenlandsoppholdSteg-9b623a0a.js";import{F as S,C as u}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-57efcdec.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-9fb012a4.js";import"./ErrorSummaryHookForm-72f3171d.js";import"./dateFormValidation-24de531f.js";import"./IntlProvider-9d12be6d.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./provider-53813da2.js";import"./stepsConfig-f71b1bae.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-87a45ae9.js";const k=()=>(...o)=>(a("button-click")(...o),Promise.resolve()),f={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},Q={title:"steps/SenereUtenlandsoppholdSteg",component:p,decorators:[c]},x=({mellomlagreSøknadOgNaviger:o=k(),gåTilNesteSide:s,utenlandsforhold:m=f})=>{const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:l,children:e.jsx(S,{onDispatch:s,initialState:{[u.UTENLANDSOPPHOLD]:m},children:e.jsx(p,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:a("button-click")})})})},t=x.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const V=["Default"];export{t as Default,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=SenereUtenlandsoppholdSteg.stories-2c2935c6.js.map
