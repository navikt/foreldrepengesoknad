import{j as E}from"./jsx-runtime-CLpGMVip.js";import{M as ue,P as Re,C as o}from"./usePlanleggerNavigator-CAGw89QL.js";import{P as ve}from"./routes-Cyl7_Mgv.js";import{A as n}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as r}from"./HvemPlanleggerUtils-DPo5gGnH.js";import{S as e}from"./KvoteOppsummering-CvXitX17.js";import"./VeiviserPage-CDSK3RL6.js";import{O as P}from"./OppsummeringSteg-CpKk3-s0.js";import"./index-CR__hKHy.js";import"./barnetUtils-Bsg9MP1N.js";import"./barnType-CnRI8jWg.js";import"./stringUtils-DApHD7Y2.js";import"./StepButtonsHookForm-DPDTFQLl.js";import"./VStack-2apmvZh_.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./dateFormValidation-ZqQr7vQr.js";import"./validation-DYlyn1BB.js";import"./Briefcase-Dm7XPCF2.js";import"./ExpansionCard-D8OjtebB.js";import"./Checkmark-DkUBrDzq.js";import"./Exclamationmark-BUUUNLix.js";import"./hvemHarRettUtils-BiLrxKWv.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./ShareDataInfobox-Cj4T_Mkp.js";import"./amplitude-BZcVzq_V.js";import"./TasklistStart-BD91qhzY.js";import"./BarnehageplassSteg-DpXkOHBT.js";import"./PlanleggerStepPage-BiQLK47S.js";import"./uttakUtils-DYcRAthU.js";import"./BabyWrapped-DCZKpL80.js";import"./Information-QBdnpqYL.js";import"./amplitudeUtils-1CrV70-o.js";import"./satserUtils-CE-H0avb.js";import"./CalendarLabels-Cz5EFzc5.js";import"./CalendarIconLabel-Q5I-hpXo.js";import"./FamiliehendelseLabel-82K1TAmC.js";import"./UttaksplanKalender-6hGXEEd6.js";import"./iframe-D1bj2TJx.js";import"./Wallet-CEpMmkt_.js";const d={farRundtFødsel:10,toTette:0},t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},sn={title:"steg/OppsummeringSteg",component:P,render:({hvemPlanlegger:se,fordeling:de,hvorLangPeriode:le,omBarnet:ie,arbeidssituasjon:ge,stønadskontoer:ke,satser:Fe,locale:pe,hvorMye:me})=>E.jsx(ue,{initialEntries:[ve.OPPSUMMERING],children:E.jsx(Re,{initialState:{[o.HVEM_PLANLEGGER]:se,[o.FORDELING]:de,[o.HVOR_LANG_PERIODE]:le,[o.OM_BARNET]:ie,[o.ARBEIDSSITUASJON]:ge,[o.HVOR_MYE]:me},children:E.jsx(P,{stønadskontoer:ke,satser:Fe,locale:pe})})})},s={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:5e4,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2025-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},l={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:d}}}},i={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-11-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}};var T;const g={args:{locale:"nb",satser:t,hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:(T=l.args)==null?void 0:T.stønadskontoer}};var A;const k={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!1,fødselsdato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(A=s.args)==null?void 0:A.stønadskontoer}},F={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:7e4},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-15"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:397},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:315},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:d}}}},p={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:d}}}};var c;const m={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(c=s.args)==null?void 0:c.stønadskontoer}},u={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},R={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-12-01",fødselsdato:"2024-12-01",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},v={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR}}},S={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}};var f,B,_;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 50000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2025-07-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 75
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 80
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 101
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(_=(B=s.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};var b,O,M;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-07-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 150
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    }
  }
}`,...(M=(O=l.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};var U,y,D;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: undefined,
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-11-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 125
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 166
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(D=(y=i.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var h,N,j;g.parameters={...g.parameters,docs:{...(h=g.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: undefined,
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: false,
      termindato: '2024-07-24',
      antallBarn: '1',
      overtakelsesdato: '2024-10-13',
      fødselsdato: '2024-07-24'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: MorOgFarKunFarHarRett.args?.stønadskontoer
  }
}`,...(j=(N=g.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var L,H,K;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: false,
      fødselsdato: '2024-07-24',
      antallBarn: '1',
      overtakelsesdato: '2024-10-13'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(K=(H=k.parameters)==null?void 0:H.docs)==null?void 0:K.source}}};var G,I,J;F.parameters={...F.parameters,docs:{...(G=F.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      antallBarn: '2',
      fødselsdato: '2024-08-15'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 397
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 315
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    }
  }
}`,...(J=(I=F.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var x,C,V;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      antallBarn: '1',
      fødselsdato: '2024-08-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    }
  }
}`,...(V=(C=p.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var Y,q,w;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Esther Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorMye: {
      lønnSøker1: 1000,
      lønnSøker2: 70000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2024-07-10',
      antallBarn: '1',
      overtakelsesdato: '2024-10-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(w=(q=m.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;u.parameters={...u.parameters,docs:{...(z=u.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2024-07-10',
      antallBarn: '1',
      overtakelsesdato: '2024-010-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: false
    }
  }
}`,...(W=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Z,$;R.parameters={...R.parameters,docs:{...(X=R.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-12-01',
      fødselsdato: '2024-12-01',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        },
        tillegg: {
          flerbarn: 0,
          prematur: 0
        }
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        },
        tillegg: {
          flerbarn: 0,
          prematur: 0
        }
      }
    }
  }
}`,...($=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ne,re;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-10-24',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR
    }
  }
}`,...(re=(ne=v.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};var te,ae,oe;S.parameters={...S.parameters,docs:{...(te=S.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-10-24',
      antallBarn: '1'
    },
    hvorMye: {
      lønnSøker1: 1000
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(oe=(ae=S.parameters)==null?void 0:ae.docs)==null?void 0:oe.source}}};const dn=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","FarOgFarAdopsjonBeggeHarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{p as AleneforsørgerFarÅttiProsentFødsel,v as AleneforsørgerMorErUfør,F as AleneforsørgerÅttiProsentFødselToBarn,k as FarOgFarAdopsjonBeggeHarRett,g as FarOgFarAdopsjonKunFar1HarRett,i as FarOgFarFødsel,m as FlereForsørgereHundreProsentAdopsjon,s as FlereForsørgereHundreProsentTermin,u as HarIkkeRett,R as KunMorHarRett,l as MorOgFarKunFarHarRett,S as OppsummeringFarOgFarKunFar2HarRett,dn as __namedExportsOrder,sn as default};
