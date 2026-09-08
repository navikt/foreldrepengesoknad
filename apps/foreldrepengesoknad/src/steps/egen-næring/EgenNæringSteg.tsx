import { useQuery } from '@tanstack/react-query';
import { søkerinfoOptions } from 'api/queries';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import {
    EgenNæringPanel,
    getForhåndsvalgtNæringstype,
    getPrioritertRegistrertNæring,
} from '@navikt/fp-steg-egen-naering';
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
    const søkerinfoQuery = useQuery(søkerinfoOptions());
    const selvstendigNæring = søkerinfoQuery.data?.selvstendigNæring ?? [];
    const isPending = søkerinfoQuery.isPending;

    if (isPending) {
        return <Spinner />;
    }

    const registrerteNæringer = selvstendigNæring;

    const onSubmit = (values: NæringDto) => {
        oppdaterEgenNæring({
            ...values,
            organisasjonsnummer: values.organisasjonsnummer === '' ? undefined : values.organisasjonsnummer,
        });

        return navigator.goToNextStep();
    };

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <EgenNæringPanel
                egenNæring={egenNæring}
                initialNæringstype={getForhåndsvalgtNæringstype(registrerteNæringer)}
                registrertNæring={getPrioritertRegistrertNæring(registrerteNæringer)}
                registrerteNæringer={registrerteNæringer}
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
