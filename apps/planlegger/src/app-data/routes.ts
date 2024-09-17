export enum PlanleggerRoutes {
    OM_PLANLEGGEREN = '/om-planleggeren',
    HVEM_PLANLEGGER = '/hvem-planlegger',
    OM_BARNET = '/om-barnet',
    // BARNEHAGEPLASS = '/barnehageplass',
    ARBEIDSSITUASJON = '/arbeidssituasjon',
    HVOR_LANG_PERIODE = '/hvor-lenge',
    FORDELING = '/fordeling',
    PLANEN_DERES = '/planen-deres',
    OPPSUMMERING = '/oppsummering',
}

export const PATH_ORDER = [
    PlanleggerRoutes.OM_PLANLEGGEREN,
    PlanleggerRoutes.HVEM_PLANLEGGER,
    PlanleggerRoutes.OM_BARNET,
    // PlanleggerRoutes.BARNEHAGEPLASS,
    PlanleggerRoutes.ARBEIDSSITUASJON,
    PlanleggerRoutes.HVOR_LANG_PERIODE,
    PlanleggerRoutes.FORDELING,
    PlanleggerRoutes.PLANEN_DERES,
    PlanleggerRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS = [
    PlanleggerRoutes.HVEM_PLANLEGGER,
    PlanleggerRoutes.OM_BARNET,
    // PlanleggerRoutes.BARNEHAGEPLASS,
    PlanleggerRoutes.OPPSUMMERING,
];
