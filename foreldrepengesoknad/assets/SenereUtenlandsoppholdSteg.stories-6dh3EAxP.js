import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as c}from"./AxiosMock-CeLgoW4g.js";import{i as S}from"./Step-BMWRf9Zj.js";import{F as u,C as x}from"./FpDataContext-CjNulmBK.js";import{S as g}from"./useFpNavigator-CF6j52oO.js";import{S as s}from"./SenereUtenlandsoppholdSteg-DzEmxweG.js";import{M as f}from"./index-B9A3zV3L.js";import"./index-Cu9bd8lq.js";import"./v4-D8aEg3BZ.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-DFNhTsrb.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-C-6Uy6j4.js";import"./index-Ckls47V4.js";import"./links-dJHPeQm3.js";import"./message-qQ5vTvVl.js";import"./amplitude.esm-CWYNo8IU.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import"./lodash-o8vTUAkc.js";import"./Accordion-cRWldgiV.js";import"./dateFormValidation-MA5Lqg6N.js";import"./TidligereUtenlandsoppholdPanel-RsPmHk88.js";import"./ErrorSummaryHookForm-B2xXlJjb.js";const k=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},X={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[g.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:l,children:o.jsx(u,{onDispatch:p,initialState:{[x.UTENLANDSOPPHOLD]:m},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=D.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const Y=["Default"];export{t as Default,Y as __namedExportsOrder,X as default};
