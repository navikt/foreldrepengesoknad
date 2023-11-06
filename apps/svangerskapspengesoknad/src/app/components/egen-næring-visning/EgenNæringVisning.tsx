import { Block, ISOStringToDate, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { EgenNæring } from 'app/types/EgenNæring';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './egen-næring-visning.css';
import { BodyShort, Label } from '@navikt/ds-react';
import { erVirksomhetRegnetSomNyoppstartet } from 'app/steps/egen-næring/egenNæringFormUtils';

interface Props {
    næring: EgenNæring;
    setSelectedNæring?: React.Dispatch<React.SetStateAction<EgenNæring | undefined>>;
    deleteNæring?: (næring: EgenNæring) => void;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring }) => {
    const intl = useIntl();
    const bem = bemUtils('egen-næring-visning');
    const tilTekst = !næring.pågående && næring.tidsperiode.tom ? formatDate(næring.tidsperiode.tom) : 'Pågående';
    const erNyoppstartetNæring = erVirksomhetRegnetSomNyoppstartet(ISOStringToDate(næring.tidsperiode.fom));
    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
                    <div className={bem.element('data')}>
                        <Label className={bem.element('tittel')}>{næring.navnPåNæringen}</Label>
                        {næring.registrertINorge && (
                            <BodyShort className={bem.element('orgnr')}>
                                {intlUtils(intl, 'egenNæring.visning.orgnr', {
                                    orgnr: næring.organisasjonsnummer,
                                })}
                            </BodyShort>
                        )}
                        {!næring.registrertINorge && næring.registrertILand && (
                            <BodyShort className={bem.element('orgnr')}>
                                {getCountryName(næring.registrertILand, intl.locale)}
                            </BodyShort>
                        )}
                        <BodyShort className={bem.element('dato')}>
                            {formatDate(næring.tidsperiode.fom)} - {tilTekst}
                        </BodyShort>
                        {næring.næringsinntekt && (
                            <BodyShort className={bem.element('inntekt')}>
                                {intlUtils(intl, 'egenNæring.visning.inntekt', {
                                    inntekt: næring.næringsinntekt,
                                })}
                            </BodyShort>
                        )}
                    </div>
                    {!erNyoppstartetNæring && næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                        <div>
                            <BodyShort>
                                {intlUtils(intl, 'egenNæring.visning.varigEndring', {
                                    dato: formatDate(næring.varigEndringDato!),
                                    inntekt: næring.varigEndringInntektEtterEndring,
                                })}
                            </BodyShort>
                            <BodyShort>
                                {intlUtils(intl, 'egenNæring.visning.varigEndring.beskrivelse', {
                                    beskrivelse: næring.varigEndringBeskrivelse,
                                })}
                            </BodyShort>
                        </div>
                    )}
                    {!erNyoppstartetNæring && !næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                        <div>
                            <BodyShort>{intlUtils(intl, 'egenNæring.visning.varigEndring.ingen', {})}</BodyShort>
                        </div>
                    )}
                    {erNyoppstartetNæring && næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                        <div>
                            <BodyShort>
                                {intlUtils(intl, 'egenNæring.visning.yrkesaktivSiste3år', {
                                    dato: formatDate(næring.oppstartsdato!),
                                })}
                            </BodyShort>
                        </div>
                    )}
                    {erNyoppstartetNæring && !næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                        <div>
                            <BodyShort>{intlUtils(intl, 'egenNæring.visning.ikkeYrkesaktivSiste3år')}</BodyShort>
                        </div>
                    )}
                </div>
            </Block>
        </div>
    );
};
export default EgenNæringVisning;
