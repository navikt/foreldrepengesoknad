import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-DMvy5sKZ.js";import{i as g}from"./infobox.module-CVZyvidf.js";import{F as u,C as x}from"./FpDataContext-BcznBdmF.js";import{S}from"./useFpNavigator-CnR-1yS3.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-CNvUdSzk.js";import{M as f}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor--4RFSKox.js";import"./axios-B4uVmeYG.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-JQeTBW8H.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./VStack-DueXo9sZ.js";import"./message-B0EXjA4g.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-GirJKqMw.js";import"../sb-preview/runtime.js";import"./Accordion-CumIhRkK.js";import"./extends-CF3RwP-h.js";import"./dateFormValidation-CArkorQM.js";import"./TidligereUtenlandsoppholdPanel-DfWJVt_I.js";import"./ErrorSummaryHookForm-CQIAe3xw.js";const k=()=>(...e)=>(l("button-click")(...e),Promise.resolve()),Z={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:()=>{}})})})})},t=D.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const $=["Default"];export{t as Default,$ as __namedExportsOrder,Z as default};
