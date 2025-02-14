import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import '@navikt/ds-css';
import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Barn, Familiesituasjon, SaksperiodeNy } from '@navikt/fp-types';

import { Uttaksplanbuilder } from './builder/Uttaksplanbuilder';
import { finnOgSettInnHull, settInnAnnenPartsUttak, slåSammenLikePerioder } from './builder/uttaksplanbuilderUtils';
import { LeggTilPeriodeModal } from './components/legg-til-periode-modal/LeggTilPeriodeModal';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { Planperiode } from './types/Planperiode';
import { mapSaksperiodeTilPlanperiode } from './utils/periodeUtils';

interface Props {
    familiehendelsedato: string;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    barn: Barn;
    søkersPerioder: SaksperiodeNy[];
    annenPartsPerioder?: SaksperiodeNy[];
    gjelderAdopsjon: boolean;
    bareFarHarRett: boolean;
    harAktivitetskravIPeriodeUtenUttak: boolean;
    førsteUttaksdagNesteBarnsSak: string | undefined;
    familiesituasjon: Familiesituasjon;
    handleOnPlanChange: (perioder: SaksperiodeNy[]) => void;
    planleggerModus: boolean;
}

export const UttaksplanNy = ({
    familiehendelsedato,
    erFarEllerMedmor,
    navnPåForeldre,
    barn,
    søkersPerioder,
    annenPartsPerioder,
    gjelderAdopsjon,
    bareFarHarRett,
    harAktivitetskravIPeriodeUtenUttak,
    førsteUttaksdagNesteBarnsSak,
    familiesituasjon,
    handleOnPlanChange,
    planleggerModus,
}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const søkersPlanperioder = finnOgSettInnHull(
        mapSaksperiodeTilPlanperiode(søkersPerioder, erFarEllerMedmor, false, familiehendelsedato, planleggerModus),
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );
    const annenPartsPlanperioder = annenPartsPerioder
        ? mapSaksperiodeTilPlanperiode(annenPartsPerioder, erFarEllerMedmor, true, familiehendelsedato, planleggerModus)
        : undefined;

    const planMedLikePerioderSlåttSammen = slåSammenLikePerioder(
        søkersPlanperioder,
        familiehendelsedato,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );

    const komplettPlan = finnOgSettInnHull(
        annenPartsPlanperioder
            ? settInnAnnenPartsUttak(
                  søkersPlanperioder,
                  annenPartsPlanperioder,
                  familiehendelsedato,
                  førsteUttaksdagNesteBarnsSak,
                  true,
              )
            : planMedLikePerioderSlåttSammen,
        harAktivitetskravIPeriodeUtenUttak,
        familiehendelsedato,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
    );

    const builder = Uttaksplanbuilder(
        komplettPlan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon,
        bareFarHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );

    const handleUpdatePeriode = (oppdatertPeriode: Planperiode) => {
        const result = builder.oppdaterPeriode(oppdatertPeriode);

        const saksPerioder = result.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = r;
            return saksPeriodeNy;
        });

        handleOnPlanChange(saksPerioder);
    };

    const handleAddPeriode = (nyPeriode: Planperiode) => {
        const result = builder.leggTilPeriode(nyPeriode);

        const saksPerioder = result.map((r) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = r;
            return saksPeriodeNy;
        });
        handleOnPlanChange(saksPerioder);
    };

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    return (
        <UttaksplanDataContext
            initialState={{
                BARN: barn,
                ER_FAR_ELLER_MEDMOR: erFarEllerMedmor,
                FAMILIEHENDELSEDATO: familiehendelsedato,
                NAVN_PÅ_FORELDRE: navnPåForeldre,
                UTTAKSPLAN: komplettPlan,
                FAMILIESITUASJON: familiesituasjon,
            }}
        >
            {komplettPlan.length > 0 && (
                <PeriodeListe perioder={komplettPlan} handleUpdatePeriode={handleUpdatePeriode} />
            )}

            {komplettPlan.length === 0 && (
                <VStack bottom="space-16">
                    <BodyShort weight="semibold" size="large" spacing style={{ display: 'flex', gap: '16px' }}>
                        <NotePencilDashIcon fontSize={24} />
                        <FormattedMessage id="uttaksplan.ingenPerioder.tittel" />
                    </BodyShort>
                    <BodyShort style={{ paddingLeft: '40px' }}>
                        <FormattedMessage id="uttaksplan.ingenPerioder.body" />
                    </BodyShort>
                </VStack>
            )}

            <Button variant="secondary" onClick={openModal}>
                Legg til periode
            </Button>
            {isModalOpen ? (
                <LeggTilPeriodeModal
                    closeModal={closeModal}
                    handleAddPeriode={handleAddPeriode}
                    familiehendelsedato={familiehendelsedato}
                    isModalOpen={isModalOpen}
                />
            ) : null}
        </UttaksplanDataContext>
    );
};
