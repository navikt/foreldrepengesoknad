import {
    AnnenForelder,
    Arbeidsforhold,
    Dekningsgrad,
    NavnPåForeldre,
    Periode,
    Situasjon,
    intlUtils,
} from '@navikt/fp-common';

import { FormattedMessage, useIntl } from 'react-intl';

import OppsummeringsPunkt from '../OppsummeringsPunkt';
import UttaksplanOppsummeringsliste from './UttaksplanOppsummeringsliste';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: Arbeidsforhold[];
    dekningsgrad: Dekningsgrad;
    antallUkerUttaksplan: number;
    annenForelder: AnnenForelder;
    familiehendelsesdato: Date;
    termindato: Date | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    antallBarn: number;
    ønskerJustertUttakVedFødsel: boolean | undefined;
    eksisterendeUttaksplan?: Periode[];
}

const UttaksplanOppsummering: React.FunctionComponent<Props> = ({
    dekningsgrad,
    antallUkerUttaksplan,
    ønskerJustertUttakVedFødsel,
    antallBarn,
    ...rest
}) => {
    const intl = useIntl();

    const dekningsgradTekst =
        dekningsgrad === Dekningsgrad.HUNDRE_PROSENT
            ? intlUtils(intl, 'oppsummering.uttak.dekningsgrad.verdi100', { antallUker: antallUkerUttaksplan })
            : intlUtils(intl, 'oppsummering.uttak.dekningsgrad.verdi80', { antallUker: antallUkerUttaksplan });
    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.uttak.dekningsgrad.label')}>
                <BodyShort>{dekningsgradTekst}</BodyShort>
            </OppsummeringsPunkt>
            <UttaksplanOppsummeringsliste
                ønskerJustertUttakVedFødsel={ønskerJustertUttakVedFødsel}
                {...rest}
            ></UttaksplanOppsummeringsliste>
            {ønskerJustertUttakVedFødsel !== undefined && (
                <OppsummeringsPunkt
                    title={intlUtils(intl, 'oppsummering.uttak.ønskerAutomatiskJustering.label', {
                        antallBarn,
                    })}
                >
                    <BodyShort>
                        <FormattedMessage id={ønskerJustertUttakVedFødsel ? 'ja' : 'nei'} />
                    </BodyShort>
                </OppsummeringsPunkt>
            )}
        </>
    );
};

export default UttaksplanOppsummering;
