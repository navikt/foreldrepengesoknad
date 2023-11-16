import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-5da68677.js";import{w as u,F as v}from"./ForeldrepengerStateMock-e822428a.js";import{A as b}from"./AxiosMock-264d8999.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-04506114.js";import"./index-7c191284.js";import"./useSøknad-b4078322.js";import"./Tidsperioden-297a98ae.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-5b982ed5.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-1e0d0b3f.js";import"./amplitude-e7683f28.js";import"./api-06957017.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-814eb1c0.js";import"./Periodene-a3aa2caf.js";import"./arbeidsforholdUtils-981c48c4.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./useOnValidSubmit-2f04562e.js";import"./useSøkerinfo-c2fc08ca.js";import"./InteractiveListElement-956c4147.js";import"./Næring-b1d048a9.js";import"./FormikFileUploader-b07a358a.js";import"./AttachmentList-75d0cccd.js";import"./Attachment-5e96a78f.js";import"./formUtils-b05c92fb.js";import"./index-47edccfa.js";import"./dateUtils-92fccdda.js";import"./validationUtil-519349e2.js";import"./message-ebd688c0.js";import"./links-b36d21ab.js";const d=j,k=A,mo={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const co=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,co as __namedExportsOrder,mo as default};
//# sourceMappingURL=Inntektsinformasjon.stories-315cafb9.js.map
