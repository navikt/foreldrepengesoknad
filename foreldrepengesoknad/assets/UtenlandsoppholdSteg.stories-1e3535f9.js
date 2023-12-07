import{j as o}from"./jsx-runtime-69eee039.js";import{a as r}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as d}from"./AxiosMock-ee1c53ff.js";import{U as i}from"./UtenlandsoppholdSteg-8bf19459.js";import{F as g,C as k}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-a95d044c.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-da6de2ad.js";import"./ErrorSummaryHookForm-ec860d4c.js";import"./dateFormValidation-fedc3c4d.js";import"./provider-621cc7ef.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./stepsConfig-527b68d8.js";import"./routes-9effe5a6.js";import"./message-650a43cb.js";const z={title:"steps/UtenlandsoppholdSteg",component:i,decorators:[c]},S=({mellomlagreSøknadOgNaviger:p=r("button-click"),gåTilNesteSide:s})=>{const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(d,{mock:m,children:o.jsx(g,{onDispatch:s,initialState:{[k.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(i,{mellomlagreSøknadOgNaviger:p,avbrytSøknad:r("button-click")})})})},t=S.bind({});var e,n,a;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = action('button-click'),
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
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const B=["Default"];export{t as Default,B as __namedExportsOrder,z as default};
//# sourceMappingURL=UtenlandsoppholdSteg.stories-1e3535f9.js.map
