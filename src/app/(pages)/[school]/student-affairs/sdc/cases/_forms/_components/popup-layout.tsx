import { IoCloseSharp } from "react-icons/io5";
import Button from "~/app/_components/buttons/button";
import { T5 } from "~/app/_components/texts/title";

type sizesProp = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";

interface PopupLayoutProps {
  children: React.ReactNode, 
  title: string, 
  submitButtonText: string, 
  showPopup: boolean, 
  maxW?: sizesProp, 
  h?: string, 
  zIndex?: 10 | 20 | 30 | 40 | 50,
  onClose?: () => void,
  setShowPopup: (v: boolean) => void,
}

export default function PopupLayout({children, title, submitButtonText, showPopup=true, setShowPopup, onClose, maxW="4xl", h="4/5", zIndex=10} : PopupLayoutProps) {
  const closePopup = () => {
    setShowPopup(false);
    if (onClose) onClose();
  };

  const width = `max-w-${maxW}`;
  const height =  `h-${h}`;
  
  return (
    <div className={`${showPopup ? "" : "hidden"} absolute top-0 -left-0 bg-cc-content-main/30 w-full h-full z-${zIndex}`} onClick={closePopup}>
      <div className="md:max-w-4xl h-3/4 h-4/5 hidden"></div>
      <div 
        className={`flex flex-col relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[650px] md:${height} md:${width} bg-cc-background-main border border-cc-border-main overflow-hidden rounded-3xl shadow-xl`} 
        onClick={(e) => e.stopPropagation()}
      >
        <PopupHeader title={title} clickClose={closePopup} />

        {/* content */}
        <main className="h-full overflow-y-auto px-6 py-4 gap-2">
          {children}
        </main>
        
        <PopupFooter submitText={submitButtonText} clickClose={closePopup} />
      </div>
    </div>
  );
}

function PopupHeader({title, clickClose} : {title: string, clickClose: () => void}) {
  return (
    <header className="px-6 py-3 flex justify-between items-center border-b border-cc-border-main">
      <T5 weight="semibold">{title}</T5>
      <IoCloseSharp className="text-cc-content-main/50 hover:text-cc-content-main/80 cursor-pointer" size={30} onClick={clickClose} />
    </header>
  );
}

function PopupFooter({submitText="Submit", clickClose} : {submitText?: string, clickClose: () => void}) {
  return (
    <footer className="px-6 py-3 w-full bg-cc-background-mainn border-t border-cc-border-main flex justify-end">
      {/* right */}
      <div className="flex items-center gap-10">
        <p onClick={clickClose} >Cancel</p>
        <Button>{submitText}</Button>
      </div>
    </footer>
  );
}