'use client';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useAbout, deleteAbout } from '@/hooks/useAbout';
import { About as AboutType } from '@/types/about';
import { toast, Toaster} from 'react-hot-toast';
const AdminAbout = () => {
  const router=useRouter();
  const { data, loading } = useAbout();
  if (loading) return <p className='text-center py-5'>Loading...</p>;
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this?')) return;

    const success = await deleteAbout(id); 

    if (success) {
      toast.success('Deleted successfully!');
       router.refresh();
    } else {
      toast.error('Failed to delete');
    }
  };

  return (
    <section className='py-5'>
      <div className='grid grid-cols-2' >
      <h3>About</h3>
      <div className='justify-self-end'>
        <Link href={'/admin/about/add'}>
      <button className='' >Add</button>
    </Link>
      </div>
      </div>
      <table className=''>
        <thead>
          <tr>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? <tr><td className="border px-4 py-2">About Data Not Exist</td></tr>:(
          data && data?.map((val: AboutType) => (
            <tr key={val._id}>
              <td className="border px-4 py-2" >{val.name}</td>
              <td className="border px-4 py-2">{val.email}</td>
              <td className="border px-4 py-2">{val.phone}</td>
              <td className="border px-4 py-2 flex gap-2"> 
                <Link href={`admin/about/${val._id}`}>
                <button className='button2'>Edit</button>
                </Link>
                <button className='button2' onClick={()=>val._id && handleDelete(val._id)}>Delete</button>
              </td>
            </tr>
          )))
        }
        </tbody>
      </table>
      <Toaster />
    </section>
  );
};

export default AdminAbout;