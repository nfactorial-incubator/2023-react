import axios from "axios";

const getData = async ({ params }) => {
    const res = await axios.get(
        "https://wizard-world-api.herokuapp.com/Wizards"
    );
    return res.data;
};

const Test = async ({ params }) => {
    const data = await getData({ params });

    console.log(data);

    return <div>ewerwerwer</div>;
};

export default Test;
