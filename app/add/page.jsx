'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


export default function Page() {

  const router = useRouter(); 
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [desc , setDesc] = useState('')


  return (
    <div className="flex">
      <main className=" flex-1 p-6 min-h-screen flex flex-col">
        <div className='bg-gray-800 rounded p-6 flex-1 flex flex-col'>

          
            <div className="relative w-full h-full">
              
              <div className="flex items-center w-full mb-4">
                <span className="text-6xl mr-4">Task :</span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-4 focus:ring-blue-500 text-2xl h-15 grow mr-4"
                  placeholder="Enter task here"
                  value={title}
                  onChange={text => setTitle(text.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-3xl text-white font-bold py-2 px-6 rounded  h-15"
                  onClick={async () => {
                    
                    const res = await fetch('http://localhost:3001/api/data', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                      title: title,
                      due_date: date,
                      content: desc
                    })
                    });
                    const data = await res.json();
                    router.push('/');

                  }}
                >
                  Add
                </button>
              </div>

              <hr className="border-4 mt-4 rounded-2xl" />
              <div className= "flex items-center w-full mb-4 mt-2">
                <span className = "text-5xl px-10" >Due Date:</span>
                <input
                    type="text"
                    className="border  mt-3 border-gray-400 rounded px-3 focus:outline-none focus:ring-4 focus:ring-blue-500 text-2xl h-10 grow mr-4"
                    placeholder="Enter due date here (MM-DD-YYYY HH:MM:SS)"
                    value={date}
                    onChange={text => setDate(text.target.value)}
                  />
                
              </div>
              <p className = "text-5xl pt-5 px-10" >Description: <br/>
                <div className = "bg-gray-900 rounded mt-2 ml-7.5 px-3 text-4xl flex items-center w-full">
                  <textarea
                    className="border  mt-3 border-gray-400 rounded px-3 focus:outline-none focus:ring-4 focus:ring-blue-500 text-2xl h-80 grow mb-3"
                    placeholder="Enter description of the task (optional)"
                    value={desc}
                    onChange={text => setDesc(text.target.value)}
                  />
                </div>
              </p>
              
              
            </div>
          
        </div>
      </main>
    </div>
  );
}

