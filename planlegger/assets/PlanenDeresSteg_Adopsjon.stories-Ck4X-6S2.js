import{j as F}from"./iframe-CPqy_GpJ.js";import{M as A,P as K,C as o}from"./usePlanleggerNavigator-Bp823Xiz.js";import{P as b}from"./routes-Cyl7_Mgv.js";import{A as t}from"./Arbeidssituasjon-i2z_eSVB.js";import{H as r}from"./HvemPlanleggerUtils-DmkGvhNR.js";import{P as p}from"./PlanenDeresSteg-isQO74Hb.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-D2LayTNC.js";import"./PlanleggerStepPage-BpSgPf8-.js";import"./FordelingSteg-DYNHsyzL.js";import"./customErrorFormatter-D9lq2oJP.js";import"./hvemHarRettUtils-BaSznbJL.js";import"./uttakUtils-C1kNIKIr.js";import"./useScrollBehaviour-wnx_ulCS.js";import"./Spacer-DwkoMG2v.js";import"./CalendarLabels-C712pX7a.js";import"./CalendarIconLabel-B_Nff1pR.js";import"./BarnehageplassSteg-sK2ctlOG.js";import"./BabyWrapped-B5VjA-mj.js";import"./Information-VZCk5prT.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FamiliehendelseLabel-OdiBnB2c.js";import"./OmÅTilpassePlanen-CykZEWZh.js";import"./PersonPregnant-BDOI0zDI.js";import"./PencilWriting-Cm_w8fPo.js";import"./PersonGroup-CKLhu74d.js";import"./UforutsetteEndringer-D3-xcoWV.js";import"./ToggleGroup-DgBgAhyq.js";const{action:_}=__STORYBOOK_MODULE_ACTIONS__,k={farRundtFødsel:0,toTette:0},se={title:"steg/PlanenDeresSteg/Adopsjon",component:p,render:({gåTilNesteSide:T=_("button-click"),hvemPlanlegger:v,fordeling:c,hvorLangPeriode:P,omBarnet:f,arbeidssituasjon:I,stønadskontoer:H})=>F.jsx(A,{initialEntries:[b.PLANEN_DERES],children:F.jsx(K,{onDispatch:T,initialState:{[o.FORDELING]:c,[o.HVOR_LANG_PERIODE]:P,[o.HVEM_PLANLEGGER]:v,[o.OM_BARNET]:f,[o.ARBEIDSSITUASJON]:I},children:F.jsx(p,{stønadskontoer:H})})})},e={args:{hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåFar:"Espen Utvikler",type:r.MOR_OG_FAR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-08",fødselsdato:"2020-04-11",antallBarn:"1"},fordeling:{antallDagerSøker1:0},hvorLangPeriode:{dekningsgrad:"100"},arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80}],minsteretter:k},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101}],minsteretter:k}}}},n={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!1},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:230}],minsteretter:k},80:{kontoer:[{konto:"FORELDREPENGER",dager:291}],minsteretter:k}}}},s={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:125},{konto:"AKTIVITETSFRI_KVOTE",dager:75}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:166},{konto:"AKTIVITETSFRI_KVOTE",dager:95}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},g={args:{...e.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},d={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},i={args:{...n.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},l={args:{...s.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},R={args:{...g.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR}}},E={args:{...e.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",type:r.MOR},fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:void 0},stønadskontoer:n.args?.stønadskontoer}},m={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",type:r.FAR},fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:void 0},stønadskontoer:n.args?.stønadskontoer}},a={args:{...e.args,hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:r.FAR_OG_FAR}}},O={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:t.JOBBER,jobberAnnenPart:!1},stønadskontoer:{80:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:261}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:"AKTIVITETSFRI_KVOTE",dager:200}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},u={args:{...a.args,fordeling:void 0,arbeidssituasjon:{status:t.UFØR,jobberAnnenPart:!0},stønadskontoer:{80:{kontoer:[{konto:"FORELDREPENGER",dager:211},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}},100:{kontoer:[{konto:"FORELDREPENGER",dager:150},{konto:"AKTIVITETSFRI_KVOTE",dager:50}],minsteretter:{farRundtFødsel:0,toTette:0}}}}},M={args:{...n.args,hvemPlanlegger:{navnPåMor:"Olga Utvikler",navnPåMedmor:"Helga Utvikler",type:r.MOR_OG_MEDMOR},omBarnet:{erFødsel:!1,overtakelsesdato:"2024-07-07",fødselsdato:"2020-04-11",antallBarn:"1"}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
      dekningsgrad: '100'
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    stønadskontoer: {
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
        }],
        minsteretter: MINSTERETTER
      },
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
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
          konto: 'FORELDREPENGER',
          dager: 230
        }],
        minsteretter: MINSTERETTER
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 291
        }],
        minsteretter: MINSTERETTER
      }
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
      },
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
      }
    }
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
      '100': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 150
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '80': {
        kontoer: [{
          konto: 'FORELDREPENGER',
          dager: 211
        }, {
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 50
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunMorHarRett.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorErUfør.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...l.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarKunFarHarRettMorIngenAvDisse.args,
    hvemPlanlegger: {
      navnPåMor: 'Olga Utvikler',
      navnPåMedmor: 'Helga Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
    }
  }
}`,...R.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...MorOgFarBeggeHarRett.args,
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
          dager: 261
        }],
        minsteretter: {
          farRundtFødsel: 0,
          toTette: 0
        }
      },
      '100': {
        kontoer: [{
          konto: 'AKTIVITETSFRI_KVOTE',
          dager: 200
        }],
        minsteretter: {
          farRundtFødsel: 0,
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
      status: Arbeidsstatus.UFØR,
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
          farRundtFødsel: 0,
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
          farRundtFødsel: 0,
          toTette: 0
        }
      }
    }
  }
}`,...u.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};const ge=["MorOgFarBeggeHarRett","MorOgFarKunMorHarRett","MorOgFarKunFarHarRettMorErUfør","MorOgFarKunFarHarRettMorIngenAvDisse","MorOgMedmorBeggeHarRett","MorOgMedmorKunMorHarRett","MorOgMedmorKunMedmorHarRettMorErUfør","MorOgMedmorKunMedmorHarRettMorIngenAvDisse","BareMorSøkerOgHarRett","BareFarSøkerOgHarRett","FarOgFarBeggeHarRett","FarOgFarKunFarHarRett","FarOgFarKunMedfarHarRett","MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen"];export{m as BareFarSøkerOgHarRett,E as BareMorSøkerOgHarRett,a as FarOgFarBeggeHarRett,O as FarOgFarKunFarHarRett,u as FarOgFarKunMedfarHarRett,e as MorOgFarBeggeHarRett,s as MorOgFarKunFarHarRettMorErUfør,g as MorOgFarKunFarHarRettMorIngenAvDisse,n as MorOgFarKunMorHarRett,d as MorOgMedmorBeggeHarRett,l as MorOgMedmorKunMedmorHarRettMorErUfør,R as MorOgMedmorKunMedmorHarRettMorIngenAvDisse,i as MorOgMedmorKunMorHarRett,M as MorOgMedmorKunMorHarRettOmsorgsovertakelseIHelgen,ge as __namedExportsOrder,se as default};
