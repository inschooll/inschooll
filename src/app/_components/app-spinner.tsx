import { SyncLoader } from "react-spinners";

export default function AppSpinner() {
  return (
    <div className="flex justify-center ">
      <div className="h-10 w-10">
        <SyncLoader
          color={"rgb(230,230,230)"}
          size={8}
        />

          {/* <svg id="spinner" width="24" height="24" viewBox="0 0 16 16" fill="none" stroke-linecap="round" stroke="currentColor" stroke-width="1px" xmlns="http://www.w3.org/2000/svg"><style>
              :root {
                --spinner-animation-speed: 4s;
              }

              #spinner {
                animation: spinner-rotate calc(var(--spinner-animation-speed) / 3) linear infinite;
              }

              @keyframes spinner-rotate {
                100% { transform: rotate(360deg); }
              }

              .spinner-line {
                animation: dash var(--spinner-animation-speed) ease-in-out infinite;
              }

              @keyframes dash {
                75%, 100% {
                  stroke-dasharray: .5, 1;
                  stroke-dashoffset: -.8;
                }
              }
            </style><circle class="spinner-line" cx="8" cy="8" r="7" stroke-dasharray="1 0.8" stroke-dashoffset="1" pathLength="1"></circle><circle cx="8" cy="8" r="7" stroke-opacity="0.1" stroke-dasharray="0.8 1" pathLength="1"></circle><circle cx="8" cy="8" r="7" stroke-opacity="0.3" stroke-dasharray="0.2 1" pathLength="1" transform="rotate(-72 8 8)"></circle></svg> */}
      </div>
    </div>
  );
}