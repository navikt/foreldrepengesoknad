import{j as e}from"./jsx-runtime-69eee039.js";import{w as x}from"./withRouter-b443adb0.js";import{w as u,F as v}from"./ForeldrepengerStateMock-2b2feb9e.js";import{A as b}from"./AxiosMock-79cf94ea.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-e2b948be.js";import"./index-7c191284.js";import"./useSøknad-5c5bca2e.js";import"./validationUtils-481ea31b.js";import"./index-b3a39e30.js";import"./Link-b834ea2b.js";import"./index-e13aeee6.js";import"./_createSet-a53deccd.js";import"./_baseToString-4b695375.js";import"./v4-a960c1f4.js";import"./mapSøkerinfoDTO-dbaf167a.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-aa81b91f.js";import"./amplitude-bdf1e125.js";import"./api-b158b98d.js";import"./apiInterceptor-7ea9ce80.js";import"./submitUtils-3b67bade.js";import"./Periodene-bb8992e3.js";import"./arbeidsforholdUtils-9eed17db.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-b203cb38.js";import"./useOnValidSubmit-626a50a3.js";import"./useSøkerinfo-d70607f2.js";import"./InteractiveListElement-086f53eb.js";import"./Næring-e9107f92.js";import"./FormikFileUploader-9cabf58c.js";import"./AttachmentList-8e6ebcfc.js";import"./Attachment-a20808c3.js";import"./formUtils-29ccf6bd.js";import"./dateUtils-38a630e5.js";import"./validationUtil-26610bc6.js";import"./links-b36d21ab.js";const d=j,k=A,ao={title:"steps/Inntektsinformasjon",component:c,decorators:[x,u]},l=({context:f,søkerinfo:g})=>{const M=t=>{t.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),t.onPost("/storage").reply(200,void 0)};return e.jsx(b,{mock:M,children:e.jsx(v,{søknad:f,søkerinfo:g,children:e.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,s,i;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
}`,...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};const po=["Default","HarArbeidsforhold"];export{o as Default,r as HarArbeidsforhold,po as __namedExportsOrder,ao as default};
//# sourceMappingURL=Inntektsinformasjon.stories-627f3d9c.js.map
