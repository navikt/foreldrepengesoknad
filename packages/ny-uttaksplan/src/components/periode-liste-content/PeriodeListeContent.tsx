import { CalendarIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, Stack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, isAdoptertBarn, isFødtBarn, isUfødtBarn } from '@navikt/fp-types';
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
import { EndrePeriodeModal } from '../endre-periode-panel/EndrePeriodeModal';
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
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
    handleDeletePeriode: (slettetPeriode: Planperiode) => void;
    handleDeletePerioder: (slettedePerioder: Planperiode[]) => void;
}

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
        <div key={periode.id} style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort weight="semibold">Ikke implementert</BodyShort>
                </div>
            </div>
        </div>
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

export const PeriodeListeContent = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
    handleDeletePeriode,
    handleDeletePerioder,
}: Props) => {
    const [isEndringsModalOpen, setIsEndringsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const erRedigerbar =
        permisjonsperiode.perioder.find(
            (p: Planperiode) => isHull(p) || isPeriodeUtenUttak(p) || isUtsettelsesperiode(p),
        ) === undefined;

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

    const closeEndringsModal = () => {
        setIsEndringsModalOpen(false);
    };
    const openEndringsModal = () => {
        setIsEndringsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    return (
        <div style={{ marginTop: '1rem' }}>
            {isEndringsModalOpen ? (
                <EndrePeriodeModal
                    closeModal={closeEndringsModal}
                    handleUpdatePeriode={handleUpdatePeriode}
                    permisjonsperiode={permisjonsperiode}
                    inneholderKunEnPeriode={inneholderKunEnPeriode}
                    isModalOpen={isEndringsModalOpen}
                    erBarnetFødt={erBarnetFødt}
                    gjelderAdopsjon={gjelderAdopsjon}
                />
            ) : null}
            {!isEndringsModalOpen ? (
                <>
                    <Stack direction={{ sm: 'column', md: 'column' }}>
                        {permisjonsperiode.perioder.map((periode) => {
                            return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                        })}
                    </Stack>
                    <SkalJobbeContent permisjonsperiode={permisjonsperiode} />

                    {modus !== 'innsyn' && erRedigerbar && (
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <Button
                                type="button"
                                size="xsmall"
                                variant="secondary"
                                onClick={openEndringsModal}
                                icon={<PencilIcon />}
                            >
                                Endre
                            </Button>
                            <Button
                                type="button"
                                size="xsmall"
                                variant="secondary"
                                icon={<TrashIcon />}
                                onClick={() => {
                                    if (inneholderKunEnPeriode) {
                                        return handleDeletePeriode(permisjonsperiode.perioder[0]);
                                    }

                                    openDeleteModal();
                                }}
                            >
                                <FormattedMessage id="uttaksplan.slett" />
                            </Button>
                        </div>
                    )}
                </>
            ) : null}

            {isDeleteModalOpen ? (
                <SlettPeriodeModal
                    closeModal={closeDeleteModal}
                    handleDeletePeriode={handleDeletePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    permisjonsperiode={permisjonsperiode}
                    isModalOpen={isDeleteModalOpen}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={erFarEllerMedmor}
                />
            ) : null}
        </div>
    );
};
