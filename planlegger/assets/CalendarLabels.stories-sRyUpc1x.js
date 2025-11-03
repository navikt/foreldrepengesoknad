import{a0 as e}from"./iframe-BXBZKDVn.js";import{H as n}from"./HvemPlanleggerUtils-BYD4XHud.js";import{C as t}from"./CalendarLabels-C2A3Ak0e.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-lilmROvh.js";import"./hvemHarRettUtils-C6_Jrxsi.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-TDLntCqH.js";import"./BarnehageplassSteg-C1-VyQla.js";import"./usePlanleggerNavigator-ClkpMoTR.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-BoelLzOk.js";import"./uttakUtils-CHM-8UEs.js";import"./useScrollBehaviour-koDUDfJH.js";import"./BabyWrapped-CHxICpa8.js";import"./Information-qSxxtrAF.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FamiliehendelseLabel-TZql0ag_.js";const u={title:"CalendarLabels",component:t},r={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-05",tom:"2025-11-17",forelder:e.mor,kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:e.mor,kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:e.farMedmor,kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},o={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:e.mor,kontoType:"FORELDREPENGER_FØR_FØDSEL"},{fom:"2025-08-04",tom:"2025-11-17",forelder:e.mor,kontoType:"MØDREKVOTE"},{fom:"2025-11-18",tom:"2026-03-10",forelder:e.mor,kontoType:"FELLESPERIODE"},{fom:"2026-03-11",tom:"2026-06-24",forelder:e.farMedmor,kontoType:"FEDREKVOTE"}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:n.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    },
    // legger inn tapt dag mellom termindato og første dag av mødrekvote
    {
      fom: '2025-08-05',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
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
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: 'FORELDREPENGER_FØR_FØDSEL'
    }, {
      fom: '2025-08-04',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: 'MØDREKVOTE'
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: 'FELLESPERIODE'
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
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
}`,...o.parameters?.docs?.source}}};const v=["MorSøkerMedTapteDager","MorSøkerUtenTapteDager"];export{r as MorSøkerMedTapteDager,o as MorSøkerUtenTapteDager,v as __namedExportsOrder,u as default};
