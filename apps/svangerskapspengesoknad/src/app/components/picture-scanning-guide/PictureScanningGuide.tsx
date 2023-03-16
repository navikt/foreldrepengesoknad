import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import BEMHelper from 'common/util/bem';
import getMessage from 'common/util/i18nUtils';
import PictureScanningExample from './PictureScanningExample';
import './pictureScanningGuide.less';
import ScanningIkon from 'app/icons/ScanningIkon';
import { Heading, Link } from '@navikt/ds-react';
const bem = BEMHelper('pictureScanningGuide');
const PictureScanningGuide = () => {
    const svgIconHeight = 100;
    const intl = useIntl();
    return (
        <div className={bem.block}>
            <Heading size="medium" className={bem.element('title')}>
                <FormattedMessage id="psg.innholdstittel" />
            </Heading>
            <Heading size="small" className={bem.element('title')}>
                <FormattedMessage id="psg.section1.tittel" />
            </Heading>
            <ul>
                <FormattedMessage tagName="li" id="psg.section1.liste.punkt1" />
                <FormattedMessage
                    tagName="li"
                    id="psg.section1.liste.punkt2"
                    values={{ i: (msg: any) => <i>{msg}</i> }}
                />
                <FormattedMessage tagName="li" id="psg.section1.liste.punkt3" />
            </ul>
            <Heading size="small" className={bem.element('title')}>
                <FormattedMessage id="psg.section2.tittel" />
            </Heading>
            <ul>
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt1" />
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt2" />
                <FormattedMessage tagName="li" id="psg.section2.liste.punkt3" />
            </ul>
            <div className={bem.element('examples')}>
                <Heading size="small" className={bem.element('title')}>
                    <FormattedMessage id="psg.icon.heading" />
                </Heading>
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
                <Link target="_blank" href={getMessage(intl, 'psg.lenkepanel.url')}>
                    <FormattedMessage id="psg.lenkepanel.text" />
                </Link>
            </div>
        </div>
    );
};
export default PictureScanningGuide;
