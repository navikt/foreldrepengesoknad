import{j as t}from"./jsx-runtime-CexXSJP5.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as g}from"./ByttBrowserModal-DayHb9LT.js";import{M as u,F as x,C as S}from"./FpDataContext-BTc1vbhf.js";import{S as k}from"./useFpNavigator-CdWkr2RF.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-C7pCsM8_.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-3yUk3KJR.js";import"./index-Snk9MO9S.js";import"./_createSet-W-93wHM-.js";import"./_baseToString-7VaozA17.js";import"./Link-DYtqBS4e.js";import"./index-CSpfAsmC.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CEp4cwmC.js";import"./message-Qnk54Yzy.js";import"./iframe-CyFZgjRx.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-DgSYGbzJ.js";import"./dateFormValidation-CLVJHkB9.js";import"./TidligereUtenlandsoppholdPanel-DBAOVMM_.js";import"./ErrorSummaryHookForm-BF84C_U2.js";const D=()=>(...o)=>(l("button-click")(...o),Promise.resolve()),X={title:"steps/TidligereUtenlandsoppholdSteg",component:s},N=({mellomlagreSøknadOgNaviger:o=D(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(u,{initialEntries:[k.TIDLIGERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:m,children:t.jsx(x,{onDispatch:a,initialState:{[S.UTENLANDSOPPHOLD]:p},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:o,avbrytSøknad:()=>{}})})})})},e=N.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/rest/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
      }}>
                    <TidligereUtenlandsoppholdSteg arbeidsforhold={[]} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{e as Default,Y as __namedExportsOrder,X as default};
