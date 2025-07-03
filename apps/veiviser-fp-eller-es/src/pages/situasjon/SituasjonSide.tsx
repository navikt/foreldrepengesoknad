import { BabyWrappedIcon, PaperplaneIcon, StrollerIcon } from '@navikt/aksel-icons';
import { FpEllerEsRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Button, Heading, Label, Link, List, Radio, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfForm, RhfNumericField } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { BluePanel, Infobox, VeiviserPage } from '@navikt/fp-ui';
import { formatCurrencyWithKr, useScrollBehaviour } from '@navikt/fp-utils';
import { isValidDecimal, isValidNumberForm } from '@navikt/fp-validation';
import { formatValue } from '@navikt/fp-validation/src/form/numberFormValidation';

import { BlueRadioGroup } from '../BlueRadioGroup';

export enum Situasjon {
    MOR = 'mor',
    FAR = 'far',
    MEDMOR = 'medmor',
}

export type FpEllerEsSituasjon = {
    situasjon: Situasjon;
    erIArbeid: boolean;
    harHattAndreInntekter: boolean;
    harHattInntekt: boolean;
    lønnPerMåned: string;
    borDuINorge: boolean;
    jobberDuINorge: boolean;
};

const REKKEFØLGE_FELT = [
    'situasjon',
    'erIArbeid',
    'harHattAndreInntekter',
    'harHattInntekt',
    'lønnPerMåned',
    'borDuINorge',
    'jobberDuINorge',
];

const resetFields = (
    formMethods: UseFormReturn<FpEllerEsSituasjon>,
    fieldName: string,
    newValue: string | number | boolean,
) => {
    const etterfølgendeFelt = REKKEFØLGE_FELT.slice(REKKEFØLGE_FELT.indexOf(fieldName) + 1);

    const updatedFormValues = {
        ...formMethods.getValues(),
        [fieldName]: newValue,
        ...etterfølgendeFelt.reduce(
            (prev, current) => ({
                ...prev,
                [current]: null,
            }),
            {},
        ),
    };

    formMethods.reset(updatedFormValues);
};

interface Props {
    fpEllerEsSituasjon?: FpEllerEsSituasjon;
    setFpEllerEsSituasjon: (data: FpEllerEsSituasjon) => void;
    satser: Satser;
}

