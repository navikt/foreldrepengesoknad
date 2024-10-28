import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { FormattedMessage } from 'react-intl';
import { AvtaltFerieDto } from 'types/AvtaltFerie';

import { FormSummary } from '@navikt/ds-react';

import { JaNeiTekst } from '@navikt/fp-steg-oppsummering';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

import { Arbeidsforhold } from '../../../../../packages/types';
import { notEmpty } from '../../../../../packages/validation';

export function FerieOppsummering({
    onVilEndreSvar,
    alleArbeidsforhold,
}: {
    onVilEndreSvar: () => void;
    alleArbeidsforhold: Arbeidsforhold[];
}) {
    const ferie = useContextGetData(ContextDataType.FERIE);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD) ?? [];
    console.log(valgteArbeidsforhold);
    if (!ferie) {
        return null;
    }

    const flatFerie = Object.values(ferie).flatMap((p) => p.feriePerioder);

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">FERIE</FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {valgteArbeidsforhold.length > 1 ? (
                    <FlereArbeidsgivereFerieOppsummering
                        avtaltFerie={flatFerie}
                        alleArbeidsforhold={alleArbeidsforhold}
                    />
                ) : (
                    <FeriePeriodeOppsummering avtaltFerie={flatFerie} />
                )}
            </FormSummary.Answers>
        </FormSummary>
    );
}

const FeriePeriodeOppsummering = ({ avtaltFerie }: { avtaltFerie: AvtaltFerieDto[] }) => {
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

const FlereArbeidsgivereFerieOppsummering = ({
    avtaltFerie,
    alleArbeidsforhold,
}: {
    avtaltFerie: AvtaltFerieDto[];
    alleArbeidsforhold: Arbeidsforhold[];
}) => {
    const valgteArbeidsforhold = notEmpty(useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD));

    return valgteArbeidsforhold.map((arbeidsforholdId) => {
        const perioderForDenneTilretteleggingen = avtaltFerie.filter(
            (periode) => periode.arbeidsforhold.id === arbeidsforholdId,
        );
        return (
            <FormSummary.Answer key={arbeidsforholdId}>
                <FormSummary.Label>
                    {capitalizeFirstLetterInEveryWordOnly(
                        alleArbeidsforhold.find((arbeidsforhold) => arbeidsforhold.arbeidsgiverId === arbeidsforholdId)
                            ?.arbeidsgiverNavn,
                    )}
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
