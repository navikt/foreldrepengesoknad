import * as React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { AlertStripeAdvarsel, AlertStripeInfo, AlertStripeFeil } from 'nav-frontend-alertstriper';
import AriaText from 'common/components/aria/AriaText';
import { FormattedMessage } from 'react-intl';
import RegelAvvikFeilmelding from './RegelAvvikFeilmelding';
import Veileder, { VeilederAnsiktstype } from 'common/components/veileder/Veileder';
import { RegelAvvik, RegelAlvorlighet } from '../../regler/uttaksplanValidering/types';
import BEMHelper from 'common/util/bem';
import { trimRelaterteRegelAvvik } from '../../regler/uttaksplanValidering/regelUtils';

interface Props {
    avvik: RegelAvvik[];
}

const bem = BEMHelper('regelAvvik');

const UttaksplanRegelAvvikVeileder: React.StatelessComponent<Props> = ({ avvik }) => {
    const ulovlig = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.FEIL));
    const viktig = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.ADVARSEL));
    const info = trimRelaterteRegelAvvik(avvik.filter((b) => b.alvorlighet === RegelAlvorlighet.INFO));
    const harFeil = ulovlig.length > 0;

    let ansikt: VeilederAnsiktstype;
    if (ulovlig.length > 0) {
        ansikt = 'skeptisk';
    } else if (viktig.length > 0) {
        ansikt = 'undrende';
    } else {
        ansikt = 'glad';
    }

    return (
        <div>
            <AriaText tag="h2">
                <FormattedMessage id="uttaksplan.regelAvvik.ariaTittel" />
            </AriaText>
            <Veilederpanel
                kompakt={true}
                fargetema={harFeil ? 'feilmelding' : 'normal'}
                svg={<Veileder farge="transparent" stil="iNavVeilederPanel" ansikt={ansikt} />}
                type="plakat">
                <div className={bem.className}>
                    {ulovlig.length > 0 && (
                        <>
                            {ulovlig.map((ulovligAvvik) => (
                                <AlertStripeFeil key={ulovligAvvik.id} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={ulovligAvvik.info} />
                                </AlertStripeFeil>
                            ))}
                        </>
                    )}
                    {viktig.length > 0 && (
                        <>
                            {viktig.map((advarselAvvik) => (
                                <AlertStripeAdvarsel key={advarselAvvik.id} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={advarselAvvik.info} />
                                </AlertStripeAdvarsel>
                            ))}
                        </>
                    )}
                    {info.length > 0 && (
                        <>
                            {info.map((infoAvvik) => (
                                <AlertStripeInfo key={infoAvvik.id} className={'alertstripe--noBorder'}>
                                    <RegelAvvikFeilmelding info={infoAvvik.info} />
                                </AlertStripeInfo>
                            ))}
                        </>
                    )}
                </div>
            </Veilederpanel>
        </div>
    );
};

export default UttaksplanRegelAvvikVeileder;
