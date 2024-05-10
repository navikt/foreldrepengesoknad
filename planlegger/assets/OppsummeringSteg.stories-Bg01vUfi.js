import{j as k}from"./jsx-runtime-Du8NFWEI.js";import{M as $,P as ee,C as t}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{P as re}from"./routes-DI-Woyga.js";import{A as r,i as ne}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as a}from"./Dekningsgrad-Bg_cIyqc.js";import{S as n}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-CrBM_WY2.js";import{O as w}from"./OppsummeringSteg-Btm4uHsc.js";import"./index-Dl6G-zuu.js";import"./dayjs.min-a42Le6oL.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils-C_C2kvi-.js";import"./amplitude.esm-JOtNIP3j.js";import"./isoWeek-tto3dG8J.js";import"./Infobox-CM6w1MLr.js";import"./IconCircleWrapper-D7fmNZQD.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-C-EA7mzX.js";import"./Label-DKKZxAV5.js";import"./index-e2vXP8VC.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./useScrollBehaviour-CDJE6G12.js";import"./links-BAR-PZvy.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./useId-BnKOV0D5.js";import"./GreenPanel-CEPEejtT.js";import"./ExpansionCard-Bwp0aZ3a.js";import"./ChevronDown-CY3RuW24.js";import"./Calendar-C0tOnmix.js";import"./kalenderPerioderUtils-CwL7qVZ8.js";import"./CalendarIconLabel-C9DNWetD.js";import"./FamiliehendelseLabel-BTP-zh4d.js";import"./Calendar-In9Ft7th.js";import"./GreenHeading-DE0ffLfD.js";import"./PlanleggerPage-D5WS1JMY.js";import"./Responsive-B_ieNUio.js";import"./Checkmark-DZyhDM9C.js";import"./TasklistStart-BHosgMZk.js";import"./ArrowLeft-DH_8HH2g.js";const ae={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},te=({hvemPlanlegger:z,fordeling:Q,hvorLangPeriode:W,omBarnet:X,arbeidssituasjon:Y,stønadskontoer:Z=ae})=>(ne(),k.jsx($,{initialEntries:[re.OPPSUMMERING],children:k.jsx(ee,{initialState:{[t.HVEM_PLANLEGGER]:z,[t.FORDELING]:Q,[t.HVOR_LANG_PERIODE]:W,[t.OM_BARNET]:X,[t.ARBEIDSSITUASJON]:Y},children:k.jsx(w,{stønadskontoer:Z})})})),ze={title:"steg/OppsummeringSteg",component:w,render:te},s={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},o={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},i={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,termindato:"2022-01-24",antallBarn:"1",overtakelsesdato:"2022-10-24",fødselsdato:"2022-01-24"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},l={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.ÅTTI_PROSENT},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2022-07-10",antallBarn:"2",fødselsdato:"2022-08-10"},arbeidssituasjon:{status:r.JOBBER}}},g={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåMedmor:"Esther Utvikler",type:n.MOR_OG_MEDMOR},fordeling:{antallUkerSøker1:5},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-10-10"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0}}},m={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2022-07-10",antallBarn:"1",overtakelsesdato:"2022-010-10"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!1}}},F={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-07-10",fødselsdato:"2024-07-10",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1}}},u={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},hvorLangPeriode:{dekningsgrad:a.HUNDRE_PROSENT},arbeidssituasjon:{status:r.UFØR}}},p={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:n.FAR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2022-10-24",antallBarn:"1"},arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0}}};var v,P,R;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(R=(P=s.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var E,B,O;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(O=(B=o.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var c,f,A;d.parameters={...d.parameters,docs:{...(c=d.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(A=(f=d.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var U,x,b;i.parameters={...i.parameters,docs:{...(U=i.parameters)==null?void 0:U.docs,source:{originalSource:`{
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
      erFødsel: false,
      termindato: '2022-01-24',
      antallBarn: '1',
      overtakelsesdato: '2022-10-24',
      fødselsdato: '2022-01-24'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    }
  }
}`,...(b=(x=i.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var S,j,_;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(_=(j=l.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var M,N,h;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(h=(N=g.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var T,D,H;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(H=(D=m.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var y,G,K;F.parameters={...F.parameters,docs:{...(y=F.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(K=(G=F.parameters)==null?void 0:G.docs)==null?void 0:K.source}}};var L,I,J;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(J=(I=u.parameters)==null?void 0:I.docs)==null?void 0:J.source}}};var C,V,q;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(q=(V=p.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const Qe=["FlereForsørgereHundreProsentTermin","MorOgFarKunFarHarRett","FarOgFarFødsel","FarOgFarAdopsjon","AleneforsørgerÅttiProsentFødselToBarn","FlereForsørgereHundreProsentAdopsjon","HarIkkeRett","KunMorHarRett","AleneforsørgerMorErUfør","OppsummeringFarOgFarKunFar2HarRett"];export{u as AleneforsørgerMorErUfør,l as AleneforsørgerÅttiProsentFødselToBarn,i as FarOgFarAdopsjon,d as FarOgFarFødsel,g as FlereForsørgereHundreProsentAdopsjon,s as FlereForsørgereHundreProsentTermin,m as HarIkkeRett,F as KunMorHarRett,o as MorOgFarKunFarHarRett,p as OppsummeringFarOgFarKunFar2HarRett,Qe as __namedExportsOrder,ze as default};
