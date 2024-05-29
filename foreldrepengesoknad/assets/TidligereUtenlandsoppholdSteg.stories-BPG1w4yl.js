import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as l}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as c}from"./AxiosMock-CGbRsrix.js";import{i as g}from"./calendarLabel.module-wVQnbKSP.js";import{F as u,C as x}from"./FpDataContext-BcznBdmF.js";import{S}from"./useFpNavigator-7x8FqVW-.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-jY-b_3ag.js";import{M as f}from"./index-fVqCcxAQ.js";import"./index-DVXBtNgz.js";import"./v4-D8aEg3BZ.js";import"./index-BjQL7UeC.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-DXYe3XPH.js";import"./index-Dcs0RV0A.js";import"./Link-DySpfMj5.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./message-EI4tbH6H.js";import"./amplitude.esm-Ko43VyFv.js";import"./Accordion-BO-wEqF4.js";import"./dateFormValidation-B82aSwYS.js";import"./TidligereUtenlandsoppholdPanel-DTeuC_zZ.js";import"./ErrorSummaryHookForm-Bo1Jdkxv.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),V={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})})},e=D.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{e as Default,W as __namedExportsOrder,V as default};
