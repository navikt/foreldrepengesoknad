import{j as r}from"./jsx-runtime-1caa8f64.js";import{d as k}from"./Tidsperioden-0ce27701.js";import{B as l}from"./barnUtils-0a149fde.js";import{D as f}from"./Periodene-f187d3de.js";import{D as g}from"./eksisterendeSakUtils-c0b17961.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-43959ddd.js";import"./_createSet-fe2162c5.js";import{F as S,C as n}from"./FpDataContext-c0784ba8.js";import{S as E}from"./useFpNavigator-138d866e.js";import{R as N}from"./useRequest-ec5ef0e8.js";import{m as D}from"./mapSøkerinfoDTO-b63f3b29.js";import{s as O,a as R}from"./stønadskontoDeltUttak100-ce558aaf.js";import{_ as A}from"./søkerinfo-d0fdfcae.js";import{A as T}from"./AxiosMock-35a08809.js";import{U as p}from"./UttaksplanInfo-071939a6.js";import{i as x}from"./IntlProvider-34dbadb5.js";import{M as c}from"./dateFormValidation-58034f6f.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./Perioden-6bc73957.js";import"./uttaksPlanStatus-0cdf8ab7.js";import"./stringUtils-5b767063.js";import"./dateUtils-b6bb763e.js";import"./timezone-b3f5c703.js";import"./leggTilPeriode-5e968e17.js";import"./velkommenUtils-45beb16d.js";import"./apiInterceptor-71cf49c7.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./uttaksplanInfoUtils-c21d01d6.js";import"./uttaksplanHarForMangeFlerbarnsuker-dec9aba3.js";import"./index-b0efaffd.js";import"./Uttaksplan-0b7ef14c.js";import"./FormikFileUploader-b1f419c9.js";import"./AttachmentList-afd7fd7b.js";import"./Attachment-c0740781.js";import"./dates-11179115.js";import"./ExpansionCard-c322da11.js";import"./links-4d39192e.js";import"./arbeidsforholdUtils-c017f5d8.js";import"./_baseIteratee-d7749f38.js";import"./_baseUniq-aff03744.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-16126b50.js";import"./Ingress-10c1b249.js";import"./InfoOmSøknaden-f84f0da4.js";import"./amplitude.esm-2809efde.js";import"./createIntl-53be0640.js";const u="/innsyn/v2/annenPartVedtak",a="/konto",F=A,M={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Mt={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:p},I=t=>{x();const d=o=>{o.onPost(u).replyOnce(200,{perioder:[M],dekningsgrad:g.HUNDRE_PROSENT},N.FINISHED),o.onGet(a).replyOnce(200,t.stønadskonto100),o.onGet(a).replyOnce(200,t.stønadskonto80)};return r.jsx(c,{initialEntries:[E.UTTAKSPLAN_INFO],children:r.jsx(T,{mock:d,children:r.jsx(S,{initialState:{[n.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[n.OM_BARNET]:t.barn,[n.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:t.dekningsgrad},[n.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[n.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(p,{søkerInfo:D(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},e=I.bind({});e.args={stønadskonto100:O,stønadskonto80:R,barn:{type:l.FØDT,fødselsdatoer:[k("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:F,dekningsgrad:f.HUNDRE_PROSENT};var s,i,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
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
