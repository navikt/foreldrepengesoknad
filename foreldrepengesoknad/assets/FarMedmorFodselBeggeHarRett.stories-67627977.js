import{j as g}from"./jsx-runtime-1caa8f64.js";import{A as G}from"./AxiosMock-f85117c7.js";import{R as j}from"./useRequest-603f2ddc.js";import{s as F,a as x}from"./stønadskontoDeltUttak80-23916c37.js";import{s as C,a as K,b as D}from"./stønadskontoDeltUttak100WLB-2cb398e9.js";import{U as B}from"./UttaksplanInfo-c9debe80.js";import{F as J,C as o}from"./FpDataContext-939a8168.js";import{d as e}from"./Tidsperioden-1f4512e5.js";import{B as t}from"./barnUtils-a1c59311.js";import{D as a}from"./Periodene-56b794dc.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as W}from"./useFpNavigator-45cc79cf.js";import{i as q}from"./IntlProvider-c27c4fed.js";import{M as w}from"./dateFormValidation-2912aeab.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-1d28b3cd.js";import"./Perioden-ca2a3b5d.js";import"./uttaksPlanStatus-02a1b7a2.js";import"./stringUtils-322285c5.js";import"./uttaksplanInfoUtils-f0e05f5a.js";import"./uttaksplanHarForMangeFlerbarnsuker-8089ba73.js";import"./eksisterendeSakUtils-0503f9b8.js";import"./dateUtils-4bfbba32.js";import"./velkommenUtils-b2811faf.js";import"./index-bb915f46.js";import"./Uttaksplan-189cef91.js";import"./Link-d47e444a.js";import"./FormikFileUploader-8a83489b.js";import"./AttachmentList-eeb33f45.js";import"./Attachment-8705a58d.js";import"./dates-73c77ff4.js";import"./ExpansionCard-726422bd.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-8944cc6a.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-f7f642b5.js";const V="/innsyn/v2/annenPartVedtak",E="/konto",n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Gn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:B},r=p=>{q();const h=S=>{S.onPost(V).replyOnce(200,void 0,j.FINISHED),S.onGet(E).replyOnce(200,p.stønadskonto80),S.onGet(E).replyOnce(200,p.stønadskonto100)};return g.jsx(w,{initialEntries:[W.UTTAKSPLAN_INFO],children:g.jsx(G,{mock:h,children:g.jsx(J,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:p.barn,[o.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:p.dekningsgrad},[o.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"Hanson",fornavn:"Hanne",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:g.jsx(B,{søker:n.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},s=r.bind({});s.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-01").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const i=r.bind({});i.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-03").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const d=r.bind({});d.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.UFØDT,termindato:new Date("2022-08-31"),antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.ÅTTI_PROSENT};const l=r.bind({});l.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2021-09-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-09-02").toDate()],antallBarn:2,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const m=r.bind({});m.args={stønadskonto100:D,stønadskonto80:D,barn:{type:t.FØDT,fødselsdatoer:[e("2023-01-25").toDate()],termindato:e("2023-04-01").toDate(),antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};var N,R,c;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(c=(R=s.parameters)==null?void 0:R.docs)==null?void 0:c.source}}};var f,A,O;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(O=(A=i.parameters)==null?void 0:A.docs)==null?void 0:O.source}}};var T,M,u;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(u=(M=d.parameters)==null?void 0:M.docs)==null?void 0:u.source}}};var y,_,I;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(I=(_=l.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var v,L,P;k.parameters={...k.parameters,docs:{...(v=k.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(P=(L=k.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var U,b,H;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`args => {
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
          erAleneOmOmsorg: false,
          harJobbetSomFrilansSiste10Mnd: false,
          harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
          harHattAnnenInntektSiste10Mnd: false
        },
        [ContextDataType.ANNEN_FORELDER]: {
          etternavn: 'Hanson',
          fornavn: 'Hanne',
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
}`,...(H=(b=m.parameters)==null?void 0:b.docs)==null?void 0:H.source}}};const jn=["FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB","FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB","FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin","FarMedmorFødselBeggeHarRettFødselFør1Okt2021","FarMedmorFødselBeggeHarRettTvillinger","FarMedmorPrematurFødselBeggeHarRettPrematur"];export{i as FarMedmorFødselBeggeHarRettDekningsgrad100EtterWLB,s as FarMedmorFødselBeggeHarRettDekningsgrad100FørWLB,d as FarMedmorFødselBeggeHarRettDekningsgrad80EtterWLBTermin,l as FarMedmorFødselBeggeHarRettFødselFør1Okt2021,k as FarMedmorFødselBeggeHarRettTvillinger,m as FarMedmorPrematurFødselBeggeHarRettPrematur,jn as __namedExportsOrder,Gn as default};
