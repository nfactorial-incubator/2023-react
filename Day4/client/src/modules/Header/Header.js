import { Link } from "react-router-dom";

const links = ["Покемоны", "Серии"];

const Header = () => {
    return (
        <header>
            <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div class="flex flex-wrap items-center mx-auto max-w-screen-xl">
                    <Link to="/" class="flex items-center mr-4">
                        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Dalidas pokemons
                        </span>
                    </Link>
                    <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
                        <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {links.map((el) => (
                                <li key={el}>
                                    <Link
                                        to="series"
                                        class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                        aria-current="page"
                                    >
                                        {el}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
