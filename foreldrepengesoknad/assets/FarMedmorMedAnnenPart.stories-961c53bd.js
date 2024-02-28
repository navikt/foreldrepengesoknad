import{j as s}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-f85117c7.js";import{R as U}from"./useRequest-603f2ddc.js";import{s as P,a as _}from"./stønadskontoDeltUttak80-23916c37.js";import{U as y}from"./UttaksplanInfo-c9debe80.js";import{F as L,C as e}from"./FpDataContext-939a8168.js";import{d}from"./Tidsperioden-1f4512e5.js";import{B as k}from"./barnUtils-a1c59311.js";import{D as l}from"./Periodene-56b794dc.js";import{D as b}from"./eksisterendeSakUtils-0503f9b8.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as K}from"./useFpNavigator-45cc79cf.js";import{i as C}from"./IntlProvider-c27c4fed.js";import{M as H}from"./dateFormValidation-2912aeab.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-1d28b3cd.js";import"./Perioden-ca2a3b5d.js";import"./uttaksPlanStatus-02a1b7a2.js";import"./stringUtils-322285c5.js";import"./uttaksplanInfoUtils-f0e05f5a.js";import"./uttaksplanHarForMangeFlerbarnsuker-8089ba73.js";import"./index-bb915f46.js";import"./Uttaksplan-189cef91.js";import"./Link-d47e444a.js";import"./FormikFileUploader-8a83489b.js";import"./AttachmentList-eeb33f45.js";import"./Attachment-8705a58d.js";import"./dates-73c77ff4.js";import"./ExpansionCard-726422bd.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./dateUtils-4bfbba32.js";import"./stønadskontoer-8944cc6a.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./velkommenUtils-b2811faf.js";import"./amplitude.esm-2809efde.js";import"./createIntl-f7f642b5.js";const h={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15},G={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:h,minsteretter:G},j="/innsyn/v2/annenPartVedtak",S="/konto",p={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},J={fom:"2022-12-07",tom:"2022-12-27",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},g={fom:"2022-12-07",tom:"2023-01-07",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},bn={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:y},m=n=>{C();const I=E=>{E.onPost(j).replyOnce(200,{perioder:n.uttaksplanAnnenPart,dekningsgrad:b.HUNDRE_PROSENT},U.FINISHED),E.onGet(S).replyOnce(200,n.stønadskonto80),E.onGet(S).replyOnce(200,n.stønadskonto100)};return s.jsx(H,{initialEntries:[K.UTTAKSPLAN_INFO],children:s.jsx(v,{mock:I,children:s.jsx(L,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:s.jsx(y,{søker:p.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=m.bind({});t.args={stønadskonto100:P,stønadskonto80:_,barn:{type:k.FØDT,fødselsdatoer:[d("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const r=m.bind({});r.args={stønadskonto100:P,stønadskonto80:_,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const a=m.bind({});a.args={stønadskonto100:i,stønadskonto80:i,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:3,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const o=m.bind({});o.args={stønadskonto100:i,stønadskonto80:i,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[J]};var D,N,O;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: args.uttaksplanAnnenPart,
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
}`,...(O=(N=t.parameters)==null?void 0:N.docs)==null?void 0:O.source}}};var F,A,T;r.parameters={...r.parameters,docs:{...(F=r.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: args.uttaksplanAnnenPart,
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
}`,...(T=(A=r.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var R,x,f;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: args.uttaksplanAnnenPart,
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
}`,...(f=(x=a.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var c,u,M;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: args.uttaksplanAnnenPart,
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
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
}`,...(M=(u=o.parameters)==null?void 0:u.docs)==null?void 0:M.source}}};const Kn=["FarSøkerEtterMorFør1Okt2021","FarSøkerEtterMorEtter1Okt2021","FarSøkerEtterMorTrillinger","FarSøkerEtterMorDerMorHarTattUtFarsKvote"];export{o as FarSøkerEtterMorDerMorHarTattUtFarsKvote,r as FarSøkerEtterMorEtter1Okt2021,t as FarSøkerEtterMorFør1Okt2021,a as FarSøkerEtterMorTrillinger,Kn as __namedExportsOrder,bn as default};
