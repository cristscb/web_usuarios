import { Link } from "react-router-dom";
import { useState , useEffect } from "react";

const Home = () => {
    const [dataBack, setDataBack] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/back");
                if (!response.ok) {
                    throw new Error("no se pudo conectar al servidor");
                }
                const data = await response.json();
                setDataBack(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }
    , []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {!loading && !error && <p>{dataBack.titulo}</p>}
        </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
      <p className="text-lg mb-8">This is a simple home page.</p>
      <div className="flex gap-4">
      <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go to Login
      </Link>
      <Link to="/registro" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go to registro
      </Link>
      </div>
    </div>
  );
}   

export default Home;