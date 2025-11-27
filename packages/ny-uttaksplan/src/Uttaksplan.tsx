import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';
import { omitMany } from '@navikt/fp-utils';

import { UttaksplanHandlingKnapper } from './components/UttaksplanHandlingKnapper';
import { LeggTilPeriodePanel } from './components/legg-til-periode-panel/LeggTilPeriodePanel';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';
import { useUttaksplanBuilder } from './context/useUttaksplanBuilder';
import { Planperiode } from './types/Planperiode';
import { isHull, isPeriodeUtenUttak } from './utils/periodeUtils';

export const UttaksplanNy = () => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const { modus, uttaksplan } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const uttaksplanBuilder = useUttaksplanBuilder();

    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

    const toggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    return (
        <>
            {uttaksplan.length > 0 && (
                <PeriodeListe
                    perioder={uttaksplan}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(
                            uttaksplanBuilder.leggTilPeriode(nyPeriode),
                            uttaksplanRedigering?.oppdaterUttaksplan,
                        );
                    }}
                    handleUpdatePeriode={(oppdatertPeriode: Planperiode) => {
                        modifyPlan(
                            uttaksplanBuilder.oppdaterPeriode(oppdatertPeriode),
                            uttaksplanRedigering?.oppdaterUttaksplan,
                        );
                    }}
                    handleDeletePeriode={(slettetPeriode: Planperiode) => {
                        modifyPlan(
                            uttaksplanBuilder.slettPeriode(slettetPeriode),
                            uttaksplanRedigering?.oppdaterUttaksplan,
                        );
                    }}
                    handleDeletePerioder={(slettedePerioder: Planperiode[]) => {
                        modifyPlan(
                            uttaksplanBuilder.slettPerioder(slettedePerioder),
                            uttaksplanRedigering?.oppdaterUttaksplan,
                        );
                    }}
                    isAllAccordionsOpen={isAllAccordionsOpen}
                />
            )}
            {uttaksplan.length === 0 && (
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
            {modus !== 'innsyn' && !isLeggTilPeriodePanelOpen && (
                <Button variant="secondary" onClick={() => setIsLeggTilPeriodePanelOpen(true)}>
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && uttaksplanRedigering && (
                <LeggTilPeriodePanel
                    onCancel={() => setIsLeggTilPeriodePanelOpen(false)}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(
                            uttaksplanBuilder.leggTilPeriode(nyPeriode),
                            uttaksplanRedigering?.oppdaterUttaksplan,
                        );
                        setIsLeggTilPeriodePanelOpen(false);
                    }}
                />
            )}
            {uttaksplanRedigering && (
                <UttaksplanHandlingKnapper
                    toggleAllAccordions={toggleAllAccordions}
                    visKnapper
                    tilbakestillPlan={
                        uttaksplanRedigering.uttaksplanVersjoner.length > 0
                            ? () => uttaksplanRedigering.tilbakestillUttaksplan()
                            : undefined
                    }
                    angreEndring={
                        uttaksplanRedigering.uttaksplanVersjoner.length > 0
                            ? () => uttaksplanRedigering.angreSisteEndring()
                            : undefined
                    }
                    fjernAltIPlanen={() => uttaksplanRedigering.setVisFjernAltModal(true)}
                />
            )}
        </>
    );
};

const modifyPlan = (
    planperiode: Planperiode[],
    oppdaterUttaksplan?: (perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>) => void,
) => {
    const resultUtenHull = planperiode.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

    oppdaterUttaksplan?.(
        resultUtenHull.map(
            (p) =>
                omitMany(p, [
                    'id',
                    'periodeHullÅrsak',
                    'readOnly',
                    'skalIkkeHaUttakFørTermin',
                    'erAnnenPartEøs',
                ]) satisfies UttakPeriode_fpoversikt,
        ),
    );
};
