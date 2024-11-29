import { CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent, useRef } from 'react';

import { BodyShort, Button, Stack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
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
import FamiliehendelseContent from './components/FamiliehendelseContent';
import OppholdsPeriodeContent from './components/OppholdsperiodeContent';
import OverføringsperiodeContent from './components/OverføringsperiodeContent';
import PeriodeUtenUttakContent from './components/PeriodeUtenUttakContext';
import { SkalJobbeContent } from './components/SkalJobbeContent';
import UtsettelsesPeriodeContent from './components/UtsettelsesPeriodeContent';
import UttaksperiodeContent from './components/UttaksperiodeContent';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse: boolean;
    handleUpdatePeriode: (oppdatertPeriode: Planperiode) => void;
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

const PeriodeListeContent: FunctionComponent<Props> = ({
    permisjonsperiode,
    erFamiliehendelse,
    handleUpdatePeriode,
}) => {
    const ref = useRef<HTMLDialogElement>(null);

    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const barn = notEmpty(useContextGetData(UttaksplanContextDataType.BARN));
    const familiehendelseType = getFamiliehendelseType(barn);

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    const closeModal = () => ref.current?.close();
    const openModal = () => ref.current?.showModal();

    return (
        <div style={{ marginTop: '1rem' }}>
            <Stack direction={{ sm: 'column', md: 'column' }}>
                {permisjonsperiode.perioder.map((periode) => {
                    return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                })}
            </Stack>
            <SkalJobbeContent permisjonsperiode={permisjonsperiode} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Button type="button" variant="secondary" onClick={openModal}>
                    Endre
                </Button>
                <Button type="button" variant="secondary">
                    Slett
                </Button>
            </div>
            <EndrePeriodeModal
                ref={ref}
                closeModal={closeModal}
                handleUpdatePeriode={handleUpdatePeriode}
                permisjonsperiode={permisjonsperiode}
            />
        </div>
    );
};

export default PeriodeListeContent;
