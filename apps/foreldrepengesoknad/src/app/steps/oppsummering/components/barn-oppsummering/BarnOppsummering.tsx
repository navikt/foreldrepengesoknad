import { Barn, BarnType, formatDate, isAdoptertAnnetBarn, isAdoptertStebarn, isUfødtBarn } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import BarnAdoptertIUtlandetDetaljer from './BarnAdoptertIUtlandetDetaljer';
import { BodyShort, VStack } from '@navikt/ds-react';

interface Props {
    barn: Barn;
    familiehendelsesdato: Date;
}

const getAntallBarnTekst = (antallBarn: number, intl: IntlShape): string => {
    if (antallBarn === 1) {
        return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.ettBarn' });
    }

    if (antallBarn === 2) {
        return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.toBarn' });
    }

    return intl.formatMessage({ id: 'oppsummering.barn.antallBarn.flere' }, { antallBarn });
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
        <VStack gap="4">
            <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.barn.søknadenGjelder' })}>
                <BodyShort>{getAntallBarnTekst(barn.antallBarn, intl)}</BodyShort>
            </OppsummeringsPunkt>
            <OppsummeringsPunkt title={getTerminEllerFødselTittel(barn.type)}>
                <BodyShort>{getTerminEllerFødselsdato(barn)}</BodyShort>
            </OppsummeringsPunkt>
            {(isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn)) && (
                <>
                    <OppsummeringsPunkt
                        title={intl.formatMessage({ id: 'oppsummering.barn.gjelderSøknadenStebarnsadopsjon' })}
                    >
                        <BodyShort>
                            <FormattedMessage id={barn.type === BarnType.ADOPTERT_STEBARN ? 'ja' : 'nei'} />
                        </BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.barn.adopsjonsdato' })}>
                        <BodyShort>{formatDate(barn.adopsjonsdato)}</BodyShort>
                    </OppsummeringsPunkt>
                    <BarnAdoptertIUtlandetDetaljer barn={barn} familiehendelsesdato={familiehendelsesdato} />
                </>
            )}
        </VStack>
    );
};

export default BarnOppsummering;
