import ApiAction from './ApiAction';
import SøknadAction from './SøknadAction';
import CommonAction from './CommonAction';
import AttachmentAction from './AttachmentAction';

type Action = CommonAction | ApiAction | SøknadAction | AttachmentAction;

export default Action;
