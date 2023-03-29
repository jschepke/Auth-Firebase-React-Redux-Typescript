import { type SvgIconProps, SvgIcon } from '@mui/material';

const ReactIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-11.5 -10.23174 23 20.46348"
      >
        <title>React Logo</title>
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    </SvgIcon>
  );
};

const MuiIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 32"
        fill="none"
        className="css-1170n61"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z"
          fill="#007FFF"
        ></path>
      </svg>
    </SvgIcon>
  );
};

const FirebaseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient
            gradientTransform="matrix(2.67 0 0 -2.67 317.23 -1808)"
            gradientUnits="userSpaceOnUse"
            id="d"
            x1="-108.63"
            x2="-58.56"
            y1="-692.24"
            y2="-742.31"
          >
            <stop offset="0" stopColor="#fff" stopOpacity=".1"></stop>
            <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="b"
            x1="56.9"
            x2="48.9"
            y1="102.54"
            y2="98.36"
          >
            <stop offset="0" stopColor="#a52714"></stop>
            <stop offset=".4" stopColor="#a52714" stopOpacity=".5"></stop>
            <stop offset=".8" stopColor="#a52714" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="c"
            x1="90.89"
            x2="87.31"
            y1="90.91"
            y2="87.33"
          >
            <stop offset="0" stopColor="#a52714" stopOpacity=".8"></stop>
            <stop offset=".5" stopColor="#a52714" stopOpacity=".21"></stop>
            <stop offset="1" stopColor="#a52714" stopOpacity="0"></stop>
          </linearGradient>
          <clipPath id="a">
            <path d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150l57.9 32.46a12 12 0 0011.7 0L160 150z"></path>
          </clipPath>
        </defs>
        <g clipPath="url(#a)">
          <path
            d="M32 150L53.66 11.39a4 4 0 017.48-1.27l22.4 41.78 8.93-17a4 4 0 017.08 0L160 150z"
            fill="#ffa000"
          ></path>
          <path
            d="M106 9L0 0v192l32-42L106 9z"
            fill="url(#b)"
            opacity=".12"
          ></path>
          <path
            d="M106.83 96.01l-23.3-44.12L32 150l74.83-53.99z"
            fill="#f57c00"
          ></path>
          <path d="M0 0h192v192H0z" fill="url(#c)" opacity=".2"></path>
          <path
            d="M160 150L143.41 47.34a4 4 0 00-6.77-2.16L32 150l57.9 32.47a12 12 0 0011.7 0z"
            fill="#ffca28"
          ></path>
          <path
            d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150h-.08l.07.08.57.28L115.83 67l20.78-20.8a4 4 0 016.78 2.16l16.45 101.74.16-.1zM32.19 149.81L53.66 12.39a4 4 0 017.48-1.28l22.4 41.78 8.93-17a4 4 0 017.08 0l16 30.43z"
            fill="#fff"
            fillOpacity=".2"
          ></path>
          <path
            d="M101.6 181.49a12 12 0 01-11.7 0l-57.76-32.4-.14.91 57.9 32.46a12 12 0 0011.7 0L160 150l-.15-.92z"
            fill="#a52714"
            opacity=".2"
            style={{ isolation: 'isolate' }}
          ></path>
          <path
            d="M143.41 47.34a4 4 0 00-6.77-2.16L115.88 66 99.54 34.89a4 4 0 00-7.08 0l-8.93 17-22.4-41.77a4 4 0 00-7.48 1.28L32 150l57.9 32.46a12 12 0 0011.7 0L160 150z"
            fill="url(#d)"
          ></path>
        </g>
      </svg>
    </SvgIcon>
  );
};

const ReduxIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 333333 316450"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        imageRendering="optimizeQuality"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <path
          d="M230965 221006c12301-1273 21633-11878 21209-24604-423-12725-11029-22906-23754-22906h-848c-13151 424-23331 11453-22906 24603 424 6363 2969 11878 6786 15695-14422 28422-36479 49207-69565 66599-22482 11878-45811 16120-69141 13151-19089-2546-33935-11029-43269-25029-13573-20785-14845-43268-3392-65750 8060-16120 20784-27997 28844-33936-1696-5515-4242-14846-5514-21633-61507 44541-55143 104776-36480 133197 13998 21211 42418 34361 73807 34361 8483 0 16966-849 25450-2969 54296-10606 95442-42845 118771-90779zm74656-52600c-32238-37754-79746-58539-134042-58539h-6786c-3818-7635-11878-12727-20785-12727h-849c-13148 424-23328 11453-22905 24604 424 12725 11028 22906 23754 22906h848c9332-425 17392-6363 20785-14423h7635c32238 0 62779 9332 90352 27573 21208 13999 36479 32239 44962 54297 7211 17817 6787 35208-849 50056-11876 22482-31813 34784-58112 34784-16967 0-33086-5091-41570-8909-4665 4242-13150 11028-19088 15272 18241 8483 36905 13150 54720 13150 40722 0 70839-22483 82292-44965 12301-24604 11452-67023-20361-103079zM90137 228216c424 12726 11029 22906 23754 22906h849c13150-423 23330-11453 22905-24603-423-12726-11029-22906-23754-22906h-848c-849 0-2122 0-2969 423-17392-28845-24603-60234-22057-94170 1695-25452 10180-47510 25026-65751 12301-15695 36055-23331 52174-23754 44962-849 64050 55144 65323 77628 5515 1272 14846 4242 21210 6363C246659 35633 204241 0 163521 0c-38177 0-73384 27573-87383 68296-19512 54297-6786 106472 16968 147620-2120 2969-3393 7635-2969 12302v-1z"
          fill="#764abc"
        />
      </svg>
    </SvgIcon>
  );
};
const TypescriptIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 48 48"
      >
        <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
        <polygon
          fill="#fff"
          points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
        ></polygon>
        <path
          fill="#fff"
          d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
        ></path>
      </svg>
    </SvgIcon>
  );
};

export { FirebaseIcon, MuiIcon, ReactIcon, ReduxIcon, TypescriptIcon };
