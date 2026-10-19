import dayjs from 'dayjs';
import { createContext, use, useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyLong, Button, Dialog } from '@navikt/ds-react';

import { UttakPeriodeDto } from '@navikt/fp-types';
import { CalendarPeriod } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import {
    harHistoriskFerieendring,
    harHistoriskGraderingsendring,
    harHistoriskSletting,
} from '../utils/historiskEndring';
import { slåSammenTilstøtendePerioder } from '../utils/kalenderPeriodeUtils';

type TypeHistoriskEndring = 'slettet' | 'endret';

type VentendeHandling = {
    type: TypeHistoriskEndring;
    utfør: () => void;
};

type Props = {
    valgtePerioder: CalendarPeriod[];
    children: React.ReactNode;
    setValgtePerioder: React.Dispatch<React.SetStateAction<CalendarPeriod[]>>;
    setEndredePerioder: (perioder: Array<{ fom: string; tom: string }>) => void;
};

type ContextValues = Omit<Props, 'children' | 'valgtePerioder' | 'oppdaterUttaksplan'> & {
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
}: Props) => {
    const {
        perioder,
        erPeriodeneTilAnnenPartLåst,
        erEndringssøknad,
        foreldreInfo: { søker },
        kanVelgeArbeidsgiver,
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();
    const [ventendeHandling, setVentendeHandling] = useState<VentendeHandling>();

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
            const førsteDagIMåneden = dayjs().startOf('month').format('YYYY-MM-DD');
            const berørerHistoriskDato =
                harHistoriskFerieendring(perioder, nyeUttakPerioder, søker, førsteDagIMåneden, true) ||
                harHistoriskGraderingsendring(perioder, nyeUttakPerioder, {
                    søker,
                    kanVelgeArbeidsgiver,
                    erPeriodeneTilAnnenPartLåst,
                    førsteDagIMåneden,
                    sammenlignHelePlanen: true,
                });

            if (erEndringssøknad && berørerHistoriskDato) {
                setVentendeHandling({ type: 'endret', utfør });
            } else {
                utfør();
            }
        },
        [uttaksplanRedigering, perioder, søker, kanVelgeArbeidsgiver, erPeriodeneTilAnnenPartLåst, erEndringssøknad],
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
            const førsteDagIMåneden = dayjs().startOf('month').format('YYYY-MM-DD');
            const berørerHistoriskDato = harHistoriskSletting(perioder, perioderSomSkalSlettes, førsteDagIMåneden);

            if (erEndringssøknad && berørerHistoriskDato) {
                setVentendeHandling({ type: 'slettet', utfør });
            } else {
                utfør();
            }
        },
        [uttaksplanRedigering, perioder, erPeriodeneTilAnnenPartLåst, erEndringssøknad],
    );

    const value = useMemo(() => {
        return {
            sammenslåtteValgtePerioder,
            leggTilUttaksplanPerioder,
            slettUttaksplanPerioder,
            setValgtePerioder,
            setEndredePerioder,
        };
    }, [
        sammenslåtteValgtePerioder,
        leggTilUttaksplanPerioder,
        slettUttaksplanPerioder,
        setValgtePerioder,
        setEndredePerioder,
    ]);

    const bekreftVentendeHandling = () => {
        const handling = ventendeHandling;
        setVentendeHandling(undefined);
        handling?.utfør();
    };

    return (
        <KalenderRedigeringContext value={value}>
            {children}
            <Dialog
                open={ventendeHandling !== undefined}
                onOpenChange={(open) => {
                    if (!open) {
                        setVentendeHandling(undefined);
                    }
                }}
            >
                <Dialog.Popup id="KalenderRedigeringHistoriskEndring">
                    <Dialog.Header>
                        <Dialog.Title>
                            <FormattedMessage
                                id="KalenderRedigering.HistoriskEndring.Modal.Tittel"
                                values={{ erSletting: ventendeHandling?.type ?? 'endret' }}
                            />
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <Alert variant="warning">
                            <BodyLong>
                                <FormattedMessage
                                    id="KalenderRedigering.HistoriskEndring.Modal.Advarsel"
                                    values={{ erSletting: ventendeHandling?.type ?? 'endret' }}
                                />
                            </BodyLong>
                        </Alert>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.CloseTrigger>
                            <Button type="button" variant="secondary">
                                <FormattedMessage id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Avbryt" />
                            </Button>
                        </Dialog.CloseTrigger>
                        <Button type="button" variant="primary" onClick={bekreftVentendeHandling}>
                            <FormattedMessage
                                id="KalenderRedigering.HistoriskEndring.Modal.Knapp.Bekreft"
                                values={{ erSletting: ventendeHandling?.type ?? 'endret' }}
                            />
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
