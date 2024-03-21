import { Gabarito } from "next/font/google";
import constants from "~/lib/constants/constants";
import { cn } from "~/lib/utils";

const gabarito = Gabarito({ subsets: ["latin"] });

type TSize = "sm" | "md" | "lg";

type AppLogoProps = { size?: TSize; full?: boolean; className?: string, logoClassName?: string};

const AppLogo = ({ size = "md", full = true, className, logoClassName }: AppLogoProps) => {
  const sizes = getSizes(size);

  return (
    <div
      className={cn(
        "flex items-center gap-2 text-xl font-medium sm:text-2xl",
        className,
      )}
    >
      <Logo />
      <p className={cn(sizes.fontSize, gabarito.className)}>{constants.appName}</p>
    </div>
  );
};

export default AppLogo;

function getSizes(size: TSize) {
  switch (size) {
    case "sm":
      return { svgHeight: "25", svgWidth: "28", fontSize: "text-xl" };
    case "md":
      return { svgHeight: "28", svgWidth: "31", fontSize: "" };
    case "lg":
      return { svgHeight: "30", svgWidth: "34", fontSize: "" };
    default:
      return { svgHeight: "35", svgWidth: "39", fontSize: "" };
  }
}

type LogoProps = {className?: string};

export function Logo(props: LogoProps) {
  return (
    <div className={cn("w-5 sm:w-7", props.className)}>
        <svg
          width={25}
          height={28}
          viewBox="0 0 328 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_3_66)">
            <path
              d="M17.4799 328.624C17.4799 334.187 19.5548 339.522 23.2481 343.456C26.9415 347.39 31.9508 349.6 37.174 349.6H293.198C298.421 349.6 303.43 347.39 307.124 343.456C310.817 339.522 312.892 334.187 312.892 328.624V262.2H17.4799V328.624ZM243.962 -3.05176e-05H280.068C281.809 -3.05176e-05 283.479 0.736625 284.71 2.04788C285.941 3.35913 286.633 5.13758 286.633 6.99197V62.928C286.633 64.7824 285.941 66.5608 284.71 67.8721C283.479 69.1833 281.809 69.92 280.068 69.92H243.962C242.221 69.92 240.552 69.1833 239.32 67.8721C238.089 66.5608 237.398 64.7824 237.398 62.928V6.99197C237.398 5.13758 238.089 3.35913 239.32 2.04788C240.552 0.736625 242.221 -3.05176e-05 243.962 -3.05176e-05ZM50.3034 -3.05176e-05H86.4093C88.1504 -3.05176e-05 89.8202 0.736625 91.0513 2.04788C92.2824 3.35913 92.974 5.13758 92.974 6.99197V62.928C92.974 64.7824 92.2824 66.5608 91.0513 67.8721C89.8202 69.1833 88.1504 69.92 86.4093 69.92H50.3034C48.5623 69.92 46.8926 69.1833 45.6615 67.8721C44.4303 66.5608 43.7387 64.7824 43.7387 62.928V6.99197C43.7387 5.13758 44.4303 3.35913 45.6615 2.04788C46.8926 0.736625 48.5623 -3.05176e-05 50.3034 -3.05176e-05Z"
              fill="#121212"
            />
            <path
              d="M58.5579 69.92H65.0732V-3.05176e-05H58.5579V69.92ZM74.8461 -3.05176e-05V69.92H81.3614V-3.05176e-05H74.8461ZM250.758 69.92H257.274V-3.05176e-05H250.758V69.92ZM267.047 -3.05176e-05V69.92H273.562V-3.05176e-05H267.047Z"
              fill="#2F3640"
            />
            <path
              d="M185.288 17.48V34.96H202.768L185.288 17.48ZM143.336 34.96V17.48L125.856 34.96H143.336Z"
              fill="black"
            />
            <path
              d="M164.095 13.984C173.468 13.984 181.019 16.613 185.208 20.553L185.288 19.228C185.288 10.5474 176.642 3.49597 164.095 3.49597C151.552 3.49597 143.336 10.5474 143.336 19.228L143.472 20.3747C147.566 16.5326 154.869 13.984 164.095 13.984Z"
              fill="#2F3640"
            />
            <path
              d="M83.127 34.96H247.245C283.502 34.96 312.892 66.2666 312.892 104.88V262.2H17.4799V104.88C17.4799 66.2701 46.8701 34.96 83.127 34.96Z"
              fill="#54A0FF"
            />
            <path
              d="M199.483 111.659L169.774 81.9427C168.788 80.9588 167.452 80.4062 166.059 80.4062C164.667 80.4062 163.331 80.9588 162.345 81.9427L132.636 111.659C131.652 112.643 131.1 113.978 131.1 115.37C131.1 116.761 131.652 118.096 132.636 119.081L162.345 148.79C162.832 149.279 163.411 149.667 164.048 149.931C164.686 150.196 165.369 150.332 166.059 150.332C166.75 150.332 167.433 150.196 168.07 149.931C168.708 149.667 169.287 149.279 169.774 148.79L199.483 119.081C200.466 118.096 201.018 116.761 201.018 115.37C201.018 113.978 200.466 112.644 199.483 111.659ZM162.562 120.612C162.562 122.003 162.009 123.337 161.026 124.32C160.042 125.304 158.709 125.856 157.318 125.856C155.927 125.856 154.593 125.304 153.61 124.32C152.626 123.337 152.074 122.003 152.074 120.612V110.124C152.074 108.733 152.626 107.399 153.61 106.416C154.593 105.432 155.927 104.88 157.318 104.88C158.709 104.88 160.042 105.432 161.026 106.416C162.009 107.399 162.562 108.733 162.562 110.124V120.612ZM180.042 120.612C180.042 122.003 179.489 123.337 178.506 124.32C177.522 125.304 176.189 125.856 174.798 125.856C173.407 125.856 172.073 125.304 171.09 124.32C170.106 123.337 169.554 122.003 169.554 120.612V110.124C169.554 108.733 170.106 107.399 171.09 106.416C172.073 105.432 173.407 104.88 174.798 104.88C176.189 104.88 177.522 105.432 178.506 106.416C179.489 107.399 180.042 108.733 180.042 110.124V120.612Z"
              fill="#2F3640"
            />
            <path
              d="M267.444 202.768C267.444 199.059 266.054 195.502 263.579 192.88C261.105 190.257 257.749 188.784 254.249 188.784H76.1226C72.6232 188.784 69.2671 190.257 66.7926 192.88C64.3182 195.502 62.928 199.059 62.928 202.768V223.744H69.5253V286.672C69.5253 290.381 70.9155 293.938 73.3899 296.56C75.8644 299.183 79.2205 300.656 82.7199 300.656H247.652C251.152 300.656 254.508 299.183 256.982 296.56C259.457 293.938 260.847 290.381 260.847 286.672V223.744H267.444V202.768Z"
              fill="#2E86DE"
            />
            <path
              d="M260.452 230.623V223.744H69.9202V230.623H97.2254V243.09C97.2265 244.565 97.6802 246.001 98.5197 247.185C99.3593 248.369 100.54 249.24 101.888 249.668C103.236 250.096 104.68 250.059 106.006 249.563C107.333 249.067 108.472 248.137 109.255 246.912C108.281 247.498 107.179 247.811 106.056 247.82C104.313 247.82 102.642 247.095 101.41 245.805C100.178 244.515 99.4855 242.765 99.4855 240.941V230.623H260.452Z"
              fill="#2975C2"
            />
            <path
              d="M99.636 223.744V241.224C99.636 243.078 100.373 244.857 101.684 246.168C102.995 247.479 104.774 248.216 106.628 248.216C108.482 248.216 110.261 247.479 111.572 246.168C112.883 244.857 113.62 243.078 113.62 241.224V223.744H99.636ZM106.628 244.72C105.701 244.72 104.812 244.352 104.156 243.696C103.5 243.04 103.132 242.151 103.132 241.224C103.132 240.297 103.5 239.408 104.156 238.752C104.812 238.096 105.701 237.728 106.628 237.728C107.555 237.728 108.444 238.096 109.1 238.752C109.756 239.408 110.124 240.297 110.124 241.224C110.124 242.151 109.756 243.04 109.1 243.696C108.444 244.352 107.555 244.72 106.628 244.72Z"
              fill="#EBEDEE"
            />
            <path
              d="M247.245 34.96H83.127C46.8701 34.96 17.4799 66.2701 17.4799 104.88V115.368C17.4799 76.7546 46.8701 45.448 83.127 45.448H247.245C283.502 45.448 312.892 76.7546 312.892 115.368V104.88C312.892 66.2701 283.502 34.96 247.245 34.96Z"
              fill="#3396F9"
            />
            <path
              d="M99.636 223.744H113.62V230.736H99.636V223.744Z"
              fill="#D3D5D6"
            />
            <path
              d="M106.628 237.728C105.905 237.732 105.202 237.961 104.616 238.385C104.03 238.809 103.592 239.406 103.363 240.091L104.226 239.913C106.156 239.913 107.722 241.483 107.722 243.409C107.722 243.811 107.618 244.189 107.495 244.549C108.241 244.365 108.904 243.939 109.38 243.337C109.856 242.735 110.118 241.991 110.124 241.224C110.124 239.298 108.558 237.728 106.628 237.728Z"
              fill="#2F3640"
            />
            <path
              d="M97.2311 223.744H99.6364V230.736H97.2311V223.744Z"
              fill="#2F3640"
            />
            <path
              d="M293.198 339.112H37.174C31.9508 339.112 26.9415 336.902 23.2481 332.968C19.5548 329.034 17.4799 323.699 17.4799 318.136L17.4799 328.624C17.4799 334.187 19.5548 339.522 23.2481 343.456C26.9415 347.39 31.9508 349.6 37.174 349.6H293.198C298.421 349.6 303.43 347.39 307.124 343.456C310.817 339.522 312.892 334.187 312.892 328.624V318.136C312.892 323.699 310.817 329.034 307.124 332.968C303.43 336.902 298.421 339.112 293.198 339.112ZM247.245 300.656H83.127C79.6448 300.656 76.3053 299.183 73.8431 296.56C71.3808 293.938 69.9976 290.381 69.9976 286.672V293.664C69.9976 297.373 71.3808 300.93 73.8431 303.552C76.3053 306.175 79.6448 307.648 83.127 307.648H247.245C250.727 307.648 254.066 306.175 256.529 303.552C258.991 300.93 260.374 297.373 260.374 293.664V286.672C260.374 290.381 258.991 293.938 256.529 296.56C254.066 299.183 250.727 300.656 247.245 300.656Z"
              fill="#2F3640"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_66">
              <rect width="327.75" height="349.6" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
  );
}