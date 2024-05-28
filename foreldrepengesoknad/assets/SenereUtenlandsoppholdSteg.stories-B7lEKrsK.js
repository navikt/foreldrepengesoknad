import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a}from"./chunk-MZXVCX43-DWuJqIWT.js";import{A as c}from"./AxiosMock-CGbRsrix.js";import{i as S}from"./calendarLabel.module-Dbis9Riv.js";import{F as u,C as x}from"./FpDataContext-BcznBdmF.js";import{S as g}from"./useFpNavigator-Wnp7Ko2q.js";import{S as s}from"./SenereUtenlandsoppholdSteg-UePEZDiZ.js";import{M as f}from"./index-GCNtJq5R.js";import"./index-DVXBtNgz.js";import"./v4-D8aEg3BZ.js";import"./index-BjQL7UeC.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./Tidsperioden-CMQ6DXG2.js";import"./index-Dcs0RV0A.js";import"./Link-DySpfMj5.js";import"./_createSet-BJbToUt4.js";import"./_baseToString-CUxX9raG.js";import"./index--IHLcpuH.js";import"./index-Cbx7Fas8.js";import"./links-BFd19Kxc.js";import"./message-BD58Fkqk.js";import"./amplitude.esm-Ko43VyFv.js";import"./Accordion-WogZGdsL.js";import"./dateFormValidation-DaFK5-XB.js";import"./TidligereUtenlandsoppholdPanel-Sog1X6Nn.js";import"./ErrorSummaryHookForm-ClTdhXAu.js";const k=()=>(...e)=>(a("button-click")(...e),Promise.resolve()),N={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},W={title:"steps/SenereUtenlandsoppholdSteg",component:s},D=({mellomlagreSøknadOgNaviger:e=k(),gåTilNesteSide:p,utenlandsforhold:m=N})=>{S();const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return o.jsx(f,{initialEntries:[g.SENERE_UTENLANDSOPPHOLD],children:o.jsx(c,{mock:l,children:o.jsx(u,{onDispatch:p,initialState:{[x.UTENLANDSOPPHOLD]:m},children:o.jsx(s,{arbeidsforhold:[],mellomlagreSøknadOgNaviger:e,avbrytSøknad:a("button-click")})})})})},t=D.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
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
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const X=["Default"];export{t as Default,X as __namedExportsOrder,W as default};
