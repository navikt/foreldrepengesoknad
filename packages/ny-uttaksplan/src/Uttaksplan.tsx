import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { SaksperiodeNy } from '@navikt/fp-types';
import { omitMany } from '@navikt/fp-utils';

import { LeggTilPeriodePanel } from './components/legg-til-periode-panel/LeggTilPeriodePanel';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { useUttaksplanData } from './context/UttaksplanDataContext';
import { useUttaksplan } from './context/useUttaksplan';
import { useUttaksplanBuilder } from './context/useUttaksplanBuilder';
import { Planperiode } from './types/Planperiode';
import { isHull, isPeriodeUtenUttak } from './utils/periodeUtils';

interface Props {
    saksperioder: SaksperiodeNy[];
    handleOnPlanChange: (perioder: SaksperiodeNy[]) => void;
    isAllAccordionsOpen?: boolean;
}

export const UttaksplanNy = ({ saksperioder, handleOnPlanChange, isAllAccordionsOpen }: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const { modus } = useUttaksplanData();

    const uttaksplan = useUttaksplan(saksperioder);
    const uttaksplanBuilder = useUttaksplanBuilder(saksperioder);

    return (
        <>
            {uttaksplan.length > 0 && (
                <PeriodeListe
                    perioder={uttaksplan}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(uttaksplanBuilder.leggTilPeriode(nyPeriode), handleOnPlanChange);
                    }}
                    handleUpdatePeriode={(oppdatertPeriode: Planperiode) => {
                        modifyPlan(uttaksplanBuilder.oppdaterPeriode(oppdatertPeriode), handleOnPlanChange);
                    }}
                    handleDeletePeriode={(slettetPeriode: Planperiode) => {
                        modifyPlan(uttaksplanBuilder.slettPeriode(slettetPeriode), handleOnPlanChange);
                    }}
                    handleDeletePerioder={(slettedePerioder: Planperiode[]) => {
                        modifyPlan(uttaksplanBuilder.slettPerioder(slettedePerioder), handleOnPlanChange);
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
            {isLeggTilPeriodePanelOpen && (
                <LeggTilPeriodePanel
                    onCancel={() => setIsLeggTilPeriodePanelOpen(false)}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(uttaksplanBuilder.leggTilPeriode(nyPeriode), handleOnPlanChange);
                        setIsLeggTilPeriodePanelOpen(false);
                    }}
                />
            )}
        </>
    );
};

const modifyPlan = (planperiode: Planperiode[], handleOnPlanChange: (perioder: SaksperiodeNy[]) => void) => {
    const resultUtenHull = planperiode.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

    handleOnPlanChange(
        resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
    );
};
