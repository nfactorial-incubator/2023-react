import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";

const Series = () => {
    const URL = "https://api.tcgdex.net/v2/en/series";
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
            {data.map((series) => (
                <Card key={series.id} item={series} />
            ))}
        </div>
    );
};

export default Series;
