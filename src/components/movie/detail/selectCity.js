import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Label } from "@headlessui/react"
import { Building2, ChevronsUpDownIcon, Fullscreen } from "lucide-react"

export default function SelectCity({ selected, setSelected}) {
    const cities = [
        { id: 1, name: "Hà Nội", value: "hanoi" },
        { id: 2, name: "Hồ Chí Minh", value: "hcm" },
        { id: 3, name: "Đà Nẵng", value: "danang" },
    ]

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-2">
                <ListboxButton className="grid w-48 cursor-pointer grid-cols-1 rounded-md bg-card py-2 px-3 text-left text-white border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
                    <Building2 className="col-start-1 row-start-1 size-5 self-center justify-self-start text-gray-400" />
                    <span className="col-start-1 row-start-1 flex items-center justify-self-center gap-3 pr-6">
                      <span className="block truncate">{selected?.name}</span>
                    </span>
                    <ChevronsUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400"
                    />
                </ListboxButton>

            </div>
        </Listbox>
    )
}
