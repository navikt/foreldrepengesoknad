import{j as v}from"./VStack-Bypcsavb.js";import{M as le,P as ge,C as s}from"./usePlanleggerNavigator-BjdIcytp.js";import{P as ie}from"./routes-Cp-2uEwO.js";import{A as n,i as ke}from"./Arbeidssituasjon-C_G5ELv8.js";import{D as t}from"./Dekningsgrad-Bg_cIyqc.js";import{S as r}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-BrvxP9lU.js";import"./Label-DrVT6kL1.js";import{O as ne}from"./OppsummeringSteg-49biC1s7.js";import"./index-CTjT7uj6.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-DOCbJzrs.js";import"./index-BRV0Se7Z.js";import"./hvemHarRettUtils-HGT9ntnp.js";import"./useScrollBehaviour-CknwOGzw.js";import"./validation-4HO0J-zV.js";import"./satserUtils-C65OlwZv.js";import"./ExpansionCard-CsmgqR51.js";import"./kalenderPerioderUtils-D7KIMJxi.js";import"./CalendarIconLabel-Dcpp4ieL.js";import"./FamiliehendelseLabel-Cq-Hyj2B.js";import"./Responsive-CMY18hyE.js";import"./TasklistStart-Di7ZrbYl.js";import"./ArrowLeft-C03Jdrb8.js";const o={farRundtFødsel:10,toTette:0},Fe={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},me=({hvemPlanlegger:re,fordeling:te,hvorLangPeriode:ae,omBarnet:oe,arbeidssituasjon:se,stønadskontoer:de})=>(ke(),v.jsx(le,{initialEntries:[ie.OPPSUMMERING],children:v.jsx(ge,{initialState:{[s.HVEM_PLANLEGGER]:re,[s.FORDELING]:te,[s.HVOR_LANG_PERIODE]:ae,[s.OM_BARNET]:oe,[s.ARBEIDSSITUASJON]:se},children:v.jsx(ne,{stønadskontoer:de,satser:Fe})})})),Ge={title:"steg/OppsummeringSteg",component:ne,render:me},a={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},d={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:o}}}};var P;const l={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(P=a.args)==null?void 0:P.stønadskontoer}};var E;const g={args:{hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2024-07-24",antallBarn:"1",overtakelsesdato:"2024-10-24",fødselsdato:"2024-07-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:(E=d.args)==null?void 0:E.stønadskontoer}},i={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"2",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:397},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:315},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:o}}}},k={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorLangPeriode:{dekningsgrad:t.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",antallBarn:"1",fødselsdato:"2024-08-10"},arbeidssituasjon:{status:n.JOBBER},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:o},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:o}}}};var S;const F={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:(S=a.args)==null?void 0:S.stønadskontoer}},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2024-07-10",antallBarn:"1",overtakelsesdato:"2024-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-01",fødselsdato:"2024-07-01",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},u={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR}}};var T;const R={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:(T=a.args)==null?void 0:T.stønadskontoer}};var B,O,_;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
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
}`,...(_=(O=a.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};var c,f,A;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
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
}`,...(A=(f=d.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var b,N,U;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
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
}`,...(U=(N=l.parameters)==null?void 0:N.docs)==null?void 0:U.source}}};var M,j,D;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
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
}`,...(D=(j=g.parameters)==null?void 0:j.docs)==null?void 0:D.source}}};var y,h,H;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
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
}`,...(H=(h=i.parameters)==null?void 0:h.docs)==null?void 0:H.source}}};var L,G,K;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
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
}`,...(K=(G=k.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};var I,J,x;F.parameters={...F.parameters,docs:{...(I=F.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
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
}`,...(x=(J=F.parameters)==null?void 0:J.docs)==null?void 0:x.source}}};var C,V,q;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
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
}`,...(q=(V=m.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var w,z,Q;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
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
}`,...(Q=(z=p.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Y;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
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
}`,...(Y=(X=u.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;R.parameters={...R.parameters,docs:{...(Z=R.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
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
}`,...(ee=($=R.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};const Ke=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{k as AleneforsørgerFarÅttiProsentFødsel,u as AleneforsørgerMorErUfør,i as AleneforsørgerÅttiProsentFødselToBarn,g as FarOgFarAdopsjonKunFar1HarRett,l as FarOgFarFødsel,F as FlereForsørgereHundreProsentAdopsjon,a as FlereForsørgereHundreProsentTermin,m as HarIkkeRett,p as KunMorHarRett,d as MorOgFarKunFarHarRett,R as OppsummeringFarOgFarKunFar2HarRett,Ke as __namedExportsOrder,Ge as default};
