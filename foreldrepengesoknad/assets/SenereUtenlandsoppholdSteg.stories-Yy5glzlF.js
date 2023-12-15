import{j as e}from"./jsx-runtime-DtaoT6pD.js";import{a as p}from"./chunk-WFFRPTHA-4hQ1D0Dg.js";import{w as c}from"./withRouter-Y7oi-tYz.js";import{A as g}from"./AxiosMock-KQlr1Nb8.js";import{S as a}from"./SenereUtenlandsoppholdSteg-RdaARlBU.js";import{F as S,C as x}from"./FpDataContext-vZKgGA8_.js";import"./index-OjgoNOWw.js";import"./preview-errors-UTk86sAa.js";import"./index-PPLHz8o0.js";import"./v4-yQnnJER4.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./Tidsperioden-aDyM1aIt.js";import"./index-lbrLmSir.js";import"./Link-IggFwnrW.js";import"./index-rOAPTY5O.js";import"./TidligereUtenlandsoppholdPanel-dDNEHvpC.js";import"./ErrorSummaryHookForm-Hy6Unztp.js";import"./dates-pF37sd5-.js";import"./isNativeReflectConstruct-3LOYyi5T.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./amplitude.esm-OOIXs19H.js";import"./provider-wwBoMs8b.js";import"./dateFormValidation-LIdg5doX.js";import"./ExpansionCard-On_KGJWn.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./routes-IIwIGa6S.js";import"./validation-zAycEoXM.js";const u=()=>(...o)=>(p("button-click")(...o),Promise.resolve()),k={iNorgeNeste12Mnd:!1,iNorgeSiste12Mnd:!0},$={title:"steps/SenereUtenlandsoppholdSteg",component:a,decorators:[c]},f=({mellomlagreSøknadOgNaviger:o=u(),gåTilNesteSide:s,utenlandsforhold:m=k})=>{const l=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:l,children:e.jsx(S,{onDispatch:s,initialState:{[x.UTENLANDSOPPHOLD]:m},children:e.jsx(a,{mellomlagreSøknadOgNaviger:o,avbrytSøknad:p("button-click")})})})},t=f.bind({});var r,n,i;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsforhold = defaultUtenlandsopphold
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsforhold
    }}>
                <SenereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(i=(n=t.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const tt=["Default"];export{t as Default,tt as __namedExportsOrder,$ as default};
