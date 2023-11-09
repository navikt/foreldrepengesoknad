import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-c9426938.js";import{w as u,F as v}from"./ForeldrepengerStateMock-52472ab7.js";import{A as b}from"./AxiosMock-5e424b87.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-a567ff1d.js";import"./index-7c191284.js";import"./useSøknad-6273a8f6.js";import"./Tidsperioden-f1b2e608.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-f4a01039.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-f28ff869.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-f92b3634.js";import"./amplitude-e7683f28.js";import"./api-c3a2edb1.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-9aa0c51a.js";import"./Periodene-16568c49.js";import"./arbeidsforholdUtils-8c2c64b1.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./useOnValidSubmit-b52fc2a5.js";import"./useSøkerinfo-b311f84a.js";import"./InteractiveListElement-2e56c3bb.js";import"./Næring-c6a397da.js";import"./FormikFileUploader-d7cc61ec.js";import"./AttachmentList-d10155ea.js";import"./Attachment-4c13fe23.js";import"./formUtils-9ef342c5.js";import"./dateUtils-d247014f.js";import"./validationUtil-41ad90a7.js";import"./message-ad1f1800.js";import"./links-b36d21ab.js";const d=j,k=A,po={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-42388271.js.map
