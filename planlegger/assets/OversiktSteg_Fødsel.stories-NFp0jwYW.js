import{j as c}from"./jsx-runtime-Du8NFWEI.js";import{a as Re}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as Me,P as ce,C as d}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{P as Oe}from"./routes-DI-Woyga.js";import{A as n,i as xe}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as fe}from"./Dekningsgrad-Bg_cIyqc.js";import{S as t}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-ViXZh0qG.js";import{O as ie}from"./OversiktSteg-CZQJI-yH.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./dayjs.min-a42Le6oL.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils-C_C2kvi-.js";import"./amplitude.esm-JOtNIP3j.js";import"./isoWeek-tto3dG8J.js";import"./Infobox-DBiJWQmR.js";import"./IconCircleWrapper-x91Dcw7p.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-C-EA7mzX.js";import"./Label-DKKZxAV5.js";import"./Calendar-Bhe1saZ-.js";import"./kalenderPerioderUtils-Df5IjemV.js";import"./index-e2vXP8VC.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./CalendarIconLabel-C9DNWetD.js";import"./useId-BnKOV0D5.js";import"./FamiliehendelseLabel-C2nTOLX1.js";import"./PlanleggerStepPage-CgQnGAng.js";import"./GreenHeading-DE0ffLfD.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./links-BAR-PZvy.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./index-BfyspvgH.js";import"./ChevronDown-CY3RuW24.js";import"./PlanleggerPage-D5WS1JMY.js";import"./FordelingSteg-3YjLkpgO.js";import"./GreenPanel-CEPEejtT.js";import"./StepButtonsHookForm-DUdbmqm8.js";import"./Select-B7GYbsm8.js";import"./Calendar-In9Ft7th.js";import"./index-D1_ZHIBm.js";import"./Responsive-B_ieNUio.js";import"./ArrowLeft-DH_8HH2g.js";import"./ArrowRight-CMhrL5XF.js";import"./useScrollBehaviour-BhOrFi8k.js";import"./Spacer-DYbme5k_.js";import"./OmÅTilpassePlanen-CoScbu9L.js";import"./BabyWrapped-BX-BmTrK.js";import"./PersonPregnant-CZab5gFD.js";import"./PersonGroup-5deYFPGw.js";import"./ExpansionCard-Bwp0aZ3a.js";import"./UforutsetteEndringer-B7RpMT0N.js";import"./Information-DAbMiAfI.js";import"./extends-CCbyfPlC.js";const s={farRundtFødsel:10,toTette:0},Ee=({gåTilNesteSide:le=Re("button-click"),hvemPlanlegger:Fe,fordeling:pe,hvorLangPeriode:ke,omBarnet:me,arbeidssituasjon:ue,stønadskontoer:ve})=>(xe(),c.jsx(Me,{initialEntries:[Oe.OVERSIKT],children:c.jsx(ce,{onDispatch:le,initialState:{[d.FORDELING]:pe,[d.HVOR_LANG_PERIODE]:ke,[d.HVEM_PLANLEGGER]:Fe,[d.OM_BARNET]:me,[d.ARBEIDSSITUASJON]:ue},children:c.jsx(ie,{stønadskontoer:ve,locale:"nb"})})})),br={title:"steg/OversiktSteg/Fødsel",component:ie,render:Ee},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:t.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-04-11",antallBarn:"1"},fordeling:{antallUkerSøker1:0},hvorLangPeriode:{dekningsgrad:fe.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},o={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},F={args:{...o.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},k={args:{...i.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}};var O;const m={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:t.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(O=o.args)==null?void 0:O.stønadskontoer}},u={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:280}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:s}}}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR}}},v={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},R={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},M={args:{...r.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};var x,f,E;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-04-11',
      antallBarn: '1'
    },
    fordeling: {
      antallUkerSøker1: 0
    },
    hvorLangPeriode: {
      dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Mødrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fedrekvote,
          dager: 95
        }, {
          konto: StønadskontoType.Fellesperiode,
          dager: 90
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
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
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(E=(f=r.parameters)==null?void 0:f.docs)==null?void 0:E.source}}};var S,T,P;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 280
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }, {
          konto: StønadskontoType.ForeldrepengerFørFødsel,
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(P=(T=o.parameters)==null?void 0:T.docs)==null?void 0:P.source}}};var A,b,B;g.parameters={...g.parameters,docs:{...(A=g.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
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
}`,...(B=(b=g.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var H,y,j;i.parameters={...i.parameters,docs:{...(H=i.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 210
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 160
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(j=(y=i.parameters)==null?void 0:y.docs)==null?void 0:j.source}}};var U,K,_;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(_=(K=l.parameters)==null?void 0:K.docs)==null?void 0:_.source}}};var D,N,h;F.parameters={...F.parameters,docs:{...(D=F.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(h=(N=F.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var I,G,J;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(J=(G=p.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var L,C,V;k.parameters={...k.parameters,docs:{...(L=k.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(V=(C=k.parameters)==null?void 0:C.docs)==null?void 0:V.source}}};var q,w,z;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      type: Situasjon.MOR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...(z=(w=m.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var Q,W,X;u.parameters={...u.parameters,docs:{...(Q=u.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.FAR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 280
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(X=(W=u.parameters)==null?void 0:W.docs)==null?void 0:X.source}}};var Y,Z,$;a.parameters={...a.parameters,docs:{...(Y=a.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    }
  }
}`,...($=(Z=a.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var ee,re,ne;v.parameters={...v.parameters,docs:{...(ee=v.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 210
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 160
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(ne=(re=v.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var te,oe,ae;R.parameters={...R.parameters,docs:{...(te=R.parameters)==null?void 0:te.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 210
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 160
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...(ae=(oe=R.parameters)==null?void 0:oe.docs)==null?void 0:ae.source}}};var se,de,ge;M.parameters={...M.parameters,docs:{...(se=M.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: true,
      termindato: '2024-04-11',
      fødselsdato: '2024-04-12',
      antallBarn: '1'
    }
  }
}`,...(ge=(de=M.parameters)==null?void 0:de.docs)==null?void 0:ge.source}}};const Br=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{u as BareFarSøkerOgHarRett,m as BareMorSøkerOgHarRett,M as BarnetErFødtDagenEtterTermindato,a as FarOgFarBeggeHarRett,v as FarOgFarKunFarHarRett,R as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,i as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,o as MorOgFarKunMorHarRett,l as MorOgMedmorBeggeHarRett,k as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,p as MorOgMedmorKunMedmorHarRettMorUfør,F as MorOgMedmorKunMorHarRett,Br as __namedExportsOrder,br as default};
