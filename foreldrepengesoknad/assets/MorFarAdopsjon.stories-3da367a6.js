import{j as A}from"./jsx-runtime-1caa8f64.js";import{d as m}from"./Tidsperioden-2d1db4bf.js";import{B as w}from"./barnUtils-52a07cb3.js";import{D as e}from"./Periodene-030a8cd0.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{F as z,C as t}from"./FpDataContext-939a8168.js";import{S as Q}from"./useFpNavigator-80e27ea2.js";import{R as W}from"./useRequest-603f2ddc.js";import{s as D,a as N}from"./stønadskontoDeltUttak100Adopsjon-9b36dfa2.js";import{A as X}from"./AxiosMock-f85117c7.js";import{U as $}from"./UttaksplanInfo-e6a56d47.js";import{i as Z}from"./IntlProvider-c1bc26a9.js";import{M as nn}from"./dateFormValidation-309722c8.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./dates-1f1d6788.js";import"./Perioden-8000a589.js";import"./uttaksPlanStatus-70244d59.js";import"./stringUtils-3cea292f.js";import"./apiInterceptor-d1094a41.js";import"./index-146fc9b8.js";import"./isFarEllerMedmor-120238ea.js";import"./leggTilPeriode-81869e8b.js";import"./uttaksplanInfoUtils-b8e169fd.js";import"./uttaksplanHarForMangeFlerbarnsuker-cf9a12b1.js";import"./eksisterendeSakUtils-6653cd82.js";import"./dateUtils-a998e40b.js";import"./velkommenUtils-135c8c82.js";import"./index-0ccac225.js";import"./Uttaksplan-b501956d.js";import"./FormikFileUploader-f447ccef.js";import"./AttachmentList-b7ed599c.js";import"./Attachment-5db4a859.js";import"./ExpansionCard-91e81e8b.js";import"./links-4d39192e.js";import"./LenkeKnapp-725b4f91.js";import"./stønadskontoer-ab64493e.js";import"./Ingress-10c1b249.js";import"./amplitude.esm-2809efde.js";import"./createIntl-9cf0195b.js";const en={FORELDREPENGER:230},an={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:en,minsteretter:an},tn={FORELDREPENGER:280},rn={farRundtFødsel:0,generellMinsterett:0,toTette:0},T={kontoer:tn,minsteretter:rn},on="/innsyn/v2/annenPartVedtak",F="/konto",g={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},x={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Xn={title:"steps/uttaksplan-info/MorFarAdopsjon",component:$},a=n=>{Z();const V=E=>{E.onPost(on).replyOnce(200,void 0,W.FINISHED),E.onGet(F).replyOnce(200,n.stønadskonto80),E.onGet(F).replyOnce(200,n.stønadskonto100)};return A.jsx(nn,{initialEntries:[Q.UTTAKSPLAN_INFO],children:A.jsx(X,{mock:V,children:A.jsx(z,{initialState:{[t.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:n.erMor?"mor":"far"},[t.OM_BARNET]:{type:w.ADOPTERT_ANNET_BARN,antallBarn:n.antallBarn,adopsjonsdato:n.adopsjonsdato,adoptertIUtlandet:!1,dokumentasjonAvAleneomsorg:[],fødselsdatoer:[],omsorgsovertakelse:[]},[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[t.SØKER_DATA]:n.søkerData,[t.ANNEN_FORELDER]:n.annenForelder},children:A.jsx($,{søker:n.søkerinfo.søker,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=a.bind({});r.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2021-03-15").toDate(),antallBarn:1};const o=a.bind({});o.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2021-03-15").toDate(),antallBarn:2};const s=a.bind({});s.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.ÅTTI_PROSENT,adopsjonsdato:m("2022-06-15").toDate(),antallBarn:1};const d=a.bind({});d.args={stønadskonto100:S,stønadskonto80:T,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!0},søkerData:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:m("2022-09-15").toDate(),antallBarn:1};const i=a.bind({});i.args={stønadskonto100:D,stønadskonto80:N,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:x,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const l=a.bind({});l.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const k=a.bind({});k.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:1};const p=a.bind({});p.args={stønadskonto100:D,stønadskonto80:N,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerData:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:2};var c,R,M;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
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
