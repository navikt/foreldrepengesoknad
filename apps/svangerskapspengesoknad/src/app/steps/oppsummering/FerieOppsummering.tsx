import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

import { ContextDataType, useContextGetData } from 'app/appData/SvpDataContext';

import { JaNeiTekst } from './ArbeidsforholdOppsummering';

export function FerieOppsummering({ onVilEndreSvar }: { readonly onVilEndreSvar: () => void }) {
    const ferie = useContextGetData(ContextDataType.FERIE);

    if (!ferie) {
        return null;
    }
    console.log(ferie);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">FERIE</FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        Har du planlagt ferie i perioden du skal ha svangerskapspenger?
                        <FormattedMessage id="frilans.oppstart" />
                    </FormSummary.Label>
                    <JaNeiTekst ja={ferie.length > 0} />
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <FormSummary.Label>Hvor mange perioder med ferie skal du ha?</FormSummary.Label>
                    <FormSummary.Value>
                        <JaNeiTekst ja={ferie.length > 0} />
                    </FormSummary.Value>
                </FormSummary.Answer>

                <FormSummary.Answer>
                    <FormSummary.Label>Periode med ferie</FormSummary.Label>
                    <FormSummary.Value>
                        <ul>
                            {ferie.map((feriePeriode, index) => (
                                <li key={index}>
                                    {formatDate(feriePeriode.fom)} - {formatDate(feriePeriode.tom)}
                                </li>
                            ))}
                        </ul>
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
}
