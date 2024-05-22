import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{a as l}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as c}from"./AxiosMock-CeLgoW4g.js";import{i as g}from"./calendarLabel.module-DhZ3Lwem.js";import{F as u,C as x}from"./FpDataContext-DRW84C1R.js";import{S}from"./useFpNavigator-tojiILT5.js";import{T as a}from"./TidligereUtenlandsoppholdSteg-BqS-bx7S.js";import{M as f}from"./index-nutMI9v0.js";import"./index-Cu9bd8lq.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-BevdMO7W.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-C-6Uy6j4.js";import"./index-Ckls47V4.js";import"./links-BxC3kn8q.js";import"./message-BSSS8E56.js";import"./amplitude.esm-CWYNo8IU.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BVV-9dzB.js";import"./dateFormValidation--pIUBKYa.js";import"./TidligereUtenlandsoppholdPanel-D9AjAQKo.js";import"./ErrorSummaryHookForm-CnBTqOwC.js";const k=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),W={title:"steps/TidligereUtenlandsoppholdSteg",component:a},D=({mellomlagreSøknadOgNaviger:t=k(),gåTilNesteSide:s,utenlandsopphold:p={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{g();const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[S.TIDLIGERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:m,children:o.jsx(u,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:p},children:o.jsx(a,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})})},e=D.bind({});var r,i,n;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const X=["Default"];export{e as Default,X as __namedExportsOrder,W as default};
