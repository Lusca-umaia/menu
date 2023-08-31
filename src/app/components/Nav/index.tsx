export default function ({ cardapioOptions, selectButton }: { cardapioOptions: string[], selectButton: number }) {
    return (
        <nav className="flex flex-col bg-white top-0 sticky z-10 pt-1.5 shadow-lg ease-linear duration-700 opacity-100" id='header'>
            <section className="flex gap-3.5 min-w-full overflow-auto scroll-remove px-2 pb-2 scrollStyle">
                {cardapioOptions.map((item, index) => (
                    <button
                        key={item + index}
                        type="button"
                        className={`${index == selectButton ?
                            "bg-white px-8 py-2 text-sm font-bold text-black w-auto border-black border-2 whitespace-nowrap" :
                            "bg-white px-8 py-2 text-sm font-medium text-gray-700 border-2 w-auto whitespace-nowrap"} `}
                    >
                        {item}
                    </button>
                ))}
            </section>
        </nav >
    )
}