import { BriefcaseIcon, CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort, Stack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre } from '@navikt/fp-common';
import { Barn, isAdoptertBarn, isUfødtBarn } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
import { Planperiode } from '../../types/Planperiode';
import { isOppholdsperiode, isPeriodeUtenUttak, isUttaksperiode } from '../../utils/periodeUtils';
import FamiliehendelseContent from './components/FamiliehendelseContent';
import OppholdsPeriodeContent from './components/OppholdsperiodeContent';
import PeriodeUtenUttakContent from './components/PeriodeUtenUttakContext';
import UttaksperiodeContent from './components/UttaksperiodeContent';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse: boolean;
}

const renderPeriode = (
    periode: Planperiode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
) => {
    if (isUttaksperiode(periode)) {
        return (
            <UttaksperiodeContent
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                periode={periode}
                erFarEllerMedmor={erFarEllerMedmor}
                navnPåForeldre={navnPåForeldre}
            />
        );
    }

    if (isOppholdsperiode(periode)) {
        return (
            <OppholdsPeriodeContent
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
                periode={periode}
            />
        );
    }

    if (isPeriodeUtenUttak(periode)) {
        return <PeriodeUtenUttakContent periode={periode} />;
    }

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
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

const PeriodeListeContent: FunctionComponent<Props> = ({ permisjonsperiode, erFamiliehendelse }) => {
    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const skalJobbeIPermisjonsperioden =
        permisjonsperiode.perioder.find((p) => {
            if (isUttaksperiode(p) && p.gradering !== undefined) {
                return p;
            }

            return undefined;
        }) !== undefined;

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const barn = notEmpty(useContextGetData(UttaksplanContextDataType.BARN));
    const familiehendelseType = getFamiliehendelseType(barn);

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <Stack direction={{ sm: 'column', md: 'column' }}>
                {permisjonsperiode.perioder.map((periode) => {
                    return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                })}
            </Stack>
            {skalJobbeIPermisjonsperioden ? (
                <div style={{ margin: '0.5rem 0', display: 'flex' }}>
                    <div>
                        <BriefcaseIcon width={24} height={24} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                            <BodyShort>Du skal jobbe i denne perioden</BodyShort>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ margin: '0.5rem 0', display: 'flex' }}>
                    <div>
                        <BriefcaseIcon width={24} height={24} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                            <BodyShort>Du skal ikke jobbe i denne perioden</BodyShort>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeriodeListeContent;
