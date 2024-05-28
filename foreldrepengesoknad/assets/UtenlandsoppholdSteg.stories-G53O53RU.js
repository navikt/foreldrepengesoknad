import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as d}from"./AxiosMock-CGbRsrix.js";import{i as c}from"./calendarLabel.module-Dbis9Riv.js";import{F as x,C as S}from"./FpDataContext-BcznBdmF.js";import{S as u}from"./useFpNavigator-Wnp7Ko2q.js";import{U as s}from"./UtenlandsoppholdSteg-Boe6p7yD.js";import{M as k}from"./index-GCNtJq5R.js";import"./index-DVXBtNgz.js";import"./v4-D8aEg3BZ.js";import"./index-BjQL7UeC.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-CMQ6DXG2.js";import"./index-Dcs0RV0A.js";import"./Link-DySpfMj5.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./message-BD58Fkqk.js";import"./amplitude.esm-Ko43VyFv.js";import"./Accordion-WogZGdsL.js";import"./dateFormValidation-DaFK5-XB.js";import"./TidligereUtenlandsoppholdPanel-Sog1X6Nn.js";import"./ErrorSummaryHookForm-ClTdhXAu.js";const g=()=>(...r)=>(a("button-click")(...r),Promise.resolve()),Q={title:"steps/UtenlandsoppholdSteg",component:s},f=({mellomlagreSøknadOgNaviger:r=g(),gåTilNesteSide:p})=>{c();const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(k,{initialEntries:[u.UTENLANDSOPPHOLD],children:o.jsx(d,{mock:m,children:o.jsx(x,{onDispatch:p,initialState:{[S.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:r,avbrytSøknad:a("button-click")})})})})},t=f.bind({});var e,i,n;t.parameters={...t.parameters,docs:{...(e=t.parameters)==null?void 0:e.docs,source:{originalSource:`({
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
