import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{A as d}from"./AxiosMock-DMvy5sKZ.js";import{i as c}from"./infobox.module-B8LgfpMa.js";import{F as x,C as S}from"./FpDataContext-BcznBdmF.js";import{S as u}from"./useFpNavigator-B2r1moHz.js";import{U as s}from"./UtenlandsoppholdSteg-CxRRl6f0.js";import{M as k}from"./index-L4B05WfX.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./index-C4x6kqll.js";import"./apiInterceptor--4RFSKox.js";import"./axios-B4uVmeYG.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-C-i4iOOf.js";import"./index-Dcs0RV0A.js";import"./Link-SOWRV7cb.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./message-2fcxXlkE.js";import"./amplitude.esm-BThBy0fb.js";import"./Accordion-Da0C7JtW.js";import"./dateFormValidation-DEBWM2F4.js";import"./TidligereUtenlandsoppholdPanel-XZxI6Ewi.js";import"./ErrorSummaryHookForm-NbRiA8N6.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),Q={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
}`,...(n=(i=t.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const V=["Default"];export{t as Default,V as __namedExportsOrder,Q as default};
