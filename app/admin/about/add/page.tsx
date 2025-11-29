'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createAbout } from '@/hooks/useAbout';
import toast from 'react-hot-toast';
import { FiUser } from "react-icons/fi";


export default function AddAboutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const [titles, setTitles] = useState<string[]>(['']);
const [profileImage, setProfileImage] = useState<string | null>(null);
const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      setProfileImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const handleChange=( value:string, index:number)=>{
setTitles((prev:any)=>
  {
const updated=[...prev];
updated[index]=value;
return updated
  }
)

}

const addTitle=()=>{
  setTitles((prev:any)=>[
    ...prev,
    ''
  ])
}

const removeTitle=(index:number)=>{
  const del=titles.filter((_:string, i:number)=>i!==index);
  setTitles(del);
}
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    titles.forEach((title, index) => {
  formData.append(`titles[${index}]`, title);
});
const fileInput = document.getElementById('profilepic') as HTMLInputElement;
if (fileInput?.files && fileInput.files[0]) {
  formData.append('profilePicture', fileInput.files[0]);
}

    const result = await createAbout(formData);

    if (result.success) {
      toast.success('Created successfully!');
      router.back();
      router.refresh();
    } else {
      toast.error(result.error || 'Failed');
    }
    setLoading(false);
  };
  return (
    <div className="py-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Profile Picture - full width */}
     <div className="col-span-2 grid place-items-center my-4">
  

  <div 
    className="w-24 h-24 border rounded-full flex items-center justify-center cursor-pointer"
    onClick={() => document.getElementById('profilepic')?.click()}
  >
 {profileImage ? (
      <img src={profileImage} alt="Profile" className="w-full h-full  rounded-full " />
    ) : (
      <FiUser size={60} />
    )}
  </div>
<input 
    id="profilepic"
    type="file"
    name="profilePicture"
    accept="image/*"
    className="hidden"
    onChange={handleProfileChange}
  />
<label>Profile Picture</label>
</div>

    
        <div>
          <label>Full Name</label>
          <input 
            type="text"
            name="name"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email"
            name="email"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>Phone</label>
          <input 
            type="text"
            name="phone"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>Address (optional)</label>
          <input 
            type="text"
            name="address"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label>LinkedIn URL</label>
          <input 
            type="text"
            name="linkedin"
            required
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Description - full width */}
        <div className="col-span-2">
          <label>Description</label>
          <textarea 
            name="description"
            rows={5}
            required
            minLength={50}
            className="border p-2 w-full rounded"
          ></textarea>
        </div>

    <div className='col-span-2'>
          <label>Titles</label>
         <div className='grid grid-cols-2 gap-4'>
          {titles.map((value: string, index: number) => (
            <div className='flex gap-2' key={value}>
  <input type='text' value={value} className='border p-2 w-full rounded' onChange={(e)=>handleChange(e.target.value, index)} />
  <button className='button2' onClick={()=>addTitle()}>Add</button>
  <button className='button2' onClick={()=>removeTitle(index)}>Delete</button>
</div>
))}
</div>
        </div>

        {/* Buttons */}
        <div className="col-span-2">
          <button 
            type="submit"
            disabled={loading}
          className='float-right'
          >
            {loading ? 'Creating...' : 'Create About'}
          </button>

        </div>

      </form>
    </div>
  );
}
