"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { CompanyOption } from "@/types"
import { motion } from "framer-motion"

interface CompanyFilterProps {
  companies: CompanyOption[]
  selectedCompany: string | null
  onSelectCompany: (company: string | null) => void
}

export function CompanyFilter({ companies, selectedCompany, onSelectCompany }: CompanyFilterProps) {
  const [open, setOpen] = useState(false)

  const selectedCompanyName = selectedCompany
    ? companies.find((company) => company.value === selectedCompany)?.label
    : "All Companies"

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between md:w-[250px]"
          >
            {selectedCompanyName}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[250px]" align="end">
          <Command>
            <CommandInput placeholder="Search company..." />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No company found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    onSelectCompany(null)
                    setOpen(false)
                  }}
                  className="cursor-pointer"
                >
                  <Check className={cn("mr-2 h-4 w-4", selectedCompany === null ? "opacity-100" : "opacity-0")} />
                  All Companies
                </CommandItem>
                {companies.map((company) => (
                  <CommandItem
                    key={company.value}
                    onSelect={() => {
                      onSelectCompany(company.value)
                      setOpen(false)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedCompany === company.value ? "opacity-100" : "opacity-0")}
                    />
                    {company.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </motion.div>
  )
}

