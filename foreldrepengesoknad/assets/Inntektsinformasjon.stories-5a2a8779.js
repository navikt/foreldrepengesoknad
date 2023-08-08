import{j as t}from"./jsx-runtime-2c139190.js";import{w as M}from"./withIntl-56d3014e.js";import{w as x}from"./withRouter-f5ce0c47.js";import{w as u,F as v}from"./ForeldrepengerStateMock-6cb8bbe3.js";import{A as b}from"./AxiosMock-1d20c8fe.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as I}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-f1dd605f.js";import"./index-b14cf94f.js";import"./IntlProvider-8c9095a4.js";import"./validationUtils-749fcdf4.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-958c5a2a.js";import"./dateUtils-c35f161a.js";import"./getTypedFormComponents-d760cc41.js";import"./mapSøkerinfoDTO-ee5c98c4.js";import"./useFortsettSøknadSenere-3c16dad9.js";import"./amplitude-7714a9b7.js";import"./api-b639d329.js";import"./apiInterceptor-53028d2f.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-c90b0d0a.js";import"./useSaveLoadedRoute-fbce50ec.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-40a9f1c3.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-756f8671.js";import"./Periodene-6b5e37b0.js";import"./useSøkerinfo-9e58976c.js";import"./InteractiveListElement-f1d460de.js";import"./Næring-e2951641.js";import"./Skjemanummer-77149054.js";import"./formUtils-7620ebbd.js";import"./index-47edccfa.js";import"./FormikFileUploader-bbaf3675.js";import"./AttachmentList-b4f71470.js";import"./Attachment-6568bbd4.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-6c328889.js";import"./_baseIteratee-0af090e6.js";import"./_baseUniq-11aaf30e.js";import"./constants-c4bc2eb8.js";const d=I,k=A,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[x,M,u]},l=({context:f,søkerinfo:g})=>t(b,{mock:e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)},children:t(v,{søknad:f,søkerinfo:g,children:t(c,{})})}),o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-5a2a8779.js.map
