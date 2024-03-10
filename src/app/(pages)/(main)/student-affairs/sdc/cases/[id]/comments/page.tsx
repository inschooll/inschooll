'use client';
import images from "~/lib/constants/images";
import { Avatar } from "~/components/avatar-username";
import Button2 from "~/components/buttons/button2";
import Input from "~/components/inputs/input";
import { T6 } from "~/components/texts/title";

export default function Comments() {

  const CommentItem = () => {
    return (
      <div className="flex gap-5">
        <div className="shrink pt-1">
          <Avatar url={images.maleAvatarDefault} size={10} />
        </div>

        <div className="">
          <h5 className="font-medium">Anointing Dauda</h5>
          <p className="">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta quod dolore perferendis deserunt, temporibus architecto. A eos itaque illum iste.</p>
        </div>

      </div>
    );
  }
  
  return(
    <div className="mt-5">
      <T6>3 Comments</T6>
      {/* Input field */}
      <div className="mt-3 flex gap-5 items-center">
        <Avatar url={images.femaleAvatarDefault} size={10} />
        <div className="flex-1">
          <Input />
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-3 flex gap-5 justify-end items-center">
        <Button2 variant="gray">Cancel</Button2>
        <Button2 variant="blue">Comment</Button2>
      </div>

      {/* comments */}
      <div className="mt-5 grid gap-7">
        {/* item */}
        {[1, 2, 3].map((comment) => (<CommentItem key={comment} />))}
      </div>
    </div>
  );
}