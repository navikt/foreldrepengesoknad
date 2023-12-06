export enum Path {
    OM_PLANLEGGER = '/om-planleggeren',
    HVEM_PLANLEGGER = '/hvem-planlegger',
    OM_BARNET = '/om-barnet',
    BARNEHAGEPLASS = '/barnehageplass',
    ARBEIDSSITUASJON = '/arbeidssituasjon',
    PERIODE = '/periode',
    PLAN_INFO = '/planen-deres',
    PLAN = '/deres-plan',
}

export const PATH_ORDER = [
    Path.OM_PLANLEGGER,
    Path.HVEM_PLANLEGGER,
    Path.OM_BARNET,
    Path.BARNEHAGEPLASS,
    Path.ARBEIDSSITUASJON,
    Path.PERIODE,
    Path.PLAN_INFO,
    Path.PLAN,
];

export const REQUIRED_APP_STEPS = [
    Path.OM_PLANLEGGER,
    Path.HVEM_PLANLEGGER,
    Path.OM_BARNET,
    Path.BARNEHAGEPLASS,
    Path.ARBEIDSSITUASJON,
    Path.PERIODE,
    Path.PLAN_INFO,
    Path.PLAN,
];
