import{j as v}from"./jsx-runtime-Du8NFWEI.js";import{M as ae,P as te,C as t}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{P as se}from"./routes-DI-Woyga.js";import{A as r,i as oe}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as n}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-CrBM_WY2.js";import{O as X}from"./OppsummeringSteg-C5x5Yb2P.js";import"./index-Dl6G-zuu.js";import"./dayjs.min-a42Le6oL.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils-C_C2kvi-.js";import"./amplitude.esm-JOtNIP3j.js";import"./isoWeek-tto3dG8J.js";import"./Infobox-BU2nfHQM.js";import"./IconCircleWrapper-D7fmNZQD.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-C-EA7mzX.js";import"./Label-DKKZxAV5.js";import"./index-e2vXP8VC.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./useScrollBehaviour-CDJE6G12.js";import"./links-BAR-PZvy.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./useId-BnKOV0D5.js";import"./GreenPanel-CEPEejtT.js";import"./ExpansionCard-Bwp0aZ3a.js";import"./ChevronDown-CY3RuW24.js";import"./Calendar-C0tOnmix.js";import"./kalenderPerioderUtils-BdgGcofg.js";import"./CalendarIconLabel-C9DNWetD.js";import"./FamiliehendelseLabel-BTP-zh4d.js";import"./Calendar-In9Ft7th.js";import"./GreenHeading-DE0ffLfD.js";import"./PlanleggerPage-D5WS1JMY.js";import"./Responsive-B_ieNUio.js";import"./Checkmark-DZyhDM9C.js";import"./TasklistStart-BHosgMZk.js";import"./ArrowLeft-DH_8HH2g.js";const de={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ie=({hvemPlanlegger:Y,fordeling:Z,hvorLangPeriode:$,omBarnet:ee,arbeidssituasjon:re,stønadskontoer:ne=de})=>(oe(),v.jsx(ae,{initialEntries:[se.OPPSUMMERING],children:v.jsx(te,{initialState:{[t.HVEM_PLANLEGGER]:Y,[t.FORDELING]:Z,[t.HVOR_LANG_PERIODE]:$,[t.OM_BARNET]:ee,[t.ARBEIDSSITUASJON]:re},children:v.jsx(X,{stønadskontoer:ne})})})),Ye={title:"steg/OppsummeringSteg",component:X,render:ie},s={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},o={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},i={args:{hvemPlanlegger:{type:n.FAR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2022-01-24",antallBarn:"1",overtakelsesdato:"2022-10-24",fødselsdato:"2022-01-24"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1}}},l={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2022-07-10",antallBarn:"2",fødselsdato:"2022-08-10"},arbeidssituasjon:{status:r.JOBBER}}},g={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2022-07-10",antallBarn:"1",fødselsdato:"2022-08-10"},arbeidssituasjon:{status:r.JOBBER}}},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:n.MOR_OG_MEDMOR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-10-10"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},F={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-010-10"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!1}}},u={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",fødselsdato:"2024-07-10",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1}}},p={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:r.UFØR}}},k={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:n.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0}}};var P,R,E;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    fordeling: {
      antallUkerSøker1: 5
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
}`,...(E=(R=s.parameters)==null?void 0:R.docs)==null?void 0:E.source}}};var B,c,O;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(O=(c=o.parameters)==null?void 0:c.docs)==null?void 0:O.source}}};var f,A,x;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: {
      antallUkerSøker1: 5
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
}`,...(x=(A=d.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var b,S,U;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      type: Situasjon.FAR_OG_FAR
    },
    fordeling: {
      antallUkerSøker1: 5
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
}`,...(U=(S=i.parameters)==null?void 0:S.docs)==null?void 0:U.source}}};var j,_,M;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    fordeling: {
      antallUkerSøker1: 5
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
}`,...(M=(_=l.parameters)==null?void 0:_.docs)==null?void 0:M.source}}};var N,h,T;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(T=(h=g.parameters)==null?void 0:h.docs)==null?void 0:T.source}}};var D,H,y;m.parameters={...m.parameters,docs:{...(D=m.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåMedmor: 'Esther Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    fordeling: {
      antallUkerSøker1: 5
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
}`,...(y=(H=m.parameters)==null?void 0:H.docs)==null?void 0:y.source}}};var G,K,L;F.parameters={...F.parameters,docs:{...(G=F.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(L=(K=F.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};var I,J,C;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-07-10',
      fødselsdato: '2024-07-10',
      antallBarn: '1'
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    }
  }
}`,...(C=(J=u.parameters)==null?void 0:J.docs)==null?void 0:C.source}}};var V,q,w;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    }
  }
}`,...(W=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const Ze=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjonKunFar1HarRett","AleneforsørgerÅttiProsentFødselToBarn","AleneforsørgerFarÅttiProsentFødsel","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{g as AleneforsørgerFarÅttiProsentFødsel,p as AleneforsørgerMorErUfør,l as AleneforsørgerÅttiProsentFødselToBarn,i as FarOgFarAdopsjonKunFar1HarRett,d as FarOgFarFødsel,m as FlereForsørgereHundreProsentAdopsjon,s as FlereForsørgereHundreProsentTermin,F as HarIkkeRett,u as KunMorHarRett,o as MorOgFarKunFarHarRett,k as OppsummeringFarOgFarKunFar2HarRett,Ze as __namedExportsOrder,Ye as default};
