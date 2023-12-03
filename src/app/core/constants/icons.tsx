interface IconProps {
  width?: number;
  height?: number;
  className?: string;
}

export const CriminalCaseTypeIcon = ({
  width = 18,
  height = 18,
  className = "",
}: IconProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="22" rx="5" fill="#FF0000" />
      <g clip-path="url(#clip0_585_714)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.78589 6.01673L5.33629 9.33113C4.30829 10.7223 3.79389 11.4175 4.07709 11.9639L4.09149 11.9911C4.39149 12.5295 5.27948 12.5295 7.05468 12.5295C8.04108 12.5295 8.53468 12.5295 8.84348 12.8199L8.85949 12.8359L11.9571 9.17993L11.9411 9.16393C11.6379 8.86713 11.6379 8.39353 11.6379 7.44553V7.19753C11.6379 4.56953 11.6379 3.25593 10.8995 3.02953C10.1611 2.80313 9.36908 3.87433 7.78589 6.01673Z"
          fill="white"
        />
        <path
          opacity="0.5"
          d="M9.16257 14.5543V14.8023C9.16257 17.4295 9.16258 18.7439 9.90098 18.9703C10.6394 19.1967 11.4314 18.1255 13.0154 15.9831L15.465 12.6687C16.4922 11.2775 17.0066 10.5823 16.7234 10.0359C16.7187 10.0268 16.7139 10.0177 16.709 10.0087C16.409 9.47033 15.521 9.47033 13.7458 9.47033C12.7594 9.47033 12.2658 9.47033 11.957 9.17993L8.85938 12.8359C9.16258 13.1327 9.16257 13.6063 9.16257 14.5543Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_585_714">
          <rect
            width="12.8"
            height="16"
            fill="white"
            transform="translate(4 3)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CivilCaseTypeIcon = ({
  width = 18,
  height = 18,
  className = "",
}: IconProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="22" rx="5" fill="#978EFF" />
      <g clip-path="url(#clip0_585_737)">
        <path
          d="M11 8.63637C10.4213 8.63637 9.86639 8.86624 9.45722 9.27541C9.04805 9.68458 8.81818 10.2395 8.81818 10.8182C8.81818 11.3968 9.04805 11.9518 9.45722 12.361C9.86639 12.7701 10.4213 13 11 13C11.5787 13 12.1336 12.7701 12.5428 12.361C12.9519 11.9518 13.1818 11.3968 13.1818 10.8182C13.1818 10.2395 12.9519 9.68458 12.5428 9.27541C12.1336 8.86624 11.5787 8.63637 11 8.63637ZM11 14.4546C10.0356 14.4546 9.11065 14.0714 8.4287 13.3895C7.74675 12.7075 7.36364 11.7826 7.36364 10.8182C7.36364 9.85377 7.74675 8.92885 8.4287 8.2469C9.11065 7.56495 10.0356 7.18183 11 7.18183C11.9644 7.18183 12.8893 7.56495 13.5713 8.2469C14.2532 8.92885 14.6364 9.85377 14.6364 10.8182C14.6364 11.7826 14.2532 12.7075 13.5713 13.3895C12.8893 14.0714 11.9644 14.4546 11 14.4546ZM11 5.36365C7.36364 5.36365 4.25818 7.62547 3 10.8182C4.25818 14.0109 7.36364 16.2727 11 16.2727C14.6364 16.2727 17.7418 14.0109 19 10.8182C17.7418 7.62547 14.6364 5.36365 11 5.36365Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_585_737">
          <rect
            width="16"
            height="11.6364"
            fill="white"
            transform="translate(3 5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HostelCaseTypeIcon = ({
  width = 18,
  height = 18,
  className = "",
}: IconProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="22" height="22" rx="5" fill="#1DD1A1" />
      <g clip-path="url(#clip0_585_751)">
        <path
          d="M11 4C7.136 4 4 7.136 4 11C4 14.864 7.136 18 11 18C14.864 18 18 14.864 18 11C18 7.136 14.864 4 11 4ZM14.5 11.7H7.5V10.3H14.5V11.7Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_585_751">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(4 4)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
