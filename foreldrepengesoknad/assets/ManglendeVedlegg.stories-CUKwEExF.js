import{bp as B,bq as o,y as t,G as d,V as a,M as m,J as e,K as R,_ as A}from"./iframe-Cixqbhkb.js";import{F as J,C as s}from"./FpDataContext-D0KztiVe.js";import{A as D,M as L,S as K}from"./useFpNavigator-DjCOzCJK.js";import{h as l,H as f}from"./index-X5Lkj7l5.js";import{a as _}from"./uttaksplanInfoUtils-BH180WuS.js";import{M as h}from"./ManglendeVedlegg-DK_oiyic.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-EtlPmC7y.js";import"./guid-CsArkN6i.js";import"./api-BfN1mhhT.js";import"./List-DuXmi8JJ.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,r=()=>()=>(n("button-click")(),Promise.resolve()),y={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},v={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1,fnr:"21091981144"},H={antallBarn:1,type:o.FØDT,fødselsdatoer:["2024-01-01"]},x={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},S={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:_.GIFT}},arbeidsforhold:[]},ne={title:"steps/ManglendeVedlegg",component:h,decorators:[B],parameters:{msw:{handlers:[l.post(".//rest/storage/foreldrepenger/vedlegg",()=>new f("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({rolle:I="mor",situasjon:E="fødsel",uttaksplan:O=[],annenForelder:F=v,barn:U=H,arbeidsforholdOgInntekt:N=x,annenInntekt:P,gåTilNesteSide:j=n("button-click"),...w})=>A.jsx(L,{initialEntries:[K.DOKUMENTASJON],children:A.jsx(J,{onDispatch:j,initialState:{[s.UTTAKSPLAN]:O,[s.ANNEN_FORELDER]:F,[s.OM_BARNET]:U,[s.ARBEIDSFORHOLD_OG_INNTEKT]:N,[s.ANDRE_INNTEKTSKILDER]:P,[s.SØKERSITUASJON]:{rolle:I,situasjon:E}},children:A.jsx(h,{...w})})})},T=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,fom:e().subtract(5,"year").format("YYYY-MM-DD")}],i={args:{søkerInfo:y,barn:{antallBarn:1,type:o.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},k={args:{...i.args,situasjon:"adopsjon",barn:{antallBarn:1,type:o.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},p={args:{søkerInfo:y,annenForelder:{...v,erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},g={args:{søkerInfo:y,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:D.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:D.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},b={args:{søkerInfo:y,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:D.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:D.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},u={args:{søkerInfo:{...S,arbeidsforhold:T},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new f(JSON.stringify(!1),{status:200}))]}}},c={args:{søkerInfo:{...S,arbeidsforhold:[{...T[0],stillingsprosent:70}]},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new f(JSON.stringify(!0),{status:200}))]}}},M={args:{søkerInfo:S,rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.mor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Utdanning,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post("/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid",async()=>f.json(!0))]}}},Y={args:{søkerInfo:{...S},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Foreldrepenger,tidsperiode:{fom:new Date("2025-01-01"),tom:new Date("2025-02-01")},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,tidsperiode:{fom:new Date("2026-01-01"),tom:new Date("2026-02-01")},type:t.Utsettelse,årsak:R.Fri,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1}]},parameters:{msw:{handlers:[l.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new f(JSON.stringify(!1),{status:200}))]}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    barn: {
      antallBarn: 1,
      type: BarnType.UFØDT,
      termindato: '2024-01-01'
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...i.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...Termindatodokumentasjon.args,
    situasjon: 'adopsjon',
    barn: {
      antallBarn: 1,
      type: BarnType.ADOPTERT_ANNET_BARN,
      adopsjonsdato: '2023-01-01',
      adoptertIUtlandet: false,
      fødselsdatoer: ['2022-01-01']
    }
  }
}`,...k.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    annenForelder: {
      ...defaultAnnenForelder,
      erAleneOmOmsorg: true,
      datoForAleneomsorg: '2024-01-01'
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    arbeidsforholdOgInntekt: {
      harHattAndreInntektskilder: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    annenInntekt: [{
      fom: '2024-01-01',
      tom: '2024-04-01',
      pågående: false,
      type: AnnenInntektType.MILITÆRTJENESTE
    }, {
      fom: '2024-05-01',
      pågående: true,
      type: AnnenInntektType.MILITÆRTJENESTE
    }],
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...g.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfo,
    arbeidsforholdOgInntekt: {
      harHattAndreInntektskilder: true,
      harJobbetSomFrilans: false,
      harJobbetSomSelvstendigNæringsdrivende: false
    },
    annenInntekt: [{
      fom: '2024-01-01',
      tom: '2024-04-01',
      type: AnnenInntektType.SLUTTPAKKE
    }, {
      fom: '2024-05-01',
      tom: '2024-07-01',
      type: AnnenInntektType.SLUTTPAKKE
    }],
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click')
  }
}`,...b.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: arbeidsforholdMorJobber80Prosent
    },
    rolle: 'far',
    barn: {
      antallBarn: 1,
      type: BarnType.FØDT,
      termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
      fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')]
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    uttaksplan: [{
      id: '08499121-6620-16419-3321-0027063089154',
      forelder: Forelder.farMedmor,
      konto: StønadskontoType.Fedrekvote,
      tidsperiode: {
        fom: new Date(dayjs().add(10, 'month').startOf('month').add(3, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(10, 'month').startOf('month').add(16, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: true,
      samtidigUttakProsent: '100'
    }, {
      id: '0700701673-1838-30857-30810-219862607326',
      forelder: Forelder.farMedmor,
      konto: StønadskontoType.Fellesperiode,
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: MorsAktivitet.Arbeid,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: false
    }]
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: {
      ...defaultSøkerinfoFar,
      arbeidsforhold: [{
        ...arbeidsforholdMorJobber80Prosent[0],
        stillingsprosent: 70
      }]
    },
    rolle: 'far',
    barn: {
      antallBarn: 1,
      type: BarnType.FØDT,
      termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
      fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')]
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    uttaksplan: [{
      id: '08499121-6620-16419-3321-0027063089154',
      forelder: Forelder.farMedmor,
      konto: StønadskontoType.Fedrekvote,
      tidsperiode: {
        fom: new Date(dayjs().add(10, 'month').startOf('month').add(3, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(10, 'month').startOf('month').add(16, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: true,
      samtidigUttakProsent: '100'
    }, {
      id: '0700701673-1838-30857-30810-219862607326',
      forelder: Forelder.farMedmor,
      konto: StønadskontoType.Fellesperiode,
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: MorsAktivitet.Arbeid,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: false
    }]
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(true), {
        status: 200
      }))]
    }
  }
}`,...c.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: defaultSøkerinfoFar,
    rolle: 'far',
    barn: {
      antallBarn: 1,
      type: BarnType.FØDT,
      termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
      fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')]
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    uttaksplan: [{
      id: '0700701673-1838-30857-30810-219862607326',
      forelder: Forelder.mor,
      konto: StønadskontoType.Fellesperiode,
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: MorsAktivitet.Utdanning,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: false
    }]
  },
  parameters: {
    msw: {
      handlers: [http.post('/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid', async () => {
        return HttpResponse.json(true);
      })]
    }
  }
}`,...M.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    søkerInfo: {
      ...defaultSøkerinfoFar
    },
    rolle: 'far',
    barn: {
      antallBarn: 1,
      type: BarnType.FØDT,
      termindato: dayjs().subtract(4, 'month').format('YYYY-MM-DD'),
      fødselsdatoer: [dayjs().subtract(4, 'month').format('YYYY-MM-DD')]
    },
    erEndringssøknad: false,
    mellomlagreSøknadOgNaviger: promiseAction(),
    avbrytSøknad: action('button-click'),
    uttaksplan: [{
      id: '0700701673-1838-30857-30810-219862607326',
      forelder: Forelder.farMedmor,
      konto: StønadskontoType.Foreldrepenger,
      tidsperiode: {
        fom: new Date('2025-01-01'),
        tom: new Date('2025-02-01')
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: MorsAktivitet.Arbeid,
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: false
    }, {
      id: '0700701673-1838-30857-30810-219862607326',
      forelder: Forelder.farMedmor,
      tidsperiode: {
        fom: new Date('2026-01-01'),
        tom: new Date('2026-02-01')
      },
      type: Periodetype.Utsettelse,
      årsak: UtsettelseÅrsakType.Fri,
      morsAktivitetIPerioden: MorsAktivitet.Arbeid,
      erArbeidstaker: false
    }]
  },
  parameters: {
    msw: {
      handlers: [http.post(\`\${import.meta.env.BASE_URL}/rest/innsyn/v2/trengerDokumentereMorsArbeid\`, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...Y.parameters?.docs?.source}}};const re=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn","FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid","FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid"];export{p as Aleneomsorgdokumentasjon,Y as BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,u as FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,c as FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,M as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,b as HarAndreInntektskilderEtterlønn,g as HarAndreInntektskilderMilitærtjeneste,k as Omsorgsovertakelsedokumentasjon,i as Termindatodokumentasjon,re as __namedExportsOrder,ne as default};
