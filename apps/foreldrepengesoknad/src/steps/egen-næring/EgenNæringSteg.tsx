import { useQuery } from '@tanstack/react-query';
import { selvstendigNæringOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { EgenNæringPanel, getForhåndsvalgtNæringstype } from '@navikt/fp-steg-egen-naering';
import { EksternArbeidsforholdDto_fpoversikt, NæringDto } from '@navikt/fp-types';
import { SkjemaRotLayout, Spinner } from '@navikt/fp-ui';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    arbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
};

export const EgenNæringSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, arbeidsforhold }: Props) => {
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useFpNavigator(arbeidsforhold, mellomlagreSøknadOgNaviger);

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);
    const selvstendigNæringQuery = useQuery(selvstendigNæringOptions());

    const onSubmit = (values: NæringDto) => {
        oppdaterEgenNæring({
            ...values,
            organisasjonsnummer: values.organisasjonsnummer === '' ? undefined : values.organisasjonsnummer,
        });

        return navigator.goToNextStep();
    };

    if (selvstendigNæringQuery.isPending) {
        return <Spinner />;
    }

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <EgenNæringPanel
                egenNæring={egenNæring}
                initialNæringstype={getForhåndsvalgtNæringstype(selvstendigNæringQuery.data ?? [])}
                saveOnNext={onSubmit}
                onAvsluttOgSlett={avbrytSøknad}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                stepConfig={stepConfig}
                onStepChange={navigator.goToStep}
                appOrigin="foreldrepengesoknad"
            />
        </SkjemaRotLayout>
    );
};
