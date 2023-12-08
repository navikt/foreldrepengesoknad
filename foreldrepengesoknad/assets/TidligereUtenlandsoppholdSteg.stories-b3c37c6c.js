import{j as e}from"./jsx-runtime-69eee039.js";import{a as l}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-d5b07e79.js";import{F as u,C as S}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-a95d044c.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-da6de2ad.js";import"./ErrorSummaryHookForm-ec860d4c.js";import"./dateFormValidation-fedc3c4d.js";import"./provider-621cc7ef.js";import"./exports-70c8b745.js";import"./amplitude-140e185d.js";import"./stepsConfig-527b68d8.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-650a43cb.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),J={title:"steps/TidligereUtenlandsoppholdSteg",component:a,decorators:[c]},f=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:p,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(u,{onDispatch:p,initialState:{[S.UTENLANDSOPPHOLD]:s},children:e.jsx(a,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=f.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const K=["Default"];export{o as Default,K as __namedExportsOrder,J as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-b3c37c6c.js.map
