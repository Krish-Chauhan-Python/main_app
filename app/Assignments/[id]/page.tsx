'use client'
import Sidebar from '@/app/components/sidebar.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function Page() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState<any>(null);
  const router = useRouter(); 
 


  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/api/data/${id}`)
      .then(res => res.json())
      .then(json => setAssignment(json))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <main className=" flex-1 p-6 min-h-screen flex flex-col">
        <div className='bg-gray-800 rounded p-6 flex-1 flex flex-col'>

          {assignment ? (
            <div className="relative w-full h-full">
              
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-6xl">Task : {assignment.title}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    
                    router.push(`${id}/update`);


                  }}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  onClick={async () => {
                    await fetch(`http://localhost:3001/api/data/${assignment._id}`, {
                    method: 'DELETE'
                    });
                    router.push('/');


                  }}
                >
                  Delete
                </button>
              </div>
              <hr className="border-4 mt-4 rounded-2xl" />
              <p className = "text-5xl pt-5 px-10" >Due Date: <br/>
              <p className = "text-3xl px-5">
                <div className = "bg-gray-900 rounded ml-2 mt-2 px-2.5 py-1 text-4xl">
                  {`${String(new Date(assignment.due_date).getUTCDate()).padStart(2, '0')}:${String(new Date(assignment.due_date).getUTCMonth() + 1).padStart(2, '0')}:${new Date(assignment.due_date).getUTCFullYear()}     ${String(new Date(assignment.due_date).getUTCHours()).padStart(2, '0')}:${String(new Date(assignment.due_date).getUTCMinutes()).padStart(2, '0')}:${String(new Date(assignment.due_date).getUTCSeconds()).padStart(2, '0')}`}
                </div>
              </p>
              </p>
              <p className = "text-5xl pt-5 px-10" >Description: <br/>
                <div className = "bg-gray-900 rounded mt-2 ml-7.5 px-3 py-1 text-4xl whitespace-pre-line overflow-y-scroll h-50">
                  {assignment.content ? (
                    <div>{assignment.content}</div>
                  ) : (
                    <div>No description available</div>
                  )}
                </div>
              </p>
              <div className="flex flex-col absolute bottom-0 w-full rounded bg-gray-600">

                <p className= "px-2 text-2xl">
                  
                  Created At:<br/>
                  {`${String(new Date(assignment.createdAt).getUTCDate()).padStart(2, '0')}:${String(new Date(assignment.createdAt).getUTCMonth() + 1).padStart(2, '0')}:${new Date(assignment.createdAt).getUTCFullYear()}     ${String(new Date(assignment.createdAt).getUTCHours()).padStart(2, '0')}:${String(new Date(assignment.createdAt).getUTCMinutes()).padStart(2, '0')}:${String(new Date(assignment.createdAt).getUTCSeconds()).padStart(2, '0')}`}
                  <br/>Last Updated:<br/>
                  {`${String(new Date(assignment.updatedAt).getUTCDate()).padStart(2, '0')}:${String(new Date(assignment.updatedAt).getUTCMonth() + 1).padStart(2, '0')}:${new Date(assignment.updatedAt).getUTCFullYear()}     ${String(new Date(assignment.updatedAt).getUTCHours()).padStart(2, '0')}:${String(new Date(assignment.updatedAt).getUTCMinutes()).padStart(2, '0')}:${String(new Date(assignment.updatedAt).getUTCSeconds()).padStart(2, '0')}`}
                  <br/>
                </p>
              </div>
              
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>
    </div>
  );
}

