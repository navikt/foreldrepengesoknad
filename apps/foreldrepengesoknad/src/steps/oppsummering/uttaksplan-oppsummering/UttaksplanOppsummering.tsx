import { useQuery } from '@tanstack/react-query';
import { useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { EksternArbeidsforholdDto_fpoversikt, NavnPåForeldre } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { DinPlanKvoter } from './DinPlanKvoter';
import { UttaksplanOppsummeringsliste } from './UttaksplanOppsummeringsliste';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    onVilEndreSvar: () => void;
}

export const UttaksplanOppsummering = ({ navnPåForeldre, registrerteArbeidsforhold, onVilEndreSvar }: Props) => {
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));

    const harJustertUttakVedFødsel = useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);

    const { antallBarn } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const kontoerOptions = useStønadsKontoerOptions();
    const tilgjengeligeStønadskvoterQuery = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    });
    const valgteStønadskvoter = tilgjengeligeStønadskvoterQuery.data;

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.uttak" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="oppsummering.uttak.dekningsgrad.label" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        <DinPlanKvoter kontoer={valgteStønadskvoter?.kontoer ?? []} />
                    </FormSummary.Value>
                </FormSummary.Answer>
                <UttaksplanOppsummeringsliste
                    navnPåForeldre={navnPåForeldre}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                />
                {harJustertUttakVedFødsel !== undefined && (
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            <FormattedMessage
                                id="oppsummering.uttak.ønskerAutomatiskJustering.label"
                                values={{ antallBarn }}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            {harJustertUttakVedFødsel ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />}
                        </FormSummary.Value>
                    </FormSummary.Answer>
                )}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
};
