import { CalendarIcon, PencilIcon, TrashIcon } from '@navikt/aksel-icons';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-types';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { useUttaksplanRedigering } from '../../../context/UttaksplanRedigeringContext';
import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../../../types/UttaksplanPeriode';
import {
    erDetEksisterendePerioderEtterValgtePerioder,
    erOppholdsperiode,
    erOverføringsperiode,
    erPrematuruker,
    erUtsettelsesperiode,
    erUttaksperiode,
} from '../../../utils/periodeUtils';
import { UttakPeriodeBuilder } from '../../../utils/UttakPeriodeBuilder';
import { genererPeriodeKey } from '../../utils/uttaksplanListeUtils';
import {
    erUttaksplanperiodeEøs,
    erUttaksplanperiodeFamiliehendelseDato,
    erUttaksplanperiodeTapteDager,
    erUttaksplanperiodeUtenUttak,
    harUttaksplanperiodePrematuruker,
} from '../../utils/uttaksplanperiodeUtils';
import { EndrePeriodePanel } from '../endre-periode-panel/EndrePeriodePanel';
import { FamiliehendelseContent } from './components/FamiliehendelseContent';
import { OppholdsPeriodeContent } from './components/OppholdsperiodeContent';
import { OverføringsperiodeContent } from './components/OverføringsperiodeContent';
import { PeriodeUtenUttakContent } from './components/PeriodeUtenUttakContext';
import { PrematurukerContent } from './components/PrematurukerContent';
import { SkalJobbeContent } from './components/SkalJobbeContent';
import { UtsettelsesPeriodeContent } from './components/UtsettelsesPeriodeContent';
import { UttaksperiodeContent } from './components/UttaksperiodeContent';
import { SlettPeriodePanel } from './slett-periode-panel/SlettPeriodePanel';

interface Props {
    isReadOnly: boolean;
    uttaksplanperioder: Uttaksplanperiode[];
}

export const PeriodeListeContent = ({ isReadOnly, uttaksplanperioder }: Props) => {
    const [isEndrePeriodePanelOpen, setIsEndrePeriodePanelOpen] = useState(false);
    const [isSlettPeriodePanelOpen, setIsSlettPeriodePanelOpen] = useState(false);

    const {
        foreldreInfo: { navnPåForeldre, søker },
        barn,
        erPeriodeneTilAnnenPartLåst,
        uttakPerioder,
    } = useUttaksplanData();

    const uttaksplanRedigering = useUttaksplanRedigering();

    const erPeriodeForAnnenPartSomErLåst =
        erPeriodeneTilAnnenPartLåst && uttaksplanperioder.some((p) => erVanligUttakPeriode(p) && p.forelder !== søker);

    const inneholderKunEnPeriode = uttaksplanperioder.length === 1;
    const erRedigerbar =
        !erUttaksplanperiodeTapteDager(uttaksplanperioder) &&
        !erUttaksplanperiodeUtenUttak(uttaksplanperioder) &&
        !harUttaksplanperiodePrematuruker(uttaksplanperioder);

    const erFamiliehendelse = erUttaksplanperiodeFamiliehendelseDato(uttaksplanperioder);

    const handleSlettClick = () => {
        const erEksisterendePerioderEtterValgteDager = erDetEksisterendePerioderEtterValgtePerioder(
            uttakPerioder,
            uttaksplanperioder,
        );

        if (!erEksisterendePerioderEtterValgteDager && uttaksplanperioder.length === 1) {
            const nyeUttakPerioder = new UttakPeriodeBuilder(uttakPerioder)
                .fjernUttakPerioder(uttaksplanperioder, false)
                .getUttakPerioder();
            uttaksplanRedigering?.oppdaterUttaksplan?.(nyeUttakPerioder);
        } else {
            setIsSlettPeriodePanelOpen(true);
        }
    };

    if (erFamiliehendelse) {
        return <FamiliehendelseContent barn={barn} />;
    }

    return (
        <>
            {!isEndrePeriodePanelOpen && !isSlettPeriodePanelOpen && (
                <>
                    <VStack gap="space-16">
                        {uttaksplanperioder.map((periode) => (
                            <Periode
                                key={genererPeriodeKey(periode)}
                                periode={periode}
                                navnPåForeldre={navnPåForeldre}
                                erFarEllerMedmor={søker === 'FAR_MEDMOR'}
                                inneholderKunEnPeriode={inneholderKunEnPeriode}
                            />
                        ))}
                        <SkalJobbeContent uttaksplanperioder={uttaksplanperioder} />
                    </VStack>
                    <EndreOgSlettKnapper
                        isReadOnly={
                            isReadOnly ||
                            harUttaksplanperiodePrematuruker(uttaksplanperioder) ||
                            erUttaksplanperiodeEøs(uttaksplanperioder) ||
                            erPeriodeForAnnenPartSomErLåst
                        }
                        erRedigerbar={erRedigerbar}
                        setIsEndrePeriodePanelOpen={setIsEndrePeriodePanelOpen}
                        onSlettPeriodeClick={handleSlettClick}
                    />
                </>
            )}
            {isEndrePeriodePanelOpen && (
                <EndrePeriodePanel
                    closePanel={() => {
                        setIsEndrePeriodePanelOpen(false);
                    }}
                    uttaksplanperioder={uttaksplanperioder}
                />
            )}
            {isSlettPeriodePanelOpen && (
                <SlettPeriodePanel
                    closePanel={() => {
                        setIsSlettPeriodePanelOpen(false);
                    }}
                    uttaksplanperioder={uttaksplanperioder}
                    navnPåForeldre={navnPåForeldre}
                    erFarEllerMedmor={søker === 'FAR_MEDMOR'}
                />
            )}
        </>
    );
};

