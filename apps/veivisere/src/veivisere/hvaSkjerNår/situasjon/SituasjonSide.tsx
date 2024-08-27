import { BabyWrappedIcon, CalendarIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvaSkjerNårRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Radio, Spacer, VStack } from '@navikt/ds-react';

import { ISO_DATE_REGEX } from '@navikt/fp-constants';
import { Datepicker, Form } from '@navikt/fp-form-hooks';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { isBeforeTodayOrToday, isValidDate } from '@navikt/fp-validation';

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

const erDatoGyldig = (date: string) => ISO_DATE_REGEX.test(date);

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
                        label={<FormattedMessage id="HvaSkjerNår.SituasjonSide.Situasjon" />}
                        name="situasjon"
                        onChange={scrollToBottom}
                    >
                        <Radio value={Situasjon.MOR_OG_FAR} autoFocus>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.MorOgFar" />
                        </Radio>
                        <Radio value={Situasjon.MOR_OG_MEDMOR}>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.MorOgMedmor" />
                        </Radio>
                        <Radio value={Situasjon.FAR_OG_FAR}>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.FarOgFar" />
                        </Radio>
                        <Radio value={Situasjon.KUN_FAR_ELLER_MEDMOR}>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.KunFarEllerMedmor" />
                        </Radio>
                        <Radio value={Situasjon.KUN_MOR}>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.KunMor" />
                        </Radio>
                        <Radio value={Situasjon.ALENEOMSORG}>
                            <FormattedMessage id="HvaSkjerNår.SituasjonSide.Aleneomsorg" />
                        </Radio>
                    </BlueRadioGroup>
                    {situasjon && (
                        <VStack gap="4">
                            <BlueRadioGroup
                                label={<FormattedMessage id="HvaSkjerNår.SituasjonSide.ErBarnetFødt" />}
                                name="erFødt"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="HvaSkjerNår.SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="HvaSkjerNår.SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                        </VStack>
                    )}

                    {erFødt === true && (
                        <VStack gap="4">
                            <BluePanel isDarkBlue shouldFadeIn>
                                <VStack gap="4">
                                    <Datepicker
                                        name="fødselsdato"
                                        label={intl.formatMessage({ id: 'HvaSkjerNår.SituasjonSide.Født' })}
                                        maxDate={dayjs().toDate()}
                                        validate={[
                                            isValidDate(
                                                intl.formatMessage({
                                                    id: 'valideringsfeil.fødselsdato.ugyldigDatoFormat',
                                                }),
                                            ),
                                            isBeforeTodayOrToday(
                                                intl.formatMessage({
                                                    id: 'valideringsfeil.fødselsdato.måVæreIdagEllerTidligere',
                                                }),
                                            ),
                                            (dato) => {
                                                if (dayjs(dato).isBefore(dayjs(oktober2021))) {
                                                    return intl.formatMessage({
                                                        id: 'valideringsfeil.fødselsdato.førOktober2021',
                                                    });
                                                }
                                                return undefined;
                                            },
                                        ]}
                                    />

                                    <Datepicker
                                        name="termindato"
                                        label={intl.formatMessage({ id: 'HvaSkjerNår.SituasjonSide.NårVarTermin' })}
                                        minDate={dayjs(fødselsdato).subtract(1, 'month').toDate()}
                                        maxDate={dayjs().add(6, 'months').toDate()}
                                        validate={[
                                            isValidDate(
                                                intl.formatMessage({
                                                    id: 'valideringsfeil.termindato.ugyldigDatoFormat',
                                                }),
                                            ),
                                            (termin) => {
                                                if (
                                                    !dayjs(termin)
                                                        .subtract(6, 'months')
                                                        .isSameOrBefore(dayjs(fødselsdato), 'day')
                                                ) {
                                                    return intl.formatMessage({
                                                        id: 'valideringsfeil.termindato.forLangtFremITid',
                                                    });
                                                }
                                                if (
                                                    !dayjs(termin)
                                                        .add(1, 'months')
                                                        .isSameOrAfter(dayjs(fødselsdato), 'day')
                                                ) {
                                                    return intl.formatMessage({
                                                        id: 'valideringsfeil.termindato.forLangtTilbakeITid',
                                                    });
                                                }
                                                return undefined;
                                            },
                                        ]}
                                    />
                                </VStack>
                            </BluePanel>
                            {fødselsdato !== undefined && dayjs(fødselsdato).isBefore(oktober2021) && (
                                <Infobox
                                    header={<FormattedMessage id="HvaSkjerNår.SituasjonSide.FødtFørOktober" />}
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage id="HvaSkjerNår.SituasjonSide.HvisBarnetErFødtFørOktober" />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}
                    {erFødt === false && (
                        <VStack gap="4">
                            <BluePanel isDarkBlue shouldFadeIn>
                                <VStack gap="4">
                                    <Datepicker
                                        name="termindato"
                                        label={intl.formatMessage({ id: 'HvaSkjerNår.SituasjonSide.NårErTermin' })}
                                        minDate={dayjs().subtract(3, 'weeks').toDate()}
                                        maxDate={dayjs().add(6, 'months').toDate()}
                                        validate={[
                                            isValidDate(
                                                intl.formatMessage({
                                                    id: 'valideringsfeil.termindato.ugyldigDatoFormat',
                                                }),
                                            ),
                                            (termin) => {
                                                if (
                                                    dayjs(termin).isSameOrBefore(
                                                        dayjs().subtract(3, 'weeks').subtract(1, 'day').toDate(),
                                                    )
                                                ) {
                                                    return intl.formatMessage({
                                                        id: 'valideringsfeil.termindato.forTidlig',
                                                    });
                                                }
                                                return undefined;
                                            },
                                        ]}
                                    />
                                </VStack>
                            </BluePanel>
                        </VStack>
                    )}

                    <Spacer />

                    <Spacer />
                    {((erFødt === true && fødselsdato && termindato) || (erFødt === false && termindato)) &&
                        erDatoGyldig(termindato) && (
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
