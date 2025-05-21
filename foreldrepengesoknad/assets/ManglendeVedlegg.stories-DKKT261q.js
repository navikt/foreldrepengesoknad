import{j as y}from"./jsx-runtime-D_zvdyIk.js";import{a as n}from"./index-B-lxVbXh.js";import{F as oe,C as t}from"./FpDataContext-DSKr2VRc.js";import{M as se,S as de}from"./useFpNavigator-BnlDLriX.js";import{d as e}from"./dates-iBrNYYBq.js";import{h as Y,H as b}from"./index-D5WPyhm7.js";import{A as c}from"./AnnenInntekt-D0302_mv.js";import{B as a,P as s,e as d,F as i,M as S}from"./Uttaksplan-BJJ5Ss52.js";import{S as ie}from"./uttaksplanInfoUtils-CCVu_kKO.js";import{w as me}from"./withQueryClient-BSpHrL6p.js";import{M as h}from"./ManglendeVedlegg-xVjDDldU.js";import"./v4-CtRu48qb.js";import"./index-75N07mRN.js";import"./index-BLIM7tmH.js";import"./decorators-Bnaor6Ku.js";import"./iframe-Crsw8VMo.js";import"./VStack-DI-xS76s.js";import"./index-M7yiXcen.js";import"./index-Bj-N6E0A.js";import"./QueryClientProvider-oIIDkkVB.js";import"./index-CQXckJez.js";import"./ErrorSummaryHookForm-B7RXpI_J.js";import"./barnUtils-BT_1InOL.js";import"./guid-CsArkN6i.js";import"./api-MhUetn1V.js";import"./List-3qyHoZMF.js";const r=()=>(...D)=>(n("button-click")(...D),Promise.resolve()),M={søker:{fnr:"19047815714",fornavn:"TALENTFULL",etternavn:"MYGG",kjønn:"K",fødselsdato:"1978-04-19",barn:[{fnr:"21091981146",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981146",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"SNILT",etternavn:"MIDTPUNKT",kjønn:"M"},{fnr:"31091981147",fødselsdato:"2022-08-02",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"LYST",etternavn:"MIDTPUNKT",kjønn:"M"}]},arbeidsforhold:[]},q={fornavn:"Eline",etternavn:"Hagen",kanIkkeOppgis:!1,fnr:"21091981144"},le={antallBarn:1,type:a.FØDT,fødselsdatoer:["2024-01-01"]},fe={harHattAndreInntektskilder:!1,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},A={søker:{fnr:"08099017784",fornavn:"FAR",etternavn:"MYGG",kjønn:"M",fødselsdato:"1978-04-19",barn:[{fnr:"19047815714",fødselsdato:"2021-03-15",annenForelder:{fnr:"12038517080",fødselsdato:"1985-03-12",fornavn:"LEALAUS",etternavn:"BÆREPOSE"},fornavn:"KLØKTIG",etternavn:"MIDTPUNKT",kjønn:"K"}],sivilstand:{type:ie.GIFT}},arbeidsforhold:[]},Le={title:"steps/ManglendeVedlegg",component:h,decorators:[me],parameters:{msw:{handlers:[Y.post(".//rest/storage/foreldrepenger/vedlegg",()=>new b("uuid-test",{status:200,headers:{location:"test.com"}}))]}},render:({rolle:D="mor",situasjon:W="fødsel",uttaksplan:X=[],annenForelder:Z=q,barn:ee=le,arbeidsforholdOgInntekt:ne=fe,annenInntekt:re,gåTilNesteSide:te=n("button-click"),...ae})=>y.jsx(se,{initialEntries:[de.DOKUMENTASJON],children:y.jsx(oe,{onDispatch:te,initialState:{[t.UTTAKSPLAN]:X,[t.ANNEN_FORELDER]:Z,[t.OM_BARNET]:ee,[t.ARBEIDSFORHOLD_OG_INNTEKT]:ne,[t.ANDRE_INNTEKTSKILDER]:re,[t.SØKERSITUASJON]:{rolle:D,situasjon:W}},children:y.jsx(h,{...ae})})})},z=[{arbeidsgiverId:"1",arbeidsgiverIdType:"orgnr",arbeidsgiverNavn:"Mors Arbeidsplass AS",stillingsprosent:80,fom:e().subtract(5,"year").format("YYYY-MM-DD")}],o={args:{søkerInfo:M,barn:{antallBarn:1,type:a.UFØDT,termindato:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},m={args:{...o.args,situasjon:"adopsjon",barn:{antallBarn:1,type:a.ADOPTERT_ANNET_BARN,adopsjonsdato:"2023-01-01",adoptertIUtlandet:!1,fødselsdatoer:["2022-01-01"]}}},l={args:{søkerInfo:M,annenForelder:{...q,erAleneOmOmsorg:!0,datoForAleneomsorg:"2024-01-01"},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},f={args:{søkerInfo:M,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",pågående:!1,type:c.MILITÆRTJENESTE},{fom:"2024-05-01",pågående:!0,type:c.MILITÆRTJENESTE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},k={args:{søkerInfo:M,arbeidsforholdOgInntekt:{harHattAndreInntektskilder:!0,harJobbetSomFrilans:!1,harJobbetSomSelvstendigNæringsdrivende:!1},annenInntekt:[{fom:"2024-01-01",tom:"2024-04-01",type:c.SLUTTPAKKE},{fom:"2024-05-01",tom:"2024-07-01",type:c.SLUTTPAKKE}],erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click")}},p={args:{søkerInfo:{...A,arbeidsforhold:z},rolle:"far",barn:{antallBarn:1,type:a.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:i.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:s.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:i.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:s.Uttak,morsAktivitetIPerioden:S.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[Y.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new b(JSON.stringify(!1),{status:200}))]}}},g={args:{søkerInfo:{...A,arbeidsforhold:[{...z[0],stillingsprosent:70}]},rolle:"far",barn:{antallBarn:1,type:a.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"08499121-6620-16419-3321-0027063089154",forelder:i.farMedmor,konto:d.Fedrekvote,tidsperiode:{fom:new Date(e().add(10,"month").startOf("month").add(3,"day").format("YYYY-MM-DD")),tom:new Date(e().add(10,"month").startOf("month").add(16,"day").format("YYYY-MM-DD"))},type:s.Uttak,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!0,samtidigUttakProsent:"100"},{id:"0700701673-1838-30857-30810-219862607326",forelder:i.farMedmor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:s.Uttak,morsAktivitetIPerioden:S.Arbeid,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[Y.post(".//rest/innsyn/v2/trengerDokumentereMorsArbeid",()=>new b(JSON.stringify(!0),{status:200}))]}}},u={args:{søkerInfo:A,rolle:"far",barn:{antallBarn:1,type:a.FØDT,termindato:e().subtract(4,"month").format("YYYY-MM-DD"),fødselsdatoer:[e().subtract(4,"month").format("YYYY-MM-DD")]},erEndringssøknad:!1,mellomlagreSøknadOgNaviger:r(),avbrytSøknad:n("button-click"),uttaksplan:[{id:"0700701673-1838-30857-30810-219862607326",forelder:i.mor,konto:d.Fellesperiode,tidsperiode:{fom:new Date(e().add(11,"month").startOf("month").add(17,"day").format("YYYY-MM-DD")),tom:new Date(e().add(11,"month").startOf("month").add(24,"day").format("YYYY-MM-DD"))},type:s.Uttak,morsAktivitetIPerioden:S.Utdanning,erArbeidstaker:!1,gradert:!1,orgnumre:[],ønskerSamtidigUttak:!1}]},parameters:{msw:{handlers:[Y.post("/foreldrepenger/soknad/rest/innsyn/v2/trengerDokumentereMorsArbeid",async()=>b.json(!0))]}}};var v,T,I;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(I=(T=o.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var E,O,F;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(F=(O=m.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var N,U,j;l.parameters={...l.parameters,docs:{...(N=l.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(j=(U=l.parameters)==null?void 0:U.docs)==null?void 0:j.source}}};var P,w,R;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(R=(w=f.parameters)==null?void 0:w.docs)==null?void 0:R.source}}};var B,L,J;k.parameters={...k.parameters,docs:{...(B=k.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(J=(L=k.parameters)==null?void 0:L.docs)==null?void 0:J.source}}};var K,H,_;p.parameters={...p.parameters,docs:{...(K=p.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(_=(H=p.parameters)==null?void 0:H.docs)==null?void 0:_.source}}};var x,G,$;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...($=(G=g.parameters)==null?void 0:G.docs)==null?void 0:$.source}}};var C,V,Q;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(Q=(V=u.parameters)==null?void 0:V.docs)==null?void 0:Q.source}}};const Je=["Termindatodokumentasjon","Omsorgsovertakelsedokumentasjon","Aleneomsorgdokumentasjon","HarAndreInntektskilderMilitærtjeneste","HarAndreInntektskilderEtterlønn","FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid","FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid","FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning"];export{l as Aleneomsorgdokumentasjon,p as FarSøkerMorJobberMerEnn75ProsentMåIkkeDokumentereArbeid,g as FarSøkerMorJobberMindreEnn75ProsentMåDokumentereArbeid,u as FarSøkerMorMåIkkeDokumentereArbeidMåDokumenterUtdanning,k as HarAndreInntektskilderEtterlønn,f as HarAndreInntektskilderMilitærtjeneste,m as Omsorgsovertakelsedokumentasjon,o as Termindatodokumentasjon,Je as __namedExportsOrder,Le as default};
