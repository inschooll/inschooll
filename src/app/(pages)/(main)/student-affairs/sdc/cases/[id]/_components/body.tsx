'use client'
import { useState } from "react";
import { UserTableNRDP, UserTableNRDSPA } from "~/app/(pages)/(main)/_components/tables/user-tables";
import { Avatar } from "~/components/avatar-username";
import Button2 from "~/components/buttons/button2";
import Input from "~/components/inputs/input";
import Navbar from "~/components/navbar";
import { T6 } from "~/components/texts/title";
import images from "~/app/core/constants/images";

export default function CaseBody() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navItems = ['Body', 'Comments', 'Verdict'].map(item => ({text: item}));

  return (
    <>
      <Navbar navItems={navItems} defaultSelected={0} updateSelected={setSelectedIndex} />

      {selectedIndex === 0 && <Body />}
      {selectedIndex === 1 && <Comments />}
      {selectedIndex === 2 && <Verdict />}
    </>
  );
} 

function Body() {
  return(
    <div className="mt-5">
      {/* Description */}
      <div className="px-12 pt-10 pb-14 bg-black rounded-2xl">
        <T6 color="text-white">What Happened?</T6>
        <p className="text-white mt-5 text-[17px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ad non recusandae voluptatem minus enim corrupti. Et sed incidunt delectus debitis ullam deserunt, consequatur veritatis voluptates consectetur, earum possimus numquam vero placeat sequi unde eius. Doloremque repellendus, quasi molestias recusandae, non corporis enim ratione doloribus vel unde aspernatur illo quos iusto modi, veniam laborum dolor! Voluptates rerum alias, architecto aliquam quidem perspiciatis tempora amet aperiam ipsam quis sequi voluptatem ea qui, sunt sit nemo, repudiandae soluta unde fugiat molestias voluptas atque? Blanditiis, quisquam? Nobis, officiis. Perspiciatis et nihil eos quis perferendis dicta sapiente dolorum, laborum, sunt provident impedit possimus minus, tempora aut. Rem voluptas, sint eos porro neque totam inventore cupiditate incidunt officia laboriosam. 
          
        illum distinctio harum! Veniam laboriosam at esse et corporis mollitia explicabo ab expedita saepe voluptas? Eius earum a mollitia sed corrupti saepe soluta! Pariatur quo ea veniam consequuntur explicabo assumenda sequi? Harum architecto vitae illo assumenda velit eum quae quos tempora excepturi consequuntur non neque quas, cumque nemo! Voluptatum quisquam minima ut ratione cupiditate eos, quidem consequatur veniam sapiente nobis, commodi neque. Eligendi dolorem repellendus, quisquam modi deleniti numquam animi repudiandae laudantium exercitationem sed. Atque magni ex commodi qui quam quod saepe vel quaerat optio aut?</p>
      </div>

      {/* offenders */}
      <>
        <div className="mt-10 px-12 py-10 border border-cc-border-main rounded-2xl">
          <T6 weight="semibold">Offenders</T6>
          {/* table */}
          <div className="pt-6">
            <UserTableNRDSPA />
          </div>
        </div>

        {/* Board Members */}

      </>
    </div>
  );
}
function Comments() {

  function CommentItem() {
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
function Verdict() {
  return(
    <div className="mt-5">
      {/* Description */}
      <div className="px-12 pt-10 pb-14 bg-purple-200 border border-purple-400 rounded-2xl">
        <T6 color="text-black">Conclussion</T6>
        <p className="text-black/80 font-medium mt-5 text-[17px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ad non recusandae voluptatem minus enim corrupti. Et sed incidunt delectus debitis ullam deserunt, consequatur veritatis voluptates consectetur, earum possimus numquam vero placeat sequi unde eius. Doloremque repellendus, quasi molestias recusandae, non corporis enim ratione doloribus vel unde aspernatur illo quos iusto modi, veniam laborum dolor! Voluptates rerum alias, architecto aliquam quidem perspiciatis tempora amet aperiam ipsam quis sequi voluptatem ea qui, sunt sit nemo, repudiandae soluta unde fugiat molestias voluptas atque? Blanditiis, quisquam? Nobis, officiis. Perspiciatis et nihil eos quis perferendis dicta sapiente dolorum, laborum, sunt provident impedit possimus minus, tempora aut. Rem voluptas, sint eos porro neque totam inventore cupiditate incidunt officia laboriosam. 
          
        illum distinctio harum! Veniam laboriosam at esse et corporis mollitia explicabo ab expedita saepe voluptas? Eius earum a mollitia sed corrupti saepe soluta! Pariatur quo ea veniam consequuntur explicabo assumenda sequi? Harum architecto vitae illo assumenda velit eum quae quos tempora excepturi consequuntur non neque quas, cumque nemo! Voluptatum quisquam minima ut ratione cupiditate eos, quidem consequatur veniam sapiente nobis, commodi neque. Eligendi dolorem repellendus, quisquam modi deleniti numquam animi repudiandae laudantium exercitationem sed. Atque magni ex commodi qui quam quod saepe vel quaerat optio aut?</p>
      </div>

      {/* offenders */}
      <>
        <div className="mt-10 px-12 py-10 border border-cc-border-main rounded-2xl">
          <T6 weight="semibold">Offenders Punishments</T6>
          {/* table */}
          <div className="pt-6">
            <UserTableNRDP />
          </div>
        </div>

        {/* Board Members */}

      </>
    </div>
  );
}