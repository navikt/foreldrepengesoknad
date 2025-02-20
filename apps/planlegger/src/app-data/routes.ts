export enum PlanleggerRoutes {
    OM_PLANLEGGEREN = '/om-planleggeren',
    HVEM_PLANLEGGER = '/hvem-planlegger',
    OM_BARNET = '/om-barnet',
    BARNEHAGEPLASS = '/barnehageplass',
    ARBEIDSSITUASJON = '/arbeidssituasjon',
    HVOR_MYE = '/hvor-mye',
    HVOR_LANG_PERIODE = '/hvor-lenge',
    FORDELING = '/fordeling',
    PLANEN_DERES = '/planen-deres',
    TILPASS_PLANEN = '/tilpass-planen',
    OPPSUMMERING = '/oppsummering',
}

export const PATH_ORDER = [
    PlanleggerRoutes.OM_PLANLEGGEREN,
    PlanleggerRoutes.HVEM_PLANLEGGER,
    PlanleggerRoutes.OM_BARNET,
    PlanleggerRoutes.BARNEHAGEPLASS,
    PlanleggerRoutes.ARBEIDSSITUASJON,
    PlanleggerRoutes.HVOR_MYE,
    PlanleggerRoutes.HVOR_LANG_PERIODE,
    PlanleggerRoutes.FORDELING,
    PlanleggerRoutes.PLANEN_DERES,
    PlanleggerRoutes.TILPASS_PLANEN,
    PlanleggerRoutes.OPPSUMMERING,
];

export const REQUIRED_APP_STEPS = [
    PlanleggerRoutes.HVEM_PLANLEGGER,
    PlanleggerRoutes.OM_BARNET,
    PlanleggerRoutes.OPPSUMMERING,
];
