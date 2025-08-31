import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import {
    Barn,
    Familiesituasjon,
    SaksperiodeNy,
    TilgjengeligeStønadskontoerForDekningsgrad,
    UttaksplanModus,
    isFødtBarn,
} from '@navikt/fp-types';
import { omitMany } from '@navikt/fp-utils';

import { Uttaksplanbuilder } from './builder/Uttaksplanbuilder';
import { LeggTilPeriodePanel } from './components/legg-til-periode-panel/LeggTilPeriodePanel';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { Planperiode } from './types/Planperiode';
import { isHull, isPeriodeUtenUttak, mapSaksperiodeTilPlanperiode, utledKomplettPlan } from './utils/periodeUtils';

interface Props {
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    barn: Barn;
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    gjelderAdopsjon: boolean;
    bareFarMedmorHarRett: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    familiesituasjon: Familiesituasjon;
    handleOnPlanChange: (perioder: SaksperiodeNy[]) => void;
    modus: UttaksplanModus;
    valgtStønadskonto: TilgjengeligeStønadskontoerForDekningsgrad;
    erAleneOmOmsorg: boolean;
    isAllAccordionsOpen?: boolean;
}

export const UttaksplanNy = ({
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    barn,
    søkersPerioder,
    annenPartsPerioder,
    gjelderAdopsjon,
    bareFarMedmorHarRett,
    harAktivitetskravIPeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak,
    familiesituasjon,
    handleOnPlanChange,
    modus,
    valgtStønadskonto,
    erAleneOmOmsorg,
    isAllAccordionsOpen,
}: Props) => {
    const [isLeggTilPeriodePanelOpen, setIsLeggTilPeriodePanelOpen] = useState(false);

    const komplettPlan = utledKomplettPlan({
        familiehendelsedato,
        erFarEllerMedmor,
        søkersPerioder,
        annenPartsPerioder,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        harAktivitetskravIPeriodeUtenUttak,
        førsteUttaksdagNesteBarnsSak,
        modus,
    });

    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, modus)
        : undefined;
    const builder = Uttaksplanbuilder({
        perioder: komplettPlan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        opprinneligPlan: annenPartsPlanperioder,
        erIPlanleggerModus: true,
    });

    return (
        <UttaksplanDataContext
            initialState={{
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: komplettPlan,
                FAMILIESITUASJON: familiesituasjon,
                MODUS: modus,
                VALGT_STØNADSKONTO: valgtStønadskonto,
                ALENE_OM_OMSORG: erAleneOmOmsorg,
            }}
        >
            {komplettPlan.length > 0 && (
                <PeriodeListe
                    perioder={komplettPlan}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(builder.leggTilPeriode(nyPeriode), handleOnPlanChange);
                    }}
                    handleUpdatePeriode={(oppdatertPeriode: Planperiode) => {
                        modifyPlan(builder.oppdaterPeriode(oppdatertPeriode), handleOnPlanChange);
                    }}
                    handleDeletePeriode={(slettetPeriode: Planperiode) => {
                        modifyPlan(builder.slettPeriode(slettetPeriode), handleOnPlanChange);
                    }}
                    handleDeletePerioder={(slettedePerioder: Planperiode[]) => {
                        modifyPlan(builder.slettPerioder(slettedePerioder), handleOnPlanChange);
                    }}
                    isAllAccordionsOpen={isAllAccordionsOpen}
                />
            )}
            {komplettPlan.length === 0 && (
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
            {modus !== 'innsyn' && (
                <Button variant="secondary" onClick={() => setIsLeggTilPeriodePanelOpen(true)}>
                    <FormattedMessage id="uttaksplan.leggTilPeriode" />
                </Button>
            )}
            {isLeggTilPeriodePanelOpen && (
                <LeggTilPeriodePanel
                    onCancel={() => setIsLeggTilPeriodePanelOpen(false)}
                    handleAddPeriode={(nyPeriode: Planperiode) => {
                        modifyPlan(builder.leggTilPeriode(nyPeriode), handleOnPlanChange);
                        setIsLeggTilPeriodePanelOpen(false);
                    }}
                    erBarnetFødt={isFødtBarn(barn)}
                    gjelderAdopsjon={gjelderAdopsjon}
                />
            )}
        </UttaksplanDataContext>
    );
};

const modifyPlan = (planperiode: Planperiode[], handleOnPlanChange: (perioder: SaksperiodeNy[]) => void) => {
    const resultUtenHull = planperiode.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

    handleOnPlanChange(
        resultUtenHull.map((p) => omitMany(p, ['id', 'periodeHullÅrsak', 'readOnly', 'skalIkkeHaUttakFørTermin'])),
    );
};
