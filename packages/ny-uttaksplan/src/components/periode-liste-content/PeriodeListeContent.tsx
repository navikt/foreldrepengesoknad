import { CalendarIcon, InformationSquareIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyLong, BodyShort, HStack } from '@navikt/ds-react';

import {
    AnnenForelder,
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

interface Props {
    periode: Periode;
    erFamiliehendelse: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    annenForelder: AnnenForelder;
    inneholderKunEnPeriode: boolean;
    familiehendelseType?: FamiliehendelseType;
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
    erFamiliehendelse: boolean,
    intl: IntlShape,
    familiehendelseType?: FamiliehendelseType,
) => {
    if (erFamiliehendelse && familiehendelseType !== undefined) {
        return renderFamiliehendelse(familiehendelseType);
    }

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
    periode,
    navnPåForeldre,
    erFarEllerMedmor,
    inneholderKunEnPeriode,
    erFamiliehendelse,
    familiehendelseType,
}) => {
    const intl = useIntl();

    return (
        <div style={{ marginTop: '1rem' }}>
            <HStack gap="4">
                {renderPeriode(
                    periode,
                    navnPåForeldre,
                    erFarEllerMedmor,
                    inneholderKunEnPeriode,
                    erFamiliehendelse,
                    intl,
                    familiehendelseType,
                )}
            </HStack>
        </div>
    );
};

export default PeriodeListeContent;
