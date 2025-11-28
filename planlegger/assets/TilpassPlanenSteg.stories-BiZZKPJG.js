import{j as p}from"./iframe-CnLIlUh2.js";import{M as S,P as A,C as t}from"./usePlanleggerNavigator-Dc5XJv33.js";import{P as H}from"./routes-Cyl7_Mgv.js";import{A as r,H as n}from"./HvemPlanleggerUtils-D-Flf6We.js";import{T as k}from"./TilpassPlanenSteg-BfnIgm4G.js";import"./preload-helper-PPVm8Dsz.js";import"./barnetUtils-BdXZi2BI.js";import"./hvemHarRettUtils-BOgh49jt.js";import"./useLagUttaksplanForslag-DwzawWWS.js";import"./uttakUtils-T01aqi0A.js";import"./useScrollBehaviour-D8ARp_H4.js";import"./PlanleggerStepPage-DuaX5OCm.js";import"./ToggleGroup-CLD9g4Bd.js";import"./BarnehageplassSteg-B169q3QX.js";import"./BabyWrapped-DptBG05g.js";import"./Information-DLjbd9Li.js";import"./umamiUtils-Bw37iN91.js";import"./umami-BV0wnPmZ.js";import"./HvaErMulig-CJ89iK48.js";import"./PersonPregnant-7QPCQuCT.js";import"./PersonGroup-ByjUWdgC.js";import"./PencilWriting-CnLtKFXr.js";const{action:b}=__STORYBOOK_MODULE_ACTIONS__,o={farRundtFødsel:10,toTette:0},ee={title:"steg/TilpassPlanenSteg",component:k,render:({gåTilNesteSide:P=b("button-click"),hvemPlanlegger:c,fordeling:T,hvorLangPeriode:v,omBarnet:D,arbeidssituasjon:f,stønadskontoer:_,uttaksplan:L})=>p.jsx(S,{initialEntries:[H.PLANEN_DERES],children:p.jsx(A,{onDispatch:P,initialState:{[t.FORDELING]:T,[t.HVOR_LANG_PERIODE]:v,[t.HVEM_PLANLEGGER]:c,[t.OM_BARNET]:D,[t.ARBEIDSSITUASJON]:f,[t.UTTAKSPLAN]:L},children:p.jsx(k,{stønadskontoer:_})})})},e={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erFødsel:!0,erBarnetFødt:!1,termindato:"2025-05-09",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o},100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o}},uttaksplan:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"MØDREKVOTE",fom:"2025-05-09",tom:"2025-08-21"},{forelder:"MOR",kontoType:"FELLESPERIODE",fom:"2025-08-22",tom:"2025-12-11"},{forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE",fom:"2025-12-12",tom:"2026-03-26"}]}},s={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o},100:{kontoer:[{konto:"FORELDREPENGER",dager:230},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:o}},uttaksplan:[{forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL",fom:"2025-04-18",tom:"2025-05-08"},{forelder:"MOR",kontoType:"FORELDREPENGER",fom:"2025-05-09",tom:"2026-03-26"}]}},g={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:r.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},E={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},R={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},d={args:{...s.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},i={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},l={args:{...E.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:n.MOR_OG_MEDMOR}}},m={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:n.MOR},fordeling:void 0,arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:void 0}}},O={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:n.FAR},fordeling:void 0,arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:void 0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:o},100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:o}}}},a={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR}}},F={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:r.JOBBER,jobberAnnenPart:!1}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:r.INGEN,jobberAnnenPart:!0}}},M={args:{...e.args,omBarnet:{erFødsel:!0,erBarnetFødt:!0,termindato:"2024-04-11",fødselsdato:"2024-04-12",antallBarn:"1"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erFødsel: true,
      erBarnetFødt: false,
      termindato: '2025-05-09',
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
    },
    uttaksplan: [{
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE',
      fom: '2025-05-09',
      tom: '2025-08-21'
    }, {
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE',
      fom: '2025-08-22',
      tom: '2025-12-11'
    }, {
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE',
      fom: '2025-12-12',
      tom: '2026-03-26'
    }]
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    },
    uttaksplan: [{
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL',
      fom: '2025-04-18',
      tom: '2025-05-08'
    }, {
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER',
      fom: '2025-05-09',
      tom: '2026-03-26'
    }]
  }
}`,...s.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...R.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
    }
  }
}`,...m.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    }
  }
}`,...a.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    }
  }
}`,...F.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...FarOgFarBeggeHarRett.args,
    fordeling: undefined,
    arbeidssituasjon: {
      status: Arbeidsstatus.INGEN,
      jobberAnnenPart: true
    }
  }
}`,...u.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};const re=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","BarnetErFødtDagenEtterTermindato"];export{O as BareFarSøkerOgHarRett,m as BareMorSøkerOgHarRett,M as BarnetErFødtDagenEtterTermindato,a as FarOgFarBeggeHarRett,F as FarOgFarKunFarHarRett,u as FarOgFarKunMedfarHarRett,e as MorOgFarBeggeHarRett,E as MorOgFarKunFarHarRettMorIngenAvDisse,g as MorOgFarKunFarHarRettMorUfør,s as MorOgFarKunMorHarRett,R as MorOgMedmorBeggeHarRett,l as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,i as MorOgMedmorKunMedmorHarRettMorUfør,d as MorOgMedmorKunMorHarRett,re as __namedExportsOrder,ee as default};
