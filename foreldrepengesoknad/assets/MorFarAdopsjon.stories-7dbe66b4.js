import{j as D}from"./jsx-runtime-1caa8f64.js";import{s as N,a as A}from"./stønadskontoDeltUttak100Adopsjon-9b36dfa2.js";import{A as V}from"./AxiosMock-9ec34b5d.js";import"./dates-b9443337.js";import{D as e,M as w,B as z}from"./dateFormValidation-6d447680.js";import"./index-753920cd.js";import"./index-1cdf6ce0.js";import"./_baseToString-2517c4f7.js";import"./_createSet-019d3bf6.js";import{i as Q}from"./IntlProvider-46cf9190.js";import{F as W,C as t}from"./FpDataContext-91c673b7.js";import{S as X}from"./useFpNavigator-b74d057a.js";import{R as Z}from"./useRequest-84d89b79.js";import{U as Y}from"./UttaksplanInfo-6531be8e.js";import"./index-146fc9b8.js";import"./apiInterceptor-7536bacb.js";import"./axios-91b57d60.js";import"./index-daf33b80.js";import"./Link-d47e444a.js";import"./index-a01a9712.js";import"./v4-4a60fe23.js";import"./amplitude.esm-2809efde.js";import"./createIntl-ae272ca8.js";import"./links-4d39192e.js";import"./barnUtils-98a96df3.js";import"./uttaksplanInfoUtils-a187e00e.js";import"./eksisterendeSakUtils-6d1126dd.js";import"./velkommenUtils-e7a2ea65.js";import"./dateUtils-60ccdc43.js";import"./stønadskontoer-f367f47f.js";import"./BabyWrapped-d9c18ef6.js";import"./ExpansionCard-f3614182.js";import"./LenkeKnapp-725b4f91.js";import"./Ingress-10c1b249.js";const nn={FORELDREPENGER:280},en={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:nn,minsteretter:en},an={FORELDREPENGER:230},tn={farRundtFødsel:0,generellMinsterett:0,toTette:0},T={kontoer:an,minsteretter:tn},rn="/innsyn/v2/annenPartVedtak",c="/konto",g={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},x={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},Gn={title:"steps/uttaksplan-info/MorFarAdopsjon",component:Y},a=n=>{Q();const $=E=>{E.onPost(rn).replyOnce(200,void 0,Z.FINISHED),E.onGet(c).replyOnce(200,n.stønadskonto80),E.onGet(c).replyOnce(200,n.stønadskonto100)};return D.jsx(w,{initialEntries:[X.UTTAKSPLAN_INFO],children:D.jsx(V,{mock:$,children:D.jsx(W,{initialState:{[t.SØKERSITUASJON]:{situasjon:"adopsjon",rolle:n.erMor?"mor":"far"},[t.OM_BARNET]:{type:z.ADOPTERT_ANNET_BARN,antallBarn:n.antallBarn,adopsjonsdato:n.adopsjonsdato,adoptertIUtlandet:!1,fødselsdatoer:[]},[t.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:n.dekningsgrad},[t.SØKER_DATA]:n.søkerData,[t.ANNEN_FORELDER]:n.annenForelder},children:D.jsx(Y,{søkerInfo:n.søkerinfo,erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})})},r=a.bind({});r.args={stønadskonto100:T,stønadskonto80:S,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:"2021-03-15",antallBarn:1};const o=a.bind({});o.args={stønadskonto100:T,stønadskonto80:S,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!1,erAleneOmOmsorg:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:"2021-03-15",antallBarn:2};const s=a.bind({});s.args={stønadskonto100:T,stønadskonto80:S,søkerinfo:x,erMor:!0,annenForelder:{kanIkkeOppgis:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.ÅTTI_PROSENT,adopsjonsdato:"2022-06-15",antallBarn:1};const d=a.bind({});d.args={stønadskonto100:T,stønadskonto80:S,søkerinfo:g,erMor:!1,annenForelder:{kanIkkeOppgis:!1,erAleneOmOmsorg:!0},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},dekningsgrad:e.HUNDRE_PROSENT,adopsjonsdato:"2022-09-15",antallBarn:1};const i=a.bind({});i.args={stønadskonto100:N,stønadskonto80:A,erMor:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:x,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const l=a.bind({});l.args={stønadskonto100:N,stønadskonto80:A,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.HUNDRE_PROSENT,antallBarn:1};const k=a.bind({});k.args={stønadskonto100:N,stønadskonto80:A,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:1};const p=a.bind({});p.args={stønadskonto100:N,stønadskonto80:A,erMor:!1,annenForelder:{fornavn:"Talentfull",etternavn:"Mygg",fnr:"19047815714",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1},søkerData:{harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},søkerinfo:g,dekningsgrad:e.ÅTTI_PROSENT,antallBarn:2};var m,F,R;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(R=(F=r.parameters)==null?void 0:F.docs)==null?void 0:R.source}}};var M,O,f;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(f=(O=o.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var u,_,y;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(y=(_=s.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var I,U,P;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(P=(U=d.parameters)==null?void 0:U.docs)==null?void 0:P.source}}};var L,j,v;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(v=(j=i.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};var K,C,B;l.parameters={...l.parameters,docs:{...(K=l.parameters)==null?void 0:K.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(B=(C=l.parameters)==null?void 0:C.docs)==null?void 0:B.source}}};var b,G,h;k.parameters={...k.parameters,docs:{...(b=k.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(h=(G=k.parameters)==null?void 0:G.docs)==null?void 0:h.source}}};var J,H,q;p.parameters={...p.parameters,docs:{...(J=p.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
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
          fødselsdatoer: []
        },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: {
          dekningsgrad: args.dekningsgrad
        },
        [ContextDataType.SØKER_DATA]: args.søkerData,
        [ContextDataType.ANNEN_FORELDER]: args.annenForelder
      }}>
                    <UttaksplanInfo søkerInfo={args.søkerinfo} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
                </FpDataContext>
            </AxiosMock>
        </MemoryRouter>;
}`,...(q=(H=p.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};const hn=["AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021","AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021","AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021","AdopsjonDeltUttakDerMorSøker","AdopsjonDeltUttakDerFarSøker100","AdopsjonMedDeltUttakDerFarSøker80","AdopsjonMedDeltUttakDerFarSøker80Tvillinger"];export{l as AdopsjonDeltUttakDerFarSøker100,i as AdopsjonDeltUttakDerMorSøker,d as AdopsjonFarMedAleneomsorgDekningsgrad100Etter1Okt2021,o as AdopsjonFarMedAleneomsorgDekningsgrad80TvillingerFør1Okt2021,k as AdopsjonMedDeltUttakDerFarSøker80,p as AdopsjonMedDeltUttakDerFarSøker80Tvillinger,r as AdopsjonMorMedAleneomsorgDekningsgrad100Før1Okt2021,s as AdopsjonMorMedAleneomsorgDekningsgrad80Etter1Okt2021,hn as __namedExportsOrder,Gn as default};
