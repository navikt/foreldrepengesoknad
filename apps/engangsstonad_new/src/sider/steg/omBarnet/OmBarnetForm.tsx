import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import { Block, Kjønn, Step, StepButtonWrapper, useDocumentTitle } from '@navikt/fp-common';

import FødselPanel, { FormValues as FødtFormValues } from './FødselPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';
import { SøkersituasjonEnum } from 'types/Søkersituasjon';
import { EsDataType, useStateData, useStateSaveFn } from '../../../EsDataContext';
import useEsNavigator from '../../../useEsNavigator';

import './omBarnet.less';

type FormValues = FødtFormValues & AdopsjonFormValues;

interface Props {
    kjønn: Kjønn;
}

const OmBarnetForm: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.omBarnet' }));

    const navigator = useEsNavigator();
    const omBarnet = useStateData(EsDataType.OM_BARNET);
    const lagreOmBarnet = useStateSaveFn(EsDataType.OM_BARNET);
    const søkersituasjon = useStateData(EsDataType.SØKERSITUASJON);

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

    const fodselsdatoer = formMethods.watch('fødselsdatoer');

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
                        <StepButtonWrapper>
                            <Button type="button" variant="secondary" onClick={navigator.goToPreviousDefaultStep}>
                                <FormattedMessage id="backlink.label" />
                            </Button>
                            {fodselsdatoer && (
                                <Button type="submit">{intl.formatMessage({ id: 'søknad.gåVidere' })}</Button>
                            )}
                        </StepButtonWrapper>
                    </Block>
                </form>
            </FormProvider>
        </Step>
    );
};

export default OmBarnetForm;
