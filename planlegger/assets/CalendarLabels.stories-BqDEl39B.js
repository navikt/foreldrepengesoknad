import"./iframe-n6-YopwE.js";import{H as n}from"./HvemPlanleggerUtils-B51YL1Zs.js";import{C as t}from"./CalendarLabels-Di8lFUMp.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Dyg3uo-b.js";import"./hvemHarRettUtils-6pkcisRk.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-BY_NnEAU.js";import"./BarnehageplassSteg-CTEZq76_.js";import"./usePlanleggerNavigator-CLvJwV9n.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-JWePG97O.js";import"./uttakUtils-BvwyIqXZ.js";import"./useScrollBehaviour-C-tEOr8l.js";import"./BabyWrapped-CFa9LKf8.js";import"./Information-CfA0h6he.js";import"./umamiUtils-DYttlg2n.js";import"./umami-ByrVcZcw.js";import"./FamiliehendelseLabel-BdnaerHF.js";const P={title:"CalendarLabels",component:t},e={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-05",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},r={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:"MOR",kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-04",tom:"2025-11-17",forelder:"MOR",kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:"MOR",kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:"FAR_MEDMOR",kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
