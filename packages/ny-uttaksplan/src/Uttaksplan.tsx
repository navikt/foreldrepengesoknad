import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttaksplanHandlingKnapper } from './components/UttaksplanHandlingKnapper';
import { LeggTilPeriodePanel } from './components/legg-til-periode-panel/LeggTilPeriodePanel';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';
import { SaksperiodeBuilder } from './newBuilder/SaksperiodeBuilder';
import { Planperiode } from './types/Planperiode';
import { isHull, isPeriodeUtenUttak } from './utils/periodeUtils';

interface Props {
    isReadOnly: boolean;
}

export const UttaksplanNy = ({ isReadOnly }: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const { uttaksplan, saksperioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const saksperiodeBuilder = new SaksperiodeBuilder(saksperioder);

    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

    const toggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    return (
        <VStack gap="space-16">
            {uttaksplan.length > 0 && (
                <PeriodeListe
                    isReadOnly={isReadOnly}
                    perioder={uttaksplan}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        saksperiodeBuilder.addPeriods(fjernHullOgUtenUttak([nyPeriode]));
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
                    }}
                    handleUpdatePeriode={(oppdatertPeriode: Planperiode) => {
                        saksperiodeBuilder.addPeriods(fjernHullOgUtenUttak([oppdatertPeriode]));
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
                    }}
                    handleDeletePeriode={(slettetPeriode: Planperiode) => {
                        saksperiodeBuilder.removePeriods(fjernHullOgUtenUttak([slettetPeriode]));
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
                    }}
                    handleDeletePerioder={(slettedePerioder: Planperiode[]) => {
                        saksperiodeBuilder.removePeriods(fjernHullOgUtenUttak(slettedePerioder));
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
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
            {!isReadOnly && !isLeggTilPeriodePanelOpen && (
                <Button variant="secondary" onClick={() => setIsLeggTilPeriodePanelOpen(true)}>
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && uttaksplanRedigering && (
                <LeggTilPeriodePanel
                    onCancel={() => setIsLeggTilPeriodePanelOpen(false)}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        saksperiodeBuilder.addPeriods(fjernHullOgUtenUttak([nyPeriode]));
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
                        setIsLeggTilPeriodePanelOpen(false);
                    }}
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
                />
            )}
        </VStack>
    );
};

// FIXME (TOR) Trengs denne?
const fjernHullOgUtenUttak = (planperiode: Planperiode[]) => {
    return planperiode.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));
};
