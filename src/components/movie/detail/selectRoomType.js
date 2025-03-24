import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Label } from "@headlessui/react"
import { ChevronsUpDownIcon, Fullscreen } from "lucide-react"

export default function SelectRoomType({ selected, setSelected}) {
    const roomTypes = [
        { id: 1, name: "2D" },
        { id: 2, name: "3D" },
        { id: 3, name: "IMAX" },
    ]

    return (
        <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-2">
                <ListboxButton className="grid w-32 cursor-pointer grid-cols-1 rounded-md bg-card py-2 px-3 text-left text-white border border-gray-700 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm">
                    <Fullscreen className="col-start-1 row-start-1 size-5 self-center justify-self-start text-gray-400" />
                    <span className="col-start-1 row-start-1 flex items-center justify-self-center gap-3 pr-6">
                      <span className="block truncate">{selected?.name}</span>
                    </span>
                    <ChevronsUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-card py-1 text-base ring-1 ring-gray-700 shadow-lg focus:outline-none sm:text-sm no-scrollbar"
                >
                    {roomTypes.map((roomType) => (
                        <ListboxOption
                            key={roomType.id}
                            value={roomType}
                            className="group relative cursor-pointer py-2 px-3 text-white hover:bg-gray-700 select-none flex items-center"
                        >
                            <div className="flex items-center">
                              <span className="block truncate font-normal group-data-selected:font-semibold">{roomType.name}</span>
                            </div>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}
