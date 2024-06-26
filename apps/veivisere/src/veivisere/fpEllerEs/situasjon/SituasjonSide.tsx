import { BabyWrappedIcon, EarthIcon, PaperplaneIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Heading, Label, Radio, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { Form, TextField } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { GreenPanel, Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';

import VeiviserPage from '../../felles/VeiviserPage';
import GreenRadioGroup from '../../felles/formWrappers/GreenRadioGroup';

enum Situasjon {
    MOR = 'mor',
    FAR = 'far',
    MEDMOR = 'medmor',
}

type FormValues = {
    situasjon: Situasjon;
    erIArbeid: boolean;
    harHattInntekt: boolean;
    harHattAndreInntekter: boolean;
    lønnPerMåned: number;
    borDuINorge: boolean;
    erDuMedlemAvFolketrygden: boolean;
};

interface Props {
    satser: Satser;
}

const SituasjonSide: FunctionComponent<Props> = ({ satser }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);

    const formMethods = useForm<FormValues>({
        defaultValues: {},
        shouldUnregister: true,
    });

    const situasjon = formMethods.watch('situasjon');
    const erIArbeid = formMethods.watch('erIArbeid');
    const harHattInntekt = formMethods.watch('harHattInntekt');
    const lønnPerMåned = formMethods.watch('lønnPerMåned');
    const borDuINorge = formMethods.watch('borDuINorge');
    const harHattAndreInntekter = formMethods.watch('harHattAndreInntekter');
    const erDuMedlemAvFolketrygden = formMethods.watch('erDuMedlemAvFolketrygden');

    const onSubmit = () => {
        //setArbeidssituasjon(formValues);
        goToRoute(HvorMyeRoutes.OPPSUMMERING);
    };

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const minstelønn = grunnbeløpet / 2;

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'FpEllerEs.Tittel' })}
            icon={<WalletIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <GreenRadioGroup
                        label={<FormattedMessage id="SituasjonSide.HvemErDu" />}
                        name="situasjon"
                        onChange={scrollToBottom}
                    >
                        <Radio value={Situasjon.MOR} autoFocus>
                            <FormattedMessage id="SituasjonSide.Mor" />
                        </Radio>
                        <Radio value={Situasjon.FAR}>
                            <FormattedMessage id="SituasjonSide.Far" />
                        </Radio>
                        <Radio value={Situasjon.MEDMOR}>
                            <FormattedMessage id="SituasjonSide.Medmor" />
                        </Radio>
                    </GreenRadioGroup>
                    {situasjon && (
                        <VStack gap="4">
                            <GreenRadioGroup
                                label={<FormattedMessage id="SituasjonSide.ArbeidEllerNav" />}
                                name="erIArbeid"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </GreenRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvaGirRett" />}>todo</ReadMore>
                        </VStack>
                    )}
                    {erIArbeid === false && (
                        <VStack gap="4">
                            <GreenRadioGroup
                                label={<FormattedMessage id="SituasjonSide.HarDuHattAndeInntektskilder" />}
                                name="harHattAndreInntekter"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </GreenRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvaGirRett" />}>todo</ReadMore>
                        </VStack>
                    )}
                    {(erIArbeid || harHattAndreInntekter) && (
                        <VStack gap="4">
                            <GreenRadioGroup
                                label={<FormattedMessage id="SituasjonSide.HarDuHattInntekt" />}
                                name="harHattInntekt"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </GreenRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.Hvorfor6AvSiste10" />}>todo</ReadMore>
                        </VStack>
                    )}
                    {harHattInntekt === false && (
                        <Infobox
                            header={<FormattedMessage id="SituasjonSide.JobbetMinst8av10" />}
                            icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                        >
                            <BodyShort>
                                <FormattedMessage id="SituasjonSide.JobbetMinst8av10Detaljer" />
                            </BodyShort>
                        </Infobox>
                    )}

                    {harHattInntekt && (
                        <VStack gap="4">
                            <GreenPanel isDarkGreen={lønnPerMåned === undefined} shouldFadeIn>
                                <VStack gap="2">
                                    <TextField
                                        name="lønnPerMåned"
                                        onChange={scrollToBottom}
                                        label={<FormattedMessage id="SituasjonSide.LønnFørSkatt" />}
                                    />
                                    <VStack gap="2">
                                        <Label>
                                            <FormattedMessage id="SituasjonSide.Årsinntekt" />
                                        </Label>
                                        <Heading size="large">
                                            {lønnPerMåned ? (
                                                formatCurrencyWithKr(lønnPerMåned)
                                            ) : (
                                                <FormattedMessage id="SituasjonSide.IngenKr" />
                                            )}
                                        </Heading>
                                    </VStack>
                                </VStack>
                            </GreenPanel>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvorMyeMåHaTjent" />}>todo</ReadMore>
                        </VStack>
                    )}
                    {lønnPerMåned * 12 < minstelønn && (
                        <Infobox
                            header={
                                <FormattedMessage
                                    id="SituasjonSide.MåTjeneMinst"
                                    values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                />
                            }
                            icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                        >
                            <BodyShort>
                                <FormattedMessage
                                    id="SituasjonSide.OppgittLønnIkkeRett"
                                    values={{
                                        årslønn: lønnPerMåned * 12,
                                        minstelønn: formatCurrencyWithKr(minstelønn),
                                    }}
                                />
                            </BodyShort>
                        </Infobox>
                    )}
                    {(lønnPerMåned || harHattInntekt === false || harHattAndreInntekter === false) && (
                        <VStack gap="4">
                            <GreenRadioGroup
                                label={<FormattedMessage id="SituasjonSide.BorDuINorge" />}
                                name="borDuINorge"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </GreenRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvorforBoINorge" />}>todo</ReadMore>
                        </VStack>
                    )}
                    {borDuINorge === false && (
                        <VStack gap="4">
                            <GreenRadioGroup
                                label={<FormattedMessage id="SituasjonSide.ErDuMedlemAvFolketrygden" />}
                                name="erDuMedlemAvFolketrygden"
                                onChange={scrollToBottom}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </GreenRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvaVilDetSiMedlemFolketrygden" />}>
                                todo
                            </ReadMore>
                        </VStack>
                    )}
                    {erDuMedlemAvFolketrygden === false && (
                        <Infobox
                            header={<FormattedMessage id="SituasjonSide.MåVæreMedlem" />}
                            icon={<EarthIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                        >
                            <BodyShort>
                                <FormattedMessage id="SituasjonSide.IkkeRett" />
                            </BodyShort>
                        </Infobox>
                    )}
                    <Spacer />
                    {(borDuINorge || erDuMedlemAvFolketrygden !== undefined) && (
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
