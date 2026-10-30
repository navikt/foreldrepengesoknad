import dayjs from 'dayjs';
import { createContext, use, useCallback, useMemo } from 'react';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { UttakPeriodeDto } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { HistoriskEndring } from '../../../felles/HistoriskEndringModal';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { harHistoriskFerieEllerGraderingsendring, harHistoriskSletting } from '../../../utils/historiskEndring';
import { slåSammenTilstøtendePerioder } from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setEndredePerioder: (perioder: Array<{ fom: string; tom: string }>) => void;
    bekreftHistoriskEndring: (endring: HistoriskEndring) => void;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'bekreftHistoriskEndring'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (
        perioder: UttakPeriodeDto[],
        skalForskyvePeriode: boolean,
        etterUtført: () => void,
    ) => void;
    slettUttaksplanPerioder: (
        perioder: Array<{ fom: string; tom: string }>,
        skalForskyveBakover: boolean,
        etterUtført: () => void,
    ) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    setValgtePerioder,
    setEndredePerioder,
    bekreftHistoriskEndring,
}: Props) => {
    const {
        perioder,
        erPeriodeneTilAnnenPartLåst,
        erEndringssøknad,
        foreldreInfo: { søker },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const leggTilUttaksplanPerioder = useCallback(
        (nyePerioder: UttakPeriodeDto[], skalForskyvePeriode: boolean, etterUtført: () => void) => {
            const nyeUttakPerioder = new UttakPeriodeBuilder(perioder, 'kalender')
                .leggTilUttakPerioder(nyePerioder, skalForskyvePeriode)
                .getUttakPerioder();

            const utfør = () => {
                notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeUttakPerioder);
                etterUtført();
            };

            const førsteDagIMåneden = dayjs().startOf('month').format(ISO_DATE_FORMAT);
            const erHistoriskEndring =
                erEndringssøknad &&
                harHistoriskFerieEllerGraderingsendring(
                    perioder,
                    nyeUttakPerioder,
                    søker,
                    kanVelgeArbeidsgiver,
                    førsteDagIMåneden,
                );

            if (erHistoriskEndring) {
                bekreftHistoriskEndring({ type: 'endret', utfør });
            } else {
                utfør();
            }
        },
        [uttaksplanRedigering, perioder, søker, kanVelgeArbeidsgiver, erEndringssøknad, bekreftHistoriskEndring],
    );

    const slettUttaksplanPerioder = useCallback(
        (
            perioderSomSkalSlettes: Array<{ fom: string; tom: string }>,
            skalForskyveBakover: boolean,
            etterUtført: () => void,
        ) => {
            const utfør = () => {
                const nyeUttakPerioder = new UttakPeriodeBuilder(perioder, 'kalender')
                    .fjernUttakPerioder(perioderSomSkalSlettes, skalForskyveBakover, erPeriodeneTilAnnenPartLåst)
                    .getUttakPerioder();
                notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeUttakPerioder);
                etterUtført();
            };

            const førsteDagIMåneden = dayjs().startOf('month').format(ISO_DATE_FORMAT);
            const erHistoriskSletting =
                erEndringssøknad && harHistoriskSletting(perioder, perioderSomSkalSlettes, førsteDagIMåneden);

            if (erHistoriskSletting) {
                bekreftHistoriskEndring({ type: 'slettet', utfør });
            } else {
                utfør();
            }
        },
        [uttaksplanRedigering, perioder, erPeriodeneTilAnnenPartLåst, erEndringssøknad, bekreftHistoriskEndring],
    );

    const value = useMemo(
        () => ({
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        }),
        [
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        ],
    );

    return <KalenderRedigeringContext value={value}>{children}</KalenderRedigeringContext>;
};

export const useKalenderRedigeringContext = () => {
    const context = use(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
