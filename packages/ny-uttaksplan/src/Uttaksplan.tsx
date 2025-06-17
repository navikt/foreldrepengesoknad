import { NotePencilDashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import '@navikt/ds-css';
import { BodyShort, Button, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import {
    Barn,
    Familiesituasjon,
    SaksperiodeNy,
    TilgjengeligeStønadskontoerForDekningsgrad,
    UttaksplanModus,
    isFødtBarn,
} from '@navikt/fp-types';

import { Uttaksplanbuilder } from './builder/Uttaksplanbuilder';
import Block from './common/Block';
import { LeggTilPeriodeModal } from './components/legg-til-periode-modal/LeggTilPeriodeModal';
import { PeriodeListe } from './components/periode-liste/PeriodeListe';
import { UttaksplanDataContext } from './context/UttaksplanDataContext';
import { Planperiode } from './types/Planperiode';
import { isHull, isPeriodeUtenUttak, mapSaksperiodeTilPlanperiode, utledKomplettPlan } from './utils/periodeUtils';
import { validerUttaksplan } from './validering/validerUttaksplan';
import VeilederInfo from './veilederInfo/VeilederInfo';
import { getUttaksplanVeilederinfo } from './veilederInfo/utils';

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
}: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
    const builder = Uttaksplanbuilder(
        komplettPlan,
        familiehendelsedato,
        harAktivitetskravIPeriodeUtenUttak,
        gjelderAdopsjon,
        bareFarMedmorHarRett,
        erFarEllerMedmor,
        førsteUttaksdagNesteBarnsSak,
        annenPartsPlanperioder,
    );
    const intl = useIntl();

    const handleUpdatePeriode = (oppdatertPeriode: Planperiode) => {
        const result = builder.oppdaterPeriode(oppdatertPeriode);
        const resultUtenHull = result.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        const saksPerioder = resultUtenHull.map((p) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = p;
            return saksPeriodeNy;
        });
        handleOnPlanChange(saksPerioder);
    };

    const handleAddPeriode = (nyPeriode: Planperiode) => {
        const result = builder.leggTilPeriode(nyPeriode);
        const resultUtenHull = result.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        const saksPerioder = resultUtenHull.map((p) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = p;
            return saksPeriodeNy;
        });
        handleOnPlanChange(saksPerioder);
    };

    const handleDeletePeriode = (slettetPeriode: Planperiode) => {
        const result = builder.slettPeriode(slettetPeriode);
        const resultUtenHull = result.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        const saksPerioder = resultUtenHull.map((p) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = p;
            return saksPeriodeNy;
        });
        handleOnPlanChange(saksPerioder);
    };

    const handleDeletePerioder = (slettedePerioder: Planperiode[]) => {
        const result = builder.slettPerioder(slettedePerioder);
        const resultUtenHull = result.filter((p) => !isHull(p) && !isPeriodeUtenUttak(p));

        const saksPerioder = resultUtenHull.map((p) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars -- greit for spreading
            const { id, periodeHullÅrsak, readOnly: gjelderAnnenPart, skalIkkeHaUttakFørTermin, ...saksPeriodeNy } = p;
            return saksPeriodeNy;
        });
        handleOnPlanChange(saksPerioder);
    };

    const valideringsResultat = validerUttaksplan({ perioder: komplettPlan });
    const uttaksplanVeilederInfo = getUttaksplanVeilederinfo(valideringsResultat.avvik, intl, true);

    console.log(valideringsResultat);
    console.log(valideringsResultat.avvik);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const erBarnetFødt = isFødtBarn(barn);

    return (
        <>
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
                        handleUpdatePeriode={handleUpdatePeriode}
                        handleDeletePeriode={handleDeletePeriode}
                        handleDeletePerioder={handleDeletePerioder}
                    />
                )}

                {komplettPlan.length === 0 && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <NotePencilDashIcon fontSize={24} />
                        <VStack gap="2">
                            <BodyShort weight="semibold" size="large">
                                <FormattedMessage id="uttaksplan.ingenPerioder.tittel" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage id="uttaksplan.ingenPerioder.body" />
                            </BodyShort>
                        </VStack>
                    </div>
                )}

                {modus !== 'innsyn' && (
                    <Button variant="secondary" onClick={openModal}>
                        <FormattedMessage id="uttaksplan.leggTilPeriode" />
                    </Button>
                )}
                {isModalOpen ? (
                    <LeggTilPeriodeModal
                        closeModal={closeModal}
                        handleAddPeriode={handleAddPeriode}
                        isModalOpen={isModalOpen}
                        erBarnetFødt={erBarnetFødt}
                        gjelderAdopsjon={gjelderAdopsjon}
                    />
                ) : null}
            </UttaksplanDataContext>
            <Block visible={valideringsResultat.resultat.length > 0} padBottom="l">
                <VeilederInfo
                    messages={uttaksplanVeilederInfo}
                    ariaTittel={intl.formatMessage({ id: 'uttaksplan.regelAvvik.ariaTittel' })}
                />
            </Block>
            {/* {valideringsResultat.harFeil && <span>formated {valideringsResultat.avvik[0].info.intlKey}</span>} */}
        </>
    );
};
