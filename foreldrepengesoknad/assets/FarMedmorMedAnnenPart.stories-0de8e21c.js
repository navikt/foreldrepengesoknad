import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as k}from"./Tidsperioden-bf461132.js";import{B as l}from"./barnUtils-fb28b5ed.js";import{D as f}from"./Periodene-57742142.js";import{D as g}from"./eksisterendeSakUtils-ef462427.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as S,C as n}from"./FpDataContext-c0784ba8.js";import{S as E}from"./useFpNavigator-dc4587e4.js";import{R as N}from"./useRequest-ec5ef0e8.js";import{m as D}from"./mapSøkerinfoDTO-916ffbab.js";import{s as O,a as R}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_ as A}from"./søkerinfo-d0fdfcae.js";import{A as T}from"./AxiosMock-35a08809.js";import{U as p}from"./UttaksplanInfo-dbb5a4c6.js";import{i as x}from"./IntlProvider-d9dad12d.js";import{M as c}from"./dateFormValidation-3a770efe.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-f531ff4a.js";import"./uttaksPlanStatus-9c0a5786.js";import"./stringUtils-2c07ad76.js";import"./dateUtils-b788b56c.js";import"./timezone-b3f5c703.js";import"./leggTilPeriode-66f2ffe8.js";import"./velkommenUtils-c6c35a41.js";import"./apiInterceptor-71cf49c7.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./uttaksplanInfoUtils-196e2787.js";import"./uttaksplanHarForMangeFlerbarnsuker-91b4dd47.js";import"./index-004a6d92.js";import"./Uttaksplan-f42bc5fe.js";import"./FormikFileUploader-9bd10cdc.js";import"./AttachmentList-264fa359.js";import"./Attachment-2babbc9f.js";import"./dates-ba1dca1c.js";import"./ExpansionCard-3603c101.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-e3e62bdd.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-c5a024cc.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-b5bc03dd.js";import"./amplitude.esm-2809efde.js";import"./createIntl-4ce78a2a.js";const u="/innsyn/v2/annenPartVedtak",a="/konto",F=A,M={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Mt={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:p},I=t=>{x();const d=o=>{o.onPost(u).replyOnce(200,{perioder:[M],dekningsgrad:g.HUNDRE_PROSENT},N.FINISHED),o.onGet(a).replyOnce(200,t.stønadskonto100),o.onGet(a).replyOnce(200,t.stønadskonto80)};return r.jsx(c,{initialEntries:[E.UTTAKSPLAN_INFO],children:r.jsx(T,{mock:d,children:r.jsx(S,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:t.barn,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:t.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(p,{søkerInfo:D(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=I.bind({});e.args={stønadskonto100:O,stønadskonto80:R,barn:{type:l.FØDT,fødselsdatoer:[k("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:F,dekningsgrad:f.HUNDRE_PROSENT};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
        [ContextDataType.SØKER]: {
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
                    <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const It=["UttaksplanInfoAnnenPart"];export{e as UttaksplanInfoAnnenPart,It as __namedExportsOrder,Mt as default};
