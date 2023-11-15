import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-ea3f6473.js";import{w as u,F as v}from"./ForeldrepengerStateMock-1c985e4b.js";import{A as b}from"./AxiosMock-3d8f63c0.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-2619b5c5.js";import"./index-7c191284.js";import"./useSøknad-db05d405.js";import"./Tidsperioden-e35adfd7.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-96a11041.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-45925dc3.js";import"./amplitude-e7683f28.js";import"./api-b9d2cb87.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-fb70e088.js";import"./Periodene-9d7718bb.js";import"./arbeidsforholdUtils-4268c4b4.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./useOnValidSubmit-e296e560.js";import"./useSøkerinfo-9dd3917c.js";import"./InteractiveListElement-43830758.js";import"./Næring-d156822e.js";import"./FormikFileUploader-bc94dc22.js";import"./AttachmentList-f146e378.js";import"./Attachment-649d1573.js";import"./formUtils-f30217dc.js";import"./dateUtils-fa815e6a.js";import"./validationUtil-3d9695c7.js";import"./message-14dee22d.js";import"./links-b36d21ab.js";const d=j,k=A,po={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-235843b7.js.map
