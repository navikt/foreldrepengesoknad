import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import {
    erAlenesøker as erAlene,
    erFarDelAvSøknaden,
    erMorDelAvSøknaden,
    finnSøker2Tekst,
} from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';

import { BodyShort, VStack } from '@navikt/ds-react';

import { DATE_3_YEARS_AGO, ISO_DATE_REGEX } from '@navikt/fp-constants/src/dates';
import { Datepicker } from '@navikt/fp-form-hooks';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { erI22SvangerskapsukeEllerSenere, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

const erDatoGyldig = (date: string) => ISO_DATE_REGEX.test(date);

type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetIkkeOppgittFraFør: boolean;
    antallBarn?: string;
    scrollToBottom: () => void;
};

const ErFødtPanel: React.FunctionComponent<Props> = ({
    hvemPlanlegger,
    erOmBarnetIkkeOppgittFraFør,
    antallBarn,
    scrollToBottom,
}) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const fødselsdato = formMethods.watch('fødselsdato');

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFar = hvemPlanlegger.type !== Situasjon.MOR;

    return (
        <VStack gap="5">
            <BluePanel isDarkBlue={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <VStack gap="8">
                    <Datepicker
                        label={<FormattedMessage id="ErFødtPanel.Fødselsdato" values={{ antallBarn }} />}
                        name="fødselsdato"
                        maxDate={dayjs().toDate()}
                        useStrategyAbsolute
                        validate={[
                            isRequired(intl.formatMessage({ id: 'Fødselsdato.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({
                                    id: 'ValidationMessage.InFuture',
                                }),
                            ),
                        ]}
                        customErrorFormatter={formatError}
                        onChange={scrollToBottom}
                    />
                    <Datepicker
                        label={<FormattedMessage id="ErFødtPanel.NårVarTermin" />}
                        name="termindato"
                        maxDate={dayjs().add(18, 'weeks').add(3, 'days').toDate()}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'Termindato.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            erI22SvangerskapsukeEllerSenere(
                                intl.formatMessage({
                                    id: 'ValidationMessage.DuMåVæreIUke22',
                                }),
                            ),
                        ]}
                        customErrorFormatter={formatError}
                        useStrategyAbsolute
                        onChange={scrollToBottom}
                    />
                </VStack>
            </BluePanel>
            {fødselsdato !== undefined && erDatoGyldig(fødselsdato) && dayjs(fødselsdato).isAfter(DATE_3_YEARS_AGO) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                >
                    <BodyShort>
                        <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" />
                    </BodyShort>

                    <BodyShort>
                        <FormattedMessage
                            id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                            values={{
                                erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyShort>
                    {erFarDelAvSøknaden(hvemPlanlegger) && (
                        <BodyShort>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket"
                                values={{
                                    erFar,
                                    hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                }}
                            />
                        </BodyShort>
                    )}
                </Infobox>
            )}
            {fødselsdato !== undefined &&
                erDatoGyldig(fødselsdato) &&
                dayjs(fødselsdato).isBefore(DATE_3_YEARS_AGO) && (
                    <Infobox
                        header={
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr"
                                values={{ erAlenesøker, antallBarn }}
                            />
                        }
                        icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" />}
                        shouldFadeIn
                    >
                        <BodyShort>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr"
                                values={{ antallBarn }}
                            />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" values={{ erFar }} />
                        </BodyShort>
                    </Infobox>
                )}
        </VStack>
    );
};
export default ErFødtPanel;