export const SituasjonSide = ({ satser, fpEllerEsSituasjon, setFpEllerEsSituasjon }: Props) => {
    const intl = useIntl();
    const [visUnder6GMelding, setVisUnder6GMelding] = useState(false);
    const { goToRoute } = useVeiviserNavigator();

    const formMethods = useForm<FpEllerEsSituasjon>({
        defaultValues: fpEllerEsSituasjon,
    });

    const { situasjon, erIArbeid, harHattInntekt, lønnPerMåned, borDuINorge, harHattAndreInntekter, jobberDuINorge } =
        formMethods.watch();

    const onSubmit = (formValues: FpEllerEsSituasjon) => {
        setFpEllerEsSituasjon(formValues);
        goToRoute(FpEllerEsRoutes.OPPSUMMERING);
    };

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const minstelønn = grunnbeløpet / 2;
    const lønnPerMånedNummer = formatValue(lønnPerMåned) ?? 0;

    const { ref, scrollToBottom } = useScrollBehaviour();

    const resetFieldsAndScroll = (fieldName: string) => (newFieldValue: string | number | boolean) => {
        resetFields(formMethods, fieldName, newFieldValue);
        scrollToBottom();
    };

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'FpEllerEs.Tittel' })}
            icon={<StrollerIcon height={36} width={36} fontSize="1.5rem" aria-hidden />}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="6" style={{ flex: 1 }}>
                    <BlueRadioGroup
                        name="situasjon"
                        control={formMethods.control}
                        label={<FormattedMessage id="SituasjonSide.HvemErDu" />}
                        onChange={resetFieldsAndScroll('situasjon')}
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
                    </BlueRadioGroup>
                    {situasjon && (
                        <VStack gap="4">
                            <BlueRadioGroup
                                name="erIArbeid"
                                control={formMethods.control}
                                label={<FormattedMessage id="SituasjonSide.ArbeidEllerNav" />}
                                onChange={resetFieldsAndScroll('erIArbeid')}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.HvaGirRett" />}>
                                <BodyShort>
                                    <FormattedMessage id="SituasjonSide.HvaGirRett.EnAvDisse" />
                                </BodyShort>
                                <List>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Sykepenger" />
                                    </List.Item>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Fp" />
                                    </List.Item>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Svp" />
                                    </List.Item>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Ap" />
                                    </List.Item>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Dagpenger" />
                                    </List.Item>
                                    <List.Item>
                                        <FormattedMessage id="SituasjonSide.HvaGirRett.Omsorgspenger" />
                                    </List.Item>
                                </List>
                            </ReadMore>
                        </VStack>
                    )}
                    {erIArbeid === false && (
                        <VStack gap="3">
                            <BlueRadioGroup
                                name="harHattAndreInntekter"
                                control={formMethods.control}
                                label={<FormattedMessage id="SituasjonSide.HarDuHattAndeInntektskilder" />}
                                onChange={resetFieldsAndScroll('harHattAndreInntekter')}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.AndreInntektskilder" />}>
                                <BodyShort>
                                    <FormattedMessage id="SituasjonSide.AndreInntektskilderDetaljer" />
                                </BodyShort>
                            </ReadMore>
                            {harHattAndreInntekter === false && (
                                <Infobox
                                    header={<FormattedMessage id="SituasjonSide.JobbetMinst6av10" />}
                                    headingLevel="2"
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage id="SituasjonSide.JobbetMinst6av10Detaljer" />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}

                    {(erIArbeid || harHattAndreInntekter) && (
                        <VStack gap="3">
                            <BlueRadioGroup
                                name="harHattInntekt"
                                control={formMethods.control}
                                label={<FormattedMessage id="SituasjonSide.HarDuHattInntekt" />}
                                onChange={resetFieldsAndScroll('harHattInntekt')}
                            >
                                <Radio value={true} autoFocus>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                            {harHattInntekt === false && (
                                <Infobox
                                    header={<FormattedMessage id="SituasjonSide.JobbetMinst6av10" />}
                                    headingLevel="2"
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage id="SituasjonSide.JobbetMinst6av10Detaljer" />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}

                    {harHattInntekt && (
                        <VStack gap="3">
                            <VStack gap="4">
                                <BluePanel
                                    isDarkBlue={lønnPerMåned === undefined || lønnPerMåned === null}
                                    shouldFadeIn
                                >
                                    <VStack gap="2">
                                        <RhfNumericField
                                            name="lønnPerMåned"
                                            control={formMethods.control}
                                            onChange={(beløp) => {
                                                scrollToBottom();
                                                const skalSkjule6GMelding =
                                                    (formatValue(beløp) ?? 0) * 12 >= minstelønn;
                                                if (skalSkjule6GMelding) {
                                                    setVisUnder6GMelding(false);
                                                }
                                            }}
                                            onBlur={(beløp) => {
                                                const skalViseUnder6Melding =
                                                    (formatValue(beløp) ?? 0) * 12 < minstelønn;
                                                setVisUnder6GMelding(skalViseUnder6Melding);
                                            }}
                                            label={<FormattedMessage id="SituasjonSide.LønnFørSkatt" />}
                                            validate={[
                                                isValidNumberForm(
                                                    intl.formatMessage({ id: 'valideringsfeil.lønn.ikkeTall' }),
                                                ),
                                                isValidDecimal(
                                                    intl.formatMessage({ id: 'valideringsfeil.lønn.desimaler' }),
                                                ),
                                            ]}
                                        />
                                        <VStack gap="2">
                                            <Label>
                                                <FormattedMessage id="SituasjonSide.Årsinntekt" />
                                            </Label>
                                            <Heading size="large" as="p">
                                                {lønnPerMånedNummer ? (
                                                    formatCurrencyWithKr(lønnPerMånedNummer * 12)
                                                ) : (
                                                    <FormattedMessage id="SituasjonSide.IngenKr" />
                                                )}
                                            </Heading>
                                        </VStack>
                                    </VStack>
                                </BluePanel>
                                <ReadMore header={<FormattedMessage id="SituasjonSide.HvorMyeMåHaTjent" />}>
                                    <BodyShort>
                                        <FormattedMessage
                                            id="SituasjonSide.HvorMyeMåHaTjentDetaljer"
                                            values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                        />
                                    </BodyShort>
                                </ReadMore>
                            </VStack>
                            {visUnder6GMelding && (
                                <Infobox
                                    header={
                                        <FormattedMessage
                                            id="SituasjonSide.MåTjeneMinst"
                                            values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                        />
                                    }
                                    headingLevel="2"
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="SituasjonSide.OppgittLønnIkkeRett"
                                            values={{
                                                årslønn: formatCurrencyWithKr(lønnPerMånedNummer * 12),
                                                minstelønn: formatCurrencyWithKr(minstelønn),
                                            }}
                                        />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}

                    {(lønnPerMåned || harHattInntekt === false || harHattAndreInntekter === false) && (
                        <VStack gap="3">
                            <BlueRadioGroup
                                name="borDuINorge"
                                control={formMethods.control}
                                label={<FormattedMessage id="SituasjonSide.BorDuINorge" />}
                                onChange={resetFieldsAndScroll('borDuINorge')}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                        </VStack>
                    )}
                    <Spacer />

                    {borDuINorge === false && (
                        <VStack gap="3">
                            <BlueRadioGroup
                                name="jobberDuINorge"
                                control={formMethods.control}
                                label={<FormattedMessage id="SituasjonSide.JobberDuINorge" />}
                                onChange={scrollToBottom}
                            >
                                <Radio value={true}>
                                    <FormattedMessage id="SituasjonSide.Ja" />
                                </Radio>
                                <Radio value={false}>
                                    <FormattedMessage id="SituasjonSide.Nei" />
                                </Radio>
                            </BlueRadioGroup>
                            {jobberDuINorge === false && (
                                <Infobox
                                    header={<FormattedMessage id="SituasjonSide.MåVæreMedlem" />}
                                    headingLevel="2"
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="SituasjonSide.IkkeMedlem"
                                            values={{
                                                a: (msg) => (
                                                    <Link href={links.folketrygden} target="_blank" rel="noreferrer">
                                                        {msg}
                                                    </Link>
                                                ),
                                            }}
                                        />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}
                    <Spacer />
                    {(borDuINorge || (jobberDuINorge !== undefined && jobberDuINorge !== null)) && (
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
            </RhfForm>
        </VeiviserPage>
    );
};
