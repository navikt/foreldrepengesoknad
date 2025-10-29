import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { FormattedMessage } from 'react-intl';

import { FormSummary, List } from '@navikt/ds-react';

import { JaNeiTekst } from '@navikt/fp-steg-oppsummering';
import { ArbeidsforholdDto, AvtaltFerieDto, EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly, formatDate } from '@navikt/fp-utils';

export function FerieOppsummering({
    onVilEndreSvar,
    alleArbeidsforhold,
}: {
    onVilEndreSvar: () => void;
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}) {
    const ferie = useContextGetData(ContextDataType.FERIE);
    if (!ferie) {
        return null;
    }

    const flatFerie = Object.values(ferie).flatMap((p) => p.feriePerioder);
    const arbeidsforholdMedFerie = [...new Set(flatFerie.map((f) => getArbeidsforholdId(f.arbeidsforhold)))];

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="ferie.heading" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {arbeidsforholdMedFerie.length > 1 ? (
                    <FlereArbeidsgivereFerieOppsummering
                        avtaltFerie={flatFerie}
                        alleArbeidsforhold={alleArbeidsforhold}
                    />
                ) : (
                    <FeriePeriodeOppsummering avtaltFerie={flatFerie} />
                )}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
}

const FeriePeriodeOppsummering = ({ avtaltFerie }: { avtaltFerie: AvtaltFerieDto[] }) => {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="ferie.harDuPlanlagtFerie.label" />
                </FormSummary.Label>
                <JaNeiTekst ja={avtaltFerie.length > 0} />
            </FormSummary.Answer>

            {avtaltFerie.length > 0 && (
                <>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="ferie.antallPerioder.label" />
                        </FormSummary.Label>
                        <FormSummary.Value>{avtaltFerie.length}</FormSummary.Value>
                    </FormSummary.Answer>

                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage id="oppsummering.ferie.perioder" />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <List>
                                {avtaltFerie.map((feriePeriode) => (
                                    <List.Item key={`${feriePeriode.fom}-${feriePeriode.tom}`}>
                                        {formatDate(feriePeriode.fom)} - {formatDate(feriePeriode.tom)}
                                    </List.Item>
                                ))}
                            </List>
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
    alleArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}) => {
    const arbeidsforholdMedFerie = [...new Set(avtaltFerie.map((f) => getArbeidsforholdId(f.arbeidsforhold)))];

    return arbeidsforholdMedFerie.map((arbeidsforholdId) => {
        const perioderForDenneTilretteleggingen = avtaltFerie.filter(
            (periode) => getArbeidsforholdId(periode.arbeidsforhold) === arbeidsforholdId,
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

const getArbeidsforholdId = (arbeidsforhold: ArbeidsforholdDto) => {
    switch (arbeidsforhold.type) {
        case 'frilanser':
            return 'frilanser';
        case 'selvstendig':
            return 'selvstendig';
        case 'privat':
            return arbeidsforhold.id;
        case 'virksomhet':
            return arbeidsforhold.id;
    }
};
