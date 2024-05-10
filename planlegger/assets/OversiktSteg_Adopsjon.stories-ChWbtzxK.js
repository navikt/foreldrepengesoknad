import{j as O}from"./jsx-runtime-Du8NFWEI.js";import{a as Re}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as Oe,P as ce,C as s}from"./usePlanleggerNavigator-DFvQ4JT5.js";import{P as fe}from"./routes-DI-Woyga.js";import{A as o,i as xe}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as Ee}from"./Dekningsgrad-Bg_cIyqc.js";import{S as n}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-CrBM_WY2.js";import{O as le}from"./OversiktSteg-CCLpEn9k.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./dayjs.min-a42Le6oL.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils-C_C2kvi-.js";import"./amplitude.esm-JOtNIP3j.js";import"./isoWeek-tto3dG8J.js";import"./Infobox-CM6w1MLr.js";import"./IconCircleWrapper-D7fmNZQD.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-C-EA7mzX.js";import"./Label-DKKZxAV5.js";import"./Calendar-C0tOnmix.js";import"./kalenderPerioderUtils-t7bVWfLJ.js";import"./index-e2vXP8VC.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./CalendarIconLabel-C9DNWetD.js";import"./useId-BnKOV0D5.js";import"./FamiliehendelseLabel-BTP-zh4d.js";import"./PlanleggerStepPage-CgQnGAng.js";import"./GreenHeading-DE0ffLfD.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./links-BAR-PZvy.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./index-BfyspvgH.js";import"./ChevronDown-CY3RuW24.js";import"./PlanleggerPage-D5WS1JMY.js";import"./FordelingSteg-KFpHvEzz.js";import"./GreenPanel-CEPEejtT.js";import"./StepButtonsHookForm-DUdbmqm8.js";import"./Select-B7GYbsm8.js";import"./Calendar-In9Ft7th.js";import"./index-D1_ZHIBm.js";import"./Responsive-B_ieNUio.js";import"./ArrowLeft-DH_8HH2g.js";import"./ArrowRight-CMhrL5XF.js";import"./useScrollBehaviour-CDJE6G12.js";import"./Spacer-DYbme5k_.js";import"./OmÅTilpassePlanen-CjeU4JNp.js";import"./BabyWrapped-BX-BmTrK.js";import"./PersonPregnant-CZab5gFD.js";import"./PersonGroup-5deYFPGw.js";import"./ExpansionCard-Bwp0aZ3a.js";import"./UforutsetteEndringer-G-tJpFNZ.js";import"./Information-DAbMiAfI.js";import"./extends-CCbyfPlC.js";const R={farRundtFødsel:0,toTette:0},Pe=({gåTilNesteSide:me=Re("button-click"),hvemPlanlegger:pe,fordeling:ke,hvorLangPeriode:Fe,omBarnet:ue,arbeidssituasjon:ve,stønadskontoer:Me})=>(xe(),O.jsx(Oe,{initialEntries:[fe.OVERSIKT],children:O.jsx(ce,{onDispatch:me,initialState:{[s.FORDELING]:ke,[s.HVOR_LANG_PERIODE]:Fe,[s.HVEM_PLANLEGGER]:pe,[s.OM_BARNET]:ue,[s.ARBEIDSSITUASJON]:ve},children:O.jsx(le,{stønadskontoer:Me})})})),br={title:"steg/OversiktSteg/Adopsjon",component:le,render:Pe},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-04-11",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallUkerSøker1:0},hvorLangPeriode:{dekningsgrad:Ee.HUNDRE_PROSENT},arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80}],minsteretter:R},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90}],minsteretter:R}}}},t={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:R},80:{kontoer:[{konto:e.Foreldrepenger,dager:280}],minsteretter:R}}}},d={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},i={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},l={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},m={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}};var c;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:n.MOR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(c=t.args)==null?void 0:c.stønadskontoer}};var f;const F={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(f=t.args)==null?void 0:f.stønadskontoer}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},v={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:145},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-05-12",fødselsdato:"2020-04-11",antallBarn:"1"}}};var x,E,P;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-04-11',
      fødselsdato: '2020-04-11',
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
        }],
        minsteretter: MINSTERETTER
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
          dager: 90
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(P=(E=r.parameters)==null?void 0:E.docs)==null?void 0:P.source}}};var S,A,T;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 230
        }],
        minsteretter: MINSTERETTER
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 280
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(T=(A=t.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var H,b,B;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
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
          dager: 155
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
}`,...(B=(b=d.parameters)==null?void 0:b.docs)==null?void 0:B.source}}};var j,U,y;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 160
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 210
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 40
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(y=(U=g.parameters)==null?void 0:U.docs)==null?void 0:y.source}}};var K,_,D;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(D=(_=i.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};var h,G,I;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(I=(G=l.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var N,J,L;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorErUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(L=(J=m.parameters)==null?void 0:J.docs)==null?void 0:L.source}}};var C,V,q;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    }
  }
}`,...(q=(V=p.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var w,z,Q;k.parameters={...k.parameters,docs:{...(w=k.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(Q=(z=k.parameters)==null?void 0:z.docs)==null?void 0:Q.source}}};var W,X,Y;F.parameters={...F.parameters,docs:{...(W=F.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...(Y=(X=F.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var Z,$,ee;a.parameters={...a.parameters,docs:{...(Z=a.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    }
  }
}`,...(ee=($=a.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var re,ne,te;u.parameters={...u.parameters,docs:{...(re=u.parameters)==null?void 0:re.docs,source:{originalSource:`{
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
          farRundtFødsel: 0,
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
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(te=(ne=u.parameters)==null?void 0:ne.docs)==null?void 0:te.source}}};var oe,ae,se;v.parameters={...v.parameters,docs:{...(oe=v.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.UFØR,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 145
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 0,
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
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(se=(ae=v.parameters)==null?void 0:ae.docs)==null?void 0:se.source}}};var de,ge,ie;M.parameters={...M.parameters,docs:{...(de=M.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-05-12',
      fødselsdato: '2020-04-11',
      antallBarn: '1'
    }
  }
}`,...(ie=(ge=M.parameters)==null?void 0:ge.docs)==null?void 0:ie.source}}};const Br=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{F as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,u as FarOgFarKunFarHarRett,v as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,d as MorOgFarKunFarHarRettMorErUfør,g as MorOgFarKunFarHarRettMorIngenAvDisse,t as MorOgFarKunMorHarRett,i as MorOgMedmorBeggeHarRett,m as MorOgMedmorKunMedmorHarRettMorErUfør,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,l as MorOgMedmorKunMorHarRett,M as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,Br as __namedExportsOrder,br as default};
