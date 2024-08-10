import React from 'react'
import UserIcon from './UserIcon'
import { Heart, QrCode, X } from 'lucide-react'

const UserPreview = ({url, name, bio, edit, qr, close, fav}) => {
  return (
    <div
    className='py-4 flex items-center justify-between w-72'>
      <div className='flex gap-5 items-center'>
      <UserIcon 
      url={url}
      edit={edit}/>
      <div>
      <p className='text-text font-semibold text-2xl'>{name}</p>
      <p className='text-text-light text-sm'>{bio}</p>
      </div>
      </div>
      <div className='flex gap-5'>
      {qr ? <QrCode className='w-6 h-6 text-[#24786d]'/>
      : ''}
    {fav ? <Heart className='w-6 h-6 text-text-light' />: ''}
      {close ? <X className='w-6 h-6 text-text-light'/> : ''}
      </div>
    </div>
  )
}

export default UserPreview