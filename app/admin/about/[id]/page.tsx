"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { About as AboutType } from '@/types/about'
import { useAboutById, updateAbout } from "@/hooks/useAbout";
import { CiEdit } from "react-icons/ci";
import { toast, Toaster } from "react-hot-toast";
const AboutDetail = () => {
  const router=useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data, loading, error } = useAboutById(id!);

  const [formData, setFormData] = useState<AboutType>({
  name: "",
  email: "",
  phone: "",
  address: "" ,
  linkedin: "",
  description: "",
  title: [],
  profilePicture: "",
});
  const [picturePreview, setPicturePreview] = useState<string>();

  // Load into form when data arrives
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        description: data.description,
        phone: data.phone,
        address: data.address,
        linkedin: data.linkedin,
        title: data.title || [],
      });
      setPicturePreview(data.profilePicture || '');
    }
  }, [data]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20 text-red-600">Error: {error}</p>;
  if (!data) return <p className="text-center py-20">No data found</p>;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleTitleChange = (index: number, value: string) => {
    const updated = [...formData.title];
    updated[index] = value;
    setFormData((prev: any) => ({ ...prev, title: updated }));
  };

  const addNewTitle = () => {
    setFormData((prev: any) => ({ ...prev, title: [...prev.title, ""] }));
  };

  const removeTitle=(index:number)=>{
  setFormData((prev:any)=>({
    ...prev, 
  title: prev.title.filter((_:string, i:number) => i !== index)
  }))
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev: any) => ({ ...prev, profilePicture: file }));
      setPicturePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
  if (!id) return alert("id not defined");

  const fd = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (key === "title") {
      (value as string[]).forEach(item => fd.append("title", item));
    } else {
      fd.append(key, value as any);
    }
  });

  await updateAbout(id, fd); // id is guaranteed to exist
  toast.success("Updated Successfully!");
router.back()
};


  return (
    <section className="py-20">
      
      {/* Profile Picture */}
      <div className="flex justify-center items-center pb-12">
      <div className="relative w-fit align-middle">

  {/* Hidden File Input */}
  <input
    id="profileUpload"
    type="file"
    className="hidden"
    onChange={handleFileChange}
  />
<label htmlFor="profileUpload" className="cursor-pointer">
  {/* Image */}
  <img
    src={picturePreview}
    className="rounded-full h-40 w-40 object-cover"
  />
<div  className="absolute bottom-2 right-2  p-2 rounded-full cursor-pointer">
    <CiEdit size={20}  />
  </div>
</label>
</div>
</div>
      {/* Fields */}
      <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full rounded "
      />

      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />


      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        value={formData.linkedin}
        onChange={handleChange}
        className="border p-2 w-full rounded"
      />
</div>
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="border p-2 w-full h-32 my-4"
      />

      {/* Titles Array */}
       <h5 className="font-semibold ">Titles</h5>
       
      <div className="grid grid-cols-2 gap-4">
        {formData.title?.map((t: string, i: number) => (
          <div key={i} className="flex gap-2">
        <input
            type="text"
            value={t}
            onChange={(e) => handleTitleChange(i, e.target.value)}
            className="border p-2 w-full rounded"
          />
          <button onClick={()=>removeTitle(i)} className="button2">Delete</button>
          </div>
        ))}
        <br />
        <button onClick={addNewTitle} className="w-1/3 button2">
          + Add Title
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
      className="float-end my-4"
      >
        Save
      </button>
<Toaster />
    </section>
  );
};

export default AboutDetail;
