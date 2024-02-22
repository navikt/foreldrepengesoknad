import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as k}from"./Tidsperioden-32d6ceea.js";import{B as l}from"./barnUtils-27f7dae4.js";import{D as f}from"./Periodene-f55b294c.js";import{D as g}from"./eksisterendeSakUtils-5470c12d.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as E,C as n}from"./FpDataContext-939a8168.js";import{S}from"./useFpNavigator-00c14c24.js";import{R as A}from"./useRequest-603f2ddc.js";import{s as N,a as D}from"./stønadskontoDeltUttak80-23916c37.js";import{A as R}from"./AxiosMock-f85117c7.js";import{U as m}from"./UttaksplanInfo-43b510b8.js";import{i as T}from"./IntlProvider-b99fa191.js";import{M as O}from"./dateFormValidation-8d41671b.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-017fa136.js";import"./Perioden-14a4f262.js";import"./uttaksPlanStatus-9418c72d.js";import"./stringUtils-e4ae28d6.js";import"./dateUtils-75df4550.js";import"./leggTilPeriode-0508d6d5.js";import"./velkommenUtils-48c44882.js";import"./apiInterceptor-d1094a41.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./uttaksplanInfoUtils-d3a680cb.js";import"./uttaksplanHarForMangeFlerbarnsuker-21628512.js";import"./index-22629c56.js";import"./Uttaksplan-77a815a2.js";import"./FormikFileUploader-bf1c56bf.js";import"./AttachmentList-1abab43f.js";import"./Attachment-17da3962.js";import"./ExpansionCard-e6759a24.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-f1af0def.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-2e2fbfdb.js";import"./amplitude.esm-2809efde.js";import"./createIntl-5cc94ec1.js";const c="/innsyn/v2/annenPartVedtak",a="/konto",x={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},u={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Rn={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:m},F=e=>{T();const p=o=>{o.onPost(c).replyOnce(200,{perioder:[u],dekningsgrad:g.HUNDRE_PROSENT},A.FINISHED),o.onGet(a).replyOnce(200,e.stønadskonto100),o.onGet(a).replyOnce(200,e.stønadskonto80)};return r.jsx(O,{initialEntries:[S.UTTAKSPLAN_INFO],children:r.jsx(R,{mock:p,children:r.jsx(E,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:e.barn,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:e.dekningsgrad},[n.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(m,{søker:x.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=F.bind({});t.args={stønadskonto100:N,stønadskonto80:D,barn:{type:l.FØDT,fødselsdatoer:[k("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},dekningsgrad:f.HUNDRE_PROSENT};var s,i,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: [uttaksperiode],
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <MemoryRouter initialEntries={[SøknadRoutes.UTTAKSPLAN_INFO]}>
            <AxiosMock mock={restMock}>
                <FpDataContext initialState={{
        [ContextDataType.SØKERSITUASJON]: {
          situasjon: 'fødsel',
          rolle: 'far'
        },
        [ContextDataType.OM_BARNET]: args.barn,
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: {
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søker={søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};const Tn=["UttaksplanInfoAnnenPart"];export{t as UttaksplanInfoAnnenPart,Tn as __namedExportsOrder,Rn as default};
