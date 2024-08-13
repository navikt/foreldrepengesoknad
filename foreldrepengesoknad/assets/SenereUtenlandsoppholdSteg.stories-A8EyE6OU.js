import{j as t}from"./jsx-runtime-CexXSJP5.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as S}from"./ByttBrowserModal-CgGMQIsa.js";import{M as u,F as x,C as g}from"./FpDataContext-BTc1vbhf.js";import{S as k}from"./useFpNavigator-3jYXfJIh.js";import{S as s}from"./SenereUtenlandsoppholdSteg-Xi7PsdOE.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-C_pastYj.js";import"./index-Snk9MO9S.js";import"./_createSet-W-93wHM-.js";import"./_baseToString-7VaozA17.js";import"./Link-DYtqBS4e.js";import"./index-CSpfAsmC.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-BuY3ndmb.js";import"./message-C9ZPApQI.js";import"./iframe-MK9URtGN.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-Ddhh6XZU.js";import"./dateFormValidation-BhoQzmb-.js";import"./TidligereUtenlandsoppholdPanel-Stm_blRz.js";import"./ErrorSummaryHookForm-3lA-x6SV.js";const f=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},Y={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=f(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[k.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(x,{onDispatch:p,initialState:{[g.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=o.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const Z=["Default"];export{o as Default,Z as __namedExportsOrder,Y as default};
