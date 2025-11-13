import { CalendarIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, UttaksplanModus, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import {
    isHull,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isPrematuruker,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '../../utils/periodeUtils';
import { EndrePeriodePanel } from '../endre-periode-panel/EndrePeriodePanel';
import { SlettPeriodePanel } from '../slett-periode-panel/SlettPeriodePanel';
import { FamiliehendelseContent } from './components/FamiliehendelseContent';
import { OppholdsPeriodeContent } from './components/OppholdsperiodeContent';
import { OverføringsperiodeContent } from './components/OverføringsperiodeContent';
import { PeriodeUtenUttakContent } from './components/PeriodeUtenUttakContext';
import { PrematurukerContent } from './components/PrematurukerContent';
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
    const [isEndrePeriodePanelOpen, setIsEndrePeriodePanelOpen] = useState(false);
    const [isSlettPeriodePanelOpen, setIsSlettPeriodePanelOpen] = useState(false);

    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const erRedigerbar = !permisjonsperiode.perioder.some(
        (p) => isHull(p) || isPeriodeUtenUttak(p) || isUtsettelsesperiode(p),
    );

    const { navnPåForeldre, erFarEllerMedmor, barn, modus } = useUttaksplanData();

    const familiehendelseType = getFamiliehendelseType(barn);

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    return (
        <>
            {!isEndrePeriodePanelOpen && !isSlettPeriodePanelOpen && (
                <>
                    <VStack gap="space-16">
                        {permisjonsperiode.perioder.map((periode) => {
                            return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                        })}
                        <SkalJobbeContent permisjonsperiode={permisjonsperiode} />
                    </VStack>
                    {renderKnapper(modus, erRedigerbar, setIsEndrePeriodePanelOpen, setIsSlettPeriodePanelOpen)}
                </>
            )}
            {isEndrePeriodePanelOpen ? (
                <EndrePeriodePanel
                    closePanel={() => {
                        setIsEndrePeriodePanelOpen(false);
                    }}
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleAddPeriode={handleAddPeriode}
                    permisjonsperiode={permisjonsperiode}
                    inneholderKunEnPeriode={inneholderKunEnPeriode}
                />
            ) : null}
            {isSlettPeriodePanelOpen ? (
                <SlettPeriodePanel
                    closePanel={() => {
                        setIsSlettPeriodePanelOpen(false);
                    }}
                    handleDeletePeriode={handleDeletePeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    permisjonsperiode={permisjonsperiode}
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

    if (isPrematuruker(periode)) {
        return <PrematurukerContent key={periode.id} />;
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
    setIsEndrePeriodePanelOpen: (open: boolean) => void,
    setIsSlettPeriodePanelOpen: (open: boolean) => void,
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
                        setIsEndrePeriodePanelOpen(true);
                    }}
                    icon={<PencilIcon />}
                >
                    Endre
                </Button>
            </HStack>
        );
    }

    return (
        <HStack gap="space-16" justify="end" marginBlock={{ xs: 'space-16 space-0', sm: 'space-0' }}>
            <Button
                type="button"
                size="small"
                variant="secondary"
                onClick={() => {
                    setIsEndrePeriodePanelOpen(true);
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
                    setIsSlettPeriodePanelOpen(true);
                }}
            >
                <FormattedMessage id="uttaksplan.slett" />
            </Button>
        </HStack>
    );
};
