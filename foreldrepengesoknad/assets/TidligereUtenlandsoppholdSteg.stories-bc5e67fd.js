import{j as e}from"./jsx-runtime-69eee039.js";import{a as l}from"./chunk-AY7I2SME-331d03ca.js";import{w as c}from"./withRouter-f0df7a0f.js";import{A as g}from"./AxiosMock-ee1c53ff.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-589c010e.js";import{F as u,C as S}from"./FpDataContext-75ac2616.js";import"./index-7c191284.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./Tidsperioden-f06b1fb0.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./TidligereUtenlandsoppholdPanel-ff5a2a1b.js";import"./ErrorSummaryHookForm-1c260c28.js";import"./dates-53ab5347.js";import"./IntlProvider-0d1ea53b.js";import"./amplitude.esm-b6594747.js";import"./provider-679c532c.js";import"./dateFormValidation-53d645a6.js";import"./stepsConfig-38f20682.js";import"./amplitude-3a5afcfb.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";import"./message-42800413.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),Q={title:"steps/TidligereUtenlandsoppholdSteg",component:a,decorators:[c]},f=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:p,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(u,{onDispatch:p,initialState:{[S.UTENLANDSOPPHOLD]:s},children:e.jsx(a,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=f.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,Q as default};
//# sourceMappingURL=TidligereUtenlandsoppholdSteg.stories-bc5e67fd.js.map
