import{j as o}from"./jsx-runtime-d079401a.js";import{w as k}from"./withRouter-d9926836.js";import{A as l}from"./AxiosMock-07682dd6.js";import{R as f}from"./useRequest-1bc7422a.js";import{_ as g}from"./søkerinfo-d0fdfcae.js";import{s as S,a as D}from"./stønadskontoDeltUttak100-ce558aaf.js";import{U as p}from"./UttaksplanInfo-723ff517.js";import{F as E,C as e}from"./FpDataContext-6d6d78b0.js";import{m as N}from"./mapSøkerinfoDTO-7324950a.js";import{d as O}from"./Tidsperioden-2f191506.js";import{B as R}from"./barnUtils-42471e8d.js";import{D as c}from"./Periodene-93f75033.js";import{D as T}from"./eksisterendeSakUtils-e1f0846a.js";import"./index-d741deb4.js";import"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import"./index-cdc86f56.js";import"./index-c74c9f7f.js";import"./index-54751434.js";import"./apiInterceptor-716e24db.js";import"./validation-631bcf6e.js";import"./dateFormValidation-f3ff7428.js";import"./dates-584a13c3.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f1dbaf58.js";import"./amplitude-b929dfa7.js";import"./amplitude.esm-ec80886e.js";import"./routes-7ba66c63.js";import"./uttaksplanHarForMangeFlerbarnsuker-1b4dfbbf.js";import"./Perioden-756f4214.js";import"./uttaksPlanStatus-931b1d24.js";import"./stringUtils-e263f9a0.js";import"./useFpApiData-7196599a.js";import"./index-47edccfa.js";import"./Uttaksplan-4220f9b0.js";import"./FormikFileUploader-06af9077.js";import"./AttachmentList-65372876.js";import"./Attachment-2a8e1687.js";import"./Link-13f307fd.js";import"./IntlProvider-5022d65e.js";import"./Alert-ea771e10.js";import"./provider-1018c8f1.js";import"./ExpansionCard-e912aff3.js";import"./links-4d39192e.js";import"./leggTilPeriode-bd13d552.js";import"./arbeidsforholdUtils-3cbd31df.js";import"./_baseIteratee-859b5d8a.js";import"./_baseUniq-627435a6.js";import"./BackButton-2183a9fc.js";import"./LenkeKnapp-9b88ce13.js";import"./dateUtils-0d76b092.js";import"./timezone-29fa0fe3.js";import"./stønadskontoer-1088bac0.js";import"./Ingress-6c1bbb1b.js";import"./InfoOmSøknaden-dc520488.js";import"./index-b580f7e8.js";import"./v4-4a60fe23.js";import"./velkommenUtils-76cff43a.js";import"./Tag-01a82302.js";const x="/innsyn/v2/annenPartVedtak",a="/konto",A=g,F={fom:"2022-12-07",tom:"2022-12-07",kontoType:"MØDREKVOTE",resultat:{innvilget:!0,trekkerMinsterett:!1,trekkerDager:!0,årsak:"ANNET"},morsAktivitet:"ARBEID",gradering:{arbeidstidprosent:55,aktivitet:{type:"FRILANS",arbeidsgiver:{id:"string",type:"PRIVAT"}}},samtidigUttak:50,flerbarnsdager:!0},Ut={title:"steps/uttaksplan-info/FarMedmorMedAnnenPart",component:p,decorators:[k]},u=t=>{const d=r=>{r.onPost(x).replyOnce(200,{perioder:[F],dekningsgrad:T.HUNDRE_PROSENT},f.FINISHED),r.onGet(a).replyOnce(200,t.stønadskonto100),r.onGet(a).replyOnce(200,t.stønadskonto80)};return o.jsx(l,{mock:d,children:o.jsx(E,{initialState:{[e.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[e.OM_BARNET]:t.barn,[e.PERIODE_MED_FORELDREPENGER]:{dekningsgrad:t.dekningsgrad},[e.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[e.ANNEN_FORELDER]:{etternavn:"Pettersen",fornavn:"Helga",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:o.jsx(p,{søkerInfo:N(t.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},n=u.bind({});n.args={stønadskonto100:S,stønadskonto80:D,barn:{type:R.FØDT,fødselsdatoer:[O("2021-06-14").toDate()],antallBarn:1,dokumentasjonAvAleneomsorg:[]},søkerinfo:A,dekningsgrad:c.HUNDRE_PROSENT};var s,i,m;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, ({
      perioder: [uttaksperiode],
      dekningsgrad: DekningsgradDTO.HUNDRE_PROSENT
    } as AnnenPartVedtakDTO), RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
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
        </AxiosMock>;
}`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const bt=["UttaksplanInfoAnnenPart"];export{n as UttaksplanInfoAnnenPart,bt as __namedExportsOrder,Ut as default};
