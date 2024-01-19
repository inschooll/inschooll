import { SyncLoader } from "react-spinners";

export default function AppSpinner() {
  return (
    <div className="flex justify-center ">
      <div className="h-10 w-10">
        <SyncLoader
          color={"rgb(230,230,230)"}
          size={8}
        />
      </div>
    </div>
  );
}