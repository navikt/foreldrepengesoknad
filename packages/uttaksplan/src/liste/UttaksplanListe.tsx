import { NotePencilDashIcon, PlusIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Alert, BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { Uttaksdagen } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { UttaksplanHandlingKnapper } from '../felles/UttaksplanHandlingKnapper';
import { useUttaksplanListeAlerts } from '../regler/alert/informasjonsAlertHooks';
import { Uttaksplanperiode } from '../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak } from '../utils/lagHullPerioder';
import { LeggTilEllerEndrePeriodeListPanel } from './legg-til-endre-periode-panel/LeggTilEllerEndrePeriodeListPanel';
import { PeriodeListeItem } from './periode-liste-item/PeriodeListeItem';
import { UttaksplanListeKnapper } from './UttaksplanListeKnapper';
import { mapUttaksplanperioderTilRaderIListe } from './utils/mapUttaksplanperioderTilRaderIListe';
import { getFørsteUttaksplanperiodeFom, getSisteUttaksplanperiodeTom } from './utils/uttaksplanperiodeUtils';

interface Props {
    isReadOnly: boolean;
}

export const UttaksplanListe = ({ isReadOnly }: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const { uttakPerioder, familiehendelsedato } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const uttakPerioderJustertForFamiliehendelsesdato = uttakPerioder.flatMap((periode) =>
        splittPeriodePåFamiliehendelsesdato(periode, familiehendelsedato),
    );

    const uttakPerioderInkludertHull = useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak(
        uttakPerioderJustertForFamiliehendelsesdato,
    );

    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

    const toggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    const uttaksplanperioderPerRadIListe = mapUttaksplanperioderTilRaderIListe(
        uttakPerioderInkludertHull,
        familiehendelsedato,
    );

    const alleRader = leggTilPeriodeForFamiliehendelsedato(uttaksplanperioderPerRadIListe, familiehendelsedato);

    const { manglerMorsAktivitet: manglerMorsAktivitetAlert } = useUttaksplanListeAlerts(
        uttakPerioderJustertForFamiliehendelsesdato,
    );

    return (
        <VStack gap="space-16">
            {manglerMorsAktivitetAlert && (
                <Alert variant={manglerMorsAktivitetAlert.variant}>
                    <FormattedMessage id={manglerMorsAktivitetAlert.meldingId} />
                </Alert>
            )}
            {uttakPerioder.length > 0 && (
                <div>
                    {alleRader.map((uttaksplanperioderForRad) => {
                        return (
                            <PeriodeListeItem
                                key={`${getFørsteUttaksplanperiodeFom(uttaksplanperioderForRad)}-${getSisteUttaksplanperiodeTom(uttaksplanperioderForRad)}`}
                                isReadOnly={isReadOnly}
                                uttaksplanperioder={uttaksplanperioderForRad}
                                isAllAccordionsOpen={isAllAccordionsOpen}
                            />
                        );
                    })}
                </div>
            )}
            {uttakPerioder.length === 0 && (
                <HStack gap="space-12">
                    <NotePencilDashIcon fontSize={24} />
                    <VStack gap="space-8">
                        <BodyShort weight="semibold" size="large">
                            <FormattedMessage id="uttaksplan.ingenPerioder.tittel" />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.ingenPerioder.body" />
                        </BodyShort>
                    </VStack>
                </HStack>
            )}
            <UttaksplanListeKnapper toggleAllAccordions={toggleAllAccordions} />

            {!isReadOnly && !isLeggTilPeriodePanelOpen && (
                <Button
                    variant="secondary"
                    onClick={() => setIsLeggTilPeriodePanelOpen(true)}
                    icon={<PlusIcon aria-hidden />}
                    style={{ outline: '1px solid var(--ax-border-subtle)', outlineOffset: '-1px' }}
                >
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && uttaksplanRedigering && (
                <LeggTilEllerEndrePeriodeListPanel
                    setIsLeggTilPeriodePanelOpen={setIsLeggTilPeriodePanelOpen}
                    erNyPeriodeModus
                    harPeriodeDerMorsAktivitetIkkeErValgt={false}
                />
            )}
        </VStack>
    );
};

const leggTilPeriodeForFamiliehendelsedato = (
    uttaksplanperioderPerRadIListe: Uttaksplanperiode[][],
    familiehendelsedato: string,
): Uttaksplanperiode[][] => {
    return uttaksplanperioderPerRadIListe
        .concat([
            [
                {
                    fom: familiehendelsedato,
                    tom: familiehendelsedato,
                    type: 'FAMILIEHENDELSE',
                },
            ],
        ])
        .sort((gruppeA, gruppeB) => {
            const a = gruppeA[0]!;
            const b = gruppeB[0]!;

            const aFom = dayjs(a.fom);
            const bFom = dayjs(b.fom);

            if (aFom.isBefore(bFom)) {
                return -1;
            }
            if (aFom.isAfter(bFom)) {
                return 1;
            }

            const aTom = dayjs(a.tom);
            const bTom = dayjs(b.tom);

            if (aTom.isBefore(bTom)) {
                return -1;
            }
            if (aTom.isAfter(bTom)) {
                return 1;
            }

            return 0;
        });
};

const splittPeriodePåFamiliehendelsesdato = (
    periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    familiehendelsesdato: string,
): Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> => {
    const fom = dayjs(periode.fom);
    const tom = dayjs(periode.tom);
    const famdato = dayjs(familiehendelsesdato);

    const erPeriodeLikFamiliehendelsesdato = famdato.isSame(fom) && famdato.isSame(tom);

    if (famdato.isBefore(fom) || famdato.isAfter(tom) || erPeriodeLikFamiliehendelsesdato) {
        return [periode];
    }

    const resultat: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt> = [];

    if (fom.isBefore(famdato)) {
        resultat.push({
            ...periode,
            fom: periode.fom,
            tom: Uttaksdagen.forrige(familiehendelsesdato).getDato(),
        });
    }

    if (tom.isAfter(famdato)) {
        resultat.push({
            ...periode,
            fom: Uttaksdagen.denneEllerNeste(familiehendelsesdato).getDato(),
            tom: periode.tom,
        });
    }

    return resultat;
};
