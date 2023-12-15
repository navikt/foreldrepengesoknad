import{j as e}from"./jsx-runtime-DtaoT6pD.js";import{a as l}from"./chunk-WFFRPTHA-4hQ1D0Dg.js";import{w as c}from"./withRouter-Y7oi-tYz.js";import{A as g}from"./AxiosMock-KQlr1Nb8.js";import{T as p}from"./TidligereUtenlandsoppholdSteg-6yxkKV8D.js";import{F as x,C as u}from"./FpDataContext-vZKgGA8_.js";import"./index-OjgoNOWw.js";import"./preview-errors-UTk86sAa.js";import"./index-PPLHz8o0.js";import"./v4-yQnnJER4.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./Tidsperioden-aDyM1aIt.js";import"./index-lbrLmSir.js";import"./Link-IggFwnrW.js";import"./index-rOAPTY5O.js";import"./TidligereUtenlandsoppholdPanel-dDNEHvpC.js";import"./ErrorSummaryHookForm-Hy6Unztp.js";import"./dates-pF37sd5-.js";import"./isNativeReflectConstruct-3LOYyi5T.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./amplitude.esm-OOIXs19H.js";import"./provider-wwBoMs8b.js";import"./dateFormValidation-LIdg5doX.js";import"./ExpansionCard-On_KGJWn.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./routes-IIwIGa6S.js";import"./validation-zAycEoXM.js";const S=()=>(...t)=>(l("button-click")(...t),Promise.resolve()),Z={title:"steps/TidligereUtenlandsoppholdSteg",component:p,decorators:[c]},k=({mellomlagreSøknadOgNaviger:t=S(),gåTilNesteSide:a,utenlandsopphold:s={iNorgeNeste12Mnd:!0,iNorgeSiste12Mnd:!1}})=>{const m=d=>{d.onPost("/storage/foreldrepenger").reply(200,void 0)};return e.jsx(g,{mock:m,children:e.jsx(x,{onDispatch:a,initialState:{[u.UTENLANDSOPPHOLD]:s},children:e.jsx(p,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:()=>{}})})})},o=k.bind({});var r,i,n;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide,
  utenlandsopphold = {
    iNorgeNeste12Mnd: true,
    iNorgeSiste12Mnd: false
  }
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.UTENLANDSOPPHOLD]: utenlandsopphold
    }}>
                <TidligereUtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const $=["Default"];export{o as Default,$ as __namedExportsOrder,Z as default};
