import{j as F}from"./jsx-runtime-CLpGMVip.js";import{a as Fe}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as ce,P as fe,C as s}from"./usePlanleggerNavigator-D71TYjW0.js";import{P as Pe}from"./routes-Cyl7_Mgv.js";import{A as o}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as He}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-CSnBkBaN.js";import"./VeiviserPage-w-Nd3-7v.js";import{H as n}from"./HvemPlanleggerType-CugjyLV2.js";import{P as c}from"./PlanenDeresSteg-MvYyM1Qf.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./HvemPlanleggerUtils-CuWBEANq.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-CqUqCI0t.js";import"./barnType-CnRI8jWg.js";import"./StepButtonsHookForm-B7FbpMch.js";import"./VStack-2apmvZh_.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./dateFormValidation-DRA3PDrN.js";import"./validation-DYlyn1BB.js";import"./Briefcase-Dm7XPCF2.js";import"./ExpansionCard-DwDasH02.js";import"./Checkmark-DkUBrDzq.js";import"./Exclamationmark-BUUUNLix.js";import"./PlanleggerStepPage-BAnTZ_4-.js";import"./FordelingSteg-CWXVjGUj.js";import"./customErrorFormatter-RUbEXImz.js";import"./hvemHarRettUtils-Bxt4aTQI.js";import"./uttakUtils-BL_mSb2L.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Spacer-DmBY75Fg.js";import"./UttaksplanKalender-DdCOTKFH.js";import"./iframe-j4jHCxl6.js";import"./CalendarLabels-DMxvOs88.js";import"./CalendarIconLabel-BOJSa9tn.js";import"./BarnehageplassSteg-D8yXvSEn.js";import"./BabyWrapped-DCZKpL80.js";import"./Information-QBdnpqYL.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FamiliehendelseLabel-BnQ2MKjk.js";import"./OmÅTilpassePlanen-BBw4oQuF.js";import"./PersonPregnant-D17zo54f.js";import"./PencilWriting-BJaABnDH.js";import"./PersonGroup-B--Zxy9X.js";import"./UforutsetteEndringer-D-7lvOJM.js";import"./ToggleGroup-DW9ZpSPC.js";const O={farRundtFødsel:0,toTette:0},cr={title:"steg/PlanenDeresSteg/Adopsjon",component:c,render:({gåTilNesteSide:me=Fe("button-click"),hvemPlanlegger:pe,fordeling:ke,hvorLangPeriode:ue,omBarnet:ve,arbeidssituasjon:Me,stønadskontoer:Re,locale:Oe})=>F.jsx(ce,{initialEntries:[Pe.PLANEN_DERES],children:F.jsx(fe,{onDispatch:me,initialState:{[s.FORDELING]:ke,[s.HVOR_LANG_PERIODE]:ue,[s.HVEM_PLANLEGGER]:pe,[s.OM_BARNET]:ve,[s.ARBEIDSSITUASJON]:Me},children:F.jsx(c,{stønadskontoer:Re,locale:Oe})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-08",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:He.HUNDRE_PROSENT},arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80}],minsteretter:O},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101}],minsteretter:O}}}},t={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:O},80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:O}}}},d={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},i={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},l={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},m={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},p={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}};var f;const k={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:n.MOR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(f=t.args)==null?void 0:f.stønadskontoer}};var P;const u={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:void 0},stønadskontoer:(P=t.args)==null?void 0:P.stønadskontoer}},a={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR}}},v={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:261}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:200}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:o.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},R={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-07",fødselsdato:"2020-04-11",antallBarn:"1"}}};var H,T,A;r.parameters={...r.parameters,docs:{...(H=r.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
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
}`,...(S=(b=t.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var y,B,U;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(U=(B=d.parameters)==null?void 0:B.docs)==null?void 0:U.source}}};var K,j,_;g.parameters={...g.parameters,docs:{...(K=g.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(_=(j=g.parameters)==null?void 0:j.docs)==null?void 0:_.source}}};var D,h,G;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(W=(Q=k.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};var X,Y,Z;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
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
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...(re=(ee=a.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ne,te,oe;v.parameters={...v.parameters,docs:{...(ne=v.parameters)==null?void 0:ne.docs,source:{originalSource:`{
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
}`,...(oe=(te=v.parameters)==null?void 0:te.docs)==null?void 0:oe.source}}};var ae,se,de;M.parameters={...M.parameters,docs:{...(ae=M.parameters)==null?void 0:ae.docs,source:{originalSource:`{
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
}`,...(de=(se=M.parameters)==null?void 0:se.docs)==null?void 0:de.source}}};var ge,ie,le;R.parameters={...R.parameters,docs:{...(ge=R.parameters)==null?void 0:ge.docs,source:{originalSource:`{
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
}`,...(le=(ie=R.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const fr=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{u as BareFarSøkerOgHarRett,k as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,v as FarOgFarKunFarHarRett,M as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,d as MorOgFarKunFarHarRettMorErUfør,g as MorOgFarKunFarHarRettMorIngenAvDisse,t as MorOgFarKunMorHarRett,i as MorOgMedmorBeggeHarRett,m as MorOgMedmorKunMedmorHarRettMorErUfør,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,l as MorOgMedmorKunMorHarRett,R as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,fr as __namedExportsOrder,cr as default};
