import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

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
                    </FormSummary.Label>
                    <JaNeiTekst ja={ferie.length > 0} />
                </FormSummary.Answer>

                {ferie.length > 0 && (
                    <>
                        <FormSummary.Answer>
                            <FormSummary.Label>Hvor mange perioder med ferie skal du ha?</FormSummary.Label>
                            <FormSummary.Value>{ferie.length}</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>Periode med ferie</FormSummary.Label>
                            <FormSummary.Value>
                                <ul>
                                    {ferie.map((feriePeriode) => (
                                        <li key={`${feriePeriode.fom}-${feriePeriode.tom}`}>
                                            {formatDate(feriePeriode.fom)} - {formatDate(feriePeriode.tom)}
                                        </li>
                                    ))}
                                </ul>
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    </>
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
}
