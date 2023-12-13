import { FormattedMessage } from 'react-intl';
import { Block } from '@navikt/fp-common';
import { ContentWrapper, useCustomIntl } from '@navikt/fp-ui';
import { Heading, Radio } from '@navikt/ds-react';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import { useForm } from 'react-hook-form';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { BarnetEnum } from '../../types/Barnet';
import { Datepicker, Form, RadioGroup, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import dayjs from 'dayjs';
import {
    erI22SvangerskapsukeEllerSenere,
    isAfterOrSameAsSixMonthsAgo,
    isBeforeTodayOrToday,
    isLessThanThreeWeeksAgo,
    isRequired,
    isValidDate,
} from '@navikt/fp-validation';
import { Path } from 'appData/paths';

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = usePlanleggerNavigator();
    const formMethods = useForm();
    const { i18n } = useCustomIntl();

    const barnet = formMethods.watch('barnet');
    const erFødt = formMethods.watch('erFødt');

    const lagreOmBarnet = usePlanleggerStateSaveFn(PlanleggerDataType.OM_BARNET);
    const lagre = (formValues: any) => {
        lagreOmBarnet(formValues);
        navigator.goToNextStep(Path.BARNEHAGEPLASS);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="large">
                    <FormattedMessage id="barnet.tittel" />
                </Heading>
                <Block margin="xl">
                    <Heading size="small">
                        <FormattedMessage id="barnet.hvaGjelder" />
                    </Heading>
                    <RadioGroup name="barnet">
                        <Radio value={BarnetEnum.FØDSEL}>
                            <FormattedMessage id="barnet.fødsel" />
                        </Radio>
                        <Radio value={BarnetEnum.ADOPSJON}>
                            <FormattedMessage id="barnet.adopsjon" />
                        </Radio>
                    </RadioGroup>
                </Block>
                {barnet === BarnetEnum.FØDSEL && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id="barnet.erFødt" />
                        </Heading>
                        <RadioGroup name="erFødt">
                            <Radio value={true}>
                                <FormattedMessage id="ja" />
                            </Radio>
                            <Radio value={false}>
                                <FormattedMessage id="nei" />
                            </Radio>
                        </RadioGroup>
                    </Block>
                )}
                {erFødt && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id="barnet.fødselsdato" />
                        </Heading>
                        <Datepicker
                            name="fødselsdato"
                            minDate={dayjs().subtract(6, 'month').toDate()}
                            maxDate={dayjs().toDate()}
                            validate={[
                                isRequired(i18n('FødselPanel.Fødselsdato.DuMåOppgi')),
                                isValidDate(i18n('FødselPanel.Fødselsdato.Gyldig')),
                                isBeforeTodayOrToday(i18n('FødselPanel.Fodselsdato.MåVæreIdagEllerTidligere')),
                                isAfterOrSameAsSixMonthsAgo(i18n('FødselPanel.Fodselsdato.IkkeMerEnn6MånederTilbake')),
                            ]}
                        />
                    </Block>
                )}
                {!erFødt && (
                    <Block margin="xl">
                        <Heading size="small">
                            <FormattedMessage id="barnet.termin" />
                        </Heading>
                        <Datepicker
                            name="termindato"
                            minDate={dayjs().subtract(3, 'week').toDate()}
                            maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                            validate={[
                                isRequired(i18n('FødselPanel.Termindato.DuMåOppgi')),
                                isValidDate(i18n('FødselPanel.Termindato.Gyldig')),
                                isLessThanThreeWeeksAgo(
                                    i18n('FødselPanel.Termindato.TermindatoKanIkkeVære3UkerFraIdag'),
                                ),
                                erI22SvangerskapsukeEllerSenere(i18n('FødselPanel.Termindato.DuMåVæreIUke22')),
                            ]}
                        />
                    </Block>
                )}
                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtonsHookForm
                        saveDataOnPreviousClick={lagreOmBarnet}
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonText="Neste"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default OmBarnetSteg;
