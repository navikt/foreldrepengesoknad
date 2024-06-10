import{j as O}from"./jsx-runtime-_e34SzbC.js";import{a as Re}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as Oe,P as ce,C as s}from"./usePlanleggerNavigator-Cc6QDZDj.js";import{P as fe}from"./routes-Cp-2uEwO.js";import{A as o,i as Ee}from"./Arbeidssituasjon-rAW6RSqH.js";import{D as Pe}from"./Dekningsgrad-Bg_cIyqc.js";import{S as n}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as e}from"./uttakUtils-Bfxqkahw.js";import{P as le}from"./PlanenDeresSteg-BI7Uyk4U.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./dayjs.min-Dkhc0ShP.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils--_TJ2jyJ.js";import"./amplitude.esm-BThBy0fb.js";import"./isoWeek-BYZtqGCG.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./Box-DGewKQma.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./VStack-DzX3uTsq.js";import"./Label-DFEFJLqZ.js";import"./Calendar-vEapWlHS.js";import"./kalenderPerioderUtils-9-7Eb4xW.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./CalendarIconLabel-D3VA8mep.js";import"./useId-DbilmxAP.js";import"./FamiliehendelseLabel-DWk2u28k.js";import"./PlanleggerStepPage-CG-Vt2ZG.js";import"./GreenHeading-B5QLwpFd.js";import"./infobox.module-COlA9bH3.js";import"./links-B0sJFGJm.js";import"./Button-DG980N3E.js";import"./useId-BuMKUBu9.js";import"./index-Dcs0RV0A.js";import"./ChevronDown-CcwFV5Ek.js";import"./PlanleggerPage-BF_Tk5Tl.js";import"./FordelingSteg-DmaCJcxD.js";import"./GreenPanel-h__UB972.js";import"./StepButtonsHookForm-D9EJb97s.js";import"./Select-Dt8IwbBp.js";import"./Calendar-DfqO_VWn.js";import"./index-Cbx7Fas8.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Spacer-CmfZYR-2.js";import"./OmÅTilpassePlanen-DPoipxP_.js";import"./BabyWrapped-Dn1_Bla9.js";import"./PersonPregnant-Barn0uDD.js";import"./PersonGroup-DiEFwi66.js";import"./ExpansionCard-_FY0jhnH.js";import"./UforutsetteEndringer-DDxf0ia_.js";import"./Information-DnqWs4L0.js";import"./extends-CF3RwP-h.js";const R={farRundtFødsel:0,toTette:0},xe=({gåTilNesteSide:me=Re("button-click"),hvemPlanlegger:pe,fordeling:ke,hvorLangPeriode:Fe,omBarnet:ue,arbeidssituasjon:ve,stønadskontoer:Me})=>(Ee(),O.jsx(Oe,{initialEntries:[fe.PLANEN_DERES],children:O.jsx(ce,{onDispatch:me,initialState:{[s.FORDELING]:ke,[s.HVOR_LANG_PERIODE]:Fe,[s.HVEM_PLANLEGGER]:pe,[s.OM_BARNET]:ue,[s.ARBEIDSSITUASJON]:ve},children:O.jsx(le,{stønadskontoer:Me})})})),Br={title:"steg/PlanenDeresSteg/Adopsjon",component:le,render:xe},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-04-11",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallUkerSøker1:0},hvorLangPeriode:{dekningsgrad:Pe.HUNDRE_PROSENT},arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80}],minsteretter:R},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90}],minsteretter:R}}}},t={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:R},80:{kontoer:[{konto:e.Foreldrepenger,dager:280}],minsteretter:R}}}},d={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:155},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},i={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},l={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},m={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}};var c;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:n.MOR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(c=t.args)==null?void 0:c.stønadskontoer}};var f;const F={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(f=t.args)==null?void 0:f.stønadskontoer}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:210},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:160},{konto:e.AktivitetsfriKvote,dager:40}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},v={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:145},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-05-12",fødselsdato:"2020-04-11",antallBarn:"1"}}};var E,P,x;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(x=(P=r.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var S,A,T;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(ie=(ge=M.parameters)==null?void 0:ge.docs)==null?void 0:ie.source}}};const jr=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{F as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,u as FarOgFarKunFarHarRett,v as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,d as MorOgFarKunFarHarRettMorErUfør,g as MorOgFarKunFarHarRettMorIngenAvDisse,t as MorOgFarKunMorHarRett,i as MorOgMedmorBeggeHarRett,m as MorOgMedmorKunMedmorHarRettMorErUfør,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,l as MorOgMedmorKunMorHarRett,M as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,jr as __namedExportsOrder,Br as default};
