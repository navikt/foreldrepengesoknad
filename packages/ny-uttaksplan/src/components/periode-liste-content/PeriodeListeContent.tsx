import { CalendarIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import {
    Barn,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
    isAdoptertBarn,
    isUfødtBarn,
} from '@navikt/fp-types';

import { useUttaksplanData } from '../../context/UttaksplanDataContext';
import { Uttaksplanperiode } from '../../types/UttaksplanPeriode';
import {
    genererPeriodeId,
    isOppholdsperiode,
    isOverføringsperiode,
    isPeriodeUtenUttak,
    isPrematuruker,
    isTapteDager,
    isUtsettelsesperiode,
    isUttaksperiode,
} from '../../utils/periodeUtils';
import { EndrePeriodePanel } from '../endre-periode-panel/EndrePeriodePanel';
import { SlettPeriodePanel } from '../slett-periode-panel/SlettPeriodePanel';
import {
    erUttaksplanperiodeTapteDager,
    erUttaksplanperiodeUtenUttak,
    erUttaksplanperiodeUtsettelse,
    harUttaksplanperiodePrematuruker,
} from '../uttaksplanperiodeUtils';
import { FamiliehendelseContent } from './components/FamiliehendelseContent';
import { OppholdsPeriodeContent } from './components/OppholdsperiodeContent';
import { OverføringsperiodeContent } from './components/OverføringsperiodeContent';
import { PeriodeUtenUttakContent } from './components/PeriodeUtenUttakContext';
import { PrematurukerContent } from './components/PrematurukerContent';
import { SkalJobbeContent } from './components/SkalJobbeContent';
import { UtsettelsesPeriodeContent } from './components/UtsettelsesPeriodeContent';
import { UttaksperiodeContent } from './components/UttaksperiodeContent';

interface Props {
    isReadOnly: boolean;
    uttaksplanperioder: Uttaksplanperiode[];
    erFamiliehendelse: boolean;
    handleAddPeriode: (nyPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => void;
    handleUpdatePeriode: (
        oppdatertPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
        gammelPeriode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt,
    ) => void;
    handleDeletePerioder: (slettedePerioder: Array<{ fom: string; tom: string }>) => void;
}

export const PeriodeListeContent = ({
    isReadOnly,
    uttaksplanperioder,
    erFamiliehendelse,
    handleAddPeriode,
    handleUpdatePeriode,
    handleDeletePerioder,
}: Props) => {
    const [isEndrePeriodePanelOpen, setIsEndrePeriodePanelOpen] = useState(false);
    const [isSlettPeriodePanelOpen, setIsSlettPeriodePanelOpen] = useState(false);

    const inneholderKunEnPeriode = uttaksplanperioder.length === 1;
    const erRedigerbar =
        !erUttaksplanperiodeTapteDager(uttaksplanperioder) &&
        !erUttaksplanperiodeUtenUttak(uttaksplanperioder) &&
        !(erUttaksplanperiodeUtsettelse(uttaksplanperioder) && !harUttaksplanperiodePrematuruker(uttaksplanperioder));

    const {
        foreldreInfo: { navnPåForeldre, søker },
        barn,
    } = useUttaksplanData();

    const familiehendelseType = getFamiliehendelseType(barn);

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    return (
        <>
            {!isEndrePeriodePanelOpen && !isSlettPeriodePanelOpen && (
                <>
                    <VStack gap="space-16">
                        {uttaksplanperioder.map((periode) => {
                            return renderPeriode(
                                periode,
                                navnPåForeldre,
                                søker === 'FAR_ELLER_MEDMOR',
                                inneholderKunEnPeriode,
                            );
                        })}
                        <SkalJobbeContent uttaksplanperioder={uttaksplanperioder} />
                    </VStack>
                    {renderKnapper(
                        isReadOnly || harUttaksplanperiodePrematuruker(uttaksplanperioder),
                        erRedigerbar,
                        setIsEndrePeriodePanelOpen,
                        setIsSlettPeriodePanelOpen,
                    )}
                </>
            )}
            {isEndrePeriodePanelOpen ? (
                <EndrePeriodePanel
                    closePanel={() => {
                        setIsEndrePeriodePanelOpen(false);
                    }}
                    handleUpdatePeriode={handleUpdatePeriode}
                    handleAddPeriode={handleAddPeriode}
                    handleDeletePerioder={handleDeletePerioder}
                    uttaksplanperioder={uttaksplanperioder}
                    inneholderKunEnPeriode={inneholderKunEnPeriode}
                />
            ) : null}
            {isSlettPeriodePanelOpen ? (
                <SlettPeriodePanel
                    closePanel={() => {
                        setIsSlettPeriodePanelOpen(false);
                    }}
                    handleDeletePerioder={handleDeletePerioder}
                    uttaksplanperioder={uttaksplanperioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={søker === 'FAR_ELLER_MEDMOR'}
                />
            ) : null}
        </>
    );
};

const renderPeriode = (
    periode: Uttaksplanperiode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
) => {
    if (isOppholdsperiode(periode)) {
        return (
            <OppholdsPeriodeContent
                key={genererPeriodeId(periode)}
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
                key={genererPeriodeId(periode)}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                periode={periode}
            />
        );
    }

    if (isPeriodeUtenUttak(periode) || isTapteDager(periode)) {
        return (
            <PeriodeUtenUttakContent key={genererPeriodeId(periode)} periode={periode} isHull={isTapteDager(periode)} />
        );
    }

    if (isUtsettelsesperiode(periode)) {
        return <UtsettelsesPeriodeContent key={genererPeriodeId(periode)} periode={periode} />;
    }

    if (isPrematuruker(periode)) {
        return <PrematurukerContent key={genererPeriodeId(periode)} />;
    }

    if (isUttaksperiode(periode)) {
        return (
            <UttaksperiodeContent
                key={genererPeriodeId(periode)}
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
    isReadOnly: boolean,
    erRedigerbar: boolean,
    setIsEndrePeriodePanelOpen: (open: boolean) => void,
    setIsSlettPeriodePanelOpen: (open: boolean) => void,
) => {
    if (isReadOnly) {
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
                    <FormattedMessage id="uttaksplan.endre" />
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
