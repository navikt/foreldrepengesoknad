import{l as e,a2 as r}from"./iframe-7JIcCJIF.js";import{H as t}from"./HvemPlanleggerUtils-DmcL2ehH.js";import{C as a}from"./CalendarLabels-Df9tmXH-.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Dah3cwSu.js";import"./hvemHarRettUtils-CjbO3AQA.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./CalendarIconLabel-BpKao8EO.js";import"./BarnehageplassSteg-DZ5Ey75x.js";import"./usePlanleggerNavigator-9Vqp3-2j.js";import"./routes-Cyl7_Mgv.js";import"./PlanleggerStepPage-BbdQ5zay.js";import"./uttakUtils-BBrzUMYL.js";import"./useScrollBehaviour-DdzleXBe.js";import"./BabyWrapped-DiItUiZC.js";import"./Information-DWT1dSiy.js";import"./amplitudeUtils-CfsYsBK0.js";import"./amplitude-Bt1fqaFI.js";import"./FamiliehendelseLabel-BliZtbdt.js";const O={title:"CalendarLabels",component:a},o={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-05",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-03",termindato:"2025-08-03"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!0}},n={args:{uttaksplan:[{fom:"2025-07-14",tom:"2025-08-02",forelder:r.mor,kontoType:e.ForeldrepengerFørFødsel},{fom:"2025-08-04",tom:"2025-11-17",forelder:r.mor,kontoType:e.Mødrekvote},{fom:"2025-11-18",tom:"2026-03-10",forelder:r.mor,kontoType:e.Fellesperiode},{fom:"2026-03-11",tom:"2026-06-24",forelder:r.farMedmor,kontoType:e.Fedrekvote}],barnet:{erFødsel:!0,antallBarn:"1",erBarnetFødt:!0,fødselsdato:"2025-08-04",termindato:"2025-08-04"},hvemHarRett:"beggeHarRett",hvemPlanlegger:{type:t.MOR_OG_FAR,navnPåMor:"Kari",navnPåFar:"Ola"},inneholderTapteDager:!1}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.ForeldrepengerFørFødsel
    },
    // legger inn tapt dag mellom termindato og første dag av mødrekvote
    {
      fom: '2025-08-05',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Mødrekvote
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Fellesperiode
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    uttaksplan: [{
      fom: '2025-07-14',
      tom: '2025-08-02',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.ForeldrepengerFørFødsel
    }, {
      fom: '2025-08-04',
      tom: '2025-11-17',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Mødrekvote
    }, {
      fom: '2025-11-18',
      tom: '2026-03-10',
      forelder: Forelder.mor,
      kontoType: StønadskontoType.Fellesperiode
    }, {
      fom: '2026-03-11',
      tom: '2026-06-24',
      forelder: Forelder.farMedmor,
      kontoType: StønadskontoType.Fedrekvote
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
}`,...n.parameters?.docs?.source}}};const h=["MorSøkerMedTapteDager","MorSøkerUtenTapteDager"];export{o as MorSøkerMedTapteDager,n as MorSøkerUtenTapteDager,h as __namedExportsOrder,O as default};
