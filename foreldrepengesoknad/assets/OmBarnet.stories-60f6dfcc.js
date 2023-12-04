import{j as f}from"./jsx-runtime-69eee039.js";import{w as q}from"./withRouter-07d4d255.js";import{w as z,F as J}from"./ForeldrepengerStateMock-877a4dc2.js";import{A as Q}from"./AxiosMock-6d22f902.js";import{O as Y}from"./OmBarnet-0b7a91be.js";import"./Tidsperioden-4a2706b8.js";import{b as p}from"./useSøknad-21fd1dca.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./mapSøkerinfoDTO-a41d39b4.js";import"./AttachmentType-f6ad37cf.js";import"./useSaveLoadedRoute-cba3e87e.js";import"./amplitude-e7683f28.js";import"./api-ddd1803f.js";import"./apiInterceptor-565c1682.js";import"./submitUtils-c2450d86.js";import"./Periodene-c0dd0109.js";import"./formUtils-ac25e84d.js";import"./useOnValidSubmit-7c76a5c0.js";import"./useSøkerinfo-9ae91185.js";import"./FormikFileUploader-0289e6c1.js";import"./AttachmentList-6c0215a9.js";import"./Attachment-a91bc549.js";import"./Link-b834ea2b.js";import"./dateUtils-d156f3e5.js";import"./message-a0ddcb00.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./RegistrertePersonalia-3456e798.js";import"./velkommenUtils-f6fd1834.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const W={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]}},X=[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}],Z={søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:X},$=4,ee="/soknad/om-barnet",ne={søknad:{type:"foreldrepenger",harGodkjentVilkår:!0,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{fnr:["21091981146"],type:"født",fødselsdatoer:["2021-03-15"],antallBarn:"1",datoForAleneomsorg:"",dokumentasjonAvAleneomsorg:[]},annenForelder:{kanIkkeOppgis:!0},søker:{språkkode:"nb"},informasjonOmUtenlandsopphold:{tidligereOpphold:[],senereOpphold:[]},erEndringssøknad:!1},version:$,currentRoute:ee,søknadGjelderEtNyttBarn:!0},r=W,e=ne,re=Z,Ke={title:"steps/OmBarnet",component:Y,decorators:[q,z]},n=({context:C,søkerinfo:H})=>{const V=m=>{m.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),m.onPost("/storage").reply(200,void 0)};return f.jsx(Q,{mock:V,children:f.jsx(J,{søknad:C,søkerinfo:H,children:f.jsx(Y,{})})})},o=n.bind({});o.args={context:{...e,søknad:{...e.søknad,barn:void 0}},søkerinfo:r};const t=n.bind({});t.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0}},søkerinfo:{...r,kjønn:"M"}};const s=n.bind({});s.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0}},søkerinfo:r};const a=n.bind({});a.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"}}},søkerinfo:r};const d=n.bind({});d.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT}},søknadGjelderEtNyttBarn:!1},søkerinfo:r};const i=n.bind({});i.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:[new Date("2022-08-02"),new Date("2022-08-02")],type:p.FØDT}},søknadGjelderEtNyttBarn:!1},søkerinfo:r};const c=n.bind({});c.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT}},søknadGjelderEtNyttBarn:!1},søkerinfo:r};const k=n.bind({});k.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT}},søknadGjelderEtNyttBarn:!1},søkerinfo:re};const l=n.bind({});l.args={context:{...e,søknad:{...e.søknad,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT}},søknadGjelderEtNyttBarn:!1},søkerinfo:{...r,registrerteBarn:[]}};var M,g,u;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(u=(g=o.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,v,A;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(A=(v=t.parameters)==null?void 0:v.docs)==null?void 0:A.source}}};var F,S,j;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(j=(S=s.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var B,y,E;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(E=(y=a.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};var b,P,T;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(T=(P=d.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var D,O,L;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(L=(O=i.parameters)==null?void 0:O.docs)==null?void 0:L.source}}};var R,U,I;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(I=(U=c.parameters)==null?void 0:U.docs)==null?void 0:I.source}}};var N,K,G;k.parameters={...k.parameters,docs:{...(N=k.parameters)==null?void 0:N.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(G=(K=k.parameters)==null?void 0:K.docs)==null?void 0:G.source}}};var h,w,_;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`({
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
                <OmBarnet />
            </ForeldrepengerStateMock>
        </AxiosMock>;
}`,...(_=(w=l.parameters)==null?void 0:w.docs)==null?void 0:_.source}}};const Ge=["Default","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{o as Default,t as FarFødsel,a as ForAdopsjon,s as MedmorFødsel,c as RegistrertBarnAdopsjonMor,d as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,k as RegistrertBarnTrillingerDerEnErDød,l as SøknadPåUregistrertBarnSomErFødt,Ge as __namedExportsOrder,Ke as default};
//# sourceMappingURL=OmBarnet.stories-60f6dfcc.js.map
