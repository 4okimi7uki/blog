export const GirigiriIcon = ({
  width,
  height,
  color = "#f4c200",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="47" stroke={color} stroke-width="6" />
      <line x1="41.4142" y1="28.4142" x2="17.4142" y2="52.4142" stroke={color} stroke-width="4" />
      <line x1="20.4142" y1="28.5858" x2="43.4142" y2="51.5858" stroke={color} stroke-width="4" />
      <line x1="79.4142" y1="26.4142" x2="54.4142" y2="51.4142" stroke={color} stroke-width="4" />
      <line x1="54.4142" y1="26.5858" x2="79.4142" y2="51.5858" stroke={color} stroke-width="4" />
      <line x1="18.6806" y1="71.0257" x2="86.6806" y2="60.0257" stroke={color} stroke-width="4" />
      <path
        d="M50.5 67C55.5 75.5 59.5 85.5 67.5 82C75.5 78.5 67.5 63.5 67.5 63.5"
        stroke={color}
        stroke-width="4"
      />
      <path d="M58 64L65.5 77" stroke={color} stroke-width="4" />
      <line x1="13" y1="54" x2="13" y2="56" stroke={color} stroke-width="2" />
      <line x1="13" y1="58" x2="13" y2="60" stroke={color} stroke-width="2" />
      <line x1="17" y1="58" x2="17" y2="60" stroke={color} stroke-width="2" />
      <line x1="21" y1="62" x2="21" y2="64" stroke={color} stroke-width="2" />
      <line x1="13" y1="64" x2="13" y2="66" stroke={color} stroke-width="2" />
      <line x1="9" y1="62" x2="9" y2="64" stroke={color} stroke-width="2" />
      <line x1="77" y1="54" x2="77" y2="56" stroke={color} stroke-width="2" />
      <line x1="83" y1="52" x2="83" y2="54" stroke={color} stroke-width="2" />
      <line x1="87" y1="50" x2="87" y2="52" stroke={color} stroke-width="2" />
      <line x1="87" y1="54" x2="87" y2="56" stroke={color} stroke-width="2" />
      <line x1="81" y1="56" x2="81" y2="58" stroke={color} stroke-width="2" />
    </svg>
  );
};

export const GirigiriFillIcon = ({
  width,
  height,
  color = "#ffffff",
}: {
  width?: number;
  height?: number;
  color?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M250 0C388.071 0 500 111.929 500 250C500 388.071 388.071 500 250 500C111.929 500 0 388.071 0 250C1.28855e-05 111.929 111.929 1.28887e-05 250 0ZM250 18.75C122.284 18.75 18.75 122.284 18.75 250C18.75 377.716 122.284 481.25 250 481.25C377.716 481.25 481.25 377.716 481.25 250C481.25 122.284 377.716 18.75 250 18.75ZM250 31.25C370.812 31.25 468.75 129.188 468.75 250C468.75 370.812 370.812 468.75 250 468.75C153.668 468.75 71.8802 406.482 42.6895 320H50V310H40V311.45C34.305 291.956 31.25 271.335 31.25 250C31.25 129.188 129.188 31.25 250 31.25ZM91.8066 345.259L95 365L244.326 340.84C250.575 351.507 255.735 361.211 262.051 372.119C268.13 382.619 274.575 392.926 281.719 401.431C288.833 409.901 297.221 417.293 307.422 421.03C317.996 424.903 329.42 424.449 341.509 419.16C355.083 413.221 361.807 402.137 364.185 390.103C366.464 378.562 364.866 365.915 362.227 354.863C359.549 343.652 355.573 333.161 352.319 325.557C352.018 324.852 351.72 324.172 351.431 323.516L435 310L431.807 290.259L91.8066 345.259ZM330.952 326.831C331.796 328.614 332.826 330.845 333.931 333.428C336.927 340.432 340.451 349.787 342.773 359.512C345.134 369.397 346.035 378.783 344.565 386.226C343.193 393.175 339.916 398.029 333.491 400.84C325.581 404.3 319.504 404.158 314.297 402.251C308.717 400.206 303.041 395.723 297.031 388.569C291.05 381.449 285.308 372.38 279.355 362.1C275.095 354.74 270.208 345.819 265.439 337.427L286.538 334.014L318.838 389.995L336.162 380.005L307.656 330.596L330.952 326.831ZM60 330H70V320H60V330ZM100 320H110V310H100V320ZM60 300H70V290H60V300ZM80 300H90V290H80V300ZM400 290H410V280H400V290ZM60 280H70V270H60V280ZM380 280H390V270H380V280ZM430 280H440V270H430V280ZM410 270H420V260H410V270ZM154.141 180.854L109.141 135.859L95 150L140 195L80 255L94.1406 269.146L154.141 209.141L210 265L224.146 250.859L168.281 194.995L214.141 149.141L200 135L154.141 180.854ZM334.141 180.859L279.141 125.859L265 140L320 195L265 250L279.141 264.141L334.141 209.141L390 265L404.141 250.859L348.281 195L404.141 139.141L390 125L334.141 180.859ZM430 260H440V250H430V260Z"
        fill={color}
      />
    </svg>
  );
};

export const ChevronLeft = ({ width = 20, height = 20 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8L10 4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const ChevronRight = ({ width = 20, height = 20 }: { width?: number; height?: number }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <path
      d="M6 4L10 8L6 12"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
