import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { Næring } from 'app/types/Næring';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './egen-næring-visning.css';
import { BodyShort, Label } from '@navikt/ds-react';

interface Props {
    næring: Næring;
    setSelectedNæring?: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    deleteNæring?: (næring: Næring) => void;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring }) => {
    const intl = useIntl();
    const bem = bemUtils('egen-næring-visning');
    const tilTekst = !næring.pågående && næring.tidsperiode.tom ? formatDate(næring.tidsperiode.tom) : 'Pågående';

    return (
        <div>
            <Block padBottom="l">
                <div className={bem.block}>
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

                    <BodyShort className={bem.element('inntekt')}>
                        {intlUtils(intl, 'egenNæring.visning.inntekt', {
                            inntekt: næring.næringsinntekt,
                        })}
                    </BodyShort>
                </div>
            </Block>
        </div>
    );
};
export default EgenNæringVisning;
