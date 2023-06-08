import Link from "next/link";

import Test from "./test";

const Page = () => {
    return (
        <div>
            <Test />
            <Link href="/">yo</Link>
        </div>
    );
};

export default Page;
