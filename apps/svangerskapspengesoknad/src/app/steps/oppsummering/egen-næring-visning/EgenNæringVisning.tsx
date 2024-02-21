import { BodyShort } from '@navikt/ds-react';
import { Block, bemUtils, formatDate } from '@navikt/fp-common';
import { getCountryName, isValidDate } from '@navikt/fp-utils';
import { EgenNæring } from 'app/types/EgenNæring';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import './egen-næring-visning.css';
import { DATE_4_YEARS_AGO } from '@navikt/fp-constants';

const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: string | undefined): boolean => {
    if (!isValidDate(oppstartsdato)) {
        return true;
    }
    return !oppstartsdato || dayjs(oppstartsdato).startOf('day').isAfter(DATE_4_YEARS_AGO, 'day');
};

interface Props {
    næring: EgenNæring;
    setSelectedNæring?: React.Dispatch<React.SetStateAction<EgenNæring | undefined>>;
    deleteNæring?: (næring: EgenNæring) => void;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring }) => {
    const intl = useIntl();
    const bem = bemUtils('egen-næring-visning');
    const tilTekst = !næring.pågående && næring.tomDato ? formatDate(næring.tomDato) : 'Pågående';
    const erNyoppstartetNæring = erVirksomhetRegnetSomNyoppstartet(næring.fomDato);
    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <div className={bem.element('data')}>
                        <BodyShort className={bem.element('tittel')}>{næring.navnPåNæringen}</BodyShort>
                        {næring.registrertINorge && (
                            <BodyShort className={bem.element('orgnr')}>
                                {intl.formatMessage(
                                    { id: 'egenNæring.visning.orgnr' },
                                    {
                                        orgnr: næring.organisasjonsnummer,
                                    },
                                )}
                            </BodyShort>
                        )}
                        {!næring.registrertINorge && næring.registrertILand && (
                            <BodyShort className={bem.element('orgnr')}>
                                {getCountryName(næring.registrertILand, intl.locale)}
                            </BodyShort>
                        )}
                        <BodyShort className={bem.element('dato')}>
                            {formatDate(næring.fomDato)} - {tilTekst}
                        </BodyShort>
                        {næring.næringsinntekt && (
                            <BodyShort className={bem.element('inntekt')}>
                                {intl.formatMessage(
                                    { id: 'egenNæring.visning.inntekt' },
                                    {
                                        inntekt: næring.næringsinntekt,
                                    },
                                )}
                            </BodyShort>
                        )}
                    </div>
                    {!erNyoppstartetNæring && næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                        <div>
                            <BodyShort>
                                {intl.formatMessage(
                                    { id: 'egenNæring.visning.varigEndring' },
                                    {
                                        dato: næring.varigEndringDato ? formatDate(næring.varigEndringDato) : '-',
                                        inntekt: næring.varigEndringInntektEtterEndring,
                                    },
                                )}
                            </BodyShort>
                            <BodyShort>
                                {intl.formatMessage(
                                    { id: 'egenNæring.visning.varigEndring.beskrivelse' },
                                    {
                                        beskrivelse: næring.varigEndringBeskrivelse,
                                    },
                                )}
                            </BodyShort>
                        </div>
                    )}
                    {!erNyoppstartetNæring && !næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                        <div>
                            <BodyShort>
                                {intl.formatMessage({ id: 'egenNæring.visning.varigEndring.ingen' }, {})}
                            </BodyShort>
                        </div>
                    )}
                    {erNyoppstartetNæring && næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                        <div>
                            <BodyShort>
                                {intl.formatMessage(
                                    { id: 'egenNæring.visning.yrkesaktivSiste3år' },
                                    {
                                        dato: næring.oppstartsdato ? formatDate(næring.oppstartsdato) : '-',
                                    },
                                )}
                            </BodyShort>
                        </div>
                    )}
                    {erNyoppstartetNæring && !næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                        <div>
                            <BodyShort>
                                {intl.formatMessage({ id: 'egenNæring.visning.ikkeYrkesaktivSiste3år' })}
                            </BodyShort>
                        </div>
                    )}
                </div>
            </Block>
        </div>
    );
};
export default EgenNæringVisning;
