import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-9db7cf2b.js";import{w as u}from"./withRouter-5479545e.js";import{w as v,F as b}from"./ForeldrepengerStateMock-b6ff45d9.js";import{A}from"./AxiosMock-614edbac.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-b99821ca.js";import"./index-7c191284.js";import"./IntlProvider-cd45b197.js";import"./validationUtils-68fdb7d5.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-58e1e63c.js";import"./dateUtils-81ed5d0d.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-41fd83b3.js";import"./useSaveLoadedRoute-595bc55d.js";import"./amplitude-bdf1e125.js";import"./api-76fc5e42.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-aa948b10.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-e0adc417.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-f6466e89.js";import"./Periodene-56662112.js";import"./useOnValidSubmit-b1178fb5.js";import"./useSøkerinfo-28fd1ed5.js";import"./InteractiveListElement-f1388397.js";import"./Næring-66e00e89.js";import"./Skjemanummer-77149054.js";import"./formUtils-6989130f.js";import"./index-47edccfa.js";import"./FormikFileUploader-a76ae1f6.js";import"./AttachmentList-79b2b754.js";import"./Attachment-b9034d2e.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-955e2877.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-521b8ac1.js.map
