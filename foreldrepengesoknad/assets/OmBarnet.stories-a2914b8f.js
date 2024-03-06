import{j as c}from"./jsx-runtime-1caa8f64.js";import"./dates-37291467.js";import{B as p}from"./barnUtils-aeabd763.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as X}from"./IntlProvider-067bcbb8.js";import{a as w}from"./chunk-WFFRPTHA-80d37c1b.js";import{F as Z,C as g}from"./FpDataContext-9c963fd7.js";import{S as $}from"./useFpNavigator-aed5ab8f.js";import{A as ee}from"./AxiosMock-f85117c7.js";import{O as Y}from"./OmBarnet-9f81fff8.js";import{M as ne}from"./dateFormValidation-a676b58d.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-3a69cb36.js";import"./preview-errors-60885292.js";import"./index-356e4a49.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./index-59ab5c7e.js";import"./skjemanummer-4d711b8d.js";import"./FormikFileUploader-40bb79e5.js";import"./ExpansionCard-c4976158.js";import"./AttachmentList-260c224b.js";import"./Attachment-8de36c8d.js";import"./AttachmentMetadata-003d83db.js";import"./velkommenUtils-2e714f64.js";import"./dateUtils-191f81f7.js";import"./Perioden-e5e2ab84.js";import"./links-4d39192e.js";import"./RegistrertePersonalia-e61f3090.js";const re=()=>(...m)=>(w("button-click")(...m),Promise.resolve()),e={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},Le={title:"steps/OmBarnet",component:Y},n=({søkerinfo:m,søkersituasjon:H={situasjon:"fødsel",rolle:"mor"},barn:q,søknadGjelderEtNyttBarn:z=!1,gåTilNesteSide:Q,mellomlagreSøknadOgNaviger:V=re()})=>{X();const W=x=>{x.onPost("/storage/foreldrepenger/vedlegg").reply(200,{data:{}},{location:""}),x.onPost("/storage/foreldrepenger").reply(200,void 0)};return c.jsx(ne,{initialEntries:[$.OM_BARNET],children:c.jsx(ee,{mock:W,children:c.jsx(Z,{onDispatch:Q,initialState:{[g.SØKERSITUASJON]:H,[g.OM_BARNET]:q},children:c.jsx(Y,{søkerInfo:m,søknadGjelderNyttBarn:z,mellomlagreSøknadOgNaviger:V,avbrytSøknad:w("button-click")})})})})},r=n.bind({});r.args={barn:void 0,søkerinfo:e};const t=n.bind({});t.args={søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:void 0,søkerinfo:{...e,søker:{...e.søker,kjønn:"M"}}};const a=n.bind({});a.args={søkersituasjon:{situasjon:"fødsel",rolle:"medmor"},barn:void 0,søkerinfo:e};const o=n.bind({});o.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},søkerinfo:e};const s=n.bind({});s.args={søknadGjelderEtNyttBarn:!1,søkersituasjon:{situasjon:"fødsel",rolle:"far"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søkerinfo:e};const i=n.bind({});i.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:2,fnr:["31091981146","31091981147"],fødselsdatoer:[new Date("2022-08-02"),new Date("2022-08-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:e};const l=n.bind({});l.args={søkersituasjon:{situasjon:"adopsjon",rolle:"mor"},barn:{antallBarn:1,fnr:["21091981146"],fødselsdatoer:[new Date("2021-03-15")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:e};const d=n.bind({});d.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:3,fnr:["21091981146","31091981147","31091981148"],fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{søker:{fnr:"21430354032",fornavn:"Hes",etternavn:"Mandagsbil",kjønn:"K",fødselsdato:"2003-03-21",bankkonto:{kontonummer:"",banknavn:""},barn:[{fnr:"21091981146",fødselsdato:"2023-03-01",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981148",fødselsdato:"2023-03-01",dødsdato:"2023-03-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"},{arbeidsgiverId:"896929119",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"SAUEFABRIKK",stillingsprosent:100,fom:"2017-03-24"}]}};const k=n.bind({});k.args={søkersituasjon:{situasjon:"fødsel",rolle:"mor"},barn:{antallBarn:1,fnr:void 0,fødselsdatoer:[new Date("2023-01-02")],type:p.FØDT},søknadGjelderEtNyttBarn:!1,søkerinfo:{...e,søker:{...e.søker,barn:[]}}};var F,f,u;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(f=r.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var S,M,N;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(N=(M=t.parameters)==null?void 0:M.docs)==null?void 0:N.source}}};var E,y,A;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(A=(y=a.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};var j,T,v;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(v=(T=o.parameters)==null?void 0:T.docs)==null?void 0:v.source}}};var B,D,O;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(O=(D=s.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var R,b,C;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`({
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
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
                    <OmBarnet søkerInfo={søkerinfo} søknadGjelderNyttBarn={søknadGjelderEtNyttBarn} mellomlagreSøknadOgNaviger={mellomlagreSøknadOgNaviger} avbrytSøknad={action('button-click')} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(h=k.parameters)==null?void 0:h.docs)==null?void 0:J.source}}};const he=["Default","FarFødsel","MedmorFødsel","ForAdopsjon","RegistrertBarnFødselFar","RegistrertBarnFødselMor","RegistrertBarnAdopsjonMor","RegistrertBarnTrillingerDerEnErDød","SøknadPåUregistrertBarnSomErFødt"];export{r as Default,t as FarFødsel,o as ForAdopsjon,a as MedmorFødsel,l as RegistrertBarnAdopsjonMor,s as RegistrertBarnFødselFar,i as RegistrertBarnFødselMor,d as RegistrertBarnTrillingerDerEnErDød,k as SøknadPåUregistrertBarnSomErFødt,he as __namedExportsOrder,Le as default};
