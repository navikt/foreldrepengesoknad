import { useQuery } from '@tanstack/react-query';
import { useStønadsKontoerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getUkerOgDagerFromDager } from 'utils/dateUtils';
import { getAntallUkerFraStønadskontoer } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanOppsummeringsliste } from './UttaksplanOppsummeringsliste';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    onVilEndreSvar: () => void;
}

export const UttaksplanOppsummering = ({ navnPåForeldre, registrerteArbeidsforhold, onVilEndreSvar }: Props) => {
    const intl = useIntl();

    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));

    const harJustertUttakVedFødsel = notEmpty(useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL));

    const { antallBarn } = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const kontoerOptions = useStønadsKontoerOptions();
    const tilgjengeligeStønadskontoerQuery = useQuery({
        ...kontoerOptions,
        select: (kontoer) => {
            return kontoer[dekningsgrad];
        },
    });
    const valgteStønadskontoer = tilgjengeligeStønadskontoerQuery.data;

    const antallUkerIUttaksplan = getAntallUkerFraStønadskontoer(valgteStønadskontoer?.kontoer ?? []);

    const antallUkerOgDagerIUttaksplan = getUkerOgDagerFromDager(antallUkerIUttaksplan * 5);

    let dekningsgradTekst = undefined;

    if (antallUkerOgDagerIUttaksplan.dager > 0) {
        if (dekningsgrad === '100') {
            dekningsgradTekst = intl.formatMessage(
                { id: 'oppsummering.uttak.dekningsgrad.verdi100.ukerOgDager' },
                { antallUker: antallUkerOgDagerIUttaksplan.uker, antallDager: antallUkerOgDagerIUttaksplan.dager },
            );
        } else {
            dekningsgradTekst = intl.formatMessage(
                { id: 'oppsummering.uttak.dekningsgrad.verdi80.ukerOgDager' },
                { antallUker: antallUkerOgDagerIUttaksplan.uker, antallDager: antallUkerOgDagerIUttaksplan.dager },
            );
        }
    } else {
        dekningsgradTekst =
            dekningsgrad === '100'
                ? intl.formatMessage(
                      { id: 'oppsummering.uttak.dekningsgrad.verdi100.bareUker' },
                      {
                          antallUker: antallUkerOgDagerIUttaksplan.uker,
                          antallDager: antallUkerOgDagerIUttaksplan.dager,
                      },
                  )
                : intl.formatMessage(
                      { id: 'oppsummering.uttak.dekningsgrad.verdi80.bareUker' },
                      {
                          antallUker: antallUkerOgDagerIUttaksplan.uker,
                          antallDager: antallUkerOgDagerIUttaksplan.dager,
                      },
                  );
    }

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
                    <FormSummary.Value>{dekningsgradTekst}</FormSummary.Value>
                </FormSummary.Answer>
                <FormSummary.Answer>
                    <UttaksplanOppsummeringsliste
                        navnPåForeldre={navnPåForeldre}
                        registrerteArbeidsforhold={registrerteArbeidsforhold}
                    />
                </FormSummary.Answer>
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
