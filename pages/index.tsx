import Image from 'next/image';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { TagIcon } from '@heroicons/react/solid'
import Link from 'next/link';

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )

  const { data } = await supabaseAdmin
  .from('images')
  .select('*')
  .order('id');
  return {
    props: {
      images: data,
    },
  }
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
}

export default function Gallery({ images }: { images: Image[] }) {

  return (

    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}

      </div>

    </div>

  )

}

const BlurImage = ({ image }: { image: Image }) => {

  const [isLoading, setLoading] = useState(true);

  return (

    <a href={image.href} className="group">

      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">

        <Image
          alt=""
          src={image.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100'
          )}
          onLoadingComplete={() => setLoading(false)}
        />

      </div>

      <div className='flex justify-between'>

        <h3 className="mt-4 text-sm text-gray-700">
          {image.name}
        </h3>

        <span id="imageTag" className="mt-4 text-sm text-gray-700 bg-white border-2 border-gray-700 px-4 py-2 rounded-lg">
          
          <span className='flex mx-auto justify-between align-middle items-center'>

            <TagIcon className="h-4 w-4"/>

            <span className='ml-2'>
              {image.tag}
            </span>

            

          </span>

        </span>

      </div>
      
      <p className="underline mt-1 text-lg font-medium text-gray-700">
        @{image.username}
      </p>

    </a>
  
  )

}