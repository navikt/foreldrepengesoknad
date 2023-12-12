import{j as e}from"./jsx-runtime-69eee039.js";import{a as l}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-3d1497e9.js";import{F as u,C as S}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-57efcdec.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-9fb012a4.js";import"./ErrorSummaryHookForm-72f3171d.js";import"./dateFormValidation-24de531f.js";import"./IntlProvider-9d12be6d.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./provider-53813da2.js";import"./stepsConfig-f71b1bae.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-87a45ae9.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),K={title:"steps/TidligereUtenlandsoppholdSteg",component:a,decorators:[c]},f=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:p,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(u,{onDispatch:p,initialState:{[S.UTENLANDSOPPHOLD]:s},children:e.jsx(a,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=f.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Q=["Default"];export{o as Default,Q as __namedExportsOrder,K as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-77520875.js.map
