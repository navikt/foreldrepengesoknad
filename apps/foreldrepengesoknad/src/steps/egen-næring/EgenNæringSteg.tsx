import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/FpDataContext';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import {
    EgenNæringPanel,
    getForhåndsvalgtNæringstype,
    getPrioritertRegistrertNæring,
} from '@navikt/fp-steg-egen-naering';
import { FpPersonopplysningerDto_fpoversikt, NæringDto } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
};

export const EgenNæringSteg = ({ mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }: Props) => {
    const { arbeidsforhold, selvstendigNæring: registrerteNæringer } = søkerInfo;
    const harRegistrertNæring = registrerteNæringer.length > 0;

    const stepConfig = useStepConfig({ arbeidsforhold, harRegistrertNæring });
    const navigator = useFpNavigator({
        arbeidsforhold,
        harRegistrertNæring,
        mellomlagreOgNaviger: mellomlagreSøknadOgNaviger,
    });

    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const oppdaterEgenNæring = useContextSaveData(ContextDataType.EGEN_NÆRING);

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
