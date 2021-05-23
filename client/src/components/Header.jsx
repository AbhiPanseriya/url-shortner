import { googleLogout, isAutheticated } from "../Auth/Auth"

const Header = () => {
    const user = isAutheticated();

    return (
        <div className="flex justify-between py-3">
            <div className="font-sans text-2xl">Url Shortner</div>
            <div className="flex items-center">
                <span className="mr-2">{ user.name }</span>
                <img className="rounded-full h-6" src={user.imageUrl} loading="lazy" />
                {googleLogout()}
            </div>
        </div>
    )
}

export default Header
