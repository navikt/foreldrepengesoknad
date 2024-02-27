import{j as g}from"./jsx-runtime-1caa8f64.js";import{A as G}from"./AxiosMock-f85117c7.js";import{R as j}from"./useRequest-603f2ddc.js";import{s as F,a as x}from"./stønadskontoDeltUttak80-23916c37.js";import{s as C,a as K,b as D}from"./stønadskontoDeltUttak100WLB-2cb398e9.js";import{U as B}from"./UttaksplanInfo-e6a56d47.js";import{F as J,C as o}from"./FpDataContext-939a8168.js";import{d as e}from"./Tidsperioden-2d1db4bf.js";import{B as t}from"./barnUtils-52a07cb3.js";import{D as a}from"./Periodene-030a8cd0.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{S as W}from"./useFpNavigator-80e27ea2.js";import{i as q}from"./IntlProvider-c1bc26a9.js";import{M as w}from"./dateFormValidation-309722c8.js";import"./index-146fc9b8.js";import"./apiInterceptor-d1094a41.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./eksisterendeSakUtils-6653cd82.js";import"./dateUtils-a998e40b.js";import"./velkommenUtils-135c8c82.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./Link-d47e444a.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./dates-1f1d6788.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./index-daf33b80.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const V="/innsyn/v2/annenPartVedtak",E="/konto",n={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Gn={title:"steps/uttaksplan-info/FarMedmorFødselBeggeHarRett",component:B},r=p=>{q();const h=S=>{S.onPost(V).replyOnce(200,void 0,j.FINISHED),S.onGet(E).replyOnce(200,p.stønadskonto80),S.onGet(E).replyOnce(200,p.stønadskonto100)};return g.jsx(w,{initialEntries:[W.UTTAKSPLAN_INFO],children:g.jsx(G,{mock:h,children:g.jsx(J,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:p.barn,[o.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:p.dekningsgrad},[o.SØKER_DATA]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"Hanson",fornavn:"Hanne",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:g.jsx(B,{søker:n.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},s=r.bind({});s.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-01").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const i=r.bind({});i.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.FØDT,fødselsdatoer:[e("2022-08-03").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const d=r.bind({});d.args={stønadskonto100:C,stønadskonto80:K,barn:{type:t.UFØDT,termindato:new Date("2022-08-31"),antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.ÅTTI_PROSENT};const l=r.bind({});l.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2021-09-02").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const k=r.bind({});k.args={stønadskonto100:F,stønadskonto80:x,barn:{type:t.FØDT,fødselsdatoer:[e("2022-09-02").toDate()],antallBarn:2,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};const m=r.bind({});m.args={stønadskonto100:D,stønadskonto80:D,barn:{type:t.FØDT,fødselsdatoer:[e("2023-01-25").toDate()],termindato:e("2023-04-01").toDate(),antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:n,dekningsgrad:a.HUNDRE_PROSENT};var N,R,c;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
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
