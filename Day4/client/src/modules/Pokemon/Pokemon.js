import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card";

const Pokemon = () => {
    const { pokemonid } = useParams();

    const URL = `https://api.tcgdex.net/v2/en/cards/${pokemonid}`;
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

    console.log(data);

    return (
        <div>
            <Card key={data.id} item={data} />
        </div>
    );
};

export default Pokemon;
