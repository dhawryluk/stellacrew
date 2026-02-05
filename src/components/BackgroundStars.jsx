import Star from "../assets/branding/StellaStar.png";

export default function BackgroundStars() {
    return (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-0">
            <div className="relative -left-20 md:-left-8">
                <img
                    src={Star}
                    alt="Big Stella Star Background"
                    className="w-100 h-100 md:w-125 md:h-125 opacity-[0.15]" />
                <div className="absolute top-1/3 left-1/3 translate-x-1/4 translate-y-1/4">
                <img 
                    src={Star} 
                    alt="Small Stella Star Background" 
                    className="w-37.5 h-37.5 md:w-62.5 md:h-62.5 opacity-[0.1]" />
                </div>
            </div>
        </div> 
    );
}   