import{br as j,bs as o,D as t,a2 as a,Q as i,U as e,X as w,l as A}from"./iframe-4HFBgzxV.js";import{h as m,A as l,f}from"./index-rc0hNCuO.js";import{F as B,C as s}from"./FpDataContext-CbldPYvw.js";import{A as c,M as J,S as K}from"./useFpNavigator-fpi3royj.js";import{a as _}from"./uttaksplanInfoUtils-DmaNmK1p.js";import{M as E}from"./ManglendeVedlegg-f08Erddk.js";import"./preload-helper-D9Z9MdNV.js";import"./annenForelderUtils-VO-CbzCv.js";import"./eksisterendeSakUtils-DicB8I8f.js";import"./List-Dw-5xUEV.js";const{action:n}=__STORYBOOK_MODULE_ACTIONS__,r=()=>()=>(n("button-click")(),Promise.resolve()),S={person:{fnr:"19047815714",navn:{fornavn:"TALENTFULL",etternavn:"MYGG"},kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"SNILT",etternavn:"MIDTPUNKT"},kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"LYST",etternavn:"MIDTPUNKT"},kjønn:"M"}]},arbeidsforhold:[]},h={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1,fnr:"21091981144"},H={antallBarn:1,type:o.FØDT,fødselsdatoer:["2024-01-01"]},G={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},y={person:{fnr:"08099017784",navn:{fornavn:"FAR",etternavn:"MYGG"},kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenPart:{fnr:"12038517080",fødselsdato:"1985-03-12",navn:{fornavn:"LEALAUS",etternavn:"BÆREPOSE"}},navn:{fornavn:"KLØKTIG",etternavn:"MIDTPUNKT"},kjønn:"K"}],sivilstand:{type:_.GIFT}},arbeidsforhold:[]},ee={title:"steps/ManglendeVedlegg",component:E,decorators:[j],parameters:{msw:{handlers:[m.post(l.sendVedlegg,()=>new f(JSON.stringify("uuid-test"),{status:200}))]}},render:({rolle:I="mor",situasjon:O="fødsel",uttaksplan:T=[],annenForelder:F=h,barn:P=H,arbeidsforholdOgInntekt:U=G,annenInntekt:N,gåTilNesteSide:R=n("button-click"),...L})=>A.jsx(J,{initialEntries:[K.DOKUMENTASJON],children:A.jsx(B,{onDispatch:R,initialState:{[s.UTTAKSPLAN]:T,[s.ANNEN_FORELDER]:F,[s.OM_BARNET]:P,[s.ARBEIDSFORHOLD_OG_INNTEKT]:U,[s.ANDRE_INNTEKTSKILDER]:N,[s.SØKERSITUASJON]:{rolle:I,situasjon:O}},children:A.jsx(E,{...L})})})},v=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,from:e().subtract(5,"year").format("YYYY-MM-DD")}],d={args:{søkerInfo:S,barn:{antallBarn:1,type:o.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},k={args:{...d.args,situasjon:"adopsjon",barn:{antallBarn:1,type:o.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},g={args:{søkerInfo:S,annenForelder:{...h,erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},p={args:{søkerInfo:S,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:c.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:c.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},b={args:{søkerInfo:S,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:c.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:c.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},D={args:{søkerInfo:{...y,arbeidsforhold:v},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:"FEDREKVOTE",tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:i.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[m.post(l.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!1),{status:200}))]}}},u={args:{søkerInfo:{...y,arbeidsforhold:[{...v[0],stillingsprosent:70}]},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:a.farMedmor,konto:"FEDREKVOTE",tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:t.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:i.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[m.post(l.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!0),{status:200}))]}}},M={args:{søkerInfo:y,rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.mor,konto:"FELLESPERIODE",tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:t.Uttak,morsAktivitetIPerioden:i.Utdanning,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[m.post(l.trengerDokumentereMorsArbeid,async()=>f.json(!0))]}}},Y={args:{søkerInfo:{...y},rolle:"far",barn:{antallBarn:1,type:o.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,konto:"FORELDREPENGER",tidsperiode:{fom:new Date("2025-01-01"),tom:new Date("2025-02-01")},type:t.Uttak,morsAktivitetIPerioden:i.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1},{id:"0700701673-1838-30857-30810-219862607326",forelder:a.farMedmor,tidsperiode:{fom:new Date("2026-01-01"),tom:new Date("2026-02-01")},type:t.Utsettelse,årsak:w.Fri,morsAktivitetIPerioden:i.Arbeid,erArbeidstaker:!1}]},parameters:{msw:{handlers:[m.post(l.trengerDokumentereMorsArbeid,()=>new f(JSON.stringify(!1),{status:200}))]}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
      morsAktivitetIPerioden: MorsAktivitet.Utdanning,
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
      konto: 'FORELDREPENGER',
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
}`,...Y.parameters?.docs?.source}}};const ne=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn","FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid","FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning","BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid"];export{g as Aleneomsorgdokumentasjon,Y as BareFarHarRettSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,D as FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,u as FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,M as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,b as HarAndreInntektskilderEtterlønn,p as HarAndreInntektskilderMilitærtjeneste,k as Omsorgsovertakelsedokumentasjon,d as Termindatodokumentasjon,ne as __namedExportsOrder,ee as default};
