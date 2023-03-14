/* eslint-disable no-console */
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
 * @param filename - Name of a file where the logger is called.
 * Can be set or changed with `setFilename()` function returned by the logger.
 * @returns
 */
const consoleLogger = (
  mode: 'production' | 'development',
  filename?: string
) => {
  const showLogs = mode === 'development' ? true : false;
  // let fileNameT: null | string = null;

  // const setFilename = (name: string) => {
  //   filename = name;
  // };

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

  const getFileNameStyle = (type: ColorMapTypes) => {
    return `color: ${colorMap[type]}; font-weight: bold;padding: 2px 0.5em;`;
  };

  const info = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;

    filename
      ? console.info(
          `%cInfo%c${filename}\n`,
          getBadgeStyle('info'),
          getFileNameStyle('default'),
          message,
          ...optionalParams
        )
      : console.info(
          `%cInfo`,
          getBadgeStyle('info'),
          '\n',
          message,
          ...optionalParams
        );
  };

  const worn = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;

    filename
      ? console.warn(
          `%cWarning%c${filename}\n`,
          getBadgeStyle('warning'),
          getFileNameStyle('default'),
          message,
          ...optionalParams
        )
      : console.warn(
          '%cWarning',
          getBadgeStyle('warning'),
          '\n',
          message,
          ...optionalParams
        );
  };

  const success = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;
    filename
      ? console.log(
          `%cSuccess%c${filename}\n`,
          getBadgeStyle('success'),
          getFileNameStyle('default'),
          message,
          ...optionalParams
        )
      : console.log(
          '%cSuccess',
          getBadgeStyle('success'),
          '\n',
          message,
          ...optionalParams
        );
  };

  const error = (message?: any, ...optionalParams: any[]) => {
    if (!showLogs) return;
    filename
      ? console.error(
          `%cError%c${filename}\n`,
          getBadgeStyle('error'),
          getFileNameStyle('default'),
          message,
          ...optionalParams
        )
      : console.error(
          '%cError',
          getBadgeStyle('error'),
          '\n',
          message,
          ...optionalParams
        );
  };

  return {
    error,
    success,
    info,
    worn,
    // setFilename,
  };
};

/**
 * Instance of consoleLogger with env.MODE supplied.
 */
const log = consoleLogger(import.meta.env.MODE as 'production' | 'development');

export { consoleLogger, log };
