import{j as E}from"./jsx-runtime-Cw0GR0a5.js";import{M as ve,P as Se,C as s}from"./usePlanleggerNavigator-DW4nnOlQ.js";import{P as Ee}from"./routes-gnI_NAHe.js";import{A as n}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as r}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-D2M1HdQ9.js";import"./Label-CXFT65WO.js";import{i as Pe}from"./amplitude-pNT9-8Af.js";import{O as P}from"./OppsummeringSteg-Bl6YnBwn.js";import"./index-CTjT7uj6.js";import"./barnetUtils-Dtg6gkcN.js";import"./VStack-DXwxFTIo.js";import"./VeiviserPage-BcsEgJcv.js";import"./index-BRV0Se7Z.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-DEZIZxBd.js";import"./ShareDataInfobox-vYZvCutl.js";import"./Responsive-ivt31A_p.js";import"./Checkmark-CvLHQyWN.js";import"./TasklistStart-BUjWFJGh.js";import"./BarnehageplassSteg-BkH-XQwV.js";import"./PlanleggerStepPage-F7Yp21t3.js";import"./BabyWrapped-f-N5pHto.js";import"./Information-BHhX2pxT.js";import"./ExpansionCard-BWWqtp0J.js";import"./satserUtils-Doc8m8GQ.js";import"./ArrowLeft-BHWdNJf4.js";import"./kalenderPerioderUtils-BL1EhGLm.js";import"./CalendarIconLabel-DXHCxJg7.js";import"./FamiliehendelseLabel-CamrjsPy.js";import"./Wallet-BksBw_Ii.js";const d={farRundtFødsel:10,toTette:0},t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},nn={title:"steg/OppsummeringSteg",component:P,render:({hvemPlanlegger:le,fordeling:ge,hvorLangPeriode:ie,omBarnet:ke,arbeidssituasjon:Fe,stønadskontoer:me,satser:pe,locale:ue,hvorMye:Re})=>(Pe(),E.jsx(ve,{initialEntries:[Ee.OPPSUMMERING],children:E.jsx(Se,{initialState:{[s.HVEM_PLANLEGGER]:le,[s.FORDELING]:ge,[s.HVOR_LANG_PERIODE]:ie,[s.OM_BARNET]:ke,[s.ARBEIDSSITUASJON]:Fe,[s.HVOR_MYE]:Re},children:E.jsx(P,{stønadskontoer:me,satser:pe,locale:ue})})}))},o={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:5e4,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2025-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},l={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:d}}}};var T;const g={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-11-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(T=o.args)==null?void 0:T.stønadskontoer}};var A;const i={args:{locale:"nb",satser:t,hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:(A=l.args)==null?void 0:A.stønadskontoer}};var c;const k={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!1,fødselsdato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-13"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(c=o.args)==null?void 0:c.stønadskontoer}},F={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:7e4},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-15"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:397},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:315},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:d}}}},m={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:d},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:d}}}};var B;const p={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorMye:{lønnSøker1:1e3,lønnSøker2:7e4},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(B=o.args)==null?void 0:B.stønadskontoer}},u={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},R={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-12-01",fødselsdato:"2024-12-01",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},v={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR}}};var _;const S={args:{locale:"nb",satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorMye:{lønnSøker1:1e3},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:(_=o.args)==null?void 0:_.stønadskontoer}};var b,f,O;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(O=(f=o.parameters)==null?void 0:f.docs)==null?void 0:O.source}}};var M,U,D;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(D=(U=l.parameters)==null?void 0:U.docs)==null?void 0:D.source}}};var h,N,y;g.parameters={...g.parameters,docs:{...(h=g.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-11-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(y=(N=g.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var j,L,H;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
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
}`,...(H=(L=i.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var G,K,I;k.parameters={...k.parameters,docs:{...(G=k.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(I=(K=k.parameters)==null?void 0:K.docs)==null?void 0:I.source}}};var J,x,C;F.parameters={...F.parameters,docs:{...(J=F.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(C=(x=F.parameters)==null?void 0:x.docs)==null?void 0:C.source}}};var V,Y,q;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(q=(Y=m.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var w,z,Q;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(Q=(z=p.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Z;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(Z=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ne;R.parameters={...R.parameters,docs:{...($=R.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(ne=(ee=R.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var re,te,ae;v.parameters={...v.parameters,docs:{...(re=v.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
}`,...(ae=(te=v.parameters)==null?void 0:te.docs)==null?void 0:ae.source}}};var oe,se,de;S.parameters={...S.parameters,docs:{...(oe=S.parameters)==null?void 0:oe.docs,source:{originalSource:`{
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
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(de=(se=S.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};const rn=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","FarOgFarAdopsjonBeggeHarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{m as AleneforsørgerFarÅttiProsentFødsel,v as AleneforsørgerMorErUfør,F as AleneforsørgerÅttiProsentFødselToBarn,k as FarOgFarAdopsjonBeggeHarRett,i as FarOgFarAdopsjonKunFar1HarRett,g as FarOgFarFødsel,p as FlereForsørgereHundreProsentAdopsjon,o as FlereForsørgereHundreProsentTermin,u as HarIkkeRett,R as KunMorHarRett,l as MorOgFarKunFarHarRett,S as OppsummeringFarOgFarKunFar2HarRett,rn as __namedExportsOrder,nn as default};
