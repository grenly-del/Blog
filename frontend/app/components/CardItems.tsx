import Cookies from "js-cookie"


interface CardItemParams {
    nama_resep: string
    nama_pembuat: string
    id_item: string
    img: string
}

const CardItems:React.FC<CardItemParams> = ({nama_pembuat, nama_resep, id_item, img}) => {
    let token:any = Cookies.get('auth_token') || ''
    return (
        <section className="relative bg-white w-[300px] rounded-xl overflow-hidden shadow-lg shadow-gray-200">
            <div className="text-color-txt relative">
                <div className="w-full h-[198px] rounded-b-xl overflow-hidden">
                    <img src={img} alt="" className="w-full hover:scale-105 transition-all duration-200"/>
                </div>
                <div className="px-5 py-3">
                    <h1 className="text-lg font-bold">Nasi Goreng Terenak</h1>
                    <p className="text-sm font-semibold mt-2">Dibuat Oleh : <span className="font-normal">Grantly Sorongan</span></p>
                    <button className="text-sm text-primary mt-7 cursor-pointer">{'Selengkapnya >> '}</button>
                </div>
                {token.length > 0 ? (
                    <div className="flex items-center gap-x-5 absolute bottom-3 right-3">
                        <button className="cursor-pointer">
                            <img src="./icons/updateIcon.svg" alt="" width={15}/>
                        </button>
                        <button className="cursor-pointer">
                            <img src="./icons/deleteIcon.svg" alt="" width={13}/>
                        </button>
                    </div>

                ): (
                    <></>
                )}
            </div>
        </section>
    )
}

export default CardItems