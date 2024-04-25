import { TasklistStartIcon } from '@navikt/aksel-icons';
import GreenPanel from 'components/boxes/GreenPanel';
import Infobox from 'components/boxes/Infobox';
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

import { BodyLong, VStack } from '@navikt/ds-react';

import { DATE_3_YEARS_AGO } from '@navikt/fp-constants/src/dates';
import { Datepicker } from '@navikt/fp-form-hooks';
import { erI22SvangerskapsukeEllerSenere, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

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
    const erFødselsdato = formMethods.watch('fødselsdato');

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFar = hvemPlanlegger.type !== Situasjon.MOR;

    return (
        <VStack gap="5">
            <GreenPanel isDarkGreen={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <VStack gap="8">
                    <Datepicker
                        label={<FormattedMessage id="ErFødtPanel.Fødselsdato" values={{ antallBarn }} />}
                        name="fødselsdato"
                        maxDate={dayjs().toDate()}
                        autofocusWhenEmpty
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
            </GreenPanel>
            {erFødselsdato !== undefined && dayjs(erFødselsdato).isAfter(DATE_3_YEARS_AGO) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                >
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" />
                    </BodyLong>

                    <BodyLong>
                        <FormattedMessage
                            id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                            values={{
                                erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                            }}
                        />
                    </BodyLong>
                    {erFarDelAvSøknaden(hvemPlanlegger) && (
                        <BodyLong>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket"
                                values={{
                                    erFar,
                                    hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                }}
                            />
                        </BodyLong>
                    )}
                </Infobox>
            )}
            {erFødselsdato !== undefined && dayjs(erFødselsdato).isBefore(DATE_3_YEARS_AGO) && (
                <Infobox
                    header={
                        <FormattedMessage
                            id="ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr"
                            values={{ erAlenesøker, antallBarn }}
                        />
                    }
                    icon={<TasklistStartIcon height={28} width={28} color="#236B7D" fontSize="1.5rem" />}
                    shouldFadeIn
                >
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr" values={{ antallBarn }} />
                    </BodyLong>
                    <BodyLong>
                        <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" values={{ erFar }} />
                    </BodyLong>
                </Infobox>
            )}
        </VStack>
    );
};
export default ErFødtPanel;
