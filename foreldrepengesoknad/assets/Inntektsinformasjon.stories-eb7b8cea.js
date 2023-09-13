import{j as t}from"./jsx-runtime-69eee039.js";import{w as x}from"./withIntl-e58a24a5.js";import{w as u}from"./withRouter-7855e4ba.js";import{w as v,F as b}from"./ForeldrepengerStateMock-3005dbc2.js";import{A}from"./AxiosMock-17aa2afc.js";import{_ as I}from"./soknadMedEttBarn-66625a0c.js";import{_ as j}from"./søkerinfoKvinneMedEttBarn-8f2bf17a.js";import{I as c}from"./Inntektsinformasjon-3c318f9b.js";import"./index-7c191284.js";import"./IntlProvider-81e30403.js";import"./validationUtils-98d33cd3.js";import"./index-b3a39e30.js";import"./Link-00530630.js";import"./clsx.m-266f4de0.js";import"./extends-fed75772.js";import"./index-ecbee218.js";import"./index-e13aeee6.js";import"./Label-2ad8abda.js";import"./v4-a960c1f4.js";import"./useSøknad-73e632aa.js";import"./dateUtils-3d3f8269.js";import"./getTypedFormComponents-b55cb5c1.js";import"./mapSøkerinfoDTO-d68bd2d0.js";import"./useSaveLoadedRoute-952bea34.js";import"./amplitude-bdf1e125.js";import"./api-758ba7aa.js";import"./apiInterceptor-d433db8f.js";import"./globalUtil-c820f73d.js";import"./submitUtils-6c106b54.js";import"./AnnenForelder-5c5d4f7f.js";import"./vedleggUtils-7a6031f5.js";import"./Attachment-a8e5b8d1.js";import"./periodeUtils-09efc595.js";import"./Periodene-393eac0e.js";import"./useOnValidSubmit-6a51f59a.js";import"./useSøkerinfo-a62987d5.js";import"./InteractiveListElement-c8d15b5e.js";import"./Næring-594e52d8.js";import"./Skjemanummer-77149054.js";import"./formUtils-17a5d191.js";import"./index-47edccfa.js";import"./FormikFileUploader-38d8465e.js";import"./AttachmentList-09f3a8b3.js";import"./Attachment-07083c60.js";import"./links-b36d21ab.js";import"./arbeidsforholdUtils-73b609db.js";import"./_baseIteratee-ea1a760a.js";import"./_baseUniq-dc2d012e.js";import"./constants-c4bc2eb8.js";const d=j,k=I,bo={title:"steps/Inntektsinformasjon",component:c,decorators:[u,x,v]},l=({context:f,søkerinfo:g})=>{const M=e=>{e.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),e.onPost("/storage").reply(200,void 0)};return t.jsx(A,{mock:M,children:t.jsx(b,{søknad:f,søkerinfo:g,children:t.jsx(c,{})})})},o=l.bind({});o.args={context:k,søkerinfo:d};const r=l.bind({});r.args={context:k,søkerinfo:{søker:{...d},arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}};var n,i,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`({
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
//# sourceMappingURL=Inntektsinformasjon.stories-eb7b8cea.js.map
