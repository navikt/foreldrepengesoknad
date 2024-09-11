import{j as v}from"./VStack-Bypcsavb.js";import{M as ie,P as Fe,C as d}from"./usePlanleggerNavigator-CxWpgFWI.js";import{P as ke}from"./routes-Cp-2uEwO.js";import{i as me,A as n}from"./Arbeidssituasjon-DYW0AKuv.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as r}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-BrvxP9lU.js";import"./Label-DrVT6kL1.js";import{O as P}from"./OppsummeringSteg-CTaMWlqX.js";import"./index-CTjT7uj6.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-DvorYMl9.js";import"./index-BRV0Se7Z.js";import"./hvemHarRettUtils-DRb4IBc1.js";import"./useScrollBehaviour-CknwOGzw.js";import"./validation-4HO0J-zV.js";import"./satserUtils-C65OlwZv.js";import"./ExpansionCard-6Ft-LH_z.js";import"./kalenderPerioderUtils-CKznPD-h.js";import"./CalendarIconLabel-Dcpp4ieL.js";import"./FamiliehendelseLabel-Cq-Hyj2B.js";import"./Responsive-CMY18hyE.js";import"./TasklistStart-Di7ZrbYl.js";import"./ArrowLeft-C03Jdrb8.js";const o={farRundtFødsel:10,toTette:0},t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},Ge={title:"steg/OppsummeringSteg",component:P,render:({hvemPlanlegger:te,fordeling:ae,hvorLangPeriode:se,omBarnet:oe,arbeidssituasjon:de,stønadskontoer:le,satser:ge})=>(me(),v.jsx(ie,{initialEntries:[ke.OPPSUMMERING],children:v.jsx(Fe,{initialState:{[d.HVEM_PLANLEGGER]:te,[d.FORDELING]:ae,[d.HVOR_LANG_PERIODE]:se,[d.OM_BARNET]:oe,[d.ARBEIDSSITUASJON]:de},children:v.jsx(P,{stønadskontoer:le,satser:ge})})}))},s={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},l={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o}}}};var S;const g={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(S=s.args)==null?void 0:S.stønadskontoer}};var T;const i={args:{satser:t,hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-24",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:(T=l.args)==null?void 0:T.stønadskontoer}},F={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:397},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:315},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o}}}},k={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:o}}}};var A;const m={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(A=s.args)==null?void 0:A.stønadskontoer}},p={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},u={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-01",fødselsdato:"2024-07-01",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},R={args:{satser:t,hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR}}};var _;const E={args:{satser:t,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:(_=s.args)==null?void 0:_.stønadskontoer}};var B,O,f;s.parameters={...s.parameters,docs:{...(B=s.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
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
}`,...(f=(O=s.parameters)==null?void 0:O.docs)==null?void 0:f.source}}};var c,U,b;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
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
}`,...(b=(U=l.parameters)==null?void 0:U.docs)==null?void 0:b.source}}};var D,N,M;g.parameters={...g.parameters,docs:{...(D=g.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
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
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(M=(N=g.parameters)==null?void 0:N.docs)==null?void 0:M.source}}};var j,y,h;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    omBarnet: {
      erFødsel: false,
      termindato: '2024-07-24',
      antallBarn: '1',
      overtakelsesdato: '2024-10-24',
      fødselsdato: '2024-07-24'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: MorOgFarKunFarHarRett.args?.stønadskontoer
  }
}`,...(h=(y=i.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};var L,H,G;F.parameters={...F.parameters,docs:{...(L=F.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    fordeling: {
      antallDagerSøker1: 25
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      antallBarn: '2',
      fødselsdato: '2024-08-10'
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
}`,...(G=(H=F.parameters)==null?void 0:H.docs)==null?void 0:G.source}}};var K,I,J;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
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
}`,...(J=(I=k.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var x,C,V;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Esther Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    fordeling: {
      antallDagerSøker1: 25
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
}`,...(V=(C=m.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var q,w,z;p.parameters={...p.parameters,docs:{...(q=p.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
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
}`,...(z=(w=p.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var Q,W,X;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    satser: DEFAULT_SATSER,
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-01',
      fødselsdato: '2024-07-01',
      antallBarn: '1'
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
}`,...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,$;R.parameters={...R.parameters,docs:{...(Y=R.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
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
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR
    }
  }
}`,...($=(Z=R.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,ne,re;E.parameters={...E.parameters,docs:{...(ee=E.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
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
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: FlereForsørgereHundreProsentTermin.args?.stønadskontoer
  }
}`,...(re=(ne=E.parameters)==null?void 0:ne.docs)==null?void 0:re.source}}};const Ke=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{k as AleneforsørgerFarÅttiProsentFødsel,R as AleneforsørgerMorErUfør,F as AleneforsørgerÅttiProsentFødselToBarn,i as FarOgFarAdopsjonKunFar1HarRett,g as FarOgFarFødsel,m as FlereForsørgereHundreProsentAdopsjon,s as FlereForsørgereHundreProsentTermin,p as HarIkkeRett,u as KunMorHarRett,l as MorOgFarKunFarHarRett,E as OppsummeringFarOgFarKunFar2HarRett,Ke as __namedExportsOrder,Ge as default};
