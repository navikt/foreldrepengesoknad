import{j as e}from"./jsx-runtime-d079401a.js";import{a as l}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as c}from"./withRouter-d9926836.js";import{A as g}from"./AxiosMock-3df40305.js";import{T as p}from"./TidligereUtenlandsoppholdSteg-6e8646f7.js";import{F as x,C as u}from"./FpDataContext-fc20d236.js";import"./index-f1f2c4b1.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-d706a9c9.js";import"./Tidsperioden-c7c469a7.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-d741deb4.js";import"./TidligereUtenlandsoppholdPanel-85098921.js";import"./ErrorSummaryHookForm-84a9a799.js";import"./dates-af043b32.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./IntlProvider-7ad0c0b7.js";import"./Alert-d624eb67.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude.esm-ec80886e.js";import"./provider-4d9680fc.js";import"./dateFormValidation-c51310cf.js";import"./ExpansionCard-cdfa7095.js";import"./stepsConfig-ab908a62.js";import"./amplitude-b929dfa7.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";const S=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),Z={title:"steps/TidligereUtenlandsoppholdSteg",component:p,decorators:[c]},k=({mellomlagreSøknadOgNaviger:t=S(),gåTilNesteSide:a,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(x,{onDispatch:a,initialState:{[u.UTENLANDSOPPHOLD]:s},children:e.jsx(p,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=k.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
