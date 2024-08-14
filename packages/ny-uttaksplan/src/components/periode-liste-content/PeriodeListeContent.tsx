import { BriefcaseIcon, CalendarIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyLong, BodyShort, HStack } from '@navikt/ds-react';

import {
    FamiliehendelseType,
    NavnPåForeldre,
    Oppholdsperiode,
    Periode,
    Uttaksperiode,
    getVarighetString,
    isOppholdsperiode,
    isUttaksperiode,
} from '@navikt/fp-common';
import { Tidsperioden, formatDateExtended } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelseType: FamiliehendelseType | undefined;
    erFamiliehendelse: boolean;
}

const renderUttaksperiode = (periode: Uttaksperiode, inneholderKunEnPeriode: boolean, intl: IntlShape) => {
    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    {inneholderKunEnPeriode ? (
                        <BodyShort weight="semibold">Hele perioden</BodyShort>
                    ) : (
                        <>
                            <BodyShort weight="semibold">
                                {formatDateExtended(periode.tidsperiode.fom)} -{' '}
                                {formatDateExtended(periode.tidsperiode.tom)}
                            </BodyShort>
                            <BodyShort>
                                {getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl)}
                            </BodyShort>
                        </>
                    )}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <BodyShort>{periode.konto}</BodyShort>
                </div>
            </div>
        </div>
    );
};

const renderOppholdsperiode = (
    periode: Oppholdsperiode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
    intl: IntlShape,
) => {
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;

    return (
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    {inneholderKunEnPeriode ? (
                        <BodyShort weight="semibold">Hele perioden</BodyShort>
                    ) : (
                        <>
                            <BodyShort weight="semibold">
                                {formatDateExtended(periode.tidsperiode.fom)} -{' '}
                                {formatDateExtended(periode.tidsperiode.tom)}
                            </BodyShort>
                            <BodyShort>
                                {getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl)}
                            </BodyShort>
                        </>
                    )}
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <BodyShort>{`${periode.årsak} for ${navnPåForelder}`}</BodyShort>
                </div>
            </div>
        </div>
    );
};

const renderFamiliehendelse = (familiehendelseType: FamiliehendelseType) => {
    if (familiehendelseType === FamiliehendelseType.TERM) {
        return (
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>Termin</div>
            </HStack>
        );
    }

    if (familiehendelseType === FamiliehendelseType.ADOPSJON) {
        return (
            <HStack>
                <div style={{ margin: '1rem', display: 'flex', gap: '1rem' }}>Adopsjon</div>
            </HStack>
        );
    }

    return (
        <HStack gap={'4'}>
            <div style={{ display: 'flex' }}>
                <div>
                    <InformationSquareIcon width={24} height={24} />
                </div>
                <div
                    style={{
                        marginLeft: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    <BodyLong>
                        Mor får 3 uker foreldrepenger som er satt av til å brukes før termin. Hvis barnet blir født før
                        termin, vil man miste dagene av denne perioden, og starte på mødrekvoten av foreldrepengene den
                        dagen barnet blir født.
                    </BodyLong>
                    <BodyLong>
                        Hvis barnet blir født etter termin vil mor bruke noen dager av fellesperioden før fødselen, men
                        starter ikke med mødrekvoten før barnet blir født.
                    </BodyLong>
                </div>
            </div>
        </HStack>
    );
};

const renderPeriode = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    inneholderKunEnPeriode: boolean,
    intl: IntlShape,
) => {
    if (isUttaksperiode(periode)) {
        return renderUttaksperiode(periode, inneholderKunEnPeriode, intl);
    }

    if (isOppholdsperiode(periode)) {
        return renderOppholdsperiode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode, intl);
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
    const intl = useIntl();

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
        return renderFamiliehendelse(familiehendelseType);
    }

    return (
        <div style={{ marginTop: '1rem' }}>
            <HStack gap="4">
                {permisjonsperiode.perioder.map((periode) => {
                    return renderPeriode(periode, navnPåForeldre, erFarEllerMedmor, inneholderKunEnPeriode, intl);
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
