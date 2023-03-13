/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
type ColorMapTypes = 'default' | 'success' | 'info' | 'warning' | 'error';

type ColorMap = {
  [key in ColorMapTypes]: string;
};

/**
 * Custom logger function.
 * Returns decorated console logs.
 *
 * @param mode - Determines whether logs should be visible.
 * In `production` mode logs are turned off and nothing shows in console.
 * @returns
 */
export const logger = (mode: 'production' | 'development') => {
  const showLogs = mode === 'development' ? true : false;

  const colorMap: ColorMap = {
    default: '#7f8c8d',
    success: '#00E676',
    info: '#29b6f6',
    warning: '#FFA000',
    error: '#FF5722',
  };

  const getBadgeStyle = (type: ColorMapTypes) => {
    return `background: ${colorMap[type]};
      border-radius: 0.5em;
      color: #000;
      font-weight: bold;
      padding: 2px 0.5em;`;
  };

  const info = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;
    console.info('%cInfo', getBadgeStyle('info'), message, ...optionalParams);
  };

  const worn = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;

    console.warn(
      '%cWarning',
      getBadgeStyle('warning'),
      message,
      ...optionalParams
    );
  };

  const success = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;

    console.log(
      '%cSuccess',
      getBadgeStyle('success'),
      message,
      ...optionalParams
    );
  };

  const error = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;

    console.error(
      '%cError',
      getBadgeStyle('error'),
      message,
      ...optionalParams
    );
  };

  return {
    error,
    success,
    info,
    worn,
  };
};
