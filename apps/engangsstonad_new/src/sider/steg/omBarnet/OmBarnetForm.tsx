import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Block, Kjønn, Step, useDocumentTitle } from '@navikt/fp-common';

import FødselPanel, { FormValues as FødtFormValues } from './FødselPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { EsDataType, useEsStateData, useEsStateSaveFn } from '../../../EsDataContext';
import useEsNavigator from '../../../useEsNavigator';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';

import './omBarnet.less';

type FormValues = FødtFormValues & AdopsjonFormValues;

interface Props {
    kjønn: Kjønn;
}

const OmBarnetForm: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.omBarnet' }));

    const navigator = useEsNavigator();
    const omBarnet = useEsStateData(EsDataType.OM_BARNET);
    const lagreOmBarnet = useEsStateSaveFn(EsDataType.OM_BARNET);
    const søkersituasjon = useEsStateData(EsDataType.SØKERSITUASJON);

    const lagre = useCallback((formValues: FormValues) => {
        lagreOmBarnet(formValues);
        navigator.goToNextDefaultStep();
    }, []);

    const formMethods = useForm<FormValues>({
        defaultValues: useMemo(
            () => ({
                fødselsdatoer: [],
                ...omBarnet,
            }),
            [],
        ),
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.omBarnet' })}
            onCancel={navigator.avbrytSøknad}
            steps={navigator.pageInfo.stepConfig}
            activeStepId={navigator.pageInfo.activeStepId}
        >
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(lagre)}>
                    {søkersituasjon?.situasjon === SøkersituasjonEnum.ADOPSJON && <AdopsjonPanel kjønn={kjønn} />}
                    {søkersituasjon?.situasjon === SøkersituasjonEnum.FØDSEL && <FødselPanel />}
                    <Block margin="xl" textAlignCenter={true}>
                        <StepButtonsHookForm<FormValues>
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={lagreOmBarnet}
                        />
                    </Block>
                </form>
            </FormProvider>
        </Step>
    );
};

export default OmBarnetForm;
