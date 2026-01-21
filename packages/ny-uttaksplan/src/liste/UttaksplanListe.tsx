import { NotePencilDashIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttaksdagenString } from '@navikt/fp-utils';

import { useUttaksplanData } from '../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../context/UttaksplanRedigeringContext';
import { Uttaksplanperiode } from '../types/UttaksplanPeriode';
import { useAlleUttakPerioderInklTapteDagerOgPerioderUtenUttak } from '../utils/lagHullPerioder';
import { UttaksplanHandlingKnapper } from './UttaksplanHandlingKnapper';
import { LeggTilEllerEndrePeriodeListPanel } from './legg-til-endre-periode-panel/LeggTilEllerEndrePeriodeListPanel';
import { PeriodeListeItem } from './periode-liste-item/PeriodeListeItem';
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

    return (
        <VStack gap="space-16">
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
            {!isReadOnly && !isLeggTilPeriodePanelOpen && (
                <Button variant="secondary" onClick={() => setIsLeggTilPeriodePanelOpen(true)}>
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && uttaksplanRedigering && (
                <LeggTilEllerEndrePeriodeListPanel
                    setIsLeggTilPeriodePanelOpen={setIsLeggTilPeriodePanelOpen}
                    erNyPeriodeModus
                />
            )}
            {uttaksplanRedigering && (
                <UttaksplanHandlingKnapper
                    toggleAllAccordions={toggleAllAccordions}
                    visKnapper
                    tilbakestillPlan={
                        uttaksplanRedigering.harEndretPlan
                            ? () => uttaksplanRedigering.tilbakestillUttaksplan()
                            : undefined
                    }
                    angreEndring={
                        uttaksplanRedigering.uttaksplanVersjoner.length > 0
                            ? () => uttaksplanRedigering.angreSisteEndring()
                            : undefined
                    }
                    fjernAltIPlanen={() => uttaksplanRedigering.setVisFjernAltModal(true)}
                    visFjernAltModal={uttaksplanRedigering.visFjernAltModal}
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
    periode: Uttaksplanperiode,
    familiehendelsesdato: string,
): Uttaksplanperiode[] => {
    const fom = dayjs(periode.fom);
    const tom = dayjs(periode.tom);
    const famdato = dayjs(familiehendelsesdato);

    if (famdato.isBefore(fom) || famdato.isAfter(tom)) {
        return [periode];
    }

    const resultat: Uttaksplanperiode[] = [];

    if (fom.isBefore(famdato)) {
        resultat.push({
            ...periode,
            fom: periode.fom,
            tom: UttaksdagenString(familiehendelsesdato).trekkFra(1),
        });
    }

    if (tom.isAfter(famdato)) {
        resultat.push({
            ...periode,
            fom: familiehendelsesdato,
            tom: periode.tom,
        });
    }

    return resultat;
};
