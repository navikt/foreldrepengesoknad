import{j as t}from"./jsx-runtime-_e34SzbC.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as c}from"./AxiosMock-C4Zycm12.js";import{i as S}from"./infobox.module-dOgdnwRj.js";import{F as u,C as x}from"./FpDataContext-BcznBdmF.js";import{S as g}from"./useFpNavigator-CHGEXd4t.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DVnXMrfb.js";import{M as f}from"./index-BI6FGWNT.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor-ChqlQpSB.js";import"./Tidsperioden-rxgXw82A.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./_createSet-CoetV_mz.js";import"./_baseToString-VGUwjf1B.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-CC8GsxBw.js";import"./VStack-DueXo9sZ.js";import"./message-DQ6pPJ7w.js";import"./amplitude.esm-BThBy0fb.js";import"./iframe-qJB2sFZJ.js";import"../sb-preview/runtime.js";import"./_baseForOwn-D6bZXbyQ.js";import"./_baseUniq-Rh-qUUb2.js";import"./Accordion-DdLEgjtJ.js";import"./dateFormValidation-BPyXpKDk.js";import"./TidligereUtenlandsoppholdPanel-DRNyRbYh.js";import"./ErrorSummaryHookForm-Ca0bzyo6.js";const k=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},Z={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/rest/storage/foreldrepenger").reply(200,void 0)};return t.jsx(f,{initialEntries:[g.SENERE_UTENLANDSOPPHOLD],children:t.jsx(c,{mock:l,children:t.jsx(u,{onDispatch:p,initialState:{[x.UTENLANDSOPPHOLD]:m},children:t.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},o=D.bind({});var r,n,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
