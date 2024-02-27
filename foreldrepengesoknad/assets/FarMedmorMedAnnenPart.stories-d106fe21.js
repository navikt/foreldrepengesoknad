import{j as s}from"./jsx-runtime-1caa8f64.js";import{A as v}from"./AxiosMock-f85117c7.js";import{R as U}from"./useRequest-603f2ddc.js";import{s as P,a as _}from"./stønadskontoDeltUttak80-23916c37.js";import{U as y}from"./UttaksplanInfo-e6a56d47.js";import{F as L,C as e}from"./FpDataContext-939a8168.js";import{d}from"./Tidsperioden-2d1db4bf.js";import{B as k}from"./barnUtils-52a07cb3.js";import{D as l}from"./Periodene-030a8cd0.js";import{D as b}from"./eksisterendeSakUtils-6653cd82.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as K}from"./useFpNavigator-80e27ea2.js";import{i as C}from"./IntlProvider-c1bc26a9.js";import{M as H}from"./dateFormValidation-309722c8.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./Link-d47e444a.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./dates-1f1d6788.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./dateUtils-a998e40b.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./velkommenUtils-135c8c82.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const h={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15},G={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:h,minsteretter:G},j="/innsyn/v2/annenPartVedtak",S="/konto",p={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},J={fom:"2022-12-07",tom:"2022-12-27",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},g={fom:"2022-12-07",tom:"2023-01-07",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},bn={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:y},m=n=>{C();const I=E=>{E.onPost(j).replyOnce(200,{perioder:n.uttaksplanAnnenPart,dekningsgrad:b.HUNDRE_PROSENT},U.FINISHED),E.onGet(S).replyOnce(200,n.stønadskonto80),E.onGet(S).replyOnce(200,n.stønadskonto100)};return s.jsx(H,{initialEntries:[K.UTTAKSPLAN_INFO],children:s.jsx(v,{mock:I,children:s.jsx(L,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:s.jsx(y,{søker:p.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=m.bind({});t.args={stønadskonto100:P,stønadskonto80:_,barn:{type:k.FØDT,fødselsdatoer:[d("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const r=m.bind({});r.args={stønadskonto100:P,stønadskonto80:_,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const a=m.bind({});a.args={stønadskonto100:i,stønadskonto80:i,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:3,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const o=m.bind({});o.args={stønadskonto100:i,stønadskonto80:i,barn:{type:k.FØDT,fødselsdatoer:[d("2022-09-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:p,dekningsgrad:l.HUNDRE_PROSENT,uttaksplanAnnenPart:[J]};var D,N,O;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`args => {
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
