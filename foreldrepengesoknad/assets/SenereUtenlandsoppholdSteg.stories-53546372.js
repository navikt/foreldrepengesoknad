import{j as e}from"./jsx-runtime-d079401a.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as c}from"./withRouter-d9926836.js";import{A as g}from"./AxiosMock-3df40305.js";import{S as a}from"./SenereUtenlandsoppholdSteg-6320183d.js";import{F as S,C as x}from"./FpDataContext-fc20d236.js";import"./index-f1f2c4b1.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-d706a9c9.js";import"./Tidsperioden-c7c469a7.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-d741deb4.js";import"./TidligereUtenlandsoppholdPanel-9b9c466d.js";import"./ErrorSummaryHookForm-d1fabdbb.js";import"./dates-af043b32.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./IntlProvider-6f6ec735.js";import"./Alert-d624eb67.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude.esm-ec80886e.js";import"./provider-4d9680fc.js";import"./dateFormValidation-c51310cf.js";import"./ExpansionCard-cdfa7095.js";import"./stepsConfig-ab908a62.js";import"./amplitude-b929dfa7.js";import"./routes-9effe5a6.js";import"./validation-631bcf6e.js";const u=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),k={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},$={title:"steps/SenereUtenlandsoppholdSteg",component:a,decorators:[c]},f=({mellomlagreSøknadOgNaviger:o=u(),gåTilNesteSide:s,utenlandsforhold:m=k})=>{const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:l,children:e.jsx(S,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:m},children:e.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:p("button-click")})})})},t=f.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const tt=["Default"];export{t as Default,tt as __namedExportsOrder,$ as default};