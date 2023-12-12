import{j as r}from"./jsx-runtime-69eee039.js";import{a}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as d}from"./AxiosMock-ee1c53ff.js";import{U as s}from"./UtenlandsoppholdSteg-2e05e6b6.js";import{F as g,C as S}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-57efcdec.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-9fb012a4.js";import"./ErrorSummaryHookForm-72f3171d.js";import"./dateFormValidation-24de531f.js";import"./IntlProvider-9d12be6d.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./provider-53813da2.js";import"./stepsConfig-f71b1bae.js";import"./routes-9effe5a6.js";import"./message-87a45ae9.js";const k=()=>(...t)=>(a("button-click")(...t),Promise.resolve()),G={title:"steps/UtenlandsoppholdSteg",component:s,decorators:[c]},u=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:p})=>{const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(d,{mock:m,children:r.jsx(g,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:r.jsx(s,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:a("button-click")})})})},o=u.bind({});var e,n,i;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const H=["Default"];export{o as Default,H as __namedExportsOrder,G as default};
//# sourceMappingURL=UtenlandsoppholdSteg.stories-7cc0c942.js.map
