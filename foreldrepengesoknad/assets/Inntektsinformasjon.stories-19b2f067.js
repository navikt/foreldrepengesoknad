import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-399c5617.js";import{w as u}from"./withRouter-301aa323.js";import{w as v,F as b}from"./ForeldrepengerStateMock-ab70662c.js";import{A}from"./AxiosMock-b3174e3d.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-f89d4159.js";import"./index-7c191284.js";import"./IntlProvider-5610d1ac.js";import"./validationUtils-5cf0875a.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-4276ca26.js";import"./dateUtils-b148e0a6.js";import"./Environment-07523402.js";import"./mapSøkerinfoDTO-3498614f.js";import"./useSaveLoadedRoute-a887bf0a.js";import"./amplitude-bdf1e125.js";import"./api-265d54eb.js";import"./apiInterceptor-dfae0758.js";import"./globalUtil-c820f73d.js";import"./submitUtils-8627933a.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-c6c4eae6.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-e561e2d9.js";import"./Periodene-bb5ac21b.js";import"./useOnValidSubmit-e4075478.js";import"./useSøkerinfo-68255a72.js";import"./InteractiveListElement-fde6f7a9.js";import"./Næring-8ea7e075.js";import"./Skjemanummer-77149054.js";import"./formUtils-1c3c4c72.js";import"./index-47edccfa.js";import"./FormikFileUploader-b9a22ddc.js";import"./AttachmentList-078041b4.js";import"./Attachment-1d2dae1a.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-e11336c6.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-19b2f067.js.map
