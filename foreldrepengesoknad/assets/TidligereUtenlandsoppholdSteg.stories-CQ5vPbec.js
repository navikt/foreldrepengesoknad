import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-C4Zycm12.js";import{i as g}from"./infobox.module-Kj731C_u.js";import{F as u,C as x}from"./FpDataContext-BcznBdmF.js";import{S}from"./useFpNavigator-K0elNXQs.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-CqAz1fSN.js";import{M as f}from"./index-CwWZCJxy.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./Tidsperioden-njylIMVp.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./_createSet-CoetV_mz.js";import"./_baseToString-VGUwjf1B.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-CC8GsxBw.js";import"./VStack-stIgd7Rx.js";import"./message-CCpoRCAO.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-BlM1fel4.js";import"../sb-preview/runtime.js";import"./_baseForOwn-D6bZXbyQ.js";import"./_baseUniq-B8_UHRR6.js";import"./dateFormValidation-B7yIqxFH.js";import"./TidligereUtenlandsoppholdPanel-oEST04ij.js";import"./ErrorSummaryHookForm-iHYhdvmV.js";const k=()=>(...e)=>(l("button-click")(...e),Promise.resolve()),X={title:"steps/TidligereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:a,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:()=>{}})})})})},t=D.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
