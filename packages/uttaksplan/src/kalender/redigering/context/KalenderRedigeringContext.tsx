import dayjs from 'dayjs';
import { createContext, use, useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, Button, Dialog } from '@navikt/ds-react';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { slåSammenTilstøtendePerioder } from '../utils/kalenderPeriodeUtils';

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setEndredePerioder: (perioder: Array<{ fom: string; tom: string }>) => void;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
    sammenslåtteValgtePerioder: CalendarPeriod[];
    leggTilUttaksplanPerioder: (perioder: UttakPeriode_fpoversikt[], skalForskyvePeriode: boolean) => void;
    slettUttaksplanPerioder: (perioder: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => void;
    utførEllerBekreftHistoriskEndring: (perioder: Array<{ fom: string; tom: string }>, handling: () => void) => void;
};

const KalenderRedigeringContext = createContext<ContextValues | null>(null);

export const KalenderRedigeringProvider = ({
    valgtePerioder,
    children,
    setValgtePerioder,
    setEndredePerioder,
}: Props) => {
    const { uttakPerioder, erEndringssøknad } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();
    const [ventendeHistoriskEndring, setVentendeHistoriskEndring] = useState<{ handling: () => void }>();

    const sammenslåtteValgtePerioder = useMemo(() => slåSammenTilstøtendePerioder(valgtePerioder), [valgtePerioder]);

    const leggTilUttaksplanPerioder = useCallback(
        (perioder: UttakPeriode_fpoversikt[], skalForskyvePeriode: boolean) => {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder, 'kalender')
                .leggTilUttakPerioder(perioder, skalForskyvePeriode)
                .getUttakPerioder();

            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(nyeUttakPerioder);
        },
        [uttaksplanRedigering, uttakPerioder],
    );

    const slettUttaksplanPerioder = useCallback(
        (perioder: Array<{ fom: string; tom: string }>, skalForskyveBakover: boolean) => {
            const uttakPeriodeBuilder = new UttakPeriodeBuilder(uttakPerioder, 'kalender');
            uttakPeriodeBuilder.fjernUttakPerioder(perioder, skalForskyveBakover);
            notEmpty(uttaksplanRedigering).oppdaterUttaksplan(uttakPeriodeBuilder.getUttakPerioder());
        },
        [uttaksplanRedigering, uttakPerioder],
    );

    const utførEllerBekreftHistoriskEndring = useCallback(
        (perioder: Array<{ fom: string; tom: string }>, handling: () => void) => {
            const førsteDagDenneMåneden = dayjs().startOf('month');
            const berørerTidligereMåned = perioder.some((periode) =>
                dayjs(periode.fom).isBefore(førsteDagDenneMåneden, 'day'),
            );

            if (erEndringssøknad && berørerTidligereMåned) {
                setVentendeHistoriskEndring({ handling });
                return;
            }

            handling();
        },
        [erEndringssøknad],
    );

    const avbrytHistoriskEndring = useCallback(() => setVentendeHistoriskEndring(undefined), []);
    const bekreftHistoriskEndring = useCallback(() => {
        if (ventendeHistoriskEndring) {
            ventendeHistoriskEndring.handling();
            setVentendeHistoriskEndring(undefined);
        }
    }, [ventendeHistoriskEndring]);

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            utførEllerBekreftHistoriskEndring,
            setValgtePerioder,
            setEndredePerioder,
        };
    }, [
        sammenslåtteValgtePerioder,
        leggTilUttaksplanPerioder,
        slettUttaksplanPerioder,
        utførEllerBekreftHistoriskEndring,
        setValgtePerioder,
        setEndredePerioder,
    ]);

    return (
        <KalenderRedigeringContext value={value}>
            {children}
            <Dialog
                open={ventendeHistoriskEndring !== undefined}
                onOpenChange={(open) => {
                    if (!open) {
                        avbrytHistoriskEndring();
                    }
                }}
            >
                <Dialog.Popup id="BekreftHistoriskEndringModal">
                    <Dialog.Header>
                        <Dialog.Title>
                            <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Tittel" />
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Alert variant="warning">
                            <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Advarsel" />
                        </Alert>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button type="button" variant="secondary">
                                <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Avbryt" />
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button type="button" variant="primary" onClick={bekreftHistoriskEndring}>
                            <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Bekreft" />
                        </Button>
                    </Dialog.Footer>
                </Dialog.Popup>
            </Dialog>
        </KalenderRedigeringContext>
    );
};

export const useKalenderRedigeringContext = () => {
    const context = use(KalenderRedigeringContext);
    if (!context) {
        throw new Error('KalenderRedigeringContext.Provider er ikke satt opp');
    }
    return context;
};
