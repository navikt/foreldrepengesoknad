import * as React from 'react';
import { FormattedHTMLMessage, FormattedMessage, injectIntl, InjectedIntl } from 'react-intl';

import Lenke from 'nav-frontend-lenker';
import { Systemtittel, Undertittel } from 'nav-frontend-typografi';

import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import PictureScanningExample from './PictureScanningExample';
import ScanningIkon from 'common/components/ikoner/ScanningIkon';

import './pictureScanningGuide.less';

const bem = BEMHelper('pictureScanningGuide');

interface Props {
    intl: InjectedIntl;
}

const PictureScanningGuide: React.FunctionComponent<Props> = ({ intl }) => {
    const svgIconHeight = 100;
    return (
        <div className={bem.block}>
            <Systemtittel className={bem.element('title')}>
                <FormattedMessage id="psg.innholdstittel" />
            </Systemtittel>

            <Undertittel className={bem.element('title')}>
                <FormattedMessage id="psg.section1.tittel" />
            </Undertittel>
            <FormattedHTMLMessage tagName="ul" id="psg.section1.liste" />

            <Undertittel className={bem.element('title')}>
                <FormattedMessage id="psg.section2.tittel" />
            </Undertittel>

            <FormattedHTMLMessage tagName="ul" id="psg.section2.liste" />
            <div className={bem.element('examples')}>
                <Undertittel tag="h3" className={bem.element('title')}>
                    <FormattedMessage id="psg.icon.heading" />
                </Undertittel>
                <div className={bem.element('body')}>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="good" height={svgIconHeight} />}
                            status="suksess"
                            statusText={getMessage(intl, 'psg.good')}
                            description={getMessage(intl, 'psg.icon.label.good')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="keystone" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'psg.bad')}
                            description={getMessage(intl, 'psg.icon.label.keystone')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="horizontal" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'psg.bad')}
                            description={getMessage(intl, 'psg.icon.label.horizontal')}
                        />
                    </div>
                    <div className={bem.element('cell')}>
                        <PictureScanningExample
                            image={<ScanningIkon status="shadow" height={svgIconHeight} />}
                            status="feil"
                            statusText={getMessage(intl, 'psg.bad')}
                            description={getMessage(intl, 'psg.icon.label.shadow')}
                        />
                    </div>
                </div>
                <Lenke target="_blank" href={getMessage(intl, 'psg.lenkepanel.url')}>
                    <FormattedMessage id="psg.lenkepanel.text" />
                </Lenke>
            </div>
        </div>
    );
};
export default injectIntl(PictureScanningGuide);
