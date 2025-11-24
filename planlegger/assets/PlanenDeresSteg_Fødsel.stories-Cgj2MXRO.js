import{j as k}from"./iframe-Wty8Loba.js";import{M as D,P as K,C as s}from"./usePlanleggerNavigator-Lo8-lb1f.js";import{P as A}from"./routes-Cyl7_Mgv.js";import{A as n,H as r}from"./HvemPlanleggerUtils-BMHW_fxe.js";import{P as M}from"./PlanenDeresSteg-De8ko1so.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-B2gxGhQV.js";import"./PlanleggerStepPage-Chug6eJN.js";import"./FordelingSteg-DT5IqVuM.js";import"./customErrorFormatter-2-33wFyv.js";import"./hvemHarRettUtils-CHepebtj.js";import"./uttakUtils-C6KPBSxo.js";import"./useScrollBehaviour-DkVOp9VI.js";import"./BarnehageplassSteg-DgIGiuU1.js";import"./BabyWrapped-B16SS9iI.js";import"./Information-BnSm_tnD.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./OmÅTilpassePlanen-DtycBQBf.js";import"./PersonPregnant-By98u2lX.js";import"./PersonGroup-DqALX9km.js";import"./PencilWriting-B2zZyBjy.js";import"./UforutsetteEndringer-CZ4RNmzM.js";import"./ToggleGroup-DYUjAPTW.js";const{action:S}=__STORYBOOK_MODULE_ACTIONS__,o={farRundtFødsel:10,toTette:0},ne={title:"steg/PlanenDeresSteg/Fødsel",component:M,render:({gåTilNesteSide:p=S("button-click"),hvemPlanlegger:c,fordeling:P,hvorLangPeriode:v,omBarnet:I,arbeidssituasjon:_,stønadskontoer:f})=>k.jsx(D,{initialEntries:[A.PLANEN_DERES],children:k.jsx(K,{onDispatch:p,initialState:{[s.FORDELING]:P,[s.HVOR_LANG_PERIODE]:v,[s.HVEM_PLANLEGGER]:c,[s.OM_BARNET]:I,[s.ARBEIDSSITUASJON]:_},children:k.jsx(M,{stønadskontoer:f})})})},e={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2024-07-01",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o},100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o}}}},t={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o},100:{kontoer:[{konto:"FORELDREPENGER",dager:230},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o}}}},g={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:n.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},d={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},E={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},R={args:{...t.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},i={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},l={args:{...d.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},m={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:r.MOR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:t.args?.stønadskontoer}},F={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:o},100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:o}}}},a={args:{...e.args,fordeling:void 0,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},O={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:n.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:291}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:230}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},T={args:{...e.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      dekningsgrad: '100'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'MØDREKVOTE',
          dager: 95
        }, {
          konto: 'FEDREKVOTE',
          dager: 95
        }, {
          konto: 'FELLESPERIODE',
          dager: 101
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: 'MØDREKVOTE',
          dager: 75
        }, {
          konto: 'FEDREKVOTE',
          dager: 75
        }, {
          konto: 'FELLESPERIODE',
          dager: 80
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
          konto: 'FORELDREPENGER',
          dager: 291
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...t.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
          konto: 'FORELDREPENGER',
          dager: 166
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 125
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
          konto: 'FORELDREPENGER',
          dager: 211
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 150
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...d.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...E.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...R.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
          konto: 'FORELDREPENGER',
          dager: 291
        }],
        minsteretter: MINSTERETTER
      },
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...F.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...a.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...O.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 291
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 230
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      }
    }
  }
}`,...u.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}};const re=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{F as BareFarSøkerOgHarRett,m as BareMorSøkerOgHarRett,T as BarnetErFødtDagenEtterTermindato,a as FarOgFarBeggeHarRett,O as FarOgFarKunFarHarRett,u as FarOgFarKunMedfarHarRett,e as MorOgFarBeggeHarRett,d as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,t as MorOgFarKunMorHarRett,E as MorOgMedmorBeggeHarRett,l as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,i as MorOgMedmorKunMedmorHarRettMorUfør,R as MorOgMedmorKunMorHarRett,re as __namedExportsOrder,ne as default};
