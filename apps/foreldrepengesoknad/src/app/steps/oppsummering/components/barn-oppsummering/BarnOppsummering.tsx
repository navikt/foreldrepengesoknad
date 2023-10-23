import {
    Barn,
    BarnType,
    formatDate,
    intlUtils,
    isAdoptertAnnetBarn,
    isAdoptertStebarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import BarnAdoptertIUtlandetDetaljer from './BarnAdoptertIUtlandetDetaljer';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    barn: Barn;
    familiehendelsesdato: Date;
}

const getAntallBarnTekst = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intlUtils(intl, 'oppsummering.barn.antallBarn.ettBarn');
    }

    if (antallBarn === 2) {
        return intlUtils(intl, 'oppsummering.barn.antallBarn.toBarn');
    }

    return intlUtils(intl, 'oppsummering.barn.antallBarn.flere', { antallBarn });
};

const getTerminEllerFødselTittel = (type: BarnType) => {
    if (type === BarnType.UFØDT) {
        return 'Termin';
    }

    return 'Fødselsdato';
};

const getTerminEllerFødselsdato = (barn: Barn) => {
    if (isUfødtBarn(barn)) {
        return formatDate(barn.termindato);
    }

    return formatDate(barn.fødselsdatoer[0]);
};

const BarnOppsummering: FunctionComponent<Props> = ({ barn, familiehendelsesdato }) => {
    const intl = useIntl();

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.barn.søknadenGjelder')}>
                <BodyShort>{getAntallBarnTekst(barn.antallBarn, intl)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={getTerminEllerFødselTittel(barn.type)}>
                <BodyShort>{getTerminEllerFødselsdato(barn)}</BodyShort>
            </OppsummeringsPunkt>
            {(isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn)) && (
                <>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.barn.gjelderSøknadenStebarnsadopsjon')}>
                        <BodyShort>
                            <FormattedMessage id={barn.type === BarnType.ADOPTERT_STEBARN ? 'ja' : 'nei'} />
                        </BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.barn.adopsjonsdato')}>
                        <BodyShort>{formatDate(barn.adopsjonsdato)}</BodyShort>
                    </OppsummeringsPunkt>
                    <BarnAdoptertIUtlandetDetaljer barn={barn} familiehendelsesdato={familiehendelsesdato} />
                </>
            )}
        </>
    );
};

export default BarnOppsummering;
