import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-38d35964.js";import{w as u}from"./withRouter-15cc08d4.js";import{w as v,F as b}from"./ForeldrepengerStateMock-2ca64e3f.js";import{A}from"./AxiosMock-9c813813.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-ac2e73e0.js";import"./index-7c191284.js";import"./IntlProvider-b5f77251.js";import"./validationUtils-3e3f35a1.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-32a27317.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./useSøknad-67949f34.js";import"./mapSøkerinfoDTO-c2e267b6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-ccd0af0e.js";import"./amplitude-bdf1e125.js";import"./api-02a26928.js";import"./apiInterceptor-c6c2844c.js";import"./submitUtils-3190d349.js";import"./Periodene-52ff0d39.js";import"./arbeidsforholdUtils-ee247546.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-e5198354.js";import"./useOnValidSubmit-9255204e.js";import"./useSøkerinfo-7098b049.js";import"./InteractiveListElement-d7163525.js";import"./Næring-34689996.js";import"./FormikFileUploader-a3627c10.js";import"./AttachmentList-ca8f0ac5.js";import"./Attachment-f47bbeea.js";import"./formUtils-628645da.js";import"./dateUtils-5eafd83c.js";import"./validationUtil-33877e28.js";import"./links-b36d21ab.js";const d=j,k=I,co={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(A,{mock:M,children:e.jsx(b,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-61e57733.js.map
