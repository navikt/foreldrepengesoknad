import{j as v}from"./VStack-WHXoK350.js";import{M as te,P as ae,C as a}from"./usePlanleggerNavigator-BUJeCoY_.js";import{P as se}from"./routes-Cp-2uEwO.js";import{A as n,i as oe}from"./Arbeidssituasjon-Bijxu_EQ.js";import{D as t}from"./Dekningsgrad-Bg_cIyqc.js";import{S as r}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-Dlteggxe.js";import"./Label-DMHnewTW.js";import{O as X}from"./OppsummeringSteg-Dn5HilZ1.js";import"./index-DVXBtNgz.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-ClLisdhQ.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./hvemHarRettUtils-BOooQ_AO.js";import"./useScrollBehaviour-BRwzlaSf.js";import"./validation-4HO0J-zV.js";import"./satserUtils-BYGpr4XC.js";import"./ExpansionCard-Dhk0FTRw.js";import"./kalenderPerioderUtils-Brerylke.js";import"./CalendarIconLabel-DdIu2HNU.js";import"./FamiliehendelseLabel-ALrUKE5Y.js";import"./Responsive-Cdi-4PuO.js";import"./TasklistStart-B0h6AqDi.js";import"./ArrowLeft-Dtu47hhV.js";const de={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},le={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},ie=({hvemPlanlegger:Y,fordeling:Z,hvorLangPeriode:$,omBarnet:ee,arbeidssituasjon:ne,stønadskontoer:re=de})=>(oe(),v.jsx(te,{initialEntries:[se.OPPSUMMERING],children:v.jsx(ae,{initialState:{[a.HVEM_PLANLEGGER]:Y,[a.FORDELING]:Z,[a.HVOR_LANG_PERIODE]:$,[a.OM_BARNET]:ee,[a.ARBEIDSSITUASJON]:ne},children:v.jsx(X,{stønadskontoer:re,satser:le})})})),De={title:"steg/OppsummeringSteg",component:X,render:ie},s={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0}}},o={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0}}},l={args:{hvemPlanlegger:{type:r.FAR_OG_FAR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2022-01-24",antallBarn:"1",overtakelsesdato:"2022-10-24",fødselsdato:"2022-01-24"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1}}},i={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2022-07-10",antallBarn:"2",fødselsdato:"2022-08-10"},arbeidssituasjon:{status:n.JOBBER}}},g={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},hvorLangPeriode:{dekningsgrad:t.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2022-07-10",antallBarn:"1",fødselsdato:"2022-08-10"},arbeidssituasjon:{status:n.JOBBER}}},F={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:r.MOR_OG_MEDMOR},fordeling:{antallDagerSøker1:25},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-10-10"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0}}},u={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-010-10"},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!1}}},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-1",fødselsdato:"2024-07-1",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.UFØR},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0},tillegg:{flerbarn:0,prematur:0}}}}},k={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:t.HUNDRE_PROSENT},arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0}}};var P,R,E;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
      termindato: '2022-10-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    }
  }
}`,...(E=(R=s.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var B,f,x;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
      termindato: '2022-10-24',
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
          dager: 155
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 125
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var c,O,b;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
      termindato: '2022-10-24',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    }
  }
}`,...(b=(O=d.parameters)==null?void 0:O.docs)==null?void 0:b.source}}};var S,A,T;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
      termindato: '2022-01-24',
      antallBarn: '1',
      overtakelsesdato: '2022-10-24',
      fødselsdato: '2022-01-24'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    }
  }
}`,...(T=(A=l.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var j,_,U;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
      termindato: '2022-07-10',
      antallBarn: '2',
      fødselsdato: '2022-08-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    }
  }
}`,...(U=(_=i.parameters)==null?void 0:_.docs)==null?void 0:U.source}}};var N,M,h;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
      termindato: '2022-07-10',
      antallBarn: '1',
      fødselsdato: '2022-08-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    }
  }
}`,...(h=(M=g.parameters)==null?void 0:M.docs)==null?void 0:h.source}}};var D,y,H;F.parameters={...F.parameters,docs:{...(D=F.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
      fødselsdato: '2022-07-10',
      antallBarn: '1',
      overtakelsesdato: '2022-10-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    }
  }
}`,...(H=(y=F.parameters)==null?void 0:y.docs)==null?void 0:H.source}}};var G,K,L;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2022-07-10',
      antallBarn: '1',
      overtakelsesdato: '2022-010-10'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: false
    }
  }
}`,...(L=(K=u.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var I,J,C;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-1',
      fødselsdato: '2024-07-1',
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
}`,...(C=(J=m.parameters)==null?void 0:J.docs)==null?void 0:C.source}}};var V,q,w;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2022-10-24',
      antallBarn: '1'
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR
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
}`,...(w=(q=p.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;k.parameters={...k.parameters,docs:{...(z=k.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2022-10-24',
      antallBarn: '1'
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    }
  }
}`,...(W=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const ye=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{g as AleneforsørgerFarÅttiProsentFødsel,p as AleneforsørgerMorErUfør,i as AleneforsørgerÅttiProsentFødselToBarn,l as FarOgFarAdopsjonKunFar1HarRett,d as FarOgFarFødsel,F as FlereForsørgereHundreProsentAdopsjon,s as FlereForsørgereHundreProsentTermin,u as HarIkkeRett,m as KunMorHarRett,o as MorOgFarKunFarHarRett,k as OppsummeringFarOgFarKunFar2HarRett,ye as __namedExportsOrder,De as default};
