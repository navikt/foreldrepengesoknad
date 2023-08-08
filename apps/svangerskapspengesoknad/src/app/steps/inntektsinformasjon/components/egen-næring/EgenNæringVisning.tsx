import { Block, bemUtils, formatDate, intlUtils } from '@navikt/fp-common';
import { Næring } from 'app/types/Næring';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { getCountryName } from '@navikt/sif-common-formik-ds/lib';
import './egen-næring-visning.css';
import { BodyShort, Button, Heading, Label } from '@navikt/ds-react';
import { PencilWritingIcon } from '@navikt/aksel-icons';

interface Props {
    næring: Næring;
    setRedigererNæring: React.Dispatch<React.SetStateAction<boolean>>;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring, setRedigererNæring }) => {
    const intl = useIntl();
    const bem = bemUtils('egen-næring-visning');
    const tilTekst = !næring.pågående && næring.tidsperiode.tom ? formatDate(næring.tidsperiode.tom) : 'Pågående';
    const handleOnClickRediger = () => {
        setRedigererNæring(true);
    };

    return (
        <>
            <Block padBottom="l">
                <Heading level="3" size="small">
                    {intlUtils(intl, 'inntektsinformasjon.egenNæring.tittel')}
                </Heading>
            </Block>
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
                <Button
                    aria-label="rediger informasjon om egen næring"
                    variant="secondary"
                    className={bem.element('rediger')}
                    icon={<PencilWritingIcon aria-hidden />}
                    onClick={handleOnClickRediger}
                />
            </div>
        </>
    );
};

export default EgenNæringVisning;
