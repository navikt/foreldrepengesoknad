import{bo as B,bp as o,w as t,E as d,R as a,M as m,H as e,I as L,X as h}from"./iframe-CboCO6zW.js";import{h as l,A as y,e as f}from"./index-Cvuxe_9U.js";import{F as J,C as s}from"./FpDataContext-BKdHmyPt.js";import{A as D,M as K,S as _}from"./useFpNavigator-2qypq6-Z.js";import{a as H}from"./uttaksplanInfoUtils-BH180WuS.js";import{M as v}from"./ManglendeVedlegg-Fr4JlccS.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-DhwKxw4-.js";import"./eksisterendeSakUtils-DdU2ww8D.js";import"./List-B3t_PXCw.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,r=()=>()=>(n("button-click")(),Promise.resolve()),S={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},T={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1,fnr:"21091981144"},x={antallBarn:1,type:o.FØDT,fødselsdatoer:["2024-01-01"]},G={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},A={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:H.GIFT}},arbeidsforhold:[]},ne={title:"steps/ManglendeVedlegg",component:v,decorators:[B],parameters:{msw:{handlers:[l.post(y.sendVedlegg,()=>new f("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({rolle:E="mor",situasjon:O="fødsel",uttaksplan:F=[],annenForelder:U=T,barn:N=x,arbeidsforholdOgInntekt:P=G,annenInntekt:j,gåTilNesteSide:w=n("button-click"),...R})=>h.jsx(K,{initialEntries:[_.DOKUMENTASJON],children:h.jsx(J,{onDispatch:w,initialState:{[s.UTTAKSPLAN]:F,[s.ANNEN_FORELDER]:U,[s.OM_BARNET]:N,[s.ARBEIDSFORHOLD_OG_INNTEKT]:P,[s.ANDRE_INNTEKTSKILDER]:j,[s.SØKERSITUASJON]:{rolle:E,situasjon:O}},children:h.jsx(v,{...R})})})},I=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,fom:e().subtract(5,"year").format("YYYY-MM-DD")}],i={args:{søkerInfo:S,barn:{antallBarn:1,type:o.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},k={args:{...i.args,situasjon:"adopsjon",barn:{antallBarn:1,type:o.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},p={args:{søkerInfo:S,annenForelder:{...T,erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},g={args:{søkerInfo:S,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:D.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:D.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},b={args:{søkerInfo:S,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:D.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:D.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},u={args:{søkerInfo:{...A,arbeidsforhold:I},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post(y.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!1),{status:200}))]}}},c={args:{søkerInfo:{...A,arbeidsforhold:[{...I[0],stillingsprosent:70}]},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post(y.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!0),{status:200}))]}}},M={args:{søkerInfo:A,rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.mor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:m.Utdanning,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[l.post("/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid",async()=>f.json(!0))]}}},Y={args:{søkerInfo:{...A},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:d.Foreldrepenger,tidsperiode:{fom:new Date("2025-01-01"),tom:new Date("2025-02-01")},type:t.Uttak,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,tidsperiode:{fom:new Date("2026-01-01"),tom:new Date("2026-02-01")},type:t.Utsettelse,årsak:L.Fri,morsAktivitetIPerioden:m.Arbeid,erArbeidstaker:!1}]},parameters:{msw:{handlers:[l.post(y.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!1),{status:200}))]}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
      handlers: [http.post(API_URLS.trengerDokumentereMorsArbeid, () => new HttpResponse(JSON.stringify(false), {
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
      handlers: [http.post(API_URLS.trengerDokumentereMorsArbeid, () => new HttpResponse(JSON.stringify(true), {
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
      handlers: [http.post(API_URLS.trengerDokumentereMorsArbeid, () => new HttpResponse(JSON.stringify(false), {
        status: 200
      }))]
    }
  }
}`,...Y.parameters?.docs?.source}}};const re=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn","FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid","FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid"];export{p as Aleneomsorgdokumentasjon,Y as BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,u as FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,c as FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,M as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,b as HarAndreInntektskilderEtterlønn,g as HarAndreInntektskilderMilitærtjeneste,k as Omsorgsovertakelsedokumentasjon,i as Termindatodokumentasjon,re as __namedExportsOrder,ne as default};
