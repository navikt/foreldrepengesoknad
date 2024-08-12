import{j as o}from"./jsx-runtime-CexXSJP5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-c2nI01-r.js";import{i as c}from"./CalendarLabel-iBtvGrTW.js";import{F as x,C as S}from"./FpDataContext-QYm6HSmG.js";import{S as u}from"./useFpNavigator-DqOhgrdD.js";import{U as s}from"./UtenlandsoppholdSteg-s1RgoCh7.js";import{M as k}from"./index-BiY12grZ.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-BoaXTu2W.js";import"./index-Snk9MO9S.js";import"./_createSet-W-93wHM-.js";import"./_baseToString-7VaozA17.js";import"./Link-DYtqBS4e.js";import"./index-CSpfAsmC.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CZgfZ5qV.js";import"./message-D4CRMusj.js";import"./amplitude.esm-6vgTx8-c.js";import"./iframe-DgI_n3Io.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-0aHRLjqu.js";import"./dateFormValidation-CWbmO6hM.js";import"./TidligereUtenlandsoppholdPanel-otQuhKJ_.js";import"./ErrorSummaryHookForm-Aeitu5ta.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),Y={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Z=["Default"];export{t as Default,Z as __namedExportsOrder,Y as default};
