import{j as t}from"./jsx-runtime-CexXSJP5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as S}from"./CalendarLabel-Cwj7ViES.js";import{F as u,C as x}from"./FpDataContext-QYm6HSmG.js";import{S as g}from"./useFpNavigator-eSxQ499P.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DwUlPckn.js";import{M as f}from"./index-BiY12grZ.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-aPvVQaRz.js";import"./index-Snk9MO9S.js";import"./Link-DYtqBS4e.js";import"./_createSet-W-93wHM-.js";import"./_baseToString-7VaozA17.js";import"./index-CSpfAsmC.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CyTP2Yd3.js";import"./message-BuQN_KsK.js";import"./amplitude.esm-6vgTx8-c.js";import"./iframe-Ckp-55YK.js";import"../sb-preview/runtime.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-CNWkh_cy.js";import"./dateFormValidation-C6MyJzWm.js";import"./TidligereUtenlandsoppholdPanel-7Uvp4DWV.js";import"./ErrorSummaryHookForm-Bvf3Qqig.js";const k=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},Z={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(f,{initialEntries:[g.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(u,{onDispatch:p,initialState:{[x.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.SENERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
      }}>
                    <SenereUtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const $=["Default"];export{o as Default,$ as __namedExportsOrder,Z as default};
