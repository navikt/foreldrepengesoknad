import{bq as N,J as k,aT as $,_ as d,aS as Q,bA as q,bC as u}from"./iframe-D6recCor.js";import{F as z,C as n}from"./FpDataContext-8dSQaWvo.js";import{A as H,M as W,S as X}from"./useFpNavigator-CF3cLl9p.js";import{h as m,H as E}from"./index-CPzIaplo.js";import{a as Oe}from"./annenPartVedtak-Dw1uUoYP.js";import{S as e,b as a,A as Y,I as p}from"./uttaksplanInfoUtils-Cqgqlo4l.js";import{S as w}from"./sivilstandType-DxfjzFEG.js";import{O as Z}from"./OppsummeringSteg-CW6lF_AN.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-C9cUcyVA.js";import"./api-CjJk_39L.js";import"./queries-OXtU1LJP.js";import"./eksisterendeSakUtils-D-pvGT6B.js";import"./guid-CsArkN6i.js";import"./List-WRtixFGa.js";import"./stønadskontoerUtils-IetJHYIu.js";const{action:ee}=__STORYBOOK_MODULE_ACTIONS__,Se=()=>()=>(ee("button-click")(),Promise.resolve()),l={søker:{fnr:"02520489226",fornavn:"MOR",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"08099017784",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"}],sivilstand:{type:w.GIFT}},arbeidsforhold:[]},o={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:w.UGIFT}},arbeidsforhold:[]},ne={type:N.FØDT,fødselsdatoer:["2021-03-15"],antallBarn:1,datoForAleneomsorg:"2021-03-15",dokumentasjonAvAleneomsorg:[]},Ie={situasjon:"fødsel",rolle:"mor"},O={kanIkkeOppgis:!0},re={harBoddUtenforNorgeSiste12Mnd:!1,skalBoUtenforNorgeNeste12Mnd:!1},ae=[{id:"0",type:"uttak",forelder:"MOR",konto:"FORELDREPENGER_FØR_FØDSEL",tidsperiode:{fom:new Date("2021-11-23T23:00:00.000Z"),tom:new Date("2021-12-13T23:00:00.000Z")}},{id:"1",type:"utsettelse",årsak:"INSTITUSJONSOPPHOLD_SØKER",tidsperiode:{fom:new Date("2021-12-14T23:00:00.000Z"),tom:new Date("2022-01-24T23:00:00.000Z")}},{id:"2",type:"periodeUtenUttak",tidsperiode:{fom:new Date("2022-01-25T23:00:00.000Z"),tom:new Date("2022-03-28T23:00:00.000Z")}},{id:"3",type:"uttak",forelder:"MOR",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!1,gradert:!1}],ke={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},S={[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[],[e.DOK_INNLEGGELSE_BARN]:[],[e.DOK_INNLEGGELSE_MOR]:[],[e.DOK_INNLEGGELSE_FAR]:[],[e.DOK_SYKDOM_MOR]:[],[e.DOK_SYKDOM_FAR]:[],[e.DOK_ARBEID_MOR]:[],[e.DOK_UTDANNING_MOR]:[],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[],[e.OMSORGSOVERTAKELSE]:[],[e.DOK_AV_ALENEOMSORG]:[],[e.TERMINBEKREFTELSE]:[],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[],[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[]},x={erAleneOmOmsorg:!1,fornavn:"Kari",etternavn:"Nordmann",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erInformertOmSøknaden:!0},C=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,fom:k().subtract(5,"year").format("YYYY-MM-DD")}],Ue={title:"steps/Oppsummering",component:Z,parameters:{msw:{handlers:[m.post(".//rest/storage/foreldrepenger",()=>new E(null,{status:200})),m.post(".//rest/innsyn/v2/annenPartVedtak",()=>new E(null,{status:200}))]}},render:({søkersituasjon:t=Ie,annenForelder:f=O,barn:I=ne,utenlandsopphold:te=re,utenlandsoppholdSenere:se,utenlandsoppholdTidligere:oe,arbeidsforholdOgInntekt:de=ke,frilans:le,egenNæring:ie,andreInntekter:me,gåTilNesteSide:Ee,vedlegg:fe=S,...ge})=>{const pe=new $({defaultOptions:{queries:{retry:!1}}});return d.jsx(Q,{client:pe,children:d.jsx(W,{initialEntries:[X.OPPSUMMERING],children:d.jsx(z,{onDispatch:Ee,initialState:{[n.ARBEIDSFORHOLD_OG_INNTEKT]:de,[n.FRILANS]:le,[n.EGEN_NÆRING]:ie,[n.ANDRE_INNTEKTSKILDER]:me,[n.ANNEN_FORELDER]:f,[n.SØKERSITUASJON]:t,[n.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[n.OM_BARNET]:I,[n.UTENLANDSOPPHOLD]:te,[n.UTENLANDSOPPHOLD_SENERE]:se,[n.UTENLANDSOPPHOLD_TIDLIGERE]:oe,[n.PERIODE_MED_FORELDREPENGER]:q.HUNDRE_PROSENT,[n.UTTAKSPLAN]:ae,[n.VEDLEGG]:fe},children:d.jsx(Z,{...ge})})})})}},r={args:{erEndringssøknad:!1,sendSøknad:()=>Promise.resolve(),søkerInfo:l,avbrytSøknad:ee("button-click"),mellomlagreSøknadOgNaviger:Se()}},A={args:{...r.args,annenForelder:{erAleneOmOmsorg:!1,fornavn:"Espen",etternavn:"Utvikler",fnr:"08099017784",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},barn:{type:N.UFØDT,antallBarn:1,termindato:"2025-10-01"},søkerInfo:{...l,søker:{...l.søker,sivilstand:{type:w.UGIFT}}}}},_={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"mor"},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"08099017784",kanIkkeOppgis:!1}}},D={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o},annenForelder:{erAleneOmOmsorg:!0,fornavn:"Ingen",etternavn:"Omsorg",fnr:"02520489226",kanIkkeOppgis:!1},barn:{type:N.UFØDT,antallBarn:2,termindato:"2025-10-01"}}},R={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Eline",etternavn:"Utvikler",fnr:"02520489226",harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1,erMorUfør:!0},søkerInfo:{...o,søker:{...o.søker,sivilstand:{type:w.UGIFT}}},barn:{type:N.UFØDT,antallBarn:1,termindato:"2025-10-01"}}},M={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!0,kanIkkeOppgis:!1},søkerInfo:{...o}}},F={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Anne",etternavn:"Forelder",fnr:"02520489226",harOppholdtSegIEØS:!0,harRettPåForeldrepengerINorge:!1,harRettPåForeldrepengerIEØS:!1,kanIkkeOppgis:!1},søkerInfo:{...o}}},T={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},annenForelder:{erAleneOmOmsorg:!1,fornavn:"Frida",etternavn:"Norsk",fnr:"02520489226",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1},søkerInfo:{...o}}},c={args:T.args,parameters:{msw:{handlers:[m.post(".//rest/storage/foreldrepenger",()=>new E(null,{status:200})),m.post(".//rest/innsyn/v2/annenPartVedtak",()=>E.json(Oe))]}}},K={args:{...r.args,søkersituasjon:{rolle:"mor",situasjon:"adopsjon"},barn:{type:N.ADOPTERT_STEBARN,antallBarn:1,adopsjonsdato:"2021-10-01",fødselsdatoer:["2021-01-01"],adoptertIUtlandet:!1,omsorgsovertakelse:[]}}},L={args:{...r.args,utenlandsopphold:{skalBoUtenforNorgeNeste12Mnd:!0,harBoddUtenforNorgeSiste12Mnd:!0},utenlandsoppholdSenere:[{landkode:"SE",fom:k().format(u),tom:k().add(100,"days").format(u)}],utenlandsoppholdTidligere:[{landkode:"SE",fom:k().subtract(10,"months").format(u),tom:k().subtract(1,"days").format(u)}]}},h={args:{...r.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!0,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1},frilans:{jobberFremdelesSomFrilans:!0,oppstart:"2019-01-01"},annenForelder:{...O,erAleneOmOmsorg:!1},søkerInfo:{søker:l.søker,arbeidsforhold:[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Auto Joachim Bilpleie",stillingsprosent:80,fom:"2015-01-01"},{arbeidsgiverId:"2",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Taco Express",stillingsprosent:20,fom:"2019-01-01",tom:"2021-01-01"}]}}},b={args:{...r.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",fom:"2018-01-01",tom:"2021-01-01",næringstype:"FISKE",organisasjonsnummer:"123",næringsinntekt:1e6,registrertINorge:!0,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!0,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!0},annenForelder:{...O,erAleneOmOmsorg:!1},søkerInfo:l}},v={args:{...r.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!0},egenNæring:{navnPåNæringen:"Fiske",fom:"2018-01-01",tom:"2021-01-01",næringstype:"FISKE",registrertILand:"SE",registrertINorge:!1,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:!1,hattVarigEndringAvNæringsinntektSiste4Kalenderår:!1},annenForelder:{...O,erAleneOmOmsorg:!1},søkerInfo:l}},y={args:{...r.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:H.JOBB_I_UTLANDET,pågående:!1,fom:"2018-01-01",tom:"2021-01-01",arbeidsgiverNavn:"Statoil",land:"SE"},{type:H.MILITÆRTJENESTE,pågående:!0,fom:"2022-01-01"},{type:H.SLUTTPAKKE,fom:"2022-01-01",tom:"2023-01-01"}],annenForelder:{...O,erAleneOmOmsorg:!1},søkerInfo:l}},U={args:{...r.args,arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!0,harJobbetSomSelvstendigNæringsdrivende:!1},andreInntekter:[{type:H.MILITÆRTJENESTE,pågående:!1,fom:"2018-01-01",tom:"2021-01-01"}],annenForelder:{...O,erAleneOmOmsorg:!1},søkerInfo:l}},i={filesize:1234,url:"test",id:"1",file:new File(["abc".repeat(1e5)],"Filnavn1.jpg"),pending:!1,uploaded:!0},s={...i,dokumenterer:{type:Y.UTTAK,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},g={args:{...r.args,vedlegg:{...S,[e.ETTERLØNN_ELLER_SLUTTVEDERLAG]:[{...i,filename:"etterlønn.pdf",type:a.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG,dokumenterer:{type:Y.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}},{...i,filename:"etterlønn2.pdf",type:a.ANNEN_INNTEKT,skjemanummer:e.ETTERLØNN_ELLER_SLUTTVEDERLAG}],[e.DOK_MILITÆR_SILVIL_TJENESTE]:[{...i,filename:"siviltjeneste.pdf",type:a.ANNEN_INNTEKT,skjemanummer:e.DOK_MILITÆR_SILVIL_TJENESTE,dokumenterer:{type:Y.OPPTJENING,perioder:[{fom:"2024-01-01",tom:"2024-10-01"}]}}],[e.OMSORGSOVERTAKELSE]:[{...i,filename:"omsorgsovertakelse.pdf",type:a.OMSORGSOVERTAKELSE,skjemanummer:e.OMSORGSOVERTAKELSE}],[e.DOK_AV_ALENEOMSORG]:[{...i,filename:"aleneomsorg.pdf",type:a.ALENEOMSORG,skjemanummer:e.DOK_AV_ALENEOMSORG}],[e.TERMINBEKREFTELSE]:[{...i,filename:"terminbekreftelse.pdf",type:a.TERMINBEKREFTELSE,skjemanummer:e.TERMINBEKREFTELSE}],[e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:[{...s,filename:"dok-deltakelse.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET}],[e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:[{...s,filename:"kvalifiseringsprogram.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM}],[e.DOK_INNLEGGELSE_MOR]:[{...s,filename:"innleggelse-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_MOR}],[e.DOK_INNLEGGELSE_BARN]:[{...s,filename:"innleggelse-barn.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_BARN}],[e.DOK_INNLEGGELSE_FAR]:[{...s,filename:"innleggelse-far.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_INNLEGGELSE_FAR}],[e.DOK_SYKDOM_MOR]:[{...s,filename:"sykdom-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_SYKDOM_MOR}],[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR}],[e.DOK_UTDANNING_MOR]:[{...s,filename:"dok-utdanning-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_MOR}],[e.DOK_UTDANNING_OG_ARBEID_MOR]:[{...s,filename:"dok-utdanning-og-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_OG_ARBEID_MOR}]}}},j={args:{...r.args,vedlegg:{...g.args?.vedlegg?Object.entries(g.args.vedlegg).reduce((t,f)=>({...t,[f[0]]:f[1].map(I=>({...I,innsendingsType:p.SEND_SENERE}))}),{}):{}}}},G={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:C},annenForelder:x,vedlegg:{...S,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:p.AUTOMATISK}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[m.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new E(JSON.stringify(!1),{status:200}))]}}},P={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:C},annenForelder:x,vedlegg:{...S,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:p.AUTOMATISK}],[e.DOK_UTDANNING_MOR]:[{...s,filename:"dok-utdanning-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_UTDANNING_MOR,innsendingsType:p.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[m.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new E(JSON.stringify(!1),{status:200}))]}}},J={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:[{...C[0],stillingsprosent:70}]},annenForelder:x,vedlegg:{...S,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:p.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},parameters:{msw:{handlers:[m.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new E(JSON.stringify(!0),{status:200}))]}}},B={args:{...r.args,søkersituasjon:{situasjon:"fødsel",rolle:"far"},søkerInfo:{...o,arbeidsforhold:C},annenForelder:x,vedlegg:{...S,[e.DOK_ARBEID_MOR]:[{...s,filename:"dok-arbeid-mor.pdf",type:a.MORS_AKTIVITET_DOKUMENTASJON,skjemanummer:e.DOK_ARBEID_MOR,innsendingsType:p.SEND_SENERE}]},arbeidsforholdOgInntekt:{harJobbetSomFrilans:!1,harHattAndreInntektskilder:!1,harJobbetSomSelvstendigNæringsdrivende:!1}},render:t=>{const f=new $({defaultOptions:{queries:{retry:!1,staleTime:0}}}),I=[...ae.slice(0,3),{id:"3",type:"uttak",forelder:"MOR",konto:"FELLESPERIODE",tidsperiode:{fom:new Date("2022-03-29T23:00:00.000Z"),tom:new Date("2022-06-06T23:00:00.000Z")},ønskerSamtidigUttak:!0,gradert:!1}];return d.jsx(Q,{client:f,children:d.jsx(W,{initialEntries:[X.OPPSUMMERING],children:d.jsx(z,{onDispatch:t.gåTilNesteSide,initialState:{[n.ARBEIDSFORHOLD_OG_INNTEKT]:t.arbeidsforholdOgInntekt,[n.FRILANS]:t.frilans,[n.EGEN_NÆRING]:t.egenNæring,[n.ANDRE_INNTEKTSKILDER]:t.andreInntekter,[n.ANNEN_FORELDER]:t.annenForelder,[n.SØKERSITUASJON]:t.søkersituasjon,[n.UTTAKSPLAN_METADATA]:{ønskerJustertUttakVedFødsel:!1,harUttaksplanBlittSlettet:!1,antallUkerIUttaksplan:1},[n.OM_BARNET]:t.barn||ne,[n.UTENLANDSOPPHOLD]:t.utenlandsopphold||re,[n.UTENLANDSOPPHOLD_SENERE]:t.utenlandsoppholdSenere,[n.UTENLANDSOPPHOLD_TIDLIGERE]:t.utenlandsoppholdTidligere,[n.PERIODE_MED_FORELDREPENGER]:q.HUNDRE_PROSENT,[n.UTTAKSPLAN]:I,[n.VEDLEGG]:t.vedlegg},children:d.jsx(Z,{...t})})})})}},V={args:{...r.args,erEndringssøknad:!0,annenForelder:{fornavn:"Espen",etternavn:"Utvikler",fnr:"1212121313",harRettPåForeldrepengerINorge:!0,kanIkkeOppgis:!1,erAleneOmOmsorg:!1}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    erEndringssøknad: false,
    sendSøknad: () => Promise.resolve(),
    søkerInfo: defaultSøkerinfoMor,
    avbrytSøknad: action('button-click'),
    mellomlagreSøknadOgNaviger: promiseAction()
  }
}`,...r.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '08099017784',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2025-10-01'
    },
    søkerInfo: {
      ...defaultSøkerinfoMor,
      søker: {
        ...defaultSøkerinfoMor.søker,
        sivilstand: {
          type: SivilstandType.UGIFT
        }
      }
    }
  }
}`,...A.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'mor'
    },
    annenForelder: {
      erAleneOmOmsorg: true,
      fornavn: 'Ingen',
      etternavn: 'Omsorg',
      fnr: '08099017784',
      kanIkkeOppgis: false
    }
  }
}`,..._.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    },
    annenForelder: {
      erAleneOmOmsorg: true,
      fornavn: 'Ingen',
      etternavn: 'Omsorg',
      fnr: '02520489226',
      kanIkkeOppgis: false
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 2,
      termindato: '2025-10-01'
    }
  }
}`,...D.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Eline',
      etternavn: 'Utvikler',
      fnr: '02520489226',
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: false,
      kanIkkeOppgis: false,
      erMorUfør: true
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      søker: {
        ...defaultSøkerinfoFar.søker,
        sivilstand: {
          type: SivilstandType.UGIFT
        }
      }
    },
    barn: {
      type: BarnType.UFØDT,
      antallBarn: 1,
      termindato: '2025-10-01'
    }
  }
}`,...R.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Anne',
      etternavn: 'Forelder',
      fnr: '02520489226',
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: true,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...M.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Anne',
      etternavn: 'Forelder',
      fnr: '02520489226',
      harOppholdtSegIEØS: true,
      harRettPåForeldrepengerINorge: false,
      harRettPåForeldrepengerIEØS: false,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...F.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    annenForelder: {
      erAleneOmOmsorg: false,
      fornavn: 'Frida',
      etternavn: 'Norsk',
      fnr: '02520489226',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false
    },
    søkerInfo: {
      ...defaultSøkerinfoFar
    }
  }
}`,...T.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: FarMedMorSomHarRettINorge.args,
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/storage/foreldrepenger\`, () => new HttpResponse(null, {
        status: 200
      })), http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/annenPartVedtak\`, () => HttpResponse.json(annenPartVedtak))]
    }
  }
}`,...c.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      rolle: 'mor',
      situasjon: 'adopsjon'
    },
    barn: {
      type: BarnType.ADOPTERT_STEBARN,
      antallBarn: 1,
      adopsjonsdato: '2021-10-01',
      fødselsdatoer: ['2021-01-01'],
      adoptertIUtlandet: false,
      omsorgsovertakelse: []
    } as Barn
  }
}`,...K.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    utenlandsopphold: {
      skalBoUtenforNorgeNeste12Mnd: true,
      harBoddUtenforNorgeSiste12Mnd: true
    },
    utenlandsoppholdSenere: [{
      landkode: 'SE',
      fom: dayjs().format(ISO_DATE_FORMAT),
      tom: dayjs().add(100, 'days').format(ISO_DATE_FORMAT)
    }],
    utenlandsoppholdTidligere: [{
      landkode: 'SE',
      fom: dayjs().subtract(10, 'months').format(ISO_DATE_FORMAT),
      tom: dayjs().subtract(1, 'days').format(ISO_DATE_FORMAT)
    }]
  }
}`,...L.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: true,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    frilans: {
      jobberFremdelesSomFrilans: true,
      oppstart: '2019-01-01'
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: {
      søker: defaultSøkerinfoMor.søker,
      arbeidsforhold: [{
        arbeidsgiverId: '1',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Auto Joachim Bilpleie',
        stillingsprosent: 80,
        fom: '2015-01-01'
      }, {
        arbeidsgiverId: '2',
        arbeidsgiverIdType: 'orgnr',
        arbeidsgiverNavn: 'Taco Express',
        stillingsprosent: 20,
        fom: '2019-01-01',
        tom: '2021-01-01'
      }]
    }
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    },
    egenNæring: {
      navnPåNæringen: 'Fiske',
      fom: '2018-01-01',
      tom: '2021-01-01',
      næringstype: 'FISKE',
      organisasjonsnummer: '123',
      næringsinntekt: 1000000,
      registrertINorge: true,
      harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
      hattVarigEndringAvNæringsinntektSiste4Kalenderår: true
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: true
    },
    egenNæring: {
      navnPåNæringen: 'Fiske',
      fom: '2018-01-01',
      tom: '2021-01-01',
      næringstype: 'FISKE',
      registrertILand: 'SE',
      registrertINorge: false,
      harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: false,
      hattVarigEndringAvNæringsinntektSiste4Kalenderår: false
    },
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    andreInntekter: [{
      type: AnnenInntektType.JOBB_I_UTLANDET,
      pågående: false,
      fom: '2018-01-01',
      tom: '2021-01-01',
      arbeidsgiverNavn: 'Statoil',
      land: 'SE'
    }, {
      type: AnnenInntektType.MILITÆRTJENESTE,
      pågående: true,
      fom: '2022-01-01'
    }, {
      type: AnnenInntektType.SLUTTPAKKE,
      fom: '2022-01-01',
      tom: '2023-01-01'
    }],
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...y.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: true,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    andreInntekter: [{
      type: AnnenInntektType.MILITÆRTJENESTE,
      pågående: false,
      fom: '2018-01-01',
      tom: '2021-01-01'
    }],
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: false
    },
    søkerInfo: defaultSøkerinfoMor
  }
}`,...U.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG]: [{
        ...FIL_INFO,
        filename: 'etterlønn.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG,
        dokumenterer: {
          type: AttachmentMetadataType.OPPTJENING,
          perioder: [{
            fom: '2024-01-01',
            tom: '2024-10-01'
          }]
        }
      }, {
        ...FIL_INFO,
        filename: 'etterlønn2.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG
      }],
      [Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE]: [{
        ...FIL_INFO,
        filename: 'siviltjeneste.pdf',
        type: AttachmentType.ANNEN_INNTEKT,
        skjemanummer: Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE,
        dokumenterer: {
          type: AttachmentMetadataType.OPPTJENING,
          perioder: [{
            fom: '2024-01-01',
            tom: '2024-10-01'
          }]
        }
      }],
      [Skjemanummer.OMSORGSOVERTAKELSE]: [{
        ...FIL_INFO,
        filename: 'omsorgsovertakelse.pdf',
        type: AttachmentType.OMSORGSOVERTAKELSE,
        skjemanummer: Skjemanummer.OMSORGSOVERTAKELSE
      }],
      [Skjemanummer.DOK_AV_ALENEOMSORG]: [{
        ...FIL_INFO,
        filename: 'aleneomsorg.pdf',
        type: AttachmentType.ALENEOMSORG,
        skjemanummer: Skjemanummer.DOK_AV_ALENEOMSORG
      }],
      [Skjemanummer.TERMINBEKREFTELSE]: [{
        ...FIL_INFO,
        filename: 'terminbekreftelse.pdf',
        type: AttachmentType.TERMINBEKREFTELSE,
        skjemanummer: Skjemanummer.TERMINBEKREFTELSE
      }],
      [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-deltakelse.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
      }],
      [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'kvalifiseringsprogram.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
      }],
      [Skjemanummer.DOK_INNLEGGELSE_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_MOR
      }],
      [Skjemanummer.DOK_INNLEGGELSE_BARN]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-barn.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_BARN
      }],
      [Skjemanummer.DOK_INNLEGGELSE_FAR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'innleggelse-far.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_INNLEGGELSE_FAR
      }],
      [Skjemanummer.DOK_SYKDOM_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'sykdom-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_SYKDOM_MOR
      }],
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR
      }],
      [Skjemanummer.DOK_UTDANNING_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_MOR
      }],
      [Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-og-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR
      }]
    }
  }
}`,...g.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    vedlegg: {
      ...(VisAlleVedlegg.args?.vedlegg ? Object.entries(VisAlleVedlegg.args.vedlegg).reduce((result, entry) => ({
        ...result,
        [entry[0]]: entry[1].map(value => ({
          ...value,
          innsendingsType: InnsendingsType.SEND_SENERE
        }))
      }), {}) : {})
    }
  }
}`,...j.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.AUTOMATISK
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...G.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.AUTOMATISK
      }],
      [Skjemanummer.DOK_UTDANNING_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-utdanning-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_UTDANNING_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...P.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: [{
        ...arbeidsforholdMorJobber80Prosent[0],
        stillingsprosent: 70
      }]
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(true), {
        status: 200
      }))]
    }
  }
}`,...J.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    søkersituasjon: {
      situasjon: 'fødsel',
      rolle: 'far'
    },
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    annenForelder: annenForelderKariNordmann,
    vedlegg: {
      ...defaultVedlegg,
      [Skjemanummer.DOK_ARBEID_MOR]: [{
        ...FIL_INFO_UTTAK_MED_PERIODE,
        filename: 'dok-arbeid-mor.pdf',
        type: AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        skjemanummer: Skjemanummer.DOK_ARBEID_MOR,
        innsendingsType: InnsendingsType.SEND_SENERE
      }]
    },
    arbeidsforholdOgInntekt: {
      harJobbetSomFrilans: false,
      harHattAndreInntektskilder: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    }
  },
  // Ny render-funksjon som overskriver uttaksplanen med samtidig uttak
  render: args => {
    const freshQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 0
        }
      }
    });

    // Ny uttaksplan med samtidig uttak
    const uttaksplanMedSamtidigUttak = [...defaultUttaksplan.slice(0, 3),
    // Behold de første periodene
    {
      id: '3',
      type: 'uttak',
      forelder: 'MOR',
      konto: 'FELLESPERIODE',
      tidsperiode: {
        fom: new Date('2022-03-29T23:00:00.000Z'),
        tom: new Date('2022-06-06T23:00:00.000Z')
      },
      ønskerSamtidigUttak: true,
      gradert: false
    } as Periode];
    return <QueryClientProvider client={freshQueryClient}>
                <MemoryRouter initialEntries={[SøknadRoutes.OPPSUMMERING]}>
                    <FpDataContext onDispatch={args.gåTilNesteSide} initialState={{
          [ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT]: args.arbeidsforholdOgInntekt,
          [ContextDataType.FRILANS]: args.frilans,
          [ContextDataType.EGEN_NÆRING]: args.egenNæring,
          [ContextDataType.ANDRE_INNTEKTSKILDER]: args.andreInntekter,
          [ContextDataType.ANNEN_FORELDER]: args.annenForelder,
          [ContextDataType.SØKERSITUASJON]: args.søkersituasjon,
          [ContextDataType.UTTAKSPLAN_METADATA]: {
            ønskerJustertUttakVedFødsel: false,
            harUttaksplanBlittSlettet: false,
            antallUkerIUttaksplan: 1
          },
          [ContextDataType.OM_BARNET]: args.barn || defaultBarn,
          [ContextDataType.UTENLANDSOPPHOLD]: args.utenlandsopphold || defaultUtenlandsopphold,
          [ContextDataType.UTENLANDSOPPHOLD_SENERE]: args.utenlandsoppholdSenere,
          [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: args.utenlandsoppholdTidligere,
          [ContextDataType.PERIODE_MED_FORELDREPENGER]: Dekningsgrad.HUNDRE_PROSENT,
          [ContextDataType.UTTAKSPLAN]: uttaksplanMedSamtidigUttak,
          // Bruk den nye uttaksplanen
          [ContextDataType.VEDLEGG]: args.vedlegg
        }}>
                        <OppsummeringSteg {...args} />
                    </FpDataContext>
                </MemoryRouter>
            </QueryClientProvider>;
  }
}`,...B.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    erEndringssøknad: true,
    annenForelder: {
      fornavn: 'Espen',
      etternavn: 'Utvikler',
      fnr: '1212121313',
      harRettPåForeldrepengerINorge: true,
      kanIkkeOppgis: false,
      erAleneOmOmsorg: false
    }
  }
}`,...V.parameters?.docs?.source}}};const je=["Default","MorMedAnnenForelderUgift","MorMedAleneOmsorg","FarMedAleneOmsorg","FarMedUførMorUgift","FarMedMorSomHarRettIEØS","FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS","FarMedMorSomHarRettINorge","FarMedMorSomHarVedtak","MorMedAdoptertBarn","MorMedUtenlandsopphold","MorMedArbeidsforholdOgAndreInntekter","MorMedSelvstendigNæringsdrivende","MorMedSelvstendigNæringsdrivendeUtenDiverse","MorMedAndreInntekterJobbIUtlandet","MorMedAndreInntekterMilitærtjeneste","VisAlleVedlegg","VisSendInnSenereVedlegg","FarSøkerMorMåIkkeDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","FarSøkerMorMåDokumentereArbeid","FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon","ErEndringssøknad"];export{r as Default,V as ErEndringssøknad,B as FarErSøkerMorSøkerSamtidigUttakIFellesperiodeKreverDokumentasjon,D as FarMedAleneOmsorg,F as FarMedMorSomHarOppholdsSegIEØSMenIkkeHarRettIEØS,M as FarMedMorSomHarRettIEØS,T as FarMedMorSomHarRettINorge,c as FarMedMorSomHarVedtak,R as FarMedUførMorUgift,J as FarSøkerMorMåDokumentereArbeid,G as FarSøkerMorMåIkkeDokumentereArbeid,P as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,K as MorMedAdoptertBarn,_ as MorMedAleneOmsorg,y as MorMedAndreInntekterJobbIUtlandet,U as MorMedAndreInntekterMilitærtjeneste,A as MorMedAnnenForelderUgift,h as MorMedArbeidsforholdOgAndreInntekter,b as MorMedSelvstendigNæringsdrivende,v as MorMedSelvstendigNæringsdrivendeUtenDiverse,L as MorMedUtenlandsopphold,g as VisAlleVedlegg,j as VisSendInnSenereVedlegg,je as __namedExportsOrder,Ue as default};
