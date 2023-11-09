import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-a172066d.js";import{w as u,F as v}from"./ForeldrepengerStateMock-c0a24792.js";import{A as b}from"./AxiosMock-fa099c59.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-e66641a2.js";import"./index-7c191284.js";import"./useSøknad-26978d9c.js";import"./Tidsperioden-bc4aa89e.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-23fed2f2.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-798afdb6.js";import"./amplitude-e7683f28.js";import"./api-f185354c.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-ec131b19.js";import"./Periodene-3e3b4ab3.js";import"./arbeidsforholdUtils-5ef2b738.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./useOnValidSubmit-6ae715f6.js";import"./useSøkerinfo-417aa154.js";import"./InteractiveListElement-0c1bfa27.js";import"./Næring-9acd6a32.js";import"./FormikFileUploader-1e1345f2.js";import"./AttachmentList-6bd7cc9e.js";import"./Attachment-3a7d5334.js";import"./formUtils-9352967f.js";import"./dateUtils-9225f718.js";import"./validationUtil-873cc515.js";import"./message-0de53699.js";import"./links-b36d21ab.js";const d=j,k=A,po={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const mo=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,mo as __namedExportsOrder,po as default};
//# sourceMappingURL=Inntektsinformasjon.stories-964f7d8c.js.map
