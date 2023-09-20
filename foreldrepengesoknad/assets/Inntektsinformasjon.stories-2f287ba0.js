import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-327f3ef0.js";import{w as u}from"./withRouter-c6412e9a.js";import{w as v,F as b}from"./ForeldrepengerStateMock-6f40a059.js";import{A}from"./AxiosMock-1baf8c71.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-f3a926c7.js";import"./index-7c191284.js";import"./IntlProvider-361e6eea.js";import"./validationUtils-7f8e3dc4.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-fd4f0430.js";import"./dateUtils-ec18dffd.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-e6f23460.js";import"./useSaveLoadedRoute-84122a1f.js";import"./amplitude-bdf1e125.js";import"./api-dee1c3e5.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-f8f37997.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-649ffe6b.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-2fc4c766.js";import"./Periodene-64603459.js";import"./useOnValidSubmit-1806d937.js";import"./useSøkerinfo-5c46a0df.js";import"./InteractiveListElement-dbda66c4.js";import"./Næring-167d6b9c.js";import"./Skjemanummer-77149054.js";import"./formUtils-d0f40c5a.js";import"./index-47edccfa.js";import"./FormikFileUploader-e22903e7.js";import"./AttachmentList-b9802f6e.js";import"./Attachment-2332781e.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-d0ecf24f.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};var p,a,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`({
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
}`,...(m=(a=r.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};const Ao=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,Ao as __namedExportsOrder,bo as default};
//# sourceMappingURL=Inntektsinformasjon.stories-2f287ba0.js.map
