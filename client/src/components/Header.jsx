import { googleLogout, isAutheticated } from "../Auth/Auth"

const Header = ({ isCreateUrlClicked, setIsCreateUrlClicked }) => {
    const user = isAutheticated();

    return (
        <div className="flex justify-between p-3">
            <div className="font-sans text-2xl flex items-center">
                <img src="logo.svg" className="h-6 mr-2" />
                Url Shortner
            </div>
            <div className="flex items-center">
                {
                    !isCreateUrlClicked && (
                        <button
                            className="btn shadow-none bg-white mr-2 py-1 px-2"
                            onClick={(e) => setIsCreateUrlClicked(true)}
                        >
                            {/* <span>create</span> */}
                            <img className="h-8 py-1" src="/assets/plus.svg" />
                        </button>
                    )
                }
                <span className="hidden sm:block mr-2">{user.name}</span>
                <img className="rounded-full h-8" src={user.imageUrl} loading="lazy" />
                {googleLogout()}
            </div>
        </div>
    )
}

export default Header
