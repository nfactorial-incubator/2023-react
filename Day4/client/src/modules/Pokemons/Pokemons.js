import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";

const Pokemons = () => {
    const URL = "https://api.tcgdex.net/v2/en/cards";
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URL);
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="w-screen grid grid-cols-4 gap-2 p-4">
            {data.slice(100, 120).map((pokemon) => (
                <Card key={pokemon.id} item={pokemon} />
            ))}
        </div>
    );
};

export default Pokemons;
