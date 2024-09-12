import { FunctionComponent } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { Barn, BarnType, isAdoptertAnnetBarn, isAdoptertStebarn, isUfødtBarn } from '@navikt/fp-common';
import { formatDate } from '@navikt/fp-utils';

import BarnAdoptertIUtlandetDetaljer from './BarnAdoptertIUtlandetDetaljer';

interface Props {
    barn: Barn;
    familiehendelsesdato: Date;
    onVilEndreSvar: () => void;
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

const BarnOppsummering: FunctionComponent<Props> = ({ barn, familiehendelsesdato, onVilEndreSvar }) => {
    const intl = useIntl();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="BarnOppsummering.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="oppsummering.barn.søknadenGjelder" />
                    </FormSummary.Label>
                    <FormSummary.Value>{getAntallBarnTekst(barn.antallBarn, intl)}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>{getTerminEllerFødselTittel(barn.type)}</FormSummary.Label>
                    <FormSummary.Value>{getTerminEllerFødselsdato(barn)}</FormSummary.Value>
                </FormSummary.Answer>
                {(isAdoptertAnnetBarn(barn) || isAdoptertStebarn(barn)) && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="oppsummering.barn.gjelderSøknadenStebarnsadopsjon" />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <FormattedMessage id={barn.type === BarnType.ADOPTERT_STEBARN ? 'ja' : 'nei'} />
                            </FormSummary.Value>
                        </FormSummary.Answer>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="oppsummering.barn.adopsjonsdato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{formatDate(barn.adopsjonsdato)}</FormSummary.Value>
                        </FormSummary.Answer>
                        <BarnAdoptertIUtlandetDetaljer barn={barn} familiehendelsesdato={familiehendelsesdato} />
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default BarnOppsummering;
