import type { ContextDataType } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import type { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

// Bumpet fra 23 til 24: uttaksplanen gikk over til den nye periodemodellen fra fp-oversikt (/uttaksplan),
// og annenPartVedtak er erstattet av fellesUttaksplan, så eldre mellomlagret data må forkastes.
export const VERSJON_MELLOMLAGRING = 24;

type MellomlagretDataForValidering = Pick<FpMellomlagretData, 'version'> &
    Partial<
        Pick<
            FpMellomlagretData,
            'erEndringssøknad' | ContextDataType.APP_ROUTE | ContextDataType.OPPRINNELIG_UTTAKSPLAN
        >
    >;

const isEndringssøknadRoute = (route: SøknadRoutes): boolean => {
    switch (route) {
        case SøknadRoutes.UTTAKSPLAN:
        case SøknadRoutes.DOKUMENTASJON:
        case SøknadRoutes.OPPSUMMERING: {
            return true;
        }
        default: {
            return false;
        }
    }
};

export const shouldApplyStorage = (storedState: MellomlagretDataForValidering): boolean => {
    if (storedState?.erEndringssøknad && storedState.APP_ROUTE && !isEndringssøknadRoute(storedState.APP_ROUTE)) {
        return false;
    }

    if (storedState.erEndringssøknad && storedState.OPPRINNELIG_UTTAKSPLAN === undefined) {
        return false;
    }

    return storedState.version === VERSJON_MELLOMLAGRING;
};

// TODO: Mellombels. Gradering utan vald aktivitet hadde tidlegare aktivitet.type 'ANNET', no manglar aktivitet.
// Gamle mellomlagringar og planleggar-lenker kan framleis ha 'ANNET', så vi fjernar det ved innlesing.
// fp-oversikt kan i teorien òg sende 'ANNET' for vedtaksperiodar (UttakArbeidType.ANNET frå fp-sak).
// Kan fjernast når slike data ikkje lenger finst og backend ikkje sender 'ANNET'.
type UttakMedGradering = { gradering?: { arbeidstidprosent: number; aktivitet?: { type: string } } };
type PeriodeMedUttak = { søker?: UttakMedGradering; annenPart?: UttakMedGradering };

const fjernAnnetFraUttak = <T extends UttakMedGradering>(uttak: T | undefined): T | undefined => {
    if (uttak?.gradering?.aktivitet?.type !== 'ANNET') {
        return uttak;
    }
    return { ...uttak, gradering: { arbeidstidprosent: uttak.gradering.arbeidstidprosent } };
};

export const fjernAnnetGraderingsaktivitet = <T extends PeriodeMedUttak>(perioder: T[]): T[] =>
    perioder.map((periode) => {
        const søker = fjernAnnetFraUttak(periode.søker);
        const annenPart = fjernAnnetFraUttak(periode.annenPart);
        if (søker === periode.søker && annenPart === periode.annenPart) {
            return periode;
        }
        return { ...periode, søker, annenPart };
    });

export const fjernAnnetGraderingsaktivitetFraMellomlagring = (data: FpMellomlagretData): FpMellomlagretData => ({
    ...data,
    ...(data.UTTAKSPLAN && { UTTAKSPLAN: fjernAnnetGraderingsaktivitet(data.UTTAKSPLAN) }),
    ...(data.OPPRINNELIG_UTTAKSPLAN && {
        OPPRINNELIG_UTTAKSPLAN: {
            ...data.OPPRINNELIG_UTTAKSPLAN,
            perioder: fjernAnnetGraderingsaktivitet(data.OPPRINNELIG_UTTAKSPLAN.perioder),
        },
    }),
    ...(data.fellesUttaksplan && {
        fellesUttaksplan: {
            ...data.fellesUttaksplan,
            perioder: fjernAnnetGraderingsaktivitet(data.fellesUttaksplan.perioder),
        },
    }),
});
