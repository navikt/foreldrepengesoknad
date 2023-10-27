import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-4043b8b4.js";import{w as u}from"./withRouter-2e2c6e6b.js";import{w as v,F as b}from"./ForeldrepengerStateMock-8c04d332.js";import{A}from"./AxiosMock-f4313c42.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-a0cbde2a.js";import"./index-7c191284.js";import"./IntlProvider-7d7f37e2.js";import"./validationUtils-3923a44f.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-bb41a340.js";import"./mapSøkerinfoDTO-f0b0bc3c.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-d6f51789.js";import"./amplitude-bdf1e125.js";import"./api-38cb33cc.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-4c286eb0.js";import"./Periodene-7b9c80a7.js";import"./arbeidsforholdUtils-667b1f29.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-e5198354.js";import"./useOnValidSubmit-6a5c6f7b.js";import"./useSøkerinfo-ae49b1f5.js";import"./InteractiveListElement-b6030105.js";import"./Næring-cfb2428d.js";import"./FormikFileUploader-cbd05895.js";import"./AttachmentList-bc8c7263.js";import"./Attachment-31710907.js";import"./formUtils-f08b9c6b.js";import"./dateUtils-8d5a81ce.js";import"./validationUtil-eb14dde0.js";import"./links-b36d21ab.js";const d=j,k=I,co={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(A,{mock:M,children:e.jsx(b,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Inntektsinformasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(i=(s=o.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var a,p,m;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`({
  context,
  søkerinfo
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <ForeldrepengerStateMock søknad={context} søkerinfo={søkerinfo}>
                <Inntektsinformasjon />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const ko=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,ko as __namedExportsOrder,co as default};
//# sourceMappingURL=Inntektsinformasjon.stories-ec9f65ef.js.map
