import{j as t}from"./jsx-runtime-2c139190.js";import{w as M}from"./withIntl-68c16c87.js";import{w as x}from"./withRouter-811d5514.js";import{w as u,F as v}from"./ForeldrepengerStateMock-64041fcc.js";import{A as b}from"./AxiosMock-f9f6d3e3.js";import{_ as A}from"./soknadMedEttBarn-66625a0c.js";import{_ as I}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-8979c18d.js";import"./index-b14cf94f.js";import"./IntlProvider-4cddb1e3.js";import"./validationUtils-8c57b3bf.js";import"./index-4d501b15.js";import"./Link-bafd8a7d.js";import"./clsx.m-266f4de0.js";import"./extends-3f1aa0c7.js";import"./index-99a37931.js";import"./index-7e4e529b.js";import"./Label-3bb7eadc.js";import"./v4-a960c1f4.js";import"./useSøknad-cee0c345.js";import"./dateUtils-895c9068.js";import"./getTypedFormComponents-5434d462.js";import"./mapSøkerinfoDTO-99b445cd.js";import"./useFortsettSøknadSenere-3971a100.js";import"./amplitude-7714a9b7.js";import"./api-b5f14cd5.js";import"./apiInterceptor-f5dabb2f.js";import"./globalUtil-9d9e0ee4.js";import"./useOnValidSubmit-9c291a6c.js";import"./useSaveLoadedRoute-04255621.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-a4e8332d.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-b94779f9.js";import"./Periodene-e5213d70.js";import"./useSøkerinfo-669dfaf1.js";import"./InteractiveListElement-aaa97ce2.js";import"./Næring-bb7355e3.js";import"./Skjemanummer-77149054.js";import"./formUtils-47e5b872.js";import"./index-47edccfa.js";import"./FormikFileUploader-7e1be4af.js";import"./AttachmentList-c14351b2.js";import"./Attachment-ef85a257.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-63796123.js";import"./_baseIteratee-0af090e6.js";import"./_baseUniq-11aaf30e.js";import"./constants-c4bc2eb8.js";const d=I,k=A,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[x,M,u]},l=({context:f,søkerinfo:g})=>t(b,{mock:e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)},children:t(v,{søknad:f,søkerinfo:g,children:t(c,{})})}),o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-2d6caceb.js.map
