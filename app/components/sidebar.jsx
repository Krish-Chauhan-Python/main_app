'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/data/')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
      <div className="p-3 text-4xl font-semibold text-shadow-black ">Notion Clone</div>
      <nav className="flex flex-col space-y-4 mt-8 px-4">
        <div className = "flex flex-col space-y-4 mt-8">
        <Link 
            href={`/`} 
            className="hover:bg-gray-700 px-2 py-1 text-3xl rounded"
          >
            Home
        </Link> 
        </div>

        <div className="flex items-center text-2xl px-2 space-x-3">
          <span>Assignments</span>
          <Link
            key="add"
            href={`/add`}
            className="hover:bg-gray-700 rounded px-1">
            +
          </Link>
        </div>
        {data.map(item => (
          <div className = "px-4">
          <Link 
            key={item._id} 
            href={`/Assignments/${item._id}`} 
            className="hover:bg-gray-700 px-2 py-0.5 rounded flex flex-col"
          >
            {item.title}
          </Link> 
          </div>
        ))}
      </nav>
    </aside>
  );
}



