import { HttpClient as Http } from '@/utils/axois';

import ExtendsServiceAuto from './extends/services.auto';

const quickformPath: string = process.env.VUE_APP_BASE_API;
const extendsHttp = new Http(quickformPath);
const extendsServiceAuto: ExtendsServiceAuto = new ExtendsServiceAuto(
	extendsHttp
);

export { extendsServiceAuto };
