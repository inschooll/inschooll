import { UserTableNRDP } from "~/app/(pages)/(main)/_components/tables/user-tables";
import { T6 } from "~/components/texts/title";

export default function Verdict() {
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