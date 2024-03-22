import{j as o}from"./jsx-runtime-DoxjgJx5.js";import{s as u,a as P}from"./stønadskontoDeltUttak80-ClNcnlfA.js";import{A as y}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-BXZJ7Xx1.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as d,D as k,M as U}from"./index-BUeOcrf5.js";import{D as v}from"./eksisterendeSakUtils-DWya_l1-.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as L}from"./Step-DsnOrs4A.js";import{F as b,C as e}from"./FpDataContext-CjNulmBK.js";import{S as K}from"./useFpNavigator-CtL6-h5u.js";import{R as C}from"./useRequest-Bq8ZCFOD.js";import{U as _}from"./UttaksplanInfo-C_rRhglq.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-ueMUlaIN.js";import"./velkommenUtils-BHyyIiZQ.js";import"./barnUtils-CInKtSjf.js";import"./dateUtils-Cfda7oM8.js";import"./links-dJHPeQm3.js";import"./message-DTV81jgz.js";import"./amplitude.esm-CWYNo8IU.js";import"./lodash-o8vTUAkc.js";import"./Accordion-BoDoOgHB.js";import"./globalUtil-C9WE76GY.js";import"./uttaksplanInfoUtils-CKPgL9r4.js";import"./stønadskontoer-D2QURlOs.js";import"./BabyWrapped-DnMHtaWJ.js";import"./LenkeKnapp-MqIXSt5W.js";const H={MØDREKVOTE:75,FEDREKVOTE:75,FELLESPERIODE:165,FORELDREPENGER_FØR_FØDSEL:15},h={farRundtFødsel:0,generellMinsterett:0,toTette:0},i={kontoer:H,minsteretter:h},G="/innsyn/v2/annenPartVedtak",S="/konto",l={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},J={fom:"2022-12-07",tom:"2022-12-27",kontoType:"FEDREKVOTE",overføringÅrsak:"INSTITUSJONSOPPHOLD_ANNEN_FORELDER",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"}},g={fom:"2022-12-07",tom:"2023-01-07",kontoType:"FELLESPERIODE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},cn={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:_},p=n=>{L();const I=E=>{E.onPost(G).replyOnce(200,{perioder:n.uttaksplanAnnenPart,dekningsgrad:v.HUNDRE_PROSENT},C.FINISHED),E.onGet(S).replyOnce(200,n.stønadskonto80),E.onGet(S).replyOnce(200,n.stønadskonto100)};return o.jsx(U,{initialEntries:[K.UTTAKSPLAN_INFO],children:o.jsx(y,{mock:I,children:o.jsx(b,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:n.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[e.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{erAleneOmOmsorg:!1,etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:o.jsx(_,{søkerInfo:l,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},t=p.bind({});t.args={stønadskonto100:u,stønadskonto80:P,barn:{type:d.FØDT,fødselsdatoer:["2021-06-14"],antallBarn:1},dekningsgrad:k.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const r=p.bind({});r.args={stønadskonto100:u,stønadskonto80:P,barn:{type:d.FØDT,fødselsdatoer:["2022-09-14"],antallBarn:1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const a=p.bind({});a.args={stønadskonto100:i,stønadskonto80:i,barn:{type:d.FØDT,fødselsdatoer:["2022-09-14"],antallBarn:3},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT,uttaksplanAnnenPart:[g]};const s=p.bind({});s.args={stønadskonto100:i,stønadskonto80:i,barn:{type:d.FØDT,fødselsdatoer:["2022-09-14"],antallBarn:1},søkerinfo:l,dekningsgrad:k.HUNDRE_PROSENT,uttaksplanAnnenPart:[J]};var m,D,N;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          erAleneOmOmsorg: false,
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(N=(D=t.parameters)==null?void 0:D.docs)==null?void 0:N.source}}};var O,T,R;r.parameters={...r.parameters,docs:{...(O=r.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          erAleneOmOmsorg: false,
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(T=r.parameters)==null?void 0:T.docs)==null?void 0:R.source}}};var F,f,x;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          erAleneOmOmsorg: false,
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(x=(f=a.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var A,c,M;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
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
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          erAleneOmOmsorg: false,
          etternavn: 'Pettersen',
          fornavn: 'Helga',
          fnr: '02068629902',
          utenlandskFnr: false,
          kanIkkeOppgis: false,
          harRettPåForeldrepengerINorge: true,
          erInformertOmSøknaden: true
        }
      }}>
                    <UttaksplanInfo søkerInfo={søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(c=s.parameters)==null?void 0:c.docs)==null?void 0:M.source}}};const Mn=["FarSøkerEtterMorFør1Okt2021","FarSøkerEtterMorEtter1Okt2021","FarSøkerEtterMorTrillinger","FarSøkerEtterMorDerMorHarTattUtFarsKvote"];export{s as FarSøkerEtterMorDerMorHarTattUtFarsKvote,r as FarSøkerEtterMorEtter1Okt2021,t as FarSøkerEtterMorFør1Okt2021,a as FarSøkerEtterMorTrillinger,Mn as __namedExportsOrder,cn as default};
