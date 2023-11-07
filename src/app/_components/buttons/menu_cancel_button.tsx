import type { MouseEventHandler } from "react";

const MenuCancelButton = ({onClick, showMenu} : {onClick: MouseEventHandler, showMenu: boolean}) => {
  return (
    <button
      className="md:hover:bg-cc-content-sub/10 p-2 rounded transition duration-[30]"
      onClick={onClick}
    >
      {showMenu == false ? (
        <div>
          <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-testid='menu-icon'></path></svg>
        </div>
      ) : (
        // <Image
        //   src={images.cancel}
        //   alt="cancel icon"
        //   width={20}
        //   height={20}
        //   data-testid='cancel-icon'
        // />
        <div className="">
          <svg className="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-testid="cancel-icon"></path>
          </svg>
        </div>

      )}
    </button>
  );
};

export default MenuCancelButton;