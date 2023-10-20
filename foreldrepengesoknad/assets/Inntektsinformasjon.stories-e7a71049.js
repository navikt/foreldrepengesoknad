import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-37694412.js";import{w as u}from"./withRouter-45b25a28.js";import{w as v,F as b}from"./ForeldrepengerStateMock-712e501b.js";import{A}from"./AxiosMock-ad51d490.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-7400b0f6.js";import"./index-7c191284.js";import"./IntlProvider-c3950eb6.js";import"./validationUtils-8694f281.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./index-e13aeee6.js";import"./extends-2a43ab49.js";import"./index-ecbee218.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-368a450f.js";import"./dateUtils-af0e9454.js";import"./mapSøkerinfoDTO-248af1a5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-44666777.js";import"./amplitude-bdf1e125.js";import"./api-98fb1897.js";import"./apiInterceptor-c6c2844c.js";import"./globalUtil-c820f73d.js";import"./submitUtils-90494ef4.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-1fdebe38.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-d5cd0616.js";import"./Periodene-a5e0e5ab.js";import"./useOnValidSubmit-06334c7f.js";import"./useSøkerinfo-4ee46d53.js";import"./InteractiveListElement-416969b4.js";import"./Næring-4af350e9.js";import"./Skjemanummer-77149054.js";import"./formUtils-1a4b7700.js";import"./index-47edccfa.js";import"./FormikFileUploader-2af4534d.js";import"./AttachmentList-858ddbe5.js";import"./Attachment-b8a0caca.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-78baeabd.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-e7a71049.js.map
