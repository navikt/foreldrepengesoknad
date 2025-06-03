import{j as F}from"./jsx-runtime-D_zvdyIk.js";import{a as Oe}from"./index-B-lxVbXh.js";import{M as Fe,P as ce,C as s}from"./usePlanleggerNavigator-CE_6AcPv.js";import{P as Pe}from"./routes-Cyl7_Mgv.js";import{A as o}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as fe}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-B_4lCBex.js";import"./VeiviserPage-CHSQEW6u.js";import{H as n}from"./HvemPlanleggerUtils-BYHEAsy1.js";import{P as c}from"./PlanenDeresSteg-B4V65pzJ.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./barnetUtils-DYBBskKi.js";import"./barnType-CnRI8jWg.js";import"./stringUtils-DApHD7Y2.js";import"./StepButtonsHookForm-DAulkPa7.js";import"./VStack-05Ww9A8B.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./dateFormValidation-DphE57k6.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-Cq2QXhIu.js";import"./ExpansionCard-JzbiwWRh.js";import"./Exclamationmark-D5-u_50j.js";import"./Checkmark-DM1nKV0w.js";import"./PlanleggerStepPage-ChY5fp_x.js";import"./FordelingSteg-BGPXsStx.js";import"./customErrorFormatter-AuWeTsWn.js";import"./hvemHarRettUtils-C8lIuyXR.js";import"./uttakUtils-T6Bng2AV.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./Spacer-C5GDfzOr.js";import"./UttaksplanKalender-DY4lrawg.js";import"./iframe-BqowFTD7.js";import"./CalendarLabels-BD4svbUj.js";import"./CalendarIconLabel-V4_xTWqC.js";import"./BarnehageplassSteg-htSOp-d5.js";import"./BabyWrapped-DYJcH_DD.js";import"./Information-Dkelf5g4.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FamiliehendelseLabel-DVAv2W11.js";import"./OmÅTilpassePlanen-DKZld6Nc.js";import"./PersonPregnant-DPU01SlN.js";import"./PencilWriting-njUDx9TT.js";import"./PersonGroup-_nGe72we.js";import"./UforutsetteEndringer-B3v9QWHr.js";import"./ToggleGroup-BM85Y63y.js";const O={farRundtFødsel:0,toTette:0},Or={title:"steg/PlanenDeresSteg/Adopsjon",component:c,render:({gåTilNesteSide:me=Oe("button-click"),hvemPlanlegger:pe,fordeling:ke,hvorLangPeriode:ve,omBarnet:ue,arbeidssituasjon:Me,stønadskontoer:Re})=>F.jsx(Fe,{initialEntries:[Pe.PLANEN_DERES],children:F.jsx(ce,{onDispatch:me,initialState:{[s.FORDELING]:ke,[s.HVOR_LANG_PERIODE]:ve,[s.HVEM_PLANLEGGER]:pe,[s.OM_BARNET]:ue,[s.ARBEIDSSITUASJON]:Me},children:F.jsx(c,{stønadskontoer:Re})})})},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-08",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:fe.HUNDRE_PROSENT},arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80}],minsteretter:O},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101}],minsteretter:O}}}},t={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:O},80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:O}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},d={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},i={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},l={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},m={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},p={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}};var P;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:n.MOR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(P=t.args)==null?void 0:P.stønadskontoer}};var f;const v={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(f=t.args)==null?void 0:f.stønadskontoer}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:261}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:200}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},R={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-07",fødselsdato:"2020-04-11",antallBarn:"1"}}};var H,T,A;r.parameters={...r.parameters,docs:{...(H=r.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-07-08',
      fødselsdato: '2020-04-11',
      antallBarn: '1'
    },
    fordeling: {
      antallDagerSøker1: 0
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
          dager: 101
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(A=(T=r.parameters)==null?void 0:T.docs)==null?void 0:A.source}}};var E,b,S;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
          dager: 291
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...(S=(b=t.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var y,B,U;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(U=(B=g.parameters)==null?void 0:B.docs)==null?void 0:U.source}}};var K,j,_;d.parameters={...d.parameters,docs:{...(K=d.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
          dager: 150
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(_=(j=d.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var D,h,G;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(G=(h=i.parameters)==null?void 0:h.docs)==null?void 0:G.source}}};var I,N,J;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(J=(N=l.parameters)==null?void 0:N.docs)==null?void 0:J.source}}};var x,L,C;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorErUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(C=(L=m.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var V,q,w;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...(w=(q=p.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};var z,Q,W;k.parameters={...k.parameters,docs:{...(z=k.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      type: HvemPlanleggerType.MOR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...(W=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;v.parameters={...v.parameters,docs:{...(X=v.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    },
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: undefined
    },
    stønadskontoer: MorOgFarKunMorHarRett.args?.stønadskontoer
  }
}`,...(Z=(Y=v.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...(re=(ee=a.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,te,oe;u.parameters={...u.parameters,docs:{...(ne=u.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 261
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 200
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(oe=(te=u.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ae,se,ge;M.parameters={...M.parameters,docs:{...(ae=M.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 150
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...(ge=(se=M.parameters)==null?void 0:se.docs)==null?void 0:ge.source}}};var de,ie,le;R.parameters={...R.parameters,docs:{...(de=R.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    },
    omBarnet: {
      erFødsel: false,
      overtakelsesdato: '2024-07-07',
      fødselsdato: '2020-04-11',
      antallBarn: '1'
    }
  }
}`,...(le=(ie=R.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const Fr=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{v as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,u as FarOgFarKunFarHarRett,M as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,g as MorOgFarKunFarHarRettMorErUfør,d as MorOgFarKunFarHarRettMorIngenAvDisse,t as MorOgFarKunMorHarRett,i as MorOgMedmorBeggeHarRett,m as MorOgMedmorKunMedmorHarRettMorErUfør,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,l as MorOgMedmorKunMorHarRett,R as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,Fr as __namedExportsOrder,Or as default};
