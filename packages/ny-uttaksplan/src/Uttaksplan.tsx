import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { UttakPeriodeAnnenpartEøs_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { SaksperiodeBuilder } from './builder/SaksperiodeBuilder';
import { UttaksplanHandlingKnapper } from './components/UttaksplanHandlingKnapper';
import { LeggTilPeriodePanel } from './components/legg-til-periode-panel/LeggTilPeriodePanel';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplanRedigering } from './context/UttaksplanRedigeringContext';
import { useAlleSaksperioderInklTapteDagerOgPerioderUtenUttak } from './utils/lagHullPerioder';

interface Props {
    isReadOnly: boolean;
}

export const UttaksplanNy = ({ isReadOnly }: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const { saksperioder } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const saksperioderInkludertHull = useAlleSaksperioderInklTapteDagerOgPerioderUtenUttak();

    const saksperiodeBuilder = new SaksperiodeBuilder(saksperioder);

    const [isAllAccordionsOpen, setIsAllAccordionsOpen] = useState(false);

    const toggleAllAccordions = () => {
        setIsAllAccordionsOpen(!isAllAccordionsOpen);
    };

    return (
        <VStack gap="space-16">
            {saksperioder.length > 0 && (
                <PeriodeListe
                    saksperioderInkludertHull={saksperioderInkludertHull}
                    isReadOnly={isReadOnly}
                    handleAddPeriode={(nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
                        const nyeSaksperioder = saksperiodeBuilder.leggTilSaksperioder([nyPeriode]).getSaksperioder();
                        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeSaksperioder);
                    }}
                    handleUpdatePeriode={(
                        oppdatertPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
                        gammelPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
                    ) => {
                        const nyeSaksperioder = saksperiodeBuilder
                            .fjernSaksperioder([gammelPeriode])
                            .leggTilSaksperioder([oppdatertPeriode])
                            .getSaksperioder();
                        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeSaksperioder);
                    }}
                    handleDeletePerioder={(slettedePerioder: Array<{ fom: string; tom: string }>) => {
                        const nyeSaksperioder = saksperiodeBuilder
                            .fjernSaksperioder(slettedePerioder)
                            .getSaksperioder();
                        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeSaksperioder);
                    }}
                    isAllAccordionsOpen={isAllAccordionsOpen}
                />
            )}
            {saksperioder.length === 0 && (
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
                    handleAddPeriode={(nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
                        saksperiodeBuilder.leggTilSaksperioder([nyPeriode]);
                        uttaksplanRedigering?.oppdaterUttaksplan?.(saksperiodeBuilder.getSaksperioder());
                        setIsLeggTilPeriodePanelOpen(false);
                    }}
                    handleDeletePerioder={(slettedePerioder: Array<{ fom: string; tom: string }>) => {
                        const nyeSaksperioder = saksperiodeBuilder
                            .fjernSaksperioder(slettedePerioder)
                            .getSaksperioder();
                        uttaksplanRedigering?.oppdaterUttaksplan?.(nyeSaksperioder);
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
                    visFjernAltModal={uttaksplanRedigering.visFjernAltModal}
                />
            )}
        </VStack>
    );
};
