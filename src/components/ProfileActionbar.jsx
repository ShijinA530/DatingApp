import React from 'react';
import axios from 'axios';
import { X, Star, Heart, MessageCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';

function ProfileActionbar({ userId, from, to }) {

  const userid=useParams()
console.log(userid.userId);

  const handleSendRequest = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/users/send/${userid.userId}`, { from, to },{ withCredentials: true });
      alert('Friend request sent!');
      console.log(userid.userId);
    } catch (error) {
      console.error('Error sending friend request', error);
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await axios.put(`/api/friendRequests/accept/${userId}`, { from });
      alert('Friend request accepted!');
    } catch (error) {
      console.error('Error accepting friend request', error);
    }
  };

  const handleShortlistRequest=async()=>{
    try {
      await axios.post(`http://localhost:5000/api/v1/users/shortlist/${userid.userId}`, { from, to },{ withCredentials: true });
      alert('Shortlisted!');
      console.log(userid.userId);
    } catch (error) {
      console.error('Error shortlisting', error);
    }
  }

  return (
    <div>
      <div className='shadow-lg p-2 w-fit mx-auto text-lg rounded-full flex backdrop-blur-lg bg-white/30 justify-center gap-8'>
        
        <div className='p-3 cursor-pointer bg-[#E108084D] rounded-full'>
          <X fill="#111" className='text-white' />
        </div>
        
        <div 
          className='p-3 cursor-pointer bg-[#4B164C] rounded-full'
          onClick={handleShortlistRequest}
        >
          <Star fill="white" strokeWidth={0} />
        </div>
        
        <div 
          className='p-3 cursor-pointer bg-[#DD88CF] rounded-full'
          onClick={handleSendRequest}
        >
          <Heart fill='white' strokeWidth={0} />      
        </div>
        
        <div className='p-3 cursor-pointer bg-[#e7a5dc] rounded-full'>
          <MessageCircle fill='white' strokeWidth={0} />      
        </div>
        
      </div>
    </div>
  );
}

export default ProfileActionbar;
