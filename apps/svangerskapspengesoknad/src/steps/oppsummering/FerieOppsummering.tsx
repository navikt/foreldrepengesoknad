import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { FormattedMessage } from 'react-intl';
import { AvtaltFerie } from 'types/AvtaltFerie';

import { FormSummary } from '@navikt/ds-react';

import { JaNeiTekst } from '@navikt/fp-steg-oppsummering';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { notEmpty } from '../../../../../packages/validation';

export function FerieOppsummering({ onVilEndreSvar }: { readonly onVilEndreSvar: () => void }) {
    const ferie = useContextGetData(ContextDataType.FERIE);
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));

    if (!ferie) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">FERIE</FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {tilrettelegginger.length > 1 ? (
                    <FlereArbeidsgivereFerieOppsummering avtaltFerie={ferie} />
                ) : (
                    <FeriePeriodeOppsummering avtaltFerie={ferie} />
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
}

const FeriePeriodeOppsummering = ({ avtaltFerie }: { avtaltFerie: AvtaltFerie[] }) => {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>Har du planlagt ferie i perioden du skal ha svangerskapspenger?</FormSummary.Label>
                <JaNeiTekst ja={avtaltFerie.length > 0} />
            </FormSummary.Answer>

            {avtaltFerie.length > 0 && (
                <>
                    <FormSummary.Answer>
                        <FormSummary.Label>Hvor mange perioder med ferie skal du ha?</FormSummary.Label>
                        <FormSummary.Value>{avtaltFerie.length}</FormSummary.Value>
                    </FormSummary.Answer>

                    <FormSummary.Answer>
                        <FormSummary.Label>Periode med ferie</FormSummary.Label>
                        <FormSummary.Value>
                            <ul>
                                {avtaltFerie.map((feriePeriode) => (
                                    <li key={`${feriePeriode.fom}-${feriePeriode.tom}`}>
                                        {formatDate(feriePeriode.fom)} - {formatDate(feriePeriode.tom)}
                                    </li>
                                ))}
                            </ul>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                </>
            )}
        </>
    );
};

const FlereArbeidsgivereFerieOppsummering = ({ avtaltFerie }: { avtaltFerie: AvtaltFerie[] }) => {
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));

    return tilrettelegginger.map((tilrettelegging) => {
        const perioderForDenneTilretteleggingen = avtaltFerie.filter(
            (periode) => periode.arbeidsforhold.id === tilrettelegging.arbeidsforhold.arbeidsgiverId,
        );
        return (
            <FormSummary.Answer key={tilrettelegging.id}>
                <FormSummary.Label>
                    {capitalizeFirstLetterInEveryWordOnly(tilrettelegging.arbeidsforhold.navn)}
                </FormSummary.Label>
                <FormSummary.Value>
                    <FormSummary.Answers>
                        <FeriePeriodeOppsummering avtaltFerie={perioderForDenneTilretteleggingen} />
                    </FormSummary.Answers>
                </FormSummary.Value>
            </FormSummary.Answer>
        );
    });
};
