import{j as m}from"./jsx-runtime-1caa8f64.js";import{a as w}from"./chunk-WFFRPTHA-80d37c1b.js";import{A as X}from"./AxiosMock-ed819255.js";import{O as Y}from"./OmBarnet-8f0db0ae.js";import"./Tidsperioden-d3b158ba.js";import{B as p}from"./barnUtils-e770e0b5.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as Z,C as g}from"./FpDataContext-c0784ba8.js";import{m as $}from"./mapSøkerinfoDTO-21812b8a.js";import{S as ee}from"./useFpNavigator-381c5d5e.js";import{i as ne}from"./amplitude-bd015a1c.js";import{M as re}from"./dateFormValidation-13e10f67.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./v4-4a60fe23.js";import"./index-bcca6cba.js";import"./apiInterceptor-716e24db.js";import"./isFarEllerMedmor-120238ea.js";import"./formUtils-1eaa45b4.js";import"./IntlProvider-669da569.js";import"./dates-471e2cce.js";import"./Link-d47e444a.js";import"./provider-5ffabb65.js";import"./velkommenUtils-df400331.js";import"./index-47edccfa.js";import"./Tag-70ce2969.js";import"./dateUtils-ddd25b9f.js";import"./timezone-b3f5c703.js";import"./Perioden-96b8bac4.js";import"./FormikFileUploader-157247b6.js";import"./AttachmentList-52ab744a.js";import"./Attachment-c443651d.js";import"./ExpansionCard-cfae3f50.js";import"./links-4d39192e.js";import"./RegistrertePersonalia-4fe0edcb.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./amplitude.esm-2809efde.js";const te={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]}},oe=[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}],ae={søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:oe},se=()=>(...x)=>(w("button-click")(...x),Promise.resolve()),n=te,ie=ae,Ve={title:"steps/OmBarnet",component:Y},e=({søkerinfo:x,søkersituasjon:H={situasjon:"fødsel",rolle:"mor"},barn:q,søknadGjelderEtNyttBarn:z=!1,gåTilNesteSide:Q,mellomlagreSøknadOgNaviger:V=se()})=>{ne();const W=c=>{c.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),c.onPost("/storage/foreldrepenger").reply(200,void 0)};return m.jsx(re,{initialEntries:[ee.OM_BARNET],children:m.jsx(X,{mock:W,children:m.jsx(Z,{onDispatch:Q,initialState:{[g.SØKERSITUASJON]:H,[g.OM_BARNET]:q},children:m.jsx(Y,{søkerInfo:$(x),søknadGjelderNyttBarn:z,mellomlagreSøknadOgNaviger:V,avbrytSøknad:w("button-click")})})})})},r=e.bind({});r.args={barn:void 0,søkerinfo:n};const t=e.bind({});t.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0,søkerinfo:{...n,kjønn:"M"}};const o=e.bind({});o.args={søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0,søkerinfo:n};const a=e.bind({});a.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},søkerinfo:n};const s=e.bind({});s.args={søknadGjelderEtNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søkerinfo:n};const i=e.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:[new Date("2022-08-02"),new Date("2022-08-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const l=e.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:n};const d=e.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:ie};const k=e.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{...n,registrerteBarn:[]}};var F,f,S;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(S=(f=r.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var u,M,T;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(T=(M=t.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var N,E,y;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(E=o.parameters)==null?void 0:E.docs)==null?void 0:y.source}}};var A,j,D;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(D=(j=a.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var B,v,O;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(v=s.parameters)==null?void 0:v.docs)==null?void 0:O.source}}};var R,b,C;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(C=(b=i.parameters)==null?void 0:b.docs)==null?void 0:C.source}}};var G,I,P;l.parameters={...l.parameters,docs:{...(G=l.parameters)==null?void 0:G.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(I=l.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var U,K,_;d.parameters={...d.parameters,docs:{...(U=d.parameters)==null?void 0:U.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(_=(K=d.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var L,h,J;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`({
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
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost('/storage/foreldrepenger/vedlegg').reply(200, {
      data: {}
    }, {
      location: ''
    });
    apiMock.onPost('/storage/foreldrepenger').reply(200, undefined);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.OM_BARNET]}>
            <AxiosMock mock={restMock}>
                <FpDataContext onDispatch={gåTilNesteSide} initialState={{
        [ContextDataType.SØKERSITUASJON]: søkersituasjon,
        [ContextDataType.OM_BARNET]: barn
      }}>
                    <OmBarnet søkerInfo={mapSøkerinfoDTOToSøkerinfo(søkerinfo)} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(h=k.parameters)==null?void 0:h.docs)==null?void 0:J.source}}};const We=["Default","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{r as Default,t as FarFødsel,a as ForAdopsjon,o as MedmorFødsel,l as RegistrertBarnAdopsjonMor,s as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,d as RegistrertBarnTrillingerDerEnErDød,k as SøknadPåUregistrertBarnSomErFødt,We as __namedExportsOrder,Ve as default};
