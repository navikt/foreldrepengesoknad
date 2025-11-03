import{j as F}from"./iframe-BQxww76a.js";import{M as p,P as B,C as l}from"./usePlanleggerNavigator-Ck9vOT7O.js";import{P as D}from"./routes-Cyl7_Mgv.js";import{A as e}from"./Arbeidssituasjon-i2z_eSVB.js";import{H as r}from"./HvemPlanleggerUtils-CHkpTJRV.js";import{H as k}from"./HvorLangPeriodeSteg-CVbld8kU.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-D-NAEnpB.js";import"./BlueRadioGroup-BDiCkwzS.js";import"./customErrorFormatter-BIGTm8E9.js";import"./PlanleggerStepPage-BSLQ1IKi.js";import"./Dekningsgrad-Bg_cIyqc.js";import"./hvemHarRettUtils-XiSusMmo.js";import"./uttakUtils-Cldiv8vK.js";import"./useScrollBehaviour-DEWDi70q.js";import"./PersonGroup-CU3s7x2y.js";import"./Spacer-YS1D6Su9.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,n={farRundtFødsel:10,toTette:0},h={title:"steg/HvorLangPeriodeSteg",component:k,render:({hvemPlanlegger:m,omBarnet:O,arbeidssituasjon:T,stønadskontoer:u,gåTilNesteSide:P=v("button-click")})=>F.jsx(p,{initialEntries:[D.HVOR_LANG_PERIODE],children:F.jsx(B,{initialState:{[l.HVEM_PLANLEGGER]:m,[l.OM_BARNET]:O,[l.ARBEIDSSITUASJON]:T},onDispatch:P,children:F.jsx(k,{stønadskontoer:u})})})},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-03",antallBarn:"1"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n},100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n}}}},a={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,fødselsdato:"2025-07-08",overtakelsesdato:"2025-07-08"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n},100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n}}}},o={args:{...t.args,omBarnet:{...t.args.omBarnet,antallBarn:"2"},hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_MEDMOR},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:207},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n},100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:165},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n}}}},s={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:r.MOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:e.JOBBER},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n},100:{kontoer:[{konto:"FORELDREPENGER",dager:230},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:n}}}},E={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:r.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:e.INGEN,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},R={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-07-01",erFødsel:!1,overtakelsesdato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},d={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Hugo Utvikler",type:r.FAR_OG_FAR},omBarnet:{erBarnetFødt:!0,fødselsdato:"2024-01-01",erFødsel:!0,antallBarn:"1"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:250}],minsteretter:{farRundtFødsel:10,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:200}],minsteretter:{farRundtFødsel:10,toTette:0}}}}},g={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"2"},arbeidssituasjon:{status:e.JOBBER},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:n},100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:n}}}},i={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-07-01",antallBarn:"1"},arbeidssituasjon:{status:e.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-03',
      antallBarn: '1'
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
      } satisfies KontoBeregningDto_fpoversikt,
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
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      antallBarn: '1',
      erFødsel: false,
      fødselsdato: '2025-07-08',
      overtakelsesdato: '2025-07-08'
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
      } satisfies KontoBeregningDto_fpoversikt,
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
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...FlereForsørgereEttBarnKunMorHarRett.args,
    omBarnet: {
      ...FlereForsørgereEttBarnKunMorHarRett.args.omBarnet,
      antallBarn: '2'
    },
    hvemPlanlegger: {
      navnPåMedmor: 'Esther Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
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
          dager: 207
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      } satisfies KontoBeregningDto_fpoversikt,
      '100': {
        kontoer: [{
          konto: 'MØDREKVOTE',
          dager: 75
        }, {
          konto: 'FEDREKVOTE',
          dager: 75
        }, {
          konto: 'FELLESPERIODE',
          dager: 165
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
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
      } satisfies KontoBeregningDto_fpoversikt,
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }, {
          konto: 'FORELDREPENGER_FØR_FØDSEL',
          dager: 15
        }],
        minsteretter: MINSTERETTER
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...s.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
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
      } satisfies KontoBeregningDto_fpoversikt,
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
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...E.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      fødselsdato: '2024-07-01',
      erFødsel: false,
      overtakelsesdato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
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
      } satisfies KontoBeregningDto_fpoversikt,
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
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...R.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Hugo Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      fødselsdato: '2024-01-01',
      erFødsel: true,
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: false
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 250
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      } satisfies KontoBeregningDto_fpoversikt,
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 200
        }],
        minsteretter: {
          farRundtFødsel: 10,
          toTette: 0
        }
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '2'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    stønadskontoer: {
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 291
        }],
        minsteretter: MINSTERETTER
      } satisfies KontoBeregningDto_fpoversikt,
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 230
        }],
        minsteretter: MINSTERETTER
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...g.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-07-01',
      antallBarn: '1'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 125
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 75
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      } satisfies KontoBeregningDto_fpoversikt,
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 166
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 95
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      } satisfies KontoBeregningDto_fpoversikt
    }
  }
}`,...i.parameters?.docs?.source}}};const J=["FlereForsørgereEttBarnKunMorHarRett","FlereForsørgereEttBarnBeggeHarRettAdopsjon","FlereForsørgereToBarn","AleneforsørgerMorEttBarn","FlereForsørgereKunFarHarRett","FlereForsørgereFarOgFarKunFar1HarRettAdopsjon","FlereForsørgereFarOgFarKunFar1HarRettFødsel","AleneforsørgerFarToBarn","FarOgFarBeggeHarRett"];export{g as AleneforsørgerFarToBarn,s as AleneforsørgerMorEttBarn,i as FarOgFarBeggeHarRett,a as FlereForsørgereEttBarnBeggeHarRettAdopsjon,t as FlereForsørgereEttBarnKunMorHarRett,R as FlereForsørgereFarOgFarKunFar1HarRettAdopsjon,d as FlereForsørgereFarOgFarKunFar1HarRettFødsel,E as FlereForsørgereKunFarHarRett,o as FlereForsørgereToBarn,J as __namedExportsOrder,h as default};
