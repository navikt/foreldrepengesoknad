import{j as a}from"./jsx-runtime-69eee039.js";import{w as M}from"./withRouter-f0df7a0f.js";import{A as O}from"./AxiosMock-ee1c53ff.js";import{F as R,U as F}from"./UttaksplanInfo-4e0675ee.js";import{R as D}from"./api-c8cb1d61.js";import{F as E,C as r}from"./FpDataContext-75ac2616.js";import{m as A}from"./mapSøkerinfoDTO-12ccca9c.js";import{d as s}from"./Tidsperioden-57efcdec.js";import{B as I}from"./barnUtils-bee45dcc.js";import"./index-e13aeee6.js";import"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-f4a01039.js";import"./index-7e40074d.js";import"./index-7b49b97c.js";import"./apiInterceptor-cff81df8.js";import"./validation-631bcf6e.js";import"./dateFormValidation-24de531f.js";import"./Periodene-f56e88dc.js";import"./Perioden-1c854ba4.js";import"./uttaksPlanStatus-1f5446f4.js";import"./stringUtils-9279c9e4.js";import"./isFarEllerMedmor-120238ea.js";import"./stepsConfig-f71b1bae.js";import"./amplitude-140e185d.js";import"./routes-9effe5a6.js";import"./Uttaksplan-c276434e.js";import"./FormikFileUploader-7ddafbe0.js";import"./AttachmentList-8d3b0f2c.js";import"./Attachment-2aa2754e.js";import"./Link-b834ea2b.js";import"./links-b36d21ab.js";import"./leggTilPeriode-9260f055.js";import"./arbeidsforholdUtils-1da69487.js";import"./_baseIteratee-9b4fb880.js";import"./_baseUniq-1bfab55f.js";import"./index-47edccfa.js";import"./BackButton-22f7a163.js";import"./message-87a45ae9.js";import"./LenkeKnapp-a5650a66.js";import"./InfoOmSøknaden-845f0535.js";import"./dateUtils-1f54a9f2.js";import"./eksisterendeSakUtils-90c073d8.js";import"./velkommenUtils-837cf02c.js";import"./exports-70c8b745.js";import"./index-b3a39e30.js";import"./v4-a960c1f4.js";const y={søker:{fnr:"1212121313",fornavn:"Espen",etternavn:"Utvikler",kjønn:"M",fødselsdato:"1978-04-12",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"TALENTFULL",etternavn:"MYGG"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}]}},u={FORELDREPENGER:250},v={farRundtFødsel:0,generellMinsterett:0,toTette:0},S={kontoer:u,minsteretter:v},U={FORELDREPENGER:200},x={farRundtFødsel:0,generellMinsterett:0,toTette:0},c={kontoer:U,minsteretter:x},P="/innsyn/v2/annenPartVedtak",i="/konto",g=y,Ie={title:"steps/uttaksplan-info/FarMedmorFødselOgMorHarIkkeRett",component:R,decorators:[M]},N=n=>{const T=o=>{o.onPost(P).replyOnce(200,void 0,D.FINISHED),o.onGet(i).replyOnce(200,n.stønadskonto100),o.onGet(i).replyOnce(200,n.stønadskonto80)};return a.jsx(O,{mock:T,children:a.jsx(E,{initialState:{[r.SØKERSITUASJON]:{situasjon:"fødsel",rolle:"far"},[r.OM_BARNET]:{type:I.FØDT,fødselsdatoer:[s("2021-07-01").toDate()],antallBarn:1,termindato:s("2021-07-01").toDate()},[r.SØKER]:{erAleneOmOmsorg:!1,harJobbetSomFrilansSiste10Mnd:!1,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:!1,harHattAnnenInntektSiste10Mnd:!1},[r.ANNEN_FORELDER]:n.annenForelder},children:a.jsx(F,{søkerInfo:A(n.søkerinfo),erEndringssøknad:!1,mellomlagreSøknadOgNaviger:()=>Promise.resolve(),avbrytSøknad:()=>{}})})})},e=N.bind({});e.args={stønadskonto100:c,stønadskonto80:S,søkerinfo:g,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!1,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};const t=N.bind({});t.args={stønadskonto100:c,stønadskonto80:S,søkerinfo:g,annenForelder:{etternavn:"dfg",fornavn:"dsgdfg",fnr:"123123123",utenlandskFnr:!1,erUfør:!0,kanIkkeOppgis:!1,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1}};var d,p,l;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var k,m,f;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`args => {
  const restMock = (apiMock: MockAdapter) => {
    apiMock.onPost(UTTAKSPLAN_ANNEN_URL).replyOnce(200, undefined, RequestStatus.FINISHED);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto100);
    apiMock.onGet(STØNADSKONTO_URL).replyOnce(200, args.stønadskonto80);
  };
  return <AxiosMock mock={restMock}>
            <FpDataContext initialState={{
      [ContextDataType.SØKERSITUASJON]: {
        situasjon: 'fødsel',
        rolle: 'far'
      },
      [ContextDataType.OM_BARNET]: {
        type: BarnType.FØDT,
        fødselsdatoer: [dayjs('2021-07-01').toDate()],
        antallBarn: 1,
        termindato: dayjs('2021-07-01').toDate()
      },
      [ContextDataType.SØKER]: {
        erAleneOmOmsorg: false,
        harJobbetSomFrilansSiste10Mnd: false,
        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd: false,
        harHattAnnenInntektSiste10Mnd: false
      },
      [ContextDataType.ANNEN_FORELDER]: args.annenForelder
    }}>
                <UttaksplanInfo søkerInfo={mapSøkerinfoDTOToSøkerinfo(args.søkerinfo)} erEndringssøknad={false} mellomlagreSøknadOgNaviger={() => Promise.resolve()} avbrytSøknad={() => undefined} />
            </FpDataContext>
        </AxiosMock>;
}`,...(f=(m=t.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};const ye=["UttaksplanDerMorIkkeHarRettPåForeldrepenger","UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør"];export{e as UttaksplanDerMorIkkeHarRettPåForeldrepenger,t as UttaksplanDerMorIkkeHarRettPåForeldrepengerOgMorErUfør,ye as __namedExportsOrder,Ie as default};
//# sourceMappingURL=FarMedmorFodselOgMorHarIkkeRett.stories-1c10b3a2.js.map
