import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"


export default function InputControl({
    name,
    label,
    placeholder,
    description,
    inputType,
    formControl,
}) {
    return (
        <FormField
            control={formControl}
            name={name}
            
            render={({ field }) => (
                <FormItem >
                    <FormLabel>{label}</FormLabel>
                    <FormControl >
                        <Input
                            placeholder={placeholder}
                            className="input-box"
                            type={inputType || "text"}
                            {...field}
                            
                          

                        />
                    </FormControl>
                    {description && <FormDescription>{description}</FormDescription>}
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}