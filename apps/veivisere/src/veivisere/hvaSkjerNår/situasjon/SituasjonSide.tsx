import { BabyWrappedIcon, CalendarIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvaSkjerNårRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Radio, Spacer, VStack } from '@navikt/ds-react';

import { Datepicker, Form } from '@navikt/fp-form-hooks';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { isBeforeTodayOrToday, isRequired } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/VeiviserPage';
import BlueRadioGroup from '../../felles/formWrappers/BlueRadioGroup';

export enum Situasjon {
    MOR_OG_FAR = 'morOgFar',
    FAR_OG_FAR = 'farOgFar',
    MOR_OG_MEDMOR = 'morOgMedmor',
    KUN_FAR_ELLER_MEDMOR = 'kunFarEllerMedmor',
    KUN_MOR = 'kunMor',
    ALENEOMSORG = 'aleneomsorg',
}

export type HvaSkjerNårSituasjon = {
    situasjon: Situasjon;
    erFødt: boolean;
    fødselsdato?: string;
    termindato: string;
};

interface Props {
    hvaSkjerNårSituasjon?: HvaSkjerNårSituasjon;
    setHvaSkjerNårSituasjon: (data: HvaSkjerNårSituasjon) => void;
}

const SituasjonSide: FunctionComponent<Props> = ({ hvaSkjerNårSituasjon, setHvaSkjerNårSituasjon }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVA_SKJER);

    const formMethods = useForm<HvaSkjerNårSituasjon>({
        defaultValues: hvaSkjerNårSituasjon,
        shouldUnregister: true,
    });

    const { situasjon, erFødt, fødselsdato, termindato } = formMethods.watch();

    const oktober2021 = dayjs('2021-10-01');

    const onSubmit = (formValues: HvaSkjerNårSituasjon) => {
        setHvaSkjerNårSituasjon(formValues);
        goToRoute(HvaSkjerNårRoutes.OPPSUMMERING);
    };

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'HvaSkjerNår.Tittel' })}
            icon={<CalendarIcon height={48} width={48} fontSize="1.5rem" aria-hidden />}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="6" style={{ flex: 1 }}>
                    <BlueRadioGroup
                        label={<FormattedMessage id="SituasjonSide.Situasjon" />}
                        name="situasjon"
                        onChange={scrollToBottom}
                    >
                        <Radio value={Situasjon.MOR_OG_FAR} autoFocus>
                            <FormattedMessage id="SituasjonSide.MorOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR_OG_MEDMOR}>
                            <FormattedMessage id="SituasjonSide.MorOgMedmor" />
                        </Radio>
                        <Radio value={Situasjon.FAR_OG_FAR}>
                            <FormattedMessage id="SituasjonSide.FarOgFar" />
                        </Radio>
                        <Radio value={Situasjon.KUN_FAR_ELLER_MEDMOR}>
                            <FormattedMessage id="SituasjonSide.KunFarEllerMedmor" />
                        </Radio>
                        <Radio value={Situasjon.KUN_MOR}>
                            <FormattedMessage id="SituasjonSide.KunMor" />
                        </Radio>
                        <Radio value={Situasjon.ALENEOMSORG}>
                            <FormattedMessage id="SituasjonSide.Aleneomsorg" />
                        </Radio>
                    </BlueRadioGroup>
                    {situasjon && (
                        <VStack gap="4">
                            <BlueRadioGroup
                                label={<FormattedMessage id="SituasjonSide.ErBarnetFødt" />}
                                name="erFødt"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                        </VStack>
                    )}

                    {erFødt === true && (
                        <VStack gap="4">
                            <BluePanel isDarkBlue shouldFadeIn>
                                <VStack gap="4">
                                    {
                                        // TODO: fiks validering
                                    }
                                    <Datepicker
                                        name="fødselsdato"
                                        label={intl.formatMessage({ id: 'SituasjonSide.Født' })}
                                        minDate={dayjs().subtract(3, 'years').toDate()}
                                        maxDate={dayjs().toDate()}
                                        validate={[
                                            isRequired(intl.formatMessage({ id: 'SituasjonSide.Født' })),

                                            isBeforeTodayOrToday(intl.formatMessage({ id: 'SituasjonSide.Født' })),
                                        ]}
                                    />
                                    {
                                        // TODO: fiks validering
                                    }
                                    <Datepicker
                                        name="termindato"
                                        label={intl.formatMessage({ id: 'SituasjonSide.NårVarTermin' })}
                                        minDate={dayjs().subtract(3, 'years').toDate()}
                                        maxDate={dayjs().add(6, 'months').toDate()}
                                        validate={[isRequired(intl.formatMessage({ id: 'SituasjonSide.Født' }))]}
                                    />
                                    {fødselsdato !== undefined && dayjs(fødselsdato).isBefore(oktober2021) && (
                                        // TODO: fiks validering

                                        <Infobox
                                            header={<FormattedMessage id="SituasjonSide.JobbetMinst6av10" />}
                                            icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                            color="green"
                                        >
                                            <BodyShort>
                                                <FormattedMessage id="SituasjonSide.JobbetMinst6av10Detaljer" />
                                            </BodyShort>
                                        </Infobox>
                                    )}{' '}
                                </VStack>
                            </BluePanel>
                        </VStack>
                    )}
                    {erFødt === false && (
                        <VStack gap="4">
                            <BluePanel isDarkBlue shouldFadeIn>
                                <VStack gap="4">
                                    {
                                        // TODO: fiks validering
                                    }
                                    <Datepicker
                                        name="termindato"
                                        label={intl.formatMessage({ id: 'SituasjonSide.NårErTermin' })}
                                        minDate={dayjs().subtract(3, 'years').toDate()}
                                        maxDate={dayjs().add(6, 'months').toDate()}
                                        validate={[isRequired(intl.formatMessage({ id: 'SituasjonSide.Født' }))]}
                                    />
                                </VStack>
                            </BluePanel>
                        </VStack>
                    )}

                    <Spacer />

                    <Spacer />
                    {((erFødt === true && fødselsdato && termindato) || (erFødt === false && termindato)) && (
                        <Button
                            icon={<PaperplaneIcon aria-hidden />}
                            iconPosition="right"
                            type="submit"
                            style={{ flex: 1 }}
                        >
                            <FormattedMessage id="ArbeidssituasjonSide.SeResultatet" />
                        </Button>
                    )}
                </VStack>
            </Form>
        </VeiviserPage>
    );
};

export default SituasjonSide;
