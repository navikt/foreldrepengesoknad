import{j as o}from"./jsx-runtime-CexXSJP5.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-c2nI01-r.js";import{i as g}from"./CalendarLabel-iBtvGrTW.js";import{F as u,C as x}from"./FpDataContext-QYm6HSmG.js";import{S}from"./useFpNavigator-BxqLrr8_.js";import{T as s}from"./TidligereUtenlandsoppholdSteg-YJLd5BBC.js";import{M as f}from"./index-BiY12grZ.js";import"./index-BP8_t0zE.js";import"./v4-CQkTLCs1.js";import"./index-DfkQcp4z.js";import"./apiInterceptor-D-WKbiXB.js";import"./Tidsperioden-BoaXTu2W.js";import"./index-Snk9MO9S.js";import"./_createSet-W-93wHM-.js";import"./_baseToString-7VaozA17.js";import"./Link-DYtqBS4e.js";import"./index-CSpfAsmC.js";import"./index-BxmsGmlx.js";import"./links-BP9VcYJA.js";import"./VStack-CZgfZ5qV.js";import"./message-D4CRMusj.js";import"./amplitude.esm-6vgTx8-c.js";import"./iframe-DOtEHmIg.js";import"../sb-preview/runtime.js";import"./guid-CsArkN6i.js";import"./_baseForOwn-BL0n5IRD.js";import"./_baseUniq-DaL16s-J.js";import"./Accordion-0aHRLjqu.js";import"./dateFormValidation-CWbmO6hM.js";import"./TidligereUtenlandsoppholdPanel-B41RPG3G.js";import"./ErrorSummaryHookForm-CnsBC3s1.js";const k=()=>(...e)=>(l("button-click")(...e),Promise.resolve()),Z={title:"steps/TidligereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:a,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:a,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:()=>{}})})})})},t=D.bind({});var r,i,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const $=["Default"];export{t as Default,$ as __namedExportsOrder,Z as default};
