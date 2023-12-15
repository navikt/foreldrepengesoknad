import{j as m}from"./jsx-runtime-69eee039.js";import{a as w}from"./chunk-AY7I2SME-331d03ca.js";import{w as X}from"./withRouter-f0df7a0f.js";import{A as Z}from"./AxiosMock-ee1c53ff.js";import{O as Y}from"./OmBarnet-21074e3d.js";import"./Tidsperioden-d85ef78f.js";import{B as p}from"./barnUtils-499d6ba0.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-a6e67bdd.js";import{F as $,C as f}from"./FpDataContext-75ac2616.js";import{m as ee}from"./mapSøkerinfoDTO-97167608.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./isFarEllerMedmor-120238ea.js";import"./BackButton-f1649e6f.js";import"./message-5ceb38b3.js";import"./routes-9effe5a6.js";import"./stepsConfig-50aeac0b.js";import"./amplitude-3a5afcfb.js";import"./amplitude.esm-b6594747.js";import"./FormikFileUploader-5a8cca88.js";import"./AttachmentList-44783354.js";import"./Attachment-0c980428.js";import"./Link-11d7c909.js";import"./IntlProvider-788f10d0.js";import"./dates-6a016f0f.js";import"./Alert-d5660280.js";import"./provider-91e4eed5.js";import"./ExpansionCard-24c428ff.js";import"./dateUtils-eb722a91.js";import"./Perioden-3b91fa00.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./RegistrertePersonalia-8418f02f.js";import"./velkommenUtils-171e22cc.js";import"./Tag-8c31ae50.js";import"./validation-631bcf6e.js";import"./dateFormValidation-7b994c51.js";import"./index-b3a39e30.js";const ne={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]}},re=[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}],ae={søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:re},oe=()=>(...c)=>(w("button-click")(...c),Promise.resolve()),n=ne,te=ae,Ve={title:"steps/OmBarnet",component:Y,decorators:[X]},e=({søkerinfo:c,søkersituasjon:H={situasjon:"fødsel",rolle:"mor"},barn:q,søknadGjelderEtNyttBarn:z=!1,gåTilNesteSide:Q,mellomlagreSøknadOgNaviger:V=oe()})=>{const W=g=>{g.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),g.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(Z,{mock:W,children:m.jsx($,{onDispatch:Q,initialState:{[f.SØKERSITUASJON]:H,[f.OM_BARNET]:q},children:m.jsx(Y,{søkerInfo:ee(c),søknadGjelderNyttBarn:z,mellomlagreSøknadOgNaviger:V,avbrytSøknad:w("button-click")})})})},r=e.bind({});r.args={barn:void 0,søkerinfo:n};const a=e.bind({});a.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0,søkerinfo:{...n,kjønn:"M"}};const o=e.bind({});o.args={søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0,søkerinfo:n};const t=e.bind({});t.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},søkerinfo:n};const s=e.bind({});s.args={søknadGjelderEtNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søkerinfo:n};const i=e.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:[new Date("2022-08-02"),new Date("2022-08-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const l=e.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const d=e.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:te};const k=e.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{...n,registrerteBarn:[]}};var S,T,N;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(N=(T=r.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var u,M,j;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(j=(M=a.parameters)==null?void 0:M.docs)==null?void 0:j.source}}};var v,y,D;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(D=(y=o.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var B,A,O;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(O=(A=t.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var E,b,x;s.parameters={...s.parameters,docs:{...(E=s.parameters)==null?void 0:E.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(x=(b=s.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};var F,C,R;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(R=(C=i.parameters)==null?void 0:C.docs)==null?void 0:R.source}}};var G,I,P;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(P=(I=l.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var U,K,L;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(L=(K=d.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var h,_,J;k.parameters={...k.parameters,docs:{...(h=k.parameters)==null?void 0:h.docs,source:{originalSource:`({
  søkerinfo,
  søkersituasjon = {
    situasjon: 'fødsel',
    rolle: 'mor'
  },
  barn,
  søknadGjelderEtNyttBarn = false,
  gåTilNesteSide,
  mellomlagreSøknadOgNaviger = promiseAction()
}) => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext onDispatch={gåTilNesteSide} initialState={{
      [ContextDataType.SØKERSITUASJON]: søkersituasjon,
      [ContextDataType.OM_BARNET]: barn
    }}>
                <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
            </FpDataContext>
        </AxiosMock>;
}`,...(J=(_=k.parameters)==null?void 0:_.docs)==null?void 0:J.source}}};const We=["Default","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{r as Default,a as FarFødsel,t as ForAdopsjon,o as MedmorFødsel,l as RegistrertBarnAdopsjonMor,s as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,d as RegistrertBarnTrillingerDerEnErDød,k as SøknadPåUregistrertBarnSomErFødt,We as __namedExportsOrder,Ve as default};
//# sourceMappingURL=OmBarnet.stories-c00afa7f.js.map
