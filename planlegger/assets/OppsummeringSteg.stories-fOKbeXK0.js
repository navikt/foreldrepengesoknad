import{j as E}from"./jsx-runtime-D_zvdyIk.js";import{M as pe,P as ve,C as s}from"./usePlanleggerNavigator-B8T5xkBt.js";import{P as Re}from"./routes-Cyl7_Mgv.js";import{A as n}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-DKPBeEsY.js";import"./VeiviserPage-_pnwesxq.js";import{H as r}from"./HvemPlanleggerUtils-CID24uWy.js";import{O as S}from"./OppsummeringSteg-DlBDZmya.js";import"./index-DQLiH3RP.js";import"./barnetUtils-Dt6imNNn.js";import"./barnType-CnRI8jWg.js";import"./stringUtils-DApHD7Y2.js";import"./StepButtonsHookForm-DAMtOG3B.js";import"./VStack-05Ww9A8B.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./dateFormValidation-CtPPetz8.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-Cq2QXhIu.js";import"./ExpansionCard-pmjQE8YQ.js";import"./Exclamationmark-D5-u_50j.js";import"./Checkmark-DM1nKV0w.js";import"./hvemHarRettUtils-D25Zomat.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./ShareDataInfobox-BCLZZgyt.js";import"./amplitude-BZcVzq_V.js";import"./TasklistStart-CxvkVM9i.js";import"./BarnehageplassSteg-B9FfHWY_.js";import"./PlanleggerStepPage-jjtvH2XP.js";import"./uttakUtils-3VKqwiMZ.js";import"./BabyWrapped-DYJcH_DD.js";import"./Information-Dkelf5g4.js";import"./amplitudeUtils-1CrV70-o.js";import"./satserUtils-Dqj76nS8.js";import"./CalendarLabels-D4F7zM3T.js";import"./CalendarIconLabel-V4_xTWqC.js";import"./FamiliehendelseLabel-Bfy0qOWp.js";import"./UttaksplanKalender-DJ2bg-81.js";import"./iframe-Bj0-LZbG.js";import"./Wallet-BDcZwlms.js";const o={farRundtFødsel:10,toTette:0},t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},on={title:"steg/OppsummeringSteg",component:S,render:({hvemPlanlegger:oe,fordeling:se,hvorLangPeriode:de,omBarnet:le,arbeidssituasjon:ie,stønadskontoer:ge,satser:ke,hvorMye:Fe,tilpassPlan:me=!1})=>E.jsx(pe,{initialEntries:[Re.OPPSUMMERING],children:E.jsx(ve,{initialState:{[s.HVEM_PLANLEGGER]:oe,[s.FORDELING]:se,[s.HVOR_LANG_PERIODE]:de,[s.OM_BARNET]:le,[s.ARBEIDSSITUASJON]:ie,[s.HVOR_MYE]:Fe,[s.TILPASS_PLAN]:me},children:E.jsx(S,{stønadskontoer:ge,satser:ke})})})},d={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:5e4,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2025-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},l={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o}}}},i={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-11-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{satser:t,hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:void 0,hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:261}],minsteretter:o},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:200}],minsteretter:o}}}};var P;const k={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!1,fødselsdato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(P=d.args)==null?void 0:P.stønadskontoer}},F={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:7e4},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-15"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:397},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:315},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o}}}},m={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:o}}}};var A;const p={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(A=d.args)==null?void 0:A.stønadskontoer}},v={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},R={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-12-01",fødselsdato:"2024-12-01",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},u={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR}}},T={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}};var f,_,B;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(B=(_=d.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var O,y,c;l.parameters={...l.parameters,docs:{...(O=l.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(c=(y=l.parameters)==null?void 0:y.docs)==null?void 0:c.source}}};var M,U,b;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
}`,...(b=(U=i.parameters)==null?void 0:U.docs)==null?void 0:b.source}}};var D,N,h;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      type: HvemPlanleggerType.FAR_OG_FAR
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
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 261
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 200
        }],
        minsteretter: MINSTERETTER_FAR_RUNDT_FØDSEL_10
      }
    }
  }
}`,...(h=(N=g.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var H,j,L;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
}`,...(L=(j=k.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var K,G,I;F.parameters={...F.parameters,docs:{...(K=F.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
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
}`,...(I=(G=F.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var J,x,C;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
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
}`,...(C=(x=m.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var V,Y,q;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Esther Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
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
}`,...(q=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var w,z,Q;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(Q=(z=v.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;R.parameters={...R.parameters,docs:{...(W=R.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(Z=(X=R.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
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
}`,...(ne=(ee=u.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,te,ae;T.parameters={...T.parameters,docs:{...(re=T.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(ae=(te=T.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};const sn=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","FarOgFarAdopsjonBeggeHarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{m as AleneforsørgerFarÅttiProsentFødsel,u as AleneforsørgerMorErUfør,F as AleneforsørgerÅttiProsentFødselToBarn,k as FarOgFarAdopsjonBeggeHarRett,g as FarOgFarAdopsjonKunFar1HarRett,i as FarOgFarFødsel,p as FlereForsørgereHundreProsentAdopsjon,d as FlereForsørgereHundreProsentTermin,v as HarIkkeRett,R as KunMorHarRett,l as MorOgFarKunFarHarRett,T as OppsummeringFarOgFarKunFar2HarRett,sn as __namedExportsOrder,on as default};
