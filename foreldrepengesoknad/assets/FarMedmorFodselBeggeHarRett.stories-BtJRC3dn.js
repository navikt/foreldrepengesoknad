import{j as p}from"./jsx-runtime-DoxjgJx5.js";import{s as S,a as F}from"./stønadskontoDeltUttak80-ClNcnlfA.js";import{s as C,a as K,b as x}from"./stønadskontoDeltUttak100WLB-QrfEgc_X.js";import{A as h}from"./AxiosMock-CeLgoW4g.js";import"./Tidsperioden-DCn00dy0.js";import"./index-C-6Uy6j4.js";import"./index-Cu9bd8lq.js";import{B as e,D as t,M as G}from"./index-CdaWxK5t.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{i as J}from"./Step-CVcz0jW7.js";import{F as j,C as a}from"./FpDataContext-CjNulmBK.js";import{S as W}from"./useFpNavigator-2j8SPiSw.js";import{R as q}from"./useRequest-Bq8ZCFOD.js";import{U as B}from"./UttaksplanInfo-DCmi_wUe.js";import"./index-B_cCgG6K.js";import"./apiInterceptor-D_vgNGab.js";import"./axios-Cm0UX6qg.js";import"./Environment-O62Hvuhd.js";import"./index-SDyqs4cU.js";import"./Link-BqZ6CohM.js";import"./index-Ckls47V4.js";import"./dateFormValidation-CPrZc7L7.js";import"./links-dJHPeQm3.js";import"./message-D9M6PiyE.js";import"./amplitude.esm-CWYNo8IU.js";import"./lodash-o8vTUAkc.js";import"./Accordion-CANAfguR.js";import"./globalUtil-DCkRFRH6.js";import"./barnUtils-Cq84rcwD.js";import"./uttaksplanInfoUtils-ChXm-tfr.js";import"./eksisterendeSakUtils-xJWrp1-A.js";import"./velkommenUtils-Bj0L5CDT.js";import"./dateUtils-DbOA_qt1.js";import"./stønadskontoer-CFcPnUZJ.js";import"./BabyWrapped-DKbVzzLL.js";import"./LenkeKnapp-MqIXSt5W.js";const V="/innsyn/v2/annenPartVedtak",f="/konto",n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Ln={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:B},r=g=>{J();const H=m=>{m.onPost(V).replyOnce(200,void 0,q.FINISHED),m.onGet(f).replyOnce(200,g.stønadskonto80),m.onGet(f).replyOnce(200,g.stønadskonto100)};return p.jsx(G,{initialEntries:[W.UTTAKSPLAN_INFO],children:p.jsx(h,{mock:H,children:p.jsx(j,{initialState:{[a.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[a.OM_BARNET]:g.barn,[a.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:g.dekningsgrad},[a.SØKER_DATA]:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[a.ANNEN_FORELDER]:{erAleneOmOmsorg:!1,etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:p.jsx(B,{søkerInfo:n,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},o=r.bind({});o.args={stønadskonto100:S,stønadskonto80:F,barn:{type:e.FØDT,fødselsdatoer:["2021-06-14"],antallBarn:1},søkerinfo:n,dekningsgrad:t.HUNDRE_PROSENT};const s=r.bind({});s.args={stønadskonto100:C,stønadskonto80:K,barn:{type:e.FØDT,fødselsdatoer:["2021-06-14"],antallBarn:1},søkerinfo:n,dekningsgrad:t.ÅTTI_PROSENT};const d=r.bind({});d.args={stønadskonto100:C,stønadskonto80:K,barn:{type:e.UFØDT,termindato:"2022-08-31",antallBarn:1},søkerinfo:n,dekningsgrad:t.ÅTTI_PROSENT};const i=r.bind({});i.args={stønadskonto100:S,stønadskonto80:F,barn:{type:e.FØDT,fødselsdatoer:["2022-08-02"],antallBarn:1},søkerinfo:n,dekningsgrad:t.HUNDRE_PROSENT};const l=r.bind({});l.args={stønadskonto100:S,stønadskonto80:F,barn:{type:e.FØDT,fødselsdatoer:["2022-09-02"],antallBarn:2},søkerinfo:n,dekningsgrad:t.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:x,stønadskonto80:x,barn:{type:e.FØDT,fødselsdatoer:["2023-01-25"],termindato:"2023-04-01",antallBarn:1},søkerinfo:n,dekningsgrad:t.HUNDRE_PROSENT};var E,N,D;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(D=(N=o.parameters)==null?void 0:N.docs)==null?void 0:D.source}}};var R,c,O;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(O=(c=s.parameters)==null?void 0:c.docs)==null?void 0:O.source}}};var T,A,M;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(M=(A=d.parameters)==null?void 0:A.docs)==null?void 0:M.source}}};var u,_,I;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(I=(_=i.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var y,L,P;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(P=(L=l.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var U,v,b;k.parameters={...k.parameters,docs:{...(U=k.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
  initAmplitude();
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
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
          etternavn: 'dfg',
          fornavn: 'dfg',
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
}`,...(b=(v=k.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const Pn=["FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB","FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB","FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin","FarMedmorFødselBeggeHarRettFødselFør1Okt2021","FarMedmorFødselBeggeHarRettTvillinger","FarMedmorPrematurFødselBeggeHarRettPrematur"];export{s as FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB,o as FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB,d as FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin,i as FarMedmorFødselBeggeHarRettFødselFør1Okt2021,l as FarMedmorFødselBeggeHarRettTvillinger,k as FarMedmorPrematurFødselBeggeHarRettPrematur,Pn as __namedExportsOrder,Ln as default};
