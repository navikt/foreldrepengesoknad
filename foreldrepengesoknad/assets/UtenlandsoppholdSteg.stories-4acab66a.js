import{j as r}from"./jsx-runtime-d079401a.js";import{a as p}from"./chunk-WFFRPTHA-80d37c1b.js";import{w as c}from"./withRouter-d9926836.js";import{A as d}from"./AxiosMock-07682dd6.js";import{U as a}from"./UtenlandsoppholdSteg-95ba0bce.js";import{F as x,C as g}from"./FpDataContext-6d6d78b0.js";import"./index-f1f2c4b1.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./Tidsperioden-2f191506.js";import"./index-b580f7e8.js";import"./Link-13f307fd.js";import"./index-d741deb4.js";import"./TidligereUtenlandsoppholdPanel-a7b674d8.js";import"./ErrorSummaryHookForm-9ac5db85.js";import"./dates-584a13c3.js";import"./isNativeReflectConstruct-81b4d0cb.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./amplitude.esm-ec80886e.js";import"./provider-1018c8f1.js";import"./dateFormValidation-f3ff7428.js";import"./ExpansionCard-e912aff3.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./routes-7ba66c63.js";const S=()=>(...t)=>(p("button-click")(...t),Promise.resolve()),X={title:"steps/UtenlandsoppholdSteg",component:a,decorators:[c]},k=({mellomlagreSøknadOgNaviger:t=S(),gåTilNesteSide:s})=>{const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(d,{mock:m,children:r.jsx(x,{onDispatch:s,initialState:{[g.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:r.jsx(a,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:p("button-click")})})})},o=k.bind({});var e,i,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{o as Default,Y as __namedExportsOrder,X as default};
