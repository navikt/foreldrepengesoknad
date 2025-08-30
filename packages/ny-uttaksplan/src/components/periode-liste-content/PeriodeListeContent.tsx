import { CalendarIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, UttaksplanModus, isAdoptertBarn, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import {
    isHull,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '../../utils/periodeUtils';
import { EndrePeriodeModal } from '../endre-periode-modal/EndrePeriodeModal';
import { SlettPeriodeModal } from '../slett-periode-modal/SlettPeriodeModal';
import { FamiliehendelseContent } from './components/FamiliehendelseContent';
import { OppholdsPeriodeContent } from './components/OppholdsperiodeContent';
import { OverføringsperiodeContent } from './components/OverføringsperiodeContent';
import { PeriodeUtenUttakContent } from './components/PeriodeUtenUttakContext';
import { SkalJobbeContent } from './components/SkalJobbeContent';
import { UtsettelsesPeriodeContent } from './components/UtsettelsesPeriodeContent';
import { UttaksperiodeContent } from './components/UttaksperiodeContent';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse: boolean;
    handleAddPeriode: (nyPeriode: Planperiode) => void;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
}

export const PeriodeListeContent = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleAddPeriode,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
}: Props) => {
    const [isEndringsModalOpen, setIsEndringsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const erRedigerbar = !permisjonsperiode.perioder.some(
        (p) => isHull(p) || isPeriodeUtenUttak(p) || isUtsettelsesperiode(p),
    );

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const barn = notEmpty(useContextGetData(UttaksplanContextDataType.BARN));
    const familiehendelseType = getFamiliehendelseType(barn);
    const modus = notEmpty(useContextGetData(UttaksplanContextDataType.MODUS));
    const gjelderAdopsjon = isAdoptertBarn(barn);
    const erBarnetFødt = isFødtBarn(barn);

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    return (
        <>
            <VStack gap="space-16">
                {permisjonsperiode.perioder.map((periode) => {
                    return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                })}
                <SkalJobbeContent permisjonsperiode={permisjonsperiode} />
            </VStack>
            {renderKnapper(
                modus,
                erRedigerbar,
                permisjonsperiode,
                inneholderKunEnPeriode,
                handleDeletePeriode,
                setIsEndringsModalOpen,
                setIsDeleteModalOpen,
            )}
            {isEndringsModalOpen ? (
                <EndrePeriodeModal
                    closeModal={() => {
                        setIsEndringsModalOpen(false);
                    }}
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleAddPeriode={handleAddPeriode}
                    permisjonsperiode={permisjonsperiode}
                    inneholderKunEnPeriode={inneholderKunEnPeriode}
                    isModalOpen={isEndringsModalOpen}
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                />
            ) : null}
            {isDeleteModalOpen ? (
                <SlettPeriodeModal
                    closeModal={() => {
                        setIsDeleteModalOpen(false);
                    }}
                    handleDeletePeriode={handleDeletePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    permisjonsperiode={permisjonsperiode}
                    isModalOpen={isDeleteModalOpen}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            ) : null}
        </>
    );
};

const renderPeriode = (
    periode: Planperiode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
) => {
    if (isOppholdsperiode(periode)) {
        return (
            <OppholdsPeriodeContent
                key={periode.id}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
                periode={periode}
            />
        );
    }

    if (isOverføringsperiode(periode)) {
        return (
            <OverføringsperiodeContent
                key={periode.id}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                periode={periode}
            />
        );
    }

    if (isPeriodeUtenUttak(periode) || isHull(periode)) {
        return <PeriodeUtenUttakContent key={periode.id} periode={periode} isHull={isHull(periode)} />;
    }

    if (isUtsettelsesperiode(periode)) {
        return <UtsettelsesPeriodeContent key={periode.id} periode={periode} />;
    }

    if (isUttaksperiode(periode)) {
        return (
            <UttaksperiodeContent
                key={periode.id}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                periode={periode}
                erFarEllerMedmor={erFarEllerMedmor}
                navnPåForeldre={navnPåForeldre}
            />
        );
    }

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <BodyShort weight="semibold">Ikke implementert</BodyShort>
        </HStack>
    );
};

const getFamiliehendelseType = (barn: Barn) => {
    if (isUfødtBarn(barn)) {
        return FamiliehendelseType.TERM;
    }

    if (isAdoptertBarn(barn)) {
        return FamiliehendelseType.ADOPSJON;
    }

    return FamiliehendelseType.FØDSEL;
};

const renderKnapper = (
    modus: UttaksplanModus,
    erRedigerbar: boolean,
    permisjonsperiode: Permisjonsperiode,
    inneholderKunEnPeriode: boolean,
    handleDeletePeriode: any,
    setIsEndringsModalOpen: any,
    setIsDeleteModalOpen: any,
) => {
    if (modus === 'innsyn') {
        return null;
    }

    if (!erRedigerbar) {
        return (
            <HStack gap="space-16" justify="end">
                <Button
                    type="button"
                    size="xsmall"
                    variant="secondary"
                    onClick={() => {
                        setIsEndringsModalOpen(true);
                    }}
                    icon={<PencilIcon />}
                >
                    Endre
                </Button>
            </HStack>
        );
    }

    return (
        <HStack gap="space-16" justify="end">
            <Button
                type="button"
                size="small"
                variant="secondary"
                onClick={() => {
                    setIsEndringsModalOpen(true);
                }}
                icon={<PencilIcon />}
            >
                <FormattedMessage id="uttaksplan.endre" />
            </Button>
            <Button
                type="button"
                size="small"
                variant="secondary"
                icon={<TrashIcon />}
                onClick={() => {
                    if (inneholderKunEnPeriode) {
                        return handleDeletePeriode(permisjonsperiode.perioder[0]);
                    }

                    setIsDeleteModalOpen(true);
                }}
            >
                <FormattedMessage id="uttaksplan.slett" />
            </Button>
        </HStack>
    );
};
