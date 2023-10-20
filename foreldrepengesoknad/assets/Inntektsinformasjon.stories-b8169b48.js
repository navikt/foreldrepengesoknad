import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-34c91a9f.js";import{w as u}from"./withRouter-025ea7c0.js";import{w as v,F as b}from"./ForeldrepengerStateMock-14e379f5.js";import{A}from"./AxiosMock-6b1c8141.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-30bf03a3.js";import"./index-7c191284.js";import"./IntlProvider-703d2280.js";import"./validationUtils-52801e0e.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-d91e9ba5.js";import"./dateUtils-04b407de.js";import"./mapSøkerinfoDTO-3b9336f6.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-66d41ce7.js";import"./amplitude-bdf1e125.js";import"./api-9c727c36.js";import"./apiInterceptor-c6c2844c.js";import"./globalUtil-c820f73d.js";import"./submitUtils-11ed6e7a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-fe89b468.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-604aac1e.js";import"./Periodene-21fb5519.js";import"./useOnValidSubmit-afa78197.js";import"./useSøkerinfo-1c6ac28b.js";import"./InteractiveListElement-c57ea1bb.js";import"./Næring-460fe121.js";import"./Skjemanummer-77149054.js";import"./formUtils-3000cdf9.js";import"./index-47edccfa.js";import"./FormikFileUploader-e00993c8.js";import"./AttachmentList-d5fc7a0c.js";import"./Attachment-8546de5c.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-4e04f67c.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-b8169b48.js.map
