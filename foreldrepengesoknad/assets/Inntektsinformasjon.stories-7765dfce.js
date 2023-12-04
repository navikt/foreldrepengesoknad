import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-07d4d255.js";import{w as u,F as v}from"./ForeldrepengerStateMock-877a4dc2.js";import{A as b}from"./AxiosMock-6d22f902.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-c1c98027.js";import"./index-7c191284.js";import"./useSøknad-21fd1dca.js";import"./Tidsperioden-4a2706b8.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-a41d39b4.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-cba3e87e.js";import"./amplitude-e7683f28.js";import"./api-ddd1803f.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-c2450d86.js";import"./Periodene-c0dd0109.js";import"./arbeidsforholdUtils-6d62ecbd.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./useOnValidSubmit-7c76a5c0.js";import"./useSøkerinfo-9ae91185.js";import"./InteractiveListElement-dfcdf878.js";import"./Næring-678acc8a.js";import"./FormikFileUploader-0289e6c1.js";import"./AttachmentList-6c0215a9.js";import"./Attachment-a91bc549.js";import"./formUtils-ac25e84d.js";import"./index-47edccfa.js";import"./dateUtils-d156f3e5.js";import"./validationUtil-e4410c84.js";import"./message-a0ddcb00.js";import"./links-b36d21ab.js";const d=j,k=A,mo={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-7765dfce.js.map
