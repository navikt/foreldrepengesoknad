import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-5b625509.js";import{w as u}from"./withRouter-50e5a3a8.js";import{w as v,F as b}from"./ForeldrepengerStateMock-5e97e270.js";import{A}from"./AxiosMock-84c9c037.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-98b93d58.js";import"./index-7c191284.js";import"./IntlProvider-819d5fbb.js";import"./validationUtils-0c7fa3e5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-a6eb7500.js";import"./dateUtils-2cd75fe4.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-c91ff169.js";import"./useSaveLoadedRoute-be1eb81e.js";import"./amplitude-bdf1e125.js";import"./api-7b722a65.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-c3cad064.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-3d0150ec.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-07636938.js";import"./Periodene-255b16d1.js";import"./useOnValidSubmit-bd5aa797.js";import"./useSøkerinfo-79a04600.js";import"./InteractiveListElement-d45b3155.js";import"./Næring-2c722a3b.js";import"./Skjemanummer-77149054.js";import"./formUtils-d5863e5c.js";import"./index-47edccfa.js";import"./FormikFileUploader-101bf53f.js";import"./AttachmentList-563636ad.js";import"./Attachment-0ba07e00.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-3d17ffc1.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-72a63e7e.js.map
