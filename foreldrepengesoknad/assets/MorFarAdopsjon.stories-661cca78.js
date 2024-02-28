import{j as A}from"./jsx-runtime-1caa8f64.js";import{d as m}from"./Tidsperioden-1f4512e5.js";import{B as w}from"./barnUtils-a1c59311.js";import{D as e}from"./Periodene-56b794dc.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as z,C as t}from"./FpDataContext-939a8168.js";import{S as Q}from"./useFpNavigator-45cc79cf.js";import{R as W}from"./useRequest-603f2ddc.js";import{s as D,a as N}from"./stønadskontoDeltUttak100Adopsjon-9b36dfa2.js";import{A as X}from"./AxiosMock-f85117c7.js";import{U as $}from"./UttaksplanInfo-c9debe80.js";import{i as Z}from"./IntlProvider-c27c4fed.js";import{M as nn}from"./dateFormValidation-2912aeab.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-73c77ff4.js";import"./Perioden-ca2a3b5d.js";import"./uttaksPlanStatus-02a1b7a2.js";import"./stringUtils-322285c5.js";import"./apiInterceptor-d1094a41.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-1d28b3cd.js";import"./uttaksplanInfoUtils-f0e05f5a.js";import"./uttaksplanHarForMangeFlerbarnsuker-8089ba73.js";import"./eksisterendeSakUtils-0503f9b8.js";import"./dateUtils-4bfbba32.js";import"./velkommenUtils-b2811faf.js";import"./index-bb915f46.js";import"./Uttaksplan-189cef91.js";import"./FormikFileUploader-8a83489b.js";import"./AttachmentList-eeb33f45.js";import"./Attachment-8705a58d.js";import"./ExpansionCard-726422bd.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-8944cc6a.js";import"./Ingress-10c1b249.js";import"./amplitude.esm-2809efde.js";import"./createIntl-f7f642b5.js";const en={FORELDREPENGER:230},an={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:en,minsteretter:an},tn={FORELDREPENGER:280},rn={farRundtFødsel:0,generellMinsterett:0,toTette:0},T={kontoer:tn,minsteretter:rn},on="/innsyn/v2/annenPartVedtak",F="/konto",g={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},x={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Xn={title:"steps/uttaksplan-info/MorFarAdopsjon",component:$},a=n=>{Z();const V=E=>{E.onPost(on).replyOnce(200,void 0,W.FINISHED),E.onGet(F).replyOnce(200,n.stønadskonto80),E.onGet(F).replyOnce(200,n.stønadskonto100)};return A.jsx(nn,{initialEntries:[Q.UTTAKSPLAN_INFO],children:A.jsx(X,{mock:V,children:A.jsx(z,{initialState:{[t.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:n.erMor?"mor":"far"},[t.OM_BARNET]:{type:w.ADOPTERT_ANNET_BARN,antallBarn:n.antallBarn,adopsjonsdato:n.adopsjonsdato,adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[t.SØKER_DATA]:n.søkerData,[t.ANNEN_FORELDER]:n.annenForelder},children:A.jsx($,{søker:n.søkerinfo.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=a.bind({});r.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2021-03-15").toDate(),antallBarn:1};const o=a.bind({});o.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2021-03-15").toDate(),antallBarn:2};const s=a.bind({});s.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.ÅTTI_PROSENT,adopsjonsdato:m("2022-06-15").toDate(),antallBarn:1};const d=a.bind({});d.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2022-09-15").toDate(),antallBarn:1};const i=a.bind({});i.args={stønadskonto100:D,stønadskonto80:N,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:x,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const l=a.bind({});l.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const k=a.bind({});k.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:1};const p=a.bind({});p.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:2};var c,R,M;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(M=(R=r.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var O,f,u;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(u=(f=o.parameters)==null?void 0:f.docs)==null?void 0:u.source}}};var _,y,U;s.parameters={...s.parameters,docs:{...(_=s.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(U=(y=s.parameters)==null?void 0:y.docs)==null?void 0:U.source}}};var v,I,j;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(j=(I=d.parameters)==null?void 0:I.docs)==null?void 0:j.source}}};var P,L,K;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(K=(L=i.parameters)==null?void 0:L.docs)==null?void 0:K.source}}};var C,B,b;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(b=(B=l.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var G,h,J;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(J=(h=k.parameters)==null?void 0:h.docs)==null?void 0:J.source}}};var H,q,Y;p.parameters={...p.parameters,docs:{...(H=p.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
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
          situasjon: 'adopsjon',
          rolle: args.erMor ? 'mor' : 'far'
        },
        [ContextDataType.OM_BARNET]: {
          type: BarnType.ADOPTERT_ANNET_BARN,
          antallBarn: args.antallBarn,
          adopsjonsdato: args.adopsjonsdato,
          adoptertIUtlandet: false,
          dokumentasjonAvAleneomsorg: [],
          fødselsdatoer: [],
          omsorgsovertakelse: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søker={args.søkerinfo.søker} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(Y=(q=p.parameters)==null?void 0:q.docs)==null?void 0:Y.source}}};const Zn=["AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021","AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021","AdopsjonDeltUttakDerMorSøker","AdopsjonDeltUttakDerFarSøker100","AdopsjonMedDeltUttakDerFarSøker80","AdopsjonMedDeltUttakDerFarSøker80Tvillinger"];export{l as AdopsjonDeltUttakDerFarSøker100,i as AdopsjonDeltUttakDerMorSøker,d as AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021,o as AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021,k as AdopsjonMedDeltUttakDerFarSøker80,p as AdopsjonMedDeltUttakDerFarSøker80Tvillinger,r as AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021,s as AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021,Zn as __namedExportsOrder,Xn as default};
