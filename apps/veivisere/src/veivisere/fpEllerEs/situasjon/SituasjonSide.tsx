import { BabyWrappedIcon, PaperplaneIcon, StrollerIcon } from '@navikt/aksel-icons';
import { ContextRoutes, FpEllerEsRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Heading, Label, List, Radio, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Form, TextField } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { formatCurrencyWithKr } from '@navikt/fp-utils';
import { isValidDecimal } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/VeiviserPage';
import BlueRadioGroup from '../../felles/formWrappers/BlueRadioGroup';

export enum Situasjon {
    MOR = 'mor',
    FAR = 'far',
    MEDMOR = 'medmor',
}

export type FpEllerEsSituasjon = {
    situasjon: Situasjon;
    erIArbeid: boolean;
    harHattInntekt: boolean;
    harHattAndreInntekter: boolean;
    lønnPerMåned: number;
    borDuINorge: boolean;
    jobberDuINorge: boolean;
};

interface Props {
    fpEllerEsSituasjon?: FpEllerEsSituasjon;
    setFpEllerEsSituasjon: (data: FpEllerEsSituasjon) => void;
    satser: Satser;
}

const SituasjonSide: FunctionComponent<Props> = ({ satser, fpEllerEsSituasjon, setFpEllerEsSituasjon }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.FP_ELLER_ES);

    const formMethods = useForm<FpEllerEsSituasjon>({
        defaultValues: fpEllerEsSituasjon,
        shouldUnregister: true,
    });

    const { situasjon, erIArbeid, harHattInntekt, lønnPerMåned, borDuINorge, harHattAndreInntekter, jobberDuINorge } =
        formMethods.watch();

    const onSubmit = (formValues: FpEllerEsSituasjon) => {
        setFpEllerEsSituasjon(formValues);
        goToRoute(FpEllerEsRoutes.OPPSUMMERING);
    };

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const minstelønn = grunnbeløpet / 2;

    const { ref, scrollToBottom } = useScrollBehaviour();

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'FpEllerEs.Tittel' })}
            icon={<StrollerIcon height={36} width={36} fontSize="1.5rem" aria-hidden />}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="6" style={{ flex: 1 }}>
                    <BlueRadioGroup
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
                    </BlueRadioGroup>
                    {situasjon && (
                        <VStack gap="4">
                            <BlueRadioGroup
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
                            </BlueRadioGroup>
                            <ReadMore header={<FormattedMessage id="SituasjonSide.AndreInntektskilder" />}>
                                <BodyShort>
                                    <FormattedMessage id="SituasjonSide.AndreInntektskilderDetaljer" />
                                </BodyShort>
                            </ReadMore>
                            {harHattAndreInntekter === false && (
                                <Infobox
                                    header={<FormattedMessage id="SituasjonSide.JobbetMinst6av10" />}
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
                            </BlueRadioGroup>
                            {harHattInntekt === false && (
                                <Infobox
                                    header={<FormattedMessage id="SituasjonSide.JobbetMinst6av10" />}
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
                                <BluePanel isDarkBlue={lønnPerMåned === undefined} shouldFadeIn>
                                    <VStack gap="2">
                                        <TextField
                                            name="lønnPerMåned"
                                            onChange={scrollToBottom}
                                            label={<FormattedMessage id="SituasjonSide.LønnFørSkatt" />}
                                            validate={[
                                                isValidDecimal(
                                                    intl.formatMessage({ id: 'valideringsfeil.lønn.ikkeTall' }),
                                                ),
                                            ]}
                                        />
                                        <VStack gap="2">
                                            <Label>
                                                <FormattedMessage id="SituasjonSide.Årsinntekt" />
                                            </Label>
                                            <Heading size="large">
                                                {lønnPerMåned ? (
                                                    formatCurrencyWithKr(lønnPerMåned * 12)
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
                            {lønnPerMåned * 12 < minstelønn && (
                                <Infobox
                                    header={
                                        <FormattedMessage
                                            id="SituasjonSide.MåTjeneMinst"
                                            values={{ minstelønn: formatCurrencyWithKr(minstelønn) }}
                                        />
                                    }
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="SituasjonSide.OppgittLønnIkkeRett"
                                            values={{
                                                årslønn: formatCurrencyWithKr(lønnPerMåned * 12),
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
                            </BlueRadioGroup>
                        </VStack>
                    )}
                    <Spacer />

                    {borDuINorge === false && (
                        <VStack gap="3">
                            <BlueRadioGroup
                                label={<FormattedMessage id="SituasjonSide.JobberDuINorge" />}
                                name="jobberDuINorge"
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
                                    icon={<BabyWrappedIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
                                    color="green"
                                >
                                    <BodyShort>
                                        <FormattedMessage
                                            id="SituasjonSide.IkkeMedlem"
                                            values={{
                                                a: (msg: any) => (
                                                    <a href={links.folketrygden} target="_blank" rel="noreferrer">
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </BodyShort>
                                </Infobox>
                            )}
                        </VStack>
                    )}
                    <Spacer />
                    {(borDuINorge || jobberDuINorge !== undefined) && (
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
