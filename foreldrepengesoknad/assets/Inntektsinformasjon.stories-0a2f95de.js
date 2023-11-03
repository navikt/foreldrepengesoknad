import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-ab431e13.js";import{w as u,F as v}from"./ForeldrepengerStateMock-ae7feae9.js";import{A as b}from"./AxiosMock-5a6f61ee.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-ffc7ae53.js";import"./index-7c191284.js";import"./useSøknad-e5916e1e.js";import"./validationUtils-024c2399.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-1fb11dfb.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-695a75e8.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-b612c2e3.js";import"./amplitude-e7683f28.js";import"./api-6765dbc0.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-db323592.js";import"./Periodene-7d2fd09b.js";import"./arbeidsforholdUtils-d8402a3d.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-5ffc9a17.js";import"./useOnValidSubmit-63822350.js";import"./useSøkerinfo-17a18f9b.js";import"./InteractiveListElement-0e342548.js";import"./Næring-333aa14a.js";import"./FormikFileUploader-8915696f.js";import"./AttachmentList-f19a2777.js";import"./Attachment-a9115a99.js";import"./formUtils-a66fbbf6.js";import"./dateUtils-df7c4084.js";import"./validationUtil-f8a22dc9.js";import"./links-b36d21ab.js";const d=j,k=A,ao={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const po=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,po as __namedExportsOrder,ao as default};
//# sourceMappingURL=Inntektsinformasjon.stories-0a2f95de.js.map
