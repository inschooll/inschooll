import React from 'react'
import { SectionTitle } from '../_components/section-title'
import Input from '~/components/inputs/input'
import Link from 'next/link'
import links from '~/app/core/constants/links'
import { MdAdd } from 'react-icons/md'
import { buttonVariants } from '~/components/ui/button'

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="Courses" variant="lg" />

      {/* Search <-> Add degree and co */}
      <div className="mt-1 flex justify-between">
        <Input />

        <div className="flex gap-2">
          <Link
            href={links.backoffice.courses.create}
            className={buttonVariants({ variant: "default" })}
          >
            <MdAdd size={16} />
            <p className="pl-0.5">Add course</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

