import{j as r}from"./jsx-runtime-DtaoT6pD.js";import{w as k}from"./withRouter-Y7oi-tYz.js";import{A as f}from"./AxiosMock-KQlr1Nb8.js";import{R as S}from"./api-nwdwJ8k1.js";import{s as c,a as F}from"./stønadskontoDeltUttak100-vHgwH-1x.js";import{U as d}from"./UttaksplanInfo-1ftd1JtX.js";import{F as x,C as o}from"./FpDataContext-vZKgGA8_.js";import{m as g}from"./mapSøkerinfoDTO-X1iCqeel.js";import{d as a}from"./Tidsperioden-aDyM1aIt.js";import{B as A}from"./barnUtils-YBZ_J5GH.js";import"./index-rOAPTY5O.js";import"./index-OjgoNOWw.js";import"./_baseToString-c7_W74Ua.js";import"./_createSet-hSZRoo1M.js";import"./index-U0S_AV9L.js";import"./index-mQqIOHEI.js";import"./index-8mLkeWaP.js";import"./apiInterceptor-aGCWLuNT.js";import"./validation-zAycEoXM.js";import"./dateFormValidation-LIdg5doX.js";import"./dates-pF37sd5-.js";import"./Periodene-dmpQllk8.js";import"./Perioden-ccnBD1r4.js";import"./uttaksPlanStatus-Ux938-AR.js";import"./stringUtils-m7w95leF.js";import"./isFarEllerMedmor-2H8vc5u5.js";import"./stepsConfig-6IAMv_G2.js";import"./amplitude--qTo3lH-.js";import"./amplitude.esm-OOIXs19H.js";import"./routes-IIwIGa6S.js";import"./Uttaksplan-GZqC5Bsc.js";import"./FormikFileUploader-XFuJ_PjZ.js";import"./AttachmentList-CvR0xonp.js";import"./Attachment-EeWnTSCv.js";import"./Link-IggFwnrW.js";import"./IntlProvider-n6iBafS0.js";import"./Alert-4KefUeFm.js";import"./provider-wwBoMs8b.js";import"./ExpansionCard-On_KGJWn.js";import"./links-BwIVhdNo.js";import"./leggTilPeriode-1WOgGzhw.js";import"./arbeidsforholdUtils-UowGK9vl.js";import"./_baseIteratee-j829L0Q9.js";import"./_baseUniq-2KlOTSab.js";import"./index-w2TxLgAC.js";import"./BackButton--zvB_H1P.js";import"./LenkeKnapp-VMWcRTHZ.js";import"./InfoOmSøknaden-i6kAOb9q.js";import"./dateUtils-C1bi-gXk.js";import"./Ingress-xQnNY-7S.js";import"./eksisterendeSakUtils-jLccwDDy.js";import"./velkommenUtils-omywOvJJ.js";import"./Tag-WODZmQq7.js";import"./index-lbrLmSir.js";import"./v4-yQnnJER4.js";const N={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[]}},O="/innsyn/v2/annenPartVedtak",s="/konto",D=N,yt={title:"steps/uttaksplan-info/FarMedmorFødselAleneomsorg",component:d,decorators:[k]},T=n=>{const l=async e=>{e.onPost(O).replyOnce(200,void 0,S.FINISHED),await e.onGet(s).replyOnce(200,n.stønadskonto100),await e.onGet(s).replyOnce(200,n.stønadskonto80)};return r.jsx(f,{mock:l,children:r.jsx(x,{initialState:{[o.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[o.OM_BARNET]:{type:A.FØDT,fødselsdatoer:[a("2022-03-01").toDate()],antallBarn:1,datoForAleneomsorg:a("2022-03-24").toDate(),dokumentasjonAvAleneomsorg:[]},[o.SØKER]:{erAleneOmOmsorg:!0,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[o.ANNEN_FORELDER]:{etternavn:"dfg",fornavn:"dfg",fnr:"02068629902",utenlandskFnr:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!0,erInformertOmSøknaden:!0}},children:r.jsx(d,{søkerInfo:g(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},t=T.bind({});t.args={stønadskonto100:c,stønadskonto80:F,søkerinfo:D};var i,m,p;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`args => {
  const restMock = async (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    await apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2022-03-01').toDate()],
        antallBarn: 1,
        datoForAleneomsorg: dayjs('2022-03-24').toDate(),
        dokumentasjonAvAleneomsorg: []
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: true,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: {
        etternavn: 'dfg',
        fornavn: 'dfg',
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
}`,...(p=(m=t.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const Et=["UttaksplanInfoFarMedmorFødselAleneomsorg"];export{t as UttaksplanInfoFarMedmorFødselAleneomsorg,Et as __namedExportsOrder,yt as default};
