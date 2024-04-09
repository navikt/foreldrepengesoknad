import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as d}from"./AxiosMock-CeLgoW4g.js";import{i as c}from"./Step-C4VAanZM.js";import{F as x,C as S}from"./FpDataContext-DRW84C1R.js";import{S as u}from"./useFpNavigator-C0Dng-Rz.js";import{U as s}from"./UtenlandsoppholdSteg-i0CRmx4h.js";import{M as k}from"./index-KchjYVEa.js";import"./index-Cu9bd8lq.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-uYz_lIz2.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-C-6Uy6j4.js";import"./index-Ckls47V4.js";import"./links-dJHPeQm3.js";import"./message-DfLv_Bcn.js";import"./amplitude.esm-CWYNo8IU.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import"./lodash-o8vTUAkc.js";import"./Accordion-ebYyXW3f.js";import"./dateFormValidation-Dx0vmcZR.js";import"./TidligereUtenlandsoppholdPanel-VvAL8DND.js";import"./ErrorSummaryHookForm-C3CyVljj.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),V={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const W=["Default"];export{t as Default,W as __namedExportsOrder,V as default};
