import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectLanguage, selectTranslation } from '../features/i18n/i18nSlice';

export const useI18n = () => {
  const lang = useSelector(selectLanguage);
  const translation = useSelector(selectTranslation);

  return useMemo(() => ({ lang, translation }), [lang, translation]);
};
