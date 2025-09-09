import{l as e,j as c}from"./iframe-qlLyz47e.js";import{M as b,P as B,C as d}from"./usePlanleggerNavigator-CL2qjhXF.js";import{P as y}from"./routes-Cyl7_Mgv.js";import{A as n}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as K}from"./Dekningsgrad-Bg_cIyqc.js";import{H as t}from"./HvemPlanleggerUtils-bS7ol6_i.js";import{P as O}from"./PlanenDeresSteg-BZka6Cc3.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-BI4Rud8J.js";import"./PlanleggerStepPage-OB7l9i9E.js";import"./FordelingSteg-BHTcdIJk.js";import"./customErrorFormatter-CYgrU2bJ.js";import"./hvemHarRettUtils-Ho3gJQFv.js";import"./uttakUtils-BQR95S8z.js";import"./useScrollBehaviour-C2pHivVr.js";import"./Spacer-DiMQOD6l.js";import"./CalendarLabels-CWinH-ld.js";import"./CalendarIconLabel-B6xlPTW1.js";import"./BarnehageplassSteg-CEpfrGWR.js";import"./BabyWrapped-DN_xQpFK.js";import"./Information-Da-bjfYM.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./FamiliehendelseLabel-Bs4bT45T.js";import"./OmÅTilpassePlanen-BLm1QhkH.js";import"./PersonPregnant-pRwVTbwm.js";import"./PencilWriting-Cbw4nY2C.js";import"./PersonGroup-CiNzCx3j.js";import"./UforutsetteEndringer-DYmxHPJ8.js";import"./ToggleGroup-R0tnxlzV.js";const{action:_}=__STORYBOOK_MODULE_ACTIONS__,s={farRundtFødsel:10,toTette:0},ie={title:"steg/PlanenDeresSteg/Fødsel",component:O,render:({gåTilNesteSide:f=_("button-click"),hvemPlanlegger:T,fordeling:P,hvorLangPeriode:E,omBarnet:A,arbeidssituasjon:S,stønadskontoer:H})=>c.jsx(b,{initialEntries:[y.PLANEN_DERES],children:c.jsx(B,{onDispatch:f,initialState:{[d.FORDELING]:P,[d.HVOR_LANG_PERIODE]:E,[d.HVEM_PLANLEGGER]:T,[d.OM_BARNET]:A,[d.ARBEIDSSITUASJON]:S},children:c.jsx(O,{stønadskontoer:H})})})},r={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:t.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-01",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:K.HUNDRE_PROSENT},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},o={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:s}}}},g={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:166},{konto:e.AktivitetsfriKvote,dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:125},{konto:e.AktivitetsfriKvote,dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},i={args:{...r.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:211},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.Foreldrepenger,dager:150},{konto:e.AktivitetsfriKvote,dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},l={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},k={args:{...o.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},m={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},p={args:{...i.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:t.MOR_OG_MEDMOR}}},u={args:{...r.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:t.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:o.args?.stønadskontoer}},v={args:{...r.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:t.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:e.Foreldrepenger,dager:291}],minsteretter:s},100:{kontoer:[{konto:e.Foreldrepenger,dager:230}],minsteretter:s}}}},a={args:{...r.args,fordeling:void 0,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:t.FAR_OG_FAR},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},F={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},R={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:e.AktivitetsfriKvote,dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:e.AktivitetsfriKvote,dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},M={args:{...r.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2024-07-01',
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
          dager: 291
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
}`,...o.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
          dager: 166
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
}`,...g.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
          dager: 211
        }, {
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
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
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...l.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...k.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.Foreldrepenger,
          dager: 291
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
}`,...v.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    fordeling: undefined,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...a.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...F.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: StønadskontoType.AktivitetsfriKvote,
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...R.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};const le=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{v as BareFarSøkerOgHarRett,u as BareMorSøkerOgHarRett,M as BarnetErFødtDagenEtterTermindato,a as FarOgFarBeggeHarRett,F as FarOgFarKunFarHarRett,R as FarOgFarKunMedfarHarRett,r as MorOgFarBeggeHarRett,i as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,o as MorOgFarKunMorHarRett,l as MorOgMedmorBeggeHarRett,p as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,m as MorOgMedmorKunMedmorHarRettMorUfør,k as MorOgMedmorKunMorHarRett,le as __namedExportsOrder,ie as default};
