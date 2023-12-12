import{j as m}from"./jsx-runtime-69eee039.js";import{a as w}from"./chunk-AY7I2SME-331d03ca.js";import{w as X}from"./withRouter-f0df7a0f.js";import{A as Z}from"./AxiosMock-ee1c53ff.js";import{O as Y}from"./OmBarnet-cec91813.js";import"./Tidsperioden-57efcdec.js";import{B as c}from"./barnUtils-bee45dcc.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import{F as $,C as f}from"./FpDataContext-75ac2616.js";import{m as nn}from"./mapSøkerinfoDTO-12ccca9c.js";import"./v4-a960c1f4.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./isFarEllerMedmor-120238ea.js";import"./BackButton-22f7a163.js";import"./message-87a45ae9.js";import"./routes-9effe5a6.js";import"./stepsConfig-f71b1bae.js";import"./amplitude-140e185d.js";import"./FormikFileUploader-7ddafbe0.js";import"./AttachmentList-8d3b0f2c.js";import"./Attachment-2aa2754e.js";import"./Link-b834ea2b.js";import"./dateUtils-1f54a9f2.js";import"./Perioden-1c854ba4.js";import"./IntlProvider-9d12be6d.js";import"./dateFormValidation-24de531f.js";import"./exports-70c8b745.js";import"./provider-53813da2.js";import"./RegistrertePersonalia-f8231a7e.js";import"./links-b36d21ab.js";import"./index-47edccfa.js";import"./velkommenUtils-837cf02c.js";import"./validation-631bcf6e.js";import"./index-b3a39e30.js";const en={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]}},rn=[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}],an={søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:rn},on=()=>(...p)=>(w("button-click")(...p),Promise.resolve()),e=en,tn=an,qn={title:"steps/OmBarnet",component:Y,decorators:[X]},n=({søkerinfo:p,søkersituasjon:H={situasjon:"fødsel",rolle:"mor"},barn:q,søknadGjelderEtNyttBarn:z=!1,gåTilNesteSide:Q,mellomlagreSøknadOgNaviger:V=on()})=>{const W=g=>{g.onPost("/storage/vedlegg").reply(200,{data:{}},{location:""}),g.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(Z,{mock:W,children:m.jsx($,{onDispatch:Q,initialState:{[f.SØKERSITUASJON]:H,[f.OM_BARNET]:q},children:m.jsx(Y,{søkerInfo:nn(p),søknadGjelderNyttBarn:z,mellomlagreSøknadOgNaviger:V,avbrytSøknad:w("button-click")})})})},r=n.bind({});r.args={barn:void 0,søkerinfo:e};const a=n.bind({});a.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0,søkerinfo:{...e,kjønn:"M"}};const o=n.bind({});o.args={søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0,søkerinfo:e};const t=n.bind({});t.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},søkerinfo:e};const s=n.bind({});s.args={søknadGjelderEtNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:c.FØDT},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:[new Date("2022-08-02"),new Date("2022-08-02")],type:c.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:c.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:e};const d=n.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:[new Date("2023-01-02")],type:c.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:tn};const k=n.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:[new Date("2023-01-02")],type:c.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{...e,registrerteBarn:[]}};var S,T,N;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
    apiMock.onPost('/storage/vedlegg').reply(200, {
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
}`,...(J=(_=k.parameters)==null?void 0:_.docs)==null?void 0:J.source}}};const zn=["Default","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{r as Default,a as FarFødsel,t as ForAdopsjon,o as MedmorFødsel,l as RegistrertBarnAdopsjonMor,s as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,d as RegistrertBarnTrillingerDerEnErDød,k as SøknadPåUregistrertBarnSomErFødt,zn as __namedExportsOrder,qn as default};
//# sourceMappingURL=OmBarnet.stories-ee3c3950.js.map
