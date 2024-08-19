import { BriefcaseIcon, CalendarIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';

import { BodyShort, HStack } from '@navikt/ds-react';

import { FamiliehendelseType, NavnPåForeldre, Periode, isOppholdsperiode, isUttaksperiode } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
import FamiliehendelseContent from './components/FamiliehendelseContent';
import OppholdsperiodeContent from './components/OppholdsperiodeContent';
import UttaksperiodeContent from './components/UttaksperiodeContent';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelseType: FamiliehendelseType | undefined;
    erFamiliehendelse: boolean;
}

const renderPeriode = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
) => {
    if (isUttaksperiode(periode)) {
        return <UttaksperiodeContent inneholderKunEnPeriode={inneholderKunEnPeriode} periode={periode} />;
    }

    if (isOppholdsperiode(periode)) {
        return (
            <OppholdsperiodeContent
                inneholderKunEnPeriode={inneholderKunEnPeriode}
                navnPåForeldre={navnPåForeldre}
                erFarEllerMedmor={erFarEllerMedmor}
                periode={periode}
            />
        );
    }

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort weight="semibold">Her skjer det ingenting</BodyShort>
                </div>
            </div>
        </div>
    );
};

const PeriodeListeContent: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelseType,
    erFamiliehendelse,
}) => {
    const inneholderKunEnPeriode = permisjonsperiode.perioder.length === 1;
    const skalJobbeIPermisjonsperioden =
        permisjonsperiode.perioder.find((p) => {
            if (isUttaksperiode(p) && p.gradert) {
                return p;
            }

            return undefined;
        }) !== undefined;

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));

    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return <FamiliehendelseContent familiehendelseType={familiehendelseType} />;
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <HStack gap="4">
                {permisjonsperiode.perioder.map((periode) => {
                    return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode);
                })}
            </HStack>
            {skalJobbeIPermisjonsperioden ? (
                <div style={{ margin: '0.5rem 0', display: 'flex' }}>
                    <div>
                        <BriefcaseIcon width={24} height={24} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                            <BodyShort>Skal jobbe</BodyShort>
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
