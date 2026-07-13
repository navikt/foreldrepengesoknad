export enum SelectableBarnOptions {
    SØKNAD_GJELDER_NYTT_BARN = 'søknad_gjelder_nytt_barn',
    SØKNAD_GJELDER_PLANLAGT_BARN = 'søknad_gjelder_planlagt_barn',
}

export type ForsideFormValues = {
    harForståttRettigheterOgPlikter: boolean;
    valgteBarn: string | undefined;
};
