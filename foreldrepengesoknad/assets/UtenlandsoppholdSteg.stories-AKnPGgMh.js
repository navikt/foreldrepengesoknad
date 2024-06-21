import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-C4Zycm12.js";import{i as c}from"./infobox.module-C6EJlmxW.js";import{F as x,C as S}from"./FpDataContext-BcznBdmF.js";import{S as u}from"./useFpNavigator-DcuO2HGA.js";import{U as s}from"./UtenlandsoppholdSteg-BZLF3eda.js";import{M as k}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./Tidsperioden-CgKXkiJn.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-F23LOZ2f.js";import"./VStack-DueXo9sZ.js";import"./message-ao616OJ-.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-vrw9w34l.js";import"../sb-preview/runtime.js";import"./Accordion-D8_sL749.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-B1zxw5-4.js";import"./TidligereUtenlandsoppholdPanel-Cz3AXI6R.js";import"./ErrorSummaryHookForm-CRsdqX36.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),W={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'mor'
        }
      }}>
                    <UtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const X=["Default"];export{t as Default,X as __namedExportsOrder,W as default};
