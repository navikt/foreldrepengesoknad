export enum HvorMyeRoutes {
    HVOR_MYE = '/hvor-mye',
    OM_HVOR_MYE = '/om',
    ARBEIDSSITUASJON = '/arbeidssituasjon',
}

export enum HvaSkjerNårRoutes {
    HVA_SKJER = '/hva-skjer',
    OM_HVA_SKJER = '/om',
}

export enum FpEllerEsRoutes {
    FP_ELLER_ES = '/fp-eller-es',
    OM_FP_ELLER_ES = '/om',
}

export const PATH_ORDER = [HvorMyeRoutes.OM_HVOR_MYE, HvorMyeRoutes.ARBEIDSSITUASJON];

export const REQUIRED_APP_STEPS_HVOR_MYE = [HvorMyeRoutes.OM_HVOR_MYE, HvorMyeRoutes.ARBEIDSSITUASJON];
