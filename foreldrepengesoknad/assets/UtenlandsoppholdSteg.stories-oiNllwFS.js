import{j as r}from"./jsx-runtime-DtaoT6pD.js";import{a as p}from"./chunk-WFFRPTHA-4hQ1D0Dg.js";import{w as c}from"./withRouter-Y7oi-tYz.js";import{A as d}from"./AxiosMock-KQlr1Nb8.js";import{U as a}from"./UtenlandsoppholdSteg-Tr6bmRnM.js";import{F as x,C as g}from"./FpDataContext-vZKgGA8_.js";import"./index-OjgoNOWw.js";import"./preview-errors-UTk86sAa.js";import"./index-PPLHz8o0.js";import"./v4-yQnnJER4.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./Tidsperioden-2d_zadTE.js";import"./index-lbrLmSir.js";import"./Link-IggFwnrW.js";import"./index-rOAPTY5O.js";import"./TidligereUtenlandsoppholdPanel-m31CkPaX.js";import"./ErrorSummaryHookForm-ivB6UGrU.js";import"./dates-BDcfIrhq.js";import"./isNativeReflectConstruct-3LOYyi5T.js";import"./IntlProvider-eOIIgBUy.js";import"./Alert-OmuhvhWR.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./amplitude.esm-OOIXs19H.js";import"./provider-hl4zZLWq.js";import"./dateFormValidation-aaqGQ_dj.js";import"./ExpansionCard-2pe3TaGZ.js";import"./stepsConfig-e97TxKrD.js";import"./amplitude--qTo3lH-.js";import"./routes-IIwIGa6S.js";const S=()=>(...t)=>(p("button-click")(...t),Promise.resolve()),X={title:"steps/UtenlandsoppholdSteg",component:a,decorators:[c]},k=({mellomlagreSøknadOgNaviger:t=S(),gåTilNesteSide:s})=>{const m=l=>{l.onPost("/storage/foreldrepenger").reply(200,void 0)};return r.jsx(d,{mock:m,children:r.jsx(x,{onDispatch:s,initialState:{[g.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"mor"}},children:r.jsx(a,{mellomlagreSøknadOgNaviger:t,avbrytSøknad:p("button-click")})})})},o=k.bind({});var e,i,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`({
  mellomlagreSøknadOgNaviger = promiseAction(),
  gåTilNesteSide
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'mor'
      }
    }}>
                <UtenlandsoppholdSteg mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(n=(i=o.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const Y=["Default"];export{o as Default,Y as __namedExportsOrder,X as default};
