import"./iframe-gHXU7Rrw.js";import{H as n}from"./HvemPlanleggerUtils-CYYnqd9w.js";import{C as t}from"./CalendarLabels-SBO2XzqK.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-DhXUboP0.js";import"./hvemHarRettUtils-CaHg86U9.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-BIcZ-obr.js";import"./BarnehageplassSteg-DHW4jAAH.js";import"./usePlanleggerNavigator-CRGxsD_E.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-B7Eleq4g.js";import"./uttakUtils-CoTmKVrD.js";import"./useScrollBehaviour-CSDWWSTT.js";import"./BabyWrapped-CK86-sdZ.js";import"./Information-CgXf48ay.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FamiliehendelseLabel-DUWj-Y18.js";const P={title:"CalendarLabels",component:t},e={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-05",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},r={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-04",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    },
    // legger inn tapt dag mellom termindato og første dag av mødrekvote
    {
      fom: '2025-08-05',
      tom: '2025-11-17',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE'
    }] satisfies SaksperiodeNy[],
    barnet: {
      erFødsel: true,
      antallBarn: '1',
      erBarnetFødt: true,
      fødselsdato: '2025-08-03',
      termindato: '2025-08-03'
    },
    hvemHarRett: 'beggeHarRett',
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Kari',
      navnPåFar: 'Ola'
    },
    inneholderTapteDager: true
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: 'MOR',
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    }, {
      fom: '2025-08-04',
      tom: '2025-11-17',
      forelder: 'MOR',
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: 'MOR',
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: 'FAR_MEDMOR',
      kontoType: 'FEDREKVOTE'
    }] satisfies SaksperiodeNy[],
    barnet: {
      erFødsel: true,
      antallBarn: '1',
      erBarnetFødt: true,
      fødselsdato: '2025-08-04',
      termindato: '2025-08-04'
    },
    hvemHarRett: 'beggeHarRett',
    hvemPlanlegger: {
      type: HvemPlanleggerType.MOR_OG_FAR,
      navnPåMor: 'Kari',
      navnPåFar: 'Ola'
    },
    inneholderTapteDager: false
  }
}`,...r.parameters?.docs?.source}}};const _=["MorSøkerMedTapteDager","MorSøkerUtenTapteDager"];export{e as MorSøkerMedTapteDager,r as MorSøkerUtenTapteDager,_ as __namedExportsOrder,P as default};