const Periode = ({
    periode,
    navnPåForeldre,
    erFarEllerMedmor,
    inneholderKunEnPeriode,
}: {
    periode: Uttaksplanperiode;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    inneholderKunEnPeriode: boolean;
}) => {
    if (erVanligUttakPeriode(periode) && erOppholdsperiode(periode)) {
        return (
            <OppholdsPeriodeContent
                key={genererPeriodeKey(periode)}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
                periode={periode}
            />
        );
    }

    if (erVanligUttakPeriode(periode) && erOverføringsperiode(periode)) {
        return (
            <OverføringsperiodeContent
                key={genererPeriodeKey(periode)}
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                periode={periode}
            />
        );
    }

    if (erPeriodeUtenUttakHull(periode) || erTapteDagerHull(periode)) {
        return (
            <PeriodeUtenUttakContent
                key={genererPeriodeKey(periode)}
                periode={periode}
                isHull={erTapteDagerHull(periode)}
            />
        );
    }

    if (erVanligUttakPeriode(periode) && erUtsettelsesperiode(periode)) {
        return <UtsettelsesPeriodeContent key={genererPeriodeKey(periode)} periode={periode} />;
    }

    if (erPrematuruker(periode)) {
        return <PrematurukerContent key={genererPeriodeKey(periode)} />;
    }

    if ((erVanligUttakPeriode(periode) && erUttaksperiode(periode)) || erEøsUttakPeriode(periode)) {
        return (
            <UttaksperiodeContent
                key={genererPeriodeKey(periode)}
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

const EndreOgSlettKnapper = ({
    isReadOnly,
    erRedigerbar,
    setIsEndrePeriodePanelOpen,
    onSlettPeriodeClick,
}: {
    isReadOnly: boolean;
    erRedigerbar: boolean;
    setIsEndrePeriodePanelOpen: (open: boolean) => void;
    onSlettPeriodeClick: () => void;
}) => {
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
                onClick={onSlettPeriodeClick}
            >
                <FormattedMessage id="uttaksplan.slett" />
            </Button>
        </HStack>
    );
};
