import{j as e}from"./jsx-runtime-d079401a.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as c}from"./withRouter-056ed14f.js";import{A as g}from"./AxiosMock-b335a275.js";import{T as p}from"./TidligereUtenlandsoppholdSteg-65c76240.js";import{F as x,C as u}from"./FpDataContext-fc20d236.js";import"./index-f1f2c4b1.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-aa2fc0fb.js";import"./index-c74c9f7f.js";import"./index-7358cd3c.js";import"./apiInterceptor-87eb5c75.js";import"./Tidsperioden-afc010ce.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-2d278ef6.js";import"./TidligereUtenlandsoppholdPanel-eb325a37.js";import"./ErrorSummaryHookForm-5d2e4bc9.js";import"./dates-ea75985c.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./IntlProvider-1d050b75.js";import"./Alert-b7f2f34f.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude.esm-ec80886e.js";import"./provider-ab6750f4.js";import"./dateFormValidation-0f42e63c.js";import"./ExpansionCard-1704ba17.js";import"./stepsConfig-1d01a503.js";import"./amplitude-b929dfa7.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";const S=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),Z={title:"steps/TidligereUtenlandsoppholdSteg",component:p,decorators:[c]},k=({mellomlagreSøknadOgNaviger:t=S(),gåTilNesteSide:a,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(x,{onDispatch:a,initialState:{[u.UTENLANDSOPPHOLD]:s},children:e.jsx(p,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=k.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const $=["Default"];export{o as Default,$ as __namedExportsOrder,Z as default};
