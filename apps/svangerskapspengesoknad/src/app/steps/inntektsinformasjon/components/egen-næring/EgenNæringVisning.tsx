import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { Næring } from 'app/types/Næring';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './egen-næring-visning.css';
import { BodyShort, Button, Label } from '@navikt/ds-react';
import { PencilWritingIcon, TrashIcon } from '@navikt/aksel-icons';

interface Props {
    næring: Næring;
    setSelectedNæring?: React.Dispatch<React.SetStateAction<Næring | undefined>>;
    deleteNæring?: (næring: Næring) => void;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring, setSelectedNæring, deleteNæring }) => {
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
                            {intlUtils(intl, 'inntektsinformasjon.egenNæring.visning.orgnr', {
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
                        {intlUtils(intl, 'inntektsinformasjon.egenNæring.visning.inntekt', {
                            inntekt: næring.næringsinntekt,
                        })}
                    </BodyShort>
                    {setSelectedNæring && (
                        <Button
                            aria-label="rediger informasjon om egen næring"
                            variant="secondary"
                            className={bem.element('rediger')}
                            icon={<PencilWritingIcon aria-hidden />}
                            onClick={() => setSelectedNæring(næring)}
                        />
                    )}
                    {deleteNæring && (
                        <Button
                            aria-label="slett informasjon om arbeid i utlandet"
                            variant="secondary"
                            className={bem.element('slett')}
                            icon={<TrashIcon aria-hidden />}
                            onClick={() => deleteNæring(næring)}
                        />
                    )}
                </div>
            </Block>
        </div>
    );
};
export default EgenNæringVisning;
