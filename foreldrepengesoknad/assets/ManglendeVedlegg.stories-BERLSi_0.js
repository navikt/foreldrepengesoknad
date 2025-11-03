import{bp as L,bq as o,D as t,a0 as a,T as e,l as y}from"./iframe-hOMa-Szo.js";import{h as i,A as m,f as l}from"./index-9U-wyDcV.js";import{F as j,C as s}from"./FpDataContext-Cyi0ozr_.js";import{A as c,M as w,S as B}from"./useFpNavigator-D2u8cPXy.js";import{a as J}from"./uttaksplanInfoUtils-DmaNmK1p.js";import{M as E}from"./ManglendeVedlegg-CI-yE9hh.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-5_i--nRo.js";import"./eksisterendeSakUtils-gKIlp6NO.js";import"./List-zSkvJUW7.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,r=()=>()=>(n("button-click")(),Promise.resolve()),M={person:{fnr:"19047815714",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"},kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"SNILT",etternavn:"MIDTPUNKT"},kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"LYST",etternavn:"MIDTPUNKT"},kjønn:"M"}]},arbeidsforhold:[]},A={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1,fnr:"21091981144"},K={antallBarn:1,type:o.FØDT,fødselsdatoer:["2024-01-01"]},_={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},S={person:{fnr:"08099017784",navn:{fornavn:"FAR",etternavn:"MYGG"},kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"K"}],sivilstand:{type:J.GIFT}},arbeidsforhold:[]},Z={title:"steps/ManglendeVedlegg",component:E,decorators:[L],parameters:{msw:{handlers:[i.post(m.sendVedlegg,()=>new l(JSON.stringify("uuid-test"),{status:200}))]}},render:({rolle:h="mor",situasjon:v="fødsel",uttaksplan:T=[],annenForelder:O=A,barn:N=K,arbeidsforholdOgInntekt:F=_,annenInntekt:P,gåTilNesteSide:R=n("button-click"),...U})=>y.jsx(w,{initialEntries:[B.DOKUMENTASJON],children:y.jsx(j,{onDispatch:R,initialState:{[s.UTTAKSPLAN]:T,[s.ANNEN_FORELDER]:O,[s.OM_BARNET]:N,[s.ARBEIDSFORHOLD_OG_INNTEKT]:F,[s.ANDRE_INNTEKTSKILDER]:P,[s.SØKERSITUASJON]:{rolle:h,situasjon:v}},children:y.jsx(E,{...U})})})},I=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,from:e().subtract(5,"year").format("YYYY-MM-DD")}],d={args:{søkerInfo:M,barn:{antallBarn:1,type:o.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},f={args:{...d.args,situasjon:"adopsjon",barn:{antallBarn:1,type:o.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},k={args:{søkerInfo:M,annenForelder:{...A,erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},p={args:{søkerInfo:M,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:c.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:c.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},g={args:{søkerInfo:M,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:c.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:c.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},D={args:{søkerInfo:{...S,arbeidsforhold:I},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:"FEDREKVOTE",tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:"ARBEID",erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[i.post(m.trengerDokumentereMorsArbeid,()=>new l(JSON.stringify(!1),{status:200}))]}}},u={args:{søkerInfo:{...S,arbeidsforhold:[{...I[0],stillingsprosent:70}]},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:"FEDREKVOTE",tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:"ARBEID",erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[i.post(m.trengerDokumentereMorsArbeid,()=>new l(JSON.stringify(!0),{status:200}))]}}},b={args:{søkerInfo:S,rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.mor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:"UTDANNING",erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[i.post(m.trengerDokumentereMorsArbeid,async()=>l.json(!0))]}}},Y={args:{søkerInfo:{...S},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FORELDREPENGER",tidsperiode:{fom:new Date("2025-01-01"),tom:new Date("2025-02-01")},type:t.Uttak,morsAktivitetIPerioden:"ARBEID",erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,tidsperiode:{fom:new Date("2026-01-01"),tom:new Date("2026-02-01")},type:t.Utsettelse,årsak:"FRI",morsAktivitetIPerioden:"ARBEID",erArbeidstaker:!1}]},parameters:{msw:{handlers:[i.post(m.trengerDokumentereMorsArbeid,()=>new l(JSON.stringify(!1),{status:200}))]}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
      konto: 'FEDREKVOTE',
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
      konto: 'FELLESPERIODE',
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: 'ARBEID',
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
}`,...D.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
      konto: 'FEDREKVOTE',
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
      konto: 'FELLESPERIODE',
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: 'ARBEID',
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
}`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
      konto: 'FELLESPERIODE',
      tidsperiode: {
        fom: new Date(dayjs().add(11, 'month').startOf('month').add(17, 'day').format('YYYY-MM-DD')),
        tom: new Date(dayjs().add(11, 'month').startOf('month').add(24, 'day').format('YYYY-MM-DD'))
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: 'UTDANNING',
      erArbeidstaker: false,
      gradert: false,
      orgnumre: [],
      ønskerSamtidigUttak: false
    }]
  },
  parameters: {
    msw: {
      handlers: [http.post(API_URLS.trengerDokumentereMorsArbeid, async () => {
        return HttpResponse.json(true);
      })]
    }
  }
}`,...b.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
      konto: 'FORELDREPENGER',
      tidsperiode: {
        fom: new Date('2025-01-01'),
        tom: new Date('2025-02-01')
      },
      type: Periodetype.Uttak,
      morsAktivitetIPerioden: 'ARBEID',
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
      årsak: 'FRI',
      morsAktivitetIPerioden: 'ARBEID',
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
}`,...Y.parameters?.docs?.source}}};const $=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn","FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid","FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid"];export{k as Aleneomsorgdokumentasjon,Y as BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,D as FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,u as FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,b as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,g as HarAndreInntektskilderEtterlønn,p as HarAndreInntektskilderMilitærtjeneste,f as Omsorgsovertakelsedokumentasjon,d as Termindatodokumentasjon,$ as __namedExportsOrder,Z as default};
