import{j as t}from"./jsx-runtime-1caa8f64.js";import{a}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as c}from"./AxiosMock-ed819255.js";import{U as s}from"./UtenlandsoppholdSteg-08966bac.js";import{F as d,C as x}from"./FpDataContext-c0784ba8.js";import{S}from"./useFpNavigator-f31fd526.js";import{i as u}from"./amplitude-db41cfb9.js";import{M as k}from"./dateFormValidation-bfde5cde.js";import"./index-1cdf6ce0.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-bcca6cba.js";import"./apiInterceptor-716e24db.js";import"./IntlProvider-4448d7ec.js";import"./dates-096df86f.js";import"./Tidsperioden-3740d843.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./index-753920cd.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import"./provider-40d4318a.js";import"./TidligereUtenlandsoppholdPanel-697d5fc6.js";import"./ErrorSummaryHookForm-5d5f0808.js";import"./isNativeReflectConstruct-554b52b6.js";import"./ExpansionCard-7ff5568c.js";import"./amplitude.esm-2809efde.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),V={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{u();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return t.jsx(k,{initialEntries:[S.UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(d,{onDispatch:p,initialState:{[x.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:t.jsx(s,{mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},o=f.bind({});var e,i,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        }
      }}>
                    <UtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{o as Default,W as __namedExportsOrder,V as default};
